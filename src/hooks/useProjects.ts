import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

export function useProjects(category?: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let query = supabase
          .from('projects')
          .select(`
            *,
            technologies (id, name, icon_url),
            team_members (
              id, name, role, avatar_url, linkedin_url, github_url,
              project_team_members (contribution)
            ),
            media (*)
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error: err } = await query;

        if (err) throw err;
        setProjects(data as Project[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [category]);

  return { projects, loading, error };
}