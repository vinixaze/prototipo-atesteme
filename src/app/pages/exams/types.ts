import type { NavigateTo } from "../../../lib/navigation/routes";

export interface ExamsPageProps {
  navigateTo: NavigateTo;
  userRole?: "admin" | "user";
}
