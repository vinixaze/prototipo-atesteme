import type { LucideIcon } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface TipCard {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export interface VideoChapter {
  id: number;
  title: string;
  description: string;
  timestamp: number;
  duration: string;
  icon: LucideIcon;
  gradient: string;
  category: 'intro' | 'cadastro' | 'navegacao' | 'desafios' | 'certificacao' | 'dicas';
}
