import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "../lib/auth/AuthContext";
import { ProtectedRoute } from "../lib/auth/ProtectedRoute";
import { useAppNavigation } from "../lib/navigation/useNavigation";
import { ROUTES } from "../lib/navigation/routes";
import type { PageId } from "../lib/navigation/routes";
import FloatingChatButton from "./components/FloatingChatButton";

// Import pages
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

interface BasicsAnswersData {
  selectedAnswers: Record<number, string>;
}

interface BasicsResultData {
  correctAnswers: number;
  totalQuestions: number;
  results: Array<{
    questionId: number;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    options: Array<{
      letter: string;
      text: string;
      isCorrect: boolean;
    }>;
  }>;
}

interface AssessmentTestData {
  answered: number;
  correct: number;
  total: number;
  selectedAnswers: Record<number, string>;
}

interface QuizMetaData {
  competency?: string;
  category?: string;
  categoryColor?: string;
  fromPage?: PageId;
  questions?: Array<{
    id: number;
    text: string;
    htmlContent?: string;
    options?: Array<{ letter: string; text: string; isCorrect?: boolean }>;
    explanation?: string;
    bncc?: string;
    correctAnswer?: string;
    transversality?: {
      curricular?: string;
      component?: string;
      year?: string;
      bnccType?: string;
      bnccCode?: string;
    };
  }>;
  selectedAnswers?: Record<number, string>;
  returnTo?: PageId;
}

interface ContentFilterData {
  category?: string;
}

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
        <p className="text-gray-600 mb-6">Esta pagina esta em desenvolvimento.</p>
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

