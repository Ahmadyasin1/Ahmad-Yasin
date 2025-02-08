import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Target, Users, Zap } from 'lucide-react';

const About = () => {
  const experience = [
    {
      title: 'CEO & Founder',
      company: 'Nexariza Group',
      period: '2024 - Present',
      description: 'Leading multiple technology ventures focused on innovation in AI, IoT, and education.',
    },
    {
      title: 'Tech Innovation Leader',
      company: 'Various Tech Giants',
      period: '2021 - 2023',
      description: 'Spearheaded technological innovations and digital transformation initiatives.',
    },
  ];

  const skills = [
    { name: 'AI & Machine Learning', icon: Zap, level: 95 },
    { name: 'IoT Development', icon: Target, level: 90 },
    { name: 'Business Leadership', icon: Users, level: 95 },
    { name: 'Research & Innovation', icon: GraduationCap, level: 85 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="relative bg-dark-200 rounded-3xl p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5" />
        <div className="relative space-y-6 flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://nexariza.me/AhmadYasin.jpg"
            alt="Ahmad Yasin"
            className="w-48 h-48 rounded-full object-cover border-4 border-primary-500"
          />
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl font-bold">About Ahmad Yasin</h1>
            <p className="text-xl text-gray-400">
              A visionary tech leader and entrepreneur, driving innovation through
              the Nexariza Group of companies. With expertise in AI, IoT, and
              educational technology, I'm committed to creating solutions that
              shape the future of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Professional Journey</h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-dark-200 rounded-xl p-6 hover:bg-dark-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-primary-400">{exp.title}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-400">{exp.period}</span>
              </div>
              <p className="mt-4 text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-200 rounded-xl p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <skill.icon className="h-6 w-6 text-primary-400" />
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="bg-primary-500 h-2 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Vision & Mission</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-200 rounded-xl p-8"
          >
            <Target className="h-8 w-8 text-primary-400 mb-4" />
            <h3 className="text-xl font-bold mb-4">Vision</h3>
            <p className="text-gray-400">
              To revolutionize the technology landscape through innovative solutions
              that empower businesses and individuals to achieve their full potential.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-200 rounded-xl p-8"
          >
            <Award className="h-8 w-8 text-primary-400 mb-4" />
            <h3 className="text-xl font-bold mb-4">Mission</h3>
            <p className="text-gray-400">
              To create cutting-edge solutions in AI, IoT, and education while
              fostering a culture of innovation and continuous learning.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
