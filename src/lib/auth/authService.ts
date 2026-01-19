import { loginWithGoogleToken, loginWithPassword } from "../api/authApi";
import type { AuthUser, LoginResponse } from "./apiTypes";
import { setTokens, clearTokens } from "./tokenStorage";
import { GOOGLE_OAUTH_URL } from "../config/env";

function applyLoginResponse(response: LoginResponse) {
  setTokens(response.tokens);
  return response.user;
}

export async function authenticateWithPassword(
  identifier: string,
  password: string
): Promise<AuthUser> {
  const response = await loginWithPassword({ identifier, password });
  return applyLoginResponse(response);
}

export async function authenticateWithGoogleToken(
  idToken: string
): Promise<AuthUser> {
  const response = await loginWithGoogleToken({ idToken });
  return applyLoginResponse(response);
}

export function startGoogleOAuth() {
  window.location.assign(GOOGLE_OAUTH_URL);
}

export function signOut() {
  clearTokens();
}
