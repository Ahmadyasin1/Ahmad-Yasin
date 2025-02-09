import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Loader } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import ProjectGrid from '../components/ProjectGrid';

const categories = ['All', 'AI/ML Models', 'IoT Hardware', 'Research'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
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
      Discovering Projects...
    </motion.p>
  </div>
);

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
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-dark-200/50 backdrop-blur-lg rounded-2xl p-8 border border-dark-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 rounded-2xl" />
        <div className="relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Projects Showcase
              </h1>
              <p className="text-gray-400">
                Explore our innovative solutions across different domains
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-none group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-primary-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-dark-300/50 backdrop-blur-sm rounded-lg border border-dark-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-200 text-white"
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide"
          >
            <Filter className="text-gray-400 h-5 w-5" />
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCategory(cat === 'All' ? undefined : cat)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                  (cat === 'All' && !category) || cat === category
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20 scale-105'
                    : 'bg-dark-300/50 text-gray-400 hover:bg-dark-300 hover:text-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12 bg-red-500/10 rounded-lg border border-red-500/20"
          >
            <p className="text-red-400">{error}</p>
          </motion.div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ProjectGrid projects={filteredProjects} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
