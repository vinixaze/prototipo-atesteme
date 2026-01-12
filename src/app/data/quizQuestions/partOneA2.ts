import type { QuizQuestion } from './types';

export const quizQuestionsPartOneA2: Record<string, QuizQuestion[]> = {
  'Realizar o tratamento de dados': [
    {
      id: 1,
      text: 'O que significa "limpar dados" em um contexto de análise?',
      explanation: 'Remover dados duplicados, incorretos ou irrelevantes ajuda a garantir a precisão dos resultados.',
      options: [
        { letter: 'a', text: 'Deletar todos os dados antigos', isCorrect: false },
        { letter: 'b', text: 'Remover dados duplicados, incorretos ou irrelevantes', isCorrect: true },
        { letter: 'c', text: 'Formatar o computador', isCorrect: false },
        { letter: 'd', text: 'Organizar arquivos em pastas', isCorrect: false },
        { letter: 'e', text: 'Apagar o histórico do navegador', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Qual ferramenta é mais adequada para organizar e analisar grandes volumes de dados tabulares?',
      explanation: 'Microsoft Excel ou Google Sheets são excelentes para manipular e analisar dados em formato tabular.',
      options: [
        { letter: 'a', text: 'Microsoft Word', isCorrect: false },
        { letter: 'b', text: 'Microsoft Excel ou Google Sheets', isCorrect: true },
        { letter: 'c', text: 'Bloco de notas', isCorrect: false },
        { letter: 'd', text: 'PowerPoint', isCorrect: false },
        { letter: 'e', text: 'Windows Media Player', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'O que é uma "célula" em uma planilha eletrônica?',
      explanation: 'A interseção entre uma linha e uma coluna forma uma célula, que pode conter dados ou fórmulas.',
      options: [
        { letter: 'a', text: 'Um tipo de fórmula matemática', isCorrect: false },
        { letter: 'b', text: 'A interseção entre uma linha e uma coluna', isCorrect: true },
        { letter: 'c', text: 'Um gráfico de dados', isCorrect: false },
        { letter: 'd', text: 'Um arquivo de backup', isCorrect: false },
        { letter: 'e', text: 'Uma aba da planilha', isCorrect: false },
      ],
    },
  ],
};
