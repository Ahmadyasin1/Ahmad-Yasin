import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-200 border-t border-dark-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Ahmad Yasin
            </h3>
            <p className="text-gray-400 text-sm">
              Innovating at the intersection of AI, IoT, and research. Building
              the future, one project at a time.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/projects"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Ahmadyasin1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/mian-ahmad-yasin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:ahmadyasin.info@gmail.com"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-300">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Ahmad Yasin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
