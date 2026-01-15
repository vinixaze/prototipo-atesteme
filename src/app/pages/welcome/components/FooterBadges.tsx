import { motion } from "motion/react";
import { Zap, Award } from "lucide-react";

const badgeData = [
  { label: "100% alinhado à PNED", icon: Zap, gradient: "from-green-400 to-emerald-400" },
  { label: "Resultados instantâneos", icon: Zap, gradient: "from-blue-400 to-cyan-400" },
  { label: "Certificado Digital", icon: Award, gradient: "from-purple-400 to-pink-400" },
];

export function FooterBadges() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-gray-500 text-sm"
    >
      {badgeData.map((badge) => {
        const Icon = badge.icon;
        return (
          <div key={badge.label} className="flex items-center gap-2">
            <div
              className={`w-8 sm:w-9 h-8 sm:h-9 bg-gradient-to-br ${badge.gradient} rounded-lg flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-white" />
            </div>
            <span>{badge.label}</span>
          </div>
        );
      })}
      <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />
    </motion.div>
  );
}
