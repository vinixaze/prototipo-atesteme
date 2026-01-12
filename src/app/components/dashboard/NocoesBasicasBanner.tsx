import { motion } from 'motion/react';
import { ClipboardList, X } from 'lucide-react';

interface NocoesBasicasBannerProps {
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export function NocoesBasicasBanner({ onClose, onNavigate }: NocoesBasicasBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F3E5F5] to-[#E1BEE7] rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-[#E1BEE7] to-[#F3E5F5] rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-300/40 dark:bg-gray-600/40 backdrop-blur-sm hover:bg-gray-400/50 dark:hover:bg-gray-500/50 flex items-center justify-center transition-all hover:scale-105 hover:rotate-90 duration-300 z-20"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1 w-full">
          <div className="w-12 h-12 bg-gradient-to-br from-[#F3E5F5] to-[#E1BEE7] backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <ClipboardList className="w-6 h-6 text-[#7B1FA2]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#6A1B9A] dark:text-purple-300 text-lg font-bold mb-1">
              Noções Básicas
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
              sobre informática, internet e mundo digital. Muito recomendado fazer antes de iniciar a jornada no Nível 1.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('nocoes-basicas')}
          className="
                    bg-gradient-to-r from-[#8B27FF] to-[#A855F7]
                    hover:from-[#7B1FE8] hover:to-[#9333EA]
                    text-white px-6 py-2.5 rounded-xl
                    transition-all shadow-md hover:shadow-lg
                    flex-shrink-0
                    w-full sm:w-auto
                    font-bold
                    sm:ml-3 lg:ml-6
                    mt-2 sm:mt-3
                  "
        >
          Iniciar
        </button>
      </div>
    </motion.div>
  );
}

