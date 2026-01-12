import { motion } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';
import { ModuleColors } from '../../types/dashboard';

interface WelcomeBannerProps {
  colors: ModuleColors;
  onClose: () => void;
}

export function WelcomeBanner({ colors, onClose }: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-gradient-to-r ${colors.primary} rounded-3xl p-8 shadow-2xl overflow-hidden group hover:shadow-[0_20px_60px_rgba(139,39,255,0.4)] transition-all duration-500`}
    >
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-300/40 dark:bg-gray-600/40 backdrop-blur-sm hover:bg-gray-400/50 dark:hover:bg-gray-500/50 flex items-center justify-center transition-all hover:scale-105 hover:rotate-90 duration-300 z-20"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          className="flex-shrink-0"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <div className="text-left">
          <h2 className="text-xl sm:text-2xl md:text-4xl text-white mb-0">
            Olá, usuário(a)
          </h2>
          <p className="text-white/90 text-xs md:text-base mt-1">Pronto para iniciar sua jornada de aprendizagens digitais?</p>
        </div>
      </div>
    </motion.div>
  );
}

