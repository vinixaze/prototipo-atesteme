import React, { useRef, useState } from "react";
import Header from "../shared/components/Header";
import {
  getCompetencyStatus,
  getDaysUntilUnblock,
  isCompetencyBlocked,
} from "../../utils/competencyStorage";
import BlockCompetencyModal from "./components/BlockedCompetencyModal";
import Sidebar from "../shared/components/Sidebar";
import { CompetencyTimer } from "../shared/components/CompetencyTimer";
import { motion, useInView } from "motion/react";
import { categories } from "./data";
import {
  AlertTriangle,
  ArrowUp,
  Award,
  Lock,
  PlayCircle,
  Search,
  X,
} from "lucide-react";

interface SkillsPageProps {
  navigateTo: (page: string, data?: any) => void;
  userRole?: "admin" | "user";
}

export default function SkillsPage({ navigateTo, userRole }: SkillsPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState<any>(null);
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  const [showNocoes, setShowNocoes] = useState(true);
  const [selectedBlockedComp, setSelectedBlockedComp] = useState<any>(null);

  const handleCompetencyClick = (comp: any) => {
    if (isCompetencyBlocked(comp.name)) {
      setSelectedBlockedComp(comp);
      return;
    }
    navigateTo("quiz", { competency: comp });
  };

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      competencias: category.competencias.filter((comp) =>
        comp.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => {
      if (selectedArea === "Todas") return category.competencias.length > 0;
      return category.name === selectedArea && category.competencias.length > 0;
    });

  const handleNavigate = (page: string) => {
    if (page === "habilidades") return;
    navigateTo(page);
  };

  const handleStartQuiz = (
    competency: string,
    category: string,
    categoryColor: string,
    competencyIcon: any,
    categoryIcon: any
  ) => {
    setSelectedCompetency({ competency, category, categoryColor, competencyIcon, categoryIcon });

    // você já navega pro warning page (ótimo)
    navigateTo("quiz-warning", {
      competency,
      category,
      categoryColor,
      competencyIcon,
      categoryIcon,
      fromPage: "habilidades",
    });
  };

  const handleConfirmWarning = () => {
    setShowWarningModal(false);
    navigateTo("quiz", selectedCompetency);
  };

  const handleShowBlockedModal = (
    competency: string,
    category: string,
    categoryColor: string,
    competencyIcon: any,
    categoryIcon: any
  ) => {
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
        isAdmin={userRole === "admin"}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userName="Usuário"
          navigateTo={navigateTo}
          onLogout={() => navigateTo("login")}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header + Card Noções Básicas */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start">
              {/* ESQUERDA - TÍTULO */}
              <div className="w-full lg:w-[70%]">
                <h1 className="text-3xl md:text-4xl font-semibold text-[#8B27FF] mb-2">
                  Competências Digitais
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  Desenvolva suas competências nos eixos da BNCC Computação/Letramento Digital
                </p>
              </div>

              {/* Noções Básicas panel (desktop only, closable) */}
              {showNocoes && (
                <div className="hidden lg:block w-full lg:w-[50%] relative">
                  <div className="bg-[#F3E8FF]/60 dark:bg-gray-800/60 backdrop-blur-md border border-purple-200 dark:border-gray-700/40 rounded-2xl p-6 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setShowNocoes(false)}
                      className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <X className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                    </button>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#F3E8FF] flex items-center justify-center">
                        <Award className="w-6 h-6 text-[#8B27FF]" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          Noções Básicas
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Conteúdo muito recomendado antes do Nível 01
                        </p>

                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() => navigateTo("nocoes-basicas")}
                            className="px-4 py-2 rounded-xl bg-[#8B27FF] text-white hover:bg-[#7B1FE8] transition-all"
                          >
                            Começar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Select */}
                <div className="w-full md:w-1/4">
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

                {/* Search */}
                <div className="w-full md:w-3/4 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Digite o nome da competência"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B27FF] focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Categories and Skills */}
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => (
                <CategorySection
                  key={category.name}
                  category={category}
                  categoryIndex={categoryIndex}
                  onStartQuiz={handleStartQuiz}
                  onShowBlocked={handleShowBlockedModal}
                />
              ))}
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
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-50 bg-gray-500 hover:bg-gray-600 text-white p-3 md:p-4 rounded-full shadow-2xl transition-all"
        title="Ir para o topo"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      {/* Warning Modal (opcional, mantido) */}
      {showWarningModal && selectedCompetency && (
        <WarningModal onClose={() => setShowWarningModal(false)} onConfirm={handleConfirmWarning} />
      )}

      {/* Blocked Competency Modal */}
      {showBlockedModal && selectedCompetency && (
        <BlockedCompetencyModal
          isOpen={showBlockedModal}
          onClose={() => setShowBlockedModal(false)}
          onGoToContents={() => {
            const payload = {
              from: "habilidades",
              competency: selectedCompetency.competency,
              category: selectedCompetency.category,
              categoryColor: selectedCompetency.categoryColor,
              competencyIcon: selectedCompetency.competencyIcon,
              categoryIcon: selectedCompetency.categoryIcon,
            };

            setShowBlockedModal(false);

            requestAnimationFrame(() => {
              navigateTo("conteudos", payload);
            });
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

/** Obs. Componente fora do map (evita hook dentro de loop e bugs aleatórios) */
function CategorySection({
  category,
  categoryIndex,
  onStartQuiz,
  onShowBlocked,
}: {
  category: Category;
  categoryIndex: number;
  onStartQuiz: (
    competency: string,
    category: string,
    categoryColor: string,
    competencyIcon: any,
    categoryIcon: any
  ) => void;
  onShowBlocked: (
    competency: string,
    category: string,
    categoryColor: string,
    competencyIcon: any,
    categoryIcon: any
  ) => void;
}) {
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const categoryInView = useInView(categoryRef, { once: true, amount: 0.2 });

  return (
    <div ref={categoryRef}>
      {/* Category Header */}
      <div className="flex items-center gap-3 p-4 rounded-xl mb-6 bg-white dark:bg-gray-800">
        <category.icon className="w-6 h-6" style={{ color: category.color }} strokeWidth={1.5} />
        <h2 className="text-lg font-bold" style={{ color: category.color }}>
          {category.name}
        </h2>
      </div>

      {/* Competency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {category.competencias.map((comp, compIndex) => {
          const status = getCompetencyStatus(comp.title);

          // Obs. BLOQUEADO DE VERDADE: se ainda tem tempo pra desbloquear
          const daysUntilUnblock = getDaysUntilUnblock(comp.title);
          const isBlocked = daysUntilUnblock > 0;

          const isCompleted = status?.status === "completed";
          const isAttempted = status?.status === "attempted";

          // Mock: manter seu teste
          const isInProgress = status?.status === "in-progress" || comp.title === "Compartilhar e publicar";

          // Background do ícone (respeitando bloqueado)
          let iconBgClass = "";
          if (!isBlocked) {
            if (category.color === "#FFD700") iconBgClass = "bg-[#FFF9E6] dark:bg-yellow-900/30";
            else if (category.color === "#00BCD4") iconBgClass = "bg-[#E0F7FA] dark:bg-cyan-900/30";
            else if (category.color === "#FF9800") iconBgClass = "bg-[#FFF3E0] dark:bg-orange-900/30";
            else if (category.color === "#4CAF50") iconBgClass = "bg-[#E8F5E9] dark:bg-green-900/30";
            else if (category.color === "#E91E63") iconBgClass = "bg-[#FCE4EC] dark:bg-pink-900/30";
          }

          // Gradiente do botão (respeitando bloqueado)
          let buttonGradient = "";
          if (category.color === "#FFD700") buttonGradient = "linear-gradient(135deg, #FFE57F 0%, #FF9800 100%)";
          else if (category.color === "#00BCD4") buttonGradient = "linear-gradient(135deg, #4DD0E1 0%, #0288D1 100%)";
          else if (category.color === "#FF9800") buttonGradient = "linear-gradient(135deg, #FFB74D 0%, #E65100 100%)";
          else if (category.color === "#4CAF50") buttonGradient = "linear-gradient(135deg, #81C784 0%, #2E7D32 100%)";
          else if (category.color === "#E91E63") buttonGradient = "linear-gradient(135deg, #F48FB1 0%, #AD1457 100%)";

          return (
            <motion.div
              key={`${categoryIndex}-${compIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={categoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: compIndex * 0.08, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.1 } }}
              className="relative rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-100 overflow-hidden group cursor-pointer bg-white dark:bg-gray-800 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              onClick={() =>
                isBlocked
                  ? onShowBlocked(comp.title, category.name, category.color, comp.icon, category.icon)
                  : onStartQuiz(comp.title, category.name, category.color, comp.icon, category.icon)
              }
            >
              {/* hover blob */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                <motion.div
                  initial={{ y: -200, x: "20%" }}
                  whileHover={{ y: 100 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-[200px] h-[200px] rounded-full blur-3xl"
                  style={{ backgroundColor: `${category.color}20` }}
                />
              </div>

              {/* Badge da Categoria */}
              <div
                className="relative z-10 w-full px-5 py-3 rounded-t-[20px] transition-all duration-200 group-hover:brightness-110"
                style={{ backgroundColor: isBlocked ? "#94A3B8" : category.color }}
              >
                <span className="text-white text-[11px] font-bold uppercase tracking-[1px] drop-shadow-sm">
                  {category.name}
                </span>
              </div>

              {/* Body */}
              <div className="relative z-10 p-5 flex flex-col items-center gap-4">
                {/* Ícone */}
                <motion.div
                  whileHover={{
                    rotate: isBlocked ? 0 : [0, -10, 10, -10, 0],
                    scale: isBlocked ? 1 : 1.15,
                  }}
                  transition={{ rotate: { duration: 0.4 }, scale: { duration: 0.2 } }}
                  className={`w-[80px] h-[80px] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-shadow duration-200 ${
                    isBlocked ? "" : "group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
                  } ${iconBgClass}`}
                  style={isBlocked ? { backgroundColor: "#E2E8F0" } : {}}
                >
                  <comp.icon
                    className={`w-[40px] h-[40px] ${isBlocked ? "opacity-40" : ""}`}
                    style={{ color: isBlocked ? "#94A3B8" : category.color }}
                    strokeWidth={2}
                  />
                </motion.div>

                {/* Título */}
                <h4
                  className={`text-[15px] font-semibold text-center leading-[1.3] min-h-[40px] px-1 ${
                    isBlocked ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {comp.title}
                </h4>

                {/* Timer */}
                <div className="w-full h-[28px] flex items-center justify-center">
                  {isInProgress && (
                    <CompetencyTimer
                      competencyName={comp.title}
                      mockTime={comp.title === "Compartilhar e publicar" ? 1800 : undefined}
                      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                      showIcon={true}
                    />
                  )}
                </div>

                {/* Botão */}
                {isInProgress ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isBlocked) {
                        onShowBlocked(comp.title, category.name, category.color, comp.icon, category.icon);
                        return;
                      }
                      onStartQuiz(comp.title, category.name, category.color, comp.icon, category.icon);
                    }}
                    className="w-full py-2.5 rounded-full text-white font-bold text-[13px] uppercase tracking-[0.8px] shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] transition-all duration-200 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <PlayCircle className="w-4 h-4" />
                      CONTINUAR
                    </span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="w-full py-2.5 rounded-full font-bold text-[13px] uppercase tracking-[0.8px] transition-all duration-200 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
                    style={{
                      background: isBlocked
                        ? "linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)"
                        : buttonGradient,
                    }}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {!isBlocked && <PlayCircle className="w-4 h-4" />}
                      {isBlocked ? "REFORÇO NECESSÁRIO" : "INICIAR"}
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

  const daysUntilUnblock = getDaysUntilUnblock(competency);

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reforço Necessário</h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          A competência <strong>{competency}</strong> precisa de reforço. Acesse os conteúdos relacionados antes
          de tentar novamente.
        </p>

        {daysUntilUnblock > 0 && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Disponível em{" "}
                <span className="font-bold text-[#8B27FF] dark:text-[#A855F7]">
                  {daysUntilUnblock} {daysUntilUnblock === 1 ? "dia" : "dias"}
                </span>
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

