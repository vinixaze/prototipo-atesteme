import React from "react";
import { AlertTriangle, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getDaysUntilUnblock } from "../../../utils/competencyStorage";
// Blocked Competency Modal Component
export default function BlockedCompetencyModal({
  isOpen,
  onClose,
  onGoToContents,
  competency,
  category,
  categoryColor,
  icon: Icon,
}: {
  isOpen: boolean;
  onClose: () => void;
  onGoToContents: () => void;
  competency: string;
  category: string;
  categoryColor: string;
  icon: LucideIcon;
}) {
  if (!isOpen) return null;

  const daysUntilUnblock = getDaysUntilUnblock(competency);

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reforço Necessário</h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          A competência <strong>{competency}</strong> precisa de reforço. Acesse os conteúdos relacionados antes
          de tentar novamente.
        </p>

        {daysUntilUnblock > 0 && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Disponível em{" "}
                <span className="font-bold text-[#8B27FF] dark:text-[#A855F7]">
                  {daysUntilUnblock} {daysUntilUnblock === 1 ? "dia" : "dias"}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-all"
          >
            Fechar
          </button>
          <button
            onClick={onGoToContents}
            className="flex-1 px-4 py-2 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
          >
            Ver Conteúdos
          </button>
        </div>
      </div>
    </div>
  );
}
