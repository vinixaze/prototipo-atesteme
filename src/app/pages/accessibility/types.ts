import type { NavigateTo } from "../../../lib/navigation/routes";
import type { LucideIcon } from "lucide-react";

export interface AccessibilityPageProps {
  navigateTo: NavigateTo;
  userRole?: "admin" | "user";
}

export interface AccessibilityTool {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  icon: LucideIcon;
  gradient: string;
  platforms: string[];
  downloadLink: string;
  learnMoreLink?: string;
  features: string[];
}
