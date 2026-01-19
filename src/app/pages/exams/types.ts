import type { NavigateTo } from "../../../lib/navigation/routes";

export interface ExamsPageProps {
  navigateTo: NavigateTo;
  userRole?: "admin" | "user";
}

export interface Exam {
  id: string;
  date: string;
  time: string;
  name: string;
  cpf: string;
  status: string;
  type: string;
  score?: number;
  pendingReason?: string;
}

export interface ExamDetailCompetency {
  nome: string;
  categoria: string;
  cor: string;
  pontuacao: number;
  maxPontos: number;
}

export interface ExamDetailQuestionOption {
  letter: string;
  text: string;
  isCorrect: boolean;
}

export interface ExamDetailQuestion {
  id: number;
  questionText: string;
  category: string;
  categoryColor: string;
  competency: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: ExamDetailQuestionOption[];
}

export interface ExamDetails {
  pontosTotais: number;
  maxPontos: number;
  porcentagem: number;
  questoesCorretas: number;
  questoesTotais: number;
  tempoGasto: string;
  pontoForte: string;
  areaParaMelhorar: string;
  competencias: ExamDetailCompetency[];
  questions: ExamDetailQuestion[];
}
