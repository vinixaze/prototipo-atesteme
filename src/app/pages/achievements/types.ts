import type { NavigateTo } from "../../../lib/navigation/routes";

export interface AchievementsPageProps {
  navigateTo: NavigateTo;
  userRole?: "admin" | "user";
}
