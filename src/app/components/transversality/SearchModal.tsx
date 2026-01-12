import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Search, X, ArrowRight } from "lucide-react";
import { SelectedFilters } from "../../types/transversality";
import FilterTypeStep from "./FilterTypeStep";
import CurricularStep from "./CurricularStep";
import BnccStep from "./BnccStep";
import {
  filterTypeOptions,
  curricularOptions,
  thematicOptionsByComponent,
  yearOptions,
  bnccTypeOptions,
  bnccCodeOptions,
} from "../../utils/transversality/constants";
import { isSearchEnabled, handleFilterSelect as handleFilterSelectHelper } from "../../utils/transversality/filterHelpers";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SelectedFilters) => void;
  selectedFilters: SelectedFilters;
  onSelectedFiltersChange: (filters: SelectedFilters) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSearch,
  selectedFilters,
  onSelectedFiltersChange,
}: SearchModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const bnccTypeRef = useRef<HTMLDivElement>(null);
  const codesRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setIsSearching(false);
    }
  }, [isOpen]);

  const totalSteps =
    selectedFilters.filterType === "bncc" ? 2 : selectedFilters.filterType === "curricular" ? 2 : 1;

  const stepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const filteredBnccCodes = bnccCodeOptions.filter((c) => {
    if (!selectedFilters.bnccType) return false;
    return c.bnccType === selectedFilters.bnccType;
  });

  useEffect(() => {
    if (currentStep === 2 && selectedFilters.filterType === "bncc" && selectedFilters.bnccType && codesRef.current) {
      setTimeout(() => codesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [currentStep, selectedFilters.filterType, selectedFilters.bnccType]);

  const handleFilterSelect = (filterName: keyof SelectedFilters, value: any) => {
    const newFilters = handleFilterSelectHelper(filterName, value, selectedFilters);
    onSelectedFiltersChange(newFilters);
  };

  const handleYearSelect = (year: string) => {
    onSelectedFiltersChange({ ...selectedFilters, year });
  };

  const canGoNext = () => {
    if (currentStep === 1) return !!selectedFilters.filterType;

    if (selectedFilters.filterType === "curricular") {
      return isSearchEnabled(selectedFilters);
    }

    if (currentStep === 2) return isSearchEnabled(selectedFilters);
    return false;
  };

  const primaryButtonLabel = () => {
    if (selectedFilters.filterType === "curricular") {
      return currentStep === 2 ? "Procurar Questão" : "Próximo";
    }
    return currentStep === totalSteps ? "Procurar Questão" : "Próximo";
  };

  const handlePrimary = () => {
    if (selectedFilters.filterType === "curricular") {
      if (currentStep === 1) return setCurrentStep(2);
      return handleSearch();
    }

    if (currentStep === 1) return setCurrentStep(2);
    return handleSearch();
  };

  const handleSearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      onSearch(selectedFilters);
    }, 650);
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <FilterTypeStep
          filterTypeOptions={filterTypeOptions}
          selectedFilters={selectedFilters}
          onFilterSelect={handleFilterSelect}
          onNext={() => setCurrentStep(2)}
        />
      );
    }

    if (currentStep === 2) {
      if (selectedFilters.filterType === "curricular") {
        const thematics = selectedFilters.component
          ? thematicOptionsByComponent[selectedFilters.component] || []
          : [];

        return (
          <CurricularStep
            selectedFilters={selectedFilters}
            curricularOptions={curricularOptions}
            thematicOptions={thematics}
            yearOptions={yearOptions}
            onFilterSelect={handleFilterSelect}
            onYearSelect={handleYearSelect}
          />
        );
      }

      return (
        <BnccStep
          selectedFilters={selectedFilters}
          bnccTypeOptions={bnccTypeOptions}
          filteredBnccCodes={filteredBnccCodes}
          onFilterSelect={handleFilterSelect}
          bnccTypeRef={bnccTypeRef}
          codesRef={codesRef}
        />
      );
    }

    return null;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
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
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

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

          <div
            ref={footerRef}
            className="shrink-0 bg-gray-50 dark:bg-gray-700/50 px-6 sm:px-8 py-5 border-t border-gray-200 dark:border-gray-700 pb-[calc(2.25rem+env(safe-area-inset-bottom))]"
          >
            <div className="grid grid-cols-[9.5rem_minmax(0,1fr)] gap-3 items-center">
              <button
                onClick={() => {
                  if (currentStep > 1) setCurrentStep((s) => s - 1);
                  else onClose();
                }}
                className="inline-flex items-center justify-center gap-2 w-[9.5rem] px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium whitespace-nowrap"
              >
                <ChevronLeft className="w-5 h-5" />
                {currentStep === 1 ? "Cancelar" : "Voltar"}
              </button>

              <button
                onClick={handlePrimary}
                disabled={!canGoNext() || isSearching}
                className={`w-full min-w-0 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all ${!canGoNext() || isSearching
                  ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
                  : "bg-[#8B27FF] text-white hover:bg-[#6B1FBF] shadow-lg shadow-purple-500/30"
                  }`}
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
                    <span className="leading-tight">{primaryButtonLabel()}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

