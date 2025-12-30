import { Trophy, Star, Lock, Sparkles, Crown, Award, Zap, Medal, Flag, Users, PieChart, Target, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  unlocked: boolean;
  date?: string;
  category?: string;
  rarity?: 'comum' | 'raro' | 'épico' | 'lendário';
}

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

  // Estado para controlar a visibilidade dos detalhes das conquistas
  const [showDetails, setShowDetails] = useState(false);
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
        <p className="text-[15px] text-[#666] dark:text-gray-400 mb-2">
          Desbloqueie missões conforme avança na sua jornada de aprendizado digital
        </p>
        <div className="flex items-center gap-2 text-sm text-[#8B27FF] dark:text-[#A855F7]">
          <Medal className="w-4 h-4" />
          <span className="font-semibold">Cada missão concede uma medalha que adiciona pontos ao seu perfil!</span>
        </div>
      </div>

      {/* SEÇÃO 2 - SUAS MISSÕES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* CARD 1 - MISSÕES (Rosa Claro) */}
        <div 
          className="relative bg-gradient-to-r from-[#F0ABFC] to-[#E879F9] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group"
        >
          {/* Ícone decorativo - Raio */}
          <Zap 
            className="absolute top-3 right-3 w-[45px] h-[45px] text-white opacity-50 transition-all duration-300 group-hover:scale-110"
            strokeWidth={2}
            fill="white"
            fillOpacity={0.3}
          />
          
          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="text-[44px] font-bold text-white leading-none mb-1">
              {achievements.length - unlockedAchievements}
            </div>
            <div className="text-[13px] font-medium text-white/90">
              Concluídas
            </div>
          </div>
        </div>

        {/* CARD 2 - BLOQUEADAS (Cinza) */}
        <div 
          className="relative bg-gradient-to-r from-[#9CA3AF] to-[#6B7280] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group"
        >
          {/* Ícone decorativo - Cadeado com Raio dentro */}
          <div className="absolute top-3 right-3 w-[45px] h-[45px]">
            <Lock 
              className="w-[45px] h-[45px] text-white opacity-50 transition-all duration-300 group-hover:scale-110"
              strokeWidth={2}
            />
            <Zap 
              className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[16px] h-[16px] text-white opacity-80"
              strokeWidth={2.5}
              fill="white"
              fillOpacity={0.4}
            />
          </div>
          
          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="text-[44px] font-bold text-white leading-none mb-1">
              {achievements.length - unlockedAchievements}
            </div>
            <div className="text-[13px] font-medium text-white/90">
              Bloqueadas
            </div>
          </div>
        </div>

        {/* CARD 3 - MEDALHAS (Dourado/Amarelo) */}
        <div 
          className="relative bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group"
        >
          {/* Ícone decorativo - Award/Medalha */}
          <Award 
            className="absolute top-3 right-3 w-[50px] h-[50px] text-white opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
            strokeWidth={2}
          />
          
          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="text-[44px] font-bold text-white leading-none mb-1">
              {unlockedAchievements}
            </div>
            <div className="text-[13px] font-medium text-white/90">
              Medalhas
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedAchievements.map((achievement, index) => {
          const AchIcon = achievement.icon;
          const isUnlocked = achievement.unlocked;
          
          return (
            <div
              key={achievement.id}
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
              {/* Icon Container com animação */}
              <div className="flex justify-center mb-4">
                <div
                  className={`
                    relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${isUnlocked 
                      ? 'shadow-lg group-hover:scale-110 group-hover:rotate-6' 
                      : 'shadow-sm'
                    }
                  `}
                  style={{
                    backgroundColor: isUnlocked 
                      ? achievement.color + '20' 
                      : '#E5E7EB',
                  }}
                >
                  {/* Efeito de brilho para conquistas desbloqueadas */}
                  {isUnlocked && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </>
                  )}
                  
                  {isUnlocked ? (
                    <AchIcon 
                      className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" 
                      style={{ color: achievement.color }}
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Title com gradiente para desbloqueadas */}
              <h4 
                className={`
                  text-lg mb-2 font-bold transition-all duration-300
                  ${isUnlocked ? 'group-hover:scale-105' : 'text-gray-500'}
                `}
                style={{
                  color: isUnlocked ? achievement.color : undefined,
                }}
              >
                {achievement.title}
              </h4>

              {/* Description */}
              <p className={`text-sm mb-3 ${isUnlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                {achievement.description}
              </p>

              {/* Medalha e Pontos - Informação de Recompensa */}
              <div className={`
                flex items-center justify-center gap-2 px-3 py-2 rounded-lg mb-3
                ${isUnlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800' 
                  : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }
              `}>
                <Medal className={`w-4 h-4 ${isUnlocked ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'}`} />
                <span className={`text-xs font-bold ${isUnlocked ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-500 dark:text-gray-400'}`}>
                  Medalha: +{getPointsByRarity(achievement.rarity)} pontos
                </span>
              </div>

              {/* Date Badge para conquistas desbloqueadas */}
              {isUnlocked && achievement.date && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                      {achievement.date}
                    </p>
                  </div>
                </div>
              )}

              {/* Locked State Message */}
              {!isUnlocked && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" />
                    <span>Continue progredindo</span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
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