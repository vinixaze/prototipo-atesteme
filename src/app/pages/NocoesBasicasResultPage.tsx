import { CheckCircle2, XCircle, ArrowRight, BookOpen, MessageSquare, ExternalLink, Eye, X, Layers, Target, Database, Users, FileEdit, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { questions } from './NocoesBasicasPage';

interface NocoesBasicasResultPageProps {
  navigateTo: (page: string, data?: any) => void;
  testData?: {
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
    }>;
  };
}

export default function NocoesBasicasResultPage({
  navigateTo,
  testData,
}: NocoesBasicasResultPageProps) {
  const correctAnswers = testData?.correctAnswers || 2;
  const totalQuestions = testData?.totalQuestions || 3;
  const results = testData?.results || [];
  
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
        return Database;
    }
  };

  // Helper function to get competency icon (usar ícone padrão)
  const getCompetencyIcon = () => {
    return Target;
  };

  // Justificativas para cada questão
  const explanations = [
    'O teclado é um dos principais dispositivos de entrada de dados em um computador, permitindo a digitação de textos e comandos.',
    'Google Chrome é um navegador de internet desenvolvido pelo Google, usado para acessar páginas da web. Os demais são programas com outras finalidades.',
    'WWW significa "World Wide Web", que é o sistema de documentos interligados acessíveis pela internet através de navegadores.',
  ];

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
                Você completou o desafio de Noções Básicas
              </p>
            </div>
            <button
              onClick={() => navigateTo('dashboard')}
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
              <div className="text-sm text-gray-600 dark:text-gray-400">Desafios Corretos</div>
            </div>
            <div className="bg-green-50 dark:bg-green-950 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {Math.round((correctAnswers / totalQuestions) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Acerto</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {correctAnswers * 3}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pontos</div>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="text-2xl text-gray-800 dark:text-gray-200 px-2">
            Respostas Detalhadas
          </h2>

          {results.map((result, index) => {
            // Buscar dados da questão original
            const originalQuestion = questions.find(q => q.id === result.questionId);
            const category = originalQuestion?.category || 'NOÇÕES BÁSICAS';
            const categoryColor = originalQuestion?.categoryColor || '#8B27FF';
            const competency = originalQuestion?.competency || 'Conhecimentos Básicos';
            const categoryIcon = getCategoryIcon(category);
            const competencyIcon = getCompetencyIcon();
            const explanation = explanations[index] || 'Justificativa não disponível para este desafio.';

            return (
              <div
                key={result.questionId}
                className={`border-2 rounded-xl p-6 ${
                  result.isCorrect
                    ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-950'
                    : 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-950'
                }`}
              >
                {/* Container dos cards informativos */}
                <div className="space-y-4 mb-4">
                  {/* Primeira linha: Botão Ver Desafio (100%) */}
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setChallengePopup({ isOpen: true, question: originalQuestion, index });
                      }}
                      className="px-3 py-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800 dark:hover:to-purple-700 border border-purple-200 dark:border-purple-700 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4 text-[#8B27FF] dark:text-[#C084FC]" strokeWidth={2} />
                      <span className="text-xs font-semibold text-[#8B27FF] dark:text-[#C084FC] whitespace-nowrap">Ver Desafio</span>
                    </motion.button>
                  </div>

                  {/* Segunda linha: Área e Competência lado a lado */}
                  <div className="flex gap-2 flex-wrap">
                    {/* Card Área */}
                    <div 
                      className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                      style={{
                        backgroundColor: categoryColor,
                      }}
                    >
                      <div 
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-white/20"
                      >
                        {(() => {
                          const Icon = categoryIcon || Layers;
                          return <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />;
                        })()}
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-semibold leading-none text-white/80">
                          Área
                        </p>
                        <p className="text-[11px] text-white font-medium leading-tight mt-0.5">
                          {category}
                        </p>
                      </div>
                    </div>

                    {/* Card Competência */}
                    <div 
                      className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                      style={{
                        backgroundColor: categoryColor,
                      }}
                    >
                      <div 
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-white/20"
                      >
                        {(() => {
                          const Icon = competencyIcon || Target;
                          return <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />;
                        })()}
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-semibold leading-none text-white/80">
                          Competência
                        </p>
                        <p className="text-[11px] text-white font-medium leading-tight mt-0.5">
                          {competency}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Terceira linha: Card BNCC */}
                  <div className="bg-purple-500 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 w-fit">
                    <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/80 uppercase font-semibold leading-none">BNCC</p>
                      <p className="text-[11px] text-white font-medium leading-tight mt-0.5">
                        Competência 5 - Cultura Digital (BNCC)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cabeçalho da Questão */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">Desafio {index + 1}</span>
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
                      {result.options.find((opt: any) => opt.letter === result.userAnswer)?.text}
                    </span>
                  </div>

                  {/* Resposta Correta - SEMPRE MOSTRAR */}
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 dark:text-gray-400">Resposta correta:</span>
                    <span className="font-medium text-green-700 dark:text-green-400">
                      {result.correctAnswer}.{' '}
                      {result.options.find((opt: any) => opt.letter === result.correctAnswer)?.text}
                    </span>
                  </div>

                  {/* Justificativa - SEMPRE MOSTRAR */}
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 dark:border-blue-600 rounded">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">💡 Justificativa:</span>
                    </div>
                    <p className="text-blue-800 dark:text-blue-300 text-sm mt-1 leading-relaxed">
                      {explanation}
                    </p>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex flex-col sm:flex-row gap-2.5 mt-4 pt-3.5 border-t border-gray-200 dark:border-gray-700">
                    {/* Botão Ver Conteúdos */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigateTo('conteudos', { 
                        filterCompetency: competency,
                        filterCategory: category,
                        filterCategoryColor: categoryColor 
                      })}
                      className="flex-1 group relative overflow-hidden bg-gradient-to-br from-[#6B1FCC] via-[#8B27FF] to-[#B855FF] text-white rounded-lg px-4 py-2.5 shadow-lg hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="font-semibold text-sm">Ver Conteúdos</span>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>

                    {/* Botão Enviar Observação */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        alert('Funcionalidade de envio de observação será implementada');
                      }}
                      className="flex-1 group relative overflow-hidden bg-white dark:bg-gray-700 border-2 border-[#8B27FF] dark:border-[#A855F7] text-[#8B27FF] dark:text-[#A855F7] rounded-lg px-4 py-2.5 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-sm">Enviar Observação</span>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-50/0 via-purple-50/50 to-purple-50/0 dark:from-purple-900/0 dark:via-purple-900/50 dark:to-purple-900/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão Final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9333EA] text-white rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3 font-bold text-lg"
          >
            <span>Voltar ao Dashboard</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      {/* Challenge Popup Modal */}
      {challengePopup.isOpen && challengePopup.question && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setChallengePopup({ isOpen: false, question: null, index: -1 })}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl text-[#8B27FF] dark:text-[#A855F7]">
                Desafio {challengePopup.index + 1}
              </h2>
              <button
                onClick={() => setChallengePopup({ isOpen: false, question: null, index: -1 })}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Question Image */}
              {challengePopup.question.image && (
                <img
                  src={challengePopup.question.image}
                  alt="Question visual"
                  className="w-full rounded-lg mb-6"
                />
              )}

              {/* Question Text */}
              <h3 className="text-xl text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                {challengePopup.question.text}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {challengePopup.question.options.map((option: any) => {
                  const result = results[challengePopup.index];
                  const isUserAnswer = option.letter === result.userAnswer;
                  const isCorrectAnswer = option.isCorrect;

                  return (
                    <div
                      key={option.letter}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : isUserAnswer
                          ? 'border-red-500 bg-red-50 dark:bg-red-950'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`font-bold ${
                          isCorrectAnswer
                            ? 'text-green-700 dark:text-green-400'
                            : isUserAnswer
                            ? 'text-red-700 dark:text-red-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {option.letter}.
                        </span>
                        <span className={`flex-1 ${
                          isCorrectAnswer
                            ? 'text-green-900 dark:text-green-100'
                            : isUserAnswer
                            ? 'text-red-900 dark:text-red-100'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {option.text}
                        </span>
                        {isCorrectAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        )}
                        {isUserAnswer && !isCorrectAnswer && (
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}