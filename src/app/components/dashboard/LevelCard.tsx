import { motion } from 'motion/react';
import { ModuleColors } from '../../types/dashboard';

interface LevelCardProps {
  colors: ModuleColors;
  currentLevel: number;
}

export function LevelCard({ colors, currentLevel }: LevelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`relative bg-gradient-to-br ${colors.primary} rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center w-full lg:w-[180px] h-full min-h-[180px] overflow-hidden`}
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-3 shadow-md">
          <p className="text-white text-[10px] uppercase tracking-wider font-bold">Nível Atual</p>
        </div>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-5xl shadow-lg mb-2"
        >
          {currentLevel}
        </motion.div>
        <p className="text-white/90 text-[9px] uppercase tracking-wider text-center">Continue!</p>
      </div>
    </motion.div>
  );
}

