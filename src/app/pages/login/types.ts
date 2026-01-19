import type { NavigateTo } from "../../../lib/navigation/routes";

export interface LoginPageProps {
  navigateTo: NavigateTo;
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
