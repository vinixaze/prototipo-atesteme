import { X, Info, AlertTriangle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InitialInstructionsModalProps {
  isOpen: boolean;
  competency: string;
  category: string;
  categoryColor: string;
  onClose: () => void;
  onStart: () => void;
  onGoToContents: () => void;
}

export default function InitialInstructionsModal({
  isOpen,
  competency,
  category,
  categoryColor,
  onClose,
  onStart,
  onGoToContents,
}: InitialInstructionsModalProps) {
  
  // Função para obter o gradiente da categoria
  const getCategoryGradient = (color: string) => {
    const gradients: { [key: string]: string } = {
      '#FFD700': 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
      '#00BCD4': 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
      '#FF9800': 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
      '#4CAF50': 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
      '#E91E63': 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
    };
    return gradients[color] || gradients['#00BCD4'];
  };

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
            {/* SEÇÃO 1 - HEADER COLORIDO */}
            <div
              className="relative h-[120px] flex items-center justify-center px-6"
              style={{ background: getCategoryGradient(categoryColor) }}
            >
              {/* Badge da categoria */}
              <div className="absolute top-4 left-4 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="text-[11px] font-bold uppercase text-white tracking-wider">
                  {category}
                </span>
              </div>

              {/* Botão de fechar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/50 hover:scale-110"
              >
                <X className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>

              {/* Título da competência */}
              <h2 className="text-[28px] font-bold text-white text-center max-w-[80%] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                {competency}
              </h2>
            </div>

            {/* SEÇÃO 2 - CORPO DO MODAL */}
            <div className="p-8">
              {/* BLOCO 1 - DICA (roxo claro) */}
              <div className="bg-[#F3E8FF] border-l-4 border-[#8B27FF] rounded-xl p-5 mb-5 flex gap-4">
                <Info className="w-6 h-6 text-[#8B27FF] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-sm font-bold text-[#8B27FF] mb-2">Dica:</p>
                  <p className="text-sm text-[#555] leading-relaxed mb-3">
                    Estude os conteúdos antes de começar!
                  </p>
                  <button
                    onClick={onGoToContents}
                    className="inline-flex items-center gap-2 bg-[#8B27FF] hover:bg-[#6B1FBF] text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(139,39,255,0.3)]"
                  >
                    <BookOpen className="w-4 h-4" strokeWidth={2} />
                    Ir para Conteúdos
                  </button>
                </div>
              </div>

              {/* BLOCO 2 - ATENÇÃO (laranja/amarelo) */}
              <div className="bg-[#FFF9E6] border-l-4 border-[#FF9800] rounded-xl p-5 mb-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-[#FF9800] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-sm font-bold text-[#E65100] mb-2">Atenção:</p>
                  <p className="text-sm text-[#555] leading-relaxed">
                    Se errar <span className="font-bold text-[#E65100]">2 desafios</span>, você deverá aguardar{' '}
                    <span className="font-bold text-[#E65100]">5 dias</span> para refazer este teste.
                  </p>
                </div>
              </div>

              {/* BLOCO 3 - INFORMAÇÕES DO DESAFIO */}
              <div className="mt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#8B27FF] text-xl leading-none mt-0.5">•</span>
                    <span className="text-[15px] text-[#555] leading-relaxed">3 desafios seguidos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8B27FF] text-xl leading-none mt-0.5">•</span>
                    <span className="text-[15px] text-[#555] leading-relaxed">Sem limite de tempo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8B27FF] text-xl leading-none mt-0.5">•</span>
                    <span className="text-[15px] text-[#555] leading-relaxed">Resultado exibido ao final</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SEÇÃO 3 - RODAPÉ COM BOTÕES */}
            <div className="px-8 pb-8 flex gap-4">
              {/* Botão Cancelar */}
              <button
                onClick={onClose}
                className="flex-1 bg-[#F5F5F5] hover:bg-[#E0E0E0] border-2 border-[#E0E0E0] hover:border-[#BDBDBD] text-[#666] hover:text-[#333] px-6 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200"
              >
                Cancelar
              </button>

              {/* Botão Iniciar */}
              <button
                onClick={onStart}
                className="flex-1 bg-[#8B27FF] hover:bg-[#6B1FBF] text-white px-6 py-3.5 rounded-xl text-[15px] font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(139,39,255,0.3)] hover:shadow-[0_6px_20px_rgba(139,39,255,0.4)] flex items-center justify-center gap-2"
              >
                Iniciar
                <span className="text-lg">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
