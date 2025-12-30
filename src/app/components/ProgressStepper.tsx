import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface StepStatus {
  status: 'future' | 'current' | 'correct' | 'incorrect' | 'answered' | 'skipped';
}

interface ProgressStepperProps {
  totalSteps: number;
  currentStep: number;
  stepStatuses: StepStatus[];
  showNavigation?: boolean;
}

export default function ProgressStepper({
  totalSteps,
  currentStep,
  stepStatuses,
  showNavigation = false,
}: ProgressStepperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    // Auto-scroll to current step
    if (scrollRef.current) {
      const stepElements = scrollRef.current.querySelectorAll('.step-circle');
      const currentElement = stepElements[currentStep - 1];
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentStep]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 py-6 px-4 shadow-sm relative">
      <div className="max-w-6xl mx-auto relative">
        {/* Navigation Arrows */}
        {showNavigation && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#FF9800] dark:bg-[#FB923C] text-white rounded-full flex items-center justify-center hover:bg-[#F57C00] dark:hover:bg-[#F97316] transition-colors shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {showNavigation && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#FF9800] dark:bg-[#FB923C] text-white rounded-full flex items-center justify-center hover:bg-[#F57C00] dark:hover:bg-[#F97316] transition-colors shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Stepper */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
          onScroll={checkScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-10">
            {Array.from({ length: totalSteps }, (_, i) => {
              const status = stepStatuses[i];
              const stepNumber = i + 1;
              const isCurrent = stepNumber === currentStep;
              
              // Determinar classes com base no estado
              let circleClasses = `step-circle ${isCurrent ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-base'} rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 font-semibold `;
              let lineClasses = 'h-0.5 w-8 md:w-12 transition-colors duration-200 ';
              let content: React.ReactNode = stepNumber.toString();

              if (status.status === 'current') {
                circleClasses += 'bg-[#8B27FF] dark:bg-[#A855F7] text-white border-[3px] border-[#A855F7] dark:border-[#C084FC]';
                lineClasses += 'bg-[#D1C4E9] dark:bg-[#6B21A8]';
              } else if (status.status === 'correct') {
                circleClasses += 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 border-2 border-green-500 dark:border-green-600';
                content = <Check className="w-5 h-5" strokeWidth={3} />;
                lineClasses += 'bg-green-500 dark:bg-green-600';
              } else if (status.status === 'incorrect') {
                circleClasses += 'bg-red-50 dark:bg-red-950 text-red-500 dark:text-red-400 border-2 border-red-500 dark:border-red-500';
                content = <X className="w-5 h-5" strokeWidth={3} />;
                lineClasses += 'bg-red-500 dark:bg-red-500';
              } else if (status.status === 'answered') {
                circleClasses += 'bg-purple-100 dark:bg-purple-900 text-[#8B27FF] dark:text-[#A855F7] border-2 border-[#8B27FF] dark:border-[#A855F7]';
                content = <Check className="w-5 h-5" strokeWidth={3} />;
                lineClasses += 'bg-[#8B27FF] dark:bg-[#A855F7]';
              } else if (status.status === 'skipped') {
                circleClasses += 'bg-orange-50 dark:bg-orange-950 text-[#FF9800] dark:text-[#FB923C] border-2 border-[#FF9800] dark:border-[#FB923C]';
                content = '?';
                lineClasses += 'bg-[#FF9800] dark:bg-[#FB923C]';
              } else {
                // future
                circleClasses += 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-gray-300 dark:border-purple-800';
                lineClasses += 'bg-[#D1C4E9] dark:bg-[#6B21A8]';
              }
              
              return (
                <div key={i} className="flex items-center">
                  {/* Step Circle */}
                  <div className={circleClasses}>
                    <span>
                      {content}
                    </span>
                  </div>

                  {/* Connector Line */}
                  {i < totalSteps - 1 && (
                    <div className={lineClasses} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}