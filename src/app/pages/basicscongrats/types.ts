import type { NavigateTo } from "../../../lib/navigation/routes";

export interface BasicsCongratsPageProps {
  navigateTo: NavigateTo;
  testData?: {
    selectedAnswers: Record<number, string>;
  };
}
