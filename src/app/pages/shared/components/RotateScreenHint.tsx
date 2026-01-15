import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, X } from 'lucide-react';

export default function RotateScreenHint() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="md:hidden absolute top-4 right-4 z-50"
      >
        <div className="bg-gradient-to-br from-[#8B27FF] to-[#A855F7] text-white rounded-2xl shadow-2xl p-4 max-w-[280px]">
          {/* Botão fechar */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            {/* Ícone animado de rotação */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
            >
              <RotateCw className="w-6 h-6" />
            </motion.div>

            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">Dica!</h3>
              <p className="text-xs leading-relaxed opacity-95">
                Para melhor experiência, gire seu celular para o modo paisagem (horizontal)
              </p>
            </div>
          </div>

          {/* Ilustração animada de celular girando */}
          <div className="mt-3 flex justify-center">
            <motion.div
              animate={{ 
                rotateZ: [0, -90, -90, 0],
                scale: [1, 0.9, 0.9, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1]
              }}
              className="w-8 h-12 bg-white/30 rounded-md border-2 border-white/50 relative"
            >
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white/50 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
