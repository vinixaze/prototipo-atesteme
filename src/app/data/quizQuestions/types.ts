export interface QuizQuestion {
  id: number;
  text: string;
  explanation: string;
  htmlContent?: string;
  showRotateHint?: boolean;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
}
