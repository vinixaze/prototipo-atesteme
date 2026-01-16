import type { NavigateTo } from "../../../lib/navigation/routes";

export interface SkillsPageProps {
  navigateTo: NavigateTo;
  userRole?: "admin" | "user";
}
