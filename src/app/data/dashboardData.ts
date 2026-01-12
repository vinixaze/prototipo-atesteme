import type { LucideIcon } from 'lucide-react';
import { Users, School, Globe, Search, MessageCircle } from 'lucide-react';

export interface ProgressItem {
  category: string;
  percentage: number;
  color: string;
}

export interface RankingSlide {
  title: string;
  icon: LucideIcon;
  position: string;
  total: string;
  color: string;
}

export interface RecommendedCompetency {
  category: string;
  title: string;
  icon: LucideIcon;
  color: string;
}

export const progressData: ProgressItem[] = [
  { category: 'INFORMAÇÕES E DADOS', percentage: 40, color: '#FFD700' },
  { category: 'COMUNICAÇÃO E COLABORAÇÃO', percentage: 30, color: '#00BCD4' },
  { category: 'CRIAÇÃO DE CONTEDO', percentage: 10, color: '#FF9800' },
  { category: 'PROTEÇÃO E SEGURANÇA', percentage: 15, color: '#4CAF50' },
  { category: 'RESOLUÇÃO DE PROBLEMAS', percentage: 5, color: '#E91E63' },
];

export const rankingSlides: RankingSlide[] = [
  { title: 'Ranking da Turma', icon: Users, position: '1º', total: 'de 30 alunos', color: '#FFD700' },
  { title: 'Ranking da Escola', icon: School, position: '3º', total: 'de 150 alunos', color: '#2196F3' },
  { title: 'Ranking Geral da Rede', icon: Globe, position: '127º', total: 'de 5.000 alunos', color: '#9E9E9E' },
];

export const recommendedCompetencies: RecommendedCompetency[] = [
  { category: 'INFORMAÇÕES E DADOS', title: 'Realizar pesquisa e monitoramento', icon: Search, color: '#FFD700' },
  { category: 'COMUNICAÇÃO E COLABORAÇÃO', title: 'Interagir', icon: MessageCircle, color: '#00BCD4' },
];
