import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Book, Calendar, CheckCircle, Tag, XCircle } from "lucide-react";
import Header from "../../components/Header";

interface SingleQuestionPageProps {
  navigateTo: (page: string) => void;
  userName?: string;
  onLogout?: () => void;
  questionData?: any;
}

export default function SingleQuestionPage({
  navigateTo,
  userName,
  onLogout,
  questionData,
}: SingleQuestionPageProps) {
  const question = questionData?.questions?.[0];
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Nenhuma questão encontrada</p>
          <button
            onClick={() => navigateTo('transversality')}
            className="px-6 py-3 bg-[#8B27FF] text-white rounded-xl hover:bg-[#6B1FBF] transition-colors"
          >
            Voltar para Transversalidade
          </button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (letter: string) => {
    if (!showResult) {
      setSelectedAnswer(letter);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true);
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  const getOptionStyle = (optionLetter: string) => {
    if (!showResult) {
      return selectedAnswer === optionLetter
        ? 'border-[#8B27FF] bg-[#F3E8FF] dark:bg-purple-900/30'
        : 'border-gray-200 dark:border-gray-700 hover:border-[#8B27FF] bg-white dark:bg-gray-800';
    }

    if (optionLetter === question.correctAnswer) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/20';
    }

    if (optionLetter === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20';
    }

    return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header
        userName={userName || 'Professor'}
        onLogout={onLogout}
        onMenuClick={() => {}}
        navigateTo={navigateTo}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6">
        {/* Botão Voltar */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigateTo('transversality')}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#8B27FF] dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Transversalidade
        </motion.button>

        {/* Card da Questão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header com Informações de Transversalidade */}
          <div className="bg-gradient-to-r from-[#8B27FF] to-[#B855FF] p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Questão de {questionData.category}
            </h1>

            {/* Informações de Transversalidade */}
            <div className="flex flex-wrap gap-3">
              {question.transversality?.curricular && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                  <Book className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {question.transversality.curricular}
                  </span>
                </div>
              )}

              {question.transversality?.component && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {question.transversality.component}
                  </span>
                </div>
              )}

              {question.transversality?.year && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {question.transversality.year}
                  </span>
                </div>
              )}

              {question.transversality?.bnccType && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {question.transversality.bnccType}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo da Questão */}
          <div className="p-6 md:p-8">
            {/* Texto da Questão */}
            <div className="mb-8">
              <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
                {question.text}
              </p>
            </div>

            {/* Alternativas */}
            <div className="space-y-4 mb-8">
              {question.options.map((option: any) => (
                <motion.button
                  key={option.letter}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswerSelect(option.letter)}
                  disabled={showResult}
                  className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all ${getOptionStyle(
                    option.letter
                  )}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg transition-colors ${
                        !showResult
                          ? selectedAnswer === option.letter
                            ? 'bg-[#8B27FF] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          : option.letter === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : option.letter === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {option.letter}
                    </div>
                    <p className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed pt-1.5">
                      {option.text}
                    </p>
                    {showResult && option.letter === question.correctAnswer && (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    )}
                    {showResult &&
                      option.letter === selectedAnswer &&
                      selectedAnswer !== question.correctAnswer && (
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                      )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Botão de Confirmar */}
            {!showResult && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  selectedAnswer
                    ? 'bg-[#8B27FF] text-white hover:bg-[#6B1FBF] shadow-lg shadow-purple-500/30'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirmar Resposta
              </motion.button>
            )}

            {/* Resultado e Explicação */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-6 rounded-2xl ${
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    )}
                    <h3
                      className={`text-xl font-bold ${
                        isCorrect
                          ? 'text-green-800 dark:text-green-300'
                          : 'text-red-800 dark:text-red-300'
                      }`}
                    >
                      {isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}
                    </h3>
                  </div>

                  <div
                    className={`p-4 rounded-xl mb-6 ${
                      isCorrect
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Explicação:
                    </p>
                    <p
                      className={`leading-relaxed ${
                        isCorrect
                          ? 'text-green-800 dark:text-green-200'
                          : 'text-red-800 dark:text-red-200'
                      }`}
                    >
                      {question.explanation}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigateTo('transversality')}
                      className="flex-1 px-6 py-3 bg-[#8B27FF] text-white rounded-xl hover:bg-[#6B1FBF] transition-colors font-medium"
                    >
                      Nova Busca
                    </button>
                    <button
                      onClick={() => navigateTo('dashboard')}
                      className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      Ir para Dashboard
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
