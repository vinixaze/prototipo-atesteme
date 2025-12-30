import { X, AlertCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReinforcementModalProps {
  isOpen: boolean;
  daysRemaining: number;
  onClose: () => void;
  onGoToContents: () => void;
}

export default function ReinforcementModal({
  isOpen,
  daysRemaining,
  onClose,
  onGoToContents,
}: ReinforcementModalProps) {
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-[10000] bg-white rounded-3xl max-w-[540px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* SEÇÃO 1 - HEADER AMARELO */}
            <div
              className="relative h-[180px] flex flex-col items-center justify-center px-6"
              style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)' }}
            >
              {/* Botão de fechar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/50 hover:scale-110"
              >
                <X className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>

              {/* Ícone central grande */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)] mb-4">
                <AlertCircle className="w-10 h-10 text-[#FFD700]" strokeWidth={2.5} />
              </div>
            </div>

            {/* SEÇÃO 2 - CORPO DO MODAL */}
            <div className="p-8 text-center">
              {/* Título */}
              <h2 className="text-[26px] font-bold text-[#333] mb-5">
                Reforço Necessário
              </h2>

              {/* Parágrafo 1 */}
              <p className="text-[15px] text-[#555] leading-relaxed mb-4">
                É importante estudar os conteúdos desta competência antes de tentar novamente.
              </p>

              {/* Parágrafo 2 com destaque */}
              <p className="text-[15px] text-[#555] leading-relaxed mb-8">
                Você poderá refazer este teste em{' '}
                <span className="font-bold text-[#8B27FF]">{daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}</span>.
              </p>

              {/* SEÇÃO 3 - BOTÕES */}
              <div className="flex flex-col gap-3">
                {/* Botão Acessar Conteúdos (primário) */}
                <button
                  onClick={onGoToContents}
                  className="w-full bg-[#8B27FF] hover:bg-[#6B1FBF] text-white px-6 py-3.5 rounded-xl text-[15px] font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(139,39,255,0.3)] hover:shadow-[0_6px_20px_rgba(139,39,255,0.4)] flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-[18px] h-[18px]" strokeWidth={2} />
                  Acessar Conteúdos
                </button>

                {/* Botão OK, Entendi (secundário) */}
                <button
                  onClick={onClose}
                  className="w-full bg-[#F5F5F5] hover:bg-[#E0E0E0] text-[#666] hover:text-[#333] px-6 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200"
                >
                  OK, Entendi
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
