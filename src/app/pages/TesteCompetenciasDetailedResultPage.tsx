import { Rocket, Clipboard, CheckCircle, XCircle, Check, X, ArrowRight, BookOpen } from 'lucide-react';
import { useEffect } from 'react';

interface TesteCompetenciasDetailedResultPageProps {
  navigateTo: (page: string) => void;
  testData?: {
    answered: number;
    correct: number;
    total: number;
    selectedAnswers: Record<number, string>;
  };
}

// Importar questões
import { questions } from './TesteCompetenciasPage';

export default function TesteCompetenciasDetailedResultPage({
  navigateTo,
  testData,
}: TesteCompetenciasDetailedResultPageProps) {
  const answered = testData?.answered || 16;
  const correct = testData?.correct || 12;
  const total = testData?.total || 16;
  const selectedAnswers = testData?.selectedAnswers || {};
  const incorrect = answered - correct;
  const percentage = Math.round((correct / total) * 100);

  // Marcar teste como concluído quando entrar na página de resultados
  useEffect(() => {
    localStorage.setItem('testeCompetenciasCompleted', 'true');
  }, []);

  // Criar array de resultados
  const results = questions.map((q) => {
    const userAnswer = selectedAnswers[q.id];
    const correctOption = q.options.find((opt) => opt.isCorrect);
    const isCorrect = userAnswer === correctOption?.letter;
    
    return {
      questionId: q.id,
      category: q.category,
      categoryColor: q.categoryColor,
      competency: q.competency,
      questionText: q.text,
      userAnswer: userAnswer || '',
      correctAnswer: correctOption?.letter || '',
      isCorrect,
      options: q.options,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 animate-scaleUp relative">
        {/* Botão Voltar - Canto Superior Direito */}
        <button
          onClick={() => navigateTo('dashboard')}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all font-medium text-sm group z-10"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Voltar</span>
        </button>

        {/* Seção de Parabéns */}
        <div className="text-center mb-8">
          {/* Ícone */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] dark:from-[#A855F7] dark:to-[#C084FC] rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Rocket className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl text-[#6B1FBF] dark:text-[#D8B4FE] mb-4">
            Parabéns!
          </h1>

          {/* Mensagem */}
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Agora começa sua jornada no aprendizado!
          </p>
        </div>

        {/* Card de Resumo */}
        <div className="bg-[#F9F7FF] dark:bg-purple-950 border-2 border-[#E8E0FF] dark:border-purple-800 rounded-2xl p-8 mb-10">
          {/* Grid de Estatísticas */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Total de Questões */}
            <div className="text-center">
              <Clipboard className="w-8 h-8 text-[#8B27FF] dark:text-[#A855F7] mx-auto mb-2" />
              <div className="text-4xl text-[#8B27FF] dark:text-[#A855F7] mb-1">{total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Questões</div>
            </div>

            {/* Acertos */}
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-[#4CAF50] dark:text-green-400 mx-auto mb-2" />
              <div className="text-4xl text-[#4CAF50] dark:text-green-400 mb-1">{correct}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Acertos</div>
            </div>

            {/* Erros */}
            <div className="text-center">
              <XCircle className="w-8 h-8 text-[#EF5350] dark:text-red-400 mx-auto mb-2" />
              <div className="text-4xl text-[#EF5350] dark:text-red-400 mb-1">{incorrect}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Erros</div>
            </div>
          </div>

          {/* Porcentagem */}
          <div className="text-center pt-6 border-t border-[#E8E0FF] dark:border-purple-800">
            <div className="text-5xl text-[#8B27FF] dark:text-[#A855F7] mb-2">{percentage}%</div>
            <div className="text-gray-600 dark:text-gray-400">Taxa de acerto</div>
          </div>
        </div>

        {/* Lista de Questões */}
        <div className="mb-10">
          <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-6">
            Revisão das suas respostas
          </h2>

          <div className="space-y-4">
            {results.map((result, index) => {
              const userAnswerText = result.options.find(
                (opt) => opt.letter === result.userAnswer
              )?.text || 'Não respondida';
              
              const correctAnswerText = result.options.find(
                (opt) => opt.letter === result.correctAnswer
              )?.text || '';

              return (
                <div
                  key={result.questionId}
                  className={`rounded-xl p-6 border-l-4 transition-all hover:shadow-md ${
                    result.isCorrect
                      ? 'bg-[#E8F5E9] dark:bg-green-950 border-[#4CAF50] dark:border-green-600'
                      : result.userAnswer
                      ? 'bg-[#FFEBEE] dark:bg-red-950 border-[#EF5350] dark:border-red-600'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {/* Header do Card */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {/* Cards informativos */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {/* Card Área */}
                        <div 
                          className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                          style={{
                            backgroundColor: result.categoryColor,
                          }}
                        >
                          <div 
                            className="w-5 h-5 rounded flex items-center justify-center bg-white/20"
                          >
                            <span className="text-white text-[10px] font-bold">A</span>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-semibold leading-none mb-0.5 text-white/80">Área</p>
                            <p className="text-[11px] text-white font-medium leading-tight">
                              {result.category}
                            </p>
                          </div>
                        </div>

                        {/* Card Competência */}
                        <div 
                          className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                          style={{
                            backgroundColor: result.categoryColor,
                          }}
                        >
                          <div 
                            className="w-5 h-5 rounded flex items-center justify-center bg-white/20"
                          >
                            <span className="text-white text-[10px] font-bold">C</span>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-semibold leading-none mb-0.5 text-white/80">Competência</p>
                            <p className="text-[11px] text-white font-medium leading-tight">
                              {result.competency}
                            </p>
                          </div>
                        </div>

                        {/* Card BNCC */}
                        <div className="bg-purple-500 dark:bg-purple-600 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
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
                      
                      <h3 className="text-gray-800 dark:text-gray-200 text-sm">
                        Questão {index + 1}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {result.isCorrect ? (
                        <div className="w-10 h-10 rounded-full bg-[#4CAF50] dark:bg-green-600 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        </div>
                      ) : result.userAnswer ? (
                        <div className="w-10 h-10 rounded-full bg-[#EF5350] dark:bg-red-600 flex items-center justify-center">
                          <X className="w-6 h-6 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-white text-xs">?</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enunciado */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {result.questionText}
                  </p>

                  {/* Resposta do Usuário */}
                  <div className="mb-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Sua resposta: </span>
                    <span
                      className={`text-sm ${
                        result.isCorrect
                          ? 'text-[#4CAF50] dark:text-green-400'
                          : result.userAnswer
                          ? 'text-[#EF5350] dark:text-red-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {result.userAnswer ? (
                        <>
                          ({result.userAnswer}) {userAnswerText}
                          {result.isCorrect ? (
                            <Check className="inline w-4 h-4 ml-1" />
                          ) : (
                            <X className="inline w-4 h-4 ml-1" />
                          )}
                        </>
                      ) : (
                        'Não respondida'
                      )}
                    </span>
                  </div>

                  {/* Resposta Correta (se errou ou não respondeu) */}
                  {!result.isCorrect && (
                    <div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Resposta correta: </span>
                      <span className="text-sm text-[#4CAF50] dark:text-green-400">
                        ({result.correctAnswer}) {correctAnswerText}
                        <Check className="inline w-4 h-4 ml-1" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="flex justify-center">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full max-w-md px-8 py-5 bg-[#8B27FF] dark:bg-[#A855F7] text-white rounded-xl hover:bg-[#7B1FE8] dark:hover:bg-[#9333EA] transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span>Voltar ao Dashboard</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}