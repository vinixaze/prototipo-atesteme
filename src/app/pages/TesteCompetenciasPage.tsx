import { useState, useEffect } from 'react';
import TestHeader from '../components/TestHeader';
import ProgressStepper from '../components/ProgressStepper';
import AnswerOption from '../components/AnswerOption';
import { MessageSquare, Wand2, RotateCcw, Shield, BookOpen, X, Coins, CircleAlert } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { motion } from 'motion/react';
import { getUserInventory, usePowerUp, getPowerUpQuantity } from '../utils/powerupsStorage';

interface TesteCompetenciasPageProps {
  navigateTo: (page: string, data?: any) => void;
}

interface Question {
  id: number;
  category: string;
  categoryColor: string;
  competency: string;
  text: string;
  image?: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
}

const categoryColors: Record<string, string> = {
  'INFORMAÇÕES E DADOS': '#FFD700',
  'COMUNICAÇÃO E COLABORAÇÃO': '#00BCD4',
  'CRIAÇÃO DE CONTEÚDO': '#FF9800',
  'PROTEÇÃO E SEGURANÇA': '#4CAF50',
  'RESOLUÇÃO DE PROBLEMAS': '#E91E63',
};

export const questions: Question[] = [
  {
    id: 1,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    competency: '1.1 Navegar, pesquisar e filtrar dados',
    text: 'Qual é a melhor prática ao buscar informações na internet?',
    options: [
      { letter: 'a', text: 'Usar apenas o primeiro resultado da pesquisa', isCorrect: false },
      { letter: 'b', text: 'Verificar múltiplas fontes confiáveis', isCorrect: true },
      { letter: 'c', text: 'Confiar apenas em redes sociais', isCorrect: false },
      { letter: 'd', text: 'Copiar o primeiro resultado encontrado', isCorrect: false },
      { letter: 'e', text: 'Aceitar qualquer informação sem verificar', isCorrect: false },
    ],
  },
  {
    id: 2,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    competency: '1.2 Avaliar dados e informações',
    text: 'Como você pode identificar uma notícia falsa (fake news)?',
    options: [
      { letter: 'a', text: 'Pelo número de compartilhamentos', isCorrect: false },
      { letter: 'b', text: 'Verificando a fonte, data e checando fatos', isCorrect: true },
      { letter: 'c', text: 'Pelo título sensacionalista', isCorrect: false },
      { letter: 'd', text: 'Pelos comentários das pessoas', isCorrect: false },
      { letter: 'e', text: 'Pela quantidade de curtidas', isCorrect: false },
    ],
  },
  {
    id: 3,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    competency: '1.3 Gerenciar dados e informações',
    text: 'Qual é a melhor forma de organizar seus arquivos digitais?',
    options: [
      { letter: 'a', text: 'Salvar tudo na área de trabalho', isCorrect: false },
      { letter: 'b', text: 'Criar pastas com nomes claros e categorias', isCorrect: true },
      { letter: 'c', text: 'Deixar tudo em Downloads', isCorrect: false },
      { letter: 'd', text: 'Não organizar, usar a busca quando precisar', isCorrect: false },
      { letter: 'e', text: 'Manter todos os arquivos em uma única pasta', isCorrect: false },
    ],
  },
  {
    id: 4,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    competency: '2.1 Interagir através de tecnologias',
    text: 'Qual ferramenta é mais apropriada para videoconferências profissionais?',
    options: [
      { letter: 'a', text: 'Instagram Stories', isCorrect: false },
      { letter: 'b', text: 'Google Meet ou Zoom', isCorrect: true },
      { letter: 'c', text: 'WhatsApp Status', isCorrect: false },
      { letter: 'd', text: 'TikTok', isCorrect: false },
      { letter: 'e', text: 'Facebook Reels', isCorrect: false },
    ],
  },
  {
    id: 5,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    competency: '2.2 Compartilhar através de tecnologias',
    text: 'Ao compartilhar um documento para trabalho colaborativo, você deve:',
    options: [
      { letter: 'a', text: 'Enviar por e-mail para cada pessoa', isCorrect: false },
      { letter: 'b', text: 'Usar Google Docs ou OneDrive compartilhado', isCorrect: true },
      { letter: 'c', text: 'Imprimir e distribuir cópias', isCorrect: false },
      { letter: 'd', text: 'Postar em redes sociais públicas', isCorrect: false },
      { letter: 'e', text: 'Enviar por mensagem de texto', isCorrect: false },
    ],
  },
  {
    id: 6,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    competency: '2.3 Participar da cidadania através de tecnologias',
    text: 'Como a tecnologia pode promover a cidadania digital?',
    options: [
      { letter: 'a', text: 'Permitindo participação em consultas públicas online', isCorrect: true },
      { letter: 'b', text: 'Restringindo acesso à informação', isCorrect: false },
      { letter: 'c', text: 'Isolando comunidades', isCorrect: false },
      { letter: 'd', text: 'Dificultando o diálogo', isCorrect: false },
      { letter: 'e', text: 'Limitando a comunicação entre cidadãos', isCorrect: false },
    ],
  },
  {
    id: 7,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    competency: '2.4 Colaborar através de tecnologias',
    text: 'Qual é uma boa prática em trabalho colaborativo online?',
    options: [
      { letter: 'a', text: 'Trabalhar isoladamente e juntar no final', isCorrect: false },
      { letter: 'b', text: 'Comunicar-se regularmente e compartilhar progresso', isCorrect: true },
      { letter: 'c', text: 'Não compartilhar ideias até a conclusão', isCorrect: false },
      { letter: 'd', text: 'Ignorar as contribuições dos outros', isCorrect: false },
      { letter: 'e', text: 'Evitar feedback da equipe', isCorrect: false },
    ],
  },
  {
    id: 8,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    competency: '3.1 Desenvolver conteúdo digital',
    text: 'Qual ferramenta é adequada para criar uma apresentação digital?',
    options: [
      { letter: 'a', text: 'Microsoft PowerPoint ou Google Slides', isCorrect: true },
      { letter: 'b', text: 'Bloco de notas', isCorrect: false },
      { letter: 'c', text: 'Calculadora', isCorrect: false },
      { letter: 'd', text: 'Paint', isCorrect: false },
      { letter: 'e', text: 'Windows Explorer', isCorrect: false },
    ],
  },
  {
    id: 9,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    competency: '3.2 Integrar e reelaborar conteúdo digital',
    text: 'Ao usar conteúdo de terceiros, você deve:',
    options: [
      { letter: 'a', text: 'Copiar sem citar a fonte', isCorrect: false },
      { letter: 'b', text: 'Dar créditos e citar a fonte original', isCorrect: true },
      { letter: 'c', text: 'Modificar levemente e usar como próprio', isCorrect: false },
      { letter: 'd', text: 'Usar apenas se for popular', isCorrect: false },
      { letter: 'e', text: 'Remover marcas d\'água e usar livremente', isCorrect: false },
    ],
  },
  {
    id: 10,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    competency: '3.3 Direitos autorais e licenças',
    text: 'O que significa uma licença Creative Commons?',
    options: [
      { letter: 'a', text: 'Conteúdo totalmente restrito', isCorrect: false },
      { letter: 'b', text: 'Permissões específicas para uso de conteúdo', isCorrect: true },
      { letter: 'c', text: 'Conteúdo gratuito sem regras', isCorrect: false },
      { letter: 'd', text: 'Apenas para uso comercial', isCorrect: false },
      { letter: 'e', text: 'Conteúdo de domínio público sem restrições', isCorrect: false },
    ],
  },
  {
    id: 11,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    competency: '3.4 Programação',
    text: 'Qual linguagem de programação é comumente usada para web?',
    options: [
      { letter: 'a', text: 'JavaScript', isCorrect: true },
      { letter: 'b', text: 'Excel', isCorrect: false },
      { letter: 'c', text: 'Windows', isCorrect: false },
      { letter: 'd', text: 'Chrome', isCorrect: false },
      { letter: 'e', text: 'Photoshop', isCorrect: false },
    ],
  },
  {
    id: 12,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    competency: '4.1 Proteger dispositivos',
    text: 'Qual é uma boa prática para proteger seus dispositivos?',
    options: [
      { letter: 'a', text: 'Desativar antivírus para melhor performance', isCorrect: false },
      { letter: 'b', text: 'Manter sistema e aplicativos atualizados', isCorrect: true },
      { letter: 'c', text: 'Compartilhar senhas livremente', isCorrect: false },
      { letter: 'd', text: 'Clicar em todos os links recebidos', isCorrect: false },
      { letter: 'e', text: 'Desabilitar atualizações automáticas', isCorrect: false },
    ],
  },
  {
    id: 13,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    competency: '4.2 Proteger dados pessoais',
    text: 'Como criar uma senha segura?',
    options: [
      { letter: 'a', text: 'Usar "123456"', isCorrect: false },
      { letter: 'b', text: 'Combinar letras, números e símbolos', isCorrect: true },
      { letter: 'c', text: 'Usar apenas seu nome', isCorrect: false },
      { letter: 'd', text: 'Usar a mesma senha em todos os lugares', isCorrect: false },
      { letter: 'e', text: 'Usar sequências do teclado como "qwerty"', isCorrect: false },
    ],
  },
  {
    id: 14,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    competency: '4.3 Proteger saúde e bem-estar',
    text: 'Para evitar problemas de saúde no uso de tecnologia:',
    options: [
      { letter: 'a', text: 'Fazer pausas regulares e postura adequada', isCorrect: true },
      { letter: 'b', text: 'Usar dispositivos 24 horas por dia', isCorrect: false },
      { letter: 'c', text: 'Não fazer exercícios', isCorrect: false },
      { letter: 'd', text: 'Ignorar desconfortos', isCorrect: false },
      { letter: 'e', text: 'Manter a mesma posição o dia todo', isCorrect: false },
    ],
  },
  {
    id: 15,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    competency: '4.4 Proteger o ambiente',
    text: 'Como a tecnologia pode ser ambientalmente responsável?',
    options: [
      { letter: 'a', text: 'Descartando eletrônicos no lixo comum', isCorrect: false },
      { letter: 'b', text: 'Reciclando equipamentos e economizando energia', isCorrect: true },
      { letter: 'c', text: 'Comprando novos dispositivos todo ano', isCorrect: false },
      { letter: 'd', text: 'Deixando tudo ligado sempre', isCorrect: false },
      { letter: 'e', text: 'Trocando dispositivos funcionais por novos modelos', isCorrect: false },
    ],
  },
  {
    id: 16,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    competency: '5.1 Resolver problemas técnicos',
    text: 'Quando um programa não responde, você deve:',
    options: [
      { letter: 'a', text: 'Desligar o computador sem salvar', isCorrect: false },
      { letter: 'b', text: 'Usar o Gerenciador de Tarefas para fechar', isCorrect: true },
      { letter: 'c', text: 'Esperar indefinidamente', isCorrect: false },
      { letter: 'd', text: 'Jogar o computador fora', isCorrect: false },
      { letter: 'e', text: 'Reiniciar sem tentar solucionar', isCorrect: false },
    ],
  },
];

