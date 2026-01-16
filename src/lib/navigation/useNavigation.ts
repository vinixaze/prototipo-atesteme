import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getRoutePath, type PageId } from "./routes";
import type { NavigationData } from "../auth/types";

const QUIZ_PAGES: PageId[] = ["quiz-warning", "quiz", "quiz-result"];

export function useAppNavigation() {
  const navigate = useNavigate();
  const {
    grantQuizAccess,
    grantQuizStart,
    grantAssessmentAccess,
    setTestData,
  } = useAuth();

  const navigateTo = useCallback(
    (pageId: PageId, data?: NavigationData) => {
      if (data) {
        if (QUIZ_PAGES.includes(pageId)) {
          grantQuizAccess(data);
        } else {
          setTestData(data);
        }
      }

      if (pageId === "quiz") {
        grantQuizStart();
      }

      if (pageId === "teste-competencias") {
        grantAssessmentAccess();
      }

      const path = getRoutePath(pageId);
      navigate(path);
    },
    [navigate, grantQuizAccess, grantQuizStart, grantAssessmentAccess, setTestData]
  );

  return { navigateTo };
}
