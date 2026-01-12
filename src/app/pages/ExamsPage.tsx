import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  FileCheck,
  Eye,
  Download,
  Calendar,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Search,
  ChevronDown,
  TrendingUp,
  BarChart3,
  Info,
  RotateCcw,
  X,
  Star,
  Target,
  AlertTriangle,
  Sparkles,
  Check,
  BookOpen,
} from 'lucide-react';

interface ExamsPageProps {
  navigateTo: (page: string) => void;
  userRole?: 'admin' | 'user';
}

interface Exam {
  id: string;
  date: string;
  time: string;
  name: string;
  cpf: string;
  status: 'Aprovado' | 'Reprovado' | 'Pendente';
  type: string;
  score?: number;
  pendingReason?: string;
}

interface CompetenciaResultado {
  nome: string;
  categoria: string;
  cor: string;
  pontuacao: number;
  maxPontos: number;
}

interface QuestionOption {
  letter: string;
  text: string;
  isCorrect: boolean;
}

interface ExamQuestion {
  id: number;
  questionText: string;
  category: string;
  categoryColor: string;
  competency: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: QuestionOption[];
}

interface ExamDetails {
  pontosTotais: number;
  maxPontos: number;
  porcentagem: number;
  competencias: CompetenciaResultado[];
  pontoForte: string;
  areaParaMelhorar: string;
  tempoGasto: string;
  questoesCorretas: number;
  questoesTotais: number;
  questions: ExamQuestion[];
}

