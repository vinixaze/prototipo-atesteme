import { LucideIcon } from 'lucide-react';

export interface Competency {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  icon: LucideIcon;
  completed: boolean;
  starsEarned: number;
  totalStars: 3;
  status: 'completed' | 'in-progress' | 'not-started';
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

export type AchievementRarity = 'comum' | 'raro' | 'épico' | 'lendário';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  date?: string;
  color: string;
  rarity: AchievementRarity;
}

export interface RankingUser {
  position: number;
  name: string;
  points: number;
  digcoins: number;
  level: number;
  levelProgress: number;
  medals: number;
  avgTime: string;
  isCurrentUser: boolean;
  avatar: string;
  school?: string;
  seduc?: string;
  regional?: string;
  schoolName?: string;
  turma?: string;
}

export interface RankingData {
  escola: RankingUser[];
  turma: RankingUser[];
  rede: RankingUser[];
}
