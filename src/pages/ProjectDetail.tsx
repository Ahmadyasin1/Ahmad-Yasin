import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Linkedin, Loader, Tag, FileText, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px]">
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
      className="relative w-16 h-16"
    >
      <Loader className="w-16 h-16 text-primary-500" />
      <div className="absolute inset-0 border-t-2 border-primary-400 rounded-full animate-ping" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-4 text-gray-400 text-lg"
    >
      Loading Project Details...
    </motion.p>
  </div>
);

const MarkdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <motion.h1 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-6"
    >
      {children}
    </motion.h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2 border-b border-dark-300 pb-2"
    >
      {children}
    </motion.h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-primary-400 mt-6 mb-3">
      {children}
    </h3>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="space-y-2 my-4 ml-6">
      {children}
    </ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <motion.li 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2 text-gray-300"
    >
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
      <span>{children}</span>
    </motion.li>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-300 leading-relaxed mb-4">
      {children}
    </p>
  ),
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -top-4 right-2 text-xs text-gray-500 bg-dark-300 px-2 py-1 rounded">
          {match[1]}
        </div>
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
          className="rounded-lg !bg-dark-300/50 !p-4 !my-6"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </motion.div>
    ) : (
      <code className="bg-dark-300/50 text-primary-400 px-1.5 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary-500 pl-4 my-4 italic text-gray-400">
      {children}
    </blockquote>
  ),
};

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {loading ? (
          <LoadingSpinner />
        ) : error || !project ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-red-500/10 rounded-lg border border-red-500/20"
          >
            <p className="text-red-400">{error || 'Project not found'}</p>
            <Link
              to="/projects"
              className="mt-4 inline-flex items-center text-primary-400 hover:text-primary-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between"
            >
              <Link
                to="/projects"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Projects</span>
              </Link>
              <div className="flex items-center space-x-4">
                {project.github_url && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-dark-200 rounded-lg text-gray-400 hover:text-white transition-all duration-200 hover:bg-dark-300"
                  >
                    <Github className="h-5 w-5" />
                    <span>Source Code</span>
                  </motion.a>
                )}
                {project.demo_url && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-all duration-200"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative bg-dark-200/50 backdrop-blur-lg rounded-2xl p-8 border border-dark-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 rounded-2xl" />
              <div className="relative space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(project.created_at), 'MMMM d, yyyy')}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{project.team_members.length} Contributors</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span className="capitalize">{project.category}</span>
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold">{project.title}</h1>
                  <p className="text-xl text-gray-400">{project.description}</p>
                </div>

                {project.thumbnail_url && (
                  <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-[400px] object-cover rounded-xl shadow-2xl"
                  />
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-2"
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.id}
                      className="px-3 py-1 rounded-lg bg-dark-300/50 text-primary-400 border border-primary-500/20"
                    >
                      {tech.name}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="prose prose-invert max-w-none"
            >
              <div className="bg-dark-200/50 backdrop-blur-lg rounded-2xl p-8 border border-dark-300 space-y-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-4 py-2 bg-dark-300/50 rounded-lg flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4 text-primary-400" />
                    <span className="text-sm text-gray-300">
                      {format(new Date(project.created_at), 'MMMM d, yyyy')}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="px-4 py-2 bg-dark-300/50 rounded-lg flex items-center gap-2"
                  >
                    <Tag className="h-4 w-4 text-primary-400" />
                    <span className="text-sm text-gray-300 capitalize">
                      {project.category}
                    </span>
                  </motion.div>
                  {project.technologies.length > 0 && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="px-4 py-2 bg-dark-300/50 rounded-lg flex items-center gap-2"
                    >
                      <Code className="h-4 w-4 text-primary-400" />
                      <span className="text-sm text-gray-300">
                        {project.technologies.length} Technologies
                      </span>
                    </motion.div>
                  )}
                </div>

                <ReactMarkdown components={MarkdownComponents}>
                  {project.content}
                </ReactMarkdown>
              </div>
            </motion.div>

            {project.team_members.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold">Team Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.team_members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-dark-200/50 backdrop-blur-lg rounded-xl p-6 border border-dark-300 hover:border-primary-500/50 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        {member.avatar_url ? (
                          <img
                            src={member.avatar_url}
                            alt={member.name}
                            className="h-12 w-12 rounded-full border-2 border-primary-500/20"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary-400" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-primary-400">{member.role}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-400">
                        {member.contribution}
                      </p>
                      <div className="mt-4 flex items-center space-x-3">
                        {member.github_url && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={member.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            <Github className="h-5 w-5" />
                          </motion.a>
                        )}
                        {member.linkedin_url && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            <Linkedin className="h-5 w-5" />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {project.media.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold">Media Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.media.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-video group"
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.title || ''}
                          className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : item.type === 'video' ? (
                        <video
                          src={item.url}
                          controls
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : null}
                      {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                          <p className="text-sm text-white">{item.title}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}