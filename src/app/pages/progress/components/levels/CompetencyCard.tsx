import { Award, Calendar, Check, Clock, Coins, Eye, Layers, PlayCircle, Star } from 'lucide-react';
import { Competency } from '../../types';
import { CompetencyTimer } from '../../../shared/components/CompetencyTimer';

interface CompetencyCardProps {
  competency: Competency;
  onViewResult: (competency: Competency) => void;
  onStartChallenge?: (competency: Competency) => void;
}

export default function CompetencyCard({
  competency,
  onViewResult,
  onStartChallenge,
}: CompetencyCardProps) {
  const CompIcon = competency.icon;

  return (
    <div
      className={`
        relative p-3 sm:p-5 rounded-xl border-2 transition-all duration-300 group
        ${competency.completed
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700 shadow-md hover:shadow-xl hover:-translate-y-1'
          : competency.status === 'in-progress'
            ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-indigo-200 dark:border-indigo-700 shadow-md hover:shadow-xl hover:-translate-y-1'
            : 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-500'
        }`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl transition-all duration-300 ${competency.completed
          ? 'bg-gradient-to-b from-green-400 to-green-600'
          : competency.status === 'in-progress'
            ? 'bg-gradient-to-b from-indigo-400 to-indigo-600'
            : 'bg-gradient-to-b from-gray-300 to-gray-400'
          }`}
      />

      <div className="flex items-start gap-4">
        <div
          className={`
            flex-shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center shadow-md transition-all duration-300
            group-hover:scale-110 group-hover:rotate-6
          `}
          style={{
            backgroundColor: competency.completed
              ? '#10b98120'
              : competency.status === 'in-progress'
                ? '#6366F120'
                : '#6b728020',
          }}
        >
          {competency.completed ? (
            <Check className="w-6 sm:w-7 h-6 sm:h-7 text-green-600" strokeWidth={3} />
          ) : (
            <CompIcon
              className="w-6 sm:w-7 h-6 sm:h-7"
              style={{
                color: competency.status === 'in-progress' ? '#6366F1' : '#6b7280',
              }}
              strokeWidth={1.5}
            />
          )}
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-3">
            <div
              className="rounded-lg px-2 py-1.5 md:px-2.5 md:py-2 flex items-center gap-1.5 md:gap-2 w-full sm:w-auto"
              style={{
                backgroundColor: competency.categoryColor,
              }}
            >
              <div className="w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center flex-shrink-0 bg-white/20">
                <Layers className="text-white w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0 hidden md:block">
                <p className="text-[8px] md:text-[10px] uppercase font-semibold leading-none mb-0.5 text-white/90">Área</p>
                <p className="text-[8px] md:text-xs text-white font-medium leading-tight truncate">
                  {competency.category}
                </p>
              </div>
              <p className="md:hidden text-[8px] text-white font-medium leading-tight truncate">
                {competency.category.split(' ')[0]}
              </p>
            </div>

            <div
              className="rounded-lg px-2 py-1.5 md:px-2.5 md:py-2 flex items-center gap-1.5 md:gap-2 w-full sm:w-auto"
              style={{
                backgroundColor: competency.categoryColor,
              }}
            >
              <div className="w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center flex-shrink-0 bg-white/20">
                <Award className="text-white w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0 hidden md:block">
                <p className="text-[8px] md:text-[10px] uppercase font-semibold leading-none mb-0.5 text-white/90">Competência</p>
                <p className="text-[8px] md:text-xs text-white font-medium leading-tight">
                  {competency.title}
                </p>
              </div>
              <p className="md:hidden text-[8px] text-white font-medium leading-tight line-clamp-1">
                {competency.title.length > 25 ? `${competency.title.substring(0, 22)}...` : competency.title}
              </p>
            </div>
          </div>

          {competency.completed && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:flex-wrap items-start sm:items-center sm:gap-3">
                <div className="inline-flex min-w-0 flex items-center gap-1 sm:gap-1.5 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  {[1, 2, 3].map((starNum) => (
                    <Star
                      key={starNum}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${starNum <= competency.starsEarned
                        ? 'fill-[#FFD700] text-[#FFD700]'
                        : 'fill-none text-gray-300'
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}

                  <span className="hidden sm:inline ml-1 text-xs sm:text-sm font-bold text-gray-700">
                    {competency.starsEarned}/3 estrelas
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 max-w-full">
                  <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span className="text-[11px] sm:text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap tabular-nums">
                    {competency.completedDate}
                  </span>
                </div>

                <div className="w-full min-w-0 flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <Clock className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span className="text-[10px] md:text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    {competency.timeSpent}
                  </span>
                </div>

                <div className="w-full min-w-0 flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  <Coins className="w-4 h-4 text-[#8B27FF] flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-[#8B27FF] whitespace-nowrap">
                    +{competency.digcoinsEarned}{' '}
                    <span className="text-[10px] font-semibold">Pontos</span>
                  </span>
                </div>
              </div>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onViewResult(competency);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-white dark:bg-gray-700 border-2 border-green-400 dark:border-green-500 text-green-700 dark:text-green-400 rounded-xl hover:bg-green-50 dark:hover:bg-gray-600 hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg transition-all text-sm sm:text-base font-bold group-hover:scale-105"
              >
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span>Ver resultado detalhado</span>
              </button>
            </div>
          )}

          {!competency.completed && competency.status === 'in-progress' && (
            <div className="grid grid-cols-2 gap-2">
              {onStartChallenge && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onStartChallenge(competency);
                  }}
                  className="w-full h-10 inline-flex items-center justify-center gap-2 px-3
                    bg-gradient-to-r from-indigo-500 to-indigo-600 text-white
                    rounded-lg shadow-sm border border-gray-200/40 dark:border-gray-600/40
                    hover:from-indigo-600 hover:to-indigo-700 hover:shadow-md transition-all
                    text-[12px] font-bold"
                >
                  <PlayCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">Continuar</span>
                </button>
              )}

              <div className="w-full h-10 min-w-0 inline-flex items-center justify-center">
                <CompetencyTimer
                  competencyName={competency.title}
                  mockTime={1800}
                  className="w-full h-10 flex items-center justify-center gap-2 px-3
                    bg-white dark:bg-gray-700 rounded-lg shadow-sm
                    border border-gray-200 dark:border-gray-600 min-w-0"
                />
              </div>
            </div>
          )}

          {!competency.completed && competency.status === 'not-started' && (
            <div className="mt-2">
              {onStartChallenge && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onStartChallenge(competency);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg transition-all text-sm sm:text-base font-bold"
                >
                  <PlayCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Iniciar</span>
                </button>
              )}
            </div>
          )}
        </div>

        {!competency.completed && competency.status === 'in-progress' && (
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-sm">
            <Clock className="w-3 h-3" />
            <span>Em progresso</span>
          </div>
        )}
      </div>
    </div>
  );
}
