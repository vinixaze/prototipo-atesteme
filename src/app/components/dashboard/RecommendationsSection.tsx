import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { CompetencyTimer } from '../CompetencyTimer';
import type { RecommendedCompetency } from '../../data/dashboardData';

interface CompetencyStatus extends RecommendedCompetency {
  status: 'completed' | 'in-progress' | 'not-started';
  isInProgress: boolean;
}

interface RecommendationsSectionProps {
  competencies: CompetencyStatus[];
  onStartCompetency: (competency: CompetencyStatus) => void;
  onNavigateToSkills: () => void;
}

export default function RecommendationsSection({
  competencies,
  onStartCompetency,
  onNavigateToSkills,
}: RecommendationsSectionProps) {
  const competenciesRef = useRef(null);
  const competenciesInView = useInView(competenciesRef, { once: true, amount: 0.2 });

  return (
    <div ref={competenciesRef}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#333] mb-1">Competências recomendadas</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competencies.map((comp, index) => {
          let badgeBg = '';
          let iconBgClass = '';
          let buttonGradient = '';

          if (comp.color === '#FFD700') {
            badgeBg = '#FFD700';
            iconBgClass = 'bg-[#FFF9E6] dark:bg-yellow-900/30';
            buttonGradient = 'linear-gradient(135deg, #FFE57F 0%, #FF9800 100%)';
          } else if (comp.color === '#00BCD4') {
            badgeBg = '#00BCD4';
            iconBgClass = 'bg-[#E0F7FA] dark:bg-cyan-900/30';
            buttonGradient = 'linear-gradient(135deg, #4DD0E1 0%, #0288D1 100%)';
          } else if (comp.color === '#FF9800') {
            badgeBg = '#FF9800';
            iconBgClass = 'bg-[#FFF3E0] dark:bg-orange-900/30';
            buttonGradient = 'linear-gradient(135deg, #FFB74D 0%, #E65100 100%)';
          } else if (comp.color === '#4CAF50') {
            badgeBg = '#4CAF50';
            iconBgClass = 'bg-[#E8F5E9] dark:bg-green-900/30';
            buttonGradient = 'linear-gradient(135deg, #81C784 0%, #2E7D32 100%)';
          } else if (comp.color === '#E91E63') {
            badgeBg = '#E91E63';
            iconBgClass = 'bg-[#FCE4EC] dark:bg-pink-900/30';
            buttonGradient = 'linear-gradient(135deg, #F48FB1 0%, #AD1457 100%)';
          }

          return (
            <motion.div
              key={comp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={competenciesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.1 }
              }}
              className="relative bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-100 overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                <motion.div
                  initial={{ y: -200, x: '20%' }}
                  whileHover={{ y: 100 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
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
                    scale: { duration: 0.2 }
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
                        Continuar
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
                      background: buttonGradient
                    }}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <PlayCircle className="w-3.5 h-3.5" />
                      Iniciar
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
          onClick={onNavigateToSkills}
          className="text-sm text-[#8B27FF] hover:text-[#7B1FE8] transition-colors hover:underline font-medium"
        >
          Ver todas as competências →
        </button>
      </div>
    </div>
  );
}
