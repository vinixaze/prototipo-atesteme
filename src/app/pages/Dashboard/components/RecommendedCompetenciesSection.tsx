import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { PlayCircle } from 'lucide-react';
import { CompetencyTimer } from '../../../components/CompetencyTimer';
import { RecommendedCompetency } from '../types';
import { getCompetencyColors } from '../utils/competencyColors';

interface RecommendedCompetenciesSectionProps {
  competencies: RecommendedCompetency[];
  onStartCompetency: (competency: RecommendedCompetency) => void;
  onNavigate: (page: string) => void;
}

export function RecommendedCompetenciesSection({
  competencies,
  onStartCompetency,
  onNavigate,
}: RecommendedCompetenciesSectionProps) {
  const competenciesRef = useRef(null);
  const competenciesInView = useInView(competenciesRef, { once: true, amount: 0.2 });

  return (
    <div ref={competenciesRef}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#333] mb-1">Competências recomendadas</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competencies.map((comp, index) => {
          const { badgeBg, iconBgClass, buttonGradient } = getCompetencyColors(comp.color);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={competenciesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.1 },
              }}
              className="relative bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-100 overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                <motion.div
                  initial={{ y: -200, x: '20%' }}
                  whileHover={{ y: 100 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute w-[200px] h-[200px] rounded-full blur-3xl"
                  style={{ backgroundColor: `${comp.color}20` }}
                />
              </div>

              <div
                className="relative z-10 w-full px-4 py-2.5 rounded-t-[20px] group-hover:brightness-110 transition-all duration-200"
                style={{ backgroundColor: badgeBg }}
              >
                <span className="text-white text-[10px] font-bold uppercase tracking-[1px] drop-shadow-sm">
                  {comp.category}
                </span>
              </div>

              <div className="relative z-10 p-4 flex flex-col items-center gap-3">
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.15,
                  }}
                  transition={{
                    rotate: { duration: 0.4 },
                    scale: { duration: 0.2 },
                  }}
                  className={`w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200 ${iconBgClass}`}
                >
                  <comp.icon
                    className="w-[30px] h-[30px]"
                    style={{ color: comp.color }}
                    strokeWidth={2}
                  />
                </motion.div>

                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center leading-tight min-h-[36px]">
                  {comp.title}
                </h4>

                {comp.isInProgress ? (
                  <div className="w-full space-y-2">
                    <CompetencyTimer
                      competencyName={comp.title}
                      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                      showIcon={true}
                    />

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartCompetency(comp);
                      }}
                      className="w-full py-2 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <PlayCircle className="w-3.5 h-3.5" />
                        CONTINUAR
                      </span>
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartCompetency(comp);
                    }}
                    className="w-full py-2 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200"
                    style={{
                      background: buttonGradient,
                    }}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <PlayCircle className="w-3.5 h-3.5" />
                      INICIAR
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4">
        <button
          onClick={() => onNavigate('habilidades')}
          className="text-sm text-[#8B27FF] hover:text-[#7B1FE8] transition-colors hover:underline font-medium"
        >
          Ver todas as competências →
        </button>
      </div>
    </div>
  );
}
