import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, BookOpen, MessageSquare, ExternalLink, Eye, X, Layers, Target, Play, Globe, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { saveCompetencyResult } from '../utils/competencyStorage';

interface QuizResultPageProps {
  navigateTo: (page: string, data?: any) => void;
  previousPage?: string;
  testData?: {
    competency: string;
    category: string;
    categoryColor: string;
    categoryIcon?: any;
    competencyIcon?: any;
    selectedAnswers: Record<number, string>;
    questions: any[];
    returnTo?: string; // Página para onde deve retornar ao clicar em voltar
  };
}

export default function QuizResultPage({ navigateTo, testData, previousPage }: QuizResultPageProps) {
  const [challengePopup, setChallengePopup] = useState<{
    isOpen: boolean;
    question: any;
    index: number;
  }>({ isOpen: false, question: null, index: 0 });

  const [contentsPopup, setContentsPopup] = useState<{
    isOpen: boolean;
    competency: string;
    category: string;
    categoryColor: string;
  }>({ isOpen: false, competency: '', category: '', categoryColor: '' });

  if (!testData || !testData.questions || testData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">Dados não encontrados</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Não foi possível carregar os dados do teste.
          </p>
          <button
            onClick={() => navigateTo('habilidades')}
            className="px-6 py-3 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
          >
            Voltar para Habilidades
          </button>
        </div>
      </div>
    );
  }

  const { competency, category, categoryColor, categoryIcon, competencyIcon, selectedAnswers, questions, returnTo } = testData;

  // Debug para verificar se os ícones estão chegando
  console.log('QuizResultPage - categoryIcon:', categoryIcon);
  console.log('QuizResultPage - competencyIcon:', competencyIcon);

  // Calcular resultados
  const results = questions.map((q) => {
    const userAnswer = selectedAnswers[q.id];
    const correctOption = q.options?.find((opt: any) => opt.isCorrect);
    const isCorrect = userAnswer === correctOption?.letter;

    return {
      questionId: q.id,
      questionText: q.text,
      userAnswer: userAnswer || '',
      correctAnswer: correctOption?.letter || '',
      explanation: q.explanation || '',
      isCorrect,
      options: q.options || [],
      bncc: q.bncc || competency.split(' ')[0], // Extrair código BNCC do competency
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;
  const errorCount = 3 - correctCount;

  // Salvar resultado da competência
  useEffect(() => {
    saveCompetencyResult(competency, category, categoryColor, correctCount, errorCount);
  }, [competency, category, categoryColor, correctCount, errorCount]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 sm:p-8 text-center relative"
        >
          {/* Botão Voltar - Canto Superior Direito */}
          <button
            onClick={() => navigateTo(returnTo || 'progresso')}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all font-medium text-sm group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Voltar</span>
          </button>

          {/* Cards informativos */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {/* Card Área */}
            <div 
              className="rounded-lg px-3 py-2 flex items-center gap-2"
              style={{
                backgroundColor: categoryColor,
              }}
            >
              {categoryIcon && (() => {
                const Icon = categoryIcon;
                return <Icon className="w-4 h-4 text-white" strokeWidth={2} />;
              })()}
              <div>
                <p className="text-[10px] uppercase font-semibold leading-none mb-0.5 text-white/90">Área</p>
                <p className="text-sm text-white font-medium leading-tight">
                  {category}
                </p>
              </div>
            </div>

            {/* Card Competência */}
            <div 
              className="rounded-lg px-3 py-2 flex items-center gap-2"
              style={{
                backgroundColor: categoryColor,
              }}
            >
              {competencyIcon && (() => {
                const Icon = competencyIcon;
                return <Icon className="w-4 h-4 text-white" strokeWidth={2} />;
              })()}
              <div>
                <p className="text-[10px] uppercase font-semibold leading-none mb-0.5 text-white/90">Competência</p>
                <p className="text-sm text-white font-medium leading-tight">
                  {competency}
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-3xl text-gray-900 dark:text-gray-100 mb-2">
            Resultado do Desafio
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Veja seu desempenho detalhado abaixo</p>
        </div>

        {/* Resumo de Desempenho */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-6">
            Resumo do Desempenho
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-950 rounded-xl p-6 text-center">
              <div className="text-4xl text-green-600 dark:text-green-400 mb-2">{correctCount}</div>
              <div className="text-gray-700 dark:text-gray-300">Acertos</div>
            </div>
            <div className="bg-red-50 dark:bg-red-950 rounded-xl p-6 text-center">
              <div className="text-4xl text-red-600 dark:text-red-400 mb-2">{errorCount}</div>
              <div className="text-gray-700 dark:text-gray-300">Erros</div>
            </div>
          </div>

          {/* Porcentagem */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
            <div className="text-5xl mb-2" style={{ color: categoryColor }}>
              {Math.round((correctCount / 3) * 100)}%
            </div>
            <div className="text-gray-700 dark:text-gray-300">de aproveitamento</div>
          </div>
        </div>

        {/* Respostas Detalhadas */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-6">
            Respostas Detalhadas
          </h2>

          <div className="space-y-6">
            {results.map((result, index) => (
              <div
                key={result.questionId}
                className={`border-2 rounded-xl p-6 ${
                  result.isCorrect
                    ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-950'
                    : 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-950'
                }`}
              >
                {/* Container dos cards informativos - Hidden on mobile */}
                <div className="space-y-4 mb-4 hidden md:block">
                  {/* Primeira linha: Botão Ver Desafio (100%) */}
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        console.log('Botão clicado - Question:', questions[index]);
                        console.log('Options:', questions[index]?.options);
                        setChallengePopup({ isOpen: true, question: questions[index], index });
                      }}
                      className="px-3 py-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800 dark:hover:to-purple-700 border border-purple-200 dark:border-purple-700 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4 text-[#8B27FF] dark:text-[#C084FC]" strokeWidth={2} />
                      <span className="text-xs font-semibold text-[#8B27FF] dark:text-[#C084FC] whitespace-nowrap">Ver Desafio</span>
                    </motion.button>
                  </div>

                  {/* Segunda linha: Área e Competência lado a lado (50% cada) */}
                  <div className="flex gap-2">
                    {/* Card Área */}
                    <div 
                      className="flex-1 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
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
                        <p className="text-[9px] uppercase font-semibold leading-none mb-0.5 text-white/80">
                          Área
                        </p>
                        <p className="text-[11px] text-white font-medium leading-tight">
                          {category}
                        </p>
                      </div>
                    </div>

                    {/* Card Competência */}
                    <div 
                      className="flex-1 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
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
                        <p className="text-[9px] uppercase font-semibold leading-none mb-0.5 text-white/80">
                          Competência
                        </p>
                        <p className="text-[11px] text-white font-medium leading-tight">
                          {competency}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Terceira linha: Card BNCC (100%) */}
                  <div className="bg-purple-500 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/80 uppercase font-semibold leading-none mb-0.5">BNCC</p>
                      <p className="text-[11px] text-white font-medium leading-tight">
                        Competência 5 - Cultura Digital (BNCC)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile: Icons only inside card with button */}
                <div className="md:hidden flex items-center gap-2 mb-4">
                  {/* Icon Área */}
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: categoryColor }}>
                      {(() => {
                        const Icon = categoryIcon || Layers;
                        return <Icon className="w-4 h-4 text-white" strokeWidth={2} />;
                      })()}
                    </div>
                  </div>

                  {/* Icon Competência */}
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: categoryColor }}>
                      {(() => {
                        const Icon = competencyIcon || Target;
                        return <Icon className="w-4 h-4 text-white" strokeWidth={2} />;
                      })()}
                    </div>
                  </div>

                  {/* Icon BNCC */}
                  <div className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-500">
                      <BookOpen className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Ver Desafio Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      console.log('Botão clicado - Question:', questions[index]);
                      console.log('Options:', questions[index]?.options);
                      setChallengePopup({ isOpen: true, question: questions[index], index });
                    }}
                    className="px-3 py-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800 dark:hover:to-purple-700 border border-purple-200 dark:border-purple-700 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8B27FF] dark:text-[#C084FC]" strokeWidth={2} />
                    <span className="text-[10px] font-semibold text-[#8B27FF] dark:text-[#C084FC] whitespace-nowrap">Ver</span>
                  </motion.button>
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
                <div className="space-y-2 hidden md:block">
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
                      {result.explanation || 'Justificativa não disponível para este desafio.'}
                    </p>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex flex-col sm:flex-row gap-2.5 mt-4 pt-3.5 border-t border-gray-200 dark:border-gray-700">
                    {/* Botão Ver Conteúdos */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setContentsPopup({ 
                        isOpen: true,
                        competency: competency,
                        category: category,
                        categoryColor: categoryColor 
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
                        // Adicionar lógica de envio de observação
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
            ))}
          </div>
        </div>

        {/* Mensagem Final */}
        {correctCount === 3 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-green-900 mb-2">Parabéns!</h3>
                <p className="text-green-800">
                  Você acertou todas as questões! Continue praticando e desenvolvendo suas competências digitais.
                </p>
              </div>
            </div>
          </div>
        )}

        {correctCount < 3 && (
          <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 dark:border-blue-600 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-blue-900 dark:text-blue-200 mb-2">Continue Aprendendo</h3>
                <p className="text-blue-800 dark:text-blue-300">
                  Revise os conceitos e tente novamente. A prática leva à perfeição!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botão Voltar */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => navigateTo(returnTo || 'habilidades')}
            className="px-8 py-4 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all flex items-center gap-3 shadow-lg hover:shadow-xl"
          >
            <span>Voltar para {returnTo === 'progresso' ? 'Progresso' : 'Habilidades'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Challenge Popup Modal */}
      {challengePopup.isOpen && challengePopup.question && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setChallengePopup({ isOpen: false, question: null, index: 0 })}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 p-6 rounded-t-2xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Eye className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-xl text-white">Visualizar Desafio</h2>
                  <p className="text-sm text-white/80">Desafio {challengePopup.index + 1}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setChallengePopup({ isOpen: false, question: null, index: 0 })}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Question Text */}
              <div>
                <h3 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-2">Enunciado</h3>
                <p className="text-gray-900 dark:text-gray-100 text-lg leading-relaxed">
                  {challengePopup.question.text || 'Texto da questão não disponível'}
                </p>
              </div>

              {/* Options */}
              <div>
                <h3 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 mb-3">Alternativas</h3>
                <div className="space-y-3">
                  {challengePopup.question.options && challengePopup.question.options.length > 0 ? (
                    challengePopup.question.options.map((option: any) => {
                      const result = results[challengePopup.index];
                      const isUserAnswer = option.letter === result?.userAnswer;
                      const isCorrect = option.letter === result?.correctAnswer;

                      return (
                        <div
                          key={option.letter}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isCorrect
                              ? 'bg-green-50 dark:bg-green-950 border-green-500 dark:border-green-600'
                              : isUserAnswer && !isCorrect
                              ? 'bg-red-50 dark:bg-red-950 border-red-500 dark:border-red-600'
                              : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold ${
                                isCorrect
                                  ? 'bg-green-500 dark:bg-green-600 text-white'
                                  : isUserAnswer && !isCorrect
                                  ? 'bg-red-500 dark:bg-red-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                              }`}
                            >
                              {option.letter}
                            </div>
                            <div className="flex-1">
                              <p className={`${
                                isCorrect || (isUserAnswer && !isCorrect)
                                  ? 'font-medium'
                                  : ''
                              } text-gray-800 dark:text-gray-200`}>
                                {option.text || 'Texto da alternativa não disponível'}
                              </p>
                              {isUserAnswer && !isCorrect && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">Sua resposta</p>
                              )}
                              {isCorrect && (
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">✓ Resposta correta</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-center">
                      <p className="text-gray-600 dark:text-gray-400">Alternativas não disponíveis</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Explanation */}
              {challengePopup.question.explanation && (
                <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 dark:border-blue-600 rounded-lg p-4">
                  <h3 className="text-xs uppercase font-bold text-blue-700 dark:text-blue-400 mb-2">💡 Explicação</h3>
                  <p className="text-blue-900 dark:text-blue-300 leading-relaxed">{challengePopup.question.explanation}</p>
                </div>
              )}

              {/* User answer & correct answer for popup */}
              {results[challengePopup.index] && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sua resposta:</span>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {results[challengePopup.index].userAnswer}. {results[challengePopup.index].options?.find((o: any) => o.letter === results[challengePopup.index].userAnswer)?.text}
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Resposta correta:</span>
                    <div className="font-medium text-green-700 dark:text-green-400">
                      {results[challengePopup.index].correctAnswer}. {results[challengePopup.index].options?.find((o: any) => o.letter === results[challengePopup.index].correctAnswer)?.text}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Contents Popup Modal */}
      {contentsPopup.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setContentsPopup({ isOpen: false, competency: '', category: '', categoryColor: '' })}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 p-6 rounded-t-2xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-xl text-white">Conteúdos de Aprendizagem</h2>
                  <p className="text-sm text-white/80">{contentsPopup.category}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setContentsPopup({ isOpen: false, competency: '', category: '', categoryColor: '' })}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-xl p-4 mb-4">
                <p className="text-sm text-purple-900 dark:text-purple-200">
                  <strong>Competência:</strong> {contentsPopup.competency}
                </p>
              </div>

              {/* Lista de conteúdos de exemplo */}
              <div className="space-y-3">
                {/* Conteúdo 1 */}
                <motion.a
                  href="https://www.youtube.com/results?search_query=tutorial+excel+dados"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="block bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">Vídeos Tutoriais no YouTube</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Aprenda com vídeos práticos sobre {contentsPopup.competency.toLowerCase()}
                      </p>
                      <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-md font-medium">
                        Vídeo
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Conteúdo 2 */}
                <motion.a
                  href="https://support.microsoft.com/pt-br/excel"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="block bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">Documentação Oficial Microsoft</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Guias e referências oficiais para dominar as ferramentas
                      </p>
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-md font-medium">
                        Site
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Conteúdo 3 */}
                <motion.a
                  href="https://www.google.com/search?q=curso+online+gratuito+excel"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="block bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">Cursos Online Gratuitos</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Encontre cursos completos e gratuitos sobre o tema
                      </p>
                      <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-md font-medium">
                        Curso
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Conteúdo 4 */}
                <motion.a
                  href="https://www.google.com/search?q=artigos+práticas+digitais"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="block bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">Artigos e Tutoriais</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Leia artigos detalhados com exemplos práticos
                      </p>
                      <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs rounded-md font-medium">
                        Artigo
                      </span>
                    </div>
                  </div>
                </motion.a>
              </div>

              {/* Rodapé informativo */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 dark:border-blue-600 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  💡 <strong>Dica:</strong> Clique nos links acima para acessar os conteúdos de aprendizagem e aprofundar seus conhecimentos sobre esta competência.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}