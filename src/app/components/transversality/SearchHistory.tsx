import { motion } from "motion/react";
import { Clock, Eye } from "lucide-react";
import { HistoryItem, SelectedFilters } from "../../types/transversality";

interface SearchHistoryProps {
  searchHistory: HistoryItem[];
  onViewHistory: (filters: SelectedFilters) => void;
}

export default function SearchHistory({
  searchHistory,
  onViewHistory,
}: SearchHistoryProps) {
  return (
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
                  onClick={() => onViewHistory(item.filters)}
                  className="mt-3 text-sm font-semibold text-[#8B27FF] hover:text-[#6B1FBF] transition-colors"
                >
                  Buscar novamente →
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onViewHistory(item.filters)}
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
  );
}

