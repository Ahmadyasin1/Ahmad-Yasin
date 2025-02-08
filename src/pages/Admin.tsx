import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Image,
  FileText,
  Video,
  Link,
  Code,
  Database,
  Cpu,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

export default function Admin() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resourceStats, setResourceStats] = useState<{ [key: string]: any }>(
    {}
  );

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user.email === 'admin@nexariza.com') {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      if (data.user?.email === 'admin@nexariza.com') {
        setIsAuthenticated(true);
        setError(null);
      } else {
        throw new Error('Unauthorized access');
      }
    } catch (err) {
      setError('Invalid credentials or unauthorized access');
    }
  };

  // Fetch projects and resource stats
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (projectsError) throw projectsError;
        setProjects(projectsData);

        // Fetch resource stats for each project
        const stats: { [key: string]: any } = {};
        for (const project of projectsData) {
          if (project.demo_url) {
            // Simulate resource stats (replace with actual API calls)
            stats[project.id] = {
              cpu: Math.random() * 100,
              memory: Math.random() * 16,
              storage: Math.random() * 1000,
              requests: Math.floor(Math.random() * 1000),
            };
          }
        }
        setResourceStats(stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleCreateProject = () => {
    navigate('/admin/projects/new');
  };

  const handleEditProject = (slug: string) => {
    navigate(`/admin/projects/${slug}/edit`);
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?'))
      return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);

      if (error) throw error;
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Admin Login
            </h2>
            <p className="mt-2 text-gray-400">
              Sign in to access the admin dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-dark-200 border border-dark-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-dark-200 border border-dark-300 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-400"></div>
        <p className="mt-4 text-gray-400">Loading admin dashboard...</p>
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
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleCreateProject}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          <Plus className="h-5 w-5" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-dark-200 rounded-lg p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-sm rounded-full bg-dark-300 text-primary-400">
                    {project.category}
                  </span>
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      project.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleEditProject(project.slug)}
                  className="p-2 text-gray-400 hover:text-white bg-dark-300 rounded-lg"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-2 text-gray-400 hover:text-red-400 bg-dark-300 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Project Resources */}
            {resourceStats[project.id] && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-dark-300 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Cpu className="h-4 w-4" />
                    <span>CPU Usage</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {resourceStats[project.id].cpu.toFixed(1)}%
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Database className="h-4 w-4" />
                    <span>Memory</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {resourceStats[project.id].memory.toFixed(1)} GB
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <FileText className="h-4 w-4" />
                    <span>Storage</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {resourceStats[project.id].storage.toFixed(1)} MB
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Link className="h-4 w-4" />
                    <span>Requests</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {resourceStats[project.id].requests}/hr
                  </p>
                </div>
              </div>
            )}

            {/* Project Assets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.thumbnail_url && (
                <div className="relative group">
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Image className="h-6 w-6 text-white" />
                  </div>
                </div>
              )}
              {project.category === 'IoT Hardware' && (
                <div className="flex items-center justify-center h-24 bg-dark-300 rounded-lg">
                  <Code className="h-8 w-8 text-gray-400" />
                </div>
              )}
              {project.category === 'AI/ML Models' && (
                <div className="flex items-center justify-center h-24 bg-dark-300 rounded-lg">
                  <Link className="h-8 w-8 text-gray-400" />
                </div>
              )}
              {project.category === 'Research' && (
                <div className="flex items-center justify-center h-24 bg-dark-300 rounded-lg">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
