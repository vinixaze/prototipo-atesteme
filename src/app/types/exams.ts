export interface Exam {
  id: string;
  date: string;
  time: string;
  name: string;
  cpf: string;
  status: 'Aprovado' | 'Reprovado' | 'Pendente';
  type: string;
  score?: number;
  pendingReason?: string;
}

export interface CompetenciaResultado {
  nome: string;
  categoria: string;
  cor: string;
  pontuacao: number;
  maxPontos: number;
}

export interface QuestionOption {
  letter: string;
  text: string;
  isCorrect: boolean;
}

export interface ExamQuestion {
  id: number;
  questionText: string;
  category: string;
  categoryColor: string;
  competency: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: QuestionOption[];
}

export interface ExamDetails {
  pontosTotais: number;
  maxPontos: number;
  porcentagem: number;
  competencias: CompetenciaResultado[];
  pontoForte: string;
  areaParaMelhorar: string;
  tempoGasto: string;
  questoesCorretas: number;
  questoesTotais: number;
  questions: ExamQuestion[];
}

