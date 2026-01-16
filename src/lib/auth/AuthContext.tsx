import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { NavigationData, PermissionState, User } from "./types";

interface AuthContextValue {
  user: User | null;
  permissions: PermissionState;
  login: (name: string, role?: "admin" | "user") => void;
  logout: () => void;
  grantQuizAccess: (data: NavigationData) => void;
  grantQuizStart: () => void;
  grantAssessmentAccess: () => void;
  setTestData: (data: NavigationData) => void;
  clearQuizAccess: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<PermissionState>({
    quizAccess: null,
    assessmentAccess: null,
    testData: null,
  });

  const login = useCallback((name: string, role: "admin" | "user" = "user") => {
    setUser({ name, role });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPermissions({
      quizAccess: null,
      assessmentAccess: null,
      testData: null,
    });
  }, []);

  const grantQuizAccess = useCallback((data: NavigationData) => {
    setPermissions((prev) => ({
      ...prev,
      quizAccess: { data, canStart: false },
    }));
  }, []);

  const grantQuizStart = useCallback(() => {
    setPermissions((prev) => ({
      ...prev,
      quizAccess: prev.quizAccess ? { ...prev.quizAccess, canStart: true } : null,
    }));
  }, []);

  const grantAssessmentAccess = useCallback(() => {
    setPermissions((prev) => ({
      ...prev,
      assessmentAccess: { canStart: true },
    }));
  }, []);

  const setTestData = useCallback((data: NavigationData) => {
    setPermissions((prev) => ({
      ...prev,
      testData: data,
    }));
  }, []);

  const clearQuizAccess = useCallback(() => {
    setPermissions((prev) => ({
      ...prev,
      quizAccess: null,
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        permissions,
        login,
        logout,
        grantQuizAccess,
        grantQuizStart,
        grantAssessmentAccess,
        setTestData,
        clearQuizAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
