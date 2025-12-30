import { useState } from 'react';
import TestHeader from '../components/TestHeader';
import ProgressTracker, { QuestionState } from '../components/ProgressTracker';
import AnswerOption from '../components/AnswerOption';
import { MessageSquare } from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface NocoesBasicasPageProps {
  navigateTo: (page: string, data?: any) => void;
}

interface Question {
  id: number;
  text: string;
  image?: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
  // Informações de categoria para cores dinâmicas
  category: string;
  categoryColor: string;
  area: string;
  competency: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: 'A imagem abaixo apresenta uma parte de um aparelho eletrônico. Selecione a opção que indica de qual aparelho é.',
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=600&h=400&fit=crop',
    options: [
      { letter: 'a', text: 'Teclado de computador', isCorrect: true },
      { letter: 'b', text: 'Mouse sem fio', isCorrect: false },
      { letter: 'c', text: 'Controle remoto', isCorrect: false },
      { letter: 'd', text: 'Tablet', isCorrect: false },
      { letter: 'e', text: 'Smartphone', isCorrect: false },
    ],
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    area: 'Informações e Dados',
    competency: 'Navegação e Pesquisa',
  },
  {
    id: 2,
    text: 'Qual das opções abaixo representa um navegador de internet?',
    options: [
      { letter: 'a', text: 'Microsoft Word', isCorrect: false },
      { letter: 'b', text: 'Google Chrome', isCorrect: true },
      { letter: 'c', text: 'Adobe Photoshop', isCorrect: false },
      { letter: 'd', text: 'Windows Media Player', isCorrect: false },
      { letter: 'e', text: 'Microsoft Excel', isCorrect: false },
    ],
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    area: 'Comunicação e Colaboração',
    competency: 'Interação por Meios Digitais',
  },
  {
    id: 3,
    text: 'O que significa "WWW" em um endereço de site?',
    options: [
      { letter: 'a', text: 'World Wide Web', isCorrect: true },
      { letter: 'b', text: 'World Web Work', isCorrect: false },
      { letter: 'c', text: 'Web World Wide', isCorrect: false },
      { letter: 'd', text: 'Wireless Web World', isCorrect: false },
      { letter: 'e', text: 'Web Wide World', isCorrect: false },
    ],
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    area: 'Proteção e Segurança',
    competency: 'Proteção de Dados Pessoais',
  },
];

