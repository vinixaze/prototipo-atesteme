import { LockOpen, Medal, Zap } from 'lucide-react';

export function ConquistasSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="relative bg-gradient-to-r from-[#F0ABFC] to-[#E879F9] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group">
        <Zap
          className="absolute top-3 right-3 w-[50px] h-[50px] text-white opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          strokeWidth={2}
        />
        <div className="relative z-10">
          <div className="text-[44px] font-bold text-white leading-none mb-1">
            10/40
          </div>
          <div className="text-[13px] font-medium text-white/90">
            Missões Concluídas
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-[#9CA3AF] to-[#6B7280] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group">
        <div className="absolute top-3 right-3 w-[45px] h-[45px]">
          <LockOpen
            className="w-[45px] h-[45px] text-white opacity-50 transition-opacity duration-300"
            strokeWidth={2}
          />

          <Zap
            className="absolute top-[23px] left-1/2 -translate-x-1/2 w-[16px] h-[16px] text-white opacity-80"
            strokeWidth={2.5}
            fill="white"
          />
        </div>

        <div className="relative z-10">
          <div className="text-[44px] font-bold text-white leading-none mb-1">
            2/30
          </div>
          <div className="text-[13px] font-medium text-white/90">
            Missões Desbloqueadas
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-[20px] p-5 min-h-[100px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-lg hover:shadow-xl group">
        <Medal
          className="absolute top-3 right-3 w-[50px] h-[50px] text-white opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          strokeWidth={2}
        />
        <div className="relative z-10">
          <div className="text-[44px] font-bold text-white leading-none mb-1">11</div>
          <div className="text-[13px] font-medium text-white/90">Medalhas</div>
        </div>
      </div>
    </div>
  );
}
