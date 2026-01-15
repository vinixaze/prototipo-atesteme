import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, BookOpen, X } from 'lucide-react';

interface BlockedCompetencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToContents?: () => void;
  competency: string;
  category: string;
  categoryColor: string;
  icon: any;
}

export default function BlockedCompetencyModal({
  isOpen,
  onClose,
  onGoToContents,
  competency,
  category,
  categoryColor,
  icon,
}: BlockedCompetencyModalProps) {
  const daysRemaining = 5; // Mock - no futuro será calculado dinamicamente
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative"
            >
              {/* Botão Fechar */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header com cor dinâmica baseada na categoria */}
              <div 
                className="pt-12 pb-16 px-6 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}ee 50%, ${categoryColor}dd 100%)`
                }}
              >
                {/* Círculos decorativos */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                {/* Ícone de Alerta */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                  className="relative z-10 w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${categoryColor}15` }}
                  >
                    <AlertCircle 
                      className="w-10 h-10" 
                      style={{ color: categoryColor }}
                      strokeWidth={2.5} 
                    />
                  </div>
                </motion.div>
              </div>

              {/* Conteúdo Branco */}
              <div className="px-8 py-8 -mt-6 relative bg-white rounded-t-3xl">
                {/* Título */}
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  Reforço Necessário
                </h2>

                {/* Descrição */}
                <p className="text-gray-700 text-center leading-relaxed mb-2">
                  É importante estudar os conteúdos desta competência antes de tentar novamente.
                </p>

                {/* Dias restantes */}
                <p className="text-gray-700 text-center mb-8">
                  Você poderá refazer este teste em{' '}
                  <span className="font-bold text-[#8B27FF]">
                    {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
                  </span>
                  .
                </p>

                {/* Botões */}
                <div className="space-y-3">
                  {/* Botão Principal - Acessar Conteúdos */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGoToContents}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8B27FF] to-[#7B1FE8] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                  >
                    <BookOpen className="w-5 h-5" />
                    Acessar Conteúdos
                  </motion.button>

                  {/* Botão Secundário - OK, Entendi */}
                  <button
                    onClick={onClose}
                    className="w-full py-4 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-base transition-colors"
                  >
                    OK, Entendi
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}