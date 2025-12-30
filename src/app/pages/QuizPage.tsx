import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TestHeader from '../components/TestHeader';
import ProgressStepper from '../components/ProgressStepper';
import AnswerOption from '../components/AnswerOption';
import ConfirmModal from '../components/ConfirmModal';
import InteractiveHTMLWindow from '../components/InteractiveHTMLWindow';
import { toast, Toaster } from 'sonner';
import { quizQuestions } from '../data/quizQuestions';
import { MessageSquare, ChevronRight, SkipForward, Lightbulb, MessageCircle, Wand2, RotateCcw, Shield, BookOpen, X, Coins, CircleAlert } from 'lucide-react';
import { getUserInventory, usePowerUp, getPowerUpQuantity } from '../utils/powerupsStorage';

interface QuizPageProps {
  navigateTo: (page: string, data?: any) => void;
  competencyData?: {
    competency: string;
    category: string;
    categoryColor: string;
    competencyIcon?: any;
    categoryIcon?: any;
    fromPage?: string;
  };
}

// Definição dos power-ups disponíveis no jogo
const AVAILABLE_POWERUPS = [
  {
    id: 1,
    name: 'Segunda Chance',
    icon: RotateCcw,
    description: 'Repetir teste completo',
    color: '#8B27FF',
    usableInQuiz: true
  },
  {
    id: 3,
    name: 'Escudo 50/50',
    icon: Shield,
    description: 'Elimina opção incorreta',
    color: '#8B27FF',
    usableInQuiz: true
  },
  {
    id: 4,
    name: 'Desbloqueio Teoria',
    icon: BookOpen,
    description: 'Link de conteúdo',
    color: '#00BCD4',
    usableInQuiz: true
  },
  {
    id: 8,
    name: 'Conferir Resposta',
    icon: CircleAlert,
    description: 'Verifica se está certo',
    color: '#10B981',
    usableInQuiz: true
  }
];

