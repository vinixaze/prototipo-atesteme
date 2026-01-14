import { useState } from 'react';
import { toast } from 'sonner';
import {
  PageState,
  Question,
  StepStatusEntry,
  TestResultsSummary
} from '../types/nocoesBasicas';

interface UseNocoesBasicasTestArgs {
  questions: Question[];
  explanations: string[];
}

export default function useNocoesBasicasTest({ questions, explanations }: UseNocoesBasicasTestArgs) {
  const [pageState, setPageState] = useState<PageState>('question');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFillingSkipped, setIsFillingSkipped] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<StepStatusEntry[]>(
    Array.from({ length: questions.length }, (_, i) => ({
      status: i === 0 ? 'current' : 'future'
    }))
  );
  const [testResults, setTestResults] = useState<TestResultsSummary | null>(null);

  const currentQuestionData = questions[currentQuestion - 1];

  const handleSelectAnswer = (letter: string) => {
    setSelectedAnswer(letter);
  };

  const handleSaveAnswer = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion]: selectedAnswer
    };
    setSelectedAnswers(updatedAnswers);

    setStepStatuses((prev) => {
      const next = [...prev];
      next[currentQuestion - 1] = { status: 'answered' };
      return next;
    });

    setSelectedAnswer('');

    const unansweredQuestions = questions.filter((q) => !updatedAnswers[q.id]);

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
          finalizeTest(updatedAnswers);
        }, 300);
      }
      return;
    }

    if (currentQuestion === questions.length) {
      if (unansweredQuestions.length > 0) {
        setIsFillingSkipped(true);

        toast.warning('Você tem questões sem resposta!', {
          description: `Complete as ${unansweredQuestions.length} quest${
            unansweredQuestions.length > 1 ? 'ões' : 'ão'
          } restante${unansweredQuestions.length > 1 ? 's' : ''} para finalizar.`,
          duration: 5000
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

      setTimeout(() => finalizeTest(updatedAnswers), 300);
      return;
    }

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
        description: `Complete as ${unansweredQuestions.length} quest${
          unansweredQuestions.length > 1 ? 'ões' : 'ão'
        } restante${unansweredQuestions.length > 1 ? 's' : ''} para finalizar.`,
        duration: 5000
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
      finalizeTest(updatedAnswers);
    }, 300);
  };

  const finalizeTest = (answers = selectedAnswers) => {
    const correctAnswers = questions.filter((q) => {
      const answer = answers[q.id];
      return q.options.find((opt) => opt.isCorrect).letter === answer;
    }).length;

    const results = questions.map((q) => {
      const userAnswer = answers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      const isCorrect = userAnswer === correctOption.letter;

      return {
        questionId: q.id,
        questionText: q.text,
        userAnswer: userAnswer || '',
        correctAnswer: correctOption.letter || '',
        isCorrect,
        options: q.options,
        explanation: explanations[q.id - 1] || '',
        category: q.category,
        categoryColor: q.categoryColor,
        competency: q.competency
      };
    });

    setTestResults({
      results,
      correctAnswers,
      totalQuestions: questions.length
    });

    setPageState('congrats');
  };

  const handleCongratsClick = () => {
    setPageState('result');
  };

  return {
    pageState,
    currentQuestion,
    currentQuestionData,
    selectedAnswer,
    stepStatuses,
    testResults,
    handleSelectAnswer,
    handleSaveAnswer,
    handleSkip,
    handleFinish,
    handleCongratsClick
  };
}

?