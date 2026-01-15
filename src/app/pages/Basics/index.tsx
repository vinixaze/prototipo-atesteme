import { useState } from "react";
import { toast, Toaster } from "sonner";
import TestQuestion from "../shared/components/TestQuestion";
import TestCongrats from "../shared/components/TestCongrats";
import TestResult from "../shared/components/TestResult";
import { explanations, questions } from "./data";

interface BasicsPageProps {
  navigateTo: (page: string, data?: any) => void;
}


type PageState = 'question' | 'congrats' | 'result';

export default function BasicsPage({ navigateTo }: BasicsPageProps) {
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

