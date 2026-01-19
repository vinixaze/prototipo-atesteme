import React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Loader,
  Send,
  Sparkles,
  X,
} from "lucide-react";

interface LessonPlanGeneratorModalProps {
  isOpen: boolean;
  generatedPrompt: string;
  currentStep: number;
  totalSteps: number;
  isGenerating: boolean;
  renderStep: () => React.ReactNode;
  onBackdropClose: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGeneratePrompt: () => void;
  onCopyPrompt: () => void;
  onOpenInGemini: () => void;
}

export default function LessonPlanGeneratorModal({
  isOpen,
  generatedPrompt,
  currentStep,
  totalSteps,
  isGenerating,
  renderStep,
  onBackdropClose,
  onClose,
  onPrev,
  onNext,
  onGeneratePrompt,
  onCopyPrompt,
  onOpenInGemini,
}: LessonPlanGeneratorModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onBackdropClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B27FF] to-[#A855F7] p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Gerar Prompt </h2>
                  <span className="text-white text-lg">Plano de aula com IA</span>
                  <p className="text-white/80 text-sm">
                    {generatedPrompt ? "Prompt gerado com sucesso!" : `Etapa ${currentStep} de ${totalSteps}`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Progress Bar */}
            {!generatedPrompt && (
              <div className="bg-gray-100 dark:bg-gray-700 h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[#8B27FF] to-[#A855F7]"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {generatedPrompt ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-600 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Prompt Gerado!</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Copie o prompt abaixo e use no Gemini da sua conta
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-white font-mono">
                      {generatedPrompt}
                    </pre>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onCopyPrompt}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <Copy className="w-5 h-5" />
                      Copiar Prompt
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onOpenInGemini}
                      className="flex-1 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9D3FFF] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                      Abrir no Gemini
                    </motion.button>
                  </div>
                </div>
              ) : (
                renderStep()
              )}
            </div>

            {/* Footer Navigation */}
            {!generatedPrompt && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPrev}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Voltar
                </motion.button>

                {currentStep < totalSteps ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="flex items-center gap-2 bg-[#8B27FF] hover:bg-[#7B1FE8] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
                  >
                    PrÇüximo
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onGeneratePrompt}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9D3FFF] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Gerar Prompt
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
