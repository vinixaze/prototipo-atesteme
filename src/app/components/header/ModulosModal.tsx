import { createPortal } from "react-dom";
import { X, Laptop, BookOpen, Target, Car, Heart, Building, DollarSign, Leaf } from "lucide-react";

interface ModulosModalProps {
  isOpen: boolean;
  activeModule: "atesteme" | "prosaeb";
  showMoreModules: boolean;
  onClose: () => void;
  onModuleChange?: (module: "atesteme" | "prosaeb") => void;
  onToggleMoreModules: () => void;
}

export default function ModulosModal({
  isOpen,
  activeModule,
  showMoreModules,
  onClose,
  onModuleChange,
  onToggleMoreModules,
}: ModulosModalProps) {
  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 dark:bg-black/70 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-full flex items-start justify-center p-4 py-6 md:items-center">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[85vh] overflow-y-auto overscroll-contain"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Escolha seu módulo
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selecione o módulo de aprendizagem que deseja explorar
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Módulo Atual
              </span>
            </div>

            <button
              onClick={() => {
                onModuleChange?.("atesteme");
                onClose();
              }}
              className="w-full relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Laptop className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">
                      Educação Digital
                    </h3>
                    <p className="text-sm text-white/90">
                      Competências digitais e tecnológicas
                    </p>
                  </div>
                </div>
                {activeModule === "atesteme" && (
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                    ATIVA
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>5 Áreas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>16 Competências</span>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            </button>
          </div>

          <div className="mb-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Outros Módulos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              disabled
              className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
            >
              <div className="absolute top-2 right-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                  Em Breve
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                  <Car className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-500 dark:text-gray-400">
                    Educação para os Direitos Humanos
                  </h3>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Direitos Humanos e cidadania
              </p>
            </button>

            <button
              onClick={() => {
                onModuleChange?.("prosaeb");
                onClose();
              }}
              className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 border-2 border-blue-500 shadow-lg hover:shadow-xl group"
            >
              {activeModule === "prosaeb" && (
                <div className="absolute top-2 right-2">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500 text-white shadow-lg">
                    ATIVA
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">Prosaeb</h3>
                </div>
              </div>
              <p className="text-xs text-white/90">
                Programa de Avaliação da Educação Básica
              </p>
            </button>

            <button
              disabled
              className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
            >
              <div className="absolute top-2 right-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                  Em Breve
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                  <Heart className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-500 dark:text-gray-400">
                    Educação Socioemocional
                  </h3>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Direitos Humanos e cidadania
              </p>
            </button>

            <button
              disabled
              className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
            >
              <div className="absolute top-2 right-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                  Em Breve
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                  <Building className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-500 dark:text-gray-400">
                    Empreendedorismo
                  </h3>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Direitos Humanos e cidadania
              </p>
            </button>

            {showMoreModules && (
              <>
                <button
                  disabled
                  className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                      Em Breve
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                      <DollarSign className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-500 dark:text-gray-400">
                        Educação Financeira
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Gestão financeira e planejamento pessoal
                  </p>
                </button>

                <button
                  disabled
                  className="relative overflow-hidden rounded-xl p-4 text-left transition-all bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed group"
                >
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-300/90 dark:bg-gray-600/90 text-gray-700 dark:text-gray-300 leading-none">
                      Em Breve
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/50 dark:bg-gray-600/50 rounded-xl flex items-center justify-center opacity-50">
                      <Leaf className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-500 dark:text-gray-400">
                        Educação Ambiental
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Sustentabilidade e consciência ecológica
                  </p>
                </button>
              </>
            )}

            <div className="md:col-span-2 flex items-center justify-center pt-2">
              <button
                type="button"
                onClick={onToggleMoreModules}
                className="px-5 py-2 rounded-full font-bold text-sm bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] border border-[#8B27FF]/30 dark:border-[#A855F7]/30 shadow-sm hover:shadow-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                {showMoreModules ? "Ver menos" : "Ver mais"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

