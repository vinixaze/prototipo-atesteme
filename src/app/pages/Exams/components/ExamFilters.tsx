import { Search, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface ExamFiltersProps {
  searchTerm: string;
  filterStatus: 'all' | 'Aprovado' | 'Reprovado' | 'Pendente';
  showFilterDropdown: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (status: 'all' | 'Aprovado' | 'Reprovado' | 'Pendente') => void;
  onToggleDropdown: () => void;
}

export default function ExamFilters({
  searchTerm,
  filterStatus,
  showFilterDropdown,
  onSearchChange,
  onFilterChange,
  onToggleDropdown,
}: ExamFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por nome ou tipo de exame..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-xl focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
          />
        </div>

        <div className="relative">
          <button
            onClick={onToggleDropdown}
            className="w-full sm:w-auto px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-[#8B27FF] dark:hover:border-[#A855F7] transition-colors flex items-center gap-2 bg-white dark:bg-gray-700 font-semibold text-gray-700 dark:text-gray-200"
          >
            <Filter className="w-5 h-5" />
            {filterStatus === 'all' ? 'Todos os Status' : filterStatus}
            <ChevronDown className="w-4 h-4" />
          </button>

          {showFilterDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-10"
            >
              {['all', 'Aprovado', 'Reprovado', 'Pendente'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onFilterChange(status as any);
                    onToggleDropdown();
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors ${
                    filterStatus === status ? 'bg-purple-50 dark:bg-purple-900/30 text-[#8B27FF] dark:text-[#A855F7] font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {status === 'all' ? 'Todos os Status' : status}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

