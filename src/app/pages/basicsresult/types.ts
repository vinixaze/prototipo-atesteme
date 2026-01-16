import type { NavigateTo } from "../../../lib/navigation/routes";

export interface BasicsResultPageProps {
  navigateTo: NavigateTo;
  testData?: {
    correctAnswers: number;
    totalQuestions: number;
    results: Array<{
      questionId: number;
      questionText: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      options: Array<{
        letter: string;
        text: string;
        isCorrect: boolean;
      }>;
    }>;
  };
}
