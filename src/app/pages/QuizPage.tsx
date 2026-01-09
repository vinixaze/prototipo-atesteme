import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { quizQuestions } from '../data/quizQuestions';
import TestQuestion from '../components/TestQuestion';
import TestCongrats from '../components/TestCongrats';
import TestResult from '../components/TestResult';

const BACK_ROUTE_MAP: Record<string, string> = {
  transversalidade: 'transversalidade',
  habilidades: 'habilidades',
  dashboard: 'dashboard'
};

interface QuizPageProps {
  navigateTo: (page: string, data?: any) => void;
  competencyData?: any;
  quizData?: any;
}

type PageState = 'question' | 'congrats' | 'result';

export default function QuizPage({
  navigateTo,
  competencyData,
  quizData
}: QuizPageProps) {
  /* Meta Information */
  const quizMeta = quizData || competencyData;
  const questions =
    quizMeta?.questions && quizMeta.questions.length > 0
      ? quizMeta.questions
      : quizQuestions[quizMeta?.competency || ''] || [];

  /* Page State */
  const [pageState, setPageState] = useState<PageState>('question');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFillingSkipped, setIsFillingSkipped] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<{ status: 'current' | 'answered' | 'future' | 'skipped' }[]>(
    Array(questions.length).fill(null).map((_, i) => ({
      status: i === 0 ? 'current' : 'future'
    }))
  );
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<any>(null);

  const currentQuestionData = questions[currentQuestion - 1];

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Nenhuma questão disponível para este conteúdo.</p>
      </div>
    );
  }

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Carregando questão...</p>
      </div>
    );
  }

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
    setSelectedAnswer('');

    // Atualiza status do passo atual como answered
    setStepStatuses((prev) => {
      const next = [...prev];
      next[currentQuestion - 1] = { status: 'answered' };
      return next;
    });

    // Decide o que fazer depois de salvar
    const unanswered = questions.filter((q: any) => !updatedAnswers[q.id]);

    // Se está preenchendo puladas, segue nelas
    if (isFillingSkipped) {
      if (unanswered.length > 0) {
        const nextUnanswered = unanswered[0];
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

    // ✅ Se terminou a última questão:
    if (currentQuestion === questions.length) {
      // Se ainda tem sem resposta, vai pra primeira sem resposta
      if (unanswered.length > 0) {
        setIsFillingSkipped(true);
        toast.warning('Você tem questões sem resposta!', {
          description: `Complete as ${unanswered.length} questão${unanswered.length > 1 ? 'ões' : ''} restante${unanswered.length > 1 ? 's' : ''} para finalizar.`,
          duration: 5000,
        });

        const firstUnanswered = unanswered[0];
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

      // ✅ Se não tem sem resposta, finaliza
      setTimeout(() => finalizarTeste(updatedAnswers), 300);
      return;
    }

    // Se não é a última, vai pra próxima
    setTimeout(() => {
      setStepStatuses((prev) => {
        const next = [...prev];
        next[currentQuestion] = { status: 'current' }; // próximo índice (currentQuestion + 1) => posição currentQuestion
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

    const unansweredQuestions = questions.filter((q: any) => !updatedAnswers[q.id]);

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
    // Calcular resultados
    const correctAnswers = questions.filter((q: any) => {
      const answer = answers[q.id];
      return q.options.find((opt: any) => opt.letter === answer)?.isCorrect;
    }).length;

    const results = questions.map((q: any) => {
      const userAnswer = answers[q.id];
      const correctOption = q.options.find((opt: any) => opt.isCorrect);
      const isCorrect = userAnswer === correctOption?.letter;

      return {
        questionId: q.id,
        questionText: q.text,
        userAnswer: userAnswer || '',
        correctAnswer: correctOption?.letter || '',
        isCorrect,
        options: q.options,
        explanation: q.explanation || '',
        category: quizMeta?.category,
        categoryColor: quizMeta?.categoryColor,
        competency: quizMeta?.competency,
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
          testName="Desafio"
          message="Você completou todas as 16 questões. Agora vamos ver como você se saiu..."
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
          testName={`Desafio - ${quizMeta?.competency}`}
          correctAnswers={testResults.correctAnswers}
          totalQuestions={testResults.totalQuestions}
          results={testResults.results}
          onBackClick={() => {
            const backRoute = BACK_ROUTE_MAP[quizMeta?.fromPage || ''] || 'dashboard';
            navigateTo(backRoute);
          }}
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
        options={currentQuestionData?.options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        onSaveAnswer={handleSaveAnswer}
        onSkip={handleSkip}
        onFinish={handleFinish}
        stepStatuses={stepStatuses}
        eliminatedOptions={eliminatedOptions}
        title={`Desafio - ${quizMeta?.competency}`}
        categoryBadge={quizMeta?.category}
        categoryColor={quizMeta?.categoryColor}
        onBackClick={() => {
          const backRoute = BACK_ROUTE_MAP[quizMeta?.fromPage || ''] || 'dashboard';
          navigateTo(backRoute);
        }}
        isLastQuestion={currentQuestion === questions.length}
      />
    </>
  );
}
