import { motion, useInView } from 'motion/react';
import { useMemo, useRef } from 'react';
import type { ModuleColors } from './types';
import type { ProgressItem } from '../../data/dashboardData';
import CountUp from './CountUp';

interface LevelProgressSectionProps {
  colors: ModuleColors;
  currentLevel: number;
  progressData: ProgressItem[];
}

export default function LevelProgressSection({ colors, currentLevel, progressData }: LevelProgressSectionProps) {
  const competencyBarsRef = useRef(null);
  const competencyBarsInView = useInView(competencyBarsRef, { once: false, amount: 0.3 });

  const overallPercentage = useMemo(() => {
    return Math.round(
      progressData.reduce((sum, item) => sum + item.percentage, 0) / progressData.length
    );
  }, [progressData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 items-stretch">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`relative bg-gradient-to-br ${colors.primary} rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center w-full lg:w-[180px] h-full min-h-[180px] overflow-hidden`}
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-3 shadow-md">
            <p className="text-white text-[10px] uppercase tracking-wider font-bold">Nível Atual</p>
          </div>
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-5xl shadow-lg mb-2"
          >
            {currentLevel}
          </motion.div>
          <p className="text-white/90 text-[9px] uppercase tracking-wider text-center">Continue!</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all h-full min-h-[180px]"
      >
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-6 h-full">
          <div className="bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col items-center justify-center">
            <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
              Progresso
            </p>

            <motion.div
              ref={competencyBarsRef}
              initial={{ scale: 0 }}
              animate={competencyBarsInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
              className={`text-5xl sm:text-6xl font-black bg-gradient-to-br ${colors.textGradient} bg-clip-text text-transparent`}
            >
              <CountUp end={overallPercentage} suffix="%" />
            </motion.div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-center">
            <div className="flex-1 w-full min-w-0 flex flex-col justify-center space-y-2.5">
              {progressData.map((item, index) => (
                <div key={item.category}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide leading-tight whitespace-normal break-words">
                      {item.category}
                    </span>
                  </div>

                  <div className="relative h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden md:hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={competencyBarsInView ? { width: `${item.percentage}%` } : { width: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.15 * index,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="h-full rounded-full shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  <div className="relative group hidden md:block">
                    <div className="relative h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={competencyBarsInView ? { width: `${item.percentage}%` } : { width: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.15 * index,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="h-full rounded-full shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>

                    <div
                      className="pointer-events-none absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      style={{ left: `${item.percentage}%`, transform: "translateX(-50%)" }}
                    >
                      <div
                        className="px-2 py-1 text-[10px] font-bold text-white rounded-md shadow-lg"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="
          relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg
          flex items-center justify-center
          w-full h-full
          min-h-[140px] lg:min-h-[180px]
          overflow-hidden
          border-2 border-gray-200 dark:border-gray-700
          md:col-span-2 lg:col-span-1
          px-6
        "
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-400 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 text-center p-4">
          <p className="text-gray-400 dark:text-gray-500 text-[9px] font-normal uppercase tracking-[0.1em] mb-0.5">
            CONTA DE
          </p>

          <h2 className="text-gray-600 dark:text-gray-400 text-base font-medium uppercase tracking-tight mb-0.5">
            ORGANIZAÇÃO
          </h2>

          <div className="flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            <p className="text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wide">
              ateste<span className="text-[#8B27FF]">me</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
