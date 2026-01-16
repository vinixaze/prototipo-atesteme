import type { NavigateTo, PageId } from "../../../lib/navigation/routes";
import type { LucideIcon } from "lucide-react";

export interface QuizWarningPageProps {
  navigateTo: NavigateTo;
  competencyData?: {
    competency?: string;
    category?: string;
    categoryColor?: string;
    competencyIcon?: LucideIcon;
    categoryIcon?: LucideIcon;
    fromPage?: PageId;
  };
}
