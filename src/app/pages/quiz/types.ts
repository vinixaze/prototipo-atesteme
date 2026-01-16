import type { NavigateTo, PageId } from "../../../lib/navigation/routes";

export interface QuizPageProps {
  navigateTo: NavigateTo;
  competencyData?: QuizMetaData;
  quizData?: QuizMetaData;
}

export type QuizQuestionOption = {
  letter: string;
  text: string;
  isCorrect?: boolean;
};

export type QuizQuestion = {
  id: number;
  text: string;
  htmlContent?: string;
  options?: QuizQuestionOption[];
  explanation?: string;
};

export type QuizResults = {
  results: Array<{
    questionId: number | string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    options: Array<{ letter: string; text: string; isCorrect: boolean }>;
    explanation: string;
    category?: string;
    categoryColor?: string;
    competency?: string;
  }>;
  correctAnswers: number;
  totalQuestions: number;
};

export type QuizMetaData = {
  competency?: string;
  category?: string;
  categoryColor?: string;
  fromPage?: PageId;
  questions?: QuizQuestion[];
};
