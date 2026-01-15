import { Check, X } from 'lucide-react';

interface AnswerOptionProps {
  letter: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  showFeedback?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function AnswerOption({
  letter,
  text,
  isSelected,
  isCorrect,
  isIncorrect,
  showFeedback,
  disabled,
  onClick,
}: AnswerOptionProps) {
  // Determinar classes com base no estado
  let containerClasses = 'w-full text-left transition-all duration-200 hover:shadow-md rounded-xl p-5 ';
  let badgeClasses = 'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ';
  let badgeContent = letter;

  // Apenas mostrar seleção visual
  if (isSelected) {
    // Selecionada - roxo
    containerClasses += 'bg-purple-50 dark:bg-purple-950 border-[3px] border-[#8B27FF] dark:border-[#A855F7]';
    badgeClasses += 'bg-[#8B27FF] dark:bg-[#A855F7] text-white';
  } else {
    // Não selecionada - normal
    containerClasses += 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600';
    badgeClasses += 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={containerClasses}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Badge Circular */}
        <div className={badgeClasses}>
          <span className="text-lg font-semibold">
            {badgeContent}
          </span>
        </div>

        {/* Texto da Alternativa */}
        <div className="flex-1">
          <p className="text-gray-800 dark:text-gray-200">{text}</p>
        </div>
      </div>
    </button>
  );
}