export default function NocoesBasicasPage({ navigateTo }: NocoesBasicasPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isFillingSkipped, setIsFillingSkipped] = useState(false); // Controlar modo de completar puladas
  
  // Usar a mesma estrutura do teste de 16 questões
  const [stepStatuses, setStepStatuses] = useState<{ status: 'future' | 'current' | 'answered' | 'skipped' }[]>(
    Array.from({ length: 3 }, (_, i) => ({
      status: i === 0 ? 'current' : 'future'
    }))
  );

  const currentQuestionData = questions[currentQuestion - 1];

  const handleSelectAnswer = (letter: string) => {
    setSelectedAnswer(letter);
  };

  const handleSaveAnswer = () => {
    if (!selectedAnswer) return;

    // Salvar a resposta
    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion]: selectedAnswer,
    };
    setSelectedAnswers(updatedAnswers);

    // Marcar como respondida (sem feedback de correto/incorreto)
    const newStatuses = [...stepStatuses];
    newStatuses[currentQuestion - 1] = { status: 'answered' };
    setStepStatuses(newStatuses);

    // Limpar seleção atual
    setSelectedAnswer('');

    // Se estiver no modo de completar questões puladas, ir para a próxima questão pulada
    if (isFillingSkipped) {
      const unansweredQuestions = questions.filter((q) => q.id !== currentQuestion && !updatedAnswers[q.id]);
      
      if (unansweredQuestions.length > 0) {
        // Ainda há questões não respondidas, navegar para a próxima
        const nextUnanswered = unansweredQuestions[0];
        setTimeout(() => {
          newStatuses[nextUnanswered.id - 1] = { status: 'current' };
          setStepStatuses(newStatuses);
          setCurrentQuestion(nextUnanswered.id);
        }, 300);
      } else {
        // Todas respondidas agora, finalizar com as respostas atualizadas
        setTimeout(() => {
          setIsFillingSkipped(false);
          finalizarTeste(updatedAnswers);
        }, 300);
      }
    } else {
      // Navegação normal: avançar para a próxima questão
      if (currentQuestion < 3) {
        setTimeout(() => {
          newStatuses[currentQuestion] = { status: 'current' };
          setStepStatuses(newStatuses);
          setCurrentQuestion(currentQuestion + 1);
        }, 300);
      }
    }
  };

  const handleSkip = () => {
    if (currentQuestion < 3) {
      const newStatuses = [...stepStatuses];
      // Marcar questão atual como pulada se ainda não foi respondida
      if (!selectedAnswers[currentQuestion]) {
        newStatuses[currentQuestion - 1] = { status: 'skipped' };
      }
      // Marcar próxima questão como atual
      newStatuses[currentQuestion] = { status: 'current' };
      setStepStatuses(newStatuses);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(''); // Limpar seleção ao pular
    }
  };

  const handleFinish = () => {
    // Se há uma resposta selecionada na questão atual, salvar automaticamente antes de finalizar
    let updatedAnswers = { ...selectedAnswers };
    
    if (selectedAnswer && currentQuestion === 3) {
      updatedAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(updatedAnswers);
      
      // Marcar como respondida
      const newStatuses = [...stepStatuses];
      newStatuses[currentQuestion - 1] = { status: 'answered' };
      setStepStatuses(newStatuses);
    }
    
    // Verificar se há questões não respondidas (excluindo a atual se tiver resposta selecionada)
    const unansweredQuestions = questions.filter((q) => !updatedAnswers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      // Ativar modo de completar questões puladas
      setIsFillingSkipped(true);
      
      // Mostrar toast informativo
      toast.warning('Você tem questões sem resposta!', {
        description: `Complete as ${unansweredQuestions.length} questão${unansweredQuestions.length > 1 ? 'ões' : ''} restante${unansweredQuestions.length > 1 ? 's' : ''} para finalizar.`,
        duration: 5000,
      });
      
      // Navegar para a primeira questão não respondida
      const firstUnanswered = unansweredQuestions[0];
      setTimeout(() => {
        const newStatuses = [...stepStatuses];
        // Resetar a questão atual
        if (stepStatuses[currentQuestion - 1].status === 'current') {
          newStatuses[currentQuestion - 1] = { status: 'future' };
        }
        // Marcar primeira não respondida como atual
        newStatuses[firstUnanswered.id - 1] = { status: 'current' };
        setStepStatuses(newStatuses);
        setCurrentQuestion(firstUnanswered.id);
        setSelectedAnswer(''); // Limpar resposta selecionada
      }, 500);
      
      return;
    }

    // Se todas respondidas, finalizar direto
    setTimeout(() => {
      finalizarTeste(updatedAnswers);
    }, 300);
  };

  const finalizarTeste = (answers = selectedAnswers) => {
    // Navegar para tela de parabéns intermediária
    navigateTo('nocoes-basicas-congrats', {
      selectedAnswers: answers,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header - cores e informações dinâmicas baseadas na questão atual */}
      <TestHeader
        categoryBadge={currentQuestionData.category}
        categoryColor={currentQuestionData.categoryColor}
        title="Teste de Conhecimentos Básicos - Nível 0"
        onBackClick={() => navigateTo('dashboard')}
        area={currentQuestionData.area}
        competency={currentQuestionData.competency}
        bncc="Competência 5 - Cultura Digital"
        description="Avalie seus conhecimentos básicos sobre informática, internet e tecnologia digital antes de iniciar sua jornada de aprendizado."
      />

      {/* Progress Tracker */}
      <ProgressTracker
        totalQuestions={3}
        currentQuestion={currentQuestion}
        questionStates={stepStatuses.map(status => status.status as QuestionState)}
        testName="Noções Básicas - Nível 0"
      />

      {/* Question Card */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 md:p-12 animate-fadeIn">
          {/* Enunciado */}
          <h2 className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6 sm:mb-8">
            {currentQuestionData.text}
          </h2>

          {/* Imagem (se houver) */}
          {currentQuestionData.image && (
            <div className="mb-6 sm:mb-8 flex justify-center">
              <img
                src={currentQuestionData.image}
                alt="Question illustration"
                className="max-w-full md:max-w-2xl rounded-xl shadow-md"
              />
            </div>
          )}

          {/* Opções de Resposta */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
            {currentQuestionData.options.map((option) => (
              <AnswerOption
                key={option.letter}
                letter={option.letter}
                text={option.text}
                isSelected={selectedAnswer === option.letter}
                isCorrect={false}
                isIncorrect={false}
                showFeedback={false}
                disabled={false}
                onClick={() => handleSelectAnswer(option.letter)}
              />
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <button
              onClick={handleSkip}
              className="order-1 sm:order-1 self-start sm:self-auto px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm"
            >
              Pular
            </button>

            <button
              onClick={currentQuestion < 3 ? handleSaveAnswer : handleFinish}
              disabled={!selectedAnswer}
              className="order-2 sm:order-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#8B27FF] dark:bg-[#A855F7] text-white rounded-lg hover:bg-[#7B1FE8] dark:hover:bg-[#9333EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>Salvar resposta</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Botão Flutuante: Enviar Observação */}
        <button className="fixed bottom-8 right-8 px-6 py-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] border-2 border-[#8B27FF] dark:border-[#A855F7] rounded-full shadow-lg hover:bg-[#F3E8FF] dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm">Enviar Observação</span>
        </button>
      </div>
      <Toaster />
    </div>
  );
}