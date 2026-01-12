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
  tipoPerfil: 'estudante' | 'professor' | 'profissional';
  emailResponsavel: string;
  telefoneResponsavel: string;
  areaGraduacao: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface AvatarOption {
  id: number;
  name: string;
  url: string;
  unlocked?: boolean;
  cost?: number;
}

export interface BannerLevel {
  id: number;
  level: number;
  name: string;
  gradient: string;
  unlocked: boolean;
  cost: number;
}

