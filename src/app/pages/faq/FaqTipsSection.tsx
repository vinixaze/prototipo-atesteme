import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import type { TipCard } from '../../data/faq';

interface FaqTipsSectionProps {
  tips: TipCard[];
}

export function FaqTipsSection({ tips }: FaqTipsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Dicas Importantes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative group"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-full">
              <div className={`w-14 h-14 bg-gradient-to-br ${tip.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <tip.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2 text-lg">{tip.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tip.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
