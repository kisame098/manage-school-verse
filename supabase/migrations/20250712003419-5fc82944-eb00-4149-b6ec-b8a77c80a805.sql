
-- Cette migration est remplacée par la création programmatique du compte admin
-- via l'interface utilisateur pour éviter les problèmes de permissions avec auth.users

-- Nous gardons seulement l'école d'administration par défaut
INSERT INTO public.schools (school_id, school_name, is_active) 
VALUES ('00000', 'Administration Centrale', true)
ON CONFLICT (school_id) DO NOTHING;
