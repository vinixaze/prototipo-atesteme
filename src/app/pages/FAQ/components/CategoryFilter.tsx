import { Search } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: CategoryFilterProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Perguntas frequentes</h2>
        </div>

        <div className="flex-1">
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Busque por dúvidas"
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-3 pl-12 focus:ring-2 focus:ring-[#8B27FF] transition"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 md:px-6 py-3 rounded-xl font-medium text-sm md:text-base transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-500/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
