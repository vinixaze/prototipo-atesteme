import { motion } from 'motion/react';
import { ContentCategory } from '../types';

interface EmptyStateProps {
  currentCategory?: ContentCategory;
}

export default function EmptyState({ currentCategory }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-16 text-center"
    >
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: `${currentCategory?.color}15` }}
      >
        {currentCategory?.icon && (
          <currentCategory.icon
            className="w-12 h-12"
            style={{ color: currentCategory.color }}
          />
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Nenhum conteúdo disponível
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Não há materiais para esta competência e nível no momento. Tente selecionar outra combinação.
      </p>
    </motion.div>
  );
}

