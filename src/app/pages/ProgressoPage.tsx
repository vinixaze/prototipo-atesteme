import { useState } from 'react';
import React from "react";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RankingTab from '../components/RankingTab';
import ConquistasTab from '../components/ConquistasTab';
import NiveisTab from '../components/NiveisTab';
import DigcoinsTab from '../components/DigcoinsTab';
import { startCompetencyTimer, getCompetencyStatus } from '../utils/competencyStorage';
import {
  ChevronDown,
  Lock,
  Check,
  Search,
  BarChart3,
  FolderOpen,
  MessageCircle,
  Fingerprint,
  Share2,
  Users,
  Code,
  Image as ImageIcon,
  FileEdit,
  Files,
  Shield,
  Heart,
  Wrench,
  TrendingUp,
  Star,
  Trophy,
  Award,
  Zap,
  Target,
  Crown,
  Flame,
  Clock,
  Calendar,
  Coins,
  Eye,
  Medal,
  Sparkles,
  BookOpen,
  IdCard,
  Crosshair,
  Database,
} from 'lucide-react';

interface ProgressoPageProps {
  navigateTo: (page: string, data?: any) => void;
  initialTab?: 'niveis' | 'conquistas';
  userName?: string;
  userRole?: 'admin' | 'user';
}

interface Competencia {
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

interface Level {
  number: number;
  name: string;
  unlocked: boolean;
  progress: number;
  total: number;
  percentage: number;
  competencias: Competencia[];
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  date?: string;
  color: string;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
}

export default function ProgressoPage({ navigateTo, initialTab = 'niveis', userName = 'André', userRole = 'user' }: ProgressoPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'niveis' | 'conquistas' | 'ranking' | 'digcoins'>(initialTab);
  const [rankingCategory, setRankingCategory] = useState<'escola' | 'turma' | 'rede'>('turma');

  // Get first name only
  const firstName = userName.split(' ')[0];

  // Base levels data
  const baseLevels: Level[] = [
    {
      number: 1,
      name: 'Nível 1',
      unlocked: true,
      progress: 7,
      total: 16,
      percentage: 43,
      competencias: [
        { id: 1, title: 'Programar sistemas', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: Code, completed: true, starsEarned: 3, totalStars: 3, status: 'completed', completedDate: '15/12/2025', timeSpent: '08min 32s', digcoinsEarned: 9 },
        { id: 2, title: 'Adaptar arquivos', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: Files, completed: true, starsEarned: 3, totalStars: 3, status: 'completed', completedDate: '16/12/2025', timeSpent: '07min 18s', digcoinsEarned: 9 },
        { id: 3, title: 'Compartilhar e publicar', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Share2, completed: true, starsEarned: 3, totalStars: 3, status: 'completed', completedDate: '16/12/2025', timeSpent: '06min 45s', digcoinsEarned: 9 },
        { id: 4, title: 'Interagir', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: MessageCircle, completed: true, starsEarned: 3, totalStars: 3, status: 'completed', completedDate: '17/12/2025', timeSpent: '05min 52s', digcoinsEarned: 9 },
        { id: 5, title: 'Realizar pesquisa e monitoramento', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: Search, completed: true, starsEarned: 3, totalStars: 3, status: 'completed', completedDate: '17/12/2025', timeSpent: '09min 15s', digcoinsEarned: 9 },
        { id: 6, title: 'Gerir a identidade digital', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Fingerprint, completed: true, starsEarned: 3, totalStars: 3, status: 'completed', completedDate: '18/12/2025', timeSpent: '07min 03s', digcoinsEarned: 9 },
        { id: 7, title: 'Gerenciar dados', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: FolderOpen, completed: true, starsEarned: 3, totalStars: 3, status: 'completed', completedDate: '18/12/2025', timeSpent: '08min 27s', digcoinsEarned: 9 },
        { id: 8, title: 'Colaborar', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Users, completed: false, starsEarned: 2, totalStars: 3, status: 'in-progress' },
        { id: 9, title: 'Realizar o tratamento de dados', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: BarChart3, completed: false, starsEarned: 1, totalStars: 3, status: 'in-progress' },
        { id: 10, title: 'Editar texto multimídia', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: ImageIcon, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 11, title: 'Editar texto escrito', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: FileEdit, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 12, title: 'Proteger o ambiente digital', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Shield, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 13, title: 'Proteger dados pessoais e privacidade', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Lock, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 14, title: 'Proteger a saúde e o meio ambiente', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Heart, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 15, title: 'Resolver problemas técnicos', category: 'RESOLUÇÃO DE PROBLEMAS', categoryColor: '#E91E63', icon: Wrench, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 16, title: 'Evoluir em um ambiente digital', category: 'RESOLUÇÃO DE PROBLEMAS', categoryColor: '#E91E63', icon: TrendingUp, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
      ],
    },
    {
      number: 2,
      name: 'Nível 2',
      unlocked: false,
      progress: 0,
      total: 16,
      percentage: 0,
      competencias: [
        { id: 17, title: 'Programar sistemas avançado', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: Code, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 18, title: 'Adaptar arquivos complexos', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: Files, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 19, title: 'Gestão de redes sociais', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Share2, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 20, title: 'Comunicação profissional', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: MessageCircle, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 21, title: 'Pesquisa avançada', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: Search, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 22, title: 'Gestão de identidade profissional', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Fingerprint, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 23, title: 'Análise de dados', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: BarChart3, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 24, title: 'Colaboração em projetos', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Users, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 25, title: 'Visualização de dados', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: BarChart3, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 26, title: 'Produção audiovisual', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: ImageIcon, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 27, title: 'Redação digital', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: FileEdit, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 28, title: 'Segurança de redes', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Shield, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 29, title: 'Privacidade digital', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Lock, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 30, title: 'Ergonomia digital', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Heart, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 31, title: 'Troubleshooting avançado', category: 'RESOLUÇÃO DE PROBLEMAS', categoryColor: '#E91E63', icon: Wrench, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 32, title: 'Adaptação tecnológica', category: 'RESOLUÇÃO DE PROBLEMAS', categoryColor: '#E91E63', icon: TrendingUp, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
      ],
    },
    {
      number: 3,
      name: 'Nível 3',
      unlocked: false,
      progress: 0,
      total: 16,
      percentage: 0,
      competencias: [
        { id: 33, title: 'Desenvolvimento full-stack', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: Code, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 34, title: 'Integração de sistemas', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: Files, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 35, title: 'Marketing digital', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Share2, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 36, title: 'Comunicação estratégica', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: MessageCircle, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 37, title: 'Big data research', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: Search, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 38, title: 'Personal branding', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Fingerprint, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 39, title: 'Data science', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: BarChart3, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 40, title: 'Gestão de equipes remotas', category: 'COMUNICAÇÃO E COLABORAÇÃO', categoryColor: '#00BCD4', icon: Users, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 41, title: 'Inteligência de dados', category: 'INFORMAÇÕES E DADOS', categoryColor: '#FFD700', icon: BarChart3, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 42, title: 'Produção transmídia', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: ImageIcon, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 43, title: 'Storytelling digital', category: 'CRIAÇÃO DE CONTEÚDO', categoryColor: '#FF9800', icon: FileEdit, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 44, title: 'Cybersecurity', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Shield, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 45, title: 'LGPD e compliance', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Lock, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 46, title: 'Sustentabilidade digital', category: 'PROTEÇÃO E SEGURANÇA', categoryColor: '#4CAF50', icon: Heart, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 47, title: 'Inovação tecnológica', category: 'RESOLUÇÃO DE PROBLEMAS', categoryColor: '#E91E63', icon: Wrench, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
        { id: 48, title: 'Transformação digital', category: 'RESOLUÇÃO DE PROBLEMAS', categoryColor: '#E91E63', icon: TrendingUp, completed: false, starsEarned: 0, totalStars: 3, status: 'not-started' },
      ],
    },
  ];

  // Map baseLevels com status dinâmico das competências
  const levels = baseLevels.map(level => ({
    ...level,
    competencias: level.competencias.map(comp => {
      const dynamicStatus = getCompetencyStatus(comp.title);
      if (dynamicStatus && dynamicStatus.status === 'in-progress') {
        return {
          ...comp,
          status: 'in-progress' as const,
        };
      }
      return comp;
    }),
  }));

  const achievements: Achievement[] = [
    // 1. PRIMEIROS PASSOS (Onboarding) - 3 missões
    {
      id: 1,
      title: 'Primeira Conquista',
      description: 'Complete seu primeiro bloco de desafios com sucesso!',
      icon: Trophy,
      unlocked: true,
      date: '14/11/2025',
      color: '#FFD700',
      rarity: 'comum',
    },
    {
      id: 2,
      title: 'Identidade Digital',
      description: 'Complete 100% dos dados do seu perfil',
      icon: IdCard,
      unlocked: true,
      date: '15/11/2025',
      color: '#8B27FF',
      rarity: 'comum',
    },
    {
      id: 3,
      title: 'Explorador Curioso',
      description: 'Visite a seção "Conteúdos" e estude sobre uma competência por 30 minutos',
      icon: BookOpen,
      unlocked: false,
      color: '#00BCD4',
      rarity: 'comum',
    },
    
    // 2. HÁBITO E CONSISTÊNCIA (Streak) - 2 missões
    {
      id: 4,
      title: 'Sequência de 7 Dias',
      description: 'Visite uma competência e estude as dicas de conteúdos por 7 dias',
      icon: Flame,
      unlocked: true,
      date: '18/11/2025',
      color: '#FF6B35',
      rarity: 'raro',
    },
    {
      id: 5,
      title: 'Maratonista',
      description: 'Responda com sucesso 3 competências diferentes em um dia',
      icon: Zap,
      unlocked: false,
      color: '#FFD700',
      rarity: 'raro',
    },
    
    // 3. JORNADA DE COMPETÊNCIA (Níveis 1 ao 5) - 5 missões
    {
      id: 6,
      title: 'Nível 1: Aprendiz Digital',
      description: 'Complete todas as 16 competências do Nível 1',
      icon: Award,
      unlocked: false,
      color: '#4CAF50',
      rarity: 'épico',
    },
    {
      id: 7,
      title: 'Nível 2: Praticante',
      description: 'Complete todas as 16 competências do Nível 2',
      icon: Target,
      unlocked: false,
      color: '#00BCD4',
      rarity: 'épico',
    },
    {
      id: 8,
      title: 'Nível 3: Especialista',
      description: 'Complete todas as 16 competências do Nível 3',
      icon: Star,
      unlocked: false,
      color: '#FF9800',
      rarity: 'épico',
    },
    {
      id: 9,
      title: 'Nível 4: Analista',
      description: 'Complete todas as 16 competências do Nível 4',
      icon: TrendingUp,
      unlocked: false,
      color: '#9C27B0',
      rarity: 'épico',
    },
    {
      id: 10,
      title: 'Nível 5: Mestre Digital',
      description: 'Complete todas as 16 competências do Nível 5',
      icon: Crown,
      unlocked: false,
      color: '#8B27FF',
      rarity: 'lendário',
    },
    
    // 4. PERFORMANCE E EXCELÊNCIA - 3 missões
    {
      id: 11,
      title: 'Tiro Certo',
      description: 'Acerte 3/3 em um bloco de desafios sem errar',
      icon: Crosshair,
      unlocked: false,
      color: '#E91E63',
      rarity: 'raro',
    },
    {
      id: 12,
      title: 'Perfeccionista (Por Área)',
      description: '3 estrelas em todas as competências de uma Área (ex: Comunicação)',
      icon: Sparkles,
      unlocked: false,
      color: '#FFD700',
      rarity: 'épico',
    },
    {
      id: 13,
      title: 'Lenda do Nível',
      description: '3 estrelas em TODAS as competências de um Nível inteiro',
      icon: Medal,
      unlocked: false,
      color: '#8B27FF',
      rarity: 'lendário',
    },
  ];

  // Dados de ranking mock
  const rankingData = {
    escola: [
      { position: 1, name: 'André Silva', points: 895, digcoins: 143, level: 2, levelProgress: 43, medals: 5, avgTime: '45', isCurrentUser: true, avatar: 'A', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
      { position: 2, name: 'Maria Santos', points: 870, digcoins: 137, level: 2, levelProgress: 38, medals: 4, avgTime: '42', isCurrentUser: false, avatar: 'M', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºB' },
      { position: 3, name: 'João Oliveira', points: 845, digcoins: 129, level: 2, levelProgress: 35, medals: 3, avgTime: '39', isCurrentUser: false, avatar: 'J', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '9ºA' },
      { position: 4, name: 'Ana Costa', points: 820, digcoins: 125, level: 1, levelProgress: 87, medals: 4, avgTime: '36', isCurrentUser: false, avatar: 'A', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '7ºC' },
      { position: 5, name: 'Pedro Lima', points: 795, digcoins: 118, level: 1, levelProgress: 81, medals: 3, avgTime: '33', isCurrentUser: false, avatar: 'P', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
      { position: 6, name: 'Juliana Rocha', points: 770, digcoins: 112, level: 1, levelProgress: 75, medals: 2, avgTime: '30', isCurrentUser: false, avatar: 'J', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '9ºB' },
      { position: 7, name: 'Carlos Ferreira', points: 745, digcoins: 105, level: 1, levelProgress: 68, medals: 2, avgTime: '27', isCurrentUser: false, avatar: 'C', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '6ºA' },
      { position: 8, name: 'Beatriz Almeida', points: 720, digcoins: 98, level: 1, levelProgress: 62, medals: 1, avgTime: '24', isCurrentUser: false, avatar: 'B', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '7ºB' },
    ],
    turma: [
      { position: 1, name: 'Maria Santos', points: 870, digcoins: 137, level: 2, levelProgress: 38, medals: 4, avgTime: '42', isCurrentUser: false, avatar: 'M', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
      { position: 2, name: 'André Silva', points: 820, digcoins: 125, level: 2, levelProgress: 43, medals: 5, avgTime: '45', isCurrentUser: true, avatar: 'A', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
      { position: 3, name: 'Pedro Lima', points: 795, digcoins: 118, level: 1, levelProgress: 81, medals: 3, avgTime: '33', isCurrentUser: false, avatar: 'P', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
      { position: 4, name: 'Juliana Rocha', points: 770, digcoins: 112, level: 1, levelProgress: 75, medals: 2, avgTime: '30', isCurrentUser: false, avatar: 'J', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
      { position: 5, name: 'Carlos Ferreira', points: 745, digcoins: 105, level: 1, levelProgress: 68, medals: 2, avgTime: '27', isCurrentUser: false, avatar: 'C', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
      { position: 6, name: 'Beatriz Almeida', points: 720, digcoins: 98, level: 1, levelProgress: 62, medals: 1, avgTime: '24', isCurrentUser: false, avatar: 'B', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
    ],
    rede: [
      { position: 1, name: 'Rafael Mendes', points: 1250, digcoins: 198, level: 3, levelProgress: 72, medals: 8, avgTime: '48', isCurrentUser: false, avatar: 'R', school: 'Escola Municipal Castro Alves', seduc: 'Garanhuns', regional: 'Regional 2', schoolName: 'Escola Municipal Castro Alves', turma: '9ºC' },
      { position: 2, name: 'Camila Souza', points: 1180, digcoins: 185, level: 3, levelProgress: 65, medals: 7, avgTime: '46', isCurrentUser: false, avatar: 'C', school: 'Escola Estadual Dom Pedro II', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Estadual Dom Pedro II', turma: '9ºA' },
      { position: 3, name: 'Lucas Martins', points: 1120, digcoins: 175, level: 2, levelProgress: 95, medals: 6, avgTime: '44', isCurrentUser: false, avatar: 'L', school: 'Escola Técnica Federal', seduc: 'Garanhuns', regional: 'Regional 2', schoolName: 'Escola Técnica Federal', turma: '8ºB' },
      { position: 4, name: 'Fernanda Dias', points: 1050, digcoins: 165, level: 2, levelProgress: 88, medals: 5, avgTime: '42', isCurrentUser: false, avatar: 'F', school: 'Escola Municipal Machado de Assis', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Machado de Assis', turma: '7ºA' },
      { position: 5, name: 'Gustavo Pereira', points: 980, digcoins: 155, level: 2, levelProgress: 76, medals: 5, avgTime: '40', isCurrentUser: false, avatar: 'G', school: 'Escola Estadual Professor João Silva', seduc: 'Garanhuns', regional: 'Regional 2', schoolName: 'Escola Estadual Professor João Silva', turma: '8ºC' },
      { position: 12, name: 'André Silva', points: 895, digcoins: 143, level: 2, levelProgress: 43, medals: 5, avgTime: '45', isCurrentUser: true, avatar: 'A', school: 'Escola Municipal Castro Alves', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ºA' },
      { position: 13, name: 'Isabela Gomes', points: 870, digcoins: 137, level: 2, levelProgress: 38, medals: 4, avgTime: '42', isCurrentUser: false, avatar: 'I', school: 'Escola Municipal Barão do Rio Branco', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Barão do Rio Branco', turma: '9ºB' },
      { position: 14, name: 'Thiago Barbosa', points: 845, digcoins: 129, level: 2, levelProgress: 35, medals: 3, avgTime: '39', isCurrentUser: false, avatar: 'T', school: 'Escola Estadual Tiradentes', seduc: 'Garanhuns', regional: 'Regional 2', schoolName: 'Escola Estadual Tiradentes', turma: '6ºB' },
    ],
  };

  const currentLevel = levels.find(l => l.unlocked) || levels[0];
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  const toggleLevel = (levelNumber: number) => {
    setExpandedLevel(expandedLevel === levelNumber ? null : levelNumber);
  };

  const handleNavigate = (page: string) => {
    if (page === 'progresso') {
      return;
    }
    navigateTo(page);
  };

  // Helper function to get category icon based on category name
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'INFORMAÇÕES E DADOS':
        return Database;
      case 'COMUNICAÇÃO E COLABORAÇÃO':
        return Users;
      case 'CRIAÇÃO DE CONTEÚDO':
        return FileEdit;
      case 'PROTEÇÃO E SEGURANÇA':
        return Shield;
      case 'RESOLUÇÃO DE PROBLEMAS':
        return Wrench;
      default:
        return Database;
    }
  };

  // Função para visualizar resultado de uma competência concluída
  const handleViewResult = (comp: Competencia) => {
    // Gerar questões mockadas baseadas na competência
    const mockQuestions = [
      {
        id: 1,
        text: `Questão 1 sobre ${comp.title}`,
      },
    ];

    // Simular respostas do usuário (todas corretas para competências com 3 estrelas)
    const selectedAnswers: Record<number, string> = comp.starsEarned === 3
      ? { 1: 'b', 2: 'a', 3: 'c' } // Todas corretas
      : { 1: 'b', 2: 'c', 3: 'a' }; // Algumas erradas

    // Navegar para a tela de resultado com os dados
    navigateTo('quiz-result', {
      competency: comp.title,
      category: comp.category,
      categoryColor: comp.categoryColor,
      categoryIcon: getCategoryIcon(comp.category),
      competencyIcon: comp.icon,
      selectedAnswers,
      questions: mockQuestions,
      returnTo: 'progresso', // Indica que deve voltar para progresso
    });
  };

  // Função para iniciar/continuar desafio de uma competência
  const handleStartChallenge = (comp: Competencia) => {
    // Se não está em progresso, iniciar timer
    if (comp.status !== 'in-progress') {
      startCompetencyTimer(comp.title, comp.category, comp.categoryColor);
    }
    
    // Navegar para a tela de quiz/warning
    navigateTo('quiz-warning', {
      competency: comp.title,
      category: comp.category,
      categoryColor: comp.categoryColor,
      competencyIcon: comp.icon,
      fromPage: 'progresso',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="progresso"
        onNavigate={handleNavigate}
        isAdmin={userRole === 'admin'}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userName={userName}
          navigateTo={navigateTo}
          onLogout={() => navigateTo('login')}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            {/* SEÇÃO 1 - CONTEXTO DO USUÁRIO E NÍVEL ATUAL */}
            <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 md:p-8 mb-8 shadow-sm dark:shadow-gray-950">
              {/* Upper Part */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-[#8B27FF] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">{firstName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h2 className="text-3xl text-[#8B27FF] mb-1">Olá, {firstName}!</h2>
                  <p className="text-gray-600 dark:text-gray-300">Continue sua jornada de aprendizagem</p>
                </div>
              </div>

              {/* Lower Part - Current Level Info */}
              <p className="text-lg text-gray-800 dark:text-gray-100">
                Você está no <span>Nível {currentLevel.number}</span>
              </p>
            </div>

            {/* SEÇÃO 2 - ABAS DE NAVEGAÇÃO */}
            <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-sm dark:shadow-gray-950">
              <div className="border-b-2 border-gray-100 dark:border-gray-700 overflow-x-auto scrollbar-hide">
                <div className="flex min-w-max sm:min-w-0">
                  <button
                    onClick={() => setActiveTab('niveis')}
                    className={`
                      px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg transition-all relative whitespace-nowrap flex-shrink-0
                      ${activeTab === 'niveis' 
                        ? 'text-[#8B27FF] font-bold' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }
                    `}
                  >
                    Níveis
                    {activeTab === 'niveis' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B27FF]" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('conquistas')}
                    className={`
                      px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg transition-all relative whitespace-nowrap flex-shrink-0
                      ${activeTab === 'conquistas' 
                        ? 'text-[#8B27FF] font-bold' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }
                    `}
                  >
                    Missões
                    {activeTab === 'conquistas' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B27FF]" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('ranking')}
                    className={`
                      px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg transition-all relative whitespace-nowrap flex-shrink-0
                      ${activeTab === 'ranking' 
                        ? 'text-[#8B27FF] font-bold' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }
                    `}
                  >
                    Ranking
                    {activeTab === 'ranking' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B27FF]" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('digcoins')}
                    className={`
                      px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg transition-all relative whitespace-nowrap flex-shrink-0
                      ${activeTab === 'digcoins' 
                        ? 'text-[#8B27FF] font-bold' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }
                    `}
                  >
                    Recursos
                    {activeTab === 'digcoins' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B27FF]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 md:p-6 lg:p-8">
                {/* CONTEÚDO DA ABA NÍVEIS */}
                {activeTab === 'niveis' && (
                  <NiveisTab
                    levels={levels}
                    expandedLevel={expandedLevel}
                    toggleLevel={toggleLevel}
                    handleViewResult={handleViewResult}
                    handleStartChallenge={handleStartChallenge}
                    currentLevel={currentLevel}
                  />
                )}

                {/* CONTEÚDO DA ABA CONQUISTAS */}
                {activeTab === 'conquistas' && (
                  <ConquistasTab
                    achievements={achievements}
                    unlockedAchievements={unlockedAchievements}
                  />
                )}

                {/* CONTEÚDO DA ABA RANKING */}
                {activeTab === 'ranking' && (
                  <RankingTab 
                    rankingCategory={rankingCategory}
                    setRankingCategory={setRankingCategory}
                    rankingData={rankingData}
                  />
                )}

                {/* CONTEÚDO DA ABA DIGCOINS */}
                {activeTab === 'digcoins' && (
                  <DigcoinsTab
                    totalDigcoins={143}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 300ms ease-in-out;
        }
      `}</style>
    </div>
  );
}