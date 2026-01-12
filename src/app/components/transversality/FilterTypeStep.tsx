import { motion } from "motion/react";
import { SelectedFilters, FilterOption } from "../../types/transversality";

interface FilterTypeStepProps {
  filterTypeOptions: FilterOption[];
  selectedFilters: SelectedFilters;
  onFilterSelect: (filterName: keyof SelectedFilters, value: any) => void;
  onNext: () => void;
}

export default function FilterTypeStep({
  filterTypeOptions,
  selectedFilters,
  onFilterSelect,
  onNext,
}: FilterTypeStepProps) {
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
              onFilterSelect("filterType", option.value as SelectedFilters["filterType"]);
              onNext();
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

