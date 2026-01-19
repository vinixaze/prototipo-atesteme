import { Toaster } from "sonner";
import TestQuestion from "../shared/components/TestQuestion";
import TestCongrats from "../shared/components/TestCongrats";
import TestResult from "../shared/components/TestResult";
import { explanations, questions } from "./data";
import type { BasicsPageProps } from "./types";
import { useBasicsLogic } from "./useBasicsLogic";

export default function BasicsPage({ navigateTo }: BasicsPageProps) {
  const {
    pageState,
    testResults,
    currentQuestion,
    currentQuestionData,
    selectedAnswer,
    stepStatuses,
    handleSelectAnswer,
    handleSaveAnswer,
    handleSkip,
    handleFinish,
    handleCongratsClick,
  } = useBasicsLogic();

  /* Render Pages */
  if (pageState === 'congrats' && testResults) {
    return (
      <>
        <Toaster position="top-center" />
        <TestCongrats
          testName="Teste de Noções Básicas"
          message="Ótimo trabalho! Agora vamos ver como você se saiu..."
          onContinue={handleCongratsClick}
          showRocket={false}
        />
      </>
    );
  }

  if (pageState === 'result' && testResults) {
    return (
      <>
        <Toaster position="top-center" />
        <TestResult
          navigateTo={navigateTo}
          testName="Teste de Noções Básicas"
          correctAnswers={testResults.correctAnswers}
          totalQuestions={testResults.totalQuestions}
          results={testResults.results}
          onBackClick={() => navigateTo('dashboard')}
          explanations={explanations}
        />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <TestQuestion
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        questionText={currentQuestionData?.text}
        questionImage={currentQuestionData?.image}
        options={currentQuestionData?.options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        onSaveAnswer={handleSaveAnswer}
        onSkip={handleSkip}
        onFinish={handleFinish}
        stepStatuses={stepStatuses}
        title="Teste de Noções Básicas"
        categoryBadge={currentQuestionData?.category}
        categoryColor={currentQuestionData?.categoryColor}
        onBackClick={() => navigateTo('dashboard')}
        isLastQuestion={currentQuestion === questions.length}
      />
    </>
  );
}

