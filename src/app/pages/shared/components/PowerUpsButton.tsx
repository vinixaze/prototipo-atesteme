import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Shield,
  Sparkles,
  RotateCcw,
  TimerReset,
  Wand2,
  X,
} from "lucide-react";
import {
  getUserInventory,
  usePowerUp,
  type PowerUp,
} from "../../../utils/powerupsStorage";

type PowerUpDetail = {
  icon: typeof Sparkles;
  description: string;
};

const POWERUP_DETAILS: Record<PowerUp["type"], PowerUpDetail> = {
  retry: {
    icon: RotateCcw,
    description: "Tente novamente",
  },
  shield: {
    icon: Shield,
    description: "Elimina opção incorreta",
  },
  "unlock-theory": {
    icon: BookOpen,
    description: "Link de conteúdo",
  },
  "check-answer": {
    icon: CheckCircle2,
    description: "Mostra a resposta correta",
  },
  "reset-time": {
    icon: TimerReset,
    description: "Tempo extra",
  },
};

export default function PowerUpsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [powerups, setPowerups] = useState<PowerUp[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setPowerups(getUserInventory().powerups);
  }, []);

  const totalPowerups = useMemo(
    () => powerups.reduce((sum, item) => sum + item.quantity, 0),
    [powerups]
  );

  const refreshInventory = () => {
    setPowerups(getUserInventory().powerups);
  };

  const handleUsePowerUp = (powerupId: number) => {
    const used = usePowerUp(powerupId);
    if (used) {
      refreshInventory();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B27FF] to-[#B05FFF] text-white shadow-lg hover:shadow-xl transition-all"
        aria-label="Abrir ferramentas"
      >
        <Wand2 className="w-5 h-5" />
        {totalPowerups > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-red-500 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
            {totalPowerups}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Suas Ferramentas</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {powerups.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-6">
                  Nenhuma ferramenta disponível no momento.
                </div>
              )}

              {powerups.map((item) => {
                const detail = POWERUP_DETAILS[item.type];
                const Icon = detail?.icon ?? Sparkles;

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B27FF] to-[#B05FFF] flex items-center justify-center text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {detail?.description ?? "Ferramenta especial"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUsePowerUp(item.id)}
                      className="px-3 py-1.5 rounded-full bg-[#8B27FF] text-white text-xs font-bold hover:bg-[#7B1FE8] transition-colors"
                    >
                      {item.quantity}x
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
