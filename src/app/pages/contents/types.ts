import type { NavigateTo } from "../../../lib/navigation/routes";
import type { LucideIcon } from "lucide-react";

export interface ContentsPageProps {
  navigateTo: NavigateTo;
  filterData?: {
    category?: string;
  };
  userRole?: "admin" | "user";
}

export interface ContentCategory {
  name: string;
  color: string;
  icon: LucideIcon;
}

export interface ContentItem {
  id: string;
  title: string;
  competency: string;
  level: number;
  category: string;
  categoryColor: string;
  format: string;
  description: string;
  link: string;
}
