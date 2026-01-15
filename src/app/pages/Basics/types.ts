export type PageState = "question" | "congrats" | "result";

export interface QuestionOption {
  letter: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  image?: string;
  options: QuestionOption[];
  category: string;
  categoryColor: string;
  area: string;
  competency: string;
}

export interface StepStatusEntry {
  status: "current" | "answered" | "future" | "skipped";
}

export interface TestResultItem {
  questionId: number;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: QuestionOption[];
  explanation: string;
  category: string;
  categoryColor: string;
  competency: string;
}

export interface TestResultsSummary {
  results: TestResultItem[];
  correctAnswers: number;
  totalQuestions: number;
}
