import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Timer, ArrowRight } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

export default function ComingSoon() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <ParticlesBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/50 via-dark-200/50 to-dark-100/50 backdrop-blur-sm" />
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="flex justify-center"
        >
          <Rocket className="w-20 h-20 text-gradient" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold"
        >
          <span className="text-gradient">Coming Soon</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400"
        >
          Something extraordinary is in the works. We're crafting an innovative solution that will revolutionize the way we interact with technology.
        </motion.p>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center items-center gap-8 text-center"
        >
          <Timer className="w-8 h-8 text-accent-purple animate-pulse" />
          <span className="text-2xl font-future text-gradient">Launch Imminent</span>
        </motion.div>

        {/* Notification Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-md mx-auto space-y-4"
        >
          <p className="text-gray-400">Be the first to know when we launch.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-dark-200/50 border border-dark-300 rounded-lg focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 transition-all duration-300"
            />
            <button className="group px-6 py-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg hover:opacity-90 transition-all duration-300">
              <span className="flex items-center gap-2">
                Notify Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </motion.div>
    </div>
  );
}