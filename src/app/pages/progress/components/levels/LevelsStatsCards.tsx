import { CheckCircle2, LockOpen, Star } from 'lucide-react';

interface LevelsStatsCardsProps {
  completedCompetencies: number;
  totalCompetencies: number;
  starsEarned: number;
  maxStars: number;
  unlockedLevels: number;
  totalLevels: number;
}

export default function LevelsStatsCards({
  completedCompetencies,
  totalCompetencies,
  starsEarned,
  maxStars,
  unlockedLevels,
  totalLevels,
}: LevelsStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="relative bg-gradient-to-r from-[#9333EA] to-[#7E22CE] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl">
        <CheckCircle2
          className="absolute top-3 right-3 w-[45px] h-[45px] text-white opacity-40 transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110"
          strokeWidth={2}
        />

        <div className="relative z-10">
          <div className="text-[44px] font-bold text-white leading-none mb-1">
            {completedCompetencies}/{totalCompetencies}
          </div>
          <div className="text-[13px] font-medium text-white/90">
            Competências Conquistadas
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-[#F0ABFC] to-[#E879F9] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group">
        <Star
          className="absolute top-3 right-3 w-[45px] h-[45px] opacity-40 transition-transform duration-300 group-hover:scale-110"
          style={{ color: '#3b034eff' }}
          fill="currentColor"
        />

        <div className="relative z-10">
          <div className="text-[44px] font-bold text-white leading-none mb-1">
            {starsEarned}/{maxStars}
          </div>
          <div className="text-[13px] font-medium text-white/90">
            Estrelas Recebidas
          </div>
        </div>
      </div>

      <div
        className="relative bg-gradient-to-r from-[#9CA3AF] to-[#6B7280] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
        style={{ cursor: 'not-allowed' }}
      >
        <LockOpen
          className="absolute top-3 right-3 w-[45px] h-[45px] text-white opacity-50"
          strokeWidth={2}
        />

        <div className="relative z-10">
          <div className="text-[44px] font-bold text-white leading-none mb-1">
            {unlockedLevels}/{totalLevels}
          </div>
          <div className="text-[13px] font-medium text-white/90">
            Competências Desbloqueadas
          </div>
        </div>
      </div>
    </div>
  );
}
