import { useState, useRef, useEffect } from 'react';
import React from "react";
import { Filter, Search, ChevronDown, Check, X, Tag, Book, Lightbulb, Calendar, CheckSquare, Clock, ArrowRight, RotateCcw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface TransversalityPageProps {
  navigateTo: (page: string, data?: any) => void;
  currentPage?: string;
  userName?: string;
  onLogout?: () => void;
}

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface SelectedFilters {
  filterType: string;
  curricular?: string;
  component?: string;
  thematic?: string;
  year?: string;
  bnccType?: string;
  bnccCodes?: string[];
}

export default function TransversalityPage({
  navigateTo,
  currentPage,
  userName,
  onLogout,
}: TransversalityPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<any[]>([
    {
      date: new Date(Date.now() - 86400000),
      filters: { filterType: 'curricular', curricular: 'portugues' },
      label: 'Português - Interpretação de Texto',
    },
    {
      date: new Date(Date.now() - 172800000),
      filters: { filterType: 'bncc', bnccType: 'geral' },
      label: 'Habilidade BNCC Geral',
    },
    {
      date: new Date(Date.now() - 259200000),
      filters: { filterType: 'curricular', curricular: 'matematica' },
      label: 'Matemática - Álgebra',
    },
    {
      date: new Date(Date.now() - 345600000),
      filters: { filterType: 'curricular', curricular: 'ciencias' },
      label: 'Ciências - Matéria e Energia',
    },
    {
      date: new Date(Date.now() - 432000000),
      filters: { filterType: 'bncc', bnccType: 'computacao' },
      label: 'Habilidade BNCC Computação',
    },
    {
      date: new Date(Date.now() - 518400000),
      filters: { filterType: 'curricular', curricular: 'historia' },
      label: 'História - Brasil Colônia',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Estado dos filtros selecionados
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    filterType: '',
  });

  // Estado dos dropdowns abertos
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Estado de busca dentro dos dropdowns
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  // Estado de loading
  const [isSearching, setIsSearching] = useState(false);

  // Refs para scroll automático
  const curricularRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const thematicRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const bnccTypeRef = useRef<HTMLDivElement>(null);
  const bnccCodesRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLDivElement>(null);

  // Scroll automático quando novos filtros aparecem
  useEffect(() => {
    if (selectedFilters.filterType === 'curricular' && selectedFilters.curricular && curricularRef.current) {
      setTimeout(() => {
        curricularRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedFilters.curricular]);

  useEffect(() => {
    if (selectedFilters.component && componentRef.current) {
      setTimeout(() => {
        componentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedFilters.component]);

  useEffect(() => {
    if (selectedFilters.thematic && thematicRef.current) {
      setTimeout(() => {
        thematicRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedFilters.thematic]);

  useEffect(() => {
    if (selectedFilters.year && searchButtonRef.current) {
      setTimeout(() => {
        searchButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedFilters.year]);

  useEffect(() => {
    if (selectedFilters.filterType === 'bncc' && selectedFilters.bnccType && bnccTypeRef.current) {
      setTimeout(() => {
        bnccTypeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedFilters.bnccType]);

  useEffect(() => {
    if (selectedFilters.bnccCodes && selectedFilters.bnccCodes.length > 0 && searchButtonRef.current) {
      setTimeout(() => {
        searchButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedFilters.bnccCodes]);

  // Dados dos filtros
  const filterTypeOptions: FilterOption[] = [
    { value: 'curricular', label: 'Componente Curricular' },
    { value: 'bncc', label: 'Habilidades BNCC (Códigos)' },
  ];

  const curricularOptions: FilterOption[] = [
    { value: 'matematica', label: 'Matemática', count: 245 },
    { value: 'portugues', label: 'Língua Portuguesa', count: 312 },
    { value: 'ingles', label: 'Língua Inglesa', count: 189 },
    { value: 'educacao-fisica', label: 'Educação Física', count: 156 },
    { value: 'geografia', label: 'Geografia', count: 198 },
    { value: 'historia', label: 'História', count: 203 },
    { value: 'arte', label: 'Arte', count: 167 },
    { value: 'ciencias', label: 'Ciências', count: 221 },
  ];

  const componentOptions: Record<string, FilterOption[]> = {
    portugues: [
      { value: 'interpretacao-texto', label: 'Interpretação de texto', count: 87 },
      { value: 'estrategia-leitura', label: 'Estratégia de leitura', count: 65 },
      { value: 'construcao-sentidos', label: 'Construção de sentidos', count: 54 },
      { value: 'estruturas-sintaticas', label: 'Estruturas sintáticas', count: 43 },
      { value: 'ordem-sentenca', label: 'Ordem da sentença', count: 38 },
    ],
    matematica: [
      { value: 'algebra', label: 'Álgebra', count: 92 },
      { value: 'geometria', label: 'Geometria', count: 78 },
      { value: 'estatistica', label: 'Estatística', count: 45 },
      { value: 'probabilidade', label: 'Probabilidade', count: 30 },
    ],
    ingles: [
      { value: 'compreensao-oral', label: 'Compreensão oral', count: 56 },
      { value: 'compreensao-escrita', label: 'Compreensão escrita', count: 48 },
      { value: 'producao-oral', label: 'Produção oral', count: 42 },
      { value: 'producao-escrita', label: 'Produção escrita', count: 43 },
    ],
    'educacao-fisica': [
      { value: 'esportes', label: 'Esportes', count: 45 },
      { value: 'ginastica', label: 'Ginástica', count: 38 },
      { value: 'danca', label: 'Dança', count: 35 },
      { value: 'jogos', label: 'Jogos e brincadeiras', count: 38 },
    ],
    geografia: [
      { value: 'cartografia', label: 'Cartografia', count: 52 },
      { value: 'geopolitica', label: 'Geopolítica', count: 48 },
      { value: 'meio-ambiente', label: 'Meio ambiente', count: 55 },
      { value: 'urbanizacao', label: 'Urbanização', count: 43 },
    ],
    historia: [
      { value: 'brasil-colonia', label: 'Brasil Colônia', count: 51 },
      { value: 'brasil-imperio', label: 'Brasil Império', count: 48 },
      { value: 'brasil-republica', label: 'Brasil República', count: 54 },
      { value: 'historia-geral', label: 'História Geral', count: 50 },
    ],
    arte: [
      { value: 'artes-visuais', label: 'Artes Visuais', count: 42 },
      { value: 'musica', label: 'Música', count: 38 },
      { value: 'teatro', label: 'Teatro', count: 44 },
      { value: 'danca-arte', label: 'Dança', count: 43 },
    ],
    ciencias: [
      { value: 'materia-energia', label: 'Matéria e energia', count: 58 },
      { value: 'vida-evolucao', label: 'Vida e evolução', count: 62 },
      { value: 'terra-universo', label: 'Terra e universo', count: 55 },
      { value: 'tecnologia', label: 'Tecnologia', count: 46 },
    ],
  };

  const thematicOptions: Record<string, FilterOption[]> = {
    'interpretacao-texto': [
      { value: 'estrategia-leitura', label: 'Estratégia de leitura', count: 34 },
      { value: 'analise-critica', label: 'Análise crítica', count: 28 },
      { value: 'inferencia', label: 'Inferência', count: 25 },
    ],
    'estrategia-leitura': [
      { value: 'skimming', label: 'Skimming', count: 22 },
      { value: 'scanning', label: 'Scanning', count: 20 },
      { value: 'predicao', label: 'Predição', count: 23 },
    ],
    'construcao-sentidos': [
      { value: 'contexto', label: 'Contexto', count: 18 },
      { value: 'coesao-coerencia', label: 'Coesão e coerência', count: 20 },
      { value: 'intertextualidade', label: 'Intertextualidade', count: 16 },
    ],
    'estruturas-sintaticas': [
      { value: 'analise-sintatica', label: 'Análise sintática', count: 15 },
      { value: 'periodo-composto', label: 'Período composto', count: 14 },
      { value: 'regencia-concordancia', label: 'Regência e concordância', count: 14 },
    ],
    'ordem-sentenca': [
      { value: 'organizacao-textual', label: 'Organização textual', count: 12 },
      { value: 'pontuacao', label: 'Pontuação', count: 13 },
      { value: 'conectivos', label: 'Conectivos', count: 13 },
    ],
    'algebra': [
      { value: 'equacoes', label: 'Equações', count: 30 },
      { value: 'funcoes', label: 'Funções', count: 32 },
      { value: 'expressoes', label: 'Expressões algébricas', count: 30 },
    ],
    'geometria': [
      { value: 'plana', label: 'Geometria plana', count: 28 },
      { value: 'espacial', label: 'Geometria espacial', count: 25 },
      { value: 'analitica', label: 'Geometria analítica', count: 25 },
    ],
    'estatistica': [
      { value: 'graficos', label: 'Gráficos e tabelas', count: 15 },
      { value: 'medidas', label: 'Medidas estatísticas', count: 15 },
      { value: 'analise-dados', label: 'Análise de dados', count: 15 },
    ],
    'probabilidade': [
      { value: 'eventos', label: 'Eventos', count: 10 },
      { value: 'combinatoria', label: 'Combinatória', count: 10 },
      { value: 'probabilidade-condicional', label: 'Probabilidade condicional', count: 10 },
    ],
    'compreensao-oral': [
      { value: 'listening', label: 'Compreensão auditiva', count: 19 },
      { value: 'pronuncia', label: 'Pronúncia', count: 18 },
      { value: 'dialogo', label: 'Diálogo', count: 19 },
    ],
    'compreensao-escrita': [
      { value: 'reading', label: 'Leitura', count: 16 },
      { value: 'vocabulario', label: 'Vocabulário', count: 16 },
      { value: 'gramatica', label: 'Gramática', count: 16 },
    ],
    'producao-oral': [
      { value: 'speaking', label: 'Fala', count: 14 },
      { value: 'conversacao', label: 'Conversação', count: 14 },
      { value: 'apresentacao', label: 'Apresentação', count: 14 },
    ],
    'producao-escrita': [
      { value: 'writing', label: 'Escrita', count: 14 },
      { value: 'redacao', label: 'Redação', count: 15 },
      { value: 'estrutura-textual', label: 'Estrutura textual', count: 14 },
    ],
    'esportes': [
      { value: 'futebol', label: 'Futebol', count: 15 },
      { value: 'volei', label: 'Vôlei', count: 15 },
      { value: 'basquete', label: 'Basquete', count: 15 },
    ],
    'ginastica': [
      { value: 'artistica', label: 'Ginástica artística', count: 13 },
      { value: 'ritmica', label: 'Ginástica rítmica', count: 12 },
      { value: 'acrobatica', label: 'Ginástica acrobática', count: 13 },
    ],
    'danca': [
      { value: 'popular', label: 'Dança popular', count: 12 },
      { value: 'contemporanea', label: 'Dança contemporânea', count: 11 },
      { value: 'folclorica', label: 'Dança folclórica', count: 12 },
    ],
    'jogos': [
      { value: 'cooperativos', label: 'Jogos cooperativos', count: 13 },
      { value: 'competitivos', label: 'Jogos competitivos', count: 12 },
      { value: 'pre-desportivos', label: 'Jogos pré-desportivos', count: 13 },
    ],
    'cartografia': [
      { value: 'mapas', label: 'Mapas', count: 17 },
      { value: 'coordenadas', label: 'Coordenadas geográficas', count: 18 },
      { value: 'escala', label: 'Escala', count: 17 },
    ],
    'geopolitica': [
      { value: 'territorial', label: 'Organização territorial', count: 16 },
      { value: 'conflitos', label: 'Conflitos', count: 16 },
      { value: 'blocos-economicos', label: 'Blocos econômicos', count: 16 },
    ],
    'meio-ambiente': [
      { value: 'sustentabilidade', label: 'Sustentabilidade', count: 18 },
      { value: 'preservacao', label: 'Preservação', count: 19 },
      { value: 'impactos', label: 'Impactos ambientais', count: 18 },
    ],
    'urbanizacao': [
      { value: 'cidades', label: 'Desenvolvimento urbano', count: 14 },
      { value: 'metropoles', label: 'Metrópoles', count: 15 },
      { value: 'problemas-urbanos', label: 'Problemas urbanos', count: 14 },
    ],
    'brasil-colonia': [
      { value: 'descobrimento', label: 'Descobrimento', count: 17 },
      { value: 'ciclos-economicos', label: 'Ciclos econômicos', count: 17 },
      { value: 'escravidao', label: 'Escravidão', count: 17 },
    ],
    'brasil-imperio': [
      { value: 'independencia', label: 'Independência', count: 16 },
      { value: 'primeiro-reinado', label: 'Primeiro reinado', count: 16 },
      { value: 'segundo-reinado', label: 'Segundo reinado', count: 16 },
    ],
    'brasil-republica': [
      { value: 'velha-republica', label: 'República Velha', count: 18 },
      { value: 'era-vargas', label: 'Era Vargas', count: 18 },
      { value: 'ditadura-militar', label: 'Ditadura militar', count: 18 },
    ],
    'historia-geral': [
      { value: 'antiguidade', label: 'Antiguidade', count: 17 },
      { value: 'idade-media', label: 'Idade Média', count: 17 },
      { value: 'idade-moderna', label: 'Idade Moderna', count: 16 },
    ],
    'artes-visuais': [
      { value: 'pintura', label: 'Pintura', count: 14 },
      { value: 'escultura', label: 'Escultura', count: 14 },
      { value: 'fotografia', label: 'Fotografia', count: 14 },
    ],
    'musica': [
      { value: 'teoria-musical', label: 'Teoria musical', count: 13 },
      { value: 'historia-musica', label: 'História da música', count: 12 },
      { value: 'pratica-instrumental', label: 'Prática instrumental', count: 13 },
    ],
    'teatro': [
      { value: 'dramaturgia', label: 'Dramaturgia', count: 15 },
      { value: 'interpretacao', label: 'Interpretação', count: 14 },
      { value: 'producao-cenografia', label: 'Produção e cenografia', count: 15 },
    ],
    'danca-arte': [
      { value: 'expressao-corporal', label: 'Expressão corporal', count: 14 },
      { value: 'coreografia', label: 'Coreografia', count: 15 },
      { value: 'historia-danca', label: 'História da dança', count: 14 },
    ],
    'materia-energia': [
      { value: 'fisica-basica', label: 'Física básica', count: 19 },
      { value: 'quimica-basica', label: 'Química básica', count: 20 },
      { value: 'transformacoes', label: 'Transformações', count: 19 },
    ],
    'vida-evolucao': [
      { value: 'biologia-celular', label: 'Biologia celular', count: 21 },
      { value: 'genetica', label: 'Genética', count: 20 },
      { value: 'evolucao', label: 'Evolução', count: 21 },
    ],
    'terra-universo': [
      { value: 'astronomia', label: 'Astronomia', count: 18 },
      { value: 'geologia', label: 'Geologia', count: 19 },
      { value: 'clima', label: 'Clima e tempo', count: 18 },
    ],
    'tecnologia': [
      { value: 'inovacao', label: 'Inovação', count: 15 },
      { value: 'tecnologia-sociedade', label: 'Tecnologia e sociedade', count: 16 },
      { value: 'sustentabilidade-tech', label: 'Tecnologia sustentável', count: 15 },
    ],
  };

  const yearOptions: FilterOption[] = [
    { value: 'EF6', label: 'EF6' },
    { value: 'EF7', label: 'EF7' },
    { value: 'EF8', label: 'EF8' },
    { value: 'EF9', label: 'EF9' },
    { value: 'EM1', label: 'EM1' },
    { value: 'EM2', label: 'EM2' },
    { value: 'EM3', label: 'EM3' },
  ];

  const bnccTypeOptions: FilterOption[] = [
    { value: 'geral', label: 'Habilidade BNCC Geral', count: 456 },
    { value: 'computacao', label: 'Habilidade BNCC Computação', count: 189 },
  ];

  const bnccCodeOptions: FilterOption[] = [
    { value: 'EM13LP28', label: 'EM13LP28' },
    { value: 'EF69LP30', label: 'EF69LP30' },
    { value: 'EM13LP30', label: 'EM13LP30' },
    { value: 'EF67LP20', label: 'EF67LP20' },
    { value: 'EF67LP28', label: 'EF67LP28' },
    { value: 'EM13LP33', label: 'EM13LP33' },
    { value: 'EF06CO01', label: 'EF06CO01' },
    { value: 'EF06CO04', label: 'EF06CO04' },
    { value: 'EF06CO02', label: 'EF06CO02' },
    { value: 'EF07CO02', label: 'EF07CO02' },
    { value: 'EF08CO03', label: 'EF08CO03' },
    { value: 'EF69CO04', label: 'EF69CO04' },
  ];

  // Funções auxiliares
  const handleFilterSelect = (filterName: keyof SelectedFilters, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters: SelectedFilters = { ...prev, [filterName]: value };

      // Limpar filtros dependentes
      if (filterName === 'filterType') {
        return { filterType: value };
      }
      if (filterName === 'curricular') {
        delete newFilters.component;
        delete newFilters.thematic;
        delete newFilters.year;
      }
      if (filterName === 'component') {
        delete newFilters.thematic;
        delete newFilters.year;
      }
      if (filterName === 'thematic') {
        delete newFilters.year;
      }

      return newFilters;
    });
    setOpenDropdown(null);
  };

  const handleBnccCodeToggle = (code: string) => {
    setSelectedFilters((prev) => {
      const currentCodes = prev.bnccCodes || [];
      const newCodes = currentCodes.includes(code)
        ? currentCodes.filter((c) => c !== code)
        : [...currentCodes, code];

      return { ...prev, bnccCodes: newCodes };
    });
  };

  const handleYearSelect = (year: string) => {
    setSelectedFilters((prev) => ({ ...prev, year }));
  };

  const clearFilters = () => {
    setSelectedFilters({ filterType: '' });
    setSearchTerms({});
  };

  const createQuestionFromFilters = () => {
    // Obter labels dos filtros selecionados
    const curricularLabel = curricularOptions.find((o) => o.value === selectedFilters.curricular)?.label || '';
    const componentLabel = selectedFilters.curricular && selectedFilters.component
      ? componentOptions[selectedFilters.curricular]?.find((o) => o.value === selectedFilters.component)?.label
      : '';
    const thematicLabel =
      selectedFilters.component && selectedFilters.thematic
        ? thematicOptions[selectedFilters.component]
          ?.find((o) => o.value === selectedFilters.thematic)
          ?.label
        : undefined;

    const safeThematicLabel: string =
      thematicLabel && thematicLabel.trim() !== ''
        ? thematicLabel
        : 'a temática selecionada';


    // Mapear categoria de competência baseada no componente curricular
    const categoryMap: Record<string, { category: string; color: string; competency: string }> = {
      'portugues': {
        category: 'Comunicação e Colaboração',
        color: '#00BCD4',
        competency: 'Interagir por meio de tecnologias digitais',
      },
      'matematica': {
        category: 'Informações e Dados',
        color: '#FFC107',
        competency: 'Navegar, pesquisar e filtrar dados',
      },
      'ingles': {
        category: 'Comunicação e Colaboração',
        color: '#00BCD4',
        competency: 'Colaborar através de tecnologias digitais',
      },
      'ciencias': {
        category: 'Informações e Dados',
        color: '#FFC107',
        competency: 'Avaliar dados e informações',
      },
      'historia': {
        category: 'Resolução de Problemas',
        color: '#E91E63',
        competency: 'Identificar necessidades e respostas tecnológicas',
      },
      'geografia': {
        category: 'Informações e Dados',
        color: '#FFC107',
        competency: 'Gerenciar dados e informações',
      },
    };

    const categoryInfo = categoryMap[selectedFilters.curricular || 'portugues'] || categoryMap['portugues'];

    // Criar questão baseada no tipo de filtro
    if (selectedFilters.filterType === 'curricular') {
      return {
        fromPage: 'transversalidade',

        category: categoryInfo.category,
        categoryColor: categoryInfo.color,
        competency: categoryInfo.competency,

        questions: [
          {
            id: 1,
            text: `[${curricularLabel} - ${componentLabel}] ${safeThematicLabel
              }: Qual alternativa representa melhor essa competência?`,

            options: [
              {
                letter: 'A',
                text: `Aplicar ${safeThematicLabel
                  .toLowerCase()} apenas de forma teórica`,
                isCorrect: false,
              },
              {
                letter: 'B',
                text: `Integrar ${safeThematicLabel
                  .toLowerCase()} com tecnologias digitais`,
                isCorrect: true,
              },
              {
                letter: 'C',
                text: 'Ignorar metodologias digitais',
                isCorrect: false,
              },
              {
                letter: 'D',
                text: 'Usar tecnologia sem intencionalidade pedagógica',
                isCorrect: false,
              },
            ],

            explanation: `A alternativa correta demonstra o uso adequado da competência no contexto educacional.`,

            transversality: {
              curricular: curricularLabel,
              component: componentLabel,
              thematic: safeThematicLabel
              ,
              year: selectedFilters.year,
            },
          },
        ],
      };

    } else {
      // Fluxo BNCC
      const bnccTypeLabel = bnccTypeOptions.find((o) => o.value === selectedFilters.bnccType)?.label || '';
      const selectedCodes = selectedFilters.bnccCodes?.join(', ') || '';

      return {
        category: 'Cultura Digital',
        categoryColor: '#8B27FF',
        competency: 'Competências Gerais da BNCC',
        level: 'Intermediário',
        totalQuestions: 1,
        questions: [
          {
            id: 1,
            text: `[${bnccTypeLabel} - ${selectedCodes}] Considerando as habilidades BNCC selecionadas, qual alternativa melhor demonstra a aplicação dessas competências?`,
            options: [
              {
                letter: 'A',
                text: 'Utilizar tecnologias digitais apenas para entretenimento',
              },
              {
                letter: 'B',
                text: 'Compreender e aplicar as tecnologias digitais de forma crítica, reflexiva e ética nas diversas práticas sociais',
              },
              {
                letter: 'C',
                text: 'Evitar o uso de tecnologias no processo de aprendizagem',
              },
              {
                letter: 'D',
                text: 'Usar tecnologias sem considerar aspectos éticos',
              },
              {
                letter: 'E',
                text: 'Limitar o uso de tecnologias apenas a atividades recreativas',
              },
            ],
            correctAnswer: 'B',
            explanation: `Esta alternativa reflete adequadamente as competências gerais da BNCC relacionadas à cultura digital, enfatizando o uso crítico, reflexivo e ético das tecnologias digitais, conforme especificado nas habilidades ${selectedCodes}.`,
            category: 'Cultura Digital',
            categoryColor: '#8B27FF',
            competency: 'Competências Gerais da BNCC',
            transversality: {
              bnccType: bnccTypeLabel,
              bnccCodes: selectedFilters.bnccCodes,
            },
          },
        ],
      };
    }
  };

  const handleSearch = () => {
    setIsSearching(true);

    // Simular busca
    setTimeout(() => {
      setIsSearching(false);

      // Salvar no histórico
      const newHistory = {
        date: new Date(),
        filters: { ...selectedFilters },
        label: getSearchLabel(),
      };
      setSearchHistory([newHistory, ...searchHistory.slice(0, 4)]);

      // Criar dados da questão baseados nos filtros
      const questionData = createQuestionFromFilters();

      // Navegar para a tela de questão isolada
      navigateTo('quiz', questionData);
    }, 800);
  };

  const getSearchLabel = () => {
    if (selectedFilters.filterType === 'curricular' && selectedFilters.curricular) {
      const curricular = curricularOptions.find((o) => o.value === selectedFilters.curricular);
      return curricular?.label || 'Busca';
    }
    if (selectedFilters.filterType === 'bncc' && selectedFilters.bnccType) {
      return 'Busca por BNCC';
    }
    return 'Nova busca';
  };

  const isSearchEnabled = () => {
    if (selectedFilters.filterType === 'curricular') {
      return !!(selectedFilters.curricular && selectedFilters.component && selectedFilters.thematic && selectedFilters.year);
    }
    if (selectedFilters.filterType === 'bncc') {
      return !!(selectedFilters.bnccType && selectedFilters.bnccCodes && selectedFilters.bnccCodes.length > 0);
    }
    return false;
  };

  // Verificar se há questões disponíveis para a seleção
  const hasQuestionsAvailable = () => {
    // Só verificar quando todos os filtros estão completos
    if (selectedFilters.filterType === 'curricular') {
      // Só verificar se TODOS os filtros obrigatórios estão preenchidos
      if (!selectedFilters.curricular || !selectedFilters.component || !selectedFilters.thematic || !selectedFilters.year) {
        return true; // Ainda não completou todos os filtros, não mostrar aviso
      }

      // Exemplo: algumas combinações específicas não têm questões
      // Aqui você pode adicionar lógica para verificar combinações sem questões
      if (selectedFilters.curricular === 'educacao-fisica' && selectedFilters.component === 'esportes') {
        return false;
      }
      if (selectedFilters.curricular === 'arte' && selectedFilters.component === 'artes-visuais') {
        return false;
      }

      // Por padrão, tem questões disponíveis
      return true;
    }

    if (selectedFilters.filterType === 'bncc') {
      // Só verificar se TODOS os filtros obrigatórios estão preenchidos
      if (!selectedFilters.bnccType || !selectedFilters.bnccCodes || selectedFilters.bnccCodes.length === 0) {
        return true; // Ainda não completou todos os filtros, não mostrar aviso
      }

      // Todas as opções BNCC têm questões por enquanto
      return true;
    }

    return true;
  };

  const filterOptions = (options: FilterOption[], searchTerm: string) => {
    if (!searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Selecione o Tipo de Filtro</h3>
              <p className="text-gray-600 dark:text-gray-400">Escolha como deseja buscar as questões de transversalidade</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterTypeOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleFilterSelect('filterType', option.value);
                    setCurrentStep(2);
                  }}
                  className={`p-8 rounded-2xl border-2 transition-all text-left ${selectedFilters.filterType === option.value
                    ? 'border-[#8B27FF] bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#8B27FF] bg-white dark:bg-gray-800'
                    }`}
                >
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{option.label}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {option.value === 'curricular'
                      ? 'Navegue por componentes curriculares e temáticas específicas'
                      : 'Selecione habilidades baseadas nos códigos da BNCC'}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        if (selectedFilters.filterType === 'curricular') {
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Componente Curricular e Temática</h3>
                <p className="text-gray-600 dark:text-gray-400">Selecione o componente, matéria e tema específico</p>
              </div>

              <div className="space-y-4">
                {/* Componente Curricular */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Componente Curricular <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedFilters.curricular || ''}
                    onChange={(e) => handleFilterSelect('curricular', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                  >
                    <option value="">Selecione...</option>
                    {curricularOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} {option.count && `(${option.count})`}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedFilters.curricular && componentOptions[selectedFilters.curricular] && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Componente <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedFilters.component || ''}
                      onChange={(e) => handleFilterSelect('component', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                    >
                      <option value="">Selecione...</option>
                      {componentOptions[selectedFilters.curricular].map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} {option.count && `(${option.count})`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedFilters.component && thematicOptions[selectedFilters.component] && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Temática <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedFilters.thematic || ''}
                      onChange={(e) => handleFilterSelect('thematic', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                    >
                      <option value="">Selecione...</option>
                      {thematicOptions[selectedFilters.component].map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} {option.count && `(${option.count})`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Habilidades BNCC</h3>
                <p className="text-gray-600 dark:text-gray-400">Selecione o tipo de habilidade BNCC desejado</p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Habilidade BNCC <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedFilters.bnccType || ''}
                  onChange={(e) => handleFilterSelect('bnccType', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
                >
                  <option value="">Selecione...</option>
                  {bnccTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} {option.count && `(${option.count})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        }

      case 3:
        if (selectedFilters.filterType === 'curricular') {
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ano Escolar</h3>
                <p className="text-gray-600 dark:text-gray-400">Selecione o ano ou série desejado</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#F9F7FF] dark:bg-gray-800 border-2 border-[#E8E0FF] dark:border-gray-700 rounded-2xl p-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {yearOptions.map((year) => (
                    <button
                      key={year.value}
                      onClick={() => handleYearSelect(year.value)}
                      className={`h-16 rounded-xl font-bold text-lg transition-all duration-200 ${selectedFilters.year === year.value
                        ? 'bg-[#8B27FF] text-white border-2 border-[#8B27FF] shadow-lg shadow-purple-500/30'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-[#8B27FF]'
                        }`}
                    >
                      {year.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Códigos BNCC</h3>
                <p className="text-gray-600 dark:text-gray-400">Selecione um ou mais códigos de habilidades</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#F9F7FF] dark:bg-gray-800 border-2 border-[#E8E0FF] dark:border-gray-700 rounded-2xl p-6"
              >
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bnccCodeOptions.map((code) => (
                    <button
                      key={code.value}
                      onClick={() => handleBnccCodeToggle(code.value)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-150 ${selectedFilters.bnccCodes?.includes(code.value)
                        ? 'bg-[#E8E0FF] dark:bg-purple-900/30 border-2 border-[#8B27FF]'
                        : 'bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:bg-[#F9F7FF] dark:hover:bg-gray-600'
                        }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selectedFilters.bnccCodes?.includes(code.value)
                          ? 'bg-[#8B27FF] border-[#8B27FF]'
                          : 'border-gray-300 dark:border-gray-500'
                          }`}
                      >
                        {selectedFilters.bnccCodes?.includes(code.value) && (
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        )}
                      </div>
                      <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-200">
                        {code.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage="transversalidade"
        onNavigate={navigateTo}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userName={userName || 'Professor'}
          navigateTo={navigateTo}
          onLogout={() => navigateTo('login')}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl text-[#8B27FF] mb-2">Transversalidade</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Encontre questões por componentes curriculares, temáticas e habilidades BNCC
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowModal(true);
                  setCurrentStep(1);
                  setSelectedFilters({ filterType: '' });
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] hover:from-[#7B1FE8] hover:to-[#9D3FFF] text-white px-6 py-3 rounded-xl transition-all shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                Buscar Questões
              </motion.button>
            </div>


            {/* Modal com Steps */}
            <AnimatePresence>
              {showModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
                  onClick={() => setShowModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  >
                    {/* Header do Modal */}
                    <div className="sticky top-0 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] px-8 py-6 flex items-center justify-between z-50">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Buscar Questões de Transversalidade</h2>
                        <div className="flex gap-2">
                          {[1, 2, 3].map((step) => (
                            <div
                              key={step}
                              className={`h-2 rounded-full transition-all ${step === currentStep
                                ? 'bg-white w-8'
                                : step < currentStep
                                  ? 'bg-purple-300 w-6'
                                  : 'bg-purple-200 w-4'
                                }`}
                            />
                          ))}
                        </div>
                        <p className="text-purple-100 text-sm mt-2">
                          Passo {currentStep} de {totalSteps}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowModal(false)}
                        className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Conteúdo do Step */}
                    <div className="p-8">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {renderStep()}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Footer do Modal */}
                    <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700/50 px-8 py-6 flex gap-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          if (currentStep > 1) {
                            setCurrentStep(currentStep - 1);
                          } else {
                            setShowModal(false);
                          }
                        }}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        {currentStep === 1 ? 'Cancelar' : 'Voltar'}
                      </button>

                      <div className="flex-1" />

                      <button
                        onClick={() => {
                          if (currentStep < totalSteps) {
                            if (currentStep === 1 && selectedFilters.filterType) {
                              setCurrentStep(currentStep + 1);
                            } else if (
                              currentStep === 2 &&
                              ((selectedFilters.filterType === 'curricular' &&
                                selectedFilters.curricular &&
                                selectedFilters.component &&
                                selectedFilters.thematic) ||
                                (selectedFilters.filterType === 'bncc' && selectedFilters.bnccType))
                            ) {
                              setCurrentStep(currentStep + 1);
                            }
                          } else {
                            handleSearch();
                          }
                        }}
                        disabled={
                          currentStep === 1
                            ? !selectedFilters.filterType
                            : currentStep === 2
                              ? selectedFilters.filterType === 'curricular'
                                ? !selectedFilters.curricular ||
                                !selectedFilters.component ||
                                !selectedFilters.thematic
                                : !selectedFilters.bnccType
                              : selectedFilters.filterType === 'curricular'
                                ? !selectedFilters.year
                                : !(
                                  selectedFilters.bnccCodes &&
                                  selectedFilters.bnccCodes.length > 0
                                )
                        }
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-all ${currentStep === totalSteps
                          ? isSearching
                            ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                            : 'bg-[#8B27FF] text-white hover:bg-[#6B1FBF] hover:-translate-y-1 shadow-lg shadow-purple-500/30'
                          : 'bg-[#8B27FF] text-white hover:bg-[#6B1FBF] hover:-translate-y-1 shadow-lg shadow-purple-500/30'
                          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
                      >
                        {isSearching ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Search className="w-5 h-5" />
                            </motion.div>
                            Buscando...
                          </>
                        ) : currentStep === totalSteps ? (
                          <>
                            <Search className="w-5 h-5" />
                            Procurar Questão
                            <ArrowRight className="w-5 h-5" />
                          </>
                        ) : (
                          <>
                            Próximo
                            <ChevronRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>


            {/* Histórico de Buscas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Histórico de Buscas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchHistory.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-[#8B27FF] hover:shadow-lg transition-all text-left"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.label}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-[#8B27FF] font-medium hover:underline">
                      Buscar novamente →
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}