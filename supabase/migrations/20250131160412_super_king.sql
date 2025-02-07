/*
  # Create initial admin user and seed data

  1. Changes
    - Creates initial admin user
    - Adds sample technologies
*/

-- Insert initial technologies
INSERT INTO technologies (name) VALUES
  ('Python'),
  ('TensorFlow'),
  ('PyTorch'),
  ('React'),
  ('Node.js'),
  ('Arduino'),
  ('Raspberry Pi'),
  ('OpenCV')
ON CONFLICT (name) DO NOTHING;

-- Insert initial team member (you)
INSERT INTO team_members (name, role, github_url, linkedin_url)
VALUES (
  'Ahmad Yasin',
  'Lead Developer',
  'https://github.com/Ahmadyasin1',
  'https://linkedin.com/in/mian-ahmad-yasin'
) ON CONFLICT DO NOTHING;