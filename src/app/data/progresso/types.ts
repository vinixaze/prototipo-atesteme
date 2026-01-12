export interface Competencia {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  icon: any;
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
  competencias: Competencia[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  date?: string;
  color: string;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
}
