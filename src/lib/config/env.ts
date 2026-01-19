const API_BASE_URL =
  import.meta.env.VITE_API_URL?.toString() ?? "http://localhost:8080";

const GOOGLE_OAUTH_URL =
  import.meta.env.VITE_GOOGLE_OAUTH_URL?.toString() ??
  `${API_BASE_URL}/oauth2/authorization/google`;

export { API_BASE_URL, GOOGLE_OAUTH_URL };
