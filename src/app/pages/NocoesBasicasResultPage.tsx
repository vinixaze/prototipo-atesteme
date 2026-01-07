import TestResult from '../components/TestResult';
import { questions } from './NocoesBasicasPage';

interface NocoesBasicasResultPageProps {
  navigateTo: (page: string, data?: any) => void;
  testData?: {
    correctAnswers: number;
    totalQuestions: number;
    results: Array<{
      questionId: number;
      questionText: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      options: Array<{
        letter: string;
        text: string;
        isCorrect: boolean;
      }>;
    }>;
  };
}

export default function NocoesBasicasResultPage({
  navigateTo,
  testData,
}: NocoesBasicasResultPageProps) {
  const correctAnswers = testData?.correctAnswers || 2;
  const totalQuestions = testData?.totalQuestions || 3;
  const results = testData?.results || [];

  // Justificativas para cada questão
  const explanations = [
    'O teclado é um dos principais dispositivos de entrada de dados em um computador, permitindo a digitação de textos e comandos.',
    'Google Chrome é um navegador de internet desenvolvido pelo Google, usado para acessar páginas da web. Os demais são programas com outras finalidades.',
    'WWW significa "World Wide Web", que é o sistema de documentos interligados acessíveis pela internet através de navegadores.',
  ];

  // Mapear resultados com dados da questão original
  const enhancedResults = results.map((result, index) => {
    const originalQuestion = questions.find(q => q.id === result.questionId);
    return {
      ...result,
      category: originalQuestion?.category || 'NOÇÕES BÁSICAS',
      categoryColor: originalQuestion?.categoryColor || '#8B27FF',
      competency: originalQuestion?.competency || 'Conhecimentos Básicos',
      explanation: explanations[index] || '',
    };
  });

  return (
    <TestResult
      navigateTo={navigateTo}
      testName="Teste de Noções Básicas"
      correctAnswers={correctAnswers}
      totalQuestions={totalQuestions}
      results={enhancedResults}
      onBackClick={() => navigateTo('dashboard')}
      explanations={explanations}
    />
  );
}
