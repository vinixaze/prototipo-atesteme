import { motion } from 'motion/react';
import { Award, Zap } from 'lucide-react';

export function WelcomeFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8"
    >
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <span>100% alinhado à PNED</span>
      </div>

      <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />

      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
          <Zap className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-white" />
        </div>
        <span>Resultados Instantâneos</span>
      </div>

      <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />

      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <div className="w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shadow-lg">
          <Award className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-white" />
        </div>
        <span>Certificado Digital</span>
      </div>
    </motion.div>
  );
}
