export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateCEP = (cep: string): boolean => {
  const cleaned = cep.replace(/[^\d]/g, '');
  return cleaned.length === 8;
};

export const getIdentificadorPessoal = (cpf: string): { isProvisorio: boolean; tipo: string; id: string } | null => {
  const cleaned = cpf.replace(/[^\d]/g, '');

  if (/^0*\d{1,3}$/.test(cleaned) && cleaned.length <= 11) {
    const id = cleaned.padStart(9, '0');
    const lastDigit = parseInt(cleaned[cleaned.length - 1]);
    let tipo = '';

    if (lastDigit % 3 === 0) {
      tipo = 'SUS';
    } else if (lastDigit % 3 === 1) {
      tipo = 'INEP';
    } else {
      tipo = 'CNIS';
    }

    return { isProvisorio: true, tipo, id };
  }

  return null;
};

export const calcularIdade = (dataNascimento: string): number => {
  if (!dataNascimento) return 0;

  const partes = dataNascimento.split('/');
  if (partes.length !== 3) return 0;

  const [dia, mes, ano] = partes.map(p => parseInt(p));
  const hoje = new Date();
  const nascimento = new Date(ano, mes - 1, dia);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

export const isDataNascimentoValida = (dataNascimento: string): boolean => {
  if (!dataNascimento) return false;

  const cleanDate = dataNascimento.replace(/\D/g, '');
  if (cleanDate.length !== 8) return false;

  const partes = dataNascimento.split('/');
  if (partes.length !== 3) return false;

  const [dia, mes, ano] = partes.map(Number);

  if (!dia || !mes || !ano) return false;
  if (dia < 1 || dia > 31) return false;
  if (mes < 1 || mes > 12) return false;
  if (ano < 1900 || ano > new Date().getFullYear()) return false;

  const dataTest = new Date(ano, mes - 1, dia);
  if (dataTest.getDate() !== dia || dataTest.getMonth() !== mes - 1 || dataTest.getFullYear() !== ano) {
    return false;
  }

  return true;
};

