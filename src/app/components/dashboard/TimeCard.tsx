import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import CountUp from './CountUp';
import type { ModuleColors } from './types';

interface TimeCardProps {
  colors: ModuleColors;
  onManage: () => void;
}

export default function TimeCard({ colors, onManage }: TimeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${colors.icon} rounded-full flex items-center justify-center`}>
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-[#333] dark:text-gray-200">Tempo</h3>
        </div>
        <button
          onClick={onManage}
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Gerenciar
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Total</span>
          <span className="text-lg font-bold text-[#9333EA] dark:text-purple-400">
            <CountUp end={2} suffix="d " />
            <CountUp end={16} suffix="h" />
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Diário</span>
          <span className="text-lg font-bold text-[#9333EA] dark:text-purple-400">
            <CountUp end={3} suffix="h " />
            <CountUp end={12} suffix="m" />
          </span>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] dark:from-purple-900/40 dark:to-purple-800/40 rounded-xl">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Desafios</span>
          <span className="text-lg font-bold text-[#7B1FA2] dark:text-purple-300">
            <CountUp end={3} suffix="h " />
            <CountUp end={22} suffix="m" />
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Exames</span>
          <span className="text-lg font-bold text-[#3949AB] dark:text-indigo-300">
            <CountUp end={1} suffix="h " />
            <CountUp end={45} suffix="m" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
