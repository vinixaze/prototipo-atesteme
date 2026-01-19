export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthUser {
  id?: string;
  name: string;
  email?: string;
  role: "admin" | "user";
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}
