import { Users, School, Globe } from 'lucide-react';
import { ProgressDataItem, Category, RankingSlide } from '../types';

export const categories: Category[] = [
  { name: 'Info e Dados', fullName: 'INFORMA�?�.ES E DADOS', color: '#FFD700' },
  { name: 'Comunicação', fullName: 'COMUNICA�?�fO E COLABORA�?�fO', color: '#00BCD4' },
  { name: 'Criação', fullName: 'CRIA�?�fO DE CONTE�sDO', color: '#FF9800' },
  { name: 'Proteção', fullName: 'PROTE�?�fO E SEGURAN�?A', color: '#4CAF50' },
  { name: 'Resolução', fullName: 'RESOLU�?�fO DE PROBLEMAS', color: '#E91E63' },
];

export const progressData: ProgressDataItem[] = [
  { category: 'INFORMA�?�.ES E DADOS', percentage: 40, color: '#FFD700' },
  { category: 'COMUNICA�?�fO E COLABORA�?�fO', percentage: 30, color: '#00BCD4' },
  { category: 'CRIA�?�fO DE CONTE�sDO', percentage: 10, color: '#FF9800' },
  { category: 'PROTE�?�fO E SEGURAN�?A', percentage: 15, color: '#4CAF50' },
  { category: 'RESOLU�?�fO DE PROBLEMAS', percentage: 5, color: '#E91E63' },
];

export const rankingSlides: RankingSlide[] = [
  { title: 'Ranking da Turma', icon: Users, position: '1º', total: 'de 30 alunos', color: '#FFD700' },
  { title: 'Ranking da Escola', icon: School, position: '3º', total: 'de 150 alunos', color: '#2196F3' },
  { title: 'Ranking Geral da Rede', icon: Globe, position: '127º', total: 'de 5.000 alunos', color: '#9E9E9E' },
];

export const currentLevel = 1;
export const totalProgress = 43;
