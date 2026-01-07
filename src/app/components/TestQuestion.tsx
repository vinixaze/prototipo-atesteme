import { MessageSquare } from 'lucide-react';
import AnswerOption from './AnswerOption';
import ProgressStepper from './ProgressStepper';
import TestHeader from './TestHeader';

interface TestQuestionProps {
  // Question Data
  currentQuestion: number;
  totalQuestions: number;
  questionText: string;
  questionImage?: string;
  options: Array<{
    letter: string;
    text: string;
    isCorrect?: boolean;
  }>;
  selectedAnswer: string;
  onSelectAnswer: (letter: string) => void;
  onSaveAnswer: () => void;
  onSkip: () => void;
  onFinish: () => void;

  // Progress and Status
  stepStatuses: Array<{ status: 'current' | 'answered' | 'future' | 'skipped' }>;
  eliminatedOptions?: string[];

  // Header Info
  title: string;
  categoryBadge?: string;
  categoryColor?: string;
  onBackClick?: () => void;

  // UI Control
  showNavigation?: boolean;
  isLastQuestion?: boolean;
}

export default function TestQuestion({
  currentQuestion,
  totalQuestions,
  questionText,
  questionImage,
  options,
  selectedAnswer,
  onSelectAnswer,
  onSaveAnswer,
  onSkip,
  onFinish,
  stepStatuses,
  eliminatedOptions = [],
  title,
  categoryBadge,
  categoryColor,
  onBackClick,
  showNavigation = false,
  isLastQuestion = false,
}: TestQuestionProps) {
  const canAnswer = !!selectedAnswer;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <TestHeader
        title={title}
        categoryBadge={categoryBadge}
        categoryColor={categoryColor}
        onBackClick={onBackClick}
      />

      {/* Progress Stepper */}
      <ProgressStepper
        totalSteps={totalQuestions}
        currentStep={currentQuestion}
        stepStatuses={stepStatuses}
        showNavigation={showNavigation}
      />

      {/* Question Card */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 md:p-12 transition-all duration-300 relative"
          key={currentQuestion}
        >
          {/* Enunciado */}
          <h2 className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6 sm:mb-8">
            {questionText}
          </h2>

          {/* Imagem (se houver) */}
          {questionImage && (
            <div className="mb-6 sm:mb-8 flex justify-center">
              <img
                src={questionImage}
                alt="Question illustration"
                className="max-w-full md:max-w-2xl rounded-xl shadow-md"
              />
            </div>
          )}

          {/* Opções de Resposta */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
            {options.map((option) => (
              <AnswerOption
                key={option.letter}
                letter={option.letter}
                text={option.text}
                isSelected={selectedAnswer === option.letter}
                isCorrect={false}
                isIncorrect={false}
                showFeedback={false}
                disabled={eliminatedOptions.includes(option.letter)}
                onClick={() => onSelectAnswer(option.letter)}
              />
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col items-stretch gap-3">
            <button
              onClick={onSaveAnswer}
              disabled={!canAnswer}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-[#8B27FF] dark:bg-[#A855F7] text-white rounded-lg hover:bg-[#7B1FE8] dark:hover:bg-[#9333EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>Salvar resposta</span>
              <span>→</span>
            </button>

            <button
              onClick={onSkip}
              disabled={isLastQuestion}
              className="w-full px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pular
            </button>
          </div>
        </div>

        {/* Botão Flutuante: Enviar Observação */}
        <button className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 px-4 py-2 sm:px-6 sm:py-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] border-2 border-[#8B27FF] dark:border-[#A855F7] rounded-full shadow-lg hover:bg-[#F3E8FF] dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-xs sm:text-sm z-10">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Enviar Observação</span>
          
        </button>
      </div>
    </div>
  );
}
