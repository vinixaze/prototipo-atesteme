import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import { TipCard } from '../types';

interface TipsGridProps {
  tips: TipCard[];
}

export function TipsGrid({ tips }: TipsGridProps) {
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
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Dicas importantes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: tip.id * 0.04 }}
            className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm p-6"
          >
            <div
              className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br ${tip.gradient}`}
            >
              <tip.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{tip.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
