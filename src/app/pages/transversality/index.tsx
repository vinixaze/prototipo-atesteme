import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import Header from "../shared/components/Header";
import BnccSingleSelect from "./components/BnccSingleSelect";
import TransversalityHeader from "./components/TransversalityHeader";
import TransversalitySearchModal from "./components/TransversalitySearchModal";
import TransversalityHistorySection from "./components/TransversalityHistorySection";
import Sidebar from "../shared/components/Sidebar";
import {
  bnccCodeOptions,
  bnccTypeOptions,
  curricularOptions,
  filterTypeOptions,
  thematicOptionsByComponent,
  yearOptions,
} from "./data";
import type { HistoryItem, SelectedFilters, TransversalityPageProps } from "./types";

export default function TransversalityPage({
  navigateTo,
  currentPage,
  userName,
  onLogout,
}: TransversalityPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([
    {
      date: new Date(Date.now() - 86400000),
      filters: { filterType: "curricular", component: "portugues", thematic: "interpretacao-texto", year: "EF9" },
      label: "­ Língua Portuguesa - Interpretação de texto (EF9)",
    },
    {
      date: new Date(Date.now() - 172800000),
      filters: { filterType: "bncc", bnccType: "geral", bnccCode: "EM13LP28" },
      label: "BNCC Geral - EM13LP28",
    },
    {
      date: new Date(Date.now() - 259200000),
      filters: { filterType: "curricular", component: "matematica", thematic: "algebra", year: "EF8" },
      label: "Matemática - Álgebra (EF8)",
    },
    {
      date: new Date(Date.now() - 345600000),
      filters: { filterType: "curricular", component: "ciencias", thematic: "materia-energia", year: "EF7" },
      label: "Ciências - Matéria e energia (EF7)",
    },
    {
      date: new Date(Date.now() - 432000000),
      filters: { filterType: "bncc", bnccType: "computacao", bnccCode: "EF06CO01" },
      label: "BNCC Computação - EF06CO01",
    },
    {
      date: new Date(Date.now() - 518400000),
      filters: { filterType: "curricular", component: "historia", thematic: "brasil-colonia", year: "EF8" },
      label: "História - Brasil Colônia (EF8)",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);


  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    filterType: "",
  });

  const [isSearching, setIsSearching] = useState(false);

  // refs (scroll suave quando completa campos)
  const bnccTypeRef = useRef<HTMLDivElement>(null);
  const codesRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const totalSteps =
    selectedFilters.filterType === "bncc" ? 2 : selectedFilters.filterType === "curricular" ? 2 : 1;


  const filteredBnccCodes = bnccCodeOptions.filter((c) => {
    if (!selectedFilters.bnccType) return false;
    return c.bnccType === selectedFilters.bnccType;
  });

  // ====== Helpers ======
  const resetModal = () => {
    setCurrentStep(1);
    setSelectedFilters({ filterType: "" });
    setIsSearching(false);
  };

  const handleFilterSelect = (filterName: keyof SelectedFilters, value: string | undefined) => {
    setSelectedFilters((prev) => {
      const next: SelectedFilters = { ...prev, [filterName]: value };

      // trocou tipo de fluxo
      if (filterName === 'filterType') {
        const nextType: SelectedFilters["filterType"] =
          value === "curricular" || value === "bncc" ? value : "";
        return { filterType: nextType };
      }

      // CURRICULAR: ao trocar component limpa thematic/year
      if (filterName === 'component') {
        delete next.thematic;
        delete next.year;
      }
      if (filterName === 'thematic') {
        delete next.year;
      }

      // BNCC: ao trocar bnccType ou bnccComponent, limpa cÃ³digos
      if (filterName === "bnccType") {
        delete next.bnccCode; // limpa o cÃ³digo quando troca o tipo
      }

      return next;
    });

  };


  const handleYearSelect = (year: string) => {
    setSelectedFilters((prev) => ({ ...prev, year }));
  };

  // scroll suave quando escolhe bnccType e quando chega nos cÃ³digos
  useEffect(() => {
    if (selectedFilters.filterType === "bncc" && selectedFilters.bnccType && bnccTypeRef.current) {
      setTimeout(() => bnccTypeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    }
  }, [selectedFilters.bnccType, selectedFilters.filterType]);

  useEffect(() => {
    if (currentStep === 2 && selectedFilters.filterType === "bncc" && selectedFilters.bnccType && codesRef.current) {
      setTimeout(() => codesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [currentStep, selectedFilters.filterType, selectedFilters.bnccType]);


  const getSearchLabel = () => {
    if (selectedFilters.filterType === "curricular" && selectedFilters.component) {
      const comp = curricularOptions.find((o) => o.value === selectedFilters.component)?.label ?? "Busca";
      const them = selectedFilters.component && selectedFilters.thematic
        ? thematicOptionsByComponent[selectedFilters.component]?.find((o) => o.value === selectedFilters.thematic)?.label
        : "";
      const yr = selectedFilters.year ? ` (${selectedFilters.year})` : "";
      return them ? `${comp} - ${them}${yr}` : `${comp}${yr}`;
    }

    if (selectedFilters.filterType === "bncc" && selectedFilters.bnccType) {
      const typeLabel = bnccTypeOptions.find((o) => o.value === selectedFilters.bnccType)?.label ?? "BNCC";
      return selectedFilters.bnccCode
        ? `${typeLabel} - ${selectedFilters.bnccCode}`
        : typeLabel;
    }

    return "Nova busca";
  };

  const isSearchEnabled = () => {
    if (selectedFilters.filterType === "curricular") {
      return !!(selectedFilters.component && selectedFilters.thematic && selectedFilters.year);
    }
    if (selectedFilters.filterType === "bncc") {
      return !!(selectedFilters.bnccType && selectedFilters.bnccCode);
    }
    return false;
  };

  const createQuestionFromFilters = (filters: SelectedFilters = selectedFilters) => {
    // Labels para curricular
    const componentLabel =
      curricularOptions.find((o) => o.value === filters.component)?.label || "";

    const thematicLabel =
      filters.component && filters.thematic
        ? thematicOptionsByComponent[filters.component]?.find((o) => o.value === filters.thematic)?.label
        : undefined;

    const safeThematicLabel = thematicLabel?.trim() ? thematicLabel : "a temÃ¡tica selecionada";

    const categoryMap: Record<string, { category: string; color: string; competency: string }> = {
      portugues: {
        category: "ComunicaÃ§Ã£o e ColaboraÃ§Ã£o",
        color: "#00BCD4",
        competency: "Interagir por meio de tecnologias digitais",
      },
      matematica: {
        category: "InformaÃ§Ãµes e Dados",
        color: "#FFC107",
        competency: "Navegar, pesquisar e filtrar dados",
      },
      ingles: {
        category: "ComunicaÃ§Ã£o e ColaboraÃ§Ã£o",
        color: "#00BCD4",
        competency: "Colaborar atravÃ©s de tecnologias digitais",
      },
      ciencias: {
        category: "InformaÃ§Ãµes e Dados",
        color: "#FFC107",
        competency: "Avaliar dados e informaÃ§Ãµes",
      },
      historia: {
        category: "ResoluÃ§Ã£o de Problemas",
        color: "#E91E63",
        competency: "Identificar necessidades e respostas tecnolÃ³gicas",
      },
      geografia: {
        category: "InformaÃ§Ãµes e Dados",
        color: "#FFC107",
        competency: "Gerenciar dados e informaÃ§Ãµes",
      },
    };

    const categoryInfo = categoryMap[filters.component || "portugues"] || categoryMap.portugues;

    if (filters.filterType === "curricular") {
      return {
        fromPage: "transversalidade",
        category: categoryInfo.category,
        categoryColor: categoryInfo.color,
        competency: categoryInfo.competency,
        questions: [
          {
            id: 1,
            text: `[${componentLabel}] ${safeThematicLabel}: Qual alternativa representa melhor essa competÃªncia?`,
            options: [
              { letter: "A", text: `Aplicar ${safeThematicLabel.toLowerCase()} apenas de forma teÃ³rica`, isCorrect: false },
              { letter: "B", text: `Integrar ${safeThematicLabel.toLowerCase()} com tecnologias digitais`, isCorrect: true },
              { letter: "C", text: "Ignorar metodologias digitais", isCorrect: false },
              { letter: "D", text: "Usar tecnologia sem intencionalidade pedagÃ³gica", isCorrect: false },
            ],
            explanation: "A alternativa correta demonstra o uso adequado da competÃªncia no contexto educacional.",
            transversality: {
              component: componentLabel,
              thematic: safeThematicLabel,
              year: filters.year,
            },
          },
        ],
      };
    }

    // BNCC
    const bnccTypeLabel = bnccTypeOptions.find((o) => o.value === filters.bnccType)?.label || "";
    const selectedCode = filters.bnccCode || "";

    return {
      fromPage: "transversalidade", // âœ… ADICIONE ISSO
      category: "Cultura Digital",
      categoryColor: "#8B27FF",
      competency: "CompetÃªncias Gerais da BNCC",
      level: "IntermediÃ¡rio",
      totalQuestions: 1,
      questions: [
        {
          id: 1,
          text: `[${bnccTypeLabel} - ${filters.bnccCode ?? ""}] Considerando a habilidade BNCC selecionada, qual alternativa melhor demonstra a aplicaÃ§Ã£o dessa competÃªncia?`,
          options: [
            { letter: "A", text: "Utilizar tecnologias digitais apenas para entretenimento" },
            { letter: "B", text: "Compreender e aplicar as tecnologias digitais de forma crÃ­tica, reflexiva e Ã©tica nas diversas prÃ¡ticas sociais" },
            { letter: "C", text: "Evitar o uso de tecnologias no processo de aprendizagem" },
            { letter: "D", text: "Usar tecnologias sem considerar aspectos Ã©ticos" },
            { letter: "E", text: "Limitar o uso de tecnologias apenas a atividades recreativas" },
          ],
          correctAnswer: "B",
          explanation:
            "Esta alternativa reflete adequadamente as competÃªncias gerais da BNCC relacionadas Ã  cultura digital...",
          category: "Cultura Digital",
          categoryColor: "#8B27FF",
          competency: "CompetÃªncias Gerais da BNCC",
          transversality: {
            bnccType: bnccTypeLabel,
            bnccCode: filters.bnccCode,
          },
        },
      ],

    };

  };

  const handleViewHistory = (filters: SelectedFilters) => {
    const questionData = createQuestionFromFilters(filters);
    navigateTo("quiz", questionData);
  };

  const handleSearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);

      const newHistory: HistoryItem = {
        date: new Date(),
        filters: { ...selectedFilters },
        label: getSearchLabel(),
      };

      setSearchHistory([newHistory, ...searchHistory.slice(0, 4)]);

      const questionData = createQuestionFromFilters();
      setShowModal(false);
      navigateTo("quiz", questionData);
    }, 650);
  };

  // ====== UI Steps ======
  const stepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const canGoNext = () => {
    if (currentStep === 1) return !!selectedFilters.filterType;

    if (selectedFilters.filterType === "curricular") {
      // step 2 jÃ¡ Ã© o final
      return isSearchEnabled();
    }

    // BNCC
    if (currentStep === 2) return isSearchEnabled();
    return false;
  };

  const primaryButtonLabel = () => {
    if (selectedFilters.filterType === "curricular") {
      return currentStep === 2 ? "Procurar QuestÃ£o" : "PrÃ³ximo";
    }
    // BNCC
    return currentStep === totalSteps ? "Procurar QuestÃ£o" : "PrÃ³ximo";
  };

  const handlePrimary = () => {
    if (selectedFilters.filterType === "curricular") {
      if (currentStep === 1) return setCurrentStep(2);
      return handleSearch();
    }

    // BNCC
    if (currentStep === 1) return setCurrentStep(2);
    return handleSearch();

  };

  const renderStep = () => {
    // STEP 1: Tipo
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Selecione o Tipo de Filtro
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Escolha como deseja buscar os desafios de transversalidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterTypeOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  handleFilterSelect("filterType", option.value as SelectedFilters["filterType"]);
                  setCurrentStep(2);
                }}
                className={`p-8 rounded-2xl border-2 transition-all text-left ${selectedFilters.filterType === option.value
                  ? "border-[#8B27FF] bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-[#8B27FF] bg-white dark:bg-gray-800"
                  }`}
              >
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {option.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.value === "curricular"
                    ? "Selecione matÃ©ria, temÃ¡tica e ano"
                    : "Selecione tipo BNCC e cÃ³digo"}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      );
    }

    // STEP 2: Curricular OU BNCC
    if (currentStep === 2) {
      if (selectedFilters.filterType === "curricular") {
        const thematics = selectedFilters.component
          ? thematicOptionsByComponent[selectedFilters.component] || []
          : [];

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Filtros do Componente Curricular
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Selecione matÃ©ria, temÃ¡tica e ano
              </p>
            </div>

            <div className="space-y-4">
              {/* MatÃ©ria */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Componente <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedFilters.component || ""}
                  onChange={(e) => handleFilterSelect("component", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  {curricularOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} {option.count ? `(${option.count})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* TemÃ¡tica */}
              {selectedFilters.component && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    TemÃ¡tica <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedFilters.thematic || ""}
                    onChange={(e) => handleFilterSelect("thematic", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                  >
                    <option value="">Selecione...</option>
                    {thematics.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} {option.count ? `(${option.count})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Ano */}
              {selectedFilters.thematic && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Ano <span className="text-red-500">*</span>
                  </label>

                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#F9F7FF] dark:bg-gray-800 border-2 border-[#E8E0FF] dark:border-gray-700 rounded-2xl p-4 sm:p-6"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {yearOptions.map((y) => (
                        <button
                          key={y.value}
                          onClick={() => handleYearSelect(y.value)}
                          className={`h-14 rounded-xl font-bold transition-all duration-200 ${selectedFilters.year === y.value
                            ? "bg-[#8B27FF] text-white shadow-lg shadow-purple-500/30"
                            : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-[#8B27FF]"
                            }`}
                        >
                          {y.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        );
      }

      // BNCC (tudo no Step 2)
      return (
        <div className="space-y-6" ref={bnccTypeRef}>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Filtros BNCC
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Selecione o tipo de habilidade e escolha um cÃ³digo BNCC
            </p>
          </div>

          <div className="space-y-4">
            {/* Tipo BNCC */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Tipo de Habilidade BNCC <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedFilters.bnccType || ""}
                onChange={(e) => handleFilterSelect("bnccType", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
              >
                <option value="">Selecione...</option>
                {bnccTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} {option.count ? `(${option.count})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* CÃ³digo BNCC (input + lista filtrÃ¡vel + 1 seleÃ§Ã£o) */}
            {selectedFilters.bnccType && (
              <div className="pt-2" ref={codesRef}>
                <BnccSingleSelect
                  label="CÃ³digo BNCC"
                  placeholder="Digite um cÃ³digoâ€¦ (ex: EM13LP28)"
                  options={filteredBnccCodes.map((c) => ({ value: c.value, label: c.label }))}
                  value={selectedFilters.bnccCode}
                  onChange={(next) => handleFilterSelect("bnccCode", next)}
                />

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Escolha apenas 1 cÃ³digo para habilitar a busca.
                </p>
              </div>
            )}

          </div>
        </div>
      );
    }

    // fallback (evita retornar undefined em qualquer caso)
    return null;
  };
  // ====== Layout ======
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage="transversalidade"
        onNavigate={navigateTo}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userName={userName || "Professor"}
          navigateTo={navigateTo}
          onLogout={() => navigateTo("login")}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <TransversalityHeader
              onOpenModal={() => {
                setShowModal(true);
                resetModal();
              }}
            />

            {/* Modal com Steps */}
            <TransversalitySearchModal
              isOpen={showModal}
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepsArray={stepsArray}
              isSearching={isSearching}
              canGoNext={canGoNext()}
              footerRef={footerRef}
              onClose={() => setShowModal(false)}
              onBack={() => {
                if (currentStep > 1) setCurrentStep((s) => s - 1);
                else setShowModal(false);
              }}
              onPrimary={handlePrimary}
              renderStep={renderStep}
            />

            <TransversalityHistorySection
              searchHistory={searchHistory}
              onViewHistory={handleViewHistory}
            />

          </div>
        </main>
      </div>
    </div>
  );
}












