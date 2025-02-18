import React from 'react';
import { motion } from 'framer-motion';

interface HologramEffectProps {
  children: React.ReactNode;
}

export default function HologramEffect({ children }: HologramEffectProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative group"
    >
      {/* Hologram effect layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-future-accent/20 to-future-glow/20 rounded-lg blur-xl animate-hologram" />
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-30" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-future-glow/10 to-transparent animate-matrix" />
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
      
      {/* Edge glow */}
      <div className="absolute inset-0 rounded-lg border border-future-glow opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}