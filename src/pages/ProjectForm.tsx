import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Plus, X, Code, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project, Technology, TeamMember } from '../types';

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  demo_url?: string;
  github_url?: string;
  thumbnail_url?: string;
  status: 'draft' | 'published';
  technologies: string[];
  team_members: {
    id: string;
    contribution: string;
  }[];
  resources?: {
    code_files?: File[];
    research_papers?: File[];
    datasets?: File[];
    documentation?: File[];
  };
}

const initialFormData: ProjectFormData = {
  title: '',
  slug: '',
  description: '',
  content: '',
  category: 'AI/ML Models',
  demo_url: '',
  github_url: '',
  thumbnail_url: '',
  status: 'draft',
  technologies: [],
  team_members: [],
  resources: {
    code_files: [],
    research_papers: [],
    datasets: [],
    documentation: [],
  },
};

const categoryFields = {
  'AI/ML Models': [
    { type: 'image', label: 'Model Architecture Diagram' },
    { type: 'dataset', label: 'Training Dataset' },
    { type: 'code', label: 'Model Code' },
    { type: 'video', label: 'Demo Video' },
    { type: 'link', label: 'Model API Endpoint' },
  ],
  'IoT Hardware': [
    { type: 'image', label: 'Hardware Setup' },
    { type: 'code', label: 'Firmware Code' },
    { type: 'schematic', label: 'Circuit Diagram' },
    { type: 'video', label: 'Demo Video' },
    { type: 'documentation', label: 'Setup Guide' },
  ],
  'Research': [
    { type: 'paper', label: 'Research Paper' },
    { type: 'dataset', label: 'Research Data' },
    { type: 'presentation', label: 'Presentation' },
    { type: 'documentation', label: 'Methodology' },
    { type: 'video', label: 'Research Summary' },
  ],
};

