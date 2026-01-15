import { LucideIcon } from 'lucide-react';

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

export interface ContentCategory {
  name: string;
  color: string;
  icon: LucideIcon;
}
