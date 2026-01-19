import { useState } from "react";
import { toast } from "sonner";
import { saveCompetencyResult } from "../../utils/competencyStorage";
import { questions } from "./data";

export type PageState = "question" | "congrats" | "result";

type StepStatus = { status: "current" | "answered" | "future" | "skipped" };

type AssessmentResultItem = {
  questionId: number;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: (typeof questions)[number]["options"];
  explanation: string;
  category: string;
  categoryColor: string;
  competency: string;
};

export type AssessmentResults = {
  results: AssessmentResultItem[];
  correctAnswers: number;
  totalQuestions: number;
};

type CompetencyGroup = {
  correct: number;
  errors: number;
  cat: string;
  col: string;
};

const TOTAL_QUESTIONS = 16;

export function useAssessmentLogic() {
  const [pageState, setPageState] = useState<PageState>("question");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFillingSkipped, setIsFillingSkipped] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
      status: i === 0 ? "current" : "future",
    }))
  );
  const [testResults, setTestResults] = useState<AssessmentResults | null>(null);

  const currentQuestionData = questions[currentQuestion - 1];

  const handleSelectAnswer = (letter: string) => {
    setSelectedAnswer(letter);
  };

  const handleSaveAnswer = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion]: selectedAnswer,
    };
    setSelectedAnswers(updatedAnswers);

    // marca atual como answered
    setStepStatuses((prev) => {
      const next = [...prev];
      next[currentQuestion - 1] = { status: "answered" };
      return next;
    });

    setSelectedAnswer("");

    const unanswered = questions.filter((q) => !updatedAnswers[q.id]);

    // se estÇ­ preenchendo puladas, continua nelas
    if (isFillingSkipped) {
      if (unanswered.length > 0) {
        const nextUnanswered = unanswered[0];
        setTimeout(() => {
          setStepStatuses((prev) => {
            const next = [...prev];
            next[nextUnanswered.id - 1] = { status: "current" };
            return next;
          });
          setCurrentQuestion(nextUnanswered.id);
        }, 300);
      } else {
        setTimeout(() => {
          setIsFillingSkipped(false);
          finalizarTeste(updatedAnswers);
        }, 300);
      }
      return;
    }

    // ƒo. salvou na Ç§ltima questÇœo
    if (currentQuestion === TOTAL_QUESTIONS) {
      if (unanswered.length > 0) {
        setIsFillingSkipped(true);

        toast.warning("VocÇ¦ tem questÇæes sem resposta!", {
          description: `Complete as ${unanswered.length} questÇœo${unanswered.length > 1 ? "Çæes" : ""} restante${unanswered.length > 1 ? "s" : ""} para finalizar.`,
          duration: 5000,
        });

        const firstUnanswered = unanswered[0];
        setTimeout(() => {
          setStepStatuses((prev) => {
            const next = [...prev];
            next[firstUnanswered.id - 1] = { status: "current" };
            return next;
          });
          setCurrentQuestion(firstUnanswered.id);
        }, 300);

        return;
      }

      // ƒo. sem pendÇ¦ncias -> finaliza
      setTimeout(() => finalizarTeste(updatedAnswers), 300);
      return;
    }

    // fluxo normal: vai pra prÇüxima
    setTimeout(() => {
      setStepStatuses((prev) => {
        const next = [...prev];
        next[currentQuestion] = { status: "current" };
        return next;
      });
      setCurrentQuestion((prev) => prev + 1);
    }, 300);
  };

  const handleSkip = () => {
    if (currentQuestion < TOTAL_QUESTIONS) {
      const newStatuses = [...stepStatuses];
      if (!selectedAnswers[currentQuestion]) {
        newStatuses[currentQuestion - 1] = { status: "skipped" };
      }
      newStatuses[currentQuestion] = { status: "current" };
      setStepStatuses(newStatuses);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const handleFinish = () => {
    let updatedAnswers = { ...selectedAnswers };

    if (selectedAnswer && currentQuestion === TOTAL_QUESTIONS) {
      updatedAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(updatedAnswers);

      const newStatuses = [...stepStatuses];
      newStatuses[currentQuestion - 1] = { status: "answered" };
      setStepStatuses(newStatuses);
    }

    const unansweredQuestions = questions.filter((q) => !updatedAnswers[q.id]);

    if (unansweredQuestions.length > 0) {
      setIsFillingSkipped(true);

      toast.warning("VocÇ¦ tem questÇæes sem resposta!", {
        description: `Complete as ${unansweredQuestions.length} questÇœo${unansweredQuestions.length > 1 ? "Çæes" : ""} restante${unansweredQuestions.length > 1 ? "s" : ""} para finalizar.`,
        duration: 5000,
      });

      const firstUnanswered = unansweredQuestions[0];
      setTimeout(() => {
        const newStatuses = [...stepStatuses];
        if (stepStatuses[currentQuestion - 1].status === "current") {
          newStatuses[currentQuestion - 1] = { status: "future" };
        }
        newStatuses[firstUnanswered.id - 1] = { status: "current" };
        setStepStatuses(newStatuses);
        setCurrentQuestion(firstUnanswered.id);
        setSelectedAnswer("");
      }, 500);

      return;
    }

    setTimeout(() => {
      finalizarTeste(updatedAnswers);
    }, 300);
  };

  const finalizarTeste = (answers = selectedAnswers) => {
    const correctAnswers = questions.filter((q) => {
      const answer = answers[q.id];
      return q.options.find((opt) => opt.isCorrect)?.letter === answer;
    }).length;

    const results = questions.map((q) => {
      const userAnswer = answers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      const isCorrect = userAnswer === correctOption?.letter;

      return {
        questionId: q.id,
        questionText: q.text,
        userAnswer: userAnswer || "",
        correctAnswer: correctOption?.letter || "",
        isCorrect,
        options: q.options,
        explanation: "",
        category: q.category,
        categoryColor: q.categoryColor,
        competency: q.competency,
      };
    });

    const competencyGroups = questions.reduce<Record<string, CompetencyGroup>>((acc, q) => {
      if (!acc[q.competency]) {
        acc[q.competency] = { correct: 0, errors: 0, cat: q.category, col: q.categoryColor };
      }
      const userAnswer = answers[q.id];
      const isCorrect = q.options.find((opt) => opt.isCorrect)?.letter === userAnswer;
      if (isCorrect) acc[q.competency].correct++;
      else acc[q.competency].errors++;
      return acc;
    }, {});

    Object.keys(competencyGroups).forEach((compName) => {
      const group = competencyGroups[compName];
      saveCompetencyResult(compName, group.cat, group.col, group.correct, group.errors);
    });

    setTestResults({
      results,
      correctAnswers,
      totalQuestions: TOTAL_QUESTIONS,
    });

    setPageState("congrats");
  };

  const handleCongratsClick = () => {
    setPageState("result");
  };

  return {
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
  };
}
