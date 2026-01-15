import { useEffect } from "react";
import TestResult from "../shared/components/TestResult";

interface AssessmentResultPageProps {
  navigateTo: (page: string) => void;
  testData?: {
    answered: number;
    correct: number;
    total: number;
    selectedAnswers: Record<number, string>;
  };
}

// Importar questões
import { questions } from "../assessment/data";

export default function AssessmentResultPage({
  navigateTo,
  testData,
}: AssessmentResultPageProps) {
  const answered = testData?.answered || 16;
  const correct = testData?.correct || 12;
  const total = testData?.total || 16;
  const selectedAnswers = testData?.selectedAnswers || {};

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
      explanation: '',
    };
  });

  return (
    <TestResult
      navigateTo={navigateTo}
      testName="Teste de Competências Digitais"
      correctAnswers={correct}
      totalQuestions={total}
      results={results}
      onBackClick={() => navigateTo('dashboard')}
    />
  );
  return (
    <TestResult
      navigateTo={navigateTo}
      testName="Teste de Competências Digitais"
      correctAnswers={correct}
      totalQuestions={total}
      results={results}
      onBackClick={() => navigateTo('dashboard')}
    />
  );
}

