import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-dark-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {project.thumbnail_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-400">
              {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
            </span>
            <span className="text-sm text-gray-400 capitalize">{project.category}</span>
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-gray-400 line-clamp-2">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech.id}
              className="px-2 py-1 text-xs rounded-full bg-dark-300 text-primary-400"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-full bg-dark-300 text-primary-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200"
          >
            View Details →
          </Link>
          <div className="flex items-center space-x-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}