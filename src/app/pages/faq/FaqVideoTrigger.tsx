import { motion } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';

interface FaqVideoTriggerProps {
  onOpen: () => void;
}

export function FaqVideoTrigger({ onOpen }: FaqVideoTriggerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center">
          <Play className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Guia do Usuário</h2>
      </div>

      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full group relative overflow-hidden bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] rounded-3xl p-1 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

        <div className="relative bg-white dark:bg-gray-800 rounded-[22px] p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Play className="w-12 h-12 text-white fill-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Assista ao Tutorial Completo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                Aprenda tudo sobre a plataforma ATESTEME com nosso guia em vídeo dividido em 21 capítulos práticos e objetivos.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#8B27FF] font-semibold">
                <span>Clique para assistir</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl px-6 py-4 border-2 border-purple-100 dark:border-purple-800">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#8B27FF] dark:text-[#A855F7] mb-1">21</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Capítulos</div>
              </div>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
