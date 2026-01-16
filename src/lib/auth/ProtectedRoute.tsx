import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { PermissionState, RouteGuard, User } from "./types";

interface ProtectedRouteProps {
  guards?: RouteGuard[];
  fallbackPath?: string;
  children: ReactElement;
}

export function ProtectedRoute({
  guards = [],
  fallbackPath = "/login",
  children,
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user, permissions } = useAuth();

  for (const guard of guards) {
    const result = checkGuard(guard, user, permissions);
    if (!result.allowed) {
      return (
        <Navigate
          to={result.redirectTo || fallbackPath}
          replace
          state={{ from: location.pathname }}
        />
      );
    }
  }

  return children;
}

function checkGuard(
  guard: RouteGuard,
  user: User | null,
  permissions: PermissionState
): { allowed: boolean; redirectTo?: string } {
  switch (guard.type) {
    case "authenticated":
      return user ? { allowed: true } : { allowed: false, redirectTo: "/login" };
    case "quiz-warning":
      if (!user) {
        return { allowed: false, redirectTo: "/login" };
      }
      if (!permissions.quizAccess?.data) {
        return { allowed: false, redirectTo: "/skills" };
      }
      return { allowed: true };
    case "quiz-start":
      if (!user) {
        return { allowed: false, redirectTo: "/login" };
      }
      if (!permissions.quizAccess?.data) {
        return { allowed: false, redirectTo: "/skills" };
      }
      if (!permissions.quizAccess.canStart) {
        return { allowed: false, redirectTo: "/quiz/warning" };
      }
      return { allowed: true };
    case "assessment-start":
      if (!user) {
        return { allowed: false, redirectTo: "/login" };
      }
      if (!permissions.assessmentAccess?.canStart) {
        return { allowed: false, redirectTo: "/welcome" };
      }
      return { allowed: true };
    default:
      return { allowed: true };
  }
}
