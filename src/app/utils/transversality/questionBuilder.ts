import { SelectedFilters } from "../../types/transversality";
import { curricularOptions, thematicOptionsByComponent, bnccTypeOptions } from "./constants";

const categoryMap: Record<string, { category: string; color: string; competency: string }> = {
  portugues: {
    category: "Comunicação e Colaboração",
    color: "#00BCD4",
    competency: "Interagir por meio de tecnologias digitais",
  },
  matematica: {
    category: "Informações e Dados",
    color: "#FFC107",
    competency: "Navegar, pesquisar e filtrar dados",
  },
  ingles: {
    category: "Comunicação e Colaboração",
    color: "#00BCD4",
    competency: "Colaborar através de tecnologias digitais",
  },
  ciencias: {
    category: "Informações e Dados",
    color: "#FFC107",
    competency: "Avaliar dados e informações",
  },
  historia: {
    category: "Resolução de Problemas",
    color: "#E91E63",
    competency: "Identificar necessidades e respostas tecnológicas",
  },
  geografia: {
    category: "Informações e Dados",
    color: "#FFC107",
    competency: "Gerenciar dados e informações",
  },
};

export const createQuestionFromFilters = (filters: SelectedFilters) => {
  const componentLabel =
    curricularOptions.find((o) => o.value === filters.component)?.label || "";

  const thematicLabel =
    filters.component && filters.thematic
      ? thematicOptionsByComponent[filters.component]?.find((o) => o.value === filters.thematic)?.label
      : undefined;

  const safeThematicLabel = thematicLabel?.trim() ? thematicLabel : "a temática selecionada";

  const categoryInfo = categoryMap[filters.component || "portugues"] || categoryMap.portugues;

  if (filters.filterType === "curricular") {
    return {
      fromPage: "transversalidade",
      category: categoryInfo.category,
      categoryColor: categoryInfo.color,
      competency: categoryInfo.competency,
      questions: [
        {
          id: 1,
          text: `[${componentLabel}] ${safeThematicLabel}: Qual alternativa representa melhor essa competência?`,
          options: [
            { letter: "A", text: `Aplicar ${safeThematicLabel.toLowerCase()} apenas de forma teórica`, isCorrect: false },
            { letter: "B", text: `Integrar ${safeThematicLabel.toLowerCase()} com tecnologias digitais`, isCorrect: true },
            { letter: "C", text: "Ignorar metodologias digitais", isCorrect: false },
            { letter: "D", text: "Usar tecnologia sem intencionalidade pedagógica", isCorrect: false },
          ],
          explanation: "A alternativa correta demonstra o uso adequado da competência no contexto educacional.",
          transversality: {
            component: componentLabel,
            thematic: safeThematicLabel,
            year: filters.year,
          },
        },
      ],
    };
  }

  const bnccTypeLabel = bnccTypeOptions.find((o) => o.value === filters.bnccType)?.label || "";

  return {
    fromPage: "transversalidade",
    category: "Cultura Digital",
    categoryColor: "#8B27FF",
    competency: "Competências Gerais da BNCC",
    level: "Intermediário",
    totalQuestions: 1,
    questions: [
      {
        id: 1,
        text: `[${bnccTypeLabel} - ${filters.bnccCode ?? ""}] Considerando a habilidade BNCC selecionada, qual alternativa melhor demonstra a aplicação dessa competência?`,
        options: [
          { letter: "A", text: "Utilizar tecnologias digitais apenas para entretenimento" },
          { letter: "B", text: "Compreender e aplicar as tecnologias digitais de forma crítica, reflexiva e ética nas diversas práticas sociais" },
          { letter: "C", text: "Evitar o uso de tecnologias no processo de aprendizagem" },
          { letter: "D", text: "Usar tecnologias sem considerar aspectos éticos" },
          { letter: "E", text: "Limitar o uso de tecnologias apenas a atividades recreativas" },
        ],
        correctAnswer: "B",
        explanation:
          "Esta alternativa reflete adequadamente as competências gerais da BNCC relacionadas à cultura digital...",
        category: "Cultura Digital",
        categoryColor: "#8B27FF",
        competency: "Competências Gerais da BNCC",
        transversality: {
          bnccType: bnccTypeLabel,
          bnccCode: filters.bnccCode,
        },
      },
    ],
  };
};