export default function QuizPage({ navigateTo, competencyData }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [stepStatuses, setStepStatuses] = useState(
    Array(3).fill({ status: 'future' }).map((_, i) => ({
      status: i === 0 ? 'current' : 'future',
    }))
  );
  const [showPowerUpsMenu, setShowPowerUpsMenu] = useState(false);
  const [usedShield, setUsedShield] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [showTheoryLink, setShowTheoryLink] = useState(false);
  const [userPowerUps, setUserPowerUps] = useState<any[]>([]);

  const questions = quizQuestions[competencyData?.competency || ''] || [];
  const currentQuestionData = questions[currentQuestion - 1];
  const selectedAnswer = selectedAnswers[currentQuestion];

  // Carregar power-ups do usuário
  useEffect(() => {
    loadUserPowerUps();
  }, [showPowerUpsMenu]);

  const loadUserPowerUps = () => {
    const inventory = getUserInventory();
    // Filtrar apenas power-ups que o usuário possui e que são utilizáveis em quiz
    const ownedPowerUps = AVAILABLE_POWERUPS.filter(powerup => {
      const quantity = inventory.powerups.find(p => p.id === powerup.id)?.quantity || 0;
      return quantity > 0 && powerup.usableInQuiz;
    }).map(powerup => ({
      ...powerup,
      quantity: inventory.powerups.find(p => p.id === powerup.id)?.quantity || 0
    }));
    setUserPowerUps(ownedPowerUps);
  };

  const handleSelectAnswer = (letter: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: letter });
  };

  const handleSaveAnswer = () => {
    if (!selectedAnswer) return;

    // Marcar como respondida (SEM feedback de correto/incorreto)
    const newStatuses = [...stepStatuses];
    newStatuses[currentQuestion - 1] = { status: 'answered' };
    setStepStatuses(newStatuses);

    // Verificar se há questões não respondidas
    const unansweredQuestions = questions.filter(
      (q) => !selectedAnswers[q.id] && q.id !== currentQuestion
    );

    if (unansweredQuestions.length > 0) {
      // Ir para a primeira questão não respondida
      const nextUnanswered = unansweredQuestions[0];
      setTimeout(() => {
        setCurrentQuestion(nextUnanswered.id);
        newStatuses[nextUnanswered.id - 1] = { status: 'current' };
        setStepStatuses(newStatuses);
      }, 300);
    } else if (currentQuestion < 3) {
      // Avançar para próxima questão
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        newStatuses[currentQuestion] = { status: 'current' };
        setStepStatuses(newStatuses);
      }, 300);
    } else {
      // Todas respondidas - ir para resultado
      navigateTo('quiz-result', {
        competency: competencyData?.competency,
        category: competencyData?.category,
        categoryColor: competencyData?.categoryColor,
        competencyIcon: competencyData?.competencyIcon,
        categoryIcon: competencyData?.categoryIcon,
        selectedAnswers,
        questions,
        returnTo: competencyData?.fromPage || 'habilidades',
      });
    }
  };

  const handleSkip = () => {
    // Marcar questão atual como pulada
    const newStatuses = [...stepStatuses];
    newStatuses[currentQuestion - 1] = { status: 'skipped' };
    
    // Verificar se há próxima questão não respondida
    const remainingQuestions = questions.filter((q) => q.id > currentQuestion);

    if (remainingQuestions.length > 0) {
      const nextQuestion = remainingQuestions[0];
      newStatuses[nextQuestion.id - 1] = { status: 'current' };
      setStepStatuses(newStatuses);
      setCurrentQuestion(nextQuestion.id);
    } else {
      // Não há mais questões, apenas atualizar o status
      setStepStatuses(newStatuses);
    }
  };

  const handleCancel = () => {
    navigateTo('habilidades');
  };

  const handleBackClick = () => {
    const returnPage = competencyData?.fromPage || 'dashboard';
    navigateTo(returnPage);
  };

  // Calcular quantas questões já foram respondidas
  const answeredCount = Object.keys(selectedAnswers).length;

  // Funções para usar power-ups
  const useShield = () => {
    if (getPowerUpQuantity(3) > 0) {
      usePowerUp(3);
      setUsedShield(true);
      // Eliminar uma opção incorreta aleatória
      const incorrectOptions = currentQuestionData?.options.filter(opt => !opt.isCorrect) || [];
      if (incorrectOptions.length > 0) {
        const randomIncorrect = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        setEliminatedOptions([...eliminatedOptions, randomIncorrect.letter]);
        setShowPowerUpsMenu(false);
        toast.success('Escudo (50/50) ativado! Uma opção incorreta foi eliminada.');
      }
    } else {
      toast.error('Você não tem Escudos disponíveis.');
    }
  };

  const useRetry = () => {
    if (getPowerUpQuantity(1) > 0) {
      usePowerUp(1);
      // Reiniciar teste completo
      setSelectedAnswers({});
      setCurrentQuestion(1);
      setStepStatuses(
        Array(3).fill({ status: 'future' }).map((_, i) => ({
          status: i === 0 ? 'current' : 'future',
        }))
      );
      setUsedShield(false);
      setEliminatedOptions([]);
      setShowPowerUpsMenu(false);
      toast.success('Segunda Chance ativada! O teste foi reiniciado.');
    } else {
      toast.error('Você não tem Segunda Chances disponíveis.');
    }
  };

  const useTheoryLink = () => {
    if (getPowerUpQuantity(4) > 0) {
      usePowerUp(4);
      setShowTheoryLink(true);
      setShowPowerUpsMenu(false);
      toast.success('Link de conteúdo desbloqueado!');
    } else {
      toast.error('Você não tem Desbloqueios de Teoria disponíveis.');
    }
  };

  const useCheckAnswer = () => {
    if (!selectedAnswer) {
      toast.error('Selecione uma resposta primeiro!');
      return;
    }
    
    if (getPowerUpQuantity(8) > 0) {
      usePowerUp(8);
      // Verificar se a resposta está correta
      const isCorrect = currentQuestionData?.options.find(opt => opt.letter === selectedAnswer)?.isCorrect;
      
      if (isCorrect) {
        toast.success('✓ Sua resposta está CORRETA!', { duration: 3000 });
      } else {
        toast.error('✗ Sua resposta está INCORRETA. Escolha outra opção.', { duration: 3000 });
      }
      
      setShowPowerUpsMenu(false);
      loadUserPowerUps(); // Recarregar para atualizar quantidade
    } else {
      toast.error('Você não tem Conferir Resposta disponível.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Toaster position="top-center" />

      {/* Header */}
      <TestHeader
        categoryBadge={competencyData?.category || 'COMPETÊNCIAS DIGITAIS'}
        categoryColor={competencyData?.categoryColor || '#8B27FF'}
        title={`Desafio - ${competencyData?.competency || 'Noções Básicas'}`}
        onBackClick={handleBackClick}
        hideBackButton={false}
        area={competencyData?.category || 'COMPETÊNCIAS DIGITAIS'}
        competency={competencyData?.competency || 'Competência Digital'}
        bncc="Competência 5 - Cultura Digital (BNCC)"
        description={`Teste seus conhecimentos em ${competencyData?.competency || 'competências digitais'}.`}
      />

      {/* Progress Stepper */}
      <ProgressStepper
        totalSteps={3}
        currentStep={currentQuestion}
        stepStatuses={stepStatuses}
        showNavigation={false}
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 pb-40 md:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[0_8px_30px_rgba(139,39,255,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden relative">
              {/* Botão Varinha Mágica - Power-Ups */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center group z-10"
                title="Power-Ups"
                onClick={() => setShowPowerUpsMenu(!showPowerUpsMenu)}
              >
                <Wand2 className="w-5 h-5" />
              </button>

              {/* Header do Card com Indicador de Progresso */}
              <div 
                className="px-6 md:px-10 py-6 border-b border-gray-100 dark:border-gray-700"
                style={{ 
                  background: `linear-gradient(135deg, ${competencyData?.categoryColor}08 0%, transparent 100%)`
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                      style={{ backgroundColor: competencyData?.categoryColor || '#8B27FF' }}
                    >
                      {currentQuestion}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Questão {currentQuestion}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{answeredCount} de 3 respondidas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corpo do Card - Pergunta */}
              <div className="px-6 md:px-10 py-8 md:py-10">
                <h2 className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed mb-8 font-normal">
                  {currentQuestionData?.text}
                </h2>

                {/* HTML Interativo (se houver) */}
                {currentQuestionData?.htmlContent && (
                  <InteractiveHTMLWindow
                    htmlContent={currentQuestionData.htmlContent}
                    title="Simulação Interativa"
                    showRotateHint={currentQuestionData.showRotateHint}
                  />
                )}

                {/* Opções de Resposta */}
                <div className="space-y-3 mb-8">{currentQuestionData?.options.map((option, index) => (
                    <motion.div
                      key={option.letter}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                    >
                      <AnswerOption
                        letter={option.letter}
                        text={option.text}
                        isSelected={selectedAnswer === option.letter}
                        isCorrect={false}
                        isIncorrect={false}
                        showFeedback={false}
                        disabled={false}
                        onClick={() => handleSelectAnswer(option.letter)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer do Card - Botões de Ação */}
              <div 
                className="px-6 md:px-10 py-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                  {/* Botão Pular */}
                  <button
                    onClick={handleSkip}
                    className="order-1 sm:order-1 self-start sm:self-auto px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                  >
                    Pular
                  </button>

                  {/* Botão Enviar/Finalizar */}
                  <motion.button
                    onClick={handleSaveAnswer}
                    disabled={!selectedAnswer}
                    whileHover={selectedAnswer ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer ? { scale: 0.98 } : {}}
                    className="order-2 sm:order-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#8B27FF] text-white rounded-lg hover:bg-[#7B1FE8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                    style={{
                      background: selectedAnswer 
                        ? `linear-gradient(135deg, ${competencyData?.categoryColor || '#8B27FF'} 0%, ${competencyData?.categoryColor || '#A855F7'} 100%)`
                        : undefined
                    }}
                  >
                    <span>Salvar resposta</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Info Card - Dica */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-1">Dica</h3>
                <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
                  Não se preocupe, você pode revisar suas respostas ao final do desafio. Foque em aprender!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botões Flutuantes - Grupo Vertical (WhatsApp + Observação) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        {/* Botão WhatsApp */}
        <motion.a
          href="https://wa.me/5511999999999?text=Olá,%20preciso%20de%20ajuda%20com%20o%20desafio"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group"
          title="Contato via WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          {/* Tooltip */}
          <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Contato WhatsApp
          </span>
        </motion.a>

        {/* Botão Enviar Observação */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] border-2 border-[#8B27FF] dark:border-[#A855F7] rounded-full shadow-xl hover:bg-[#F3E8FF] dark:hover:bg-gray-700 hover:shadow-2xl transition-all flex items-center justify-center group"
          title="Enviar observação"
        >
          <MessageSquare className="w-6 h-6" />
          {/* Tooltip */}
          <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Enviar observação
          </span>
        </motion.button>
      </div>

      {/* Menu de Power-Ups */}
      {showPowerUpsMenu && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          className="fixed top-32 right-6 z-40 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-purple-200 dark:border-purple-700 p-4 min-w-[280px] max-w-[320px]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-bold text-gray-800 dark:text-gray-200">Suas Ferramentas</h3>
            </div>
            <button
              className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              onClick={() => setShowPowerUpsMenu(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {userPowerUps.length > 0 ? (
            <div className="space-y-2">
              {userPowerUps.map(powerup => {
                const PowerUpIcon = powerup.icon;
                const isDisabled = powerup.id === 3 && usedShield;
                
                return (
                  <button
                    key={powerup.id}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl transition-all
                      ${isDisabled 
                        ? 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer'
                      }
                    `}
                    onClick={() => {
                      if (powerup.id === 1) useRetry();
                      if (powerup.id === 3) useShield();
                      if (powerup.id === 4) useTheoryLink();
                      if (powerup.id === 8) useCheckAnswer();
                    }}
                    disabled={isDisabled}
                  >
                    <div 
                      className={`
                        flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                        ${isDisabled 
                          ? 'bg-gray-300 dark:bg-gray-600' 
                          : 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-md'
                        }
                      `}
                    >
                      <PowerUpIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-sm text-gray-800 dark:text-gray-200">
                        {powerup.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {powerup.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 bg-purple-600 rounded-lg">
                      <span className="text-xs font-bold text-white">
                        {powerup.quantity}x
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Coins className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Nenhum Power-Up disponível
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Compre power-ups com Digcoins na aba Progresso
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}