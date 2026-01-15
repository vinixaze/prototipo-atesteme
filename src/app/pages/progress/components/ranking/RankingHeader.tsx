import { Crown } from 'lucide-react';

export default function RankingHeader() {
  return (
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
  );
}
