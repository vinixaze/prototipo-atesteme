// Sistema de gerenciamento de estado das competências usando localStorage

export interface CompetencyStatus {
  competency: string;
  category: string;
  categoryColor: string;
  status: 'not-started' | 'completed' | 'failed' | 'attempted' | 'in-progress'; // in-progress = teste iniciado mas não finalizado
  correctCount?: number;
  errorCount?: number;
  attempts?: number; // Número de tentativas
  failedAttempts?: number; // Número de tentativas com 2+ erros
  lastAttemptDate?: string;
  blockedUntil?: string; // Data em que pode tentar novamente
  startedAt?: string; // Data/hora em que iniciou o teste (para timer de 30min)
  expiresAt?: string; // Data/hora em que expira (30min após startedAt)
}

const STORAGE_KEY = 'atesteme_competencies';

// Obter todas as competências
export const getAllCompetencies = (): CompetencyStatus[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Obter status de uma competência específica
export const getCompetencyStatus = (competencyName: string): CompetencyStatus | null => {
  const competencies = getAllCompetencies();
  return competencies.find(c => c.competency === competencyName) || null;
};

// Salvar resultado de uma competência
export const saveCompetencyResult = (
  competency: string,
  category: string,
  categoryColor: string,
  correctCount: number,
  errorCount: number
) => {
  const competencies = getAllCompetencies();
  const existingIndex = competencies.findIndex(c => c.competency === competency);
  const existing = existingIndex >= 0 ? competencies[existingIndex] : null;
  
  // Incrementar tentativas
  const attempts = (existing?.attempts || 0) + 1;
  
  // Determinar status
  let status: 'completed' | 'failed' | 'attempted' = 'completed';
  let blockedUntil: string | undefined;
  
  if (errorCount >= 2) {
    // Se já tentou antes e errou novamente, AGORA sim bloqueia
    if (existing && (existing.status === 'attempted' || existing.status === 'failed')) {
      status = 'failed';
      // Calcular data de bloqueio (5 dias a partir de hoje)
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      blockedUntil = futureDate.toISOString();
    } else {
      // Primeira tentativa com erro - marca como "attempted" mas NÃO bloqueia
      status = 'attempted';
    }
  }
  
  const competencyData: CompetencyStatus = {
    competency,
    category,
    categoryColor,
    status,
    correctCount,
    errorCount,
    attempts,
    failedAttempts: errorCount >= 2 ? (existing?.failedAttempts || 0) + 1 : existing?.failedAttempts || 0,
    lastAttemptDate: new Date().toISOString(),
    blockedUntil
  };
  
  if (existingIndex >= 0) {
    competencies[existingIndex] = competencyData;
  } else {
    competencies.push(competencyData);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(competencies));
};

// Verificar se competência está bloqueada
export const isCompetencyBlocked = (competencyName: string): boolean => {
  const status = getCompetencyStatus(competencyName);
  
  if (!status || status.status !== 'failed' || !status.blockedUntil) {
    return false;
  }
  
  const blockedDate = new Date(status.blockedUntil);
  const now = new Date();
  
  return now < blockedDate;
};

// Obter dias restantes de bloqueio
export const getDaysUntilUnblock = (competencyName: string): number => {
  const status = getCompetencyStatus(competencyName);
  
  if (!status || !status.blockedUntil) {
    return 0;
  }
  
  const blockedDate = new Date(status.blockedUntil);
  const now = new Date();
  const diffTime = blockedDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

// Limpar todos os dados (útil para testes)
export const clearAllCompetencies = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Limpar uma competência específica (útil para testes)
export const clearSpecificCompetency = (competencyName: string) => {
  const competencies = getAllCompetencies();
  const filtered = competencies.filter(c => c.competency !== competencyName);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

// Iniciar timer de 30 minutos para uma competência
export const startCompetencyTimer = (
  competency: string,
  category: string,
  categoryColor: string
) => {
  const competencies = getAllCompetencies();
  const existingIndex = competencies.findIndex(c => c.competency === competency);
  
  const startedAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutos
  
  const competencyData: CompetencyStatus = {
    competency,
    category,
    categoryColor,
    status: 'in-progress',
    startedAt,
    expiresAt,
    attempts: 0,
  };
  
  if (existingIndex >= 0) {
    // Preservar dados anteriores se existirem
    const existing = competencies[existingIndex];
    competencyData.attempts = existing.attempts || 0;
    competencyData.failedAttempts = existing.failedAttempts;
    competencies[existingIndex] = competencyData;
  } else {
    competencies.push(competencyData);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(competencies));
};

// Obter tempo restante em segundos para uma competência em progresso
export const getTimeRemaining = (competencyName: string): number => {
  const status = getCompetencyStatus(competencyName);
  
  if (!status || status.status !== 'in-progress' || !status.expiresAt) {
    return 0;
  }
  
  const expiresDate = new Date(status.expiresAt);
  const now = new Date();
  const diffTime = expiresDate.getTime() - now.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  
  return diffSeconds > 0 ? diffSeconds : 0;
};

// Verificar se o timer expirou
export const isTimerExpired = (competencyName: string): boolean => {
  return getTimeRemaining(competencyName) === 0;
};

// Cancelar/limpar timer de uma competência (quando o teste é finalizado ou tempo expira)
export const clearCompetencyTimer = (competencyName: string) => {
  const competencies = getAllCompetencies();
  const existingIndex = competencies.findIndex(c => c.competency === competencyName);
  
  if (existingIndex >= 0) {
    const existing = competencies[existingIndex];
    // Limpar campos de timer mas manter outros dados
    delete existing.startedAt;
    delete existing.expiresAt;
    
    // Se estava in-progress e não tem resultado, volta para not-started
    if (existing.status === 'in-progress') {
      existing.status = 'not-started';
    }
    
    competencies[existingIndex] = existing;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(competencies));
  }
};