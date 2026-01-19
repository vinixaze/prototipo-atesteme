import { Toaster } from "sonner";
import TestQuestion from "../shared/components/TestQuestion";
import TestCongrats from "../shared/components/TestCongrats";
import TestResult from "../shared/components/TestResult";
import type { AssessmentPageProps } from "./types";
import { useAssessmentLogic } from "./useAssessmentLogic";

export default function AssessmentPage({ navigateTo }: AssessmentPageProps) {
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
  } = useAssessmentLogic();

  /* Render Pages */
  if (pageState === 'congrats' && testResults) {
    return (
      <>
        <Toaster position="top-center" />
        <TestCongrats
          testName="Teste de Competências Digitais"
          message="Você completou todas as 16 questões. Agora vamos descobrir seu nível de letramento digital e começar sua jornada de aprendizado!"
          onContinue={handleCongratsClick}
          showRocket={true}
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
          testName="Teste de Competências Digitais"
          correctAnswers={testResults.correctAnswers}
          totalQuestions={testResults.totalQuestions}
          results={testResults.results}
          onBackClick={() => navigateTo('dashboard')}
        />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <TestQuestion
        currentQuestion={currentQuestion}
        totalQuestions={16}
        questionText={currentQuestionData?.text}
        questionImage={currentQuestionData?.image}
        questionHtml={currentQuestionData?.interactiveHtml}
        options={currentQuestionData?.options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        onSaveAnswer={handleSaveAnswer}
        onSkip={handleSkip}
        onFinish={handleFinish}
        stepStatuses={stepStatuses}
        title={`${currentQuestionData?.competency}`}
        categoryBadge={currentQuestionData?.category}
        categoryColor={currentQuestionData?.categoryColor}
        onBackClick={() => navigateTo('dashboard')}
        isLastQuestion={currentQuestion === 16}
      />
    </>
  );
}

