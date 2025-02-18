import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ArrowRight, Briefcase, GraduationCap, Award, Globe, Users, Rocket, ChevronDown, Brain, Code, Database, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import ParticlesBackground from '../components/ParticlesBackground';
import SkillsCarousel from '../components/SkillsCarousel';
import Certificates from '../components/Certificates';
import Education from '../components/Education';

const achievements = [
  { 
    title: '10+', 
    subtitle: 'Years Experience', 
    icon: Briefcase,
    color: 'from-blue-500 to-purple-500'
  },
  { 
    title: '50+', 
    subtitle: 'Global Clients', 
    icon: Globe,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    title: '100+', 
    subtitle: 'Team Members', 
    icon: Users,
    color: 'from-pink-500 to-red-500'
  },
  { 
    title: '20+', 
    subtitle: 'Industry Awards', 
    icon: Award,
    color: 'from-red-500 to-orange-500'
  }
];

const expertise = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Pioneering advanced AI solutions and neural networks',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'Building scalable and modern web applications',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Designing robust data pipelines and architectures',
    color: 'from-pink-500 to-red-500'
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Creating scalable cloud-native solutions',
    color: 'from-red-500 to-orange-500'
  }
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative space-y-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/50 via-dark-200/30 to-dark-100/50 backdrop-blur-sm" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative text-center space-y-8 max-w-4xl mx-auto px-4 z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink rounded-full blur-3xl opacity-20" />
            <h1 className="text-7xl md:text-9xl font-bold">
              <span className="text-gradient">Ahmad</span>
            </h1>
            <h1 className="text-7xl md:text-9xl font-bold mt-2">
              <span className="text-gradient">Yasin</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-400 space-y-4"
          >
            <div className="h-12">
              <Typewriter
                options={{
                  strings: [
                    'Tech Visionary',
                    'AI Pioneer',
                    'Innovation Leader',
                    'CEO of Nexariza Group'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30
                }}
              />
            </div>
            <p className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Shaping the Future of Technology
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              to="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 text-lg font-medium">
                View Projects
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/contact"
              className="group px-8 py-4 rounded-full border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white transition-all duration-300"
            >
              <span className="text-lg font-medium">Get in Touch</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Areas of Expertise
            </h2>
            <p className="text-xl text-gray-400">
              Pioneering innovations across multiple domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 hover:bg-dark-200 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} p-2.5`}>
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Carousel */}
      <section className="py-20 bg-dark-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                Technical Proficiency
              </h2>
              <p className="text-xl text-gray-400">
                Mastering cutting-edge technologies
              </p>
            </div>
            <SkillsCarousel />
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Milestones Achieved
            </h2>
            <p className="text-xl text-gray-400">
              A track record of excellence and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-dark-200/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-dark-200 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                  <div className={`mx-auto w-12 h-12 rounded-lg bg-gradient-to-r ${achievement.color} p-2.5`}>
                    <achievement.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gradient">{achievement.title}</h3>
                  <p className="text-gray-400">{achievement.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Education */}
      <section className="py-20 bg-dark-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <Certificates />
          <Education />
        </div>
      </section>
    </motion.div>
  );
}