import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Check,
  X,
  Clock,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";
import {
  bnccCodeOptions,
  bnccTypeOptions,
  curricularOptions,
  filterTypeOptions,
  thematicOptionsByComponent,
  yearOptions,
} from "./data";

interface TransversalityPageProps {
  navigateTo: (page: string, data?: any) => void;
  currentPage?: string;
  userName?: string;
  onLogout?: () => void;
}

interface SelectedFilters {
  filterType: '' | 'curricular' | 'bncc';

  // Curricular
  component?: string;
  thematic?: string;
  year?: string;

  // BNCC (novo fluxo)
  bnccType?: 'geral' | 'computacao';
  bnccCode?: string; // apenas 1 código
}



type HistoryItem = {
  date: Date;
  filters: SelectedFilters;
  label: string;
};

type BnccSingleSelectProps = {
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string; // selecionado (1)
  onChange: (next?: string) => void; // undefined = limpar
};

function BnccSingleSelect({
  label,
  placeholder = "Digite um código…",
  options,
  value,
  onChange,
}: BnccSingleSelectProps) {
  const [query, setQuery] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(value ?? "");
  }, [value]);

  const filtered = useMemo<{ value: string; label: string }[]>(() => {
    const q = query.trim().toLowerCase();
    const base = options;

    if (!q) return base.slice(0, 80);

    return base
      .filter(
        (o) =>
          o.value.toLowerCase().includes(q) ||
          o.label.toLowerCase().includes(q)
      )
      .slice(0, 80);
  }, [query, options]);


  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (code: string) => {
    onChange(code);      // ✅ só 1 (substitui)
    setOpen(false);
  };

  const clear = () => {
    onChange(undefined);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        {(query || value) && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center"
            aria-label="Limpar"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}

        {open && (
          <div className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
            {/* ✅ Scroll só aqui (não mexe no scroll do modal) */}
            <div
              className="max-h-64 overflow-y-auto overscroll-contain"
              onWheelCapture={(e) => e.stopPropagation()}
              onTouchMoveCapture={(e) => e.stopPropagation()}
            >
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Nenhum resultado
                </div>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => pick(opt.value)}
                    className={`w-full text-left px-4 py-3 transition-colors ${value === opt.value
                      ? "bg-[#8B27FF]/10"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                  >
                    <div className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                      {opt.label}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chip do selecionado */}
      {value && (
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B27FF]/10 text-[#8B27FF] border border-[#8B27FF]/20">
            <span className="text-xs font-bold font-mono">{value}</span>
            <button
              type="button"
              onClick={clear}
              className="p-0.5 hover:bg-[#8B27FF]/10 rounded-full"
              aria-label="Remover"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


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
      label: "Língua Portuguesa - Interpretação de texto (EF9)",
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

  const handleFilterSelect = (filterName: keyof SelectedFilters, value: any) => {
    setSelectedFilters((prev) => {
      const next: SelectedFilters = { ...prev, [filterName]: value };

      // trocou tipo de fluxo
      if (filterName === 'filterType') {
        return { filterType: value };
      }

      // CURRICULAR: ao trocar component limpa thematic/year
      if (filterName === 'component') {
        delete next.thematic;
        delete next.year;
      }
      if (filterName === 'thematic') {
        delete next.year;
      }

      // BNCC: ao trocar bnccType ou bnccComponent, limpa códigos
      if (filterName === "bnccType") {
        delete next.bnccCode; // limpa o código quando troca o tipo
      }

      return next;
    });

  };


  const handleYearSelect = (year: string) => {
    setSelectedFilters((prev) => ({ ...prev, year }));
  };

  // scroll suave quando escolhe bnccType e quando chega nos códigos
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

    const safeThematicLabel = thematicLabel?.trim() ? thematicLabel : "a temática selecionada";

    const categoryMap: Record<string, { category: string; color: string; competency: string }> = {
      portugues: {
        category: "Comunicação e Colaboração",
        color: "#00BCD4",
        competency: "Interagir por meio de tecnologias digitais",
      },
      matematica: {
        category: "Informações e Dados",
        color: "#FFC107",
        competency: "Navegar, pesquisar e filtrar dados",
      },
      ingles: {
        category: "Comunicação e Colaboração",
        color: "#00BCD4",
        competency: "Colaborar através de tecnologias digitais",
      },
      ciencias: {
        category: "Informações e Dados",
        color: "#FFC107",
        competency: "Avaliar dados e informações",
      },
      historia: {
        category: "Resolução de Problemas",
        color: "#E91E63",
        competency: "Identificar necessidades e respostas tecnológicas",
      },
      geografia: {
        category: "Informações e Dados",
        color: "#FFC107",
        competency: "Gerenciar dados e informações",
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
            text: `[${componentLabel}] ${safeThematicLabel}: Qual alternativa representa melhor essa competência?`,
            options: [
              { letter: "A", text: `Aplicar ${safeThematicLabel.toLowerCase()} apenas de forma teórica`, isCorrect: false },
              { letter: "B", text: `Integrar ${safeThematicLabel.toLowerCase()} com tecnologias digitais`, isCorrect: true },
              { letter: "C", text: "Ignorar metodologias digitais", isCorrect: false },
              { letter: "D", text: "Usar tecnologia sem intencionalidade pedagógica", isCorrect: false },
            ],
            explanation: "A alternativa correta demonstra o uso adequado da competência no contexto educacional.",
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
      fromPage: "transversalidade", // ✅ ADICIONE ISSO
      category: "Cultura Digital",
      categoryColor: "#8B27FF",
      competency: "Competências Gerais da BNCC",
      level: "Intermediário",
      totalQuestions: 1,
      questions: [
        {
          id: 1,
          text: `[${bnccTypeLabel} - ${filters.bnccCode ?? ""}] Considerando a habilidade BNCC selecionada, qual alternativa melhor demonstra a aplicação dessa competência?`,
          options: [
            { letter: "A", text: "Utilizar tecnologias digitais apenas para entretenimento" },
            { letter: "B", text: "Compreender e aplicar as tecnologias digitais de forma crítica, reflexiva e ética nas diversas práticas sociais" },
            { letter: "C", text: "Evitar o uso de tecnologias no processo de aprendizagem" },
            { letter: "D", text: "Usar tecnologias sem considerar aspectos éticos" },
            { letter: "E", text: "Limitar o uso de tecnologias apenas a atividades recreativas" },
          ],
          correctAnswer: "B",
          explanation:
            "Esta alternativa reflete adequadamente as competências gerais da BNCC relacionadas à cultura digital...",
          category: "Cultura Digital",
          categoryColor: "#8B27FF",
          competency: "Competências Gerais da BNCC",
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
      // step 2 já é o final
      return isSearchEnabled();
    }

    // BNCC
    if (currentStep === 2) return isSearchEnabled();
    return false;
  };

  const primaryButtonLabel = () => {
    if (selectedFilters.filterType === "curricular") {
      return currentStep === 2 ? "Procurar Questão" : "Próximo";
    }
    // BNCC
    return currentStep === totalSteps ? "Procurar Questão" : "Próximo";
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
                    ? "Selecione matéria, temática e ano"
                    : "Selecione tipo BNCC e código"}
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
                Selecione matéria, temática e ano
              </p>
            </div>

            <div className="space-y-4">
              {/* Matéria */}
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

              {/* Temática */}
              {selectedFilters.component && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Temática <span className="text-red-500">*</span>
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
              Selecione o tipo de habilidade e escolha um código BNCC
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

            {/* Código BNCC (input + lista filtrável + 1 seleção) */}
            {selectedFilters.bnccType && (
              <div className="pt-2" ref={codesRef}>
                <BnccSingleSelect
                  label="Código BNCC"
                  placeholder="Digite um código… (ex: EM13LP28)"
                  options={filteredBnccCodes.map((c) => ({ value: c.value, label: c.label }))}
                  value={selectedFilters.bnccCode}
                  onChange={(next) => handleFilterSelect("bnccCode", next)}
                />

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Escolha apenas 1 código para habilitar a busca.
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl text-[#8B27FF] mb-2">Transversalidade</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Encontre questões por componentes curriculares, temáticas e habilidades BNCC
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowModal(true);
                  resetModal();
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9D3FFF] text-white px-6 py-3 rounded-xl transition-all shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Buscar Desafios
              </motion.button>
            </div>

            {/* Modal com Steps */}
            <AnimatePresence>
              {showModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
                  onClick={() => setShowModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                  >
                    {/* Header do Modal */}
                    <div className="shrink-0 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] px-6 sm:px-8 py-5 flex items-center justify-between">
                      <div className="min-w-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 truncate">
                          Buscar Desafios de Transversalidade
                        </h2>
                        <div className="flex gap-2 items-center">
                          {stepsArray.map((step) => (
                            <div
                              key={step}
                              className={`h-2 rounded-full transition-all ${step === currentStep
                                ? "bg-white w-8"
                                : step < currentStep
                                  ? "bg-purple-300 w-6"
                                  : "bg-purple-200 w-4"
                                }`}
                            />
                          ))}
                        </div>
                        <p className="text-purple-100 text-sm mt-2">
                          Passo {currentStep} de {totalSteps}
                        </p>
                      </div>

                      <button
                        onClick={() => setShowModal(false)}
                        className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                        aria-label="Fechar"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          {renderStep()}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div
                      ref={footerRef}
                      className="shrink-0 bg-gray-50 dark:bg-gray-700/50 px-6 sm:px-8 py-5 border-t border-gray-200 dark:border-gray-700 pb-[calc(2.25rem+env(safe-area-inset-bottom))]"
                    >

                      <div className="grid grid-cols-[9.5rem_minmax(0,1fr)] gap-3 items-center">
                        {/* Botão esquerdo (largura fixa sempre) */}
                        <button
                          onClick={() => {
                            if (currentStep > 1) setCurrentStep((s) => s - 1);
                            else setShowModal(false);
                          }}
                          className="
      inline-flex items-center justify-center gap-2
      w-[9.5rem]
      px-4 py-3
      border-2 border-gray-300 dark:border-gray-600
      rounded-xl
      text-gray-700 dark:text-gray-200
      hover:bg-gray-100 dark:hover:bg-gray-700
      transition-colors font-medium
      whitespace-nowrap
    "
                        >
                          <ChevronLeft className="w-5 h-5" />
                          {currentStep === 1 ? "Cancelar" : "Voltar"}
                        </button>

                        {/* Botão direito (nunca corta, sempre cabe) */}
                        <button
                          onClick={handlePrimary}
                          disabled={!canGoNext() || isSearching}
                          className={`
                                w-full min-w-0
                                inline-flex items-center justify-center gap-2
                                px-4 sm:px-6 py-3
                                rounded-xl font-bold text-base sm:text-lg
                                transition-all
                                ${!canGoNext() || isSearching
                              ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
                              : "bg-[#8B27FF] text-white hover:bg-[#6B1FBF] shadow-lg shadow-purple-500/30"
                            }
                          `}
                        >
                          {isSearching ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <Search className="w-5 h-5" />
                              </motion.div>
                              Buscando...
                            </>
                          ) : (
                            <>
                              <Search className="w-5 h-5" />
                              <span className="leading-tight">Procurar Questão</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Histórico de Buscas */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Histórico de Buscas
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {searchHistory.map((item, idx) => (
                  <div
                    key={`${item.label}-${idx}`}
                    className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-start gap-2 text-gray-900 dark:text-white font-bold">
                          <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          <span className="whitespace-normal break-words leading-snug">
                            {item.label}
                          </span>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.date.toLocaleDateString("pt-BR")}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleViewHistory(item.filters)}
                          className="mt-3 text-sm font-semibold text-[#8B27FF] hover:text-[#6B1FBF] transition-colors"
                        >
                          Buscar novamente →
                        </button>
                      </div>

                      {/* ✅ Botão "Ver" (padrão roxo com borda, igual sua 2ª imagem) */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleViewHistory(item.filters)}
                        className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#8B27FF] text-[#8B27FF] bg-transparent hover:bg-[#8B27FF]/10 transition-colors font-bold"
                        aria-label="Ver questão"
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>

              {searchHistory.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhuma busca recente ainda.
                  </p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}