export default function ProjectForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch technologies and team members
        const [techResponse, teamResponse] = await Promise.all([
          supabase.from('technologies').select('*'),
          supabase.from('team_members').select('*'),
        ]);

        if (techResponse.error) throw techResponse.error;
        if (teamResponse.error) throw teamResponse.error;

        setTechnologies(techResponse.data);
        setTeamMembers(teamResponse.data);

        // If editing, fetch project data
        if (slug) {
          const { data, error: projectError } = await supabase
            .from('projects')
            .select(`
              *,
              technologies (id),
              team_members (
                id,
                project_team_members (contribution)
              )
            `)
            .eq('slug', slug)
            .single();

          if (projectError) throw projectError;
          if (data) {
            setFormData({
              ...data,
              technologies: data.technologies.map((t: any) => t.id),
              team_members: data.team_members.map((t: any) => ({
                id: t.id,
                contribution: t.project_team_members[0]?.contribution || '',
              })),
            });
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      }
    };

    fetchData();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload thumbnail if changed
      let thumbnailUrl = formData.thumbnail_url;
      if (thumbnailFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(`thumbnails/${Date.now()}-${thumbnailFile.name}`, thumbnailFile);

        if (uploadError) throw uploadError;
        thumbnailUrl = supabase.storage
          .from('project-images')
          .getPublicUrl(uploadData.path).data.publicUrl;
      }

      // Create or update project
      const projectData = {
        ...formData,
        thumbnail_url: thumbnailUrl,
        user_id: user.id,
      };

      const { data: project, error: projectError } = slug
        ? await supabase
            .from('projects')
            .update(projectData)
            .eq('slug', slug)
            .select()
            .single()
        : await supabase
            .from('projects')
            .insert(projectData)
            .select()
            .single();

      if (projectError) throw projectError;

      // Upload media files
      if (mediaFiles.length > 0) {
        await Promise.all(
          mediaFiles.map(async (file) => {
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('project-media')
              .upload(`${project.id}/${Date.now()}-${file.name}`, file);

            if (uploadError) throw uploadError;

            const url = supabase.storage
              .from('project-media')
              .getPublicUrl(uploadData.path).data.publicUrl;

            await supabase.from('media').insert({
              project_id: project.id,
              url,
              type: file.type.startsWith('image/') ? 'image' : 'video',
              title: file.name,
            });
          })
        );
      }

      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryFields = () => {
    const fields = categoryFields[formData.category as keyof typeof categoryFields];
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Category-Specific Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div
              key={field.label}
              className="p-4 bg-dark-200 rounded-lg space-y-2"
            >
              <div className="flex items-center space-x-2">
                {field.type === 'code' && <Code className="h-5 w-5 text-primary-400" />}
                {field.type === 'video' && <Video className="h-5 w-5 text-primary-400" />}
                {field.type === 'link' && <LinkIcon className="h-5 w-5 text-primary-400" />}
                {field.type === 'documentation' && <FileText className="h-5 w-5 text-primary-400" />}
                <span className="text-sm font-medium">{field.label}</span>
              </div>
              
              {field.type === 'link' ? (
                <input
                  type="url"
                  className="w-full px-3 py-2 bg-dark-300 rounded border border-dark-400 focus:border-primary-500"
                  placeholder={`Enter ${field.label} URL`}
                />
              ) : (
                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-dark-400 rounded-lg hover:border-primary-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept={
                      field.type === 'image' ? 'image/*' :
                      field.type === 'video' ? 'video/*' :
                      field.type === 'code' ? '.py,.js,.cpp,.h,.ino' :
                      field.type === 'paper' ? '.pdf,.doc,.docx' :
                      '*'
                    }
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Handle file upload
                      }
                    }}
                  />
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-400">
                      Click to upload {field.label}
                    </span>
                  </div>
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold">{slug ? 'Edit' : 'New'} Project</h1>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="mt-1 block w-full rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
              >
                <option>AI/ML Models</option>
                <option>IoT Hardware</option>
                <option>Research</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                className="mt-1 block w-full rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Demo URL</label>
              <input
                type="url"
                value={formData.demo_url}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                className="mt-1 block w-full rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">GitHub URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="mt-1 block w-full rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Content (Markdown)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="mt-1 block w-full rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Thumbnail</label>
            <div className="mt-1 flex items-center space-x-4">
              {(formData.thumbnail_url || thumbnailFile) && (
                <img
                  src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : formData.thumbnail_url}
                  alt="Thumbnail preview"
                  className="h-20 w-20 object-cover rounded"
                />
              )}
              <label className="flex items-center space-x-2 px-4 py-2 bg-dark-200 rounded-lg cursor-pointer hover:bg-dark-300 transition-colors duration-200">
                <Upload className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Choose file</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setThumbnailFile(file);
                  }}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Media Files</label>
            <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              {mediaFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Media preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaFiles(mediaFiles.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="flex items-center justify-center h-24 bg-dark-200 rounded-lg cursor-pointer hover:bg-dark-300 transition-colors duration-200">
                <Plus className="h-8 w-8 text-gray-400" />
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setMediaFiles([...mediaFiles, ...files]);
                  }}
                />
              </label>
            </div>
          </div>

          {renderCategoryFields()}

          <div>
            <label className="block text-sm font-medium text-gray-400">Technologies</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <label
                  key={tech.id}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200 ${
                    formData.technologies.includes(tech.id)
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-200 text-gray-400 hover:bg-dark-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={formData.technologies.includes(tech.id)}
                    onChange={(e) => {
                      const newTechnologies = e.target.checked
                        ? [...formData.technologies, tech.id]
                        : formData.technologies.filter(id => id !== tech.id);
                      setFormData({ ...formData, technologies: newTechnologies });
                    }}
                  />
                  {tech.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Team Members</label>
            <div className="mt-1 space-y-2">
              {teamMembers.map((member) => {
                const teamMember = formData.team_members.find(t => t.id === member.id);
                return (
                  <div key={member.id} className="flex items-start space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={Boolean(teamMember)}
                        onChange={(e) => {
                          const newTeamMembers = e.target.checked
                            ? [...formData.team_members, { id: member.id, contribution: '' }]
                            : formData.team_members.filter(t => t.id !== member.id);
                          setFormData({ ...formData, team_members: newTeamMembers });
                        }}
                        className="rounded border-dark-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-white">{member.name}</span>
                    </label>
                    {teamMember && (
                      <input
                        type="text"
                        value={teamMember.contribution}
                        onChange={(e) => {
                          const newTeamMembers = formData.team_members.map(t =>
                            t.id === member.id ? { ...t, contribution: e.target.value } : t
                          );
                          setFormData({ ...formData, team_members: newTeamMembers });
                        }}
                        placeholder="Contribution..."
                        className="flex-1 rounded-md bg-dark-200 border-dark-300 text-white focus:border-primary-500 focus:ring-primary-500"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}