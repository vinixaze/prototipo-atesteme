import { questions } from "../basics/data";
import type { BasicsCongratsPageProps } from "./types";

export function buildBasicsResults(testData?: BasicsCongratsPageProps["testData"]) {
  const selectedAnswers = testData?.selectedAnswers || {};
  const results = questions.map((q) => {
    const userAnswer = selectedAnswers[q.id];
    const correctOption = q.options.find((opt) => opt.isCorrect);
    const isCorrect = userAnswer === correctOption?.letter;

    return {
      questionId: q.id,
      questionText: q.text,
      userAnswer: userAnswer || "",
      correctAnswer: correctOption?.letter || "",
      isCorrect,
      options: q.options,
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;

  return {
    results,
    correctAnswers: correctCount,
    totalQuestions: 3,
  };
}
