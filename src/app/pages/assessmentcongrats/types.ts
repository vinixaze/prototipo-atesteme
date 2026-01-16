import type { NavigateTo } from "../../../lib/navigation/routes";

export interface AssessmentCongratsPageProps {
  navigateTo: NavigateTo;
  testData?: {
    answered: number;
    correct: number;
    total: number;
    selectedAnswers: Record<number, string>;
  };
}
