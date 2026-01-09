import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { CompetencyTimer } from '../components/CompetencyTimer';
import ParentalControlPanel from '../components/ParentalControlPanel';
import { getCompetencyStatus, startCompetencyTimer } from '../utils/competencyStorage';
import {
  AlertCircle, ClipboardList, Trophy, Lock, Search, MessageCircle, FolderOpen, X,
  Award, Clock, Users, School, Globe, Coins, Medal, Info,
  ChevronLeft, ChevronRight, Monitor, Lightbulb, FileCheck, PlayCircle, Target
} from 'lucide-react';

interface DashboardPageProps {
  userName: string;
  navigateTo: (page: string, data?: any) => void;
  userRole?: 'admin' | 'user';
  onLogout?: () => void;
  activeModule?: 'atesteme' | 'prosaeb';
  onModuleChange?: (module: 'atesteme' | 'prosaeb') => void;
}

// Countup Animation Component
function CountUp({ end, duration = 1500, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * (endValue - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function DashboardPage({ userName, navigateTo, userRole, onLogout, activeModule, onModuleChange }: DashboardPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [showReinforcementModal, setShowReinforcementModal] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState<any>(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [rankingSlide, setRankingSlide] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [progressAnimationKey, setProgressAnimationKey] = useState(0);
  const [showQuizBanner, setShowQuizBanner] = useState(true);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [testeCompetenciasCompleted, setTesteCompetenciasCompleted] = useState(false);
  const [showParentalControl, setShowParentalControl] = useState(false);
  const [showNocoesBasicasBanner, setShowNocoesBasicasBanner] = useState(true);

  // Verificar se o teste de competências foi concluído
  useEffect(() => {
    const completed = localStorage.getItem('testeCompetenciasCompleted') === 'true';
    setTesteCompetenciasCompleted(completed);

    // Verificar se o banner de noções básicas foi fechado
    const nocoesBasicasClosed =
      sessionStorage.getItem('nocoesBasicasBannerClosed') === 'true';

    setShowNocoesBasicasBanner(!nocoesBasicasClosed);

    // Debug: mostrar no console
    console.log('Dashboard - Teste completado?', completed);
  }, []);

  // Auto-rotate ranking carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setRankingSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Refs for scroll animations
  const levelCardRef = useRef(null);
  const timeCardRef = useRef(null);
  const yourProgressRef = useRef(null);
  const progressBarRef = useRef(null);
  const competenciesRef = useRef(null);
  const conquestRef = useRef(null);
  const competencyBarsRef = useRef(null);

  const levelCardInView = useInView(levelCardRef, { once: false, amount: 0.3 });
  const timeCardInView = useInView(timeCardRef, { once: true, amount: 0.3 });
  const yourProgressInView = useInView(yourProgressRef, { once: true, amount: 0.3 });
  const progressBarInView = useInView(progressBarRef, { once: false, amount: 0.3 });
  const competenciesInView = useInView(competenciesRef, { once: true, amount: 0.2 });
  const conquestInView = useInView(conquestRef, { once: false, amount: 0.3 });
  const competencyBarsInView = useInView(competencyBarsRef, { once: false, amount: 0.3 });

  // Reset progress bar animation when entering viewport
  useEffect(() => {
    if (progressBarInView) {
      setProgressAnimationKey(prev => prev + 1);
    }
  }, [progressBarInView]);

  // Category colors
  const categories = [
    { name: 'Info e Dados', fullName: 'INFORMAÇÕES E DADOS', color: '#FFD700' },
    { name: 'Comunicação', fullName: 'COMUNICAÇÃO E COLABORAÇÃO', color: '#00BCD4' },
    { name: 'Criação', fullName: 'CRIAÇÃO DE CONTEÚDO', color: '#FF9800' },
    { name: 'Proteção', fullName: 'PROTEÇÃO E SEGURANÇA', color: '#4CAF50' },
    { name: 'Resoluão', fullName: 'RESOLUÇÃO DE PROBLEMAS', color: '#E91E63' },
  ];

  // Mock progress data (percentages for each category)
  const progressData = [
    { category: 'INFORMAÇÕES E DADOS', percentage: 40, color: '#FFD700' },
    { category: 'COMUNICAÇÃO E COLABORAÇÃO', percentage: 30, color: '#00BCD4' },
    { category: 'CRIAÇÃO DE CONTEDO', percentage: 10, color: '#FF9800' },
    { category: 'PROTEÇÃO E SEGURANÇA', percentage: 15, color: '#4CAF50' },
    { category: 'RESOLUÇÃO DE PROBLEMAS', percentage: 5, color: '#E91E63' },
  ];

  // Calcular porcentagem geral (média das competências)
  const overallPercentage = Math.round(
    progressData.reduce((sum, item) => sum + item.percentage, 0) / progressData.length
  );

  // Competency cards (only 2 for the new layout) - com status dinâmico
  const competenciasRecomendadas = [
    { category: 'INFORMAÇÕES E DADOS', title: 'Realizar pesquisa e monitoramento', icon: Search, color: '#FFD700' },
    { category: 'COMUNICAÇÃO E COLABORAÇÃO', title: 'Interagir', icon: MessageCircle, color: '#00BCD4' },
  ].map(comp => {
    const status = getCompetencyStatus(comp.title);
    return {
      ...comp,
      status: status?.status || 'not-started',
      isInProgress: status?.status === 'in-progress'
    };
  });

  const totalProgress = 43; // 7/16 competências = ~43%
  const currentLevel = 1;

  // Calculate donut chart
  let cumulativeOffset = 0;

  const rankingSlides = [
    { title: 'Ranking da Turma', icon: Users, position: '1º', total: 'de 30 alunos', color: '#FFD700' },
    { title: 'Ranking da Escola', icon: School, position: '3º', total: 'de 150 alunos', color: '#2196F3' },
    { title: 'Ranking Geral da Rede', icon: Globe, position: '127º', total: 'de 5.000 alunos', color: '#9E9E9E' },
  ];

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

  const handleStartQuiz = () => {
    setShowInitialModal(false);
    setShowReinforcementModal(false);
    if (selectedCompetency) {
      navigateTo('quiz', {
        competency: selectedCompetency.title,
        category: selectedCompetency.category,
        categoryColor: selectedCompetency.color,
        icon: selectedCompetency.icon,
      });
    }
  };

  const handleGoToContents = () => {
    setShowInitialModal(false);
    setShowReinforcementModal(false);
    // TODO: Navegar para página de conteúdos da competência
    console.log('Navegar para conteúdos');
  };

  // Definir cores dinâmicas baseadas no módulo ativo
  const getModuleColors = () => {
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

            {/* 1. BANNER ROXO DE BOAS-VINDAS (Topo) */}
            {showWelcomeBanner && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative bg-gradient-to-r ${colors.primary} rounded-3xl p-8 shadow-2xl overflow-hidden group hover:shadow-[0_20px_60px_rgba(139,39,255,0.4)] transition-all duration-500`}
              >
                {/* Animated gradient blobs */}
                <div className="absolute inset-0 opacity-30">
                  <motion.div
                    className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
                    animate={{
                      x: [0, 50, 0],
                      y: [0, -30, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300 rounded-full blur-3xl"
                    animate={{
                      x: [0, -40, 0],
                      y: [0, 40, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <button
                  onClick={() => {
                    setShowWelcomeBanner(false);
                    localStorage.setItem('welcomeBannerClosed', 'true');
                  }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-300/40 dark:bg-gray-600/40 backdrop-blur-sm hover:bg-gray-400/50 dark:hover:bg-gray-500/50 flex items-center justify-center transition-all hover:scale-105 hover:rotate-90 duration-300 z-20"
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>


                <div className="relative z-10 flex items-center gap-4">
                  <motion.div
                    className="flex-shrink-0"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <div className="text-left">
                    <h2 className="text-xl sm:text-2xl md:text-4xl text-white mb-0">
                      Olá, usuário(a)
                    </h2>
                    <p className="text-white/90 text-xs md:text-base mt-1">Pronto para iniciar sua jornada de aprendizagens digitais?</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. BANNER BRANCO COM BLUR - NOÇÕES BÁSICAS */}
            {showNocoesBasicasBanner && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                {/* Animated background effects */}
                <div className="absolute inset-0 opacity-30">
                  <motion.div
                    className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F3E5F5] to-[#E1BEE7] rounded-full blur-3xl"
                    animate={{
                      x: [0, 30, 0],
                      y: [0, -20, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-[#E1BEE7] to-[#F3E5F5] rounded-full blur-3xl"
                    animate={{
                      x: [0, -20, 0],
                      y: [0, 20, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <button
                  onClick={() => {
                    setShowNocoesBasicasBanner(false);
                    localStorage.setItem('nocoesBasicasBannerClosed', 'true');
                  }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-300/40 dark:bg-gray-600/40 backdrop-blur-sm hover:bg-gray-400/50 dark:hover:bg-gray-500/50 flex items-center justify-center transition-all hover:scale-105 hover:rotate-90 duration-300 z-20"
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1 w-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F3E5F5] to-[#E1BEE7] backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <ClipboardList className="w-6 h-6 text-[#7B1FA2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#6A1B9A] dark:text-purple-300 text-lg font-bold mb-1">
                        Noções Básicas
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                        Sobre informática, internet e mundo digital. Muito recomendado fazer antes de iniciar a jornada no Nível 1.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateTo('nocoes-basicas')}
                    className="bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9333EA] text-white px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex-shrink-0 w-full sm:w-auto font-bold"
                  >
                    Iniciar
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. SEÇÃO HORIZONTAL: NÍVEL + PROGRESSO/GRÁFICO + LOGO */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 items-stretch">

              {/* Card 1: Nível Atual */}
              <motion.div
                ref={levelCardRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`relative bg-gradient-to-br ${colors.primary} rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center w-full lg:w-[180px] h-full min-h-[180px] overflow-hidden`}
              >
                {/* Efeito de luz animado */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-3 shadow-md">
                    <p className="text-white text-[10px] uppercase tracking-wider font-bold">Nível Atual</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-5xl shadow-lg mb-2"
                  >
                    {currentLevel}
                  </motion.div>
                  <p className="text-white/90 text-[9px] uppercase tracking-wider text-center">Continue!</p>
                </div>
              </motion.div>

              {/* Card 2: Progresso (2 cards dentro) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all h-full min-h-[180px]"
              >
                {/* Grid interna: 2 cards internos */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-6 h-full">

                  {/* CARD INTERNO 1 - Porcentagem */}
                  <div className="bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col items-center justify-center">
                    <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Progresso
                    </p>

                    <motion.div
                      ref={competencyBarsRef}
                      initial={{ scale: 0 }}
                      animate={competencyBarsInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                      className={`text-5xl sm:text-6xl font-black bg-gradient-to-br ${colors.textGradient} bg-clip-text text-transparent`}
                    >
                      <CountUp end={overallPercentage} suffix="%" />
                    </motion.div>
                  </div>

                  {/* CARD INTERNO 2 - Gráfico */}
                  <div className="bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-center">
                    <div className="flex-1 w-full min-w-0 flex flex-col justify-center space-y-2.5">
                      {progressData.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide leading-tight whitespace-normal break-words">
                              {item.category}
                            </span>
                          </div>

                          {/* MOBILE (sem tooltip) */}
                          <div className="relative h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden md:hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={competencyBarsInView ? { width: `${item.percentage}%` } : { width: 0 }}
                              transition={{
                                duration: 1.2,
                                delay: 0.15 * index,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              className="h-full rounded-full shadow-sm"
                              style={{ backgroundColor: item.color }}
                            />
                          </div>

                          {/* DESKTOP (com tooltip no hover) */}
                          <div className="relative group hidden md:block">
                            <div className="relative h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={competencyBarsInView ? { width: `${item.percentage}%` } : { width: 0 }}
                                transition={{
                                  duration: 1.2,
                                  delay: 0.15 * index,
                                  ease: [0.25, 0.1, 0.25, 1],
                                }}
                                className="h-full rounded-full shadow-sm"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>

                            {/* Tooltip */}
                            <div
                              className="pointer-events-none absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                              style={{ left: `${item.percentage}%`, transform: "translateX(-50%)" }}
                            >
                              <div
                                className="px-2 py-1 text-[10px] font-bold text-white rounded-md shadow-lg"
                                style={{ backgroundColor: item.color }}
                              >
                                {item.percentage}%
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>


              {/* Card 3: Logo da Organização */}
              <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg 
             flex items-center justify-center 
             w-full h-full min-h-[145px] 
             overflow-hidden 
             border-2 border-gray-200 dark:border-gray-700
             md:col-span-2 lg:col-span-3"
>


                {/* Efeitos de fundo sutis */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-400 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 text-center p-4">
                  <p className="text-gray-400 dark:text-gray-500 text-[9px] font-normal uppercase tracking-[0.1em] mb-0.5">
                    CONTA DE
                  </p>

                  <h2 className="text-gray-600 dark:text-gray-400 text-base font-medium uppercase tracking-tight mb-0.5">
                    ORGANIZAÇÃO
                  </h2>

                  <div className="flex items-center justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wide">
                      ateste<span className="text-[#8B27FF]">me</span>
                    </p>
                  </div>
                </div>
              </motion.div>


            </div>

            {/* 4. LAYOUT DE DUAS COLUNAS */}
            <div className="grid lg:grid-cols-2 gap-6">

              {/* COLUNA ESQUERDA: MINHAS CONQUISTAS */}
              <div className="flex flex-col gap-6">

                {/* Card Minhas Conquistas - REORGANIZADO */}
                <motion.div
                  ref={conquestRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all h-full flex flex-col"
                >
                  {/* Título Minhas Conquistas */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${colors.icon} rounded-full flex items-center justify-center`}>
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#333] dark:text-gray-200">Minhas Conquistas</h3>
                  </div>

                  {/* Barra de progresso de conquistas (SEM % fixo + tooltip no desktop) */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">
                      <span>Nível {currentLevel - 1}</span>
                      <span>Nível {currentLevel}</span>
                    </div>

                    {/* MOBILE (sem tooltip) */}
                    <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden md:hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={conquestInView ? { width: `${totalProgress}%` } : { width: 0 }}
                        transition={conquestInView ? { duration: 1.5, delay: 0.3, ease: "easeOut" } : { duration: 0 }}
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colors.button} rounded-full`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    </div>

                    {/* DESKTOP (com tooltip no hover) */}
                    <div className="relative group hidden md:block">
                      <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={conquestInView ? { width: `${totalProgress}%` } : { width: 0 }}
                          transition={conquestInView ? { duration: 1.5, delay: 0.3, ease: "easeOut" } : { duration: 0 }}
                          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colors.button} rounded-full`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      </div>

                      {/* Tooltip */}
                      <div
                        className="pointer-events-none absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                        style={{ left: `${totalProgress}%`, transform: 'translateX(-50%)' }}
                      >
                        <div className="px-2 py-1 text-[10px] font-bold text-white rounded-md shadow-lg bg-gray-900/90">
                          {totalProgress}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid de 4 Cards (2x2) */}
                  <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
                    {/* Card Competências - ROXO LEVE */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={conquestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Target className="w-10 h-10 mx-auto mb-2 text-[#7B1FA2] dark:text-purple-400 opacity-60" />
                      <p className="text-2xl font-bold text-[#7B1FA2] dark:text-purple-300 opacity-70 mb-1">
                        <CountUp end={7} />/<CountUp end={16} />
                      </p>
                      <p className="text-xs text-[#555] dark:text-gray-400 font-bold uppercase tracking-wide">Competências</p>
                    </motion.div>

                    {/* Card Medalhas - GRADIENT DESAFIOS */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={conquestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] dark:from-purple-900/40 dark:to-purple-800/40 rounded-xl p-4 text-center flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Medal className="w-10 h-10 mx-auto mb-2 text-[#7B1FA2] dark:text-purple-400 opacity-60" />
                      <p className="text-2xl font-bold text-[#7B1FA2] dark:text-purple-300 opacity-70 mb-1">
                        <CountUp end={12} />/<CountUp end={25} />
                      </p>
                      <p className="text-xs text-[#555] dark:text-gray-400 font-bold uppercase tracking-wide">Medalhas</p>
                    </motion.div>

                    {/* Card Pontos - ÍNDIGO */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={conquestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 text-center flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Coins className="w-10 h-10 mx-auto mb-2 text-[#3949AB] dark:text-indigo-400 opacity-60" />
                      <p className="text-2xl font-bold text-[#3949AB] dark:text-indigo-300 opacity-70 mb-1">
                        <CountUp end={1247} />
                      </p>
                      <p className="text-xs text-[#555] dark:text-gray-400 font-bold uppercase tracking-wide">Pontos</p>
                    </motion.div>

                    {/* Card Ranking - CARROSSEL COM CORES DINÂMICAS */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={conquestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className={`relative rounded-xl p-4 text-center flex flex-col justify-center overflow-hidden shadow-md hover:shadow-lg transition-shadow ${rankingSlide === 0
                        ? 'bg-gray-50 dark:bg-gray-700/50'
                        : rankingSlide === 1
                          ? 'bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] dark:from-purple-900/40 dark:to-purple-800/40'
                          : 'bg-indigo-50 dark:bg-indigo-900/30'
                        }`}
                    >
                      {/* Navegação Esquerda */}
                      <button
                        onClick={() => setRankingSlide((prev) => (prev - 1 + 3) % 3)}
                        className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 dark:bg-gray-600/80 hover:bg-white dark:hover:bg-gray-500 rounded-full flex items-center justify-center shadow-md z-10 transition-all hover:scale-110"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                      </button>

                      {/* Navegação Direita */}
                      <button
                        onClick={() => setRankingSlide((prev) => (prev + 1) % 3)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 dark:bg-gray-600/80 hover:bg-white dark:hover:bg-gray-500 rounded-full flex items-center justify-center shadow-md z-10 transition-all hover:scale-110"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                      </button>

                      {/* Conteúdo do Slide */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={rankingSlide}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center justify-center"
                        >
                          {React.createElement(rankingSlides[rankingSlide].icon, {
                            className: "w-10 h-10 mx-auto mb-2 opacity-60",
                            style: {
                              color: rankingSlide === 0
                                ? '#616161'
                                : rankingSlide === 1
                                  ? '#7B1FA2'
                                  : '#3949AB'
                            }
                          })}
                          <p
                            className="text-2xl font-bold mb-1 opacity-70"
                            style={{
                              color: rankingSlide === 0
                                ? '#616161'
                                : rankingSlide === 1
                                  ? '#7B1FA2'
                                  : '#3949AB'
                            }}
                          >
                            {rankingSlides[rankingSlide].position}
                          </p>
                          <p className="text-[10px] text-[#555] dark:text-gray-400 font-bold uppercase tracking-wide mb-0.5">
                            {rankingSlides[rankingSlide].title}
                          </p>
                          <p className="text-[9px] text-gray-500 dark:text-gray-400">
                            {rankingSlides[rankingSlide].total}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      {/* Indicadores de Slide */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {[0, 1, 2].map((index) => (
                          <button
                            key={index}
                            onClick={() => setRankingSlide(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${rankingSlide === index
                              ? 'bg-gray-700 dark:bg-gray-300 w-4'
                              : 'bg-gray-400 dark:bg-gray-500'
                              }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Botão Ver detalhes */}
                  <button
                    onClick={() => navigateTo('progresso')}
                    className={`w-full bg-gradient-to-r ${colors.button} text-white px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95`}
                  >
                    Ver detalhes
                  </button>
                </motion.div>
              </div>

              {/* COLUNA DIREITA: TEMPO NA PLATAFORMA + COMPETÊNCIAS RECOMENDADAS */}
              <div className="flex flex-col gap-6">

                {/* Card de Tempo na Plataforma */}
                <motion.div
                  ref={timeCardRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${colors.icon} rounded-full flex items-center justify-center`}>
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-[#333] dark:text-gray-200">Tempo</h3>
                    </div>
                    <button
                      onClick={() => setShowParentalControl(true)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                      Gerenciar
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Total */}
                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Total</span>
                      <span className="text-lg font-bold text-[#9333EA] dark:text-purple-400">
                        <CountUp end={2} suffix="d " />
                        <CountUp end={16} suffix="h" />
                      </span>
                    </div>

                    {/* Diário */}
                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Diário</span>
                      <span className="text-lg font-bold text-[#9333EA] dark:text-purple-400">
                        <CountUp end={3} suffix="h " />
                        <CountUp end={12} suffix="m" />
                      </span>
                    </div>

                    {/* Divisória */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    {/* Desafios */}
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] dark:from-purple-900/40 dark:to-purple-800/40 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Desafios</span>
                      <span className="text-lg font-bold text-[#7B1FA2] dark:text-purple-300">
                        <CountUp end={3} suffix="h " />
                        <CountUp end={22} suffix="m" />
                      </span>
                    </div>

                    {/* Exames */}
                    <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Exames</span>
                      <span className="text-lg font-bold text-[#3949AB] dark:text-indigo-300">
                        <CountUp end={1} suffix="h " />
                        <CountUp end={45} suffix="m" />
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Competências Recomendadas */}
                <div ref={competenciesRef}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#333] mb-1">Competências recomendadas</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {competenciasRecomendadas.map((comp, index) => {
                      // Definir cores por categoria
                      let badgeBg = '';
                      let iconBgClass = '';
                      let buttonGradient = '';

                      if (comp.color === '#FFD700') { // Amarelo - Info e Dados
                        badgeBg = '#FFD700';
                        iconBgClass = 'bg-[#FFF9E6] dark:bg-yellow-900/30';
                        buttonGradient = 'linear-gradient(135deg, #FFE57F 0%, #FF9800 100%)';
                      } else if (comp.color === '#00BCD4') { // Cyan - Comunicaço
                        badgeBg = '#00BCD4';
                        iconBgClass = 'bg-[#E0F7FA] dark:bg-cyan-900/30';
                        buttonGradient = 'linear-gradient(135deg, #4DD0E1 0%, #0288D1 100%)';
                      } else if (comp.color === '#FF9800') { // Laranja - Criação
                        badgeBg = '#FF9800';
                        iconBgClass = 'bg-[#FFF3E0] dark:bg-orange-900/30';
                        buttonGradient = 'linear-gradient(135deg, #FFB74D 0%, #E65100 100%)';
                      } else if (comp.color === '#4CAF50') { // Verde - Proteção
                        badgeBg = '#4CAF50';
                        iconBgClass = 'bg-[#E8F5E9] dark:bg-green-900/30';
                        buttonGradient = 'linear-gradient(135deg, #81C784 0%, #2E7D32 100%)';
                      } else if (comp.color === '#E91E63') { // Rosa - Resolução
                        badgeBg = '#E91E63';
                        iconBgClass = 'bg-[#FCE4EC] dark:bg-pink-900/30';
                        buttonGradient = 'linear-gradient(135deg, #F48FB1 0%, #AD1457 100%)';
                      }

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={competenciesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.08,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          whileHover={{
                            y: -8,
                            scale: 1.02,
                            transition: { duration: 0.1 }
                          }}
                          className="relative bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-100 overflow-hidden group"
                        >
                          {/* Formas coloridas que descem no hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                            <motion.div
                              initial={{ y: -200, x: '20%' }}
                              whileHover={{ y: 100 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="absolute w-[200px] h-[200px] rounded-full blur-3xl"
                              style={{ backgroundColor: `${comp.color}20` }}
                            />
                          </div>

                          {/* Badge da Categoria - Topo */}
                          <div
                            className="relative z-10 w-full px-4 py-2.5 rounded-t-[20px] group-hover:brightness-110 transition-all duration-200"
                            style={{ backgroundColor: badgeBg }}
                          >
                            <span className="text-white text-[10px] font-bold uppercase tracking-[1px] drop-shadow-sm">
                              {comp.category}
                            </span>
                          </div>

                          {/* Corpo do Card */}
                          <div className="relative z-10 p-4 flex flex-col items-center gap-3">
                            {/* Ícone Central */}
                            <motion.div
                              whileHover={{
                                rotate: [0, -10, 10, -10, 0],
                                scale: 1.15,
                              }}
                              transition={{
                                rotate: { duration: 0.4 },
                                scale: { duration: 0.2 }
                              }}
                              className={`w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200 ${iconBgClass}`}
                            >
                              <comp.icon
                                className="w-[30px] h-[30px]"
                                style={{ color: comp.color }}
                                strokeWidth={2}
                              />
                            </motion.div>

                            {/* Título da Competência */}
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center leading-tight min-h-[36px]">
                              {comp.title}
                            </h4>

                            {/* Timer e Botão para competências em progresso */}
                            {comp.isInProgress ? (
                              <div className="w-full space-y-2">
                                {/* Timer */}
                                <CompetencyTimer
                                  competencyName={comp.title}
                                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                                  showIcon={true}
                                />

                                {/* Botão Continuar - Índigo */}
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  transition={{ duration: 0.15 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartCompetency(comp);
                                  }}
                                  className="w-full py-2 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                                >
                                  <span className="flex items-center justify-center gap-1.5">
                                    <PlayCircle className="w-3.5 h-3.5" />
                                    CONTINUAR
                                  </span>
                                </motion.button>
                              </div>
                            ) : (
                              /* Botão INICIAR */
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Botão clicado!', comp);
                                  handleStartCompetency(comp);
                                }}
                                className="w-full py-2 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200"
                                style={{
                                  background: buttonGradient
                                }}
                              >
                                <span className="flex items-center justify-center gap-1.5">
                                  <PlayCircle className="w-3.5 h-3.5" />
                                  INICIAR
                                </span>
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Link Ver todas */}
                  <div className="mt-4">
                    <button
                      onClick={() => navigateTo('habilidades')}
                      className="text-sm text-[#8B27FF] hover:text-[#7B1FE8] transition-colors hover:underline font-medium"
                    >
                      Ver todas as competências →
                    </button>
                  </div>
                </div>
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
