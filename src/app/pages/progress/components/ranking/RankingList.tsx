import {
  Trophy,
  Coins,
  Crown,
  Medal,
  CheckCircle2,
  Zap,
  Star,
  Info,
} from 'lucide-react';
import { RankingUser } from '../../types';
import { shortenName } from '../../utils/ranking';

interface RankingListProps {
  users: RankingUser[];
  rankingCategory: 'escola' | 'turma' | 'rede';
  onSelectUser: (user: RankingUser) => void;
}

export default function RankingList({
  users,
  rankingCategory,
  onSelectUser,
}: RankingListProps) {
  return (
    <div className="space-y-3 px-2 sm:px-0">
      {users.map((user, index) => {
        const isTop3 = user.position <= 3;

        const positionGradient =
          user.position === 1
            ? 'from-yellow-400 to-yellow-600'
            : user.position === 2
              ? 'from-gray-300 to-gray-500'
              : user.position === 3
                ? 'from-orange-400 to-orange-600'
                : 'from-purple-100 to-purple-200';

        return (
          <div
            key={index}
            className={`
              relative rounded-2xl transition-all duration-300
              overflow-visible
              ${user.isCurrentUser
                ? 'bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-purple-900/20 ring-2 ring-[#8B27FF] shadow-xl'
                : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg hover:-translate-y-1'
              }
            `}
          >
            <div
              className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl bg-gradient-to-b ${positionGradient}`}
            />

            <button
              onClick={(event) => {
                event.stopPropagation();
                onSelectUser(user);
              }}
              className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9D3FFF] text-white rounded-full flex items-center justify-center transition-all shadow-md hover:scale-105 z-10"
            >
              <Info className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-4 p-5 pl-6">
              <div
                className={`
                  flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold shadow-lg
                  transition-transform hover:scale-110
                  ${isTop3
                    ? `bg-gradient-to-br ${positionGradient} text-white text-base sm:text-xl`
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 text-sm sm:text-lg'
                  }
                `}
              >
                {user.position}
              </div>

              <div
                className={`
                  flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-lg
                  transition-transform hover:rotate-6 hover:scale-110
                  ${user.isCurrentUser
                    ? 'bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] ring-2 sm:ring-4 ring-purple-300'
                    : 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600'
                  }
                `}
              >
                {user.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <>
                      <p
                        className={`hidden sm:block text-sm sm:text-lg font-bold ${user.isCurrentUser
                          ? 'text-[#8B27FF]'
                          : 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {shortenName(user.name)}
                      </p>
                      <p
                        className={`block sm:hidden text-sm font-bold ${user.isCurrentUser
                          ? 'text-[#8B27FF]'
                          : 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {user.name.split(' ')[0]}
                      </p>
                    </>

                    {user.isCurrentUser && (
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white text-[10px] sm:text-xs rounded-full font-bold shadow-md">
                        VOCÇS
                      </span>
                    )}

                    {isTop3 && !user.isCurrentUser && (
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
                    )}
                  </div>

                  {rankingCategory === 'escola' && user.turma && (
                    <span className="text-[10px] sm:text-xs text-orange-700 dark:text-orange-400 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-800/30 px-2.5 py-0.5 rounded-md font-bold border border-orange-300 dark:border-orange-700">
                      {user.turma}
                    </span>
                  )}

                  {rankingCategory === 'rede' && user.school && (
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md font-medium">
                      {user.school}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-purple-200 dark:border-purple-700">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600 dark:text-purple-400" />
                      <span className="text-[10px] sm:text-xs font-semibold text-purple-900 dark:text-purple-300">
                        NÇðvel {user.level}
                      </span>
                    </div>
                    <div className="h-1 sm:h-1.5 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${user.levelProgress}%` }}
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-purple-700 dark:text-purple-300 font-bold mt-0.5">
                      {user.levelProgress}%
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40 rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-emerald-200 dark:border-emerald-700">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                      <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] sm:text-xs font-semibold text-emerald-900 dark:text-emerald-300 truncate">
                        Pontos
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-300">
                      {user.digcoins}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                      <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-[10px] sm:text-xs font-semibold text-yellow-900 dark:text-yellow-300 truncate">
                        Medalhas
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-yellow-700 dark:text-yellow-300">
                      {user.medals}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-fuchsia-100 dark:from-fuchsia-900/30 dark:to-pink-800/30 rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-pink-200 dark:border-fuchsia-700">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-fuchsia-600 dark:text-fuchsia-400 fill-fuchsia-600 dark:fill-fuchsia-400" />
                      <span className="text-[10px] sm:text-xs font-semibold text-fuchsia-900 dark:text-fuchsia-300 truncate">
                        Estrelas
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-fuchsia-700 dark:text-fuchsia-300">
                      {user.avgTime}
                    </p>
                  </div>
                </div>
              </div>

              {isTop3 && (
                <div className="hidden sm:flex flex-shrink-0 animate-bounce-slow">
                  {user.position === 1 && (
                    <Crown className="w-10 h-10 text-yellow-500" fill="#FFD700" />
                  )}
                  {user.position === 2 && (
                    <Trophy className="w-10 h-10 text-gray-400" fill="#D1D5DB" />
                  )}
                  {user.position === 3 && (
                    <Trophy className="w-10 h-10 text-orange-500" fill="#FB923C" />
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
