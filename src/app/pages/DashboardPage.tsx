import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ParentalControlPanel from '../components/ParentalControlPanel';
import { getCompetencyStatus } from '../utils/competencyStorage';
import { progressData, recommendedCompetencies } from '../data/dashboardData';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import BasicConceptsBanner from '../components/dashboard/BasicConceptsBanner';
import LevelProgressSection from '../components/dashboard/LevelProgressSection';
import AchievementsCard from '../components/dashboard/AchievementsCard';
import TimeCard from '../components/dashboard/TimeCard';
import RecommendationsSection from '../components/dashboard/RecommendationsSection';
import type { ModuleColors } from '../components/dashboard/types';

interface DashboardPageProps {
  userName: string;
  navigateTo: (page: string, data?: any) => void;
  userRole?: 'admin' | 'user';
  onLogout?: () => void;
  activeModule?: 'atesteme' | 'prosaeb';
  onModuleChange?: (module: 'atesteme' | 'prosaeb') => void;
}

export default function DashboardPage({ userName, navigateTo, userRole, onLogout, activeModule, onModuleChange }: DashboardPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [showParentalControl, setShowParentalControl] = useState(false);
  const [showNocoesBasicasBanner, setShowNocoesBasicasBanner] = useState(true);

  // Verificar se o banner de noções básicas foi fechado
  useEffect(() => {
    const nocoesBasicasClosed =
      sessionStorage.getItem('nocoesBasicasBannerClosed') === 'true';

    setShowNocoesBasicasBanner(!nocoesBasicasClosed);
  }, []);

  const competenciasRecomendadas = recommendedCompetencies.map((comp) => {
    const status = getCompetencyStatus(comp.title);
    return {
      ...comp,
      status: status?.status || 'not-started',
      isInProgress: status?.status === 'in-progress'
    };
  });

  const totalProgress = 43; // 7/16 competências = ~43%
  const currentLevel = 1;

  const handleNavigate = (page: string) => {
    navigateTo(page);
  };

  const handleStartCompetency = (competency: any) => {
    console.log('handleStartCompetency chamada com:', competency);
    // Navegar para a pgina de aviso (igual a tela de habilidades)
    navigateTo('quiz-warning', {
      competency: competency.title,
      category: competency.category,
      categoryColor: competency.color,
      icon: competency.icon,
      fromPage: 'dashboard'
    });
  };

  // Definir cores dinâmicas baseadas no módulo ativo
  const getModuleColors = (): ModuleColors => {
    if (activeModule === 'prosaeb') {
      return {
        primary: 'from-blue-500 via-blue-600 to-blue-700',
        button: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
        icon: 'from-blue-500 to-blue-600',
        textGradient: 'from-blue-500 to-blue-700',
      };
    }
    // Atesteme (padrão roxo)
    return {
      primary: 'from-[#8B27FF] via-[#9D3FFF] to-[#A855F7]',
      button: 'from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9333EA]',
      icon: 'from-[#8B27FF] to-[#A855F7]',
      textGradient: 'from-[#8B27FF] to-[#A855F7]',
    };
  };

  const colors = getModuleColors();

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex pt-20 md:pt-24">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="dashboard"
        onNavigate={handleNavigate}
        isAdmin={userRole === 'admin'}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-16">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userName={userName}
          navigateTo={navigateTo}
          onLogout={onLogout}
          activeModule={activeModule}
          onModuleChange={onModuleChange}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 pt-0 md:pt-1 pb-24 md:pb-5 space-y-6">

            <WelcomeBanner
              isVisible={showWelcomeBanner}
              colors={colors}
              onClose={() => {
                setShowWelcomeBanner(false);
                localStorage.setItem('welcomeBannerClosed', 'true');
              }}
              greeting="usuário(a)"
            />

            <BasicConceptsBanner
              isVisible={showNocoesBasicasBanner}
              onClose={() => {
                setShowNocoesBasicasBanner(false);
                localStorage.setItem('nocoesBasicasBannerClosed', 'true');
              }}
              onStart={() => navigateTo('nocoes-basicas')}
            />

            <LevelProgressSection
              colors={colors}
              currentLevel={currentLevel}
              progressData={progressData}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <AchievementsCard
                  colors={colors}
                  currentLevel={currentLevel}
                  totalProgress={totalProgress}
                  onNavigateToProgress={() => navigateTo('progresso')}
                />
              </div>

              <div className="flex flex-col gap-6">
                <TimeCard
                  colors={colors}
                  onManage={() => setShowParentalControl(true)}
                />
                <RecommendationsSection
                  competencies={competenciasRecomendadas}
                  onStartCompetency={handleStartCompetency}
                  onNavigateToSkills={() => navigateTo('habilidades')}
                />
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Painel de Controle Parental */}
      <ParentalControlPanel
        isOpen={showParentalControl}
        onClose={() => setShowParentalControl(false)}
      />
    </div>
  );
}
