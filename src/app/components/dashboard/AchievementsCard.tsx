import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef } from 'react';
import { Trophy, Target, Medal, Coins, ChevronLeft, ChevronRight } from 'lucide-react';
import { CountUp } from './CountUp';
import { ModuleColors } from '../../types/dashboard';
import { RankingSlide } from '../../types/dashboard';
import { rankingSlides, currentLevel, totalProgress } from '../../utils/dashboard/constants';

interface AchievementsCardProps {
  colors: ModuleColors;
  onNavigate: (page: string) => void;
}

export function AchievementsCard({ colors, onNavigate }: AchievementsCardProps) {
  const [rankingSlide, setRankingSlide] = useState(0);
  const conquestRef = useRef(null);
  const conquestInView = useInView(conquestRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRankingSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={conquestRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all h-full flex flex-col"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 bg-gradient-to-br ${colors.icon} rounded-full flex items-center justify-center`}>
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[#333] dark:text-gray-200">Minhas Conquistas</h3>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">
          <span>Nível {currentLevel - 1}</span>
          <span>Nível {currentLevel}</span>
        </div>

        <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden md:hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={conquestInView ? { width: `${totalProgress}%` } : { width: 0 }}
            transition={conquestInView ? { duration: 1.5, delay: 0.3, ease: "easeOut" } : { duration: 0 }}
            className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colors.button} rounded-full`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <div className="relative group hidden md:block">
          <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={conquestInView ? { width: `${totalProgress}%` } : { width: 0 }}
              transition={conquestInView ? { duration: 1.5, delay: 0.3, ease: "easeOut" } : { duration: 0 }}
              className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colors.button} rounded-full`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          <div
            className="pointer-events-none absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
            style={{ left: `${totalProgress}%`, transform: 'translateX(-50%)' }}
          >
            <div className="px-2 py-1 text-[10px] font-bold text-white rounded-md shadow-lg bg-gray-900/90">
              {totalProgress}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={conquestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          <Target className="w-10 h-10 mx-auto mb-2 text-[#7B1FA2] dark:text-purple-400 opacity-60" />
          <p className="text-2xl font-bold text-[#7B1FA2] dark:text-purple-300 opacity-70 mb-1">
            <CountUp end={7} />/<CountUp end={16} />
          </p>
          <p className="text-xs text-[#555] dark:text-gray-400 font-bold uppercase tracking-wide">Competências</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={conquestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] dark:from-purple-900/40 dark:to-purple-800/40 rounded-xl p-4 text-center flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          <Medal className="w-10 h-10 mx-auto mb-2 text-[#7B1FA2] dark:text-purple-400 opacity-60" />
          <p className="text-2xl font-bold text-[#7B1FA2] dark:text-purple-300 opacity-70 mb-1">
            <CountUp end={12} />/<CountUp end={25} />
          </p>
          <p className="text-xs text-[#555] dark:text-gray-400 font-bold uppercase tracking-wide">Medalhas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={conquestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 text-center flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          <Coins className="w-10 h-10 mx-auto mb-2 text-[#3949AB] dark:text-indigo-400 opacity-60" />
          <p className="text-2xl font-bold text-[#3949AB] dark:text-indigo-300 opacity-70 mb-1">
            <CountUp end={1247} />
          </p>
          <p className="text-xs text-[#555] dark:text-gray-400 font-bold uppercase tracking-wide">Pontos</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={conquestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className={`relative rounded-xl p-4 text-center flex flex-col justify-center overflow-hidden shadow-md hover:shadow-lg transition-shadow ${rankingSlide === 0
            ? 'bg-gray-50 dark:bg-gray-700/50'
            : rankingSlide === 1
              ? 'bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] dark:from-purple-900/40 dark:to-purple-800/40'
              : 'bg-indigo-50 dark:bg-indigo-900/30'
            }`}
        >
          <button
            onClick={() => setRankingSlide((prev) => (prev - 1 + 3) % 3)}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 dark:bg-gray-600/80 hover:bg-white dark:hover:bg-gray-500 rounded-full flex items-center justify-center shadow-md z-10 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          </button>

          <button
            onClick={() => setRankingSlide((prev) => (prev + 1) % 3)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 dark:bg-gray-600/80 hover:bg-white dark:hover:bg-gray-500 rounded-full flex items-center justify-center shadow-md z-10 transition-all hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={rankingSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center"
            >
              {React.createElement(rankingSlides[rankingSlide].icon, {
                className: "w-10 h-10 mx-auto mb-2 opacity-60",
                style: {
                  color: rankingSlide === 0
                    ? '#616161'
                    : rankingSlide === 1
                      ? '#7B1FA2'
                      : '#3949AB'
                }
              })}
              <p
                className="text-2xl font-bold mb-1 opacity-70"
                style={{
                  color: rankingSlide === 0
                    ? '#616161'
                    : rankingSlide === 1
                      ? '#7B1FA2'
                      : '#3949AB'
                }}
              >
                {rankingSlides[rankingSlide].position}
              </p>
              <p className="text-[10px] text-[#555] dark:text-gray-400 font-bold uppercase tracking-wide mb-0.5">
                {rankingSlides[rankingSlide].title}
              </p>
              <p className="text-[9px] text-gray-500 dark:text-gray-400">
                {rankingSlides[rankingSlide].total}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setRankingSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${rankingSlide === index
                  ? 'bg-gray-700 dark:bg-gray-300 w-4'
                  : 'bg-gray-400 dark:bg-gray-500'
                  }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => onNavigate('progresso')}
        className={`w-full bg-gradient-to-r ${colors.button} text-white px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95`}
      >
        Ver detalhes
      </button>
    </motion.div>
  );
}

