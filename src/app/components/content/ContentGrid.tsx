import { motion } from 'motion/react';
import { Content } from '../../types/content';
import ContentCard from './ContentCard';

interface ContentGridProps {
  contents: Content[];
  categoryColor?: string;
}

export default function ContentGrid({ contents, categoryColor = '#8B27FF' }: ContentGridProps) {
  if (contents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-16 text-center"
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: `${categoryColor}15` }}
        >
          <span className="text-4xl">📚</span>
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((content, index) => (
        <ContentCard
          key={content.id}
          content={content}
          index={index}
          categoryColor={categoryColor}
        />
      ))}
    </div>
  );
}

