import { request } from "./httpClient";
import type {
  GoogleLoginRequest,
  LoginRequest,
  LoginResponse,
} from "../auth/apiTypes";

export function loginWithPassword(payload: LoginRequest) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function loginWithGoogleToken(payload: GoogleLoginRequest) {
  return request<LoginResponse>("/auth/google", {
    method: "POST",
    body: payload,
  });
}
