import { AlertTriangle, ArrowRight, X, BookOpen, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizWarningPageProps {
  navigateTo: (page: string, data?: any) => void;
  competencyData?: {
    competency: string;
    category: string;
    categoryColor: string;
    competencyIcon?: any;
    categoryIcon?: any;
    fromPage?: string;
  };
}

export default function QuizWarningPage({
  navigateTo,
  competencyData,
}: QuizWarningPageProps) {

  const handleStartQuiz = () => {
    // Ir direto para o quiz sem verificar bloqueio
    navigateTo('quiz', competencyData);
  };

  const handleCancel = () => {
    const returnPage = competencyData?.fromPage || 'habilidades';
    navigateTo(returnPage);
  };

  const handleStudyFirst = () => {
    navigateTo('conteudos');
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleCancel}
      >
        {/* Modal Pop-up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Colorido */}
          <div
            className="relative p-6 text-white"
            style={{
              background: `linear-gradient(135deg, ${competencyData?.categoryColor} 0%, ${competencyData?.categoryColor}dd 100%)`,
            }}
          >
            {/* Close button */}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 p-2.5 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 backdrop-blur-sm z-10 cursor-pointer"
            >
              <X className="w-6 h-6" strokeWidth={3} />
            </button>

            <p className="text-sm opacity-90 mb-1">{competencyData?.category}</p>
            <h2 className="text-2xl font-bold">{competencyData?.competency}</h2>
          </div>

          {/* Conteúdo */}
          <div className="p-6 space-y-4">
            {/* Dica de Estudo - Compacto */}
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-l-4 border-[#A855F7] dark:border-[#C084FC] rounded-lg">
              <Info className="w-6 h-6 text-[#8B27FF] dark:text-[#C084FC] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-base text-purple-900 dark:text-purple-200 mb-2">
                  <strong>Dica:</strong> Estude os conteúdos antes de começar!
                </p>
                <button
                  onClick={handleStudyFirst}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ir para Conteúdos</span>
                </button>
              </div>
            </div>

            {/* Aviso de Regras - Compacto */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 dark:border-amber-600 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-base text-amber-900 dark:text-amber-200">
                  <strong>Atenção:</strong> Se errar <strong>2 desafios</strong>, você deverá aguardar <strong>5 dias</strong> para refazer esse teste.
                </p>
              </div>
            </div>

            {/* Informações Resumidas */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <ul className="space-y-2 text-base text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#8B27FF] dark:text-[#C084FC]">•</span>
                  <span>3 desafios seguidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B27FF] dark:text-[#C084FC]">•</span>
                  <span>Sem limite de tempo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B27FF] dark:text-[#C084FC]">•</span>
                  <span>Resultado exibido ao final</span>
                </li>
              </ul>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold text-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleStartQuiz}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#8B27FF] to-[#9D3FFF] dark:from-[#A855F7] dark:to-[#C084FC] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold text-lg"
              >
                <span>Iniciar</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}