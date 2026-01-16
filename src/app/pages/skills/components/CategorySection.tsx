import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PlayCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getCompetencyStatus, getDaysUntilUnblock } from "../../../utils/competencyStorage";
import { CompetencyTimer } from "../../shared/components/CompetencyTimer";
import type { Category } from "../data";
/** Obs. Componente fora do map (evita hook dentro de loop e bugs aleatórios) */
export default function CategorySection({
  category,
  categoryIndex,
  onStartQuiz,
  onShowBlocked,
}: {
  category: Category;
  categoryIndex: number;
  onStartQuiz: (
    competency: string,
    category: string,
    categoryColor: string,
    competencyIcon: LucideIcon,
    categoryIcon: LucideIcon
  ) => void;
  onShowBlocked: (
    competency: string,
    category: string,
    categoryColor: string,
    competencyIcon: LucideIcon,
    categoryIcon: LucideIcon
  ) => void;
}) {
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const categoryInView = useInView(categoryRef, { once: true, amount: 0.2 });

  return (
    <div ref={categoryRef}>
      {/* Category Header */}
      <div className="flex items-center gap-3 p-4 rounded-xl mb-6 bg-white dark:bg-gray-800">
        <category.icon className="w-6 h-6" style={{ color: category.color }} strokeWidth={1.5} />
        <h2 className="text-lg font-bold" style={{ color: category.color }}>
          {category.name}
        </h2>
      </div>

      {/* Competency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {category.competencias.map((comp, compIndex) => {
          const status = getCompetencyStatus(comp.title);

          // Obs. BLOQUEADO DE VERDADE: se ainda tem tempo pra desbloquear
          const daysUntilUnblock = getDaysUntilUnblock(comp.title);
          const isBlocked = daysUntilUnblock > 0;

          const isCompleted = status?.status === "completed";
          const isAttempted = status?.status === "attempted";

          // Mock: manter seu teste
          const isInProgress = status?.status === "in-progress" || comp.title === "Compartilhar e publicar";

          // Background do ícone (respeitando bloqueado)
          let iconBgClass = "";
          if (!isBlocked) {
            if (category.color === "#FFD700") iconBgClass = "bg-[#FFF9E6] dark:bg-yellow-900/30";
            else if (category.color === "#00BCD4") iconBgClass = "bg-[#E0F7FA] dark:bg-cyan-900/30";
            else if (category.color === "#FF9800") iconBgClass = "bg-[#FFF3E0] dark:bg-orange-900/30";
            else if (category.color === "#4CAF50") iconBgClass = "bg-[#E8F5E9] dark:bg-green-900/30";
            else if (category.color === "#E91E63") iconBgClass = "bg-[#FCE4EC] dark:bg-pink-900/30";
          }

          // Gradiente do botão (respeitando bloqueado)
          let buttonGradient = "";
          if (category.color === "#FFD700") buttonGradient = "linear-gradient(135deg, #FFE57F 0%, #FF9800 100%)";
          else if (category.color === "#00BCD4") buttonGradient = "linear-gradient(135deg, #4DD0E1 0%, #0288D1 100%)";
          else if (category.color === "#FF9800") buttonGradient = "linear-gradient(135deg, #FFB74D 0%, #E65100 100%)";
          else if (category.color === "#4CAF50") buttonGradient = "linear-gradient(135deg, #81C784 0%, #2E7D32 100%)";
          else if (category.color === "#E91E63") buttonGradient = "linear-gradient(135deg, #F48FB1 0%, #AD1457 100%)";

          return (
            <motion.div
              key={`${categoryIndex}-${compIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={categoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: compIndex * 0.08, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.1 } }}
              className="relative rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-100 overflow-hidden group cursor-pointer bg-white dark:bg-gray-800 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              onClick={() =>
                isBlocked
                  ? onShowBlocked(comp.title, category.name, category.color, comp.icon, category.icon)
                  : onStartQuiz(comp.title, category.name, category.color, comp.icon, category.icon)
              }
            >
              {/* hover blob */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                <motion.div
                  initial={{ y: -200, x: "20%" }}
                  whileHover={{ y: 100 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-[200px] h-[200px] rounded-full blur-3xl"
                  style={{ backgroundColor: `${category.color}20` }}
                />
              </div>

              {/* Badge da Categoria */}
              <div
                className="relative z-10 w-full px-5 py-3 rounded-t-[20px] transition-all duration-200 group-hover:brightness-110"
                style={{ backgroundColor: isBlocked ? "#94A3B8" : category.color }}
              >
                <span className="text-white text-[11px] font-bold uppercase tracking-[1px] drop-shadow-sm">
                  {category.name}
                </span>
              </div>

              {/* Body */}
              <div className="relative z-10 p-5 flex flex-col items-center gap-4">
                {/* Ícone */}
                <motion.div
                  whileHover={{
                    rotate: isBlocked ? 0 : [0, -10, 10, -10, 0],
                    scale: isBlocked ? 1 : 1.15,
                  }}
                  transition={{ rotate: { duration: 0.4 }, scale: { duration: 0.2 } }}
                  className={`w-[80px] h-[80px] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-shadow duration-200 ${
                    isBlocked ? "" : "group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
                  } ${iconBgClass}`}
                  style={isBlocked ? { backgroundColor: "#E2E8F0" } : {}}
                >
                  <comp.icon
                    className={`w-[40px] h-[40px] ${isBlocked ? "opacity-40" : ""}`}
                    style={{ color: isBlocked ? "#94A3B8" : category.color }}
                    strokeWidth={2}
                  />
                </motion.div>

                {/* Título */}
                <h4
                  className={`text-[15px] font-semibold text-center leading-[1.3] min-h-[40px] px-1 ${
                    isBlocked ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {comp.title}
                </h4>

                {/* Timer */}
                <div className="w-full h-[28px] flex items-center justify-center">
                  {isInProgress && (
                    <CompetencyTimer
                      competencyName={comp.title}
                      mockTime={comp.title === "Compartilhar e publicar" ? 1800 : undefined}
                      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                      showIcon={true}
                    />
                  )}
                </div>

                {/* Botão */}
                {isInProgress ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isBlocked) {
                        onShowBlocked(comp.title, category.name, category.color, comp.icon, category.icon);
                        return;
                      }
                      onStartQuiz(comp.title, category.name, category.color, comp.icon, category.icon);
                    }}
                    className="w-full py-2.5 rounded-full text-white font-bold text-[13px] uppercase tracking-[0.8px] shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] transition-all duration-200 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <PlayCircle className="w-4 h-4" />
                      CONTINUAR
                    </span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="w-full py-2.5 rounded-full font-bold text-[13px] uppercase tracking-[0.8px] transition-all duration-200 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
                    style={{
                      background: isBlocked
                        ? "linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)"
                        : buttonGradient,
                    }}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {!isBlocked && <PlayCircle className="w-4 h-4" />}
                      {isBlocked ? "REFORÇO NECESSÁRIO" : "INICIAR"}
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

