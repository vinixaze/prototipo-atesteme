export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface BnccCode {
  value: string;
  label: string;
  bnccType: "geral" | "computacao";
  component?: string;
}

export const filterTypeOptions: FilterOption[] = [
  { value: "curricular", label: "Componente Curricular" },
  { value: "bncc", label: "Habilidades BNCC (CÇüdigos)" },
];

export const curricularOptions: FilterOption[] = [
  { value: "matematica", label: "MatemÇ­tica", count: 245 },
  { value: "portugues", label: "LÇðngua Portuguesa", count: 312 },
  { value: "ingles", label: "LÇðngua Inglesa", count: 189 },
  { value: "educacao-fisica", label: "EducaÇõÇœo FÇðsica", count: 156 },
  { value: "geografia", label: "Geografia", count: 198 },
  { value: "historia", label: "HistÇüria", count: 203 },
  { value: "arte", label: "Arte", count: 167 },
  { value: "ciencias", label: "CiÇ¦ncias", count: 221 },
];

export const thematicOptionsByComponent: Record<string, FilterOption[]> = {
  portugues: [
    { value: "interpretacao-texto", label: "InterpretaÇõÇœo de texto", count: 87 },
    { value: "estrategia-leitura", label: "EstratÇ¸gia de leitura", count: 65 },
    { value: "construcao-sentidos", label: "ConstruÇõÇœo de sentidos", count: 54 },
    { value: "estruturas-sintaticas", label: "Estruturas sintÇ­ticas", count: 43 },
    { value: "ordem-sentenca", label: "Ordem da sentenÇõa", count: 38 },
  ],
  matematica: [
    { value: "algebra", label: "Ç?lgebra", count: 92 },
    { value: "geometria", label: "Geometria", count: 78 },
    { value: "estatistica", label: "EstatÇðstica", count: 45 },
    { value: "probabilidade", label: "Probabilidade", count: 30 },
  ],
  ingles: [
    { value: "compreensao-oral", label: "CompreensÇœo oral", count: 56 },
    { value: "compreensao-escrita", label: "CompreensÇœo escrita", count: 48 },
    { value: "producao-oral", label: "ProduÇõÇœo oral", count: 42 },
    { value: "producao-escrita", label: "ProduÇõÇœo escrita", count: 43 },
  ],
  "educacao-fisica": [
    { value: "esportes", label: "Esportes", count: 45 },
    { value: "ginastica", label: "GinÇ­stica", count: 38 },
    { value: "danca", label: "DanÇõa", count: 35 },
    { value: "jogos", label: "Jogos e brincadeiras", count: 38 },
  ],
  geografia: [
    { value: "cartografia", label: "Cartografia", count: 52 },
    { value: "geopolitica", label: "GeopolÇðtica", count: 48 },
    { value: "meio-ambiente", label: "Meio ambiente", count: 55 },
    { value: "urbanizacao", label: "UrbanizaÇõÇœo", count: 43 },
  ],
  historia: [
    { value: "brasil-colonia", label: "Brasil ColÇïnia", count: 51 },
    { value: "brasil-imperio", label: "Brasil ImpÇ¸rio", count: 48 },
    { value: "brasil-republica", label: "Brasil RepÇ§blica", count: 54 },
    { value: "historia-geral", label: "HistÇüria Geral", count: 50 },
  ],
  arte: [
    { value: "artes-visuais", label: "Artes Visuais", count: 42 },
    { value: "musica", label: "MÇ§sica", count: 38 },
    { value: "teatro", label: "Teatro", count: 44 },
    { value: "danca-arte", label: "DanÇõa", count: 43 },
  ],
  ciencias: [
    { value: "materia-energia", label: "MatÇ¸ria e energia", count: 58 },
    { value: "vida-evolucao", label: "Vida e evoluÇõÇœo", count: 62 },
    { value: "terra-universo", label: "Terra e universo", count: 55 },
    { value: "tecnologia", label: "Tecnologia", count: 46 },
  ],
};

export const yearOptions: FilterOption[] = [
  { value: "EF6", label: "EF6" },
  { value: "EF7", label: "EF7" },
  { value: "EF8", label: "EF8" },
  { value: "EF9", label: "EF9" },
  { value: "EM1", label: "EM1" },
  { value: "EM2", label: "EM2" },
  { value: "EM3", label: "EM3" },
];

export const bnccTypeOptions: FilterOption[] = [
  { value: "geral", label: "Habilidade BNCC Geral", count: 456 },
  { value: "computacao", label: "Habilidade BNCC ComputaÇõÇœo", count: 189 },
];

export const bnccCodeOptions: BnccCode[] = [
  { value: "EM13LP28", label: "EM13LP28", bnccType: "geral", component: "portugues" },
  { value: "EF69LP30", label: "EF69LP30", bnccType: "geral", component: "portugues" },
  { value: "EM13LP30", label: "EM13LP30", bnccType: "geral", component: "portugues" },
  { value: "EF67LP20", label: "EF67LP20", bnccType: "geral", component: "portugues" },
  { value: "EF67LP28", label: "EF67LP28", bnccType: "geral", component: "portugues" },
  { value: "EM13LP33", label: "EM13LP33", bnccType: "geral", component: "portugues" },
  { value: "EF06CO01", label: "EF06CO01", bnccType: "computacao", component: "ciencias" },
  { value: "EF06CO04", label: "EF06CO04", bnccType: "computacao", component: "ciencias" },
  { value: "EF06CO02", label: "EF06CO02", bnccType: "computacao", component: "ciencias" },
  { value: "EF07CO02", label: "EF07CO02", bnccType: "computacao", component: "ciencias" },
  { value: "EF08CO03", label: "EF08CO03", bnccType: "computacao", component: "ciencias" },
  { value: "EF69CO04", label: "EF69CO04", bnccType: "computacao", component: "ciencias" },
];
