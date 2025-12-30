import { useState, useRef, useEffect } from 'react';
import { Filter, Search, ChevronDown, Check, X, Tag, Book, Lightbulb, Calendar, CheckSquare, Clock, ArrowRight, RotateCcw } from 'lucide-react';
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
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  
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
    const thematicLabel = selectedFilters.component && selectedFilters.thematic
      ? thematicOptions[selectedFilters.component]?.find((o) => o.value === selectedFilters.thematic)?.label
      : '';

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
        category: categoryInfo.category,
        categoryColor: categoryInfo.color,
        competency: categoryInfo.competency,
        level: selectedFilters.year === 'EF6' || selectedFilters.year === 'EF7' ? 'Básico' : 
               selectedFilters.year === 'EF8' || selectedFilters.year === 'EF9' ? 'Intermediário' : 'Avançado',
        totalQuestions: 1,
        questions: [
          {
            id: 1,
            text: `[${curricularLabel} - ${componentLabel}] ${thematicLabel}: Qual das alternativas abaixo melhor representa o uso adequado desta competência no contexto educacional?`,
            options: [
              {
                letter: 'A',
                text: `Aplicar ${thematicLabel?.toLowerCase()} apenas em contextos teóricos sem prática`,
              },
              {
                letter: 'B',
                text: `Utilizar ${thematicLabel?.toLowerCase()} de forma integrada com ferramentas digitais para melhorar a compreensão`,
              },
              {
                letter: 'C',
                text: 'Ignorar completamente as novas metodologias de ensino',
              },
              {
                letter: 'D',
                text: 'Aplicar métodos tradicionais sem considerar o contexto digital',
              },
              {
                letter: 'E',
                text: 'Manter as práticas pedagógicas sem atualização tecnológica',
              },
            ],
            correctAnswer: 'B',
            explanation: `A alternativa correta demonstra a integração adequada de ${thematicLabel?.toLowerCase()} com tecnologias digitais, promovendo uma aprendizagem mais significativa e contextualizada no ambiente educacional do ${selectedFilters.year}, alinhada com as competências de ${categoryInfo.category} da BNCC.`,
            category: categoryInfo.category,
            categoryColor: categoryInfo.color,
            competency: categoryInfo.competency,
            transversality: {
              curricular: curricularLabel,
              component: componentLabel,
              thematic: thematicLabel,
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
      navigateTo('single-question', questionData);
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

  // Componente de Dropdown customizado
  const FilterDropdown = ({
    id,
    label,
    icon: Icon,
    placeholder,
    options,
    value,
    onSelect,
    required = false,
  }: {
    id: string;
    label: string;
    icon: any;
    placeholder: string;
    options: FilterOption[];
    value: string;
    onSelect: (value: string) => void;
    required?: boolean;
  }) => {
    const isOpen = openDropdown === id;
    const searchTerm = searchTerms[id] || '';
    const filteredOptions = filterOptions(options, searchTerm);
    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative bg-[#F9F7FF] dark:bg-gray-800 border-2 rounded-2xl p-6 transition-all duration-300 ${
          isOpen
            ? 'border-[#8B27FF] shadow-lg shadow-purple-500/20'
            : value
            ? 'border-[#8B27FF] shadow-md'
            : 'border-[#E8E0FF] dark:border-gray-700'
        } hover:border-[#8B27FF] hover:shadow-lg hover:shadow-purple-500/15`}
      >
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-5 h-5 text-[#8B27FF]" strokeWidth={2} />
          <span className="text-sm font-semibold text-[#6B1FBF] dark:text-purple-400 uppercase tracking-wide">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </div>

        {/* Select Button */}
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className={`w-full h-14 bg-white dark:bg-gray-700 border-2 rounded-xl px-5 flex items-center justify-between transition-all duration-200 ${
            isOpen
              ? 'border-[#8B27FF] shadow-md shadow-purple-500/10'
              : 'border-gray-200 dark:border-gray-600 hover:border-[#8B27FF]'
          }`}
        >
          <span className={selectedOption ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-400 dark:text-gray-500 italic'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-700 border-2 border-[#E8E0FF] dark:border-gray-600 rounded-xl shadow-2xl shadow-purple-500/20 z-50 overflow-hidden"
            >
              {/* Search Input */}
              <div className="sticky top-0 bg-white dark:bg-gray-700 p-3 border-b border-gray-100 dark:border-gray-600">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerms({ ...searchTerms, [id]: e.target.value })}
                    className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B27FF] focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Options List */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onSelect(option.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                        value === option.value
                          ? 'bg-[#E8E0FF] dark:bg-purple-900/30 text-[#6B1FBF] dark:text-purple-300 font-medium'
                          : 'hover:bg-[#F9F7FF] dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {value === option.value && (
                        <Check className="w-4 h-4 text-[#8B27FF]" strokeWidth={2.5} />
                      )}
                      <span className="flex-1 text-left text-[15px]">{option.label}</span>
                      {option.count && (
                        <span className="bg-[#F3E8FF] dark:bg-purple-900/50 text-[#8B27FF] dark:text-purple-300 text-xs font-bold px-2.5 py-1 rounded-full">
                          {option.count}
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">
                    Nenhuma opção encontrada
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Header
        userName={userName || 'Professor'}
        onLogout={onLogout}
        onMenuClick={() => setSidebarOpen(true)}
        navigateTo={navigateTo}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      <div className="max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Header da Página */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-10 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#B855FF] rounded-2xl flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Transversalidade</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            Encontre questões específicas navegando pelos componentes curriculares, temáticas e habilidades BNCC
          </p>
        </motion.div>

        {/* Container Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna de Filtros */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filtro 1 - Tipo de Filtro */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Tipo de Filtro <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedFilters.filterType}
                onChange={(e) => handleFilterSelect('filterType', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
              >
                <option value="">Selecione...</option>
                {filterTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Fluxo A - Componente Curricular */}
            {selectedFilters.filterType === 'curricular' && (
              <>
                <div ref={curricularRef}>
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
                  <div ref={componentRef}>
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
                  <div ref={thematicRef}>
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

                {selectedFilters.thematic && (
                  <div ref={yearRef}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#F9F7FF] dark:bg-gray-800 border-2 border-[#E8E0FF] dark:border-gray-700 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-[#8B27FF]" strokeWidth={2} />
                        <span className="text-sm font-semibold text-[#6B1FBF] dark:text-purple-400 uppercase tracking-wide">
                          Ano Escolar<span className="text-red-500 ml-1">*</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                        {yearOptions.map((year) => (
                          <button
                            key={year.value}
                            onClick={() => handleYearSelect(year.value)}
                            className={`h-16 rounded-xl font-bold text-lg transition-all duration-200 ${
                              selectedFilters.year === year.value
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
                )}
              </>
            )}

            {/* Fluxo B - Habilidades BNCC */}
            {selectedFilters.filterType === 'bncc' && (
              <>
                <div ref={bnccTypeRef}>
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

                {selectedFilters.bnccType && (
                  <div ref={bnccCodesRef}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#F9F7FF] dark:bg-gray-800 border-2 border-[#E8E0FF] dark:border-gray-700 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <CheckSquare className="w-5 h-5 text-[#8B27FF]" strokeWidth={2} />
                        <span className="text-sm font-semibold text-[#6B1FBF] dark:text-purple-400 uppercase tracking-wide">
                          Habilidades Relacionadas<span className="text-red-500 ml-1">*</span>
                        </span>
                      </div>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {bnccCodeOptions.map((code) => (
                          <button
                            key={code.value}
                            onClick={() => handleBnccCodeToggle(code.value)}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-150 ${
                              selectedFilters.bnccCodes?.includes(code.value)
                                ? 'bg-[#E8E0FF] dark:bg-purple-900/30 border-2 border-[#8B27FF]'
                                : 'bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:bg-[#F9F7FF] dark:hover:bg-gray-600'
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                                selectedFilters.bnccCodes?.includes(code.value)
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
                )}
              </>
            )}
          </div>

          {/* Coluna Lateral - Resumo */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-white dark:bg-gray-800 border-2 border-[#E8E0FF] dark:border-gray-700 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-[#6B1FBF] dark:text-purple-400 mb-4">Sua Seleção</h3>

              <div className="space-y-3 mb-6">
                {selectedFilters.filterType && (
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8B27FF] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Tipo:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {filterTypeOptions.find((o) => o.value === selectedFilters.filterType)?.label}
                      </span>
                    </div>
                  </div>
                )}

                {selectedFilters.curricular && (
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8B27FF] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Disciplina:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {curricularOptions.find((o) => o.value === selectedFilters.curricular)?.label}
                      </span>
                    </div>
                  </div>
                )}

                {selectedFilters.component && (
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8B27FF] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Componente:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {componentOptions[selectedFilters.curricular!]?.find((o) => o.value === selectedFilters.component)?.label}
                      </span>
                    </div>
                  </div>
                )}

                {selectedFilters.thematic && (
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8B27FF] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Temtica:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {thematicOptions[selectedFilters.component!]?.find((o) => o.value === selectedFilters.thematic)?.label}
                      </span>
                    </div>
                  </div>
                )}

                {selectedFilters.year && (
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8B27FF] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Ano:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{selectedFilters.year}</span>
                    </div>
                  </div>
                )}

                {selectedFilters.bnccType && (
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8B27FF] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Tipo BNCC:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {bnccTypeOptions.find((o) => o.value === selectedFilters.bnccType)?.label}
                      </span>
                    </div>
                  </div>
                )}

                {selectedFilters.bnccCodes && selectedFilters.bnccCodes.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8B27FF] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Códigos:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {selectedFilters.bnccCodes.length} selecionado(s)
                      </span>
                    </div>
                  </div>
                )}

                {!selectedFilters.filterType && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                    Nenhum filtro selecionado ainda
                  </p>
                )}
              </div>

              {selectedFilters.filterType && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Limpar Filtros
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Botão de Busca */}
        <motion.div
          ref={searchButtonRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-4"
        >
          {/* Aviso de sem questões disponíveis */}
          {isSearchEnabled() && !hasQuestionsAvailable() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">
                    Nenhuma questão disponível
                  </h3>
                  <p className="text-amber-800 dark:text-amber-400 leading-relaxed">
                    No há questões cadastradas para a combinação de filtros selecionada. 
                    Por favor, tente outra seleção ou entre em contato para solicitar a criação de questões para esta categoria.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Botão de busca */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 flex items-center justify-end gap-4">
            <button
              onClick={handleSearch}
              disabled={!isSearchEnabled() || isSearching || !hasQuestionsAvailable()}
              className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-250 ${
                isSearchEnabled() && !isSearching && hasQuestionsAvailable()
                  ? 'bg-[#8B27FF] text-white hover:bg-[#6B1FBF] hover:-translate-y-1 shadow-lg shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSearching ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Search className="w-5 h-5" />
                  </motion.div>
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Procurar Questão
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Histórico de Buscas */}
        {searchHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#8B27FF]" />
              Histórico
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
        )}
      </div>
    </div>
  );
}