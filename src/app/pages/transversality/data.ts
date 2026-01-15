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
  { value: "bncc", label: "Habilidades BNCC (Códigos)" },
];

export const curricularOptions: FilterOption[] = [
  { value: "matematica", label: "Matemática", count: 245 },
  { value: "portugues", label: "Língua Portuguesa", count: 312 },
  { value: "ingles", label: "Língua Inglesa", count: 189 },
  { value: "educacao-fisica", label: "Educação Física", count: 156 },
  { value: "geografia", label: "Geografia", count: 198 },
  { value: "historia", label: "História", count: 203 },
  { value: "arte", label: "Arte", count: 167 },
  { value: "ciencias", label: "Ciências", count: 221 },
];

export const thematicOptionsByComponent: Record<string, FilterOption[]> = {
  portugues: [
    { value: "interpretacao-texto", label: "Interpretação de texto", count: 87 },
    { value: "estrategia-leitura", label: "Estratégia de leitura", count: 65 },
    { value: "construcao-sentidos", label: "Construção de sentidos", count: 54 },
    { value: "estruturas-sintaticas", label: "Estruturas sintáticas", count: 43 },
    { value: "ordem-sentenca", label: "Ordem da sentença", count: 38 },
  ],
  matematica: [
    { value: "algebra", label: "Álgebra", count: 92 },
    { value: "geometria", label: "Geometria", count: 78 },
    { value: "estatistica", label: "Estatística", count: 45 },
    { value: "probabilidade", label: "Probabilidade", count: 30 },
  ],
  ingles: [
    { value: "compreensao-oral", label: "Compreensão oral", count: 56 },
    { value: "compreensao-escrita", label: "Compreensão escrita", count: 48 },
    { value: "producao-oral", label: "Produção oral", count: 42 },
    { value: "producao-escrita", label: "Produção escrita", count: 43 },
  ],
  "educacao-fisica": [
    { value: "esportes", label: "Esportes", count: 45 },
    { value: "ginastica", label: "Ginástica", count: 38 },
    { value: "danca", label: "Dança", count: 35 },
    { value: "jogos", label: "Jogos e brincadeiras", count: 38 },
  ],
  geografia: [
    { value: "cartografia", label: "Cartografia", count: 52 },
    { value: "geopolitica", label: "Geopolítica", count: 48 },
    { value: "meio-ambiente", label: "Meio ambiente", count: 55 },
    { value: "urbanizacao", label: "Urbanização", count: 43 },
  ],
  historia: [
    { value: "brasil-colonia", label: "Brasil Colônia", count: 51 },
    { value: "brasil-imperio", label: "Brasil Império", count: 48 },
    { value: "brasil-republica", label: "Brasil República", count: 54 },
    { value: "historia-geral", label: "História Geral", count: 50 },
  ],
  arte: [
    { value: "artes-visuais", label: "Artes Visuais", count: 42 },
    { value: "musica", label: "Música", count: 38 },
    { value: "teatro", label: "Teatro", count: 44 },
    { value: "danca-arte", label: "Dança", count: 43 },
  ],
  ciencias: [
    { value: "materia-energia", label: "Matéria e energia", count: 58 },
    { value: "vida-evolucao", label: "Vida e evolução", count: 62 },
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
  { value: "computacao", label: "Habilidade BNCC Computação", count: 189 },
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
