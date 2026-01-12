import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import TestQuestion from '../components/TestQuestion';
import TestCongrats from '../components/TestCongrats';
import TestResult from '../components/TestResult';
import { saveCompetencyResult } from '../utils/competencyStorage';  
import { competencyTestQuestions as questions } from '../data/competencyTestQuestions';

interface CompetencyTestPageProps {
  navigateTo: (page: string, data?: any) => void;
}

interface Question {
  id: number;
  category: string;
  categoryColor: string;
  competency: string;
  text: string;
  image?: string;
  interactiveHtml?: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
}


type PageState = 'question' | 'congrats' | 'result';

export default function CompetencyTestPage({ navigateTo }: CompetencyTestPageProps) {
  const [pageState, setPageState] = useState<PageState>('question');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFillingSkipped, setIsFillingSkipped] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<{ status: 'current' | 'answered' | 'future' | 'skipped' }[]>(
    Array.from({ length: 16 }, (_, i) => ({
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

    // marca atual como answered
    setStepStatuses((prev) => {
      const next = [...prev];
      next[currentQuestion - 1] = { status: 'answered' };
      return next;
    });

    setSelectedAnswer('');

    const unanswered = questions.filter((q) => !updatedAnswers[q.id]);

    // se está preenchendo puladas, continua nelas
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

    // ✅ salvou na última questão
    if (currentQuestion === 16) {
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

      // ✅ sem pendências -> finaliza
      setTimeout(() => finalizarTeste(updatedAnswers), 300);
      return;
    }

    // fluxo normal: vai pra próxima
    setTimeout(() => {
      setStepStatuses((prev) => {
        const next = [...prev];
        next[currentQuestion] = { status: 'current' };
        return next;
      });
      setCurrentQuestion((prev) => prev + 1);
    }, 300);
  };


  const handleSkip = () => {
    if (currentQuestion < 16) {
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

    if (selectedAnswer && currentQuestion === 16) {
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
        explanation: '',
        category: q.category,
        categoryColor: q.categoryColor,
        competency: q.competency,
      };
    });

    const competencyGroups = questions.reduce((acc, q) => {
      if (!acc[q.competency]) {
        acc[q.competency] = { correct: 0, errors: 0, cat: q.category, col: q.categoryColor };
      }
      const userAnswer = answers[q.id];
      const isCorrect = q.options.find(opt => opt.isCorrect)?.letter === userAnswer;
      if (isCorrect) acc[q.competency].correct++;
      else acc[q.competency].errors++;
      return acc;
    }, {} as Record<string, any>);

    Object.keys(competencyGroups).forEach(compName => {
      const group = competencyGroups[compName];
      saveCompetencyResult(compName, group.cat, group.col, group.correct, group.errors);
    });

    setTestResults({
      results,
      correctAnswers,
      totalQuestions: 16,
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
          testName="Teste de Competências Digitais"
          message="Você completou todas as 16 questões. Agora vamos descobrir seu nível de letramento digital e começar sua jornada de aprendizado!"
          onContinue={handleCongratsClick}
          showRocket={true}
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
          testName="Teste de Competências Digitais"
          correctAnswers={testResults.correctAnswers}
          totalQuestions={testResults.totalQuestions}
          results={testResults.results}
          onBackClick={() => navigateTo('dashboard')}
        />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <TestQuestion
        currentQuestion={currentQuestion}
        totalQuestions={16}
        questionText={currentQuestionData?.text}
        questionImage={currentQuestionData?.image}
        questionHtml={currentQuestionData?.html}
        options={currentQuestionData?.options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        onSaveAnswer={handleSaveAnswer}
        onSkip={handleSkip}
        onFinish={handleFinish}
        stepStatuses={stepStatuses}
        title={`${currentQuestionData?.competency}`}
        categoryBadge={currentQuestionData?.category}
        categoryColor={currentQuestionData?.categoryColor}
        onBackClick={() => navigateTo('dashboard')}
        isLastQuestion={currentQuestion === 16}
      />
    </>
  );
}
