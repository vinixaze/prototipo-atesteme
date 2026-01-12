import { Wallet } from 'lucide-react';

interface DigcoinsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToProgress?: () => void;
}

export default function DigcoinsDropdown({ isOpen, onNavigateToProgress }: DigcoinsDropdownProps) {
  const digcoinsHistory = [
    { id: 1, activity: "Quiz de Informações e Dados", coins: 50, date: "22/12/2024" },
    { id: 2, activity: "Conquista: Primeira Competência", coins: 100, date: "20/12/2024" },
    { id: 3, activity: "Quiz de Comunicação", coins: 50, date: "18/12/2024" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mt-2 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative -top-5">
            <Wallet className="w-6 h-6 text-white" />
          </div>

          <div>
            <p className="text-sm text-white/90">Saldo Atual</p>
            <p className="text-2xl font-bold text-white">
              1247 Pontos
            </p>
            <button
              onClick={() => {
                onNavigateToProgress?.();
              }}
              className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm py-2 rounded-lg transition-colors"
            >
              Ver mais
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          Histórico Recente
        </h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {digcoinsHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.activity}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.date}
                </p>
              </div>
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                +{item.coins}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

