export interface User {
  name: string;
  role: "admin" | "user";
}

export type NavigationData = Record<string, unknown>;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface PermissionState {
  quizAccess: {
    data: NavigationData;
    canStart: boolean;
  } | null;
  assessmentAccess: {
    canStart: boolean;
  } | null;
  testData: NavigationData | null;
}

export type RouteGuard =
  | { type: "authenticated" }
  | { type: "quiz-warning"; requiresData: true }
  | { type: "quiz-start"; requiresWarningVisit: true }
  | { type: "assessment-start"; requiresWelcomeVisit: true };

export interface RouteConfig {
  path: string;
  guards?: RouteGuard[];
  fallbackPath?: string;
}
