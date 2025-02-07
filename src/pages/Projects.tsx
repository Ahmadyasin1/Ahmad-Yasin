import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import ProjectGrid from '../components/ProjectGrid';

const categories = ['All', 'AI/ML Models', 'IoT Hardware', 'Research'];

export default function Projects() {
  const [category, setCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState('');
  const { projects, loading, error } = useProjects(category === 'All' ? undefined : category);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-white"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Filter className="text-gray-400 h-5 w-5" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === 'All' ? undefined : cat)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors duration-200 ${
                  (cat === 'All' && !category) || cat === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-200 text-gray-400 hover:bg-dark-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-400"></div>
          <p className="mt-4 text-gray-400">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400">{error}</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No projects found.</p>
        </div>
      ) : (
        <ProjectGrid projects={filteredProjects} />
      )}
    </motion.div>
  );
}