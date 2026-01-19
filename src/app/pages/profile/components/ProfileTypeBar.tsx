import { GraduationCap } from "lucide-react";

export default function ProfileTypeBar() {
  return (
    <div className="relative mb-8 animate-slideUp" style={{ animationDelay: "150ms" }}>
      {/* Brilho de fundo sutil */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>

      {/* Barra principal */}
      <div className="relative bg-gradient-to-r from-white via-purple-50/50 to-white dark:from-gray-800 dark:via-purple-900/20 dark:to-gray-800 rounded-2xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-800/60">
        <div className="flex items-center gap-4">
          {/* Ç?cone com gradiente */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-40"></div>
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#8B27FF] to-purple-600 dark:from-[#A855F7] dark:to-purple-500 shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Textos */}
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Tipo de Perfil
            </p>
            <h4 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B27FF] to-purple-600 dark:from-[#A855F7] dark:to-purple-400">
              Estudante
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
