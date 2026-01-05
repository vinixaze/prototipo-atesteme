import React from 'react';
import { motion } from 'motion/react';
import { CompetencyTimer } from './CompetencyTimer';
import { getCompetencyStatus } from '../utils/competencyStorage';
import {
  ChevronDown,
  Lock,
  LockOpen,
  Check,
  Star,
  Calendar,
  Clock,
  Coins,
  Eye,
  Zap,
  TrendingUp,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Competencia {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  icon: LucideIcon;
  completed: boolean;
  starsEarned: number;
  totalStars: 3;
  status: 'completed' | 'in-progress' | 'not-started';
  completedDate?: string;
  timeSpent?: string;
  digcoinsEarned?: number;
}

interface Level {
  number: number;
  name: string;
  unlocked: boolean;
  progress: number;
  total: number;
  percentage: number;
  competencias: Competencia[];
}

interface NiveisTabProps {
  levels: Level[];
  expandedLevel: number | null;
  toggleLevel: (levelNumber: number) => void;
  handleViewResult: (comp: Competencia) => void;
  currentLevel: Level;
  handleStartChallenge?: (comp: Competencia) => void;
}

export default function NiveisTab({ 
  levels, 
  expandedLevel, 
  toggleLevel, 
  handleViewResult,
  currentLevel,
  handleStartChallenge
}: NiveisTabProps) {
  // Calcular estatísticas gerais
  const totalCompetencias = levels.reduce((acc, level) => acc + level.total, 0);
  const completedCompetencias = levels.reduce((acc, level) => acc + level.progress, 0);
  const totalStars = levels.reduce((acc, level) => 
    acc + level.competencias.reduce((sum, comp) => sum + comp.starsEarned, 0), 0
  );
  const maxStars = totalCompetencias * 3;
  const unlockedLevels = levels.filter(l => l.unlocked).length;

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-[28px] font-bold text-[#333] dark:text-gray-200 mb-3">Competências por Nível</h2>
        <p className="text-[15px] text-[#666] dark:text-gray-400">
          Complete os desafios nas 16 competências para desbloquear o próximo Nível
        </p>
      </div>

      {/* SEÇÃO 1 - SEUS NÍVEIS DE COMPETÊNCIA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* CARD 1 - COMPETÊNCIAS CONQUISTADAS */}
        <div 
          className="relative bg-gradient-to-r from-[#9333EA] to-[#7E22CE] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          {/* Ícone decorativo */}
          <CheckCircle2 
            className="absolute top-3 right-3 w-[45px] h-[45px] text-white opacity-40 transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110"
            strokeWidth={2}
          />
          
          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="text-[44px] font-bold text-white leading-none mb-1">
              7/16
            </div>
            <div className="text-[13px] font-medium text-white/90">
              Competências Conquistadas
            </div>
          </div>
        </div>

        {/* CARD 2 - ESTRELAS RECEBIDAS */}
        <div 
          className="relative bg-gradient-to-r from-[#F0ABFC] to-[#E879F9] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group"
        >
          {/* Ícone decorativo - Estrela */}
          <Star 
            className="absolute top-3 right-3 w-[50px] h-[50px] text-[#FBBF24] opacity-100 fill-[#FBBF24] transition-all duration-300 group-hover:scale-125 group-hover:rotate-[-15deg]"
            strokeWidth={0}
          />
          
          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="text-[44px] font-bold text-white leading-none mb-1">
              41/48
            </div>
            <div className="text-[13px] font-medium text-white/90">
              Estrelas Recebidas
            </div>
          </div>
        </div>

        {/* CARD 3 - COMPETÊNCIAS DESBLOQUEADAS */}
        <div 
          className="relative bg-gradient-to-r from-[#9CA3AF] to-[#6B7280] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          style={{ cursor: 'not-allowed' }}
        >
          {/* Ícone decorativo - Cadeado Aberto */}
          <LockOpen 
            className="absolute top-3 right-3 w-[45px] h-[45px] text-white opacity-50"
            strokeWidth={2}
          />
          
          {/* Conteúdo */}
          <div className="relative z-10">
            <div className="text-[44px] font-bold text-white leading-none mb-1">
              1/3
            </div>
            <div className="text-[13px] font-medium text-white/90">
              Competências Desbloqueadas
            </div>
          </div>
        </div>
      </div>

      {/* Level Cards */}
      <div className="space-y-4 sm:space-y-6">
        {levels.map((level, index) => (
          <div
            key={level.number}
            className={`
              bg-white dark:bg-gray-800 rounded-2xl transition-all duration-300
              ${
                level.unlocked
                  ? 'border-2 border-[#8B27FF] shadow-xl shadow-purple-100 dark:shadow-purple-950 hover:shadow-2xl hover:shadow-purple-200 dark:hover:shadow-purple-900'
                  : 'border-2 border-gray-200 dark:border-gray-700 shadow-md opacity-70'
              }
            `}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Card Header */}
            <button
              onClick={() => level.unlocked && toggleLevel(level.number)}
              disabled={!level.unlocked}
              className={`w-full p-4 sm:p-6 flex items-center gap-3 sm:gap-6 transition-all rounded-t-2xl ${
                level.unlocked ? 'hover:bg-purple-50/50 cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              {/* Badge com animação */}
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

              {/* Level Info */}
              <div className="flex-shrink-0 text-left">
                <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${level.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                  Nível {level.number}
                </h3>
                {level.unlocked && level.percentage === 100 && (
                  <div className="flex items-center gap-1 mt-2">
                    <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
                    <span className="text-xs sm:text-sm text-green-600 font-bold">Nível Completo!</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="flex-1 hidden md:block">
                <div className="space-y-2">
                  {/* Barra de progresso com gradiente */}
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
                      {/* Animação de brilho */}
                      {level.unlocked && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
                      )}
                    </div>
                    {/* Percentual dentro da barra */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm font-bold ${level.percentage > 50 ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {level.percentage}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Info abaixo da barra */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {level.progress}/{level.total} competências
                    </span>
                  </div>
                </div>
              </div>

              {/* Chevron com animação */}
              {level.unlocked && (
                <ChevronDown
                  className={`
                    w-7 h-7 flex-shrink-0 transition-all duration-300
                    ${expandedLevel === level.number ? 'rotate-180 text-[#8B27FF]' : 'text-gray-600 dark:text-gray-400'}
                  `}
                />
              )}
            </button>

            {/* Mobile Progress Bar */}
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
                    {level.progress}/{level.total} competências
                  </span>
                </div>
              </div>
            </div>

            {/* Card Body (Expandable) */}
            <div
              className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${expandedLevel === level.number ? 'max-h-[5000px]' : 'max-h-0'}
              `}
            >
              <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2 border-t-2 border-gray-100">
                {!level.unlocked ? (
                  /* Locked Message */
                  <div className="py-12 sm:py-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gray-100 rounded-full mb-4">
                      <Lock className="w-8 sm:w-10 h-8 sm:h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-base sm:text-lg font-medium px-4">
                      Complete o nível anterior para desbloquear
                    </p>
                  </div>
                ) : (
                  /* Competency List */
                  <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                    {level.competencias.map((comp, compIndex) => {
                      const CompIcon = comp.icon;
                      return (
                        <div
                          key={comp.id}
                          className={`
                            relative p-3 sm:p-5 rounded-xl border-2 transition-all duration-300 group
                            ${
                              comp.completed
                                ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700 shadow-md hover:shadow-xl hover:-translate-y-1'
                                : comp.status === 'in-progress'
                                ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-indigo-200 dark:border-indigo-700 shadow-md hover:shadow-xl hover:-translate-y-1'
                                : 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-500'
                            }`}
                          style={{
                            animationDelay: `${compIndex * 50}ms`,
                          }}
                        >
                          {/* Barra lateral decorativa */}
                          <div 
                            className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl transition-all duration-300 ${
                              comp.completed ? 'bg-gradient-to-b from-green-400 to-green-600' :
                              comp.status === 'in-progress' ? 'bg-gradient-to-b from-indigo-400 to-indigo-600' :
                              'bg-gradient-to-b from-gray-300 to-gray-400'
                            }`}
                          />

                          <div className="flex items-start gap-4">
                            {/* Icon com hover effect */}
                            <div
                              className={`
                                flex-shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center shadow-md transition-all duration-300
                                group-hover:scale-110 group-hover:rotate-6
                              `}
                              style={{
                                backgroundColor: comp.completed 
                                  ? '#10b98120' 
                                  : comp.status === 'in-progress' 
                                  ? '#6366F120' 
                                  : '#6b728020',
                              }}
                            >
                              {comp.completed ? (
                                <Check className="w-6 sm:w-7 h-6 sm:h-7 text-green-600" strokeWidth={3} />
                              ) : (
                                <CompIcon 
                                  className="w-6 sm:w-7 h-6 sm:h-7" 
                                  style={{ 
                                    color: comp.status === 'in-progress' ? '#6366F1' : '#6b7280'
                                  }} 
                                  strokeWidth={1.5} 
                                />
                              )}
                            </div>

                            {/* Main Info */}
                            <div className="flex-1 min-w-0 w-full">
                              {/* Cards informativos */}
                              <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-3">
                                {/* Card Área */}
                                <div 
                                  className="rounded-lg px-2 py-1.5 md:px-2.5 md:py-2 flex items-center gap-1.5 md:gap-2 w-full sm:w-auto"
                                  style={{
                                    backgroundColor: comp.categoryColor,
                                  }}
                                >
                                  <div 
                                    className="w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center flex-shrink-0 bg-white/20"
                                  >
                                    <Layers className="text-white w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
                                  </div>
                                  <div className="flex-1 min-w-0 hidden md:block">
                                    <p className="text-[8px] md:text-[10px] uppercase font-semibold leading-none mb-0.5 text-white/90">Área</p>
                                    <p className="text-[8px] md:text-xs text-white font-medium leading-tight truncate">
                                      {comp.category}
                                    </p>
                                  </div>
                                  <p className="md:hidden text-[8px] text-white font-medium leading-tight truncate">
                                    {comp.category.split(' ')[0]}
                                  </p>
                                </div>

                                {/* Card Competência */}
                                <div 
                                  className="rounded-lg px-2 py-1.5 md:px-2.5 md:py-2 flex items-center gap-1.5 md:gap-2 w-full sm:w-auto"
                                  style={{
                                    backgroundColor: comp.categoryColor,
                                  }}
                                >
                                  <div 
                                    className="w-5 h-5 md:w-6 md:h-6 rounded flex items-center justify-center flex-shrink-0 bg-white/20"
                                  >
                                    <Award className="text-white w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
                                  </div>
                                  <div className="flex-1 min-w-0 hidden md:block">
                                    <p className="text-[8px] md:text-[10px] uppercase font-semibold leading-none mb-0.5 text-white/90">Competência</p>
                                    <p className="text-[8px] md:text-xs text-white font-medium leading-tight">
                                      {comp.title}
                                    </p>
                                  </div>
                                  <p className="md:hidden text-[8px] text-white font-medium leading-tight line-clamp-1">
                                    {comp.title.length > 25 ? comp.title.substring(0, 22) + '...' : comp.title}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Completed Details */}
                              {comp.completed && (
                                <div className="space-y-3">
                                  {/* Stats Row */}
                                  <div className="grid grid-cols-2 sm:flex sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
                                    {/* Stars - sem texto no mobile */}
                                    <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                      {[1, 2, 3].map((starNum) => (
                                        <Star
                                          key={starNum}
                                          className={`w-4 h-4 transition-all duration-300 ${
                                            starNum <= comp.starsEarned
                                              ? 'fill-[#FFD700] text-[#FFD700]'
                                              : 'fill-none text-gray-300'
                                          }`}
                                          strokeWidth={1.5}
                                        />
                                      ))}
                                      <span className="hidden sm:inline ml-1 text-xs sm:text-sm font-bold text-gray-700">
                                        {comp.starsEarned}/3 estrelas
                                      </span>
                                    </div>
                                    
                                    {/* Date */}
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                      <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">{comp.completedDate}</span>
                                    </div>
                                    
                                    {/* Time Spent - Single Line */}
                                    <div className="flex items-center gap-1.5 px-2.5 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 whitespace-nowrap">
                                      <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-500 flex-shrink-0" />
                                      <span className="text-[10px] md:text-xs font-medium text-gray-700 dark:text-gray-200">{comp.timeSpent}</span>
                                    </div>
                                    
                                    {/* Digcoins Earned */}
                                    <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                      <Coins className="w-4 h-4 text-[#8B27FF] flex-shrink-0" />
                                      <span className="text-xs sm:text-sm font-bold text-[#8B27FF] whitespace-nowrap">
                                        +{comp.digcoinsEarned} <span className="text-[10px] font-semibold">Digcoins</span>
                                      </span>
                                    </div>
                                  </div>

                                  {/* View Result Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewResult(comp);
                                    }}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-white dark:bg-gray-700 border-2 border-green-400 dark:border-green-500 text-green-700 dark:text-green-400 rounded-xl hover:bg-green-50 dark:hover:bg-gray-600 hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg transition-all text-sm sm:text-base font-bold group-hover:scale-105"
                                  >
                                    <Eye className="w-4 h-4 flex-shrink-0" />
                                    <span>Ver resultado detalhado</span>
                                  </button>
                                </div>
                              )}

                              {/* In Progress Details - Timer e Botão embaixo dos cards */}
                              {!comp.completed && comp.status === 'in-progress' && (
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                  {/* Botão Continuar - Índigo */}
                                  {handleStartChallenge && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartChallenge(comp);
                                      }}
                                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg transition-all text-sm sm:text-base font-bold"
                                    >
                                      <PlayCircle className="w-4 h-4 flex-shrink-0" />
                                      <span>Continuar</span>
                                    </button>
                                  )}
                                  
                                  {/* Timer ao lado */}
                                  <CompetencyTimer 
                                    competencyName={comp.title}
                                    mockTime={comp.title === 'Colaborar' ? 1800 : undefined}
                                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                                  />
                                </div>
                              )}

                              {/* Not Started - Botão Iniciar */}
                              {!comp.completed && comp.status === 'not-started' && (
                                <div className="mt-2">
                                  {handleStartChallenge && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartChallenge(comp);
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

                            {/* Status Badge */}
                            {!comp.completed && comp.status === 'in-progress' && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-sm">
                                <Clock className="w-3 h-3" />
                                <span>Em progresso</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}