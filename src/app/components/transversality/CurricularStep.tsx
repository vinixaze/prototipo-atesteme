import { motion } from "motion/react";
import { SelectedFilters, FilterOption } from "../../types/transversality";

interface CurricularStepProps {
  selectedFilters: SelectedFilters;
  curricularOptions: FilterOption[];
  thematicOptions: FilterOption[];
  yearOptions: FilterOption[];
  onFilterSelect: (filterName: keyof SelectedFilters, value: any) => void;
  onYearSelect: (year: string) => void;
}

export default function CurricularStep({
  selectedFilters,
  curricularOptions,
  thematicOptions,
  yearOptions,
  onFilterSelect,
  onYearSelect,
}: CurricularStepProps) {
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
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Componente <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedFilters.component || ""}
            onChange={(e) => onFilterSelect("component", e.target.value)}
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

        {selectedFilters.component && (
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Temática <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedFilters.thematic || ""}
              onChange={(e) => onFilterSelect("thematic", e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
            >
              <option value="">Selecione...</option>
              {thematicOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} {option.count ? `(${option.count})` : ""}
                </option>
              ))}
            </select>
          </div>
        )}

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
                    onClick={() => onYearSelect(y.value)}
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

