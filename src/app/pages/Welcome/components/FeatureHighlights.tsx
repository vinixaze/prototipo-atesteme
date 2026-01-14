import { motion } from "motion/react";
import { Star, Zap } from "lucide-react";

const highlightPills = [
  {
    icon: Star,
    title: "Diagnóstico de Competências Digitais",
    description: "Identificamos suas habilidades atuais para guiar seu percurso.",
  },
  {
    icon: Zap,
    title: "Minutos que fazem diferença",
    description:
      "O diagnóstico é rápido e entrega um panorama completo das competências digitais.",
  },
];

export function FeatureHighlights() {
  return (
    <div className="mb-8 sm:mb-10 space-y-4 bg-gradient-to-r from-purple-50/50 to-transparent p-5 sm:p-6 rounded-2xl border-l-4 border-[#8B27FF]">
      {highlightPills.map((pill, index) => {
        const Icon = pill.icon;
        return (
          <motion.div
            key={pill.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start gap-3 sm:gap-4"
          >
            <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#8B27FF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <span className="font-bold text-[#8B27FF]">{pill.title}</span> {pill.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
