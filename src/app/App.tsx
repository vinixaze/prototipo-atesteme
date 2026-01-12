import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import DashboardPage from "./pages/DashboardPage";
import AchievementsPage from "./pages/AchievementsPage";
import SkillsPage from "./pages/SkillsPage";
import ProgressPage from "./pages/ProgressPage";
import BasicConceptsPage from "./pages/BasicConceptsPage";
import BasicConceptsCongratsPage from "./pages/BasicConceptsCongratsPage";
import BasicConceptsResultPage from "./pages/BasicConceptsResultPage";
import CompetencyTestPage from "./pages/CompetencyTestPage";
import CompetencyTestCongratsPage from "./pages/CompetencyTestCongratsPage";
import CompetencyTestDetailedResultPage from "./pages/CompetencyTestDetailedResultPage";
import QuizWarningPage from "./pages/QuizWarningPage";
import QuizPage from "./pages/QuizPage";
import QuizResultPage from "./pages/QuizResultPage";
import ContentPage from "./pages/ContentPage";
import ExamsPage from "./pages/ExamsPage";
import LessonPlanPage from "./pages/LessonPlanPage";
import FaqPage from "./pages/FaqPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import ProfilePage from "./pages/ProfilePage";
import TransversalityPage from "./pages/TransversalityPage";
import SingleQuestionPage from "./pages/SingleQuestionPage";
// Desabilitado temporariamente para isolar Invalid Hook Call durante o desenvolvimento
// import PWAManager from "./components/PWAManager";