function AppRoutes() {
  const { user, permissions, login, logout } = useAuth();
  const { navigateTo } = useAppNavigation();
  const location = useLocation();
  const [activeModule, setActiveModule] = useState<"atesteme" | "prosaeb">(
    "atesteme"
  );

  const handleLogin = (name: string) => {
    login(name);
    navigateTo("welcome");
  };

  const handleLogout = () => {
    logout();
    navigateTo("login");
  };

  const hideChatButton = ["/assessment", "/quiz", "/basics", "/question"].some(
    (path) => location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen">
      {!hideChatButton && <FloatingChatButton />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path={ROUTES.login.path}
          element={<LoginPage onLogin={handleLogin} navigateTo={navigateTo} />}
        />
        <Route
          path={ROUTES.signup.path}
          element={<PlaceholderPage title="Criar Conta" onBack={() => navigateTo("login")} />}
        />
        <Route
          path={ROUTES["forgot-password"].path}
          element={<PlaceholderPage title="Recuperar Senha" onBack={() => navigateTo("login")} />}
        />
        <Route
          path={ROUTES.support.path}
          element={<PlaceholderPage title="Atendimento ao Usuario" onBack={() => navigateTo("login")} />}
        />
        <Route
          path={ROUTES.privacy.path}
          element={<PlaceholderPage title="Politicas de Privacidade" onBack={() => navigateTo("login")} />}
        />
        <Route
          path={ROUTES.terms.path}
          element={<PlaceholderPage title="Termos e Condicoes" onBack={() => navigateTo("login")} />}
        />
        <Route
          path={ROUTES.chatbot.path}
          element={
            <ProtectedRoute guards={ROUTES.chatbot.guards}>
              <PlaceholderPage title="Chatbot" onBack={() => navigateTo("dashboard")} />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.welcome.path}
          element={
            <ProtectedRoute guards={ROUTES.welcome.guards}>
              <WelcomePage
                userName={user?.name || ""}
                onStartQuiz={() => navigateTo("teste-competencias")}
                onGoToDashboard={() => navigateTo("dashboard")}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.dashboard.path}
          element={
            <ProtectedRoute guards={ROUTES.dashboard.guards}>
              <DashboardPage
                userName={user?.name || ""}
                navigateTo={navigateTo}
                userRole={user?.role || "user"}
                onLogout={handleLogout}
                activeModule={activeModule}
                onModuleChange={setActiveModule}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.conquistas.path}
          element={
            <ProtectedRoute guards={ROUTES.conquistas.guards}>
              <AchievementsPage navigateTo={navigateTo} userRole={user?.role || "user"} />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.habilidades.path}
          element={
            <ProtectedRoute guards={ROUTES.habilidades.guards}>
              <SkillsPage navigateTo={navigateTo} userRole={user?.role || "user"} />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.progresso.path}
          element={
            <ProtectedRoute guards={ROUTES.progresso.guards}>
              <ProgressPage
                navigateTo={navigateTo}
                userName={user?.name || ""}
                initialTab="niveis"
                userRole={user?.role || "user"}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["progresso-conquistas"].path}
          element={
            <ProtectedRoute guards={ROUTES["progresso-conquistas"].guards}>
              <ProgressPage
                navigateTo={navigateTo}
                userName={user?.name || ""}
                initialTab="conquistas"
                userRole={user?.role || "user"}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.digcoins.path}
          element={
            <ProtectedRoute guards={ROUTES.digcoins.guards}>
              <ProgressPage
                navigateTo={navigateTo}
                userName={user?.name || ""}
                initialTab="digcoins"
                userRole={user?.role || "user"}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["nocoes-basicas"].path}
          element={
            <ProtectedRoute guards={ROUTES["nocoes-basicas"].guards}>
              <BasicsPage navigateTo={navigateTo} />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["nocoes-basicas-congrats"].path}
          element={
            <ProtectedRoute guards={ROUTES["nocoes-basicas-congrats"].guards}>
              <BasicsCongratsPage
                navigateTo={navigateTo}
                testData={
                  permissions.testData
                    ? (permissions.testData as BasicsAnswersData)
                    : undefined
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["nocoes-basicas-result"].path}
          element={
            <ProtectedRoute guards={ROUTES["nocoes-basicas-result"].guards}>
              <BasicsResultPage
                navigateTo={navigateTo}
                testData={
                  permissions.testData
                    ? (permissions.testData as BasicsResultData)
                    : undefined
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["teste-competencias"].path}
          element={
            <ProtectedRoute guards={ROUTES["teste-competencias"].guards}>
              <AssessmentPage navigateTo={navigateTo} />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["teste-competencias-congrats"].path}
          element={
            <ProtectedRoute guards={ROUTES["teste-competencias-congrats"].guards}>
              <AssessmentCongratsPage
                navigateTo={navigateTo}
                testData={
                  permissions.testData
                    ? (permissions.testData as AssessmentTestData)
                    : undefined
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["teste-competencias-result"].path}
          element={
            <ProtectedRoute guards={ROUTES["teste-competencias-result"].guards}>
              <AssessmentResultPage
                navigateTo={navigateTo}
                testData={
                  permissions.testData
                    ? (permissions.testData as AssessmentTestData)
                    : undefined
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["quiz-warning"].path}
          element={
            <ProtectedRoute guards={ROUTES["quiz-warning"].guards}>
              <QuizWarningPage
                navigateTo={navigateTo}
                competencyData={
                  permissions.quizAccess?.data
                    ? (permissions.quizAccess.data as QuizMetaData)
                    : undefined
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.quiz.path}
          element={
            <ProtectedRoute guards={ROUTES.quiz.guards}>
              <QuizPage
                navigateTo={navigateTo}
                competencyData={
                  permissions.quizAccess?.data
                    ? (permissions.quizAccess.data as QuizMetaData)
                    : undefined
                }
                quizData={
                  permissions.quizAccess?.data
                    ? (permissions.quizAccess.data as QuizMetaData)
                    : undefined
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["quiz-result"].path}
          element={
            <ProtectedRoute guards={ROUTES["quiz-result"].guards}>
              <QuizResultPage
                navigateTo={navigateTo}
                testData={
                  permissions.quizAccess?.data
                    ? (permissions.quizAccess.data as QuizMetaData)
                    : undefined
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.conteudos.path}
          element={
            <ProtectedRoute guards={ROUTES.conteudos.guards}>
              <ConteudosPage
                navigateTo={navigateTo}
                filterData={
                  permissions.testData
                    ? (permissions.testData as ContentFilterData)
                    : undefined
                }
                userRole={user?.role || "user"}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["plano-aula"].path}
          element={
            <ProtectedRoute guards={ROUTES["plano-aula"].guards}>
              <LessonPlanPage
                navigateTo={navigateTo}
                filterData={
                  permissions.testData
                    ? (permissions.testData as ContentFilterData)
                    : undefined
                }
                userRole={user?.role || "user"}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.exames.path}
          element={
            <ProtectedRoute guards={ROUTES.exames.guards}>
              <ExamesPage navigateTo={navigateTo} userRole={user?.role || "user"} />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.transversality.path}
          element={
            <ProtectedRoute guards={ROUTES.transversality.guards}>
              <TransversalityPage
                navigateTo={navigateTo}
                userName={user?.name || ""}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES["single-question"].path}
          element={
            <ProtectedRoute guards={ROUTES["single-question"].guards}>
              <SingleQuestionPage
                navigateTo={navigateTo}
                userName={user?.name || ""}
                onLogout={handleLogout}
                questionData={
                  permissions.testData
                    ? (permissions.testData as QuizMetaData)
                    : undefined
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.faq.path}
          element={
            <ProtectedRoute guards={ROUTES.faq.guards}>
              <FAQPage navigateTo={navigateTo} userRole={user?.role || "user"} />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.acessibilidade.path}
          element={
            <ProtectedRoute guards={ROUTES.acessibilidade.guards}>
              <AccessibilityPage navigateTo={navigateTo} userRole={user?.role || "user"} />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.perfil.path}
          element={
            <ProtectedRoute guards={ROUTES.perfil.guards}>
              <ProfilePage
                userName={user?.name || ""}
                navigateTo={navigateTo}
                userRole={user?.role || "user"}
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
