import type { NavigationData } from "../auth/types";
import type { RouteGuard } from "../auth/types";

export type PageId =
  | "login"
  | "signup"
  | "forgot-password"
  | "support"
  | "privacy"
  | "terms"
  | "welcome"
  | "dashboard"
  | "conquistas"
  | "habilidades"
  | "progresso"
  | "progresso-conquistas"
  | "digcoins"
  | "nocoes-basicas"
  | "nocoes-basicas-congrats"
  | "nocoes-basicas-result"
  | "teste-competencias"
  | "teste-competencias-congrats"
  | "teste-competencias-result"
  | "quiz-warning"
  | "quiz"
  | "quiz-result"
  | "conteudos"
  | "conteudo"
  | "plano-aula"
  | "exames"
  | "transversality"
  | "transversalidade"
  | "single-question"
  | "faq"
  | "acessibilidade"
  | "perfil"
  | "chatbot";

export interface RouteDefinition {
  path: string;
  guards?: RouteGuard[];
}

export type NavigateTo = (pageId: PageId, data?: NavigationData) => void;

export const ROUTES: Record<PageId, RouteDefinition> = {
  login: { path: "/login" },
  signup: { path: "/signup" },
  "forgot-password": { path: "/forgot-password" },
  support: { path: "/support" },
  privacy: { path: "/privacy" },
  terms: { path: "/terms" },
  chatbot: { path: "/chatbot", guards: [{ type: "authenticated" }] },
  welcome: {
    path: "/welcome",
    guards: [{ type: "authenticated" }],
  },
  dashboard: {
    path: "/dashboard",
    guards: [{ type: "authenticated" }],
  },
  conquistas: {
    path: "/progress/achievements",
    guards: [{ type: "authenticated" }],
  },
  habilidades: {
    path: "/skills",
    guards: [{ type: "authenticated" }],
  },
  progresso: {
    path: "/progress/ranking",
    guards: [{ type: "authenticated" }],
  },
  "progresso-conquistas": {
    path: "/progress/conquests",
    guards: [{ type: "authenticated" }],
  },
  digcoins: {
    path: "/progress/digcoins",
    guards: [{ type: "authenticated" }],
  },
  "nocoes-basicas": {
    path: "/basics",
    guards: [{ type: "authenticated" }],
  },
  "nocoes-basicas-congrats": {
    path: "/basics/congrats",
    guards: [{ type: "authenticated" }],
  },
  "nocoes-basicas-result": {
    path: "/basics/result",
    guards: [{ type: "authenticated" }],
  },
  "teste-competencias": {
    path: "/assessment",
    guards: [
      { type: "authenticated" },
      { type: "assessment-start", requiresWelcomeVisit: true },
    ],
  },
  "teste-competencias-congrats": {
    path: "/assessment/congrats",
    guards: [
      { type: "authenticated" },
      { type: "assessment-start", requiresWelcomeVisit: true },
    ],
  },
  "teste-competencias-result": {
    path: "/assessment/result",
    guards: [
      { type: "authenticated" },
      { type: "assessment-start", requiresWelcomeVisit: true },
    ],
  },
  "quiz-warning": {
    path: "/quiz/warning",
    guards: [
      { type: "authenticated" },
      { type: "quiz-warning", requiresData: true },
    ],
  },
  quiz: {
    path: "/quiz",
    guards: [
      { type: "authenticated" },
      { type: "quiz-start", requiresWarningVisit: true },
    ],
  },
  "quiz-result": {
    path: "/quiz/result",
    guards: [{ type: "authenticated" }],
  },
  conteudos: {
    path: "/contents",
    guards: [{ type: "authenticated" }],
  },
  conteudo: {
    path: "/contents",
    guards: [{ type: "authenticated" }],
  },
  "plano-aula": {
    path: "/lesson-plan",
    guards: [{ type: "authenticated" }],
  },
  exames: {
    path: "/exams",
    guards: [{ type: "authenticated" }],
  },
  transversality: {
    path: "/transversality",
    guards: [{ type: "authenticated" }],
  },
  transversalidade: {
    path: "/transversality",
    guards: [{ type: "authenticated" }],
  },
  "single-question": {
    path: "/question",
    guards: [{ type: "authenticated" }],
  },
  faq: {
    path: "/faq",
    guards: [{ type: "authenticated" }],
  },
  acessibilidade: {
    path: "/accessibility",
    guards: [{ type: "authenticated" }],
  },
  perfil: {
    path: "/profile",
    guards: [{ type: "authenticated" }],
  },
};

export function getRoutePath(pageId: PageId): string {
  return ROUTES[pageId].path;
}

export function getRouteGuards(pageId: PageId): RouteGuard[] {
  return ROUTES[pageId].guards || [];
}
