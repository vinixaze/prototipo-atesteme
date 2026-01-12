import { motion } from 'motion/react';
import { Filter, ChevronDown } from 'lucide-react';

interface ContentFiltersProps {
  selectedCompetency: string;
  selectedLevel: string;
  availableCompetencies: string[];
  onCompetencyChange: (competency: string) => void;
  onLevelChange: (level: string) => void;
}

export default function ContentFilters({
  selectedCompetency,
  selectedLevel,
  availableCompetencies,
  onCompetencyChange,
  onLevelChange,
}: ContentFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex flex-col md:flex-row gap-4"
    >
      <div className="flex-1">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />

          <span className="absolute left-10 right-10 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800 dark:text-gray-100 pointer-events-none truncate">
            {selectedCompetency ? selectedCompetency : 'Competências'}
          </span>

          <select
            value={selectedCompetency}
            onChange={(e) => onCompetencyChange(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] transition-all appearance-none cursor-pointer text-transparent"
          >
            <option value="" disabled hidden>
              Competências
            </option>
            {availableCompetencies.map((competency) => (
              <option key={competency} value={competency} className="text-gray-900">
                {competency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full md:w-48">
        <div className="relative">
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />

          <span className="absolute left-4 right-10 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800 dark:text-gray-100 pointer-events-none truncate">
            {selectedLevel ? `Nível ${selectedLevel}` : 'Níveis'}
          </span>

          <select
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            className="w-full px-4 pr-10 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] transition-all appearance-none cursor-pointer text-transparent"
          >
            <option value="" disabled hidden>
              Níveis
            </option>
            <option value="1" className="text-gray-900">Nível 1</option>
            <option value="2" className="text-gray-900">Nível 2</option>
            <option value="3" className="text-gray-900">Nível 3</option>
            <option value="4" className="text-gray-900">Nível 4</option>
            <option value="5" className="text-gray-900">Nível 5</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}

