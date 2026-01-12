import { validateCPF, validateEmail, validateCEP } from './validation';

export const validateField = (name: string, value: string): string => {
  switch (name) {
    case 'nome':
      if (!value.trim()) return 'Nome é obrigatório';
      if (value.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres';
      return '';
    case 'email':
    case 'emailResponsavel':
      if (!value.trim()) return 'E-mail é obrigatório';
      if (!validateEmail(value)) return 'E-mail inválido';
      return '';
    case 'cpf':
      if (!value.trim()) return 'CPF é obrigatório';
      if (!validateCPF(value)) return 'CPF inválido';
      return '';
    case 'telefone':
    case 'telefoneResponsavel':
      const cleanPhone = value.replace(/\D/g, '');
      if (!cleanPhone) return 'Telefone é obrigatório';
      if (cleanPhone.length < 10) return 'Telefone inválido';
      return '';
    case 'dataNascimento':
      if (!value.trim()) return 'Data de nascimento é obrigatória';
      const cleanDate = value.replace(/\D/g, '');
      if (cleanDate.length !== 8) return 'Data inválida';
      const [day, month, year] = value.split('/').map(Number);
      if (!day || !month || !year) return 'Data inválida';
      if (day < 1 || day > 31) return 'Dia inválido';
      if (month < 1 || month > 12) return 'Mês inválido';
      if (year < 1900 || year > new Date().getFullYear()) return 'Ano inválido';
      return '';
    case 'cep':
      if (value && !validateCEP(value)) return 'CEP inválido';
      return '';
    case 'curriculo':
      if (value && !/^https?:\/\/.+/.test(value)) return 'URL inválida (deve começar com http:// ou https://)';
      return '';
    default:
      return '';
  }
};

