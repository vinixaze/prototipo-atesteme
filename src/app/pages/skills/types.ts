import type { NavigateTo } from "../../../lib/navigation/routes";
import type { LucideIcon } from "lucide-react";

export interface SkillsPageProps {
  navigateTo: NavigateTo;
  userRole?: "admin" | "user";
}

export interface SelectedCompetency extends Record<string, unknown> {
  competency: string;
  category: string;
  categoryColor: string;
  competencyIcon: LucideIcon;
  categoryIcon: LucideIcon;
}
