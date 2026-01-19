import { useCallback, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  authenticateWithGoogleToken,
  authenticateWithPassword,
  startGoogleOAuth,
} from "./authService";
import type { AuthUser } from "./apiTypes";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Erro inesperado ao autenticar.";
}

export function useAuthApi() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = useCallback(
    (user: AuthUser) => {
      login(user.name, user.role);
      return user;
    },
    [login]
  );

  const loginWithPassword = useCallback(
    async (identifier: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const user = await authenticateWithPassword(identifier, password);
        return handleSuccess(user);
      } catch (err) {
        setError(getErrorMessage(err));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [handleSuccess]
  );

  const loginWithGoogleToken = useCallback(
    async (token: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const user = await authenticateWithGoogleToken(token);
        return handleSuccess(user);
      } catch (err) {
        setError(getErrorMessage(err));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [handleSuccess]
  );

  const beginGoogleOAuth = useCallback(() => {
    startGoogleOAuth();
  }, []);

  return {
    isLoading,
    error,
    loginWithPassword,
    loginWithGoogleToken,
    beginGoogleOAuth,
  };
}