export default function TesteCompetenciasPage({
  navigateTo,
}: TesteCompetenciasPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFillingSkipped, setIsFillingSkipped] = useState(false); // Novo estado para controlar modo de completar puladas
  
  // Power-ups states
  const [showPowerUpsMenu, setShowPowerUpsMenu] = useState(false);
  const [userPowerUps, setUserPowerUps] = useState<any[]>([]);
  const [usedShield, setUsedShield] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);

  // Initialize all steps as future, except the first one as current
  const [stepStatuses, setStepStatuses] = useState<{ status: 'future' | 'current' | 'correct' | 'incorrect' | 'answered' | 'skipped' }[]>(
    Array.from({ length: 16 }, (_, i) => ({
      status: i === 0 ? 'current' : 'future'
    }))
  );

  // Definição dos power-ups disponíveis
  const AVAILABLE_POWERUPS = [
    {
      id: 1,
      name: 'Segunda Chance',
      icon: RotateCcw,
      description: 'Repetir teste completo',
      color: '#8B27FF',
      usableInQuiz: true
    },
    {
      id: 3,
      name: 'Escudo 50/50',
      icon: Shield,
      description: 'Elimina opção incorreta',
      color: '#8B27FF',
      usableInQuiz: true
    },
    {
      id: 4,
      name: 'Desbloqueio Teoria',
      icon: BookOpen,
      description: 'Link de conteúdo',
      color: '#00BCD4',
      usableInQuiz: true
    },
    {
      id: 8,
      name: 'Conferir Resposta',
      icon: CircleAlert,
      description: 'Verifica se está certo',
      color: '#10B981',
      usableInQuiz: true
    }
  ];

  // Carregar power-ups do usuário
  useEffect(() => {
    loadUserPowerUps();
  }, []);

  const loadUserPowerUps = () => {
    const inventory = getUserInventory();
    const availablePowerUps = AVAILABLE_POWERUPS.filter(powerup => {
      const quantity = inventory.powerups.find(p => p.id === powerup.id)?.quantity || 0;
      return quantity > 0 && powerup.usableInQuiz;
    }).map(powerup => {
      const inventoryItem = inventory.powerups.find(p => p.id === powerup.id);
      return {
        ...powerup,
        quantity: inventoryItem?.quantity || 0
      };
    });
    setUserPowerUps(availablePowerUps);
  };

  // Funções para usar power-ups
  const useShield = () => {
    if (getPowerUpQuantity(3) > 0) {
      usePowerUp(3);
      setUsedShield(true);
      // Eliminar uma opção incorreta aleatória
      const incorrectOptions = currentQuestionData?.options.filter(opt => !opt.isCorrect) || [];
      if (incorrectOptions.length > 0) {
        const randomIncorrect = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        setEliminatedOptions([...eliminatedOptions, randomIncorrect.letter]);
        setShowPowerUpsMenu(false);
        toast.success('Escudo (50/50) ativado! Uma opção incorreta foi eliminada.');
      }
    } else {
      toast.error('Você não tem Escudos disponíveis.');
    }
  };

  const useRetry = () => {
    if (getPowerUpQuantity(1) > 0) {
      usePowerUp(1);
      // Reiniciar teste completo
      setSelectedAnswers({});
      setCurrentQuestion(1);
      setStepStatuses(
        Array.from({ length: 16 }, (_, i) => ({
          status: i === 0 ? 'current' : 'future',
        }))
      );
      setUsedShield(false);
      setEliminatedOptions([]);
      setShowPowerUpsMenu(false);
      toast.success('Segunda Chance ativada! O teste foi reiniciado.');
    } else {
      toast.error('Você não tem Segunda Chances disponíveis.');
    }
  };

  const useTheoryLink = () => {
    toast.info('Recurso em desenvolvimento!');
    setShowPowerUpsMenu(false);
  };

  const useCheckAnswer = () => {
    if (!selectedAnswer) {
      toast.error('Selecione uma resposta primeiro!');
      return;
    }
    
    if (getPowerUpQuantity(8) > 0) {
      usePowerUp(8);
      // Verificar se a resposta está correta
      const isCorrect = currentQuestionData?.options.find(opt => opt.letter === selectedAnswer)?.isCorrect;
      
      if (isCorrect) {
        toast.success('✓ Sua resposta está CORRETA!', { duration: 3000 });
      } else {
        toast.error('✗ Sua resposta está INCORRETA. Escolha outra opção.', { duration: 3000 });
      }
      
      setShowPowerUpsMenu(false);
      loadUserPowerUps(); // Recarregar para atualizar quantidade
    } else {
      toast.error('Você não tem Conferir Resposta disponível.');
    }
  };

  const currentQuestionData = questions[currentQuestion - 1];
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectAnswer = (letter: string) => {
    setSelectedAnswer(letter);
  };

  const handleSaveAnswer = () => {
    if (!selectedAnswer) return;

    // Salvar a resposta
    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion]: selectedAnswer,
    };
    setSelectedAnswers(updatedAnswers);

    // Marcar como respondida (sem feedback de correto/incorreto)
    const newStatuses = [...stepStatuses];
    newStatuses[currentQuestion - 1] = { status: 'answered' };
    setStepStatuses(newStatuses);

    // Limpar seleção atual
    setSelectedAnswer('');

    // Se estiver no modo de completar questões puladas, ir para a próxima questão pulada
    if (isFillingSkipped) {
      const unansweredQuestions = questions.filter((q) => q.id !== currentQuestion && !updatedAnswers[q.id]);
      
      if (unansweredQuestions.length > 0) {
        // Ainda há questões não respondidas, navegar para a próxima
        const nextUnanswered = unansweredQuestions[0];
        setTimeout(() => {
          newStatuses[nextUnanswered.id - 1] = { status: 'current' };
          setStepStatuses(newStatuses);
          setCurrentQuestion(nextUnanswered.id);
        }, 300);
      } else {
        // Todas respondidas agora, finalizar com as respostas atualizadas
        setTimeout(() => {
          setIsFillingSkipped(false);
          finalizarTeste(updatedAnswers);
        }, 300);
      }
    } else {
      // Navegação normal: avançar para a próxima questão
      if (currentQuestion < 16) {
        setTimeout(() => {
          newStatuses[currentQuestion] = { status: 'current' };
          setStepStatuses(newStatuses);
          setCurrentQuestion(currentQuestion + 1);
        }, 300);
      }
    }
  };

  const handleSkip = () => {
    if (currentQuestion < 16) {
      const newStatuses = [...stepStatuses];
      // Marcar questão atual como pulada se ainda não foi respondida
      if (!selectedAnswers[currentQuestion]) {
        newStatuses[currentQuestion - 1] = { status: 'skipped' };
      }
      // Marcar próxima questão como atual
      newStatuses[currentQuestion] = { status: 'current' };
      setStepStatuses(newStatuses);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinish = () => {
    // Se há uma resposta selecionada na questão atual, salvar automaticamente antes de finalizar
    let updatedAnswers = { ...selectedAnswers };
    
    if (selectedAnswer && currentQuestion === 16) {
      updatedAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(updatedAnswers);
      
      // Marcar como respondida
      const newStatuses = [...stepStatuses];
      newStatuses[currentQuestion - 1] = { status: 'answered' };
      setStepStatuses(newStatuses);
    }
    
    // Verificar se há questões não respondidas (excluindo a atual se tiver resposta selecionada)
    const unansweredQuestions = questions.filter((q) => !updatedAnswers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      // Ativar modo de completar questões puladas
      setIsFillingSkipped(true);
      
      // Mostrar toast informativo
      toast.warning('Você tem questões sem resposta!', {
        description: `Complete as ${unansweredQuestions.length} questão${unansweredQuestions.length > 1 ? 'ões' : ''} restante${unansweredQuestions.length > 1 ? 's' : ''} para finalizar.`,
        duration: 5000,
      });
      
      // Navegar para a primeira questão não respondida
      const firstUnanswered = unansweredQuestions[0];
      setTimeout(() => {
        const newStatuses = [...stepStatuses];
        // Resetar a questão atual
        if (stepStatuses[currentQuestion - 1].status === 'current') {
          newStatuses[currentQuestion - 1] = { status: 'future' };
        }
        // Marcar primeira não respondida como atual
        newStatuses[firstUnanswered.id - 1] = { status: 'current' };
        setStepStatuses(newStatuses);
        setCurrentQuestion(firstUnanswered.id);
        setSelectedAnswer(''); // Limpar resposta selecionada
      }, 500);
      
      return;
    }

    // Se todas respondidas, finalizar direto sem modal
    setTimeout(() => {
      finalizarTeste(updatedAnswers);
    }, 300);
  };

  const finalizarTeste = (answers = selectedAnswers) => {
    // Calcular resultados usando as respostas passadas (para garantir que está atualizado)
    const correctAnswers = questions.filter((q) => {
      const answer = answers[q.id];
      return q.options.find((opt) => opt.letter === answer)?.isCorrect;
    }).length;

    // Navegar para tela de parabéns intermediária
    navigateTo('teste-competencias-congrats', {
      answered: Object.keys(answers).length,
      correct: correctAnswers,
      total: 16,
      selectedAnswers: answers,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <TestHeader
        categoryBadge={currentQuestionData.category}
        categoryColor={currentQuestionData.categoryColor}
        title={currentQuestionData.competency}
        onBackClick={() => navigateTo('dashboard')}
        hideBackButton={true}
        area={currentQuestionData.category}
        competency={currentQuestionData.competency}
        bncc="Competência 5 - Cultura Digital (BNCC)"
      />

      {/* Progress Stepper */}
      <ProgressStepper
        totalSteps={16}
        currentStep={currentQuestion}
        stepStatuses={stepStatuses}
        showNavigation={true}
      />

      {/* Question Card */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8 md:p-12 transition-all duration-300 relative"
          key={currentQuestion}
        >
          {/* Botão Varinha Mágica - Ferramentas Educativas */}
          <button
            onClick={() => setShowPowerUpsMenu(!showPowerUpsMenu)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center z-50"
            title="Ferramentas Educativas"
          >
            <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
            {userPowerUps.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {userPowerUps.reduce((acc, p) => acc + p.quantity, 0)}
              </span>
            )}
          </button>

          {/* Enunciado */}
          <h2 className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6 sm:mb-8 pr-12 sm:pr-16 md:pr-20">
            {currentQuestionData.text}
          </h2>

          {/* Imagem (se houver) */}
          {currentQuestionData.image && (
            <div className="mb-6 sm:mb-8 flex justify-center">
              <img
                src={currentQuestionData.image}
                alt="Question illustration"
                className="max-w-full md:max-w-2xl rounded-xl shadow-md"
              />
            </div>
          )}

          {/* Opções de Resposta */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
            {currentQuestionData.options.map((option) => (
              <AnswerOption
                key={option.letter}
                letter={option.letter}
                text={option.text}
                isSelected={selectedAnswer === option.letter}
                isCorrect={false}
                isIncorrect={false}
                showFeedback={false}
                disabled={false}
                onClick={() => handleSelectAnswer(option.letter)}
              />
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <button
              onClick={handleSkip}
              className="order-1 sm:order-1 self-start sm:self-auto px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm"
            >
              Pular
            </button>

            <button
              onClick={currentQuestion < 16 ? handleSaveAnswer : handleFinish}
              disabled={!selectedAnswer}
              className="order-2 sm:order-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#8B27FF] dark:bg-[#A855F7] text-white rounded-lg hover:bg-[#7B1FE8] dark:hover:bg-[#9333EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>Salvar resposta</span>
              <span>→</span>
            </button>
          </div>

          {/* Menu de Ferramentas Educativas - Dentro do card de perguntas */}
          {showPowerUpsMenu && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute top-16 right-4 sm:top-20 sm:right-6 md:top-24 md:right-8 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-purple-200 dark:border-purple-700 p-4 min-w-[280px] max-w-[320px]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Suas Ferramentas</h3>
                </div>
                <button
                  className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowPowerUpsMenu(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {userPowerUps.length > 0 ? (
                <div className="space-y-2">
                  {userPowerUps.map(powerup => {
                    const PowerUpIcon = powerup.icon;
                    const isDisabled = powerup.id === 3 && usedShield;
                    
                    return (
                      <button
                        key={powerup.id}
                        className={`
                          w-full flex items-center gap-3 p-3 rounded-xl transition-all
                          ${isDisabled 
                            ? 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 cursor-pointer'
                          }
                        `}
                        onClick={() => {
                          if (powerup.id === 1) useRetry();
                          if (powerup.id === 3) useShield();
                          if (powerup.id === 4) useTheoryLink();
                          if (powerup.id === 8) useCheckAnswer();
                        }}
                        disabled={isDisabled}
                      >
                        <div 
                          className={`
                            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                            ${isDisabled 
                              ? 'bg-gray-300 dark:bg-gray-600' 
                              : 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-md'
                            }
                          `}
                        >
                          <PowerUpIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-sm text-gray-800 dark:text-gray-200">
                            {powerup.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {powerup.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 bg-purple-600 rounded-lg">
                          <span className="text-xs font-bold text-white">
                            {powerup.quantity}x
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                  Nenhuma ferramenta disponível.<br />
                  Compre no Marketplace!
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Botão Flutuante: Enviar Observação */}
        <button className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 px-4 py-2 sm:px-6 sm:py-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] border-2 border-[#8B27FF] dark:border-[#A855F7] rounded-full shadow-lg hover:bg-[#F3E8FF] dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-xs sm:text-sm z-10">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Enviar Observação</span>
          <span className="sm:hidden">Observação</span>
        </button>
      </div>

      {/* Toaster para mensagens */}
      <Toaster position="top-right" />
    </div>
  );
}