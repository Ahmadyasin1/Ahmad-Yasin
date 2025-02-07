/*
  # Portfolio CMS Initial Schema

  1. New Tables
    - `projects`
      - Core project information including title, description, category
      - Support for rich media and markdown content
    - `technologies`
      - Technology stack used in projects
    - `team_members`
      - Team member information
    - `project_technologies`
      - Junction table for projects and technologies
    - `project_team_members`
      - Junction table for projects and team members
    - `media`
      - Project media (images, videos, etc.)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  demo_url text,
  github_url text,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_featured boolean DEFAULT false,
  status text DEFAULT 'draft',
  user_id uuid REFERENCES auth.users(id)
);

-- Technologies table
CREATE TABLE IF NOT EXISTS technologies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  icon_url text,
  created_at timestamptz DEFAULT now()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  avatar_url text,
  linkedin_url text,
  github_url text,
  created_at timestamptz DEFAULT now()
);

-- Project technologies junction table
CREATE TABLE IF NOT EXISTS project_technologies (
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  technology_id uuid REFERENCES technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

-- Project team members junction table
CREATE TABLE IF NOT EXISTS project_team_members (
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  team_member_id uuid REFERENCES team_members(id) ON DELETE CASCADE,
  contribution text NOT NULL,
  PRIMARY KEY (project_id, team_member_id)
);

-- Media table for project assets
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  type text NOT NULL,
  title text,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Auth users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Project owners can update their projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Project owners can delete their projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for other tables
CREATE POLICY "Public read access for technologies"
  ON technologies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for team members"
  ON team_members FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for project technologies"
  ON project_technologies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for project team members"
  ON project_team_members FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for media"
  ON media FOR SELECT
  TO public
  USING (true);