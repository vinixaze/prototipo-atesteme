import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TestHeader from '../components/TestHeader';
import ProgressStepper from '../components/ProgressStepper';
import AnswerOption from '../components/AnswerOption';
import InteractiveHTMLWindow from '../components/InteractiveHTMLWindow';
import { toast, Toaster } from 'sonner';
import { quizQuestions } from '../data/quizQuestions';
import { Wand2, Lightbulb } from 'lucide-react';
import {
  getUserInventory,
  usePowerUp,
  getPowerUpQuantity
} from '../utils/powerupsStorage';

const BACK_ROUTE_MAP: Record<string, string> = {
  transversalidade: 'transversalidade',
  habilidades: 'habilidades',
  dashboard: 'dashboard'
};


interface QuizPageProps {
  navigateTo: (page: string, data?: any) => void;
  competencyData?: any;
  quizData?: any;
}

type StepStatus = 'current' | 'answered' | 'future';

export default function QuizPage({
  navigateTo,
  competencyData,
  quizData
}: QuizPageProps) {

  /* ---------------- META ---------------- */

  const quizMeta = quizData || competencyData;

  const questions =
    quizMeta?.questions && quizMeta.questions.length > 0
      ? quizMeta.questions
      : quizQuestions[quizMeta?.competency || ''] || [];



  /* ---------------- STATES ---------------- */

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [showPowerUpsMenu, setShowPowerUpsMenu] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [userPowerUps, setUserPowerUps] = useState<any[]>([]);

  const [stepStatuses, setStepStatuses] = useState<{ status: StepStatus }[]>(
    Array(questions.length).fill(null).map((_, i) => ({
      status: i === 0 ? 'current' : 'future'
    }))
  );

  const currentQuestionData = questions[currentQuestion - 1];

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          Nenhuma questão disponível para este conteúdo.
        </p>
      </div>
    );
  }

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          Carregando questão...
        </p>
      </div>
    );
  }
  const selectedAnswer = selectedAnswers[currentQuestion];

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    const inventory = getUserInventory();
    setUserPowerUps(inventory.powerups || []);
  }, [showPowerUpsMenu]);

  /* ---------------- ACTIONS ---------------- */

  const handleSelectAnswer = (letter: string) => {
    if (showFeedback) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: letter
    }));
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer) return;

    const newStatuses = [...stepStatuses];
    newStatuses[currentQuestion - 1] = { status: 'answered' };
    setStepStatuses(newStatuses);

    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);

    if (currentQuestion < questions.length) {
      const newStatuses = [...stepStatuses];
      newStatuses[currentQuestion] = { status: 'current' };
      setStepStatuses(newStatuses);

      setCurrentQuestion(prev => prev + 1);
    } else {
      navigateTo('quiz-result', {
        ...quizMeta,
        selectedAnswers,
        questions
      });
    }
  };

  const handleBackClick = () => {
    const backRoute =
      BACK_ROUTE_MAP[quizMeta?.fromPage || ''] || 'dashboard';

    navigateTo(backRoute);
  };

  /* ---------------- POWER UPS ---------------- */

  const useShieldPower = () => {
    if (getPowerUpQuantity(3) === 0) {
      return toast.error('Sem escudos disponíveis');
    }

    usePowerUp(3);

    const incorrect = currentQuestionData.options.filter(
      (o: { letter: string; isCorrect: boolean }) => !o.isCorrect
    );

    const random = incorrect[Math.floor(Math.random() * incorrect.length)];

    setEliminatedOptions(prev => [...prev, random.letter]);
    setShowPowerUpsMenu(false);

    toast.success('Uma opção incorreta foi eliminada!');
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50">
      <Toaster position="top-center" />

      <TestHeader
        title={`Desafio - ${quizMeta?.competency}`}
        categoryBadge={quizMeta?.category}
        categoryColor={quizMeta?.categoryColor}
        onBackClick={handleBackClick}
      />

      <ProgressStepper
        totalSteps={questions.length}
        currentStep={currentQuestion}
        stepStatuses={stepStatuses}
        showNavigation={false}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">

              {/* POWER UPS */}
              <button
                onClick={() => setShowPowerUpsMenu(!showPowerUpsMenu)}
                className="absolute top-4 right-4 w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center"
              >
                <Wand2 />
              </button>

              <div className="p-8">
                <h2 className="text-2xl mb-6">
                  {currentQuestionData?.text}
                </h2>

                {currentQuestionData?.htmlContent && (
                  <InteractiveHTMLWindow
                    htmlContent={currentQuestionData.htmlContent}
                  />
                )}

                <div className="space-y-3 mt-6">
                  {currentQuestionData.options.map((opt: {
                    id: number;
                    letter: string;
                    text: string;
                    isCorrect: boolean;
                  }) => (
                    <AnswerOption
                      key={opt.id}
                      letter={opt.letter}
                      text={opt.text}
                      isSelected={selectedAnswer === opt.letter}
                      isCorrect={opt.isCorrect}
                      isIncorrect={!opt.isCorrect}
                      showFeedback={showFeedback}
                      disabled={
                        showFeedback ||
                        eliminatedOptions.includes(opt.letter)
                      }
                      onClick={() => handleSelectAnswer(opt.letter)}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 space-y-3">
                {!showFeedback ? (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={!selectedAnswer}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg disabled:opacity-50"
                  >
                    Confirmar resposta
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-green-600 text-white py-3 rounded-lg"
                  >
                    Próxima →
                  </button>
                )}
              </div>
            </div>

            {/* DICA */}
            <div className="mt-6 flex gap-4 bg-amber-50 p-4 rounded-xl">
              <Lightbulb className="text-amber-600" />
              <p className="text-sm">
                Foque em aprender, você poderá revisar depois.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
