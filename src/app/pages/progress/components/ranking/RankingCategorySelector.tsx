import { School, Users, Globe } from 'lucide-react';
import { RankingData } from '../../types';

interface RankingCategorySelectorProps {
  rankingCategory: 'escola' | 'turma' | 'rede';
  onChange: (category: 'escola' | 'turma' | 'rede') => void;
  normalizedRankingData: RankingData;
}

export default function RankingCategorySelector({
  rankingCategory,
  onChange,
  normalizedRankingData,
}: RankingCategorySelectorProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6 items-center relative z-20">
        <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:gap-2">
          <button
            onClick={() => onChange('turma')}
            className={`
              min-w-0 overflow-hidden
              flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md
              text-xs sm:text-base
              w-full sm:w-auto
              justify-center
              ${rankingCategory === 'turma'
                ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400'
              }
          `}
          >
            <Users className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="min-w-0 whitespace-nowrap leading-tight text-center">
              Turma
            </span>
          </button>

          <button
            onClick={() => onChange('escola')}
            className={`
              min-w-0 overflow-hidden
              flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md
              text-xs sm:text-base
              w-full sm:w-auto
              justify-center
              ${rankingCategory === 'escola'
                ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400'
              }
            `}
          >
            <School className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="min-w-0 whitespace-nowrap leading-tight text-center">
              Escola
            </span>
          </button>

          <button
            onClick={() => onChange('rede')}
            className={`
              min-w-0 overflow-hidden
              flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md
              text-xs sm:text-base
              w-full sm:w-auto
              justify-center
              ${rankingCategory === 'rede'
                ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400'
              }
            `}
          >
            <Globe className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="min-w-0 whitespace-nowrap leading-tight text-center">
              Rede
            </span>
          </button>
        </div>

        {rankingCategory === 'escola' && normalizedRankingData.escola.length > 0 && (
          <div className="hidden sm:flex items-center ml-auto px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              <School className="inline-block w-4 h-4 align-[-2px] mr-1" aria-hidden="true" />
              {normalizedRankingData.escola[0].schoolName || 'Escola Municipal Castro Alves'}
            </span>
          </div>
        )}

        {rankingCategory === 'turma' && normalizedRankingData.turma.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                <School className="inline-block w-4 h-4 align-[-2px] mr-1" aria-hidden="true" />
                {normalizedRankingData.turma[0].schoolName || 'Escola Municipal Castro Alves'}
              </span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border-2 border-orange-200 dark:border-orange-700">
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                <Users className="inline-block w-4 h-4 align-[-2px] mr-1" aria-hidden="true" />
                {normalizedRankingData.turma[0].turma || '8A'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="sm:hidden mb-4 px-3">
        {rankingCategory === 'escola' && normalizedRankingData.escola.length > 0 && (
          <div
            className="
              w-full text-center text-sm font-semibold
              text-purple-700 dark:text-purple-300
              bg-gradient-to-r from-purple-50 to-pink-50
              dark:from-purple-900/30 dark:to-pink-900/30
              border border-purple-200 dark:border-purple-700
              rounded-xl px-4 py-2
              whitespace-normal break-words
            "
          >
            <School className="inline-block w-4 h-4 align-[-2px] mr-1" aria-hidden="true" />
            {normalizedRankingData.escola[0].schoolName || 'Escola Municipal Castro Alves'}
          </div>
        )}

        {rankingCategory === 'turma' && normalizedRankingData.turma.length > 0 && (
          <div
            className="
              w-full text-center text-sm font-semibold
              text-gray-700 dark:text-gray-200
              bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50
              dark:from-purple-900/30 dark:via-pink-900/30 dark:to-orange-900/30
              border border-purple-200 dark:border-purple-700
              rounded-xl px-4 py-2
            "
          >
            <div className="whitespace-normal break-words">
              <School className="inline-block w-4 h-4 align-[-2px] mr-1" aria-hidden="true" />
              {normalizedRankingData.turma[0].schoolName || 'Escola Municipal Castro Alves'}
            </div>
            <div className="mt-1 whitespace-normal break-words">
              <Users className="inline-block w-4 h-4 align-[-2px] mr-1" aria-hidden="true" />
              {normalizedRankingData.turma[0].turma || '8A'}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
