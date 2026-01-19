import { Award, X } from "lucide-react";

interface SkillsHeaderSectionProps {
  showNocoes: boolean;
  onCloseNocoes: () => void;
  onStartNocoes: () => void;
}

export default function SkillsHeaderSection({
  showNocoes,
  onCloseNocoes,
  onStartNocoes,
}: SkillsHeaderSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start">
      {/* ESQUERDA - TÇ?TULO */}
      <div className="w-full lg:w-[70%]">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#8B27FF] mb-2">
          Competências Digitais
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Desenvolva suas competências nos eixos da BNCC Computação/Letramento Digital
        </p>
      </div>

      {/* Noções Básicas panel (desktop only, closable) */}
      {showNocoes && (
        <div className="hidden lg:block w-full lg:w-[50%] relative">
          <div className="bg-[#F3E8FF]/60 dark:bg-gray-800/60 backdrop-blur-md border border-purple-200 dark:border-gray-700/40 rounded-2xl p-6 shadow-sm">
            <button
              type="button"
              onClick={onCloseNocoes}
              className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-200" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#F3E8FF] flex items-center justify-center">
                <Award className="w-6 h-6 text-[#8B27FF]" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Noções Básicas
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Conteúdo muito recomendado antes do Nível 01
                </p>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={onStartNocoes}
                    className="px-4 py-2 rounded-xl bg-[#8B27FF] text-white hover:bg-[#7B1FE8] transition-all"
                  >
                    Começar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
