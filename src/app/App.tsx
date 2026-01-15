import { useMemo, useState, type ReactElement } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/login";
import WelcomePage from "./pages/welcome";
import DashboardPage from "./pages/dashboard";
import AchievementsPage from "./pages/achievements";
import SkillsPage from "./pages/skills";
import ProgressPage from "./pages/progress";
import BasicsPage from "./pages/basics";
import BasicsCongratsPage from "./pages/basicscongrats";
import BasicsResultPage from "./pages/basicsresult";
import AssessmentPage from "./pages/assessment";
import AssessmentCongratsPage from "./pages/assessmentcongrats";
import AssessmentResultPage from "./pages/assessmentresult";
import QuizWarningPage from "./pages/quizwarning";
import QuizPage from "./pages/quiz";
import QuizResultPage from "./pages/quizresult";
import ConteudosPage from "./pages/contents";
import ExamesPage from "./pages/exams";
import LessonPlanPage from "./pages/lessonplan";
import FAQPage from "./pages/faq";
import AccessibilityPage from "./pages/accessibility";
import ProfilePage from "./pages/profile";
import TransversalityPage from "./pages/transversality";
import SingleQuestionPage from "./pages/singlequestion";
import FloatingChatButton from "./pages/shared/components/FloatingChatButton";
// Temporarily disabled to isolate Invalid Hook Call during dev
// import PWAManager from "./pages/shared/components/PWAManager";

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

function PlaceholderPage({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl text-[#8B27FF] mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">Esta página está em desenvolvimento.</p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-[#8B27FF] text-white rounded-xl hover:bg-[#7B1FE8] transition-all"
        >
          Voltar ao Login
        </button>
      </div>
    </div>
  );
}

function RequireAuth({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: ReactElement;
}) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function RequireQuizWarning({
  isAuthenticated,
  quizData,
  children,
}: {
  isAuthenticated: boolean;
  quizData: any;
  children: ReactElement;
}) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!quizData) {
    return <Navigate to="/skills" replace />;
  }
  return children;
}

function RequireQuizStart({
  isAuthenticated,
  quizData,
  quizAccessGranted,
  children,
}: {
  isAuthenticated: boolean;
  quizData: any;
  quizAccessGranted: boolean;
  children: ReactElement;
}) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!quizData) {
    return <Navigate to="/skills" replace />;
  }
  if (!quizAccessGranted) {
    return <Navigate to="/quiz/warning" replace />;
  }
  return children;
}

