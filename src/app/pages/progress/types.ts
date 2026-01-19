import type { NavigateTo } from "../../../lib/navigation/routes";
import type { LucideIcon } from "lucide-react";

export interface ProgressPageProps {
  navigateTo: NavigateTo;
  initialTab?: "niveis" | "conquistas" | "digcoins";
  userName?: string;
  userRole?: "admin" | "user";
}

export interface Competency {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  icon: LucideIcon;
  completed: boolean;
  starsEarned: number;
  totalStars: number;
  status: "completed" | "in-progress" | "not-started" | "attempted";
  completedDate?: string;
  timeSpent?: string;
  digcoinsEarned?: number;
}

export interface Level {
  number: number;
  name: string;
  unlocked: boolean;
  progress: number;
  total: number;
  percentage: number;
  competencias: Competency[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  unlocked: boolean;
  date?: string;
  category?: string;
  rarity?: string;
}
