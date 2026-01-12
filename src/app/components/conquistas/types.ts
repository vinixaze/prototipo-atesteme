import type { LucideIcon } from 'lucide-react';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  unlocked: boolean;
  date?: string;
  category?: string;
  rarity?: 'comum' | 'raro' | 'épico' | 'lendário';
}
