import { motion } from "motion/react";
import { Target, TrendingUp, Award } from "lucide-react";

const featureCards = [
  {
    title: "Teste Personalizado",
    description: "Avaliação inicial que entende onde você está hoje.",
    icon: Target,
    gradient: "from-yellow-50 to-orange-50",
    border: "border-yellow-200/50",
  },
  {
    title: "Trilha Adaptativa",
    description: "Conteúdo alinhado à BNCC de Computação para você evoluir.",
    icon: TrendingUp,
    gradient: "from-purple-50 to-pink-50",
    border: "border-purple-200/50",
  },
  {
    title: "Conquistas",
    description: "Ganhe medalhas e suba no ranking da sua turma.",
    icon: Award,
    gradient: "from-cyan-50 to-blue-50",
    border: "border-cyan-200/50",
  },
];

export function FeatureGrid() {
  return (
    <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
      {featureCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ duration: 0.3 }}
            className={`bg-gradient-to-br ${card.gradient} p-5 sm:p-6 rounded-2xl border ${card.border}`}
          >
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-white to-transparent rounded-xl flex items-center justify-center mb-3 shadow-lg">
              <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-[#8B27FF]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{card.title}</h3>
            <p className="text-sm sm:text-base text-gray-600">{card.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
