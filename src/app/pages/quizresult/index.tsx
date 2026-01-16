import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import TestResult from "../shared/components/TestResult";
import { saveCompetencyResult } from "../../utils/competencyStorage";
import type { QuizResultPageProps } from "./types";

export default function QuizResultPage({ navigateTo, testData }: QuizResultPageProps) {
  if (!testData || !testData.questions || testData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">Dados não encontrados</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Não foi possível carregar os dados do teste.</p>
          <button
            onClick={() => navigateTo('habilidades')}
            className="px-6 py-3 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
          >
            Voltar para Habilidades
          </button>
        </div>
      </div>
    );
  }

  const {
    competency = "",
    category = "",
    categoryColor = "",
    selectedAnswers = {},
    questions = [],
    returnTo,
  } = testData;

  const results = questions.map((q) => {
    const userAnswer = selectedAnswers[q.id];
    const correctOption = q.options?.find((opt) => opt.isCorrect);
    const isCorrect = userAnswer === correctOption?.letter;

    return {
      questionId: q.id,
      questionText: q.text,
      userAnswer: userAnswer || '',
      correctAnswer: correctOption?.letter || '',
      explanation: q.explanation || '',
      isCorrect,
      options: (q.options || []).map((opt) => ({
        letter: opt.letter,
        text: opt.text,
        isCorrect: opt.isCorrect ?? false,
      })),
      category,
      categoryColor,
      competency,
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;
  const errorCount = results.length - correctCount;

  useEffect(() => {
    saveCompetencyResult(competency, category, categoryColor, correctCount, errorCount);
  }, [competency, category, categoryColor, correctCount, errorCount]);

  return (
    <TestResult
      navigateTo={navigateTo}
      testName={`Desafio: ${competency}`}
      correctAnswers={correctCount}
      totalQuestions={results.length}
      results={results}
      onBackClick={() => navigateTo(returnTo || 'progresso')}
      explanations={results.map((r) => r.explanation || '')}
    />
  );
}

