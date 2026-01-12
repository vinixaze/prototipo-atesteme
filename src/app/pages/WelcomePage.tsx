import { useEffect } from "react";
// @ts-expect-error: Image asset not found in dev environment, placeholder used for type safety.
import logoImage from "../../assets/bd6e15ee05cd5d9957a2d399e18c0693a6190505.png";
import { WelcomeBackground } from "./welcome/WelcomeBackground";
import { WelcomeCard } from "./welcome/WelcomeCard";
import { WelcomeFooter } from "./welcome/WelcomeFooter";

interface WelcomePageProps {
  userName?: string;
  onStartQuiz: () => void;
  onGoToDashboard: () => void;
}

export default function WelcomePage({
  userName,
  onStartQuiz,
  onGoToDashboard,
}: WelcomePageProps) {
  // Limpar o estado do teste quando a tela Welcome é carregada (nova sessão)
  useEffect(() => {
    localStorage.removeItem("testeCompetenciasCompleted");
    console.log("WelcomePage - Estado do teste resetado");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden md:overflow-auto">
      <WelcomeBackground />
      <WelcomeCard
        userName={userName}
        logoImage={logoImage}
        onStartQuiz={onStartQuiz}
        onGoToDashboard={onGoToDashboard}
      />
      <WelcomeFooter />
    </div>
  );
}
