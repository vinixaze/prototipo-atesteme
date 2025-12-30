import { useState, useEffect } from 'react';
import { Check, HelpCircle } from 'lucide-react';

export type QuestionState = 'pending' | 'active' | 'answered' | 'skipped';

interface ProgressTrackerProps {
  totalQuestions: number;
  currentQuestion: number;
  questionStates: QuestionState[];
  onNavigateToQuestion?: (index: number) => void;
  categoryColor?: string;
  testName?: string;
}

export default function ProgressTracker({
  totalQuestions,
  currentQuestion,
  questionStates,
  onNavigateToQuestion,
  categoryColor = '#8e24aa',
  testName = 'Sua jornada de avaliação'
}: ProgressTrackerProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calcular progresso baseado em questões respondidas
  const answeredQuestions = questionStates.filter(state => state === 'answered').length;
  const progressPercent = (answeredQuestions / totalQuestions) * 100;

  // Determinar se deve mostrar scroll horizontal (para 16 questões)
  const needsScroll = totalQuestions > 10;

  const getNodeStyle = (state: QuestionState, index: number) => {
    const baseClasses = `
      relative flex items-center justify-center font-bold
      transition-all duration-500 ease-out
      ${needsScroll ? 'w-9 h-9 text-sm' : 'w-11 h-11 text-base'}
      rounded-2xl z-10
    `;

    switch (state) {
      case 'pending':
        return `${baseClasses} bg-white border-3 border-gray-300 text-gray-400`;
      
      case 'active':
        return `${baseClasses} bg-white border-3 text-[#8e24aa] 
                scale-110 shadow-lg shadow-purple-200 animate-pulse-ring
                border-[#8e24aa]`;
      
      case 'answered':
        return `${baseClasses} bg-gradient-to-br from-[#8e24aa] to-[#ce93d8] 
                border-3 border-[#8e24aa] text-white shadow-lg shadow-purple-300`;
      
      case 'skipped':
        return `${baseClasses} bg-white border-3 border-[#FF9800] text-[#FF9800] 
                shadow-md shadow-orange-200`;
      
      default:
        return baseClasses;
    }
  };

  const getNodeContent = (state: QuestionState, index: number) => {
    if (state === 'answered') {
      return <Check className={needsScroll ? 'w-5 h-5' : 'w-6 h-6'} strokeWidth={3} />;
    }
    return index + 1;
  };

  const isClickable = (state: QuestionState) => {
    return (state === 'answered' || state === 'skipped') && onNavigateToQuestion;
  };

  const getTooltip = (state: QuestionState, index: number) => {
    switch (state) {
      case 'answered':
        return 'Clique para revisar';
      case 'skipped':
        return 'Questão pulada - clique para responder';
      case 'active':
        return 'Questão atual';
      case 'pending':
        return 'Aguardando';
      default:
        return '';
    }
  };

  return (
    <div 
      className="w-[90%] max-w-[800px] mx-auto mb-8"
      style={{ marginTop: '32px' }}
    >
      {/* Container Principal com efeito glass */}
      <div className="bg-white dark:bg-gray-800 py-6 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          {/* Stepper */}
          <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-10">
              {Array.from({ length: totalQuestions }).map((_, index) => {
                const state = questionStates[index];
                const stepNumber = index + 1;
                const isCurrent = stepNumber === currentQuestion;
                
                // Determinar o conteúdo baseado no estado
                let content: React.ReactNode = stepNumber.toString();
                let circleClasses = `${isCurrent ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-base'} rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 font-semibold `;
                let lineClasses = 'h-0.5 w-8 md:w-12 transition-colors duration-200 ';
                
                if (state === 'active') {
                  circleClasses += 'bg-[#8B27FF] dark:bg-[#A855F7] text-white border-[3px] border-[#A855F7] dark:border-[#C084FC]';
                  lineClasses += 'bg-[#D1C4E9] dark:bg-[#6B21A8]';
                } else if (state === 'answered') {
                  circleClasses += 'bg-purple-100 dark:bg-purple-900 text-[#8B27FF] dark:text-[#A855F7] border-2 border-[#8B27FF] dark:border-[#A855F7]';
                  content = <Check className="w-5 h-5" strokeWidth={3} />;
                  lineClasses += 'bg-[#8B27FF] dark:bg-[#A855F7]';
                } else if (state === 'skipped') {
                  circleClasses += 'bg-orange-50 dark:bg-orange-950 text-[#FF9800] dark:text-[#FB923C] border-2 border-[#FF9800] dark:border-[#FB923C]';
                  content = '?';
                  lineClasses += 'bg-[#FF9800] dark:bg-[#FB923C]';
                } else {
                  // pending
                  circleClasses += 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-gray-300 dark:border-purple-800';
                  lineClasses += 'bg-[#D1C4E9] dark:bg-[#6B21A8]';
                }
                
                const clickable = isClickable(state);
                
                return (
                  <div key={index} className="flex items-center">
                    {/* Step Circle */}
                    <div
                      className={circleClasses}
                      onClick={() => clickable && onNavigateToQuestion?.(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      role="button"
                      tabIndex={clickable ? 0 : -1}
                      aria-label={`Questão ${stepNumber} - ${state === 'answered' ? 'Respondida' : state === 'skipped' ? 'Pulada' : state === 'active' ? 'Atual' : 'Pendente'}`}
                    >
                      <span>
                        {content}
                      </span>
                      
                      {/* Tooltip on hover */}
                      {hoveredIndex === index && clickable && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-50 animate-fadeIn">
                          {getTooltip(state, index)}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-800" />
                        </div>
                      )}
                    </div>

                    {/* Connector Line */}
                    {index < totalQuestions - 1 && (
                      <div className={lineClasses} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Estilos e animações */}
      <style>{`
        /* Dark mode para step circles */
        @media (prefers-color-scheme: dark) {
          .dark-step-circle {
            background-color: var(--bg-dark) !important;
            border: var(--border-dark) !important;
            color: var(--text-dark) !important;
          }
          
          .connector-line {
            background-color: var(--connector-dark) !important;
          }
        }

        /* Animação de pulse para círculo ativo */
        @keyframes pulse-ring {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(142, 36, 170, 0.4); 
          }
          50% { 
            box-shadow: 0 0 0 12px rgba(142, 36, 170, 0); 
          }
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Animação de complete (rotate + scale) */
        @keyframes complete {
          0% { 
            transform: scale(1) rotate(0deg); 
          }
          50% { 
            transform: scale(1.3) rotate(180deg); 
          }
          100% { 
            transform: scale(1) rotate(360deg); 
          }
        }

        .animate-complete-once {
          animation: complete 400ms ease-out;
        }

        /* Animação de shake para questão pulada */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .animate-shake-once {
          animation: shake 300ms ease-in-out;
        }

        /* Animação de brilho na barra */
        @keyframes shine {
          0% { 
            background-position: -200px; 
          }
          100% { 
            background-position: 400px; 
          }
        }

        /* Animação fade in para tooltip */
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -4px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .animate-fadeIn {
          animation: fadeIn 200ms ease-out;
        }

        /* Esconder scrollbar mas manter funcionalidade */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Border personalizada */
        .border-3 {
          border-width: 3px;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-ring,
          .animate-complete-once,
          .animate-shake-once,
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}