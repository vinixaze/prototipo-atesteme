import type { PageId } from "../../lib/navigation/routes";

export interface BasicsAnswersData {
  selectedAnswers: Record<number, string>;
}

export interface BasicsResultData {
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
}

export interface AssessmentTestData {
  answered: number;
  correct: number;
  total: number;
  selectedAnswers: Record<number, string>;
}

export interface QuizMetaData {
  competency?: string;
  category?: string;
  categoryColor?: string;
  fromPage?: PageId;
  questions?: Array<{
    id: number;
    text: string;
    htmlContent?: string;
    options?: Array<{ letter: string; text: string; isCorrect?: boolean }>;
    explanation?: string;
    bncc?: string;
    correctAnswer?: string;
    transversality?: {
      curricular?: string;
      component?: string;
      year?: string;
      bnccType?: string;
      bnccCode?: string;
    };
  }>;
  selectedAnswers?: Record<number, string>;
  returnTo?: PageId;
}

export interface ContentFilterData {
  category?: string;
}

export interface QuestionData {
  category?: string;
  questions?: Array<{
    id: number | string;
    text: string;
    options: Array<{
      letter: string;
      text: string;
    }>;
    correctAnswer: string;
    explanation?: string;
    transversality?: {
      curricular?: string;
      component?: string;
      year?: string;
      bnccType?: string;
      bnccCode?: string;
    };
  }>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const isBasicsAnswersData = (value: unknown): value is BasicsAnswersData => {
  if (!isRecord(value)) {
    return false;
  }
  return isRecord(value.selectedAnswers);
};

export const isBasicsResultData = (value: unknown): value is BasicsResultData => {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value.correctAnswers === "number" &&
    typeof value.totalQuestions === "number" &&
    Array.isArray(value.results)
  );
};

export const isAssessmentTestData = (
  value: unknown
): value is AssessmentTestData => {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value.answered === "number" &&
    typeof value.correct === "number" &&
    typeof value.total === "number" &&
    isRecord(value.selectedAnswers)
  );
};

export const isQuizMetaData = (value: unknown): value is QuizMetaData => {
  if (!isRecord(value)) {
    return false;
  }
  if (value.questions === undefined) {
    return true;
  }
  return Array.isArray(value.questions);
};

export const isContentFilterData = (value: unknown): value is ContentFilterData => {
  if (!isRecord(value)) {
    return false;
  }
  if (value.category === undefined) {
    return true;
  }
  return typeof value.category === "string";
};

export const isQuestionData = (value: unknown): value is QuestionData => {
  if (!isRecord(value)) {
    return false;
  }
  if (value.questions === undefined) {
    return true;
  }
  if (!Array.isArray(value.questions)) {
    return false;
  }
  return value.questions.every((question) => {
    if (!isRecord(question)) {
      return false;
    }
    if (!Array.isArray(question.options)) {
      return false;
    }
    return question.options.every((option) => {
      if (!isRecord(option)) {
        return false;
      }
      return typeof option.letter === "string" && typeof option.text === "string";
    });
  });
};
