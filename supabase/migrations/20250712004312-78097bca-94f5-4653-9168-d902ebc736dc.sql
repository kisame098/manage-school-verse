
-- Créer d'abord le type enum s'il n'existe pas
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('admin', 'director', 'teacher', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Recréer la fonction handle_new_user avec une gestion d'erreur plus robuste
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, phone_number, school_id, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'phone_number', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'school_id', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::public.user_role, 'student'::public.user_role)
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log l'erreur mais ne pas bloquer la création de l'utilisateur
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- S'assurer que le trigger existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
