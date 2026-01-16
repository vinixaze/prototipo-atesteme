import type { NavigateTo } from "../../../lib/navigation/routes";

export interface LessonPlanPageProps {
  navigateTo: NavigateTo;
  userRole?: "admin" | "user";
  filterData?: {
    category?: string;
  };
}

export interface PlanoAula {
  id: number;
  titulo: string;
  descricao: string;
  duracao: string;
  turma: string;
  materia: string;
  codigoBNCC: string;
  data: string;
  anoescolar: string;
}

export interface FormData {
  // Etapa 1: InformaÇõÇæes BÇ­sicas
  componenteCurricular: string;
  ano: string;
  tema: string;

  // Etapa 2: ConfiguraÇõÇæes da Aula
  duracao: string;
  duracaoCustom: string;
  recursoDidatico: string[];
  formaAvaliacao: string[];

  // Etapa 3: BNCC e Habilidades
  objetoConhecimento: string;
  habilidadesBNCCGeral: string[];
  habilidadesBNCCComputacao: string[];

  // Etapa 4: Contexto Educacional
  etapaEnsino: string;
  tempoAula: string;
  metodologia: string[];

  // Etapa 5: Atividades e AdaptaÇõÇæes
  tiposAtividades: string[];
  adaptacoes: string[];

  // Etapa 6: LocalizaÇõÇœo (Opcional)
  unidadeFederativa: string;
  cidade: string;
  escola: string;
}
