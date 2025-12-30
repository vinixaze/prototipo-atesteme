import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { CompetencyTimer } from '../components/CompetencyTimer';
import { getCompetencyStatus, getDaysUntilUnblock } from '../utils/competencyStorage';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
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
  Lock,
  Wrench,
  TrendingUp,
  AlertTriangle,
  X,
  PlayCircle,
  Info,
  Award,
  ClipboardList,
  ArrowUp,
} from 'lucide-react';

interface HabilidadesPageProps {
  navigateTo: (page: string, data?: any) => void;
  userRole?: 'admin' | 'user';
}

interface Competencia {
  title: string;
  icon: any;
}

interface Category {
  name: string;
  color: string;
  bgColor: string;
  icon: any;
  competencias: Competencia[];
}

export default function HabilidadesPage({ navigateTo, userRole }: HabilidadesPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState<any>(null);
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  const categories: Category[] = [
    {
      name: 'INFORMAÇÕES E DADOS',
      color: '#FFD700',
      bgColor: '#FFF9E6',
      icon: BarChart3,
      competencias: [
        { title: 'Realizar pesquisa e monitoramento', icon: Search },
        { title: 'Realizar o tratamento de dados', icon: BarChart3 },
        { title: 'Gerenciar dados', icon: FolderOpen },
      ],
    },
    {
      name: 'COMUNICAÇÃO E COLABORAÇÃO',
      color: '#00BCD4',
      bgColor: '#E0F7FA',
      icon: Users,
      competencias: [
        { title: 'Interagir', icon: MessageCircle },
        { title: 'Gerir a identidade digital', icon: Fingerprint },
        { title: 'Compartilhar e publicar', icon: Share2 },
        { title: 'Colaborar', icon: Users },
      ],
    },
    {
      name: 'CRIAÇÃO DE CONTEÚDO',
      color: '#FF9800',
      bgColor: '#FFF3E0',
      icon: FileEdit,
      competencias: [
        { title: 'Programar sistemas', icon: Code },
        { title: 'Editar texto multimídia', icon: ImageIcon },
        { title: 'Editar texto escrito', icon: FileEdit },
        { title: 'Adaptar arquivos', icon: Files },
      ],
    },
    {
      name: 'PROTEÇÃO E SEGURANÇA',
      color: '#4CAF50',
      bgColor: '#E8F5E9',
      icon: Shield,
      competencias: [
        { title: 'Proteger o ambiente digital', icon: Shield },
        { title: 'Proteger dados pessoais e privacidade', icon: Lock },
        { title: 'Proteger a saúde e o meio ambiente', icon: Heart },
      ],
    },
    {
      name: 'RESOLUÇÃO DE PROBLEMAS',
      color: '#E91E63',
      bgColor: '#FCE4EC',
      icon: Wrench,
      competencias: [
        { title: 'Resolver problemas técnicos', icon: Wrench },
        { title: 'Evoluir em um ambiente digital', icon: TrendingUp },
      ],
    },
  ];

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      competencias: category.competencias.filter((comp) =>
        comp.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => {
      if (selectedArea === 'Todas') return category.competencias.length > 0;
      return category.name === selectedArea && category.competencias.length > 0;
    });

  const handleNavigate = (page: string) => {
    if (page === 'habilidades') {
      return;
    }
    navigateTo(page);
  };

  const handleStartQuiz = (competency: string, category: string, categoryColor: string, competencyIcon: any, categoryIcon: any) => {
    setSelectedCompetency({ competency, category, categoryColor, competencyIcon, categoryIcon });
    // Navegar para a página de aviso ao invés de mostrar modal
    navigateTo('quiz-warning', { competency, category, categoryColor, competencyIcon, categoryIcon, fromPage: 'habilidades' });
  };

  const handleConfirmWarning = () => {
    setShowWarningModal(false);
    navigateTo('quiz', selectedCompetency);
  };

  const handleShowBlockedModal = (competency: string, category: string, categoryColor: string, competencyIcon: any, categoryIcon: any) => {
    setSelectedCompetency({ competency, category, categoryColor, competencyIcon, categoryIcon });
    setShowBlockedModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="habilidades"
        onNavigate={handleNavigate}
        isAdmin={userRole === 'admin'}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          userName="Usuário"
          navigateTo={navigateTo}
          onLogout={() => navigateTo('login')}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl text-[#8B27FF] mb-2">Competências Digitais</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Desenvolva suas competências nas 5 áreas do letramento digital
              </p>
            </div>

            {/* Botão Noções Básicas - CTA Destacado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => {
                navigateTo('nocoes-basicas');
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B27FF]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex gap-4 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#8B27FF] rounded-full flex items-center justify-center shadow-lg">
                      <ClipboardList className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl mb-1 dark:text-gray-200">Noções Básicas</h3>
                  </div>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Conteúdos básicos de informática, internet e vida digital. Recomendado antes do Nível 01.
                </p>
                <button className="bg-[#8B27FF] hover:bg-[#7B1FE8] text-white px-6 py-2.5 rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-sm">
                  Iniciar
                </button>
              </div>
            </motion.div>

            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Digite o nome da competência"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B27FF] focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>

                {/* Filter by Area */}
                <div className="md:w-72">
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B27FF] focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  >
                    <option>Todas</option>
                    <option>INFORMAÇÕES E DADOS</option>
                    <option>COMUNICAÇÃO E COLABORAÇÃO</option>
                    <option>CRIAÇÃO DE CONTEÚDO</option>
                    <option>PROTEÇÃO E SEGURANÇA</option>
                    <option>RESOLUÇÃO DE PROBLEMAS</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Categories and Skills */}
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => {
                const CategorySection = () => {
                  const categoryRef = useRef(null);
                  const categoryInView = useInView(categoryRef, { once: true, amount: 0.2 });

                  return (
                    <div key={categoryIndex} ref={categoryRef}>
                      {/* Category Header */}
                      <div className="flex items-center gap-3 p-4 rounded-xl mb-6 bg-white dark:bg-gray-800">
                        <category.icon
                          className="w-6 h-6"
                          style={{ color: category.color }}
                          strokeWidth={1.5}
                        />
                        <h2 className="text-lg font-bold" style={{ color: category.color }}>
                          {category.name}
                        </h2>
                      </div>

                      {/* Competency Cards Grid - NOVO DESIGN */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {category.competencias.map((comp, compIndex) => {
                          // Obter status da competência
                          const status = getCompetencyStatus(comp.title);
                          const isCompleted = status?.status === 'completed';
                          const isFailed = status?.status === 'failed';
                          const isAttempted = status?.status === 'attempted'; // Tentou mas pode refazer
                          // Mock: Definir "Compartilhar e publicar" como em progresso para visualização
                          const isInProgress = status?.status === 'in-progress' || comp.title === 'Compartilhar e publicar';

                          // Definir classes de background para dark mode
                          let iconBgClass = '';
                          if (category.color === '#FFD700') { // Amarelo
                            iconBgClass = isFailed ? '' : 'bg-[#FFF9E6] dark:bg-yellow-900/30';
                          } else if (category.color === '#00BCD4') { // Cyan
                            iconBgClass = isFailed ? '' : 'bg-[#E0F7FA] dark:bg-cyan-900/30';
                          } else if (category.color === '#FF9800') { // Laranja
                            iconBgClass = isFailed ? '' : 'bg-[#FFF3E0] dark:bg-orange-900/30';
                          } else if (category.color === '#4CAF50') { // Verde
                            iconBgClass = isFailed ? '' : 'bg-[#E8F5E9] dark:bg-green-900/30';
                          } else if (category.color === '#E91E63') { // Rosa
                            iconBgClass = isFailed ? '' : 'bg-[#FCE4EC] dark:bg-pink-900/30';
                          }

                          // Definir gradientes dos botões
                          let buttonGradient = '';
                          if (category.color === '#FFD700') buttonGradient = 'linear-gradient(135deg, #FFE57F 0%, #FF9800 100%)';
                          else if (category.color === '#00BCD4') buttonGradient = 'linear-gradient(135deg, #4DD0E1 0%, #0288D1 100%)';
                          else if (category.color === '#FF9800') buttonGradient = 'linear-gradient(135deg, #FFB74D 0%, #E65100 100%)';
                          else if (category.color === '#4CAF50') buttonGradient = 'linear-gradient(135deg, #81C784 0%, #2E7D32 100%)';
                          else if (category.color === '#E91E63') buttonGradient = 'linear-gradient(135deg, #F48FB1 0%, #AD1457 100%)';

                          return (
                          <motion.div
                            key={compIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={categoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: compIndex * 0.08,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                            whileHover={{ 
                              y: -8,
                              scale: 1.02,
                              transition: { duration: 0.1 }
                            }}
                            className={`relative rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-100 overflow-hidden group cursor-pointer ${
                              isFailed 
                                ? 'bg-white dark:bg-gray-800 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]' 
                                : 'bg-white dark:bg-gray-800 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]'
                            }`}
                            onClick={() => 
                              isFailed 
                                ? handleShowBlockedModal(comp.title, category.name, category.color, comp.icon, category.icon)
                                : handleStartQuiz(comp.title, category.name, category.color, comp.icon, category.icon)
                            }
                          >
                            {/* Formas coloridas que descem no hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                              {/* Círculo grande */}
                              <motion.div
                                initial={{ y: -200, x: '20%' }}
                                whileHover={{ y: 100 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute w-[200px] h-[200px] rounded-full blur-3xl"
                                style={{ backgroundColor: `${category.color}20` }}
                              />
                            </div>

                            {/* Badge da Categoria - Topo */}
                            <div 
                              className="relative z-10 w-full px-5 py-3 rounded-t-[20px] transition-all duration-200 group-hover:brightness-110"
                              style={{ 
                                backgroundColor: isFailed 
                                  ? '#94A3B8'  // Cinza para bloqueado
                                  : category.color 
                              }}
                            >
                              <span className="text-white text-[11px] font-bold uppercase tracking-[1px] drop-shadow-sm">
                                {category.name}
                              </span>
                            </div>

                            {/* Corpo do Card */}
                            <div className="relative z-10 p-5 flex flex-col items-center gap-4">
                              {/* Ícone Central */}
                              <motion.div
                                whileHover={{ 
                                  rotate: isFailed ? 0 : [0, -10, 10, -10, 0],
                                  scale: isFailed ? 1 : 1.15,
                                }}
                                transition={{ 
                                  rotate: { duration: 0.4 },
                                  scale: { duration: 0.2 }
                                }}
                                className={`w-[80px] h-[80px] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-shadow duration-200 ${
                                  isFailed ? '' : 'group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]'
                                } ${iconBgClass}`}
                                style={isFailed ? { backgroundColor: '#E2E8F0' } : {}}
                              >
                                <comp.icon
                                  className={`w-[40px] h-[40px] ${isFailed ? 'opacity-40' : ''}`}
                                  style={{ color: isFailed ? '#94A3B8' : category.color }}
                                  strokeWidth={2}
                                />
                              </motion.div>

                              {/* Título da Competência */}
                              <h4 className={`text-[15px] font-semibold text-center leading-[1.3] min-h-[40px] px-1 ${
                                isFailed ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
                              }`}>
                                {comp.title}
                              </h4>

                              {/* Timer - Posição fixa acima do botão */}
                              <div className="w-full h-[28px] flex items-center justify-center">
                                {isInProgress && (
                                  <CompetencyTimer 
                                    competencyName={comp.title}
                                    mockTime={comp.title === 'Compartilhar e publicar' ? 1800 : undefined}
                                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                                    showIcon={true}
                                  />
                                )}
                              </div>

                              {/* Botão CONTINUAR ou INICIAR - Sempre na mesma posição */}
                              {isInProgress ? (
                                /* Botão CONTINUAR - Índigo */
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  transition={{ duration: 0.15 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartQuiz(comp.title, category.name, category.color, comp.icon, category.icon);
                                  }}
                                  className="w-full py-2.5 rounded-full text-white font-bold text-[13px] uppercase tracking-[0.8px] shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] transition-all duration-200 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                                >
                                  <span className="flex items-center justify-center gap-1.5">
                                    <PlayCircle className="w-4 h-4" />
                                    CONTINUAR
                                  </span>
                                </motion.button>
                              ) : (
                                /* Botão INICIAR */
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  transition={{ duration: 0.15 }}
                                  className={`w-full py-2.5 rounded-full font-bold text-[13px] uppercase tracking-[0.8px] transition-all duration-200 ${
                                    isFailed 
                                      ? 'text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] cursor-pointer' 
                                      : 'text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]'
                                  }`}
                                  style={{ 
                                    background: (() => {
                                      if (isFailed) {
                                        // Gradiente cinza para bloqueado
                                        return 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)';
                                      }
                                      return buttonGradient;
                                    })()
                                  }}
                                >
                                  <span className="flex items-center justify-center gap-1.5">
                                    {!isFailed && <PlayCircle className="w-4 h-4" />}
                                    {isFailed ? 'REFORÇO NECESSÁRIO' : 'INICIAR'}
                                  </span>
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                };

                return <CategorySection key={categoryIndex} />;
              })}
            </div>

            {/* No Results */}
            {filteredCategories.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhuma competência encontrada. Tente ajustar sua busca ou filtro.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-6 left-6 z-50 bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full shadow-2xl transition-all"
        title="Ir para o topo"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      {/* Warning Modal */}
      {showWarningModal && selectedCompetency && (
        <WarningModal
          onClose={() => setShowWarningModal(false)}
          onConfirm={handleConfirmWarning}
        />
      )}

      {/* Blocked Competency Modal */}
      {showBlockedModal && selectedCompetency && (
        <BlockedCompetencyModal
          isOpen={showBlockedModal}
          onClose={() => setShowBlockedModal(false)}
          onGoToContents={() => {
            setShowBlockedModal(false);
            navigateTo('conteudos');
          }}
          competency={selectedCompetency.competency}
          category={selectedCompetency.category}
          categoryColor={selectedCompetency.categoryColor}
          icon={selectedCompetency.competencyIcon}
        />
      )}
    </div>
  );
}

// Warning Modal Component
function WarningModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Aviso</h3>
        <p className="text-gray-600 mb-6">Você está prestes a iniciar o quiz. Deseja continuar?</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

// Blocked Competency Modal Component
function BlockedCompetencyModal({
  isOpen,
  onClose,
  onGoToContents,
  competency,
  category,
  categoryColor,
  icon: Icon,
}: {
  isOpen: boolean;
  onClose: () => void;
  onGoToContents: () => void;
  competency: string;
  category: string;
  categoryColor: string;
  icon: any;
}) {
  if (!isOpen) return null;

  // Obter dias restantes para desbloqueio
  const daysUntilUnblock = getDaysUntilUnblock(competency);

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30"
          >
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reforço Necessário</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          A competência <strong>{competency}</strong> precisa de reforço. Acesse os conteúdos relacionados antes de tentar novamente.
        </p>

        {/* Contador de dias */}
        {daysUntilUnblock > 0 && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Disponível em <span className="font-bold text-[#8B27FF] dark:text-[#A855F7]">{daysUntilUnblock} {daysUntilUnblock === 1 ? 'dia' : 'dias'}</span>
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-all"
          >
            Fechar
          </button>
          <button
            onClick={onGoToContents}
            className="flex-1 px-4 py-2 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
          >
            Ver Conteúdos
          </button>
        </div>
      </div>
    </div>
  );
}