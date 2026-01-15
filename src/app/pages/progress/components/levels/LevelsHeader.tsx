import { Target } from 'lucide-react';

export default function LevelsHeader() {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-[28px] font-bold text-[#333] dark:text-gray-200 mb-3">
        Competências por Nível
      </h2>
      <div className="flex items-center gap-2 text-sm text-[#8B27FF] dark:text-[#A855F7]">
        <Target className="w-4 h-4" />
        <span className="font-semibold">Complete os desafios nas 16 competências para desbloquear o próximo Nível</span>
      </div>
    </div>
  );
}
