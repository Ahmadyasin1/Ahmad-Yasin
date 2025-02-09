import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import type { Project } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative bg-dark-200/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-dark-300/50 hover:border-primary-500/50"
    >
      {project.thumbnail_url && (
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-200/90 z-10" />
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1 text-xs rounded-full bg-dark-300/90 backdrop-blur-sm text-primary-400 border border-primary-500/20">
              {project.category}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="capitalize">{project.status}</span>
            </div>
          </div>
          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors duration-200">
              {project.title}
            </h3>
          </Link>
          <p className="text-gray-400 line-clamp-2">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech.id}
              className="px-2 py-1 text-xs rounded-lg bg-dark-300/50 text-primary-400 border border-primary-500/20"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-lg bg-dark-300/50 text-primary-400 border border-primary-500/20">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-dark-300/50">
          <Link
            to={`/projects/${project.slug}`}
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200 flex items-center gap-1"
          >
            View Details
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
          <div className="flex items-center space-x-3">
            {project.github_url && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {project.demo_url && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
