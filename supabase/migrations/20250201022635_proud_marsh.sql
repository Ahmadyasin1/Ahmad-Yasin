-- Create initial admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@nexariza.com',
  crypt('Nexariza@2024', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Ahmad Yasin","role":"admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Enable RLS bypass for admin
CREATE POLICY "Admin full access"
  ON projects
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@nexariza.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@nexariza.com');