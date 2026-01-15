import { motion } from 'motion/react';
import { FileCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface ExamStatsCardsProps {
  stats: {
    total: number;
    aprovados: number;
    reprovados: number;
    pendentes: number;
  };
}

export default function ExamStatsCards({ stats }: ExamStatsCardsProps) {
  const statCards = [
    { label: 'TOTAL DE EXAMES', value: stats.total, icon: FileCheck, color: '#8B27FF', bgColor: 'bg-purple-50 dark:bg-purple-900/30', borderColor: 'border-purple-400 dark:border-purple-600' },
    { label: 'APROVADOS', value: stats.aprovados, icon: CheckCircle2, color: '#4CAF50', bgColor: 'bg-green-50 dark:bg-green-900/30', borderColor: 'border-green-400 dark:border-green-600' },
    { label: 'REPROVADOS', value: stats.reprovados, icon: XCircle, color: '#E91E63', bgColor: 'bg-pink-50 dark:bg-pink-900/30', borderColor: 'border-pink-400 dark:border-pink-600' },
    { label: 'PENDENTES', value: stats.pendentes, icon: Clock, color: '#FF9800', bgColor: 'bg-amber-50 dark:bg-amber-900/30', borderColor: 'border-amber-400 dark:border-amber-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center`}
          >
            <Icon
              className="w-8 h-8 mb-2"
              style={{ color: stat.color }}
              strokeWidth={2}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
              className="text-3xl font-bold mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </motion.div>
            <p className="text-xs font-bold tracking-wide" style={{ color: stat.color }}>
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

