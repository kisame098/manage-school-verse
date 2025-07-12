
-- Créer l'utilisateur admin principal
-- Note: Remplacez 'votre-mot-de-passe-admin' par un mot de passe sécurisé
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  role,
  aud
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@edumanage.com',
  crypt('AdminPassword123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"first_name": "Admin", "last_name": "System", "phone_number": "+33123456789", "school_id": "00000", "role": "admin"}',
  'authenticated',
  'authenticated'
);

-- Le profil sera créé automatiquement par le trigger handle_new_user
