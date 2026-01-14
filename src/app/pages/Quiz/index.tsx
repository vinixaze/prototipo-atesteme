import { useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import { quizQuestions } from "../../data/quizQuestions";
import TestQuestion from "../../components/TestQuestion";
import TestCongrats from "../../components/TestCongrats";
import TestResult from "../../components/TestResult";

const BACK_ROUTE_MAP: Record<string, string> = {
  transversalidade: 'transversality',
  transversality: 'transversality',
  habilidades: 'habilidades',
  dashboard: 'dashboard',
};

interface QuizPageProps {
  navigateTo: (page: string, data?: any) => void;
  competencyData?: any;
  quizData?: any;
}

type PageState = 'question' | 'congrats' | 'result';

export default function QuizPage({ navigateTo, competencyData, quizData }: QuizPageProps) {
  const quizMeta = quizData || competencyData;

  const questions = useMemo(() => {
    const qs =
      quizMeta?.questions && quizMeta.questions.length > 0
        ? quizMeta.questions
        : quizQuestions[quizMeta?.competency || ''] || [];

    return Array.isArray(qs) ? qs : [];
  }, [quizMeta]);

  const [pageState, setPageState] = useState<PageState>('question');

  // navegação por índice (posição), nunca por id
  const [currentIndex, setCurrentIndex] = useState(0);

  //  resposta atual (A/B/C...)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  // respostas por ID real da questão (pode ser number ou string)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string | number, string>>({});

  const [isFillingSkipped, setIsFillingSkipped] = useState(false);

  // status por índice (posição)
  const [stepStatuses, setStepStatuses] = useState<{ status: 'current' | 'answered' | 'future' | 'skipped' }[]>(
    Array(questions.length)
      .fill(null)
      .map((_, i) => ({ status: i === 0 ? 'current' : 'future' }))
  );

  const [eliminatedOptions] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<any>(null);

  const currentQuestionData = questions[currentIndex];

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

  const currentId = currentQuestionData.id; //id real

  const goToIndex = (nextIndex: number) => {
    setStepStatuses((prev) => {
      const next = [...prev];
      // coloca tudo que ainda está future como future mesmo
      // e marca o próximo como current
      if (next[nextIndex]) next[nextIndex] = { status: 'current' };
      return next;
    });
    setCurrentIndex(nextIndex);
  };

  const findFirstUnansweredIndex = (answers: Record<string | number, string>) => {
    return questions.findIndex((q: any) => !answers[q.id]);
  };

  const handleSelectAnswer = (letter: string) => setSelectedAnswer(letter);

  const finalizarTeste = (answers: Record<string | number, string>) => {
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

    setTestResults({ results, correctAnswers, totalQuestions: questions.length });
    setPageState('congrats');
  };

  const handleSaveAnswer = () => {
    if (!selectedAnswer) return;

    // salva por ID real
    const updatedAnswers = { ...selectedAnswers, [currentId]: selectedAnswer };
    setSelectedAnswers(updatedAnswers);
    setSelectedAnswer('');

    // status atual vira answered
    setStepStatuses((prev) => {
      const next = [...prev];
      next[currentIndex] = { status: 'answered' };
      return next;
    });

    const firstUnansweredIndex = findFirstUnansweredIndex(updatedAnswers);

    // se está preenchendo puladas
    if (isFillingSkipped) {
      if (firstUnansweredIndex !== -1) {
        setTimeout(() => goToIndex(firstUnansweredIndex), 250);
      } else {
        setTimeout(() => {
          setIsFillingSkipped(false);
          finalizarTeste(updatedAnswers);
        }, 250);
      }
      return;
    }

    // se era a última posição
    if (currentIndex === questions.length - 1) {
      if (firstUnansweredIndex !== -1) {
        setIsFillingSkipped(true);
        toast.warning('Você tem questões sem resposta!', {
          description: `Complete as questões restantes para finalizar.`,
          duration: 5000,
        });

        setTimeout(() => goToIndex(firstUnansweredIndex), 250);
        return;
      }

      setTimeout(() => finalizarTeste(updatedAnswers), 250);
      return;
    }

    // senão, vai pra próxima posição
    setTimeout(() => {
      setStepStatuses((prev) => {
        const next = [...prev];
        if (next[currentIndex + 1]) next[currentIndex + 1] = { status: 'current' };
        return next;
      });
      setCurrentIndex((prev) => prev + 1);
    }, 250);
  };

  const handleSkip = () => {
    if (currentIndex >= questions.length - 1) return;

    setStepStatuses((prev) => {
      const next = [...prev];

      // se não respondeu esta, marca como skipped
      if (!selectedAnswers[currentId]) next[currentIndex] = { status: 'skipped' };

      // próxima vira current
      next[currentIndex + 1] = { status: 'current' };
      return next;
    });

    setSelectedAnswer('');
    setCurrentIndex((prev) => prev + 1);
  };

  const handleFinish = () => {
    let updatedAnswers = { ...selectedAnswers };

    // se tiver resposta marcada na tela, salva também (por ID)
    if (selectedAnswer) {
      updatedAnswers[currentId] = selectedAnswer;
      setSelectedAnswers(updatedAnswers);
      setSelectedAnswer('');

      setStepStatuses((prev) => {
        const next = [...prev];
        next[currentIndex] = { status: 'answered' };
        return next;
      });
    }

    const firstUnansweredIndex = findFirstUnansweredIndex(updatedAnswers);

    if (firstUnansweredIndex !== -1) {
      setIsFillingSkipped(true);
      toast.warning('Você tem questões sem resposta!', {
        description: 'Complete as questões pendentes para finalizar.',
        duration: 5000,
      });

      setTimeout(() => goToIndex(firstUnansweredIndex), 350);
      return;
    }

    setTimeout(() => finalizarTeste(updatedAnswers), 250);
  };

  const handleCongratsClick = () => setPageState('result');

  if (pageState === 'congrats' && testResults) {
    return (
      <>
        <Toaster position="top-center" />
        <TestCongrats
          testName="Desafio"
          message={`Você completou todas as ${questions.length} questões. Agora vamos ver como você se saiu...`}
          onContinue={handleCongratsClick}
          showRocket={false}
        />
      </>
    );
  }

  if (pageState === 'result' && testResults) {
    const backRoute = BACK_ROUTE_MAP[quizMeta?.fromPage || ''] || 'dashboard';

    return (
      <>
        <Toaster position="top-center" />
        <TestResult
          navigateTo={navigateTo}
          testName={`Desafio - ${quizMeta?.competency || 'Quiz'}`}
          correctAnswers={testResults.correctAnswers}
          totalQuestions={testResults.totalQuestions}
          results={testResults.results}
          onBackClick={() => navigateTo(backRoute)}
        />
      </>
    );
  }

  const backRoute = BACK_ROUTE_MAP[quizMeta?.fromPage || ''] || 'dashboard';

  return (
    <>
      <Toaster position="top-center" />
      <TestQuestion
        currentQuestion={currentIndex + 1}          // número para UI
        totalQuestions={questions.length}
        questionText={currentQuestionData?.text}
        questionHtml={currentQuestionData?.htmlContent}
        options={currentQuestionData?.options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        onSaveAnswer={handleSaveAnswer}
        onSkip={handleSkip}
        onFinish={handleFinish}
        stepStatuses={stepStatuses}
        eliminatedOptions={eliminatedOptions}
        title={`Desafio - ${quizMeta?.competency || 'Quiz'}`}
        categoryBadge={quizMeta?.category}
        categoryColor={quizMeta?.categoryColor}
        onBackClick={() => navigateTo(backRoute)}
        isLastQuestion={currentIndex === questions.length - 1} // certo
      />
    </>
  );
}