export default function ExamsPage({ navigateTo, userRole }: ExamsPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'Aprovado' | 'Reprovado' | 'Pendente'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [hoveredPendingId, setHoveredPendingId] = useState<string | null>(null);
  const [hoveredDownloadId, setHoveredDownloadId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  
  // Estado para exame em andamento - SIMULANDO exame iniciado
  const [examInProgress, setExamInProgress] = useState(true); // Mude para false para testar estado normal
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutos em segundos

  // Timer countdown
  useEffect(() => {
    if (!examInProgress || timeRemaining <= 0) return;

    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setExamInProgress(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [examInProgress, timeRemaining]);

  // Formatar tempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handler para iniciar/retornar ao exame
  const handleExamClick = () => {
    if (examInProgress) {
      // Retornar ao exame
      alert('Retornando ao exame...');
      // navigateTo('exam-nivel'); // Adicione esta navegação quando a página existir
    } else {
      // Iniciar novo exame
      setExamInProgress(true);
      setTimeRemaining(45 * 60);
      alert('Iniciando exame...');
      // navigateTo('exam-nivel'); // Adicione esta navegação quando a página existir
    }
  };

  // Dados de exames (mock data)
  const exames: Exam[] = [
    {
      id: '1',
      date: '12/12/2025',
      time: '10:53:31',
      name: 'Andr Silva',
      cpf: '126.XXX.XXX-11',
      status: 'Aprovado',
      type: 'Exame de Nível',
      score: 85,
    },
    {
      id: '2',
      date: '12/12/2025',
      time: '10:53:30',
      name: 'André Silva',
      cpf: '126.XXX.XXX-11',
      status: 'Reprovado',
      type: 'Exame de Nível',
      score: 45,
    },
    {
      id: '3',
      date: '11/12/2025',
      time: '14:22:15',
      name: 'André Silva',
      cpf: '126.XXX.XXX-11',
      status: 'Aprovado',
      type: 'Exame de Certificação',
      score: 92,
    },
    {
      id: '4',
      date: '10/12/2025',
      time: '09:15:42',
      name: 'André Silva',
      cpf: '126.XXX.XXX-11',
      status: 'Pendente',
      type: 'Exame de Certificação',
      pendingReason: 'Rosto não reconhecido',
    },
    {
      id: '5',
      date: '09/12/2025',
      time: '16:30:22',
      name: 'André Silva',
      cpf: '126.XXX.XXX-11',
      status: 'Aprovado',
      type: 'Exame de Nível',
      score: 78,
    },
  ];

  // Detalhes dos exames (mock data)
  const examDetails: Record<string, ExamDetails> = {
    '1': {
      pontosTotais: 850,
      maxPontos: 1000,
      porcentagem: 85,
      questoesCorretas: 34,
      questoesTotais: 40,
      tempoGasto: '42 minutos',
      pontoForte: 'Comunicação e Colaboração',
      areaParaMelhorar: 'Proteção e Segurança',
      competencias: [
        { nome: 'Navegação e Pesquisa', categoria: 'Informações e Dados', cor: '#FFB800', pontuacao: 90, maxPontos: 100 },
        { nome: 'Avaliação de Informações', categoria: 'Informações e Dados', cor: '#FFB800', pontuacao: 85, maxPontos: 100 },
        { nome: 'Interação Digital', categoria: 'Comunicação e Colaboração', cor: '#00BCD4', pontuacao: 95, maxPontos: 100 },
        { nome: 'Compartilhamento', categoria: 'Comunicação e Colaboração', cor: '#00BCD4', pontuacao: 90, maxPontos: 100 },
        { nome: 'Desenvolvimento de Conteúdo', categoria: 'Criação de Conteúdo', cor: '#FF6B35', pontuacao: 80, maxPontos: 100 },
        { nome: 'Integração de Conteúdo', categoria: 'Criação de Conteúdo', cor: '#FF6B35', pontuacao: 75, maxPontos: 100 },
        { nome: 'Proteção de Dispositivos', categoria: 'Proteção e Segurança', cor: '#4CAF50', pontuacao: 70, maxPontos: 100 },
        { nome: 'Proteção de Dados Pessoais', categoria: 'Proteção e Segurança', cor: '#4CAF50', pontuacao: 65, maxPontos: 100 },
        { nome: 'Resolução de Problemas Técnicos', categoria: 'Resolução de Problemas', cor: '#E91E63', pontuacao: 85, maxPontos: 100 },
        { nome: 'Identificação de Lacunas', categoria: 'Resolução de Problemas', cor: '#E91E63', pontuacao: 88, maxPontos: 100 },
      ],
      questions: [
        {
          id: 1,
          questionText: 'Qual é a função principal de um firewall em uma rede?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Controlar o tráfego de entrada e saída da rede', isCorrect: true },
            { letter: 'B', text: 'Gerenciar a alocação de recursos de rede', isCorrect: false },
            { letter: 'C', text: 'Monitorar o desempenho da rede', isCorrect: false },
            { letter: 'D', text: 'Realizar backup de dados', isCorrect: false },
          ],
        },
        {
          id: 2,
          questionText: 'O que é um ataque de negação de serviço (DoS)?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: true },
            { letter: 'C', text: 'Um ataque que rouba informações pessoais', isCorrect: false },
            { letter: 'D', text: 'Um ataque que corrompe dados', isCorrect: false },
          ],
        },
        {
          id: 3,
          questionText: 'Qual é a importância de atualizar regularmente o sistema operacional?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Melhorar a velocidade do sistema', isCorrect: false },
            { letter: 'B', text: 'Aumentar a capacidade de armazenamento', isCorrect: false },
            { letter: 'C', text: 'Corrigir vulnerabilidades de segurança', isCorrect: true },
            { letter: 'D', text: 'Melhorar a interface do usuário', isCorrect: false },
          ],
        },
        {
          id: 4,
          questionText: 'O que é um vírus de computador?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um programa malicioso que se replica e pode danificar sistemas', isCorrect: true },
            { letter: 'B', text: 'Um software para gerenciamento de projetos', isCorrect: false },
            { letter: 'C', text: 'Um aplicativo para edição de fotos', isCorrect: false },
            { letter: 'D', text: 'Um sistema operacional', isCorrect: false },
          ],
        },
        {
          id: 5,
          questionText: 'Qual é a função de um antivírus?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Gerenciar a rede de computadores', isCorrect: false },
            { letter: 'B', text: 'Detectar e remover vírus de computador', isCorrect: true },
            { letter: 'C', text: 'Criar backups de dados', isCorrect: false },
            { letter: 'D', text: 'Monitorar o desempenho do sistema', isCorrect: false },
          ],
        },
        {
          id: 6,
          questionText: 'O que é criptografia?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um método para gerenciar arquivos', isCorrect: false },
            { letter: 'B', text: 'Um sistema para compartilhar informações', isCorrect: false },
            { letter: 'C', text: 'Um processo para codificar informações para proteção', isCorrect: true },
            { letter: 'D', text: 'Um software para edição de vídeos', isCorrect: false },
          ],
        },
        {
          id: 7,
          questionText: 'Qual é a importância de usar senhas fortes e únicas?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Proteger contra acesso não autorizado', isCorrect: true },
            { letter: 'B', text: 'Aumentar a velocidade do sistema', isCorrect: false },
            { letter: 'C', text: 'Melhorar a interface do usuário', isCorrect: false },
            { letter: 'D', text: 'Gerenciar a rede de computadores', isCorrect: false },
          ],
        },
        {
          id: 8,
          questionText: 'O que é um ataque de engenharia social?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que usa manipulação para obter informações confidenciais', isCorrect: true },
            { letter: 'C', text: 'Um ataque que corrompe dados', isCorrect: false },
            { letter: 'D', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: false },
          ],
        },
        {
          id: 9,
          questionText: 'Qual é a função de um firewall em uma rede?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Controlar o tráfego de entrada e saída da rede', isCorrect: true },
            { letter: 'B', text: 'Gerenciar a alocação de recursos de rede', isCorrect: false },
            { letter: 'C', text: 'Monitorar o desempenho da rede', isCorrect: false },
            { letter: 'D', text: 'Realizar backup de dados', isCorrect: false },
          ],
        },
        {
          id: 10,
          questionText: 'O que é um ataque de negação de serviço (DoS)?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: true },
            { letter: 'C', text: 'Um ataque que rouba informações pessoais', isCorrect: false },
            { letter: 'D', text: 'Um ataque que corrompe dados', isCorrect: false },
          ],
        },
      ],
    },
    '2': {
      pontosTotais: 450,
      maxPontos: 1000,
      porcentagem: 45,
      questoesCorretas: 18,
      questoesTotais: 40,
      tempoGasto: '38 minutos',
      pontoForte: 'Resolução de Problemas',
      areaParaMelhorar: 'Proteção e Segurança',
      competencias: [
        { nome: 'Navegação e Pesquisa', categoria: 'Informações e Dados', cor: '#FFB800', pontuacao: 50, maxPontos: 100 },
        { nome: 'Avaliação de Informações', categoria: 'Informações e Dados', cor: '#FFB800', pontuacao: 45, maxPontos: 100 },
        { nome: 'Interação Digital', categoria: 'Comunicação e Colaboração', cor: '#00BCD4', pontuacao: 40, maxPontos: 100 },
        { nome: 'Compartilhamento', categoria: 'Comunicação e Colaboração', cor: '#00BCD4', pontuacao: 35, maxPontos: 100 },
        { nome: 'Desenvolvimento de Conteúdo', categoria: 'Criação de Conteúdo', cor: '#FF6B35', pontuacao: 48, maxPontos: 100 },
        { nome: 'Integração de Conteúdo', categoria: 'Criação de Conteúdo', cor: '#FF6B35', pontuacao: 42, maxPontos: 100 },
        { nome: 'Proteção de Dispositivos', categoria: 'Proteção e Segurança', cor: '#4CAF50', pontuacao: 30, maxPontos: 100 },
        { nome: 'Proteção de Dados Pessoais', categoria: 'Proteção e Segurança', cor: '#4CAF50', pontuacao: 28, maxPontos: 100 },
        { nome: 'Resolução de Problemas Técnicos', categoria: 'Resolução de Problemas', cor: '#E91E63', pontuacao: 65, maxPontos: 100 },
        { nome: 'Identificação de Lacunas', categoria: 'Resolução de Problemas', cor: '#E91E63', pontuacao: 62, maxPontos: 100 },
      ],
      questions: [
        {
          id: 1,
          questionText: 'Qual é a função principal de um firewall em uma rede?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Controlar o tráfego de entrada e saída da rede', isCorrect: true },
            { letter: 'B', text: 'Gerenciar a alocação de recursos de rede', isCorrect: false },
            { letter: 'C', text: 'Monitorar o desempenho da rede', isCorrect: false },
            { letter: 'D', text: 'Realizar backup de dados', isCorrect: false },
          ],
        },
        {
          id: 2,
          questionText: 'O que é um ataque de negação de serviço (DoS)?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: true },
            { letter: 'C', text: 'Um ataque que rouba informações pessoais', isCorrect: false },
            { letter: 'D', text: 'Um ataque que corrompe dados', isCorrect: false },
          ],
        },
        {
          id: 3,
          questionText: 'Qual é a importância de atualizar regularmente o sistema operacional?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Melhorar a velocidade do sistema', isCorrect: false },
            { letter: 'B', text: 'Aumentar a capacidade de armazenamento', isCorrect: false },
            { letter: 'C', text: 'Corrigir vulnerabilidades de segurança', isCorrect: true },
            { letter: 'D', text: 'Melhorar a interface do usuário', isCorrect: false },
          ],
        },
        {
          id: 4,
          questionText: 'O que é um vírus de computador?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um programa malicioso que se replica e pode danificar sistemas', isCorrect: true },
            { letter: 'B', text: 'Um software para gerenciamento de projetos', isCorrect: false },
            { letter: 'C', text: 'Um aplicativo para edição de fotos', isCorrect: false },
            { letter: 'D', text: 'Um sistema operacional', isCorrect: false },
          ],
        },
        {
          id: 5,
          questionText: 'Qual é a função de um antivírus?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Gerenciar a rede de computadores', isCorrect: false },
            { letter: 'B', text: 'Detectar e remover vírus de computador', isCorrect: true },
            { letter: 'C', text: 'Criar backups de dados', isCorrect: false },
            { letter: 'D', text: 'Monitorar o desempenho do sistema', isCorrect: false },
          ],
        },
        {
          id: 6,
          questionText: 'O que é criptografia?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um método para gerenciar arquivos', isCorrect: false },
            { letter: 'B', text: 'Um sistema para compartilhar informações', isCorrect: false },
            { letter: 'C', text: 'Um processo para codificar informações para proteção', isCorrect: true },
            { letter: 'D', text: 'Um software para edição de vídeos', isCorrect: false },
          ],
        },
        {
          id: 7,
          questionText: 'Qual é a importância de usar senhas fortes e únicas?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Proteger contra acesso não autorizado', isCorrect: true },
            { letter: 'B', text: 'Aumentar a velocidade do sistema', isCorrect: false },
            { letter: 'C', text: 'Melhorar a interface do usuário', isCorrect: false },
            { letter: 'D', text: 'Gerenciar a rede de computadores', isCorrect: false },
          ],
        },
        {
          id: 8,
          questionText: 'O que é um ataque de engenharia social?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que usa manipulação para obter informações confidenciais', isCorrect: true },
            { letter: 'C', text: 'Um ataque que corrompe dados', isCorrect: false },
            { letter: 'D', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: false },
          ],
        },
        {
          id: 9,
          questionText: 'Qual é a função de um firewall em uma rede?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Controlar o tráfego de entrada e saída da rede', isCorrect: true },
            { letter: 'B', text: 'Gerenciar a alocação de recursos de rede', isCorrect: false },
            { letter: 'C', text: 'Monitorar o desempenho da rede', isCorrect: false },
            { letter: 'D', text: 'Realizar backup de dados', isCorrect: false },
          ],
        },
        {
          id: 10,
          questionText: 'O que é um ataque de negação de serviço (DoS)?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: true },
            { letter: 'C', text: 'Um ataque que rouba informações pessoais', isCorrect: false },
            { letter: 'D', text: 'Um ataque que corrompe dados', isCorrect: false },
          ],
        },
      ],
    },
    '3': {
      pontosTotais: 920,
      maxPontos: 1000,
      porcentagem: 92,
      questoesCorretas: 37,
      questoesTotais: 40,
      tempoGasto: '40 minutos',
      pontoForte: 'Informações e Dados',
      areaParaMelhorar: 'Criação de Conteúdo',
      competencias: [
        { nome: 'Navegação e Pesquisa', categoria: 'Informações e Dados', cor: '#FFB800', pontuacao: 98, maxPontos: 100 },
        { nome: 'Avaliação de Informações', categoria: 'Informações e Dados', cor: '#FFB800', pontuacao: 95, maxPontos: 100 },
        { nome: 'Interação Digital', categoria: 'Comunicação e Colaboração', cor: '#00BCD4', pontuacao: 92, maxPontos: 100 },
        { nome: 'Compartilhamento', categoria: 'Comunicação e Colaboração', cor: '#00BCD4', pontuacao: 90, maxPontos: 100 },
        { nome: 'Desenvolvimento de Conteúdo', categoria: 'Criação de Conteúdo', cor: '#FF6B35', pontuacao: 85, maxPontos: 100 },
        { nome: 'Integração de Conteúdo', categoria: 'Criação de Conteúdo', cor: '#FF6B35', pontuacao: 88, maxPontos: 100 },
        { nome: 'Proteção de Dispositivos', categoria: 'Proteção e Segurança', cor: '#4CAF50', pontuacao: 93, maxPontos: 100 },
        { nome: 'Proteção de Dados Pessoais', categoria: 'Proteção e Segurança', cor: '#4CAF50', pontuacao: 91, maxPontos: 100 },
        { nome: 'Resolução de Problemas Técnicos', categoria: 'Resolução de Problemas', cor: '#E91E63', pontuacao: 94, maxPontos: 100 },
        { nome: 'Identificação de Lacunas', categoria: 'Resolução de Problemas', cor: '#E91E63', pontuacao: 96, maxPontos: 100 },
      ],
      questions: [
        {
          id: 1,
          questionText: 'Qual é a função principal de um firewall em uma rede?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Controlar o tráfego de entrada e saída da rede', isCorrect: true },
            { letter: 'B', text: 'Gerenciar a alocação de recursos de rede', isCorrect: false },
            { letter: 'C', text: 'Monitorar o desempenho da rede', isCorrect: false },
            { letter: 'D', text: 'Realizar backup de dados', isCorrect: false },
          ],
        },
        {
          id: 2,
          questionText: 'O que é um ataque de negação de serviço (DoS)?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: true },
            { letter: 'C', text: 'Um ataque que rouba informações pessoais', isCorrect: false },
            { letter: 'D', text: 'Um ataque que corrompe dados', isCorrect: false },
          ],
        },
        {
          id: 3,
          questionText: 'Qual é a importância de atualizar regularmente o sistema operacional?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Melhorar a velocidade do sistema', isCorrect: false },
            { letter: 'B', text: 'Aumentar a capacidade de armazenamento', isCorrect: false },
            { letter: 'C', text: 'Corrigir vulnerabilidades de segurança', isCorrect: true },
            { letter: 'D', text: 'Melhorar a interface do usuário', isCorrect: false },
          ],
        },
        {
          id: 4,
          questionText: 'O que é um vírus de computador?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um programa malicioso que se replica e pode danificar sistemas', isCorrect: true },
            { letter: 'B', text: 'Um software para gerenciamento de projetos', isCorrect: false },
            { letter: 'C', text: 'Um aplicativo para edição de fotos', isCorrect: false },
            { letter: 'D', text: 'Um sistema operacional', isCorrect: false },
          ],
        },
        {
          id: 5,
          questionText: 'Qual é a função de um antivírus?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Gerenciar a rede de computadores', isCorrect: false },
            { letter: 'B', text: 'Detectar e remover vírus de computador', isCorrect: true },
            { letter: 'C', text: 'Criar backups de dados', isCorrect: false },
            { letter: 'D', text: 'Monitorar o desempenho do sistema', isCorrect: false },
          ],
        },
        {
          id: 6,
          questionText: 'O que é criptografia?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um método para gerenciar arquivos', isCorrect: false },
            { letter: 'B', text: 'Um sistema para compartilhar informações', isCorrect: false },
            { letter: 'C', text: 'Um processo para codificar informações para proteção', isCorrect: true },
            { letter: 'D', text: 'Um software para edição de vídeos', isCorrect: false },
          ],
        },
        {
          id: 7,
          questionText: 'Qual é a importância de usar senhas fortes e únicas?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Proteger contra acesso não autorizado', isCorrect: true },
            { letter: 'B', text: 'Aumentar a velocidade do sistema', isCorrect: false },
            { letter: 'C', text: 'Melhorar a interface do usuário', isCorrect: false },
            { letter: 'D', text: 'Gerenciar a rede de computadores', isCorrect: false },
          ],
        },
        {
          id: 8,
          questionText: 'O que é um ataque de engenharia social?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que usa manipulação para obter informações confidenciais', isCorrect: true },
            { letter: 'C', text: 'Um ataque que corrompe dados', isCorrect: false },
            { letter: 'D', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: false },
          ],
        },
        {
          id: 9,
          questionText: 'Qual é a função de um firewall em uma rede?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Controlar o tráfego de entrada e saída da rede', isCorrect: true },
            { letter: 'B', text: 'Gerenciar a alocação de recursos de rede', isCorrect: false },
            { letter: 'C', text: 'Monitorar o desempenho da rede', isCorrect: false },
            { letter: 'D', text: 'Realizar backup de dados', isCorrect: false },
          ],
        },
        {
          id: 10,
          questionText: 'O que é um ataque de negação de serviço (DoS)?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: true },
            { letter: 'C', text: 'Um ataque que rouba informações pessoais', isCorrect: false },
            { letter: 'D', text: 'Um ataque que corrompe dados', isCorrect: false },
          ],
        },
      ],
    },
    '5': {
      pontosTotais: 780,
      maxPontos: 1000,
      porcentagem: 78,
      questoesCorretas: 31,
      questoesTotais: 40,
      tempoGasto: '44 minutos',
      pontoForte: 'Criação de Conteúdo',
      areaParaMelhorar: 'Informações e Dados',
      competencias: [
        { nome: 'Navegação e Pesquisa', categoria: 'Informações e Dados', cor: '#FFB800', pontuacao: 70, maxPontos: 100 },
        { nome: 'Avaliação de Informações', categoria: 'Informações e Dados', cor: '#FFB800', pontuacao: 68, maxPontos: 100 },
        { nome: 'Interação Digital', categoria: 'Comunicação e Colaboração', cor: '#00BCD4', pontuacao: 80, maxPontos: 100 },
        { nome: 'Compartilhamento', categoria: 'Comunicação e Colaboração', cor: '#00BCD4', pontuacao: 75, maxPontos: 100 },
        { nome: 'Desenvolvimento de Conteúdo', categoria: 'Criação de Conteúdo', cor: '#FF6B35', pontuacao: 90, maxPontos: 100 },
        { nome: 'Integração de Conteúdo', categoria: 'Criação de Conteúdo', cor: '#FF6B35', pontuacao: 88, maxPontos: 100 },
        { nome: 'Proteção de Dispositivos', categoria: 'Proteção e Segurança', cor: '#4CAF50', pontuacao: 78, maxPontos: 100 },
        { nome: 'Proteção de Dados Pessoais', categoria: 'Proteção e Segurança', cor: '#4CAF50', pontuacao: 76, maxPontos: 100 },
        { nome: 'Resolução de Problemas Técnicos', categoria: 'Resolução de Problemas', cor: '#E91E63', pontuacao: 82, maxPontos: 100 },
        { nome: 'Identificação de Lacunas', categoria: 'Resolução de Problemas', cor: '#E91E63', pontuacao: 80, maxPontos: 100 },
      ],
      questions: [
        {
          id: 1,
          questionText: 'Qual é a função principal de um firewall em uma rede?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Controlar o tráfego de entrada e saída da rede', isCorrect: true },
            { letter: 'B', text: 'Gerenciar a alocação de recursos de rede', isCorrect: false },
            { letter: 'C', text: 'Monitorar o desempenho da rede', isCorrect: false },
            { letter: 'D', text: 'Realizar backup de dados', isCorrect: false },
          ],
        },
        {
          id: 2,
          questionText: 'O que é um ataque de negação de serviço (DoS)?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: true },
            { letter: 'C', text: 'Um ataque que rouba informações pessoais', isCorrect: false },
            { letter: 'D', text: 'Um ataque que corrompe dados', isCorrect: false },
          ],
        },
        {
          id: 3,
          questionText: 'Qual é a importância de atualizar regularmente o sistema operacional?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Melhorar a velocidade do sistema', isCorrect: false },
            { letter: 'B', text: 'Aumentar a capacidade de armazenamento', isCorrect: false },
            { letter: 'C', text: 'Corrigir vulnerabilidades de segurança', isCorrect: true },
            { letter: 'D', text: 'Melhorar a interface do usuário', isCorrect: false },
          ],
        },
        {
          id: 4,
          questionText: 'O que é um vírus de computador?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um programa malicioso que se replica e pode danificar sistemas', isCorrect: true },
            { letter: 'B', text: 'Um software para gerenciamento de projetos', isCorrect: false },
            { letter: 'C', text: 'Um aplicativo para edição de fotos', isCorrect: false },
            { letter: 'D', text: 'Um sistema operacional', isCorrect: false },
          ],
        },
        {
          id: 5,
          questionText: 'Qual é a função de um antivírus?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Gerenciar a rede de computadores', isCorrect: false },
            { letter: 'B', text: 'Detectar e remover vírus de computador', isCorrect: true },
            { letter: 'C', text: 'Criar backups de dados', isCorrect: false },
            { letter: 'D', text: 'Monitorar o desempenho do sistema', isCorrect: false },
          ],
        },
        {
          id: 6,
          questionText: 'O que é criptografia?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'C',
          correctAnswer: 'C',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um método para gerenciar arquivos', isCorrect: false },
            { letter: 'B', text: 'Um sistema para compartilhar informações', isCorrect: false },
            { letter: 'C', text: 'Um processo para codificar informações para proteção', isCorrect: true },
            { letter: 'D', text: 'Um software para edição de vídeos', isCorrect: false },
          ],
        },
        {
          id: 7,
          questionText: 'Qual é a importância de usar senhas fortes e únicas?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Proteger contra acesso não autorizado', isCorrect: true },
            { letter: 'B', text: 'Aumentar a velocidade do sistema', isCorrect: false },
            { letter: 'C', text: 'Melhorar a interface do usuário', isCorrect: false },
            { letter: 'D', text: 'Gerenciar a rede de computadores', isCorrect: false },
          ],
        },
        {
          id: 8,
          questionText: 'O que é um ataque de engenharia social?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que usa manipulação para obter informações confidenciais', isCorrect: true },
            { letter: 'C', text: 'Um ataque que corrompe dados', isCorrect: false },
            { letter: 'D', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: false },
          ],
        },
        {
          id: 9,
          questionText: 'Qual é a função de um firewall em uma rede?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'A',
          correctAnswer: 'A',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Controlar o tráfego de entrada e saída da rede', isCorrect: true },
            { letter: 'B', text: 'Gerenciar a alocação de recursos de rede', isCorrect: false },
            { letter: 'C', text: 'Monitorar o desempenho da rede', isCorrect: false },
            { letter: 'D', text: 'Realizar backup de dados', isCorrect: false },
          ],
        },
        {
          id: 10,
          questionText: 'O que é um ataque de negação de serviço (DoS)?',
          category: 'Proteção e Segurança',
          categoryColor: '#4CAF50',
          competency: 'Proteção de Dispositivos',
          userAnswer: 'B',
          correctAnswer: 'B',
          isCorrect: true,
          options: [
            { letter: 'A', text: 'Um ataque que explora vulnerabilidades de software', isCorrect: false },
            { letter: 'B', text: 'Um ataque que sobrecarrega um sistema para torná-lo inacessível', isCorrect: true },
            { letter: 'C', text: 'Um ataque que rouba informações pessoais', isCorrect: false },
            { letter: 'D', text: 'Um ataque que corrompe dados', isCorrect: false },
          ],
        },
      ],
    },
  };

  const filteredExames = exames.filter((exam) => {
    const matchesFilter = filterStatus === 'all' || exam.status === filterStatus;
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30',
          text: 'text-emerald-700 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-600',
          icon: 'text-emerald-500',
          dot: 'bg-emerald-500',
        };
      case 'Reprovado':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-red-200 dark:border-red-600',
          icon: 'text-red-500',
          dot: 'bg-red-500',
        };
      case 'Pendente':
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30',
          text: 'text-amber-700 dark:text-amber-400',
          border: 'border-amber-200 dark:border-amber-600',
          icon: 'text-amber-500',
          dot: 'bg-amber-500',
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-700',
          text: 'text-gray-700 dark:text-gray-300',
          border: 'border-gray-200 dark:border-gray-600',
          icon: 'text-gray-500',
          dot: 'bg-gray-500',
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'Reprovado':
        return <XCircle className="w-5 h-5" />;
      case 'Pendente':
        return <Clock className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const stats = {
    total: exames.length,
    aprovados: exames.filter(e => e.status === 'Aprovado').length,
    reprovados: exames.filter(e => e.status === 'Reprovado').length,
    pendentes: exames.filter(e => e.status === 'Pendente').length,
  };

  const selectedExam = selectedExamId ? exames.find(e => e.id === selectedExamId) : null;
  const selectedDetails = selectedExamId ? examDetails[selectedExamId] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)}
        userName="André"
        navigateTo={navigateTo}
        onLogout={() => navigateTo('login')}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="exames"
        onNavigate={(page) => {
          setIsSidebarOpen(false);
          navigateTo(page);
        }}
        isAdmin={userRole === 'admin'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* CTA Buttons - Destaque Principal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="group relative overflow-hidden bg-gradient-to-br from-[#8B27FF] via-[#9D3FFF] to-[#A855F7] text-white rounded-3xl shadow-2xl hover:shadow-purple-500/60 transition-all p-6 cursor-pointer active:shadow-lg"
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                {/* Left: INICIAR > */}
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black tracking-tight">INICIAR</h1>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>

                {/* Center: Title */}
                <h2 className="flex-1 text-lg font-black tracking-tight uppercase text-center">
                  Exame de Certificação
                </h2>

                {/* Right: Icon */}
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform flex-shrink-0">
                  <Award className="w-5 h-5" strokeWidth={2.5} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="group relative overflow-hidden bg-gradient-to-br from-[#00BCD4] via-[#00ACC1] to-[#0097A7] text-white rounded-3xl shadow-2xl hover:shadow-cyan-500/60 transition-all p-6 cursor-pointer active:shadow-lg"
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                {/* Left: INICIAR > */}
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black tracking-tight">INICIAR</h1>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>

                {/* Center: Title */}
                <h2 className="flex-1 text-lg font-black tracking-tight uppercase text-center">
                  Exame de Nível
                </h2>

                {/* Right: Icon */}
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform flex-shrink-0">
                  <BarChart3 className="w-5 h-5" strokeWidth={2.5} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Meus Exames
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Acompanhe seu histórico de certificações e testes
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'TOTAL DE EXAMES', value: stats.total, icon: FileCheck, color: '#8B27FF', bgColor: 'bg-purple-50 dark:bg-purple-900/30', borderColor: 'border-purple-400 dark:border-purple-600' },
              { label: 'APROVADOS', value: stats.aprovados, icon: CheckCircle2, color: '#4CAF50', bgColor: 'bg-green-50 dark:bg-green-900/30', borderColor: 'border-green-400 dark:border-green-600' },
              { label: 'REPROVADOS', value: stats.reprovados, icon: XCircle, color: '#E91E63', bgColor: 'bg-pink-50 dark:bg-pink-900/30', borderColor: 'border-pink-400 dark:border-pink-600' },
              { label: 'PENDENTES', value: stats.pendentes, icon: Clock, color: '#FF9800', bgColor: 'bg-amber-50 dark:bg-amber-900/30', borderColor: 'border-amber-400 dark:border-amber-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center`}
              >
                <stat.icon 
                  className="w-8 h-8 mb-2" 
                  style={{ color: stat.color }} 
                  strokeWidth={2}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  className="text-3xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs font-bold tracking-wide" style={{ color: stat.color }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por nome ou tipo de exame..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-xl focus:border-[#8B27FF] dark:focus:border-[#A855F7] focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="w-full sm:w-auto px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-[#8B27FF] dark:hover:border-[#A855F7] transition-colors flex items-center gap-2 bg-white dark:bg-gray-700 font-semibold text-gray-700 dark:text-gray-200"
              >
                <Filter className="w-5 h-5" />
                {filterStatus === 'all' ? 'Todos os Status' : filterStatus}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-10"
                >
                  {['all', 'Aprovado', 'Reprovado', 'Pendente'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status as any);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors ${
                        filterStatus === status ? 'bg-purple-50 dark:bg-purple-900/30 text-[#8B27FF] dark:text-[#A855F7] font-semibold' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {status === 'all' ? 'Todos os Status' : status}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Exams List */}
        <div className="space-y-4">
          {filteredExames.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
            >
              <FileCheck className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum exame encontrado</p>
            </motion.div>
          ) : (
            filteredExames.map((exam, index) => {
              const statusColors = getStatusColor(exam.status);
              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Date & Time */}
                      <div className="flex items-center gap-3 lg:w-48">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl flex items-center justify-center flex-shrink-0"
                        >
                          <Calendar className="w-6 h-6 text-[#8B27FF] dark:text-[#A855F7]" />
                        </motion.div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{exam.date}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{exam.time}</p>
                        </div>
                      </div>

                      {/* Exam Info */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-[#8B27FF] dark:group-hover:text-[#A855F7] transition-colors">
                          {exam.type}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{exam.name}</span>
                          <span className="text-gray-400 dark:text-gray-600">•</span>
                          <span>{exam.cpf}</span>
                        </div>
                      </div>

                      {/* Mobile: Status + Actions em linha | Desktop: Separados */}
                      <div className="flex items-center gap-4 lg:contents">
                        {/* Status Badge */}
                        <div className="flex-1 lg:w-44 flex flex-col items-start">
                          <div className="flex items-center gap-2 justify-start w-full">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${statusColors.border} ${statusColors.bg}`}>
                              <div className={`w-2 h-2 rounded-full ${statusColors.dot} animate-pulse`} />
                              <span className={`font-bold text-sm ${statusColors.text}`}>
                                {exam.status}
                              </span>
                            </div>
                            {exam.status === 'Pendente' && exam.pendingReason && (
                              <div 
                                className="relative"
                                onMouseEnter={() => setHoveredPendingId(exam.id)}
                                onMouseLeave={() => setHoveredPendingId(null)}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="w-6 h-6 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center cursor-help"
                                >
                                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </motion.div>
                                {hoveredPendingId === exam.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute left-0 top-8 z-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
                                  >
                                    {exam.pendingReason}
                                    <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45" />
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </div>
                          {exam.score !== undefined && (
                            <div className="flex items-center gap-2 mt-2">
                              <TrendingUp className="w-5 h-5 text-[#8B27FF]" />
                              <span className="text-2xl font-bold text-[#8B27FF]">{exam.score}%</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 lg:w-auto flex-shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedExamId(exam.id)}
                            disabled={exam.status === 'Pendente'}
                            className={`p-3 rounded-xl transition-all group/btn ${
                              exam.status === 'Pendente'
                                ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/60 dark:hover:to-pink-900/60'
                            }`}
                          >
                            <Eye className={`w-5 h-5 transition-transform ${
                              exam.status === 'Pendente'
                                ? 'text-gray-400 dark:text-gray-600'
                                : 'text-[#8B27FF] dark:text-[#A855F7] group-hover/btn:scale-110'
                            }`} />
                          </motion.button>
                          <div className="relative">
                            <motion.button
                              whileHover={exam.status !== 'Pendente' ? { scale: 1.1 } : {}}
                              whileTap={exam.status !== 'Pendente' ? { scale: 0.9 } : {}}
                              className={`p-3 rounded-xl transition-all group/btn ${
                                exam.status === 'Pendente'
                                  ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-50'
                                  : 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/40 dark:to-green-900/40 hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/60 dark:hover:to-green-900/60'
                              }`}
                              onMouseEnter={() => setHoveredDownloadId(exam.id)}
                              onMouseLeave={() => setHoveredDownloadId(null)}
                              disabled={exam.status === 'Pendente'}
                            >
                              <Download
                                className={`w-5 h-5 transition-transform ${
                                  exam.status === 'Pendente'
                                    ? 'text-gray-400 dark:text-gray-600'
                                    : 'text-emerald-600 dark:text-emerald-400 group-hover/btn:scale-110'
                                }`}
                              />
                            </motion.button>
                            {exam.status === 'Pendente' && hoveredDownloadId === exam.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute right-0 top-14 z-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
                              >
                                Não é possível baixar exame pendente
                                <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-1 bg-gradient-to-r from-[#8B27FF] via-[#9D3FFF] to-[#C084FC] origin-left"
                  />
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal de Resultados */}
      <AnimatePresence>
        {selectedExam && selectedDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExamId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Fechar - Canto Superior Direito */}
              <button
                onClick={() => setSelectedExamId(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600 rounded-xl transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-700 dark:text-white" />
              </button>

              <div className="p-6 sm:p-8 md:p-12">
                {/* Seção de Parabéns */}
                <div className="text-center mb-8">
                  {/* Ícone */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${
                      selectedExam.status === 'Aprovado'
                        ? 'bg-gradient-to-br from-emerald-500 to-green-500 animate-bounce'
                        : 'bg-gradient-to-br from-red-500 to-pink-500'
                    }`}>
                      {selectedExam.status === 'Aprovado' ? (
                        <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2} />
                      ) : (
                        <XCircle className="w-12 h-12 text-white" strokeWidth={2} />
                      )}
                    </div>
                  </div>

                  {/* Título */}
                  <h1 className={`text-4xl mb-4 ${
                    selectedExam.status === 'Aprovado'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {selectedExam.status === 'Aprovado' ? 'Parabéns!' : 'Resultado do Exame'}
                  </h1>

                  {/* Mensagem */}
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                    {selectedExam.type}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedExam.date} às {selectedExam.time}
                  </p>
                </div>

                {/* Card de Resumo */}
                <div className="bg-[#F9F7FF] dark:bg-purple-950 border-2 border-[#E8E0FF] dark:border-purple-800 rounded-2xl p-8 mb-10">
                  {/* Grid de Estatísticas */}
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Total de Questões */}
                    <div className="text-center">
                      <FileCheck className="w-8 h-8 text-[#8B27FF] dark:text-[#A855F7] mx-auto mb-2" />
                      <div className="text-4xl text-[#8B27FF] dark:text-[#A855F7] mb-1">{selectedDetails.questoesTotais}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Questões</div>
                    </div>

                    {/* Acertos */}
                    <div className="text-center">
                      <CheckCircle2 className="w-8 h-8 text-[#4CAF50] dark:text-green-400 mx-auto mb-2" />
                      <div className="text-4xl text-[#4CAF50] dark:text-green-400 mb-1">{selectedDetails.questoesCorretas}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Acertos</div>
                    </div>

                    {/* Erros */}
                    <div className="text-center">
                      <XCircle className="w-8 h-8 text-[#EF5350] dark:text-red-400 mx-auto mb-2" />
                      <div className="text-4xl text-[#EF5350] dark:text-red-400 mb-1">{selectedDetails.questoesTotais - selectedDetails.questoesCorretas}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Erros</div>
                    </div>
                  </div>

                  {/* Porcentagem */}
                  <div className="text-center pt-6 border-t border-[#E8E0FF] dark:border-purple-800">
                    <div className="text-5xl text-[#8B27FF] dark:text-[#A855F7] mb-2">{selectedDetails.porcentagem}%</div>
                    <div className="text-gray-600 dark:text-gray-400">Taxa de acerto</div>
                  </div>

                  {/* Tempo Gasto */}
                  <div className="text-center pt-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-5 h-5" />
                      <span>Tempo gasto: {selectedDetails.tempoGasto}</span>
                    </div>
                  </div>
                </div>

                {/* Pontos Fortes e Áreas para Melhorar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-2xl border-2 border-emerald-200 dark:border-emerald-600"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-emerald-500 rounded-xl">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">Ponto Forte</h3>
                    </div>
                    <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      {selectedDetails.pontoForte}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-600"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-amber-500 rounded-xl">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">Área para Melhorar</h3>
                    </div>
                    <p className="text-amber-700 dark:text-amber-400 font-semibold">
                      {selectedDetails.areaParaMelhorar}
                    </p>
                  </motion.div>
                </div>

                {/* Lista de Questões - Revisão das suas respostas */}
                <div className="mb-10">
                  <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-6">
                    Revisão das suas respostas
                  </h2>

                  <div className="space-y-4">
                    {selectedDetails.questions.map((question, index) => {
                      const userAnswerText = question.options.find(
                        (opt) => opt.letter === question.userAnswer
                      )?.text || 'Não respondida';
                      
                      const correctAnswerText = question.options.find(
                        (opt) => opt.letter === question.correctAnswer
                      )?.text || '';

                      return (
                        <div
                          key={question.id}
                          className={`rounded-xl p-6 border-l-4 transition-all hover:shadow-md ${
                            question.isCorrect
                              ? 'bg-[#E8F5E9] dark:bg-green-950 border-[#4CAF50] dark:border-green-600'
                              : question.userAnswer
                              ? 'bg-[#FFEBEE] dark:bg-red-950 border-[#EF5350] dark:border-red-600'
                              : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {/* Header do Card */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              {/* Cards informativos */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {/* Card Área */}
                                <div 
                                  className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                                  style={{
                                    backgroundColor: question.categoryColor,
                                  }}
                                >
                                  <div 
                                    className="w-5 h-5 rounded flex items-center justify-center bg-white/20"
                                  >
                                    <span className="text-white text-[10px] font-bold">A</span>
                                  </div>
                                  <div>
                                    <p className="text-[9px] uppercase font-semibold leading-none mb-0.5 text-white/80">Área</p>
                                    <p className="text-[11px] text-white font-medium leading-tight">
                                      {question.category}
                                    </p>
                                  </div>
                                </div>

                                {/* Card Competência */}
                                <div 
                                  className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                                  style={{
                                    backgroundColor: question.categoryColor,
                                  }}
                                >
                                  <div 
                                    className="w-5 h-5 rounded flex items-center justify-center bg-white/20"
                                  >
                                    <span className="text-white text-[10px] font-bold">C</span>
                                  </div>
                                  <div>
                                    <p className="text-[9px] uppercase font-semibold leading-none mb-0.5 text-white/80">Competência</p>
                                    <p className="text-[11px] text-white font-medium leading-tight">
                                      {question.competency}
                                    </p>
                                  </div>
                                </div>

                                {/* Card BNCC */}
                                <div className="bg-purple-500 dark:bg-purple-600 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                                  <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                                    <BookOpen className="w-3.5 h-3.5 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-[9px] text-white/80 uppercase font-semibold leading-none mb-0.5">BNCC</p>
                                    <p className="text-[11px] text-white font-medium leading-tight">
                                      Competência 5 - Cultura Digital (BNCC)
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <h3 className="text-gray-800 dark:text-gray-200 text-sm">
                                Questão {index + 1}
                              </h3>
                            </div>
                            <div className="flex-shrink-0">
                              {question.isCorrect ? (
                                <div className="w-10 h-10 rounded-full bg-[#4CAF50] dark:bg-green-600 flex items-center justify-center">
                                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                                </div>
                              ) : question.userAnswer ? (
                                <div className="w-10 h-10 rounded-full bg-[#EF5350] dark:bg-red-600 flex items-center justify-center">
                                  <X className="w-6 h-6 text-white" strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                  <span className="text-white text-xs">?</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Enunciado */}
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                            {question.questionText}
                          </p>

                          {/* Resposta do Usuário */}
                          <div className="mb-2">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Sua resposta: </span>
                            <span
                              className={`text-sm ${
                                question.isCorrect
                                  ? 'text-[#4CAF50] dark:text-green-400'
                                  : question.userAnswer
                                  ? 'text-[#EF5350] dark:text-red-400'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              {question.userAnswer ? (
                                <>
                                  ({question.userAnswer}) {userAnswerText}
                                  {question.isCorrect ? (
                                    <Check className="inline w-4 h-4 ml-1" />
                                  ) : (
                                    <X className="inline w-4 h-4 ml-1" />
                                  )}
                                </>
                              ) : (
                                'Não respondida'
                              )}
                            </span>
                          </div>

                          {/* Resposta Correta (se errou ou não respondeu) */}
                          {!question.isCorrect && (
                            <div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Resposta correta: </span>
                              <span className="text-sm text-[#4CAF50] dark:text-green-400">
                                ({question.correctAnswer}) {correctAnswerText}
                                <Check className="inline w-4 h-4 ml-1" />
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {selectedExam.status === 'Aprovado' && (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Baixar Certificado
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Refazer Exame
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
