export interface ProfilePageProps {
  navigateTo: (page: string) => void;
  userName?: string;
  userRole?: "admin" | "user";
}

export interface FormData {
  nome: string;
  nomeSocial: string;
  email: string;
  telefone: string;
  cpf: string;
  cnpj: string;
  dataNascimento: string;
  curriculo: string;
  cep: string;
  escolaridade: string;
  ultimaFormacao: string;
  codigoOrganizacao: string;
  tipoPerfil: "estudante" | "professor" | "profissional";
  emailResponsavel: string;
  telefoneResponsavel: string;
  areaGraduacao: string;
}

export type FormErrors = Record<string, string>;

export interface VerifiedState {
  email: boolean;
  telefone: boolean;
  emailResponsavel: boolean;
  telefoneResponsavel: boolean;
}
