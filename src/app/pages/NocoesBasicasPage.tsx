import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import TestQuestion from '../components/TestQuestion';
import TestCongrats from '../components/TestCongrats';
import TestResult from '../components/TestResult';

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

const explanations = [
  'O teclado é um dos principais dispositivos de entrada de dados em um computador, permitindo a digitação de textos e comandos.',
  'Google Chrome é um navegador de internet desenvolvido pelo Google, usado para acessar páginas da web. Os demais são programas com outras finalidades.',
  'WWW significa "World Wide Web", que é o sistema de documentos interligados acessíveis pela internet através de navegadores.',
];

type PageState = 'question' | 'congrats' | 'result';

export default function NocoesBasicasPage({ navigateTo }: NocoesBasicasPageProps) {
  const [pageState, setPageState] = useState<PageState>('question');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFillingSkipped, setIsFillingSkipped] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<{ status: 'current' | 'answered' | 'future' | 'skipped' }[]>(
    Array.from({ length: questions.length }, (_, i) => ({
      status: i === 0 ? 'current' : 'future'
    }))
  );
  const [testResults, setTestResults] = useState<any>(null);

  const currentQuestionData = questions[currentQuestion - 1];

  const handleSelectAnswer = (letter: string) => {
    setSelectedAnswer(letter);
  };

  const handleSaveAnswer = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion]: selectedAnswer,
    };
    setSelectedAnswers(updatedAnswers);

    setStepStatuses((prev) => {
      const next = [...prev];
      next[currentQuestion - 1] = { status: 'answered' };
      return next;
    });

    setSelectedAnswer('');

    // ✅ pega todas as não respondidas (por id)
    const unansweredQuestions = questions.filter((q) => !updatedAnswers[q.id]);

    // ✅ se está preenchendo puladas, continua nelas
    if (isFillingSkipped) {
      if (unansweredQuestions.length > 0) {
        const nextUnanswered = unansweredQuestions[0];
        setTimeout(() => {
          setStepStatuses((prev) => {
            const next = [...prev];
            next[nextUnanswered.id - 1] = { status: 'current' };
            return next;
          });
          setCurrentQuestion(nextUnanswered.id);
        }, 300);
      } else {
        setTimeout(() => {
          setIsFillingSkipped(false);
          finalizarTeste(updatedAnswers);
        }, 300);
      }
      return;
    }

    // ✅ CASO CRÍTICO: salvou na última questão
    if (currentQuestion === questions.length) {
      if (unansweredQuestions.length > 0) {
        setIsFillingSkipped(true);

        toast.warning('Você tem questões sem resposta!', {
          description: `Complete as ${unansweredQuestions.length} questão${unansweredQuestions.length > 1 ? 'ões' : ''
            } restante${unansweredQuestions.length > 1 ? 's' : ''} para finalizar.`,
          duration: 5000,
        });

        const firstUnanswered = unansweredQuestions[0];
        setTimeout(() => {
          setStepStatuses((prev) => {
            const next = [...prev];
            next[firstUnanswered.id - 1] = { status: 'current' };
            return next;
          });
          setCurrentQuestion(firstUnanswered.id);
        }, 300);

        return;
      }

      // ✅ se não tem pendentes, finaliza
      setTimeout(() => finalizarTeste(updatedAnswers), 300);
      return;
    }

    // ✅ fluxo normal: vai para próxima
    setTimeout(() => {
      setStepStatuses((prev) => {
        const next = [...prev];
        next[currentQuestion] = { status: 'current' }; // próxima questão (index atual + 1)
        return next;
      });
      setCurrentQuestion((prev) => prev + 1);
    }, 300);
  };


  const handleSkip = () => {
    if (currentQuestion < questions.length) {
      const newStatuses = [...stepStatuses];
      if (!selectedAnswers[currentQuestion]) {
        newStatuses[currentQuestion - 1] = { status: 'skipped' };
      }
      newStatuses[currentQuestion] = { status: 'current' };
      setStepStatuses(newStatuses);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    }
  };

  const handleFinish = () => {
    let updatedAnswers = { ...selectedAnswers };

    if (selectedAnswer && currentQuestion === questions.length) {
      updatedAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(updatedAnswers);

      const newStatuses = [...stepStatuses];
      newStatuses[currentQuestion - 1] = { status: 'answered' };
      setStepStatuses(newStatuses);
    }

    const unansweredQuestions = questions.filter((q) => !updatedAnswers[q.id]);

    if (unansweredQuestions.length > 0) {
      setIsFillingSkipped(true);

      toast.warning('Você tem questões sem resposta!', {
        description: `Complete as ${unansweredQuestions.length} questão${unansweredQuestions.length > 1 ? 'ões' : ''} restante${unansweredQuestions.length > 1 ? 's' : ''} para finalizar.`,
        duration: 5000,
      });

      const firstUnanswered = unansweredQuestions[0];
      setTimeout(() => {
        const newStatuses = [...stepStatuses];
        if (stepStatuses[currentQuestion - 1].status === 'current') {
          newStatuses[currentQuestion - 1] = { status: 'future' };
        }
        newStatuses[firstUnanswered.id - 1] = { status: 'current' };
        setStepStatuses(newStatuses);
        setCurrentQuestion(firstUnanswered.id);
        setSelectedAnswer('');
      }, 500);

      return;
    }

    setTimeout(() => {
      finalizarTeste(updatedAnswers);
    }, 300);
  };

  const finalizarTeste = (answers = selectedAnswers) => {
    const correctAnswers = questions.filter((q) => {
      const answer = answers[q.id];
      return q.options.find((opt) => opt.isCorrect)?.letter === answer;
    }).length;

    const results = questions.map((q) => {
      const userAnswer = answers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      const isCorrect = userAnswer === correctOption?.letter;

      return {
        questionId: q.id,
        questionText: q.text,
        userAnswer: userAnswer || '',
        correctAnswer: correctOption?.letter || '',
        isCorrect,
        options: q.options,
        explanation: explanations[q.id - 1] || '',
        category: q.category,
        categoryColor: q.categoryColor,
        competency: q.competency,
      };
    });

    setTestResults({
      results,
      correctAnswers,
      totalQuestions: questions.length,
    });

    setPageState('congrats');
  };

  const handleCongratsClick = () => {
    setPageState('result');
  };

  /* Render Pages */
  if (pageState === 'congrats' && testResults) {
    return (
      <>
        <Toaster position="top-center" />
        <TestCongrats
          testName="Teste de Noções Básicas"
          message="Ótimo trabalho! Agora vamos ver como você se saiu..."
          onContinue={handleCongratsClick}
          showRocket={false}
        />
      </>
    );
  }

  if (pageState === 'result' && testResults) {
    return (
      <>
        <Toaster position="top-center" />
        <TestResult
          navigateTo={navigateTo}
          testName="Teste de Noções Básicas"
          correctAnswers={testResults.correctAnswers}
          totalQuestions={testResults.totalQuestions}
          results={testResults.results}
          onBackClick={() => navigateTo('dashboard')}
          explanations={explanations}
        />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <TestQuestion
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        questionText={currentQuestionData?.text}
        questionImage={currentQuestionData?.image}
        options={currentQuestionData?.options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        onSaveAnswer={handleSaveAnswer}
        onSkip={handleSkip}
        onFinish={handleFinish}
        stepStatuses={stepStatuses}
        title="Teste de Noções Básicas"
        categoryBadge={currentQuestionData?.category}
        categoryColor={currentQuestionData?.categoryColor}
        onBackClick={() => navigateTo('dashboard')}
        isLastQuestion={currentQuestion === questions.length}
      />
    </>
  );
}
