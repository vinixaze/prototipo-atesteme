import TestResult from "../shared/components/TestResult";
import { explanations, questions } from "../basics/data";
import type { BasicsResultPageProps } from "./types";

export default function BasicsResultPage({
  navigateTo,
  testData,
}: BasicsResultPageProps) {
  const correctAnswers = testData?.correctAnswers || 2;
  const totalQuestions = testData?.totalQuestions || 3;
  const results = testData?.results || [];


  // Mapear resultados com dados da questão original
  const enhancedResults = results.map((result, index) => {
    const originalQuestion = questions.find(q => q.id === result.questionId);
    return {
      ...result,
      category: originalQuestion?.category || 'NOÇÕES BÁSICAS',
      categoryColor: originalQuestion?.categoryColor || '#8B27FF',
      competency: originalQuestion?.competency || 'Conhecimentos Básicos',
      explanation: explanations[index] || '',
    };
  });

  return (
    <TestResult
      navigateTo={navigateTo}
      testName="Teste de Noções Básicas"
      correctAnswers={correctAnswers}
      totalQuestions={totalQuestions}
      results={enhancedResults}
      onBackClick={() => navigateTo('dashboard')}
      explanations={explanations}
    />
  );
}

