import type { NavigateTo } from "../../../lib/navigation/routes";

export interface SingleQuestionPageProps {
  navigateTo: NavigateTo;
  userName?: string;
  onLogout?: () => void;
  questionData?: QuestionData;
}

export type QuestionOption = {
  letter: string;
  text: string;
};

export type TransversalityQuestion = {
  id: number | string;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation?: string;
  transversality?: {
    curricular?: string;
    component?: string;
    year?: string;
    bnccType?: string;
    bnccCode?: string;
  };
};

export type QuestionData = {
  category?: string;
  questions?: TransversalityQuestion[];
};
