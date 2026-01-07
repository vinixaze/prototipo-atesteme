import { CheckCircle2, XCircle, ArrowRight, BookOpen, MessageSquare, Eye, X, Layers, Target, Database, Users, FileEdit, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface TestResultProps {
  navigateTo: (page: string, data?: any) => void;
  testName: string;
  correctAnswers: number;
  totalQuestions: number;
  results: Array<{
    questionId: number;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    options: Array<{
      letter: string;
      text: string;
      isCorrect: boolean;
    }>;
    explanation?: string;
    category?: string;
    categoryColor?: string;
    competency?: string;
  }>;
  onBackClick?: () => void;
  explanations?: string[];
}

export default function TestResult({
  navigateTo,
  testName,
  correctAnswers,
  totalQuestions,
  results,
  onBackClick,
  explanations = [],
}: TestResultProps) {
  const [challengePopup, setChallengePopup] = useState<{
    isOpen: boolean;
    question: any;
    index: number;
  }>({ isOpen: false, question: null, index: -1 });

  // Helper function to get category icon
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'INFORMAÇÕES E DADOS':
        return Database;
      case 'COMUNICAÇÃO E COLABORAÇÃO':
        return Users;
      case 'CRIAÇÃO DE CONTEÚDO':
        return FileEdit;
      case 'PROTEÇÃO E SEGURANÇA':
        return Shield;
      default:
        return Layers;
    }
  };

  const getCompetencyIcon = () => {
    return Target;
  };

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const errorCount = totalQuestions - correctAnswers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl text-[#8B27FF] dark:text-[#A855F7] mb-2">
                Desafio Concluído!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Você completou {testName}
              </p>
            </div>
            <button
              onClick={onBackClick || (() => navigateTo('dashboard'))}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all font-medium"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Voltar</span>
            </button>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-[#8B27FF] dark:text-[#A855F7] mb-1">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Acertos</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de acerto</div>
            </div>
            <div className="bg-red-50 dark:bg-red-950 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                {errorCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Erros</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Seu desempenho</span>
              <span className="text-sm font-bold text-[#8B27FF] dark:text-[#A855F7]">
                {percentage}% correto
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#8B27FF] to-[#A855F7] rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Results List */}
        <div className="space-y-4">
          {results.map((result, index) => {
            const CategoryIcon = result.category ? getCategoryIcon(result.category) : Layers;
            const CompetencyIcon = getCompetencyIcon();
            const explanation = explanations[result.questionId - 1] || result.explanation || '';
            const categoryColor = result.categoryColor || '#8B27FF';

            return (
              <motion.div
                key={result.questionId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border-l-4 transition-all hover:shadow-lg ${
                    result.isCorrect
                      ? 'border-l-green-600 dark:border-l-green-400'
                      : 'border-l-red-600 dark:border-l-red-400'
                  }`}
                >
                  {/* Category and Competency Info */}
                  {(result.category || result.competency) && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {result.category && (
                        <div
                          className="px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                          style={{ backgroundColor: categoryColor + '20' }}
                        >
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: categoryColor }}
                          >
                            <CategoryIcon className="w-3 h-3 text-white" strokeWidth={2} />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-semibold leading-none" style={{ color: categoryColor }}>
                              Categoria
                            </p>
                            <p className="text-[11px] font-medium leading-tight mt-0.5" style={{ color: categoryColor }}>
                              {result.category}
                            </p>
                          </div>
                        </div>
                      )}

                      {result.competency && (
                        <div
                          className="px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                          style={{ backgroundColor: categoryColor + '20' }}
                        >
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: categoryColor }}
                          >
                            <CompetencyIcon className="w-3 h-3 text-white" strokeWidth={2} />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-semibold leading-none" style={{ color: categoryColor }}>
                              Competência
                            </p>
                            <p className="text-[11px] font-medium leading-tight mt-0.5" style={{ color: categoryColor }}>
                              {result.competency}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* BNCC Card - roxo */}
                      <div className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-purple-100 dark:bg-purple-950">
                        <div className="w-5 h-5 rounded flex items-center justify-center bg-purple-600 dark:bg-purple-700">
                          <BookOpen className="w-3 h-3 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-semibold leading-none text-purple-700 dark:text-purple-300">
                            BNCC
                          </p>
                          <p className="text-[11px] font-medium leading-tight mt-0.5 text-purple-700 dark:text-purple-300">
                            Competência 5
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cabeçalho do Desafio */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                        Desafio {result.questionId}
                      </span>
                      {result.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <p className="text-gray-900 dark:text-gray-100">{result.questionText}</p>
                  </div>

                  {/* Respostas */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Sua resposta:</span>
                      <span
                        className={`font-medium ${
                          result.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                        }`}
                      >
                        {result.userAnswer}.{' '}
                        {result.options.find((opt) => opt.letter === result.userAnswer)?.text}
                      </span>
                    </div>

                    {/* Resposta Correta - SEMPRE MOSTRAR */}
                    {result.correctAnswer !== result.userAnswer && (
                      <div className="flex items-start gap-2">
                        <span className="text-gray-600 dark:text-gray-400">Resposta correta:</span>
                        <span className="font-medium text-green-700 dark:text-green-400">
                          {result.correctAnswer}.{' '}
                          {result.options.find((opt) => opt.letter === result.correctAnswer)?.text}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Botão Ver Desafio - Canto inferior direito */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() =>
                        setChallengePopup({
                          isOpen: true,
                          question: result,
                          index: result.questionId - 1,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-white dark:bg-gray-700 border-2 border-[#8B27FF] dark:border-[#A855F7] text-[#8B27FF] dark:text-[#A855F7] rounded-xl hover:bg-purple-50 dark:hover:bg-gray-600 hover:shadow-lg transition-all text-sm sm:text-base font-medium"
                    >
                      <Eye className="w-4 h-4 flex-shrink-0" />
                      <span className="hidden sm:inline">Ver desafio</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Challenge Popup */}
        {challengePopup.isOpen && challengePopup.question && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header do Popup */}
              <div className="sticky top-0 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white p-6 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-xl font-bold">Detalhes do Desafio</h2>
                <button
                  onClick={() =>
                    setChallengePopup({ isOpen: false, question: null, index: -1 })
                  }
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Conteúdo do Popup */}
              <div className="p-6 space-y-6">
                {/* Pergunta */}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {challengePopup.question.questionText}
                  </h3>
                </div>

                {/* Opções */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Opções:</h4>
                  {challengePopup.question.options.map((opt: any) => (
                    <div
                      key={opt.letter}
                      className={`p-3 rounded-lg border-2 ${
                        opt.letter === challengePopup.question.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : opt.letter === challengePopup.question.userAnswer
                            ? 'border-red-500 bg-red-50 dark:bg-red-950'
                            : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-700 dark:text-gray-300 min-w-max">
                          {opt.letter}.
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">{opt.text}</span>
                        {opt.letter === challengePopup.question.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                        )}
                        {opt.letter === challengePopup.question.userAnswer &&
                          opt.letter !== challengePopup.question.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                          )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explicação */}
                {challengePopup.question.explanation && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 dark:border-blue-600 rounded">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                      � Detalhes:
                    </h4>
                    <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                      {challengePopup.question.explanation}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
