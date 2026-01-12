import { Award, BookOpen, Smartphone, UserPlus } from 'lucide-react';

import type { TipCard } from './types';

export const faqTips: TipCard[] = [
  {
    id: 1,
    title: 'Complete seu perfil',
    description: 'Atualize seu perfil para validar os exames e ganhar pontos.',
    icon: UserPlus,
    gradient: 'from-[#8B27FF] to-[#A855F7]'
  },
  {
    id: 2,
    title: 'Gerencie seu uso',
    description: 'Você pode gerenciar o tempo de utilização da plataforma.',
    icon: Smartphone,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 3,
    title: 'Instale App de edição',
    description: 'Alguns desafios requerem manipulação de imagens. Tenha um app de edição instalado.',
    icon: BookOpen,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Organize-se para o Exame',
    description: 'Reserve pelo menos 1 hora, garanta boa conexão e siga as recomendações.',
    icon: Award,
    gradient: 'from-green-500 to-emerald-500'
  }
];
