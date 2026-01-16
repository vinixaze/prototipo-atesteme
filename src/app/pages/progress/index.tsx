import { useState } from 'react';
import Header from '../shared/components/Header';
import Sidebar from '../shared/components/Sidebar';
import RankingTab from './components/RankingTab';
import AchievementsTab from './components/AchievementsTab';
import LevelsTab from './components/LevelsTab';
import CoinsTab from './components/CoinsTab';
import { startCompetencyTimer, getCompetencyStatus } from '../../utils/competencyStorage';
import { Achievement, Competency, Level, ProgressPageProps } from './types';
import { achievements, baseLevels } from "./data";
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
import type { PageId } from "../../../lib/navigation/routes";

export default function ProgressPage({ navigateTo, initialTab = 'niveis', userName = 'André', userRole = 'user' }: ProgressPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'niveis' | 'conquistas' | 'ranking' | 'digcoins'>(initialTab);
  const [rankingCategory, setRankingCategory] = useState<'escola' | 'turma' | 'rede'>('turma');

  // Get first name only
  const firstName = userName.split(' ')[0];

  // Base levels data
  const levels = baseLevels;

  // Dados de ranking mock
  const rankingData = {
    escola: [
      { position: 1, name: 'André Silva', points: 895, digcoins: 143, level: 2, levelProgress: 43, medals: 5, avgTime: '45', isCurrentUser: true, avatar: 'A', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªA' },
      { position: 2, name: 'Maria Santos', points: 870, digcoins: 137, level: 2, levelProgress: 38, medals: 4, avgTime: '42', isCurrentUser: false, avatar: 'M', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªB' },
      { position: 3, name: 'João Oliveira', points: 845, digcoins: 129, level: 2, levelProgress: 35, medals: 3, avgTime: '39', isCurrentUser: false, avatar: 'J', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '9ªA' },
      { position: 4, name: 'Ana Costa', points: 820, digcoins: 125, level: 1, levelProgress: 87, medals: 4, avgTime: '36', isCurrentUser: false, avatar: 'A', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '7ªC' },
      { position: 5, name: 'Pedro Lima', points: 795, digcoins: 118, level: 1, levelProgress: 81, medals: 3, avgTime: '33', isCurrentUser: false, avatar: 'P', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma:'8ªA' },
      { position :6 , name: 'Juliana Rocha' , points :770 , digcoins :112 , level :1 , levelProgress :75 , medals :2 , avgTime :'30' , isCurrentUser :false , avatar :'J' , seduc :'Garanhuns' , regional :'Regional 1' , schoolName :'Escola Municipal Castro Alves' , turma :'9ªB' },
      { position: 7, name: 'Carlos Ferreira', points: 745, digcoins: 105, level: 1, levelProgress: 68, medals: 2, avgTime: '27', isCurrentUser: false, avatar: 'C', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '6ªA' },
      { position: 8, name: 'Beatriz Almeida', points: 720, digcoins: 98, level: 1, levelProgress: 62, medals: 1, avgTime: '24', isCurrentUser: false, avatar: 'B', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '7ªB' },
    ],
    turma: [
      { position: 1, name: 'Maria Santos', points: 870, digcoins: 137, level: 2, levelProgress: 38, medals: 4, avgTime: '42', isCurrentUser: false, avatar: 'M', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªA' },
      { position: 2, name: 'André Silva', points: 820, digcoins: 125, level: 2, levelProgress: 43, medals: 5, avgTime: '45', isCurrentUser: true, avatar: 'A', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªA' },
      { position: 3, name: 'Pedro Lima', points: 795, digcoins: 118, level: 1, levelProgress: 81, medals: 3, avgTime: '33', isCurrentUser: false, avatar: 'P', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªA' },
      { position: 4, name: 'Juliana Rocha', points: 770, digcoins: 112, level: 1, levelProgress: 75, medals: 2, avgTime: '30', isCurrentUser: false, avatar: 'J', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªA' },
      { position: 5, name: 'Carlos Ferreira', points: 745, digcoins: 105, level: 1, levelProgress: 68, medals: 2, avgTime: '27', isCurrentUser: false, avatar: 'C', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªA' },
      { position: 6, name: 'Beatriz Almeida', points: 720, digcoins: 98, level: 1, levelProgress: 62, medals: 1, avgTime: '24', isCurrentUser: false, avatar: 'B', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªA' },
    ],
    rede: [
      { position: 1, name: 'Rafael Mendes', points: 1250, digcoins: 198, level: 3, levelProgress: 72, medals: 8, avgTime: '48', isCurrentUser: false, avatar: 'R', school: 'Escola Municipal Castro Alves', seduc: 'Garanhuns', regional: 'Regional 2', schoolName: 'Escola Municipal Castro Alves', turma: '9ªC' },
      { position: 2, name: 'Camila Souza', points: 1180, digcoins: 185, level: 3, levelProgress: 65, medals: 7, avgTime: '46', isCurrentUser: false, avatar: 'C', school: 'Escola Estadual Dom Pedro II', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Estadual Dom Pedro II', turma: '9ªA' },
      { position: 3, name: 'Lucas Martins', points: 1120, digcoins: 175, level: 2, levelProgress: 95, medals: 6, avgTime: '44', isCurrentUser: false, avatar: 'L', school: 'Escola Técnica Federal', seduc: 'Garanhuns', regional: 'Regional 2', schoolName: 'Escola Técnica Federal', turma: '8ªB' },
      { position: 4, name: 'Fernanda Dias', points: 1050, digcoins: 165, level: 2, levelProgress: 88, medals: 5, avgTime: '42', isCurrentUser: false, avatar: 'F', school: 'Escola Municipal Machado de Assis', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Machado de Assis', turma: '7ªA' },
      { position: 5, name: 'Gustavo Pereira', points: 980, digcoins: 155, level: 2, levelProgress: 76, medals: 5, avgTime: '40', isCurrentUser: false, avatar: 'G', school: 'Escola Estadual Professor João Silva', seduc: 'Garanhuns', regional: 'Regional 2', schoolName: 'Escola Estadual Professor João Silva', turma: '8ªC' },
      { position: 12, name: 'André Silva', points: 895, digcoins: 143, level: 2, levelProgress: 43, medals: 5, avgTime: '45', isCurrentUser: true, avatar: 'A', school: 'Escola Municipal Castro Alves', seduc: 'Garanhuns', regional: 'Regional 1', schoolName: 'Escola Municipal Castro Alves', turma: '8ªA' },
      { position: 13, name: 'Isabela Gomes', points: 870, digcoins: 137, level: 2, levelProgress: 38, medals: 4, avgTime: '42', isCurrentUser: false, avatar: 'I', school: 'Escola Municipal Barão do Rio Branco', seduc: 'Garanhuns', regional: 'Regional 1', schoolName:'Escola Municipal Barão do Rio Branco' , turma:'9ªB' },
      { position :14 , name :'Thiago Barbosa' , points :845 , digcoins :129 , level :2 , levelProgress :35 , medals :3 , avgTime :'39' , isCurrentUser :false , avatar :'T' , school :'Escola Estadual Tiradentes' , seduc :'Garanhuns' , regional :'Regional 2' , schoolName :'Escola Estadual Tiradentes' , turma :'6ªB' },
    ],
  };

  const currentLevel = levels.find(l => l.unlocked) || levels[0];
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  const toggleLevel = (levelNumber: number) => {
    setExpandedLevel(expandedLevel === levelNumber ? null : levelNumber);
  };

  const handleNavigate = (page: PageId) => {
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
  const handleViewResult = (comp: Competency) => {
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
  const handleStartChallenge = (comp: Competency) => {
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
                  <LevelsTab
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
                  <AchievementsTab
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
                  <CoinsTab
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
