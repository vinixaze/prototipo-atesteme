import { Lock } from 'lucide-react';
import type { Achievement } from './types';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  points: number;
}

export function AchievementCard({ achievement, index, points }: AchievementCardProps) {
  const AchIcon = achievement.icon;
  const isUnlocked = achievement.unlocked;

  return (
    <div
      className={`
        relative rounded-2xl p-6 text-center transition-all duration-300
        ${isUnlocked
          ? 'bg-white dark:bg-gray-800 border-2 shadow-lg hover:-translate-y-2 hover:shadow-2xl cursor-pointer group'
          : 'bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-sm opacity-60 hover:opacity-70'
        }
      `}
      style={{
        borderColor: isUnlocked ? achievement.color : undefined,
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex justify-center mb-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${isUnlocked
              ? 'bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-600'
              : 'bg-gray-200 dark:bg-gray-700'
            }`}
          style={{
            boxShadow: isUnlocked ? `0 4px 20px ${achievement.color}33` : undefined,
          }}
        >
          <AchIcon
            className={`w-8 h-8 ${isUnlocked ? 'text-[#8B27FF]' : 'text-gray-400'}`}
          />
        </div>
      </div>

      <h3 className={`font-bold text-lg mb-2 ${isUnlocked ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
        {achievement.title}
      </h3>
      <p className={`text-sm mb-4 ${isUnlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}`}>
        {achievement.description}
      </p>

      <div className="flex items-center justify-center gap-2">
        {achievement.rarity && (
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${achievement.rarity === 'lendário'
                ? 'bg-yellow-100 text-yellow-800'
                : achievement.rarity === 'épico'
                  ? 'bg-purple-100 text-purple-800'
                  : achievement.rarity === 'raro'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
              }`}
          >
            {achievement.rarity.toUpperCase()}
          </span>
        )}

        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
          +{points} pts
        </span>
      </div>

      {!isUnlocked && (
        <div className="absolute top-3 right-3">
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
      )}
    </div>
  );
}
