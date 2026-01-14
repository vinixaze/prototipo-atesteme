import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ParentalControlPanel from '../../components/ParentalControlPanel';
import { WelcomeBanner } from './components/WelcomeBanner';
import { BasicsBanner } from "./components/BasicsBanner";
import { LevelCard } from './components/LevelCard';
import { ProgressCard } from './components/ProgressCard';
import { TimeCard } from './components/TimeCard';
import { RecommendedCompetenciesSection } from './components/RecommendedCompetenciesSection';
import { AchievementsCard } from './components/AchievementsCard';
import { OrganizationLogoCard } from './components/OrganizationLogoCard';
import { getCompetencyStatus } from '../../utils/competencyStorage';
import { getModuleColors } from './utils/moduleColors';
import { progressData, currentLevel } from './utils/constants';
import { baseRecommendedCompetencies } from './utils/recommendedCompetencies';
import { DashboardPageProps, RecommendedCompetency } from './types';

export default function DashboardPage({
  userName,
  navigateTo,
  userRole,
  onLogout,
  activeModule,
  onModuleChange,
}: DashboardPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [showNocoesBasicasBanner, setShowNocoesBasicasBanner] = useState(true);
  const [showParentalControl, setShowParentalControl] = useState(false);

  useEffect(() => {
    const nocoesBasicasClosed =
      sessionStorage.getItem('nocoesBasicasBannerClosed') === 'true';
    setShowNocoesBasicasBanner(!nocoesBasicasClosed);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const colors = getModuleColors(activeModule);

  const overallPercentage = Math.round(
    progressData.reduce((sum, item) => sum + item.percentage, 0) / progressData.length
  );

  const recommendedCompetencies: RecommendedCompetency[] = baseRecommendedCompetencies.map((comp) => {
    const status = getCompetencyStatus(comp.title);
    return {
      ...comp,
      status: status?.status || 'not-started',
      isInProgress: status?.status === 'in-progress',
    };
  });

  const handleNavigate = (page: string) => {
    navigateTo(page);
  };

  const handleStartCompetency = (competency: RecommendedCompetency) => {
    navigateTo('quiz-warning', {
      competency: competency.title,
      category: competency.category,
      categoryColor: competency.color,
      icon: competency.icon,
      fromPage: 'dashboard',
    });
  };

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
            {showWelcomeBanner && (
              <WelcomeBanner
                colors={colors}
                onClose={() => {
                  setShowWelcomeBanner(false);
                  localStorage.setItem('welcomeBannerClosed', 'true');
                }}
              />
            )}

            {showNocoesBasicasBanner && (
              <BasicsBanner
                onClose={() => {
                  setShowNocoesBasicasBanner(false);
                  localStorage.setItem('nocoesBasicasBannerClosed', 'true');
                }}
                onNavigate={navigateTo}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 items-stretch">
              <LevelCard colors={colors} currentLevel={currentLevel} />

              <ProgressCard
                colors={colors}
                progressData={progressData}
                overallPercentage={overallPercentage}
              />

              <OrganizationLogoCard />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <AchievementsCard colors={colors} onNavigate={navigateTo} />
              <div className="flex flex-col gap-6">
                <TimeCard colors={colors} onOpenParentalControl={() => setShowParentalControl(true)} />
                <RecommendedCompetenciesSection
                  competencies={recommendedCompetencies}
                  onStartCompetency={handleStartCompetency}
                  onNavigate={navigateTo}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <ParentalControlPanel
        isOpen={showParentalControl}
        onClose={() => setShowParentalControl(false)}
      />
    </div>
  );
}
