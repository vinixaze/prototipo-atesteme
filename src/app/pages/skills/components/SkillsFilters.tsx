import { Search } from "lucide-react";

interface SkillsFiltersProps {
  selectedArea: string;
  onSelectedAreaChange: (value: string) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

export default function SkillsFilters({
  selectedArea,
  onSelectedAreaChange,
  searchTerm,
  onSearchTermChange,
}: SkillsFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Select */}
        <div className="w-full md:w-1/4">
          <select
            value={selectedArea}
            onChange={(e) => onSelectedAreaChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B27FF] focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 transition-all"
          >
            <option>Todas</option>
            <option>INFORMAÇÕES E DADOS</option>
            <option>COMUNICAÇÕES E COLABORAÇÕES</option>
            <option>CRIAÇÕES DE CONTEÚDO</option>
            <option>PROTEÇÕES E SEGURANÇA</option>
            <option>RESOLUÇÕES DE PROBLEMAS</option>
          </select>
        </div>

        {/* Search */}
        <div className="w-full md:w-3/4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Digite o nome da competência"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B27FF] focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
