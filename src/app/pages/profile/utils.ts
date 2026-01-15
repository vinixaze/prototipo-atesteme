import { FormData, FormErrors } from "./types";

export const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/[^\d]/g, "");
  if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += parseInt(cleaned.charAt(i), 10) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cleaned.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i += 1) {
    sum += parseInt(cleaned.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cleaned.charAt(10), 10)) return false;

  return true;
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateCEP = (cep: string): boolean => {
  const cleaned = cep.replace(/[^\d]/g, "");
  return cleaned.length === 8;
};

export const getIdentificadorPessoal = (
  cpf: string
): { isProvisorio: boolean; tipo: string; id: string } | null => {
  const cleaned = cpf.replace(/[^\d]/g, "");

  if (/^0*\d{1,3}$/.test(cleaned) && cleaned.length <= 11) {
    const id = cleaned.padStart(9, "0");
    const lastDigit = parseInt(cleaned[cleaned.length - 1], 10);
    let tipo = "";

    if (lastDigit % 3 === 0) {
      tipo = "SUS";
    } else if (lastDigit % 3 === 1) {
      tipo = "INEP";
    } else {
      tipo = "CNIS";
    }

    return { isProvisorio: true, tipo, id };
  }

  return null;
};

export const calcularIdade = (dataNascimento: string): number => {
  if (!dataNascimento) return 0;

  const partes = dataNascimento.split("/");
  if (partes.length !== 3) return 0;

  const [dia, mes, ano] = partes.map((item) => parseInt(item, 10));
  const hoje = new Date();
  const nascimento = new Date(ano, mes - 1, dia);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade -= 1;
  }

  return idade;
};

export const isDataNascimentoValida = (dataNascimento: string): boolean => {
  if (!dataNascimento) return false;

  const cleanDate = dataNascimento.replace(/\D/g, "");
  if (cleanDate.length !== 8) return false;

  const partes = dataNascimento.split("/");
  if (partes.length !== 3) return false;

  const [dia, mes, ano] = partes.map(Number);

  if (!dia || !mes || !ano) return false;
  if (dia < 1 || dia > 31) return false;
  if (mes < 1 || mes > 12) return false;
  if (ano < 1900 || ano > new Date().getFullYear()) return false;

  const dataTest = new Date(ano, mes - 1, dia);
  if (
    dataTest.getDate() !== dia ||
    dataTest.getMonth() !== mes - 1 ||
    dataTest.getFullYear() !== ano
  ) {
    return false;
  }

  return true;
};

export const maskCPF = (value: string): string =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);

export const maskCNPJ = (value: string): string =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
    .slice(0, 18);

export const maskPhone = (value: string): string =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);

export const maskCEP = (value: string): string =>
  value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);

export const maskDate = (value: string): string =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 10);

export const validateField = (name: string, value: string): string => {
  switch (name) {
    case "nome":
      if (!value.trim()) return "Nome é obrigatório";
      if (value.trim().length < 3)
        return "Nome deve ter pelo menos 3 caracteres";
      return "";
    case "email":
    case "emailResponsavel":
      if (!value.trim()) return "E-mail é obrigatório";
      if (!validateEmail(value)) return "E-mail inválido";
      return "";
    case "cpf":
      if (!value.trim()) return "CPF é obrigatório";
      if (!validateCPF(value)) return "CPF inválido";
      return "";
    case "telefone":
    case "telefoneResponsavel": {
      const cleanPhone = value.replace(/\D/g, "");
      if (!cleanPhone) return "Telefone é obrigatório";
      if (cleanPhone.length < 10) return "Telefone inválido";
      return "";
    }
    case "dataNascimento": {
      if (!value.trim()) return "Data de nascimento é obrigatória";
      const cleanDate = value.replace(/\D/g, "");
      if (cleanDate.length !== 8) return "Data inválida";
      const [day, month, year] = value.split("/").map(Number);
      if (!day || !month || !year) return "Data inválida";
      if (day < 1 || day > 31) return "Dia inválido";
      if (month < 1 || month > 12) return "Mês inválido";
      if (year < 1900 || year > new Date().getFullYear())
        return "Ano inválido";
      return "";
    }
    case "cep":
      if (value && !validateCEP(value)) return "CEP inválido";
      return "";
    case "curriculo":
      if (value && !/^https?:\/\/.+/.test(value))
        return "URL inválida (deve começar com http:// ou https://)";
      return "";
    default:
      return "";
  }
};

export const validateForm = (formData: FormData): FormErrors => {
  const newErrors: FormErrors = {};
  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key as keyof FormData]);
    if (error) newErrors[key] = error;
  });
  return newErrors;
};
