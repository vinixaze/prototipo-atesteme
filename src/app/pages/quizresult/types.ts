import type { NavigateTo, PageId } from "../../../lib/navigation/routes";
import type { LucideIcon } from "lucide-react";

export interface QuizResultPageProps {
  navigateTo: NavigateTo;
  previousPage?: string;
  testData?: {
    competency?: string;
    category?: string;
    categoryColor?: string;
    categoryIcon?: LucideIcon;
    competencyIcon?: LucideIcon;
    selectedAnswers?: Record<number, string>;
    questions?: Array<{
      id: number;
      text: string;
      options?: Array<{ letter: string; text: string; isCorrect?: boolean }>;
      explanation?: string;
      bncc?: string;
    }>;
    returnTo?: PageId;
  };
}
