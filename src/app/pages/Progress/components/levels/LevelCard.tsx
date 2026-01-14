import { ChevronDown, Lock, Sparkles } from 'lucide-react';
import { Competency, Level } from '../../types';
import CompetencyCard from './CompetencyCard';

interface LevelCardProps {
  level: Level;
  isExpanded: boolean;
  onToggle: (levelNumber: number) => void;
  onViewResult: (competency: Competency) => void;
  onStartChallenge?: (competency: Competency) => void;
}

export default function LevelCard({
  level,
  isExpanded,
  onToggle,
  onViewResult,
  onStartChallenge,
}: LevelCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-2xl transition-all duration-300
        ${level.unlocked
          ? 'border-2 border-[#8B27FF] shadow-xl shadow-purple-100 dark:shadow-purple-950 hover:shadow-2xl hover:shadow-purple-200 dark:hover:shadow-purple-900'
          : 'border-2 border-gray-200 dark:border-gray-700 shadow-md opacity-70'
        }
      `}
    >
      <button
        onClick={() => level.unlocked && onToggle(level.number)}
        disabled={!level.unlocked}
        className={`w-full p-4 sm:p-6 flex items-center gap-3 sm:gap-6 transition-all rounded-t-2xl ${level.unlocked ? 'hover:bg-purple-50/50 cursor-pointer' : 'cursor-not-allowed'
          }`}
      >
        <div
          className={`
            flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300
            ${level.unlocked
              ? 'bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] hover:scale-110 hover:rotate-6'
              : 'bg-gradient-to-br from-gray-300 to-gray-400'
            }
          `}
        >
          {level.unlocked ? (
            <span className="text-white text-2xl sm:text-3xl font-bold">{level.number}</span>
          ) : (
            <Lock className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
          )}
        </div>

        <div className="flex-shrink-0 text-left">
          <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${level.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
            NÇðvel {level.number}
          </h3>
          {level.unlocked && level.percentage === 100 && (
            <div className="flex items-center gap-1 mt-2">
              <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
              <span className="text-xs sm:text-sm text-green-600 font-bold">NÇðvel Completo!</span>
            </div>
          )}
        </div>

        <div className="flex-1 hidden md:block">
          <div className="space-y-2">
            <div className="relative h-5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <div
                className={`
                  h-full rounded-full transition-all duration-1000 relative overflow-hidden
                  ${level.unlocked
                    ? 'bg-gradient-to-r from-[#8B27FF] via-[#A855F7] to-[#C084FC]'
                    : 'bg-gray-300 dark:bg-gray-600'
                  }
                `}
                style={{ width: `${level.percentage}%` }}
              >
                {level.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-bold ${level.percentage > 50 ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {level.percentage}%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {level.progress}/{level.total} competÇ¦ncias
              </span>
            </div>
          </div>
        </div>

        {level.unlocked && (
          <ChevronDown
            className={`
              w-7 h-7 flex-shrink-0 transition-all duration-300
              ${isExpanded ? 'rotate-180 text-[#8B27FF]' : 'text-gray-600 dark:text-gray-400'}
            `}
          />
        )}
      </button>

      <div className="md:hidden px-6 pb-4">
        <div className="space-y-2">
          <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div
              className={`
                h-full rounded-full transition-all duration-1000
                ${level.unlocked
                  ? 'bg-gradient-to-r from-[#8B27FF] via-[#A855F7] to-[#C084FC]'
                  : 'bg-gray-300'
                }
              `}
              style={{ width: `${level.percentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-bold ${level.percentage > 50 ? 'text-white' : 'text-gray-700'}`}>
                {level.percentage}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">
              {level.progress}/{level.total} competÇ¦ncias
            </span>
          </div>
        </div>
      </div>

      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isExpanded ? 'max-h-[5000px]' : 'max-h-0'}
        `}
      >
        <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2 border-t-2 border-gray-100">
          {!level.unlocked ? (
            <div className="py-12 sm:py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gray-100 rounded-full mb-4">
                <Lock className="w-8 sm:w-10 h-8 sm:h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-base sm:text-lg font-medium px-4">
                Complete o nÇðvel anterior para desbloquear
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
              {level.competencias.map((competency) => (
                <CompetencyCard
                  key={competency.id}
                  competency={competency}
                  onViewResult={onViewResult}
                  onStartChallenge={onStartChallenge}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
