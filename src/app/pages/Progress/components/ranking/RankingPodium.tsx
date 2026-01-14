import { Coins, Crown } from 'lucide-react';
import { RankingUser } from '../../types';

interface RankingPodiumProps {
  podium: RankingUser[];
}

export default function RankingPodium({ podium }: RankingPodiumProps) {
  if (podium.length < 3) return null;

  return (
    <div className="mb-8 px-2 pt-16 sm:pt-0 relative z-0">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
        <div className="flex flex-col items-center mt-6 sm:mt-8 group">
          <div className="relative mb-2 sm:mb-4">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-xl ring-2 sm:ring-4 ring-gray-200 ring-offset-1 sm:ring-offset-2 group-hover:scale-110 transition-transform">
              {podium[1].avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs sm:text-base font-bold shadow-lg">
              2
            </div>
          </div>
          <p className="text-center text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-0.5 sm:mb-1 truncate w-full px-1">
            {podium[1].name.split(' ')[0]}
          </p>
          <p className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-semibold">
            {podium[1].points} pts
          </p>
          <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-[#8B27FF] font-bold">
            <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{podium[1].digcoins}</span>
          </div>
        </div>

        <div className="flex flex-col items-center group pt-8 sm:pt-0">
          <div className="relative mb-2 sm:mb-4">
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-4xl font-bold shadow-2xl ring-2 sm:ring-4 ring-yellow-300 ring-offset-2 sm:ring-offset-4 group-hover:scale-110 transition-transform animate-pulse-slow">
              {podium[0].avatar}
            </div>
            <div className="absolute top-0 sm:-top-12 left-1/2 -translate-x-1/2">
              <Crown className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-500 animate-bounce" fill="#FFD700" />
            </div>

            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-9 h-9 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm sm:text-xl font-bold shadow-xl">
              1
            </div>
          </div>
          <p className="text-center text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-0.5 sm:mb-1 truncate w-full px-1">
            {podium[0].name.split(' ')[0]}
          </p>
          <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 font-bold">
            {podium[0].points} pts
          </p>
          <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm text-[#8B27FF] font-bold">
            <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{podium[0].digcoins}</span>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 sm:mt-8 group">
          <div className="relative mb-2 sm:mb-4">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-xl ring-2 sm:ring-4 ring-orange-200 ring-offset-1 sm:ring-offset-2 group-hover:scale-110 transition-transform">
              {podium[2].avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center text-white text-xs sm:text-base font-bold shadow-lg">
              3
            </div>
          </div>
          <p className="text-center text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-0.5 sm:mb-1 truncate w-full px-1">
            {podium[2].name.split(' ')[0]}
          </p>
          <p className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-semibold">
            {podium[2].points} pts
          </p>
          <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-[#8B27FF] font-bold">
            <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{podium[2].digcoins}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
