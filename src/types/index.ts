export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  demo_url?: string;
  github_url?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  status: 'draft' | 'published';
  technologies: Technology[];
  team_members: TeamMember[];
  media: Media[];
}

export interface Technology {
  id: string;
  name: string;
  icon_url?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
  linkedin_url?: string;
  github_url?: string;
  contribution?: string;
}

export interface Media {
  id: string;
  project_id: string;
  url: string;
  type: string;
  title?: string;
  description?: string;
}