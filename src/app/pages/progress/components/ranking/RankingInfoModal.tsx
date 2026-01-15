import { Globe, School, Users } from 'lucide-react';

interface RankingInfoModalProps {
  isOpen: boolean;
  rankingCategory: 'escola' | 'turma' | 'rede';
  onClose: () => void;
}

export default function RankingInfoModal({
  isOpen,
  rankingCategory,
  onClose,
}: RankingInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
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
            onClick={onClose}
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

        {rankingCategory === 'rede' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
              <Globe className="w-5 h-5 text-purple-700 dark:text-purple-300" aria-hidden="true" />
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

        {rankingCategory === 'escola' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
              <School className="w-5 h-5 text-purple-700 dark:text-purple-300" aria-hidden="true" />
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

        {rankingCategory === 'turma' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-600">
              <Users className="w-5 h-5 text-purple-700 dark:text-purple-300" aria-hidden="true" />
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
  );
}
