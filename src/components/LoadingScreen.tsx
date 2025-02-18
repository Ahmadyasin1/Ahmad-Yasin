import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-dark-100/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative w-16 h-16"
        >
          <Loader className="w-16 h-16 text-gradient" />
          <div className="absolute inset-0 border-t-2 border-accent-purple rounded-full animate-ping" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-future text-gradient"
        >
          Loading Experience...
        </motion.p>
      </motion.div>
    </div>
  );
}