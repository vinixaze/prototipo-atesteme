import { useState } from "react";
import { toast } from "sonner";
import { explanations, questions } from "./data";

export type PageState = "question" | "congrats" | "result";

type StepStatus = { status: "current" | "answered" | "future" | "skipped" };

type BasicsResultItem = {
  questionId: number;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: (typeof questions)[number]["options"];
};

export type BasicsResults = {
  results: BasicsResultItem[];
  correctAnswers: number;
  totalQuestions: number;
};

export function useBasicsLogic() {
  const [pageState, setPageState] = useState<PageState>("question");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFillingSkipped, setIsFillingSkipped] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    Array.from({ length: questions.length }, (_, i) => ({
      status: i === 0 ? "current" : "future",
    }))
  );
  const [testResults, setTestResults] = useState<BasicsResults | null>(null);

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

    setStepStatuses((prev) => {
      const next = [...prev];
      next[currentQuestion - 1] = { status: "answered" };
      return next;
    });

    setSelectedAnswer("");

    // ƒo. pega todas as nÇœo respondidas (por id)
    const unansweredQuestions = questions.filter((q) => !updatedAnswers[q.id]);

    // ƒo. se estÇ­ preenchendo puladas, continua nelas
    if (isFillingSkipped) {
      if (unansweredQuestions.length > 0) {
        const nextUnanswered = unansweredQuestions[0];
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

    // ƒo. CASO CRÇ?TICO: salvou na Ç§ltima questÇœo
    if (currentQuestion === questions.length) {
      if (unansweredQuestions.length > 0) {
        setIsFillingSkipped(true);

        toast.warning("Você tem questões sem resposta!", {
          description: `Complete as ${unansweredQuestions.length} questões${
            unansweredQuestions.length > 1 ? "s" : ""
          } restante${unansweredQuestions.length > 1 ? "s" : ""} para finalizar.`,
          duration: 5000,
        });

        const firstUnanswered = unansweredQuestions[0];
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

      // ƒo. se nÇœo tem pendentes, finaliza
      setTimeout(() => finalizarTeste(updatedAnswers), 300);
      return;
    }

    // ƒo. fluxo normal: vai para prÇüxima
    setTimeout(() => {
      setStepStatuses((prev) => {
        const next = [...prev];
        next[currentQuestion] = { status: "current" }; // prÇüxima questÇœo (index atual + 1)
        return next;
      });
      setCurrentQuestion((prev) => prev + 1);
    }, 300);
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length) {
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

    if (selectedAnswer && currentQuestion === questions.length) {
      updatedAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(updatedAnswers);

      const newStatuses = [...stepStatuses];
      newStatuses[currentQuestion - 1] = { status: "answered" };
      setStepStatuses(newStatuses);
    }

    const unansweredQuestions = questions.filter((q) => !updatedAnswers[q.id]);

    if (unansweredQuestions.length > 0) {
      setIsFillingSkipped(true);

      toast.warning("Você tem questÇæes sem resposta!", {
        description: `Complete as ${unansweredQuestions.length} questões${
          unansweredQuestions.length > 1 ? "Çæes" : ""
        } restante${unansweredQuestions.length > 1 ? "s" : ""} para finalizar.`,
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
        explanation: explanations[q.id - 1] || "",
        category: q.category,
        categoryColor: q.categoryColor,
        competency: q.competency,
      };
    });

    setTestResults({
      results,
      correctAnswers,
      totalQuestions: questions.length,
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
