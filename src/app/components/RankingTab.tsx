import {
  Trophy,
  Coins,
  Crown,
  Medal,
  CheckCircle2,
  Zap,
  Star,
  Info,
} from "lucide-react";
import { useMemo, useState } from "react";

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
  school?: string;
  seduc?: string;
  regional?: string;
  schoolName?: string;
  turma?: string;
}

interface RankingTabProps {
  rankingCategory: "escola" | "turma" | "rede";
  setRankingCategory: (category: "escola" | "turma" | "rede") => void;
  rankingData: {
    escola: RankingUser[];
    turma: RankingUser[];
    rede: RankingUser[];
  };
}

export default function RankingTab({
  rankingCategory,
  setRankingCategory,
  rankingData,
}: RankingTabProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RankingUser | null>(null);

  function shortenName(name: string) {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length <= 2) return parts.join(" ");
    return `${parts[0]} ${parts[parts.length - 1]}`;
  }

  // Recalcula ranking (ordena + reatribui posições).
  // Isso evita inconsistências do tipo "2º na turma e 1º na escola".
  const normalizedRankingData = useMemo(() => {
    // 1) "Fonte da verdade" por aluno (prioridade: TURMA > ESCOLA > REDE)
    // Obs: aqui usamos o nome como chave. Ideal seria um ID único.
    const byName = new Map<string, RankingUser>();

    const keyOf = (u: RankingUser) => (u.name || "").trim().toLowerCase();

    const putIfMissing = (u: RankingUser) => {
      const key = keyOf(u);
      if (!key) return;
      if (!byName.has(key)) byName.set(key, u);
    };

    // Prioridade: TURMA primeiro
    (rankingData.turma || []).forEach(putIfMissing);
    (rankingData.escola || []).forEach(putIfMissing);
    (rankingData.rede || []).forEach(putIfMissing);

    // 2) Hidrata listas usando os números do "banco" (consistência visual)
    const hydrate = (arr: RankingUser[]) =>
      (arr || []).map((u) => {
        const key = keyOf(u);
        const base = byName.get(key);
        if (!base) return u;

        return {
          ...u,
          // usa valores consistentes
          points: base.points,
          digcoins: base.digcoins,
          medals: base.medals,
          level: base.level,
          levelProgress: base.levelProgress,
          avgTime: base.avgTime,
        };
      });

    // 3) Normaliza: ordena e recalcula posições
    const normalize = (arr: RankingUser[]) => {
      const copy = [...(arr || [])];

      copy.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.digcoins !== a.digcoins) return b.digcoins - a.digcoins;
        if (b.medals !== a.medals) return b.medals - a.medals;
        return (a.name || "").localeCompare(b.name || "");
      });

      return copy.map((u, i) => ({ ...u, position: i + 1 }));
    };

    const turma = normalize(hydrate(rankingData.turma || []));
    const escola = normalize(hydrate(rankingData.escola || []));
    const rede = normalize(hydrate(rankingData.rede || []));

    return { turma, escola, rede };
  }, [rankingData]);

  const currentList = normalizedRankingData[rankingCategory] || [];
  const podium = currentList.slice(0, 3);
  const hasPodium = podium.length >= 3;


  return (
    <div className="animate-fadeIn overflow-x-visible">
      <div className="mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Ranking
          </h2>

          <div className="flex items-center gap-2 text-sm text-[#8B27FF] dark:text-[#A855F7]">
            <Crown className="w-4 h-4" />
            <span className="font-semibold">Veja sua posição nos rankings da escola, turma e rede</span>
          </div>
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Organização
              </h3>
              <button
                onClick={() => setShowInfo(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Hierarquia para REDE */}
            {rankingCategory === "rede" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
                  <span className="text-lg">🌐</span>
                  <span className="font-bold text-sm text-purple-900 dark:text-purple-300">
                    Ranking de Rede
                  </span>
                </div>

                <div className="space-y-1.5 pl-2">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      SEDUC
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Regional 1
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Escola
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      4
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Turma
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg border-2 border-purple-300 dark:border-purple-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      5
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Aluno
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Hierarquia para ESCOLA */}
            {rankingCategory === "escola" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
                  <span className="text-lg">🏫</span>
                  <span className="font-bold text-sm text-purple-900 dark:text-purple-300">
                    Ranking de Escola
                  </span>
                </div>

                <div className="space-y-1.5 pl-2">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Escola
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Turma
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg border-2 border-purple-300 dark:border-purple-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Aluno
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Hierarquia para TURMA */}
            {rankingCategory === "turma" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
                  <span className="text-lg">👥</span>
                  <span className="font-bold text-sm text-purple-900 dark:text-purple-300">
                    Ranking de Turma
                  </span>
                </div>

                <div className="space-y-1.5 pl-2">
                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Escola
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Turma
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg border-2 border-purple-300 dark:border-purple-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-md flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Aluno
                    </p>
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Informações do Aluno
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Nome</p>
              <p className="text-base font-bold text-gray-900 dark:text-white">
                {selectedUser.name}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border border-purple-200 dark:border-purple-700">
                <div className="w-8 h-8 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 mb-0.5">
                    SEDUC
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {selectedUser.seduc || "Garanhuns"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-xl border border-cyan-200 dark:border-cyan-700">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-cyan-900 dark:text-cyan-300 mb-0.5">
                    REGIONAL
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {selectedUser.regional || "Regional 1"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-700">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-300 mb-0.5">
                    ESCOLA
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {selectedUser.schoolName || "Escola Municipal Castro Alves"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border border-orange-200 dark:border-orange-700">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-orange-900 dark:text-orange-300 mb-0.5">
                    TURMA
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {selectedUser.turma || "8ºA"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 mb-6 items-center relative z-20">
        <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:gap-2">
          <button
            onClick={() => setRankingCategory("turma")}
            className={`
              min-w-0 overflow-hidden
              flex items-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md
              text-sm sm:text-base
              w-full sm:w-auto
              justify-center
              ${rankingCategory === "turma"
                ? "bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400"
              }
          `}
          >
            <span className="flex-shrink-0 text-lg sm:text-xl">👥</span>
            <span className="min-w-0 whitespace-normal break-words leading-tight text-center">
              Turma
            </span>
          </button>

          <button
            onClick={() => setRankingCategory("escola")}
            className={`
              min-w-0 overflow-hidden
              flex items-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md
              text-sm sm:text-base
              w-full sm:w-auto
              justify-center
              ${rankingCategory === "escola"
                ? "bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400"
              }
              `}
          >
            <span className="flex-shrink-0 text-lg sm:text-xl">🏫</span>
            <span className="min-w-0 whitespace-normal break-words leading-tight text-center">
              Escola
            </span>
          </button>

          <button
            onClick={() => setRankingCategory("rede")}
            className={`
              min-w-0 overflow-hidden
              flex items-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all font-semibold shadow-md
              text-sm sm:text-base
              w-full sm:w-auto
              justify-center
              ${rankingCategory === "rede"
                ? "bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-300 scale-105"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400"
              }
            `}
          >
            <span className="flex-shrink-0 text-lg sm:text-xl">🌐</span>
            <span className="min-w-0 whitespace-normal break-words leading-tight text-center">
              Rede
            </span>
          </button>
        </div>

        {/* Desktop — Escola */}
        {rankingCategory === "escola" && normalizedRankingData.escola.length > 0 && (
          <div className="hidden sm:flex items-center ml-auto px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {normalizedRankingData.escola[0].schoolName ||
                "Escola Municipal Castro Alves"}
            </span>
          </div>
        )}

        {/* Desktop — Turma */}
        {rankingCategory === "turma" && normalizedRankingData.turma.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {normalizedRankingData.turma[0].schoolName ||
                  "Escola Municipal Castro Alves"}
              </span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border-2 border-orange-200 dark:border-orange-700">
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                {normalizedRankingData.turma[0].turma || "8ºA"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Contexto do Ranking - Mobile */}
      <div className="sm:hidden mb-4 px-3">
        {rankingCategory === "escola" && normalizedRankingData.escola.length > 0 && (
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
            🏫{" "}
            {normalizedRankingData.escola[0].schoolName ||
              "Escola Municipal Castro Alves"}
          </div>
        )}

        {rankingCategory === "turma" && normalizedRankingData.turma.length > 0 && (
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
              🏫{" "}
              {normalizedRankingData.turma[0].schoolName ||
                "Escola Municipal Castro Alves"}
            </div>
            <div className="mt-1 whitespace-normal break-words">
              👥 {normalizedRankingData.turma[0].turma || "8ºA"}
            </div>
          </div>
        )}
      </div>

      {/* Pódio Visual */}
      {hasPodium && (
        <div className="mb-8 px-2 pt-16 sm:pt-0 relative z-0">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
            {/* 2º Lugar */}
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
                {podium[1].name.split(" ")[0]}
              </p>
              <p className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-semibold">
                {podium[1].points} pts
              </p>
              <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-[#8B27FF] font-bold">
                <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{podium[1].digcoins}</span>
              </div>
            </div>

            {/* 1º Lugar */}
            <div className="flex flex-col items-center group pt-8 sm:pt-0">
              <div className="relative mb-2 sm:mb-4">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-4xl font-bold shadow-2xl ring-2 sm:ring-4 ring-yellow-300 ring-offset-2 sm:ring-offset-4 group-hover:scale-110 transition-transform animate-pulse-slow">
                  {podium[0].avatar}
                </div>
                <div className="absolute top-0 sm:-top-12 left-1/2 -translate-x-1/2">
                  <Crown
                    className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-500 animate-bounce"
                    fill="#FFD700"
                  />
                </div>

                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-9 h-9 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm sm:text-xl font-bold shadow-xl">
                  1
                </div>
              </div>
              <p className="text-center text-sm sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-0.5 sm:mb-1 truncate w-full px-1">
                {podium[0].name.split(" ")[0]}
              </p>
              <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 font-bold">
                {podium[0].points} pts
              </p>
              <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm text-[#8B27FF] font-bold">
                <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{podium[0].digcoins}</span>
              </div>
            </div>

            {/* 3º Lugar */}
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
                {podium[2].name.split(" ")[0]}
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
      )}

      {/* Lista de Ranking Completa */}
      <div className="space-y-3 px-2 sm:px-0">
        {currentList.map((user, index) => {
          const isTop3 = user.position <= 3;

          const positionGradient =
            user.position === 1
              ? "from-yellow-400 to-yellow-600"
              : user.position === 2
                ? "from-gray-300 to-gray-500"
                : user.position === 3
                  ? "from-orange-400 to-orange-600"
                  : "from-purple-100 to-purple-200";

          return (
            <div
              key={index}
              className={`
                relative rounded-2xl transition-all duration-300
                overflow-visible
                ${user.isCurrentUser
                  ? "bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-purple-900/20 ring-2 ring-[#8B27FF] shadow-xl"
                  : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg hover:-translate-y-1"
                }
              `}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl bg-gradient-to-b ${positionGradient}`}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(user);
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
                      : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 text-sm sm:text-lg"
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
                      ? "bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] ring-2 sm:ring-4 ring-purple-300"
                      : "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600"
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
                            ? "text-[#8B27FF]"
                            : "text-gray-900 dark:text-gray-100"
                            }`}
                        >
                          {shortenName(user.name)}
                        </p>
                        <p
                          className={`block sm:hidden text-sm font-bold ${user.isCurrentUser
                            ? "text-[#8B27FF]"
                            : "text-gray-900 dark:text-gray-100"
                            }`}
                        >
                          {user.name.split(" ")[0]}
                        </p>
                      </>

                      {user.isCurrentUser && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white text-[10px] sm:text-xs rounded-full font-bold shadow-md">
                          VOCÊ
                        </span>
                      )}

                      {isTop3 && !user.isCurrentUser && (
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
                      )}
                    </div>

                    {rankingCategory === "escola" && user.turma && (
                      <span className="text-[10px] sm:text-xs text-orange-700 dark:text-orange-400 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-800/30 px-2.5 py-0.5 rounded-md font-bold border border-orange-300 dark:border-orange-700">
                        {user.turma}
                      </span>
                    )}

                    {rankingCategory === "rede" && user.school && (
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
                          Nível {user.level}
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
                      <Crown
                        className="w-10 h-10 text-yellow-500"
                        fill="#FFD700"
                      />
                    )}
                    {user.position === 2 && (
                      <Trophy
                        className="w-10 h-10 text-gray-400"
                        fill="#D1D5DB"
                      />
                    )}
                    {user.position === 3 && (
                      <Trophy
                        className="w-10 h-10 text-orange-500"
                        fill="#FB923C"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
