import { useEffect } from "react";
import { HeroBackground } from "./components/HeroBackground";
import { HeroCard } from "./components/HeroCard";
import type { WelcomePageProps } from "./types";

export default function WelcomePage({
  userName,
  onStartQuiz,
  onGoToDashboard,
}: WelcomePageProps) {
  useEffect(() => {
    localStorage.removeItem("testeCompetenciasCompleted");
    console.log("WelcomePage - Estado do teste resetado");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden md:overflow-auto">
      <HeroBackground />
      <div className="w-full max-w-[90vw] lg:max-w-[1600px] relative z-10">
        <HeroCard
          userName={userName}
          onStartQuiz={onStartQuiz}
          onGoToDashboard={onGoToDashboard}
        />
      </div>
    </div>
  );
}
