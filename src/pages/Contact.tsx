import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold">Contact</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Get in Touch</h2>
          <p className="text-gray-400">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
          <div className="space-y-4">
            <a
              href="mailto:ahmadyasin.info@mail.com"
              className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
              <span>AhmadYasin.info@gmail.com</span>
            </a>
            <a
              href="https://github.com/Ahmadyasin1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/mian-ahmad-yasin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
