import React from 'react';
import { motion } from 'framer-motion';

interface FuturisticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function FuturisticButton({
  children,
  onClick,
  className = '',
  variant = 'primary'
}: FuturisticButtonProps) {
  const baseStyles = "relative px-6 py-3 rounded-lg font-future transition-all duration-300";
  
  const variants = {
    primary: "bg-future-accent text-future-light hover:shadow-neon",
    secondary: "bg-future-secondary text-future-light hover:shadow-neon",
    outline: "border border-future-glow text-future-glow hover:bg-future-glow/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-future-glow/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {children}
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg border border-future-glow/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}