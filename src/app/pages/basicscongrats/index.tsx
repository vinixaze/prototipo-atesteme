import { ArrowRight, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { questions } from "../Basics/data";

interface BasicsCongratsPageProps {
  navigateTo: (page: string, data?: any) => void;
  testData?: {
    selectedAnswers: Record<number, string>;
  };
}

export default function BasicsCongratsPage({
  navigateTo,
  testData,
}: BasicsCongratsPageProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Confetti por 3 segundos
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const handleContinue = () => {
    // Calcular resultados
    const selectedAnswers = testData?.selectedAnswers || {};
    const results = questions.map((q) => {
      const userAnswer = selectedAnswers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      const isCorrect = userAnswer === correctOption?.letter;
      
      return {
        questionId: q.id,
        questionText: q.text,
        userAnswer: userAnswer || '',
        correctAnswer: correctOption?.letter || '',
        isCorrect,
        options: q.options,
      };
    });

    const correctCount = results.filter((r) => r.isCorrect).length;

    // Navegar para tela de resultado detalhado
    navigateTo('nocoes-basicas-result', {
      results,
      correctAnswers: correctCount,
      totalQuestions: 3,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B27FF] via-[#7B1FE8] to-[#6B17D0] dark:from-[#581C87] dark:via-[#6B21A8] dark:to-[#7E22CE] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: [
                    '#FFD700',
                    '#FF9800',
                    '#E91E63',
                    '#00BCD4',
                    '#4CAF50',
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-2xl w-full animate-scaleUp">
        {/* Ícone Central */}
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="w-32 h-32 bg-gradient-to-br from-[#FFD700] to-[#FFA500] dark:from-[#F59E0B] dark:to-[#D97706] rounded-full flex items-center justify-center shadow-2xl relative">
            <Trophy className="w-16 h-16 text-white" strokeWidth={2} />
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-100 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
            </div>
          </div>
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-6xl text-white text-center mb-4">
          Parabéns!
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-white text-center mb-12 opacity-95">
          Você completou o Desafio de Noções Básicas!
        </p>

        {/* Card de Ação */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Mensagem */}
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg mb-8">
            Ótimo trabalho! Agora vamos ver como você se saiu...
          </p>

          {/* Botão Principal */}
          <button
            onClick={handleContinue}
            className="w-full px-8 py-5 bg-[#8B27FF] dark:bg-[#A855F7] text-white rounded-xl hover:bg-[#7B1FE8] dark:hover:bg-[#9333EA] transition-all flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span>Ver meu resultado</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
