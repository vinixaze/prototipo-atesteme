import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';

interface FaqCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FaqCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: FaqCategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Perguntas Frequentes</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 md:px-6 py-3 rounded-xl font-medium transition-all text-sm md:text-base ${selectedCategory === category
                ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-500/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