type Page =
  | "login"
  | "signup"
  | "forgot-password"
  | "welcome"
  | "dashboard"
  | "conquistas"
  | "habilidades"
  | "progresso"
  | "progresso-conquistas"
  | "nocoes-basicas"
  | "nocoes-basicas-congrats"
  | "nocoes-basicas-result"
  | "teste-competencias"
  | "teste-competencias-congrats"
  | "teste-competencias-result"
  | "quiz-warning"
  | "quiz"
  | "quiz-result"
  | "conteudos"
  | "plano-aula"
  | "exames"
  | "transversality"
  | "single-question"
  | "faq"
  | "acessibilidade"
  | "perfil"
  | "support"
  | "privacy"
  | "terms";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [userName, setUserName] = useState("André");
  const [userRole, setUserRole] = useState<"admin" | "user">("user");
  const [testData, setTestData] = useState<any>(null);
  const [previousPage, setPreviousPage] = useState<Page>("dashboard");
  const [activeModule, setActiveModule] = useState<"atesteme" | "prosaeb">(
    "atesteme"
  );

  const handleLogin = (name: string) => {
    setUserName(name);
    setUserRole("user");
    setCurrentPage("welcome");
  };

  const handleLogout = () => {
    setCurrentPage("login");
    setUserName("");
  };

  const navigateTo = (page: Page, data?: any) => {
    if (data) {
      setTestData(data);
    }
    setPreviousPage(currentPage);
    setCurrentPage(page);
  };

  const switchModule = (module: "atesteme" | "prosaeb") => {
    setActiveModule(module);
  };

  return (
    <div className="min-h-screen">
      {/* PWA Manager desabilitado temporariamente para depurar Invalid Hook Call */}
      {/* <PWAManager /> */}

      {currentPage === "login" && (
        <LoginPage onLogin={handleLogin} navigateTo={navigateTo} />
      )}
      {currentPage === "welcome" && (
        <WelcomePage
          userName={userName}
          onStartQuiz={() => navigateTo("teste-competencias")}
          onGoToDashboard={() => navigateTo("dashboard")}
        />
      )}
      {(currentPage === "signup" ||
        currentPage === "forgot-password" ||
        currentPage === "support" ||
        currentPage === "privacy" ||
        currentPage === "terms") && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl text-[#8B27FF] mb-4">
              {currentPage === "signup" && "Criar Conta"}
              {currentPage === "forgot-password" && "Recuperar Senha"}
              {currentPage === "support" && "Atendimento ao Usuário"}
              {currentPage === "privacy" && "Políticas de Privacidade"}
              {currentPage === "terms" && "Termos e Condições"}
            </h2>
            <p className="text-gray-600 mb-6">
              Esta página está em desenvolvimento.
            </p>
            <button
              onClick={() => navigateTo("login")}
              className="px-6 py-3 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
            >
              Voltar ao Login
            </button>
          </div>
        </div>
      )}
      {currentPage === "dashboard" && (
        <DashboardPage
          userName={userName}
          navigateTo={navigateTo}
          userRole={userRole}
          onLogout={handleLogout}
          activeModule={activeModule}
          onModuleChange={switchModule}
        />
      )}
      {currentPage === "conquistas" && (
        <AchievementsPage navigateTo={navigateTo} userRole={userRole} />
      )}
      {currentPage === "habilidades" && (
        <SkillsPage navigateTo={navigateTo} userRole={userRole} />
      )}
      {currentPage === "progresso" && (
        <ProgressPage
          navigateTo={navigateTo}
          userName={userName}
          initialTab="niveis"
          userRole={userRole}
        />
      )}
      {currentPage === "progresso-conquistas" && (
        <ProgressPage
          navigateTo={navigateTo}
          userName={userName}
          initialTab="conquistas"
          userRole={userRole}
        />
      )}
      {currentPage === "nocoes-basicas" && (
        <BasicConceptsPage navigateTo={navigateTo} />
      )}
      {currentPage === "nocoes-basicas-congrats" && (
        <BasicConceptsCongratsPage
          navigateTo={navigateTo}
          testData={testData}
        />
      )}
      {currentPage === "nocoes-basicas-result" && (
        <BasicConceptsResultPage navigateTo={navigateTo} testData={testData} />
      )}
      {currentPage === "teste-competencias" && (
        <CompetencyTestPage navigateTo={navigateTo} />
      )}
      {currentPage === "teste-competencias-congrats" && (
        <CompetencyTestCongratsPage
          navigateTo={navigateTo}
          testData={testData}
        />
      )}
      {currentPage === "teste-competencias-result" && (
        <CompetencyTestDetailedResultPage
          navigateTo={navigateTo}
          testData={testData}
        />
      )}
      {currentPage === "quiz-warning" && (
        <QuizWarningPage navigateTo={navigateTo} competencyData={testData} />
      )}
      {currentPage === "quiz" && (
        <QuizPage navigateTo={navigateTo} competencyData={testData} />
      )}
      {currentPage === "quiz-result" && (
        <QuizResultPage
          navigateTo={navigateTo}
          testData={testData}
          previousPage={previousPage}
        />
      )}
      {currentPage === "conteudo" && (
        <ContentPage
          navigateTo={navigateTo}
          filterData={testData}
          userRole={userRole}
        />
      )}
      {currentPage === "plano-aula" && (
        <LessonPlanPage
          navigateTo={navigateTo}
          filterData={testData}
          userRole={userRole}
        />
      )}
      {currentPage === "exames" && (
        <ExamsPage navigateTo={navigateTo} userRole={userRole} />
      )}
      {currentPage === "transversality" && (
        <TransversalityPage
          navigateTo={navigateTo}
          currentPage={currentPage}
          userName={userName}
          onLogout={handleLogout}
        />
      )}
      {currentPage === "single-question" && (
        <SingleQuestionPage
          navigateTo={navigateTo}
          userName={userName}
          onLogout={handleLogout}
          questionData={testData}
        />
      )}
      {currentPage === "faq" && (
        <FaqPage navigateTo={navigateTo} userRole={userRole} />
      )}
      {currentPage === "acessibilidade" && (
        <AccessibilityPage navigateTo={navigateTo} userRole={userRole} />
      )}
      {currentPage === "perfil" && (
        <ProfilePage
          userName={userName}
          navigateTo={navigateTo}
          userRole={userRole}
        />
      )}
    </div>
  );
}
