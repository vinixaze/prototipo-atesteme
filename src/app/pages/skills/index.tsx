import React, { useState } from "react";
import Header from "../shared/components/Header";
import {
  isCompetencyBlocked,
} from "../../utils/competencyStorage";
import Sidebar from "../shared/components/Sidebar";
import { categories, type Competency } from "./data";
import type { LucideIcon } from "lucide-react";
import type { PageId } from "../../../lib/navigation/routes";
import type { SelectedCompetency, SkillsPageProps } from "./types";
import CategorySection from "./components/CategorySection";
import SkillsBlockedCompetencyModal from "./components/SkillsBlockedCompetencyModal";
import SkillsWarningModal from "./components/SkillsWarningModal";
import SkillsHeaderSection from "./components/SkillsHeaderSection";
import SkillsFilters from "./components/SkillsFilters";
import SkillsEmptyState from "./components/SkillsEmptyState";
import ScrollToTopButton from "./components/ScrollToTopButton";

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

    // vocÃª jÃ¡ navega pro warning page (Ã³timo)
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
          userName="UsuÃ¡rio"
          navigateTo={navigateTo}
          onLogout={() => navigateTo("login")}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header + Card Nocoes Basicas */}
            <SkillsHeaderSection
              showNocoes={showNocoes}
              onCloseNocoes={() => setShowNocoes(false)}
              onStartNocoes={() => navigateTo("nocoes-basicas")}
            />

            {/* Search and Filter */}
            <SkillsFilters
              selectedArea={selectedArea}
              onSelectedAreaChange={setSelectedArea}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
            />

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
            {filteredCategories.length === 0 && <SkillsEmptyState />}
          </div>
        </main>
      </div>

      {/* Scroll to top button */}
      <ScrollToTopButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

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





