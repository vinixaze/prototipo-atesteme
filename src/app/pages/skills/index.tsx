import React, { useState } from "react";
import Header from "../shared/components/Header";
import {
  isCompetencyBlocked,
} from "../../utils/competencyStorage";
import Sidebar from "../shared/components/Sidebar";
import { motion } from "motion/react";
import { categories, type Competency } from "./data";
import {
  ArrowUp,
  Award,
  Search,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PageId } from "../../../lib/navigation/routes";
import type { SelectedCompetency, SkillsPageProps } from "./types";
import CategorySection from "./components/CategorySection";
import SkillsBlockedCompetencyModal from "./components/SkillsBlockedCompetencyModal";
import SkillsWarningModal from "./components/SkillsWarningModal";

export default function SkillsPage({ navigateTo, userRole }: SkillsPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState<SelectedCompetency | null>(null);
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  const [showNocoes, setShowNocoes] = useState(true);
  const [selectedBlockedComp, setSelectedBlockedComp] = useState<Competency | null>(null);

  const handleCompetencyClick = (comp: Competency) => {
    if (isCompetencyBlocked(comp.title)) {
      setSelectedBlockedComp(comp);
      return;
    }
    navigateTo("quiz", { competency: comp.title });
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

  const handleNavigate = (page: PageId) => {
    if (page === "habilidades") return;
    navigateTo(page);
  };

  const handleStartQuiz = (
    competency: string,
    category: string,
    categoryColor: string,
    competencyIcon: LucideIcon,
    categoryIcon: LucideIcon
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
    if (selectedCompetency) {
      navigateTo("quiz", selectedCompetency);
    }
  };

  const handleShowBlockedModal = (
    competency: string,
    category: string,
    categoryColor: string,
    competencyIcon: LucideIcon,
    categoryIcon: LucideIcon
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
        <SkillsWarningModal onClose={() => setShowWarningModal(false)} onConfirm={handleConfirmWarning} />
      )}

      {/* Blocked Competency Modal */}
      {showBlockedModal && selectedCompetency && (
        <SkillsBlockedCompetencyModal
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
