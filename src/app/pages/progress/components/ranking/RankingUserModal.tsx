import { RankingUser } from '../../types';

interface RankingUserModalProps {
  user: RankingUser | null;
  onClose: () => void;
}

export default function RankingUserModal({ user, onClose }: RankingUserModalProps) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
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

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">Nome</p>
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {user.name}
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
                {user.seduc || 'Garanhuns'}
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
                {user.regional || 'Regional 1'}
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
                {user.schoolName || 'Escola Municipal Castro Alves'}
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
                {user.turma || '8¶§A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