function RequireAssessmentStart({
  isAuthenticated,
  assessmentAccessGranted,
  children,
}: {
  isAuthenticated: boolean;
  assessmentAccessGranted: boolean;
  children: ReactElement;
}) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!assessmentAccessGranted) {
    return <Navigate to="/welcome" replace />;
  }
  return children;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = useMemo(
    () => resolvePageFromPath(location.pathname),
    [location.pathname]
  );

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "user">("user");
  const [testData, setTestData] = useState<any>(null);
  const [quizData, setQuizData] = useState<any>(null);
  const [previousPage, setPreviousPage] = useState<Page>("dashboard");
  const [quizAccessGranted, setQuizAccessGranted] = useState(false);
  const [assessmentAccessGranted, setAssessmentAccessGranted] = useState(false);
  const [activeModule, setActiveModule] = useState<"atesteme" | "prosaeb">(
    "atesteme"
  );
  const isAuthenticated = userName.trim().length > 0;

  const navigateTo = (page: string, data?: any) => {
    setPreviousPage(currentPage);
    if (data) {
      if (["quiz-warning", "quiz", "quiz-result"].includes(page)) {
        setQuizData(data);
      } else {
        setTestData(data);
      }
    }

    if (page === "quiz-warning") {
      setQuizAccessGranted(false);
    }
    if (page === "quiz") {
      setQuizAccessGranted(currentPage === "quiz-warning");
    }
    if (page === "teste-competencias") {
      setAssessmentAccessGranted(currentPage === "welcome");
    }

    const targetRoute = PAGE_ROUTES[page as Page];
    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setUserRole("user");
    navigateTo("welcome");
  };

  const handleLogout = () => {
    setUserName("");
    setTestData(null);
    setQuizData(null);
    setQuizAccessGranted(false);
    setAssessmentAccessGranted(false);
    navigateTo("login");
  };

  const switchModule = (module: "atesteme" | "prosaeb") => {
    setActiveModule(module);
  };

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

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} navigateTo={navigateTo} />}
        />
        <Route
          path="/signup"
          element={
            <PlaceholderPage
              title="Criar Conta"
              onBack={() => navigateTo("login")}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PlaceholderPage
              title="Recuperar Senha"
              onBack={() => navigateTo("login")}
            />
          }
        />
        <Route
          path="/support"
          element={
            <PlaceholderPage
              title="Atendimento ao Usuケrio"
              onBack={() => navigateTo("login")}
            />
          }
        />
        <Route
          path="/privacy"
          element={
            <PlaceholderPage
              title="Polヴticas de Privacidade"
              onBack={() => navigateTo("login")}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <PlaceholderPage
              title="Termos e CondiВリes"
              onBack={() => navigateTo("login")}
            />
          }
        />

        <Route
          path="/welcome"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <WelcomePage
                userName={userName}
                onStartQuiz={() => navigateTo("teste-competencias")}
                onGoToDashboard={() => navigateTo("dashboard")}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <DashboardPage
                userName={userName}
                navigateTo={navigateTo}
                userRole={userRole}
                onLogout={handleLogout}
                activeModule={activeModule}
                onModuleChange={switchModule}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/progress/achievements"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <AchievementsPage navigateTo={navigateTo} userRole={userRole} />
            </RequireAuth>
          }
        />
        <Route
          path="/skills"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <SkillsPage navigateTo={navigateTo} userRole={userRole} />
            </RequireAuth>
          }
        />
        <Route
          path="/progress/ranking"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <ProgressPage
                navigateTo={navigateTo}
                userName={userName}
                initialTab="niveis"
                userRole={userRole}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/progress/conquests"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <ProgressPage
                navigateTo={navigateTo}
                userName={userName}
                initialTab="conquistas"
                userRole={userRole}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/basics"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <BasicsPage navigateTo={navigateTo} />
            </RequireAuth>
          }
        />
        <Route
          path="/basics/congrats"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <BasicsCongratsPage navigateTo={navigateTo} testData={testData} />
            </RequireAuth>
          }
        />
        <Route
          path="/basics/result"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <BasicsResultPage navigateTo={navigateTo} testData={testData} />
            </RequireAuth>
          }
        />
        <Route
          path="/assessment"
          element={
            <RequireAssessmentStart
              isAuthenticated={isAuthenticated}
              assessmentAccessGranted={assessmentAccessGranted}
            >
              <AssessmentPage navigateTo={navigateTo} />
            </RequireAssessmentStart>
          }
        />
        <Route
          path="/assessment/congrats"
          element={
            <RequireAssessmentStart
              isAuthenticated={isAuthenticated}
              assessmentAccessGranted={assessmentAccessGranted}
            >
              <AssessmentCongratsPage navigateTo={navigateTo} testData={testData} />
            </RequireAssessmentStart>
          }
        />
        <Route
          path="/assessment/result"
          element={
            <RequireAssessmentStart
              isAuthenticated={isAuthenticated}
              assessmentAccessGranted={assessmentAccessGranted}
            >
              <AssessmentResultPage navigateTo={navigateTo} testData={testData} />
            </RequireAssessmentStart>
          }
        />
        <Route
          path="/quiz/warning"
          element={
            <RequireQuizWarning isAuthenticated={isAuthenticated} quizData={quizData}>
              <QuizWarningPage navigateTo={navigateTo} competencyData={quizData} />
            </RequireQuizWarning>
          }
        />
        <Route
          path="/quiz"
          element={
            <RequireQuizStart
              isAuthenticated={isAuthenticated}
              quizData={quizData}
              quizAccessGranted={quizAccessGranted}
            >
              <QuizPage navigateTo={navigateTo} competencyData={quizData} />
            </RequireQuizStart>
          }
        />
        <Route
          path="/quiz/result"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <QuizResultPage
                navigateTo={navigateTo}
                testData={quizData}
                previousPage={previousPage}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/contents"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <ConteudosPage
                navigateTo={navigateTo}
                filterData={testData}
                userRole={userRole}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/lesson-plan"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <LessonPlanPage
                navigateTo={navigateTo}
                filterData={testData}
                userRole={userRole}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/exams"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <ExamesPage navigateTo={navigateTo} userRole={userRole} />
            </RequireAuth>
          }
        />
        <Route
          path="/transversality"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <TransversalityPage
                navigateTo={navigateTo}
                currentPage={currentPage}
                userName={userName}
                onLogout={handleLogout}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/question"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <SingleQuestionPage
                navigateTo={navigateTo}
                userName={userName}
                onLogout={handleLogout}
                questionData={testData}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/faq"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <FAQPage navigateTo={navigateTo} userRole={userRole} />
            </RequireAuth>
          }
        />
        <Route
          path="/accessibility"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <AccessibilityPage navigateTo={navigateTo} userRole={userRole} />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <ProfilePage
                userName={userName}
                navigateTo={navigateTo}
                userRole={userRole}
              />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
