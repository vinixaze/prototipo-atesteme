import { motion } from 'motion/react';
import { ContentCategory } from '../../../types/content';

interface CategoryTabsProps {
  categories: ContentCategory[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-2 flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.name;

          return (
            <motion.button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 min-w-[120px] md:min-w-[160px] 
                flex flex-col md:flex-row 
                items-center justify-center 
                gap-1 md:gap-2 
                px-3 py-3 rounded-xl 
                transition-all font-semibold text-sm
                ${isActive
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              style={{
                backgroundColor: isActive ? category.color : 'transparent',
              }}
            >
              <Icon className="w-5 h-5 md:w-4 md:h-4" />
              <span className="text-[11px] leading-tight text-center md:text-sm">
                {category.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
