import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CountUp } from './CountUp';
import { ModuleColors, ProgressDataItem } from '../types';

interface ProgressCardProps {
  colors: ModuleColors;
  progressData: ProgressDataItem[];
  overallPercentage: number;
}

export function ProgressCard({ colors, progressData, overallPercentage }: ProgressCardProps) {
  const competencyBarsRef = useRef(null);
  const competencyBarsInView = useInView(competencyBarsRef, { once: false, amount: 0.3 });

  return (
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
              <div key={index}>
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
  );
}

