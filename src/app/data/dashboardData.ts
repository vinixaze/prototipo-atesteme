import { Search, MessageCircle } from 'lucide-react';
import { getCompetencyStatus } from '../utils/competencyStorage';
import { RecommendedCompetency } from '../types/dashboard';

export const getRecommendedCompetencies = (): RecommendedCompetency[] => {
  try {
    const baseCompetencies = [
      { category: 'INFORMAÇÕES E DADOS', title: 'Realizar pesquisa e monitoramento', icon: Search, color: '#FFD700' },
      { category: 'COMUNICAÇÃO E COLABORAÇÃO', title: 'Interagir', icon: MessageCircle, color: '#00BCD4' },
    ];

    return baseCompetencies.map(comp => {
      try {
        const status = getCompetencyStatus(comp.title);
        return {
          ...comp,
          status: status?.status || 'not-started',
          isInProgress: status?.status === 'in-progress'
        };
      } catch (error) {
        return {
          ...comp,
          status: 'not-started',
          isInProgress: false
        };
      }
    });
  } catch (error) {
    const baseCompetencies = [
      { category: 'INFORMAÇÕES E DADOS', title: 'Realizar pesquisa e monitoramento', icon: Search, color: '#FFD700' },
      { category: 'COMUNICAÇÃO E COLABORAÇÃO', title: 'Interagir', icon: MessageCircle, color: '#00BCD4' },
    ];
    return baseCompetencies.map(comp => ({
      ...comp,
      status: 'not-started',
      isInProgress: false
    }));
  }
};

