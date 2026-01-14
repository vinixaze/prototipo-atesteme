export type BnccSkill = { code: string; text: string; type: "geral" | "computacao" };

export const BNCC_SKILLS: BnccSkill[] = [
  { code: "CG01", text: "Pensamento cientÇðfico, crÇðtico e criativo", type: "geral" },
  { code: "CG02", text: "RepertÇürio cultural", type: "geral" },
  { code: "CG03", text: "ComunicaÇõÇœo", type: "geral" },
  { code: "CG04", text: "Cultura digital", type: "geral" },
  { code: "CG05", text: "Trabalho e projeto de vida", type: "geral" },
  { code: "CG06", text: "ArgumentaÇõÇœo", type: "geral" },
  { code: "CG07", text: "Autoconhecimento e autocuidado", type: "geral" },
  { code: "CG08", text: "Empatia e cooperaÇõÇœo", type: "geral" },
  { code: "CG09", text: "Responsabilidade e cidadania", type: "geral" },
  { code: "CC01", text: "Cultura Digital - segurança e ética", type: "computacao" },
  { code: "CC02", text: "Pensamento Computacional - decomposição", type: "computacao" },
  { code: "CC03", text: "Mundo Digital - redes e dados", type: "computacao" },
  { code: "CC04", text: "Algoritmos - sequências e instruções", type: "computacao" },
  { code: "CC05", text: "Dados - coleta e representação", type: "computacao" },
  { code: "CC06", text: "Programação - condições e repetição", type: "computacao" },
  { code: "CC07", text: "Depuração - testar e melhorar soluções", type: "computacao" },
  { code: "CC08", text: "Impactos sociais da tecnologia", type: "computacao" },
];

export const initialPlans = [
  {
    id: 1,
    titulo: "Introdução à Pesquisa Digital",
    descricao:
      "Aula sobre técnicas básicas de pesquisa e monitoramento de informações na internet ",
    duracao: "100 min",
    turma: "6 Ano",
    materia: "Informática",
    codigoBNCC: "EF67ER01",
    data: "2025-01-15",
    anoescolar: "6 ano",
  },
  {
    id: 2,
    titulo: "A Revolução Industrial",
    descricao:
      "Estudo dos principais eventos e impactos da Revolução Industrial",
    duracao: "50 min",
    turma: "7 Ano",
    materia: "História",
    codigoBNCC: "EF67ER04",
    data: "2025-01-20",
    anoescolar: "7 ano",
  },
  {
    id: 3,
    titulo: "Semântica",
    descricao: "Formas de organização e interpretação de textos",
    duracao: "100 min",
    turma: "8 Ano",
    materia: "Lingua portuguesa",
    codigoBNCC: "EF69EF02",
    data: "2025-01-10",
    anoescolar: "8 ano",
  },
];
