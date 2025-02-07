import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error: err } = await supabase
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
          .eq('slug', slug)
          .single();

        if (err) throw err;
        setProject(data as Project);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-400"></div>
        <p className="mt-4 text-gray-400">Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error || 'Project not found'}</p>
        <Link to="/projects" className="mt-4 text-primary-400 hover:text-primary-300">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Projects</span>
        </Link>
        <div className="flex items-center space-x-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
              <span>Source Code</span>
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(project.created_at), 'MMMM d, yyyy')}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{project.team_members.length} Contributors</span>
            </span>
          </div>
        </div>

        {project.thumbnail_url && (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        )}

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech.id}
              className="px-3 py-1 rounded-full bg-dark-300 text-primary-400"
            >
              {tech.name}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>

        {project.team_members.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.team_members.map((member) => (
                <div
                  key={member.id}
                  className="bg-dark-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    {member.avatar_url && (
                      <img
                        src={member.avatar_url}
                        alt={member.name}
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    {member.contribution}
                  </p>
                  <div className="flex items-center space-x-3">
                    {member.github_url && (
                      <a
                        href={member.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.media.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Media Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.media.map((item) => (
                <div key={item.id} className="relative aspect-video">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.title || ''}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : item.type === 'video' ? (
                    <video
                      src={item.url}
                      controls
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : null}
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-sm text-white">{item.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}