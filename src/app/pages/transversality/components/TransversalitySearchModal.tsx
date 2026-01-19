import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, Search, X } from "lucide-react";
import type { ReactNode, RefObject } from "react";

interface TransversalitySearchModalProps {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  stepsArray: number[];
  isSearching: boolean;
  canGoNext: boolean;
  footerRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onBack: () => void;
  onPrimary: () => void;
  renderStep: () => ReactNode;
}

export default function TransversalitySearchModal({
  isOpen,
  currentStep,
  totalSteps,
  stepsArray,
  isSearching,
  canGoNext,
  footerRef,
  onClose,
  onBack,
  onPrimary,
  renderStep,
}: TransversalitySearchModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header do Modal */}
            <div className="shrink-0 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] px-6 sm:px-8 py-5 flex items-center justify-between">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 truncate">
                  Buscar Desafios de Transversalidade
                </h2>
                <div className="flex gap-2 items-center">
                  {stepsArray.map((step) => (
                    <div
                      key={step}
                      className={`h-2 rounded-full transition-all ${step === currentStep
                        ? "bg-white w-8"
                        : step < currentStep
                          ? "bg-purple-300 w-6"
                          : "bg-purple-200 w-4"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-purple-100 text-sm mt-2">
                  Passo {currentStep} de {totalSteps}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* ConteÇ§do */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div
              ref={footerRef}
              className="shrink-0 bg-gray-50 dark:bg-gray-700/50 px-6 sm:px-8 py-5 border-t border-gray-200 dark:border-gray-700 pb-[calc(2.25rem+env(safe-area-inset-bottom))]"
            >
              <div className="grid grid-cols-[9.5rem_minmax(0,1fr)] gap-3 items-center">
                {/* BotÇœo esquerdo (largura fixa sempre) */}
                <button
                  onClick={onBack}
                  className="
      inline-flex items-center justify-center gap-2
      w-[9.5rem]
      px-4 py-3
      border-2 border-gray-300 dark:border-gray-600
      rounded-xl
      text-gray-700 dark:text-gray-200
      hover:bg-gray-100 dark:hover:bg-gray-700
      transition-colors font-medium
      whitespace-nowrap
    "
                >
                  <ChevronLeft className="w-5 h-5" />
                  {currentStep === 1 ? "Cancelar" : "Voltar"}
                </button>

                {/* BotÇœo direito (nunca corta, sempre cabe) */}
                <button
                  onClick={onPrimary}
                  disabled={!canGoNext || isSearching}
                  className={`
                                w-full min-w-0
                                inline-flex items-center justify-center gap-2
                                px-4 sm:px-6 py-3
                                rounded-xl font-bold text-base sm:text-lg
                                transition-all
                                ${!canGoNext || isSearching
                      ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
                      : "bg-[#8B27FF] text-white hover:bg-[#6B1FBF] shadow-lg shadow-purple-500/30"
                    }
                          `}
                >
                  {isSearching ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Search className="w-5 h-5" />
                      </motion.div>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span className="leading-tight">Procurar QuestÇœo</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
