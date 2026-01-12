import { ChevronDown, ChevronUp, Crown, Medal, Trophy } from 'lucide-react';
import { useState } from 'react';
import { AchievementCard } from './conquistas/AchievementCard';
import { ConquistasSummaryCards } from './conquistas/ConquistasSummaryCards';
import type { Achievement } from './conquistas/types';

interface ConquistasTabProps {
  achievements: Achievement[];
  unlockedAchievements: number;
}

export default function ConquistasTab({ achievements, unlockedAchievements }: ConquistasTabProps) {
  const progressPercentage = Math.round((unlockedAchievements / achievements.length) * 100);

  // Função para retornar pontos baseado na raridade
  const getPointsByRarity = (rarity?: 'comum' | 'raro' | 'épico' | 'lendário'): number => {
    switch (rarity) {
      case 'comum': return 10;
      case 'raro': return 25;
      case 'épico': return 50;
      case 'lendário': return 100;
      default: return 10;
    }
  };

  const [showAllMissions, setShowAllMissions] = useState(false);

  // Definir quantas missões mostrar inicialmente
  const initialMissionsCount = 6;
  const displayedAchievements = showAllMissions
    ? achievements
    : achievements.slice(0, initialMissionsCount);

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-[28px] font-bold text-[#333] dark:text-gray-200 mb-3">Suas Missões</h2>

        <div className="flex items-center gap-2 text-sm text-[#8B27FF] dark:text-[#A855F7]">
          <Medal className="w-4 h-4" />
          <span className="font-semibold">Cada missão concede uma medalha que adiciona pontos ao seu perfil!</span>
        </div>
      </div>

      <ConquistasSummaryCards />

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedAchievements.map((achievement, index) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            index={index}
            points={getPointsByRarity(achievement.rarity)}
          />
        ))}
      </div>

      {/* Botão Ver Mais / Ver Menos */}
      {achievements.length > initialMissionsCount && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAllMissions(!showAllMissions)}
            className="px-8 py-4 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9333EA] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 group"
          >
            <span>{showAllMissions ? 'Ver menos' : `Ver mais`}</span>
            {showAllMissions ? (
              <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            ) : (
              <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            )}
          </button>
        </div>
      )}

      {/* Motivational Message */}
      {unlockedAchievements < achievements.length && (
        <div className="mt-8 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-purple-900/30 rounded-2xl p-6 text-center border-2 border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Crown className="w-8 h-8 text-[#8B27FF]" />
            <h3 className="text-xl font-bold text-[#8B27FF]">Continue Conquistando!</h3>
            <Crown className="w-8 h-8 text-[#8B27FF]" />
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Você desbloqueou <span className="font-bold text-[#8B27FF]">{unlockedAchievements}</span> de{' '}
            <span className="font-bold text-[#8B27FF]">{achievements.length}</span> missões.
            Faltam apenas <span className="font-bold text-[#8B27FF]">{achievements.length - unlockedAchievements}</span> para completar sua coleção!
          </p>
        </div>
      )}

      {/* All Unlocked Celebration */}
      {unlockedAchievements === achievements.length && (
        <div className="mt-8 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 rounded-2xl p-8 text-center border-2 border-yellow-400 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-600 animate-bounce" />
            <h3 className="text-2xl font-bold text-yellow-700">Parabéns, Campeão!</h3>
            <Trophy className="w-12 h-12 text-yellow-600 animate-bounce" />
          </div>
          <p className="text-lg text-yellow-800 font-semibold">
            🎉 Você desbloqueou TODAS as {achievements.length} missões disponíveis! 🎉
          </p>
          <p className="text-yellow-700 mt-2">
            Você é um verdadeiro mestre das competências digitais!
          </p>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        .animate-fadeIn > div {
          animation: slideIn 0.5s ease-out forwards;
        }

        .animate-swing {
          animation: swing 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
