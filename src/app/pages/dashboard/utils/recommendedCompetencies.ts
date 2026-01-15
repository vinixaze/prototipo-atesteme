import { Search, MessageCircle } from 'lucide-react';
import { RecommendedCompetency } from '../types';

export const baseRecommendedCompetencies: RecommendedCompetency[] = [
  {
    category: 'INFORMAÇÕES E DADOS',
    title: 'Realizar pesquisa e monitoramento',
    icon: Search,
    color: '#FFD700',
  },
  {
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    title: 'Interagir',
    icon: MessageCircle,
    color: '#00BCD4',
  },
];
