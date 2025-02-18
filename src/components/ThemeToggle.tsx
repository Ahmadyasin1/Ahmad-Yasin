import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 backdrop-blur-sm border border-future-glow/20 hover:border-future-glow/40 transition-all duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  );
}