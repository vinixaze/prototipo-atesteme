import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "../lib/auth/AuthContext";
import { ProtectedRoute } from "../lib/auth/ProtectedRoute";
import { useAppNavigation } from "../lib/navigation/useNavigation";
import { ROUTES } from "../lib/navigation/routes";
import FloatingChatButton from "./FloatingChatButton";
import PlaceholderPage from "./PlaceholderPage";
import {
  isAssessmentTestData,
  isBasicsAnswersData,
  isBasicsResultData,
  isContentFilterData,
  isQuestionData,
  isQuizMetaData,
} from "./types/app";

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

function AppRoutes() {
  const { user, permissions, logout } = useAuth();
  const { navigateTo } = useAppNavigation();
  const location = useLocation();
  const [activeModule, setActiveModule] = useState<"atesteme" | "prosaeb">(
    "atesteme"
  );

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
          element={<LoginPage navigateTo={navigateTo} />}
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
                  isBasicsAnswersData(permissions.testData)
                    ? permissions.testData
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
                  isBasicsResultData(permissions.testData)
                    ? permissions.testData
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
                  isAssessmentTestData(permissions.testData)
                    ? permissions.testData
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
                  isAssessmentTestData(permissions.testData)
                    ? permissions.testData
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
                  isQuizMetaData(permissions.quizAccess?.data)
                    ? permissions.quizAccess?.data
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
                  isQuizMetaData(permissions.quizAccess?.data)
                    ? permissions.quizAccess?.data
                    : undefined
                }
                quizData={
                  isQuizMetaData(permissions.quizAccess?.data)
                    ? permissions.quizAccess?.data
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
                  isQuizMetaData(permissions.quizAccess?.data)
                    ? permissions.quizAccess?.data
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
                  isContentFilterData(permissions.testData)
                    ? permissions.testData
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
                  isContentFilterData(permissions.testData)
                    ? permissions.testData
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
                  isQuestionData(permissions.testData)
                    ? permissions.testData
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
