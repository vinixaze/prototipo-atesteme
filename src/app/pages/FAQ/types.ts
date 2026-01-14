import { LucideIcon } from 'lucide-react';

export interface TipCard {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export type VideoChapterCategory =
  | 'intro'
  | 'cadastro'
  | 'navegacao'
  | 'desafios'
  | 'certificacao'
  | 'dicas';

export interface VideoChapter {
  id: number;
  title: string;
  description: string;
  timestamp: number;
  duration: string;
  icon: LucideIcon;
  gradient: string;
  category: VideoChapterCategory;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
