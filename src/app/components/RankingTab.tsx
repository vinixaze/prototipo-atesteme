import { Trophy, Coins, Crown, Award, Clock, TrendingUp, Zap, Star, Info } from 'lucide-react';
import { useState } from 'react';

interface RankingUser {
  position: number;
  name: string;
  points: number;
  digcoins: number;
  level: number;
  levelProgress: number;
  medals: number;
  avgTime: string;
  isCurrentUser: boolean;
  avatar: string;
  school?: string; // Nome da escola/organização (apenas para ranking de rede)
  seduc?: string; // SEDUC
  regional?: string; // Regional
  schoolName?: string; // Nome da escola
  turma?: string; // Turma (ex: 6ºA, 7ºB, etc)
}

interface RankingTabProps {
  rankingCategory: 'escola' | 'turma' | 'rede';
  setRankingCategory: (category: 'escola' | 'turma' | 'rede') => void;
  rankingData: {
    escola: RankingUser[];
    turma: RankingUser[];
    rede: RankingUser[];
  };
}

export default function RankingTab({ rankingCategory, setRankingCategory, rankingData }: RankingTabProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RankingUser | null>(null);

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <div>
          <h2 className="text-3xl text-gray-800 dark:text-gray-200 mb-2">Ranking de Desempenho</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Veja sua posição nos rankings da escola, turma e rede
          </p>
        </div>
      </div>

      {/* Modal de Informações */}
      {showInfo && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowInfo(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-5 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Organização</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Hierarquia para REDE */}
            {rankingCategory === 'rede' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
                  <span className="text-lg">🌐</span>
                  <span className="font-bold text-sm text-purple-900 dark:text-purple-300">Ranking de Rede</span>
                </div>
                
                <div className="space-y-1.5 pl-2">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-md flex items-center justify-center text-white text-xs font-bold">1</div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">SEDUC</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-md flex items-center justify-center text-white text-xs font-bold">2</div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Regional 1</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-md flex items-center justify-center text-white text-xs font-bold">3</div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Escola</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-md flex items-center justify-center text-white text-xs font-bold">4</div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Turma</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg border-2 border-purple-300 dark:border-purple-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-md flex items-center justify-center text-white text-xs font-bold">5</div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Aluno</p>
                  </div>
                </div>
              </div>
            )}

            {/* Hierarquia para ESCOLA */}
            {rankingCategory === 'escola' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
                  <span className="text-lg">🏫</span>
                  <span className="font-bold text-sm text-purple-900 dark:text-purple-300">Ranking de Escola</span>
                </div>
                
                <div className="space-y-1.5 pl-2">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-md flex items-center justify-center text-white text-xs font-bold">1</div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Escola</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-md flex items-center justify-center text-white text-xs font-bold">2</div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Turma</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg border-2 border-purple-300 dark:border-purple-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-md flex items-center justify-center text-white text-xs font-bold">3</div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Aluno</p>
                  </div>
                </div>
              </div>
            )}

            {/* Hierarquia para TURMA */}
            {rankingCategory === 'turma' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
                  <span className="text-lg">👥</span>
                  <span className="font-bold text-sm text-purple-900 dark:text-purple-300">Ranking de Turma</span>
                </div>
                
                <div className="space-y-1.5 pl-2">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-md flex items-center justify-center text-white text-xs font-bold">1</div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Escola</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-md flex items-center justify-center text-white text-xs font-bold">2</div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Turma</p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg border-2 border-purple-300 dark:border-purple-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-md flex items-center justify-center text-white text-xs font-bold">3</div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Aluno</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Informações do Aluno */}
      {selectedUser && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Informações do Aluno</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {/* SEDUC */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border border-purple-200 dark:border-purple-700">
                <div className="w-8 h-8 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 mb-0.5">SEDUC</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedUser.seduc || 'Garanhuns'}</p>
                </div>
              </div>

              {/* Regional */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-xl border border-cyan-200 dark:border-cyan-700">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-cyan-900 dark:text-cyan-300 mb-0.5">REGIONAL</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedUser.regional || 'Regional 1'}</p>
                </div>
              </div>

              {/* Escola */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-700">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-300 mb-0.5">ESCOLA</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedUser.schoolName || 'Escola Municipal Castro Alves'}</p>
                </div>
              </div>

              {/* Turma */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border border-orange-200 dark:border-orange-700">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-orange-900 dark:text-orange-300 mb-0.5">TURMA</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedUser.turma || '8ºA'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setRankingCategory('turma')}
            className={`
              flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md flex-shrink-0 text-sm sm:text-base
              ${rankingCategory === 'turma'
                ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400'
              }
            `}
          >
            <span className="text-lg sm:text-xl">👥</span>
            <span>Turma</span>
          </button>
          <button
            onClick={() => setRankingCategory('escola')}
            className={`
              flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md flex-shrink-0 text-sm sm:text-base
              ${rankingCategory === 'escola'
                ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400'
              }
            `}
          >
            <span className="text-lg sm:text-xl">🏫</span>
            <span>Escola</span>
          </button>
          <button
            onClick={() => setRankingCategory('rede')}
            className={`
              flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md flex-shrink-0 text-sm sm:text-base
              ${rankingCategory === 'rede'
                ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400'
              }
            `}
          >
            <span className="text-lg sm:text-xl">🌐</span>
            <span>Rede</span>
          </button>
        </div>
        
        {/* Nome da Escola - Aparece apenas no ranking de Escola */}
        {rankingCategory === 'escola' && rankingData.escola.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 ml-auto px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {rankingData.escola[0].schoolName || 'Escola Municipal Castro Alves'}
            </span>
          </div>
        )}
        
        {/* Nome da Escola e Turma - Aparece apenas no ranking de Turma */}
        {rankingCategory === 'turma' && rankingData.turma.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {rankingData.turma[0].schoolName || 'Escola Municipal Castro Alves'}
              </span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border-2 border-orange-200 dark:border-orange-700">
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                {rankingData.turma[0].turma || '8ºA'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Pódio Visual */}
      <div className="mb-8 px-2">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
          {/* 2º Lugar */}
          <div className="flex flex-col items-center mt-6 sm:mt-8 group">
            <div className="relative mb-2 sm:mb-4">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-xl ring-2 sm:ring-4 ring-gray-200 ring-offset-1 sm:ring-offset-2 group-hover:scale-110 transition-transform">
                {rankingData[rankingCategory][1].avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs sm:text-base font-bold shadow-lg">
                2
              </div>
            </div>
            <p className="text-center text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-0.5 sm:mb-1 truncate w-full px-1">
              {rankingData[rankingCategory][1].name.split(' ')[0]}
            </p>
            <p className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-semibold">{rankingData[rankingCategory][1].points} pts</p>
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-[#8B27FF] font-bold">
              <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{rankingData[rankingCategory][1].digcoins}</span>
            </div>
          </div>

          {/* 1º Lugar */}
          <div className="flex flex-col items-center group pt-8 sm:pt-0">
            <div className="relative mb-2 sm:mb-4">
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-4xl font-bold shadow-2xl ring-2 sm:ring-4 ring-yellow-300 ring-offset-2 sm:ring-offset-4 group-hover:scale-110 transition-transform animate-pulse-slow">
                {rankingData[rankingCategory][0].avatar}
              </div>
              <div className="absolute -top-8 sm:-top-12 left-1/2 transform -translate-x-1/2">
                <Crown className="w-7 h-7 sm:w-10 sm:h-10 text-yellow-500 animate-bounce" fill="#FFD700" />
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-9 h-9 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm sm:text-xl font-bold shadow-xl">
                1
              </div>
            </div>
            <p className="text-center text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-0.5 sm:mb-1 truncate w-full px-1">
              {rankingData[rankingCategory][0].name.split(' ')[0]}
            </p>
            <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 font-bold">{rankingData[rankingCategory][0].points} pts</p>
            <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm text-[#8B27FF] font-bold">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{rankingData[rankingCategory][0].digcoins}</span>
            </div>
          </div>

          {/* 3º Lugar */}
          <div className="flex flex-col items-center mt-9 sm:mt-12 group">
            <div className="relative mb-2 sm:mb-4">
              <div className="w-12 h-12 sm:w-18 sm:h-18 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-base sm:text-xl font-bold shadow-lg ring-2 sm:ring-4 ring-orange-200 ring-offset-1 sm:ring-offset-2 group-hover:scale-110 transition-transform">
                {rankingData[rankingCategory][2].avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-9 sm:h-9 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center text-white text-xs sm:text-base font-bold shadow-md">
                3
              </div>
            </div>
            <p className="text-center text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mb-0.5 sm:mb-1 truncate w-full px-1">
              {rankingData[rankingCategory][2].name.split(' ')[0]}
            </p>
            <p className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-semibold">{rankingData[rankingCategory][2].points} pts</p>
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-[#8B27FF] font-bold">
              <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{rankingData[rankingCategory][2].digcoins}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Ranking Completa */}
      <div className="space-y-3">
        {rankingData[rankingCategory].map((user, index) => {
          const isTop3 = user.position <= 3;
          const positionGradient = 
            user.position === 1 ? 'from-yellow-400 to-yellow-600' :
            user.position === 2 ? 'from-gray-300 to-gray-500' :
            user.position === 3 ? 'from-orange-400 to-orange-600' :
            'from-purple-100 to-purple-200';

          return (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-2xl transition-all duration-300
                ${user.isCurrentUser
                  ? 'bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-purple-900/20 border-3 border-[#8B27FF] shadow-xl scale-105'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg hover:-translate-y-1 hover:scale-102'
                }
              `}
            >
              {/* Barra decorativa lateral */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${positionGradient}`}
              />

              {/* Botão de Informações do Aluno */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(user);
                }}
                className="absolute top-3 right-3 w-7 h-7 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9D3FFF] text-white rounded-full flex items-center justify-center transition-all shadow-md hover:scale-110 z-10"
              >
                <Info className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 p-5 pl-6">
                {/* Position Badge */}
                <div
                  className={`
                    flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold shadow-lg
                    transition-transform hover:scale-110
                    ${isTop3 ? `bg-gradient-to-br ${positionGradient} text-white text-base sm:text-xl` : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 text-sm sm:text-lg'}`}
                >
                  {user.position}
                </div>

                {/* Avatar */}
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

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <p className={`text-sm sm:text-lg font-bold ${user.isCurrentUser ? 'text-[#8B27FF]' : 'text-gray-900 dark:text-gray-100'}`}>
                        {user.name}
                      </p>
                      {user.isCurrentUser && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white text-[10px] sm:text-xs rounded-full font-bold shadow-md animate-pulse">
                          VOCÊ
                        </span>
                      )}
                      {isTop3 && !user.isCurrentUser && (
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
                      )}
                    </div>
                    {/* Turma - apenas para ranking de escola */}
                    {rankingCategory === 'escola' && user.turma && (
                      <span className="text-[10px] sm:text-xs text-orange-700 dark:text-orange-400 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-800/30 px-2.5 py-0.5 rounded-md font-bold border border-orange-300 dark:border-orange-700">
                        {user.turma}
                      </span>
                    )}
                    {/* Nome da escola - apenas para ranking de rede */}
                    {rankingCategory === 'rede' && user.school && (
                      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md font-medium">
                        {user.school}
                      </span>
                    )}
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3">
                    {/* Nível e Progresso */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-purple-200 dark:border-purple-700">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                        <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600 dark:text-purple-400" />
                        <span className="text-[10px] sm:text-xs font-semibold text-purple-900 dark:text-purple-300">Nível {user.level}</span>
                      </div>
                      <div className="h-1 sm:h-1.5 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${user.levelProgress}%` }}
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs text-purple-700 dark:text-purple-300 font-bold mt-0.5">{user.levelProgress}%</p>
                    </div>

                    {/* Digcoins */}
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-yellow-200 dark:border-yellow-700">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                        <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-[10px] sm:text-xs font-semibold text-yellow-900 dark:text-yellow-300 truncate">Digcoins</span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-yellow-700 dark:text-yellow-300">{user.digcoins}</p>
                    </div>

                    {/* Medalhas */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-blue-200 dark:border-blue-700">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-[10px] sm:text-xs font-semibold text-blue-900 dark:text-blue-300 truncate">Medalhas</span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300">{user.medals}</p>
                    </div>

                    {/* Estrelas */}
                    <div className="bg-gradient-to-br from-pink-50 to-fuchsia-100 dark:from-fuchsia-900/30 dark:to-pink-800/30 rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-pink-200 dark:border-fuchsia-700">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-fuchsia-600 dark:text-fuchsia-400 fill-fuchsia-600 dark:fill-fuchsia-400" />
                        <span className="text-[10px] sm:text-xs font-semibold text-fuchsia-900 dark:text-fuchsia-300 truncate">Estrelas</span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-fuchsia-700 dark:text-fuchsia-300">{user.avgTime}</p>
                    </div>
                  </div>
                </div>

                {/* Medal Icon for Top 3 - Hidden on mobile */}
                {isTop3 && (
                  <div className="hidden sm:flex flex-shrink-0 animate-bounce-slow">
                    {user.position === 1 && <Crown className="w-10 h-10 text-yellow-500" fill="#FFD700" />}
                    {user.position === 2 && <Trophy className="w-10 h-10 text-gray-400" fill="#D1D5DB" />}
                    {user.position === 3 && <Trophy className="w-10 h-10 text-orange-500" fill="#FB923C" />}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}