import { useEffect, useState } from "react";
import LoginPage from "./pages/Login";
import WelcomePage from "./pages/Welcome";
import DashboardPage from "./pages/Dashboard";
import AchievementsPage from "./pages/Achievements";
import SkillsPage from "./pages/Skills";
import ProgressPage from "./pages/Progress";
import BasicsPage from "./pages/Basics";
import BasicsCongratsPage from "./pages/BasicsCongrats";
import BasicsResultPage from "./pages/BasicsResult";
import AssessmentPage from "./pages/Assessment";
import AssessmentCongratsPage from "./pages/AssessmentCongrats";
import AssessmentResultPage from "./pages/AssessmentResult";
import QuizWarningPage from "./pages/QuizWarning";
import QuizPage from "./pages/Quiz";
import QuizResultPage from "./pages/QuizResult";
import ConteudosPage from "./pages/Contents";
import ExamesPage from "./pages/Exams";
import LessonPlanPage from "./pages/LessonPlan";
import FAQPage from "./pages/FAQ";
import AccessibilityPage from "./pages/Accessibility";
import ProfilePage from "./pages/Profile";
import TransversalityPage from "./pages/Transversality";
import SingleQuestionPage from "./pages/SingleQuestion";
import FloatingChatButton from "./components/FloatingChatButton";
// Temporarily disabled to isolate Invalid Hook Call during dev
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
  | "conteudo"
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

const PAGE_ROUTES: Record<Page, string> = {
  login: "/login",
  signup: "/signup",
  "forgot-password": "/forgot-password",
  welcome: "/welcome",
  dashboard: "/dashboard",
  conquistas: "/progress/achievements",
  habilidades: "/skills",
  progresso: "/progress/ranking",
  "progresso-conquistas": "/progress/conquests",
  "nocoes-basicas": "/basics",
  "nocoes-basicas-congrats": "/basics/congrats",
  "nocoes-basicas-result": "/basics/result",
  "teste-competencias": "/assessment",
  "teste-competencias-congrats": "/assessment/congrats",
  "teste-competencias-result": "/assessment/result",
  "quiz-warning": "/quiz/warning",
  quiz: "/quiz",
  "quiz-result": "/quiz/result",
  conteudos: "/contents",
  conteudo: "/contents",
  "plano-aula": "/lesson-plan",
  exames: "/exams",
  transversality: "/transversality",
  "single-question": "/question",
  faq: "/faq",
  acessibilidade: "/accessibility",
  perfil: "/profile",
  support: "/support",
  privacy: "/privacy",
  terms: "/terms",
};

const normalizePath = (value: string) => value.replace(/\/$/, "") || "/";

const ROUTE_TO_PAGE: Record<string, Page> = Object.entries(PAGE_ROUTES).reduce(
  (acc, [page, path]) => {
    acc[normalizePath(path)] = page as Page;
    return acc;
  },
  {} as Record<string, Page>
);

ROUTE_TO_PAGE["/"] = "login";

const resolvePageFromPath = (path: string): Page => {
  const normalized = normalizePath(path);
  return ROUTE_TO_PAGE[normalized] ?? "login";
};

const getInitialPage = (): Page => {
  if (typeof window === "undefined") {
    return "login";
  }
  return resolvePageFromPath(window.location.pathname);
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);
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

  const navigateTo = (page: string, data?: any) => {
    if (data) {
      setTestData(data);
    }
    setPreviousPage(currentPage);
    setCurrentPage(page as Page);
    if (typeof window !== "undefined") {
      const targetRoute = PAGE_ROUTES[page as Page];
      if (targetRoute) {
        window.history.pushState({}, "", targetRoute);
      }
    }
  };

  const switchModule = (module: "atesteme" | "prosaeb") => {
    setActiveModule(module);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      setCurrentPage(resolvePageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const hideChatButton =
    currentPage.includes("teste") ||
    currentPage.includes("quiz") ||
    currentPage.includes("nocoes-basicas") ||
    currentPage === "single-question";

  return (
    <div className="min-h-screen">
      {/* PWA Manager temporarily disabled for debugging Invalid Hook Call */}
      {/* <PWAManager /> */}

      {!hideChatButton && <FloatingChatButton />}

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
        <BasicsPage navigateTo={navigateTo} />
      )}
      {currentPage === "nocoes-basicas-congrats" && (
        <BasicsCongratsPage
          navigateTo={navigateTo}
          testData={testData}
        />
      )}
      {currentPage === "nocoes-basicas-result" && (
        <BasicsResultPage navigateTo={navigateTo} testData={testData} />
      )}
      {currentPage === "teste-competencias" && (
        <AssessmentPage navigateTo={navigateTo} />
      )}
      {currentPage === "teste-competencias-congrats" && (
        <AssessmentCongratsPage
          navigateTo={navigateTo}
          testData={testData}
        />
      )}
      {currentPage === "teste-competencias-result" && (
        <AssessmentResultPage
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
        <ConteudosPage
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
        <ExamesPage navigateTo={navigateTo} userRole={userRole} />
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
        <FAQPage navigateTo={navigateTo} userRole={userRole} />
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
