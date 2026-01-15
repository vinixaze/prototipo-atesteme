import { Users, School, Globe } from 'lucide-react';
import { ProgressDataItem, Category, RankingSlide } from '../types';

export const categories: Category[] = [
  { name: 'Info e Dados', fullName: 'INFORMAÇÕES E DADOS', color: '#FFD700' },
  { name: 'Comunicação', fullName: 'COMUNICAÇÃO E COLABORAÇÃO', color: '#00BCD4' },
  { name: 'Criação', fullName: 'CRIAÇÃO DE CONTEÚDO', color: '#FF9800' },
  { name: 'Proteção', fullName: 'PROTEÇÃO E SEGURANÇA', color: '#4CAF50' },
  { name: 'Resolução', fullName: 'RESOLUÇÃO DE PROBLEMAS', color: '#E91E63' },
];

export const progressData: ProgressDataItem[] = [
  { category: 'INFORMAÇÕES E DADOS', percentage: 40, color: '#FFD700' },
  { category: 'COMUNICAÇÃO E COLABORAÇÃO', percentage: 30, color: '#00BCD4' },
  { category: 'CRIAÇÃO DE CONTEÚDO', percentage: 10, color: '#FF9800' },
  { category: 'PROTEÇÃO E SEGURANÇA', percentage: 15, color: '#4CAF50' },
  { category: 'RESOLUÇÃO DE PROBLEMAS', percentage: 5, color: '#E91E63' },
];

export const rankingSlides: RankingSlide[] = [
  { title: 'Ranking da Turma', icon: Users, position: '1º', total: 'de 30 alunos', color: '#FFD700' },
  { title: 'Ranking da Escola', icon: School, position: '3º', total: 'de 150 alunos', color: '#2196F3' },
  { title: 'Ranking Geral da Rede', icon: Globe, position: '127º', total: 'de 5.000 alunos', color: '#9E9E9E' },
];

export const currentLevel = 1;
export const totalProgress = 43;
