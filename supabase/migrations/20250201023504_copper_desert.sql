/*
  # Fix Admin Authentication

  1. Changes
    - Drop existing admin user if exists
    - Create new admin user with proper role
    - Update RLS policies for admin access
    - Add admin-specific metadata
*/

-- First, ensure admin user exists with proper role
DO $$
BEGIN
    -- Create admin user if not exists
    IF NOT EXISTS (
        SELECT 1 FROM auth.users 
        WHERE email = 'admin@nexariza.com'
    ) THEN
        INSERT INTO auth.users (
            id,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            aud,
            role
        ) VALUES (
            gen_random_uuid(),
            'admin@nexariza.com',
            crypt('Nexariza@2024', gen_salt('bf')),
            now(),
            '{"provider": "email", "providers": ["email"], "is_admin": true}',
            '{"name": "Ahmad Yasin", "role": "admin"}',
            'authenticated',
            'authenticated'
        );
    END IF;
END $$;

-- Update RLS policies for admin access
DROP POLICY IF EXISTS "Admin full access" ON projects;
CREATE POLICY "Admin full access"
    ON projects
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING (
        (auth.jwt() ->> 'email' = 'admin@nexariza.com') OR 
        ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'is_admin')::boolean = true
    )
    WITH CHECK (
        (auth.jwt() ->> 'email' = 'admin@nexariza.com') OR 
        ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'is_admin')::boolean = true
    );

-- Grant necessary permissions
GRANT ALL ON projects TO authenticated;
GRANT ALL ON technologies TO authenticated;
GRANT ALL ON team_members TO authenticated;
GRANT ALL ON project_technologies TO authenticated;
GRANT ALL ON project_team_members TO authenticated;
GRANT ALL ON media TO authenticated;