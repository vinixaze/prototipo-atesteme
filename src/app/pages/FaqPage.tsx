import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  Search,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  Smartphone,
  UserPlus,
  Award,
  BookOpen,
  Shield,
  Play,
  Clock,
  User,
  Lock,
  Coins,
  Target,
  FileText,
  TrendingUp,
  CheckCircle,
  Camera,
  Eye,
  X,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';

interface FaqPageProps {
  navigateTo: (page: string) => void;
  userRole?: 'admin' | 'user';
}

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface TipCard {
  id: number;
  title: string;
  description: string;
  icon: any;
  gradient: string;
}

interface VideoChapter {
  id: number;
  title: string;
  description: string;
  timestamp: number;
  duration: string;
  icon: any;
  gradient: string;
  category: 'intro' | 'cadastro' | 'navegacao' | 'desafios' | 'certificacao' | 'dicas';
}

export default function FaqPage({ navigateTo, userRole }: FaqPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const categories = ['Todas', 'Cadastro', 'Navegação', 'Desafios', 'Certificação', 'Pagamento'];

  const tips: TipCard[] = [
    {
      id: 1,
      title: 'Complete seu perfil',
      description: 'Atualize seu perfil para validar os exames e ganhar pontos.',
      icon: UserPlus,
      gradient: 'from-[#8B27FF] to-[#A855F7]'
    },
    {
      id: 2,
      title: 'Gerencie seu uso',
      description: 'Você pode gerenciar o tempo de utilização da plataforma.',
      icon: Smartphone,
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 3,
      title: 'Instale App de edição',
      description: 'Alguns desafios requerem manipulação de imagens. Tenha um app de edição instalado.',
      icon: BookOpen,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Organize-se para o Exame',
      description: 'Reserve pelo menos 1 hora, garanta boa conexão e siga as recomendações.',
      icon: Award,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const videoChapters: VideoChapter[] = [
    {
      id: 1,
      title: 'O que é a Atesteme?',
      description: 'A Atesteme é um programa de inclusão e educação digital que prepara os usuários para viverem a cultura digital, desenvolvendo suas competências e habilidades digitais em diversas áreas.',
      timestamp: 0,
      duration: '0:00',
      icon: HelpCircle,
      gradient: 'from-[#8B27FF] to-[#A855F7]',
      category: 'intro'
    },
    {
      id: 2,
      title: 'Como acessar?',
      description: 'Preencha o formulário com seu login e senha e complete suas informações de perfil.',
      timestamp: 90,
      duration: '1:30',
      icon: UserPlus,
      gradient: 'from-purple-500 to-pink-500',
      category: 'cadastro'
    },
    {
      id: 3,
      title: 'Cadastro pela Escola/Empresa',
      description: 'Seu registro na plataforma também pode ser feito pela sua escola ou empresa. Nesse caso, você receberá seu login e senha. A senha é gerada aleatoriamente por questões de segurança.',
      timestamp: 210,
      duration: '3:30',
      icon: User,
      gradient: 'from-purple-500 to-indigo-500',
      category: 'cadastro'
    },
    {
      id: 4,
      title: 'Perdeu a senha?',
      description: 'Se você esqueceu sua senha, vá até a página inicial da plataforma, clique em "Esqueceu sua senha?" e insira seu e-mail. Você receberá instruções para redefinir sua senha e recuperar o acesso.',
      timestamp: 300,
      duration: '5:00',
      icon: Lock,
      gradient: 'from-red-500 to-orange-500',
      category: 'cadastro'
    },
    {
      id: 5,
      title: 'DICA 1 - Complete seu perfil',
      description: 'Atualize seu perfil e adicione uma foto semelhante à do seu RG. Isso é importante para a validação dos seus exames e certificações na plataforma.',
      timestamp: 360,
      duration: '6:00',
      icon: UserPlus,
      gradient: 'from-amber-500 to-yellow-500',
      category: 'dicas'
    },
    {
      id: 6,
      title: 'Editar informações de perfil',
      description: 'Para editar suas informações de perfil, vá ao canto superior direito da tela e clique em "Editar perfil". Altere os dados desejados, incluindo sua foto, e clique em "Atualizar" para salvar as mudanças.',
      timestamp: 420,
      duration: '7:00',
      icon: User,
      gradient: 'from-blue-500 to-cyan-500',
      category: 'navegacao'
    },
    {
      id: 7,
      title: 'Como navegar na plataforma?',
      description: 'Após fazer login, você será direcionado ao seu dashboard. Nele, você pode acessar sua performance (percentual de acertos), acompanhar suas conquistas relacionadas ao desenvolvimento em cada competência digital e verificar sua pontuação em recursos.',
      timestamp: 480,
      duration: '8:00',
      icon: Target,
      gradient: 'from-cyan-500 to-blue-500',
      category: 'navegacao'
    },
    {
      id: 8,
      title: 'Como ganhar pontos?',
      description: 'Você as recebe ao progredir nos desafios eengajar-se na plataforma. Com os pontos, é possível acessar recursos exclusivos.',
      timestamp: 600,
      duration: '10:00',
      icon: Coins,
      gradient: 'from-yellow-500 to-amber-600',
      category: 'navegacao'
    },
    {
      id: 9,
      title: 'Onde encontro os desafios?',
      description: 'Para encontrar os desafios, acesse a sessão "Habilidades" no seu dashboard. Lá, você pode escolher a área de interesse e explorar os desafios disponíveis para avançar na sua jornada de aprendizagem.',
      timestamp: 720,
      duration: '12:00',
      icon: Target,
      gradient: 'from-orange-500 to-red-500',
      category: 'desafios'
    },
    {
      id: 10,
      title: 'Por quais desafios devo começar?',
      description: 'Você pode iniciar por qualquer uma das 16 habilidades disponíveis, pois não há uma ordem específica. É necessário passar por todas as áreas e habilidades para desenvolver plenamente suas competências digitais. Lembre-se: se errar algum dos três desafios, só poderá tentar novamente após 5 dias.',
      timestamp: 840,
      duration: '14:00',
      icon: BookOpen,
      gradient: 'from-orange-600 to-red-600',
      category: 'desafios'
    },
    {
      id: 11,
      title: 'DICA 2 - Utilize o botão de zoom',
      description: 'Para uma melhor visualização dos desafios, utilize o botão de zoom para garantir que todos os elementos dos desafios sejam exibidos adequadamente na tela.',
      timestamp: 960,
      duration: '16:00',
      icon: Smartphone,
      gradient: 'from-cyan-500 to-blue-600',
      category: 'dicas'
    },
    {
      id: 12,
      title: 'Solucionando desafios',
      description: 'Cada bloco de desafios contém três questões para você resolver. Leia atentamente o enunciado e analise todas as informações fornecidas, como imagens e vídeos. Escolha a alternativa correta e clique em "Salvar resposta" para avançar.',
      timestamp: 1020,
      duration: '17:00',
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-600',
      category: 'desafios'
    },
    {
      id: 13,
      title: 'DICA 3 - Instale App de edição',
      description: 'Caso seu dispositivo não possua aplicativos de edição de imagens pré-instalados, recomendamos que instale um. Isso pode ser útil para solucionar alguns desafios que requerem manipulação de imagens.',
      timestamp: 1140,
      duration: '19:00',
      icon: BookOpen,
      gradient: 'from-orange-500 to-red-500',
      category: 'dicas'
    },
    {
      id: 14,
      title: 'Acessando conteúdos',
      description: 'Se você não souber a resposta de um desafio, a plataforma oferece uma solução. No menu "Conteúdo", você encontrará links para páginas e vídeos confiáveis. Selecione a área, a competência e o nível desejado para acessar o material de estudo.',
      timestamp: 1200,
      duration: '20:00',
      icon: FileText,
      gradient: 'from-indigo-500 to-purple-600',
      category: 'navegacao'
    },
    {
      id: 15,
      title: 'Checando seu progresso',
      description: 'No menu "Progresso", você pode visualizar um resumo do seu desempenho, incluindo desafios finalizados, níveis alcançados e pontos acumulados. Ao atingir o topo, poderá refletir sobre toda a sua jornada de aprendizagem digital.',
      timestamp: 1320,
      duration: '22:00',
      icon: TrendingUp,
      gradient: 'from-green-500 to-teal-600',
      category: 'navegacao'
    },
    {
      id: 16,
      title: 'Realizando Exames de Certificação',
      description: 'Para realizar exames de certificação, acesse a sessão "Exames" no menu do seu dashboard. Além de realizar os exames, você também pode consultar o histórico de suas avaliações e certificados obtidos.',
      timestamp: 1440,
      duration: '24:00',
      icon: Award,
      gradient: 'from-green-600 to-emerald-700',
      category: 'certificacao'
    },
    {
      id: 17,
      title: 'DICA 4 - Organize-se para o Exame',
      description: 'Reserve pelo menos uma hora para realizar o exame de certificação. Certifique-se de ter uma boa conexão de internet e mantenha a câmera ligada para que o sistema de identificação pessoal possa validar seu certificado.',
      timestamp: 1560,
      duration: '26:00',
      icon: Award,
      gradient: 'from-amber-500 to-orange-600',
      category: 'dicas'
    },
    {
      id: 18,
      title: 'Exame de Certificação',
      description: 'O exame de certificação está incluído na assinatura e é necessário para avançar de nível. Você deve ser aprovado nos desafios das 16 competências em um determinado nível para desbloquear o exame correspondente. Ao obter 70% ou mais de acertos, os desafios do próximo nível serão desbloqueados.',
      timestamp: 1680,
      duration: '28:00',
      icon: CheckCircle,
      gradient: 'from-green-500 to-teal-500',
      category: 'certificacao'
    },
    {
      id: 19,
      title: 'Exame de Nível',
      description: 'O Exame de Nível permite que você avance para o próximo estágio após a aprovação. Após cada exame, se você alcançar 70% ou mais de acertos, o sistema desbloqueará todos os desafios das 16 competências do nível seguinte.',
      timestamp: 1800,
      duration: '30:00',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-indigo-600',
      category: 'certificacao'
    },
    {
      id: 20,
      title: 'Validando seu certificado',
      description: 'Para validar seu certificado, a plataforma utiliza reconhecimento facial. Durante a inscrição para o teste, você realizará um procedimento de captura de imagem através da webcam. O sistema compara essa imagem com a foto do seu perfil para garantir a autenticidade.',
      timestamp: 1920,
      duration: '32:00',
      icon: Camera,
      gradient: 'from-purple-500 to-pink-600',
      category: 'certificacao'
    },
    {
      id: 21,
      title: 'Acessibilidade',
      description: 'Se você precisa de recursos de acessibilidade, clique no botão "Acessibilidade" no menu do dashboard. Lá, você pode escolher o aplicativo ou software de acessibilidade que melhor atenda às suas necessidades.',
      timestamp: 2040,
      duration: '34:00',
      icon: Eye,
      gradient: 'from-indigo-500 to-purple-500',
      category: 'navegacao'
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: 'O que é a Atesteme?',
      answer: 'A Atesteme é uma plataforma de educação focada em proporcionar treinamentos e certificações online de alta qualidade.',
      category: 'Navegação'
    },
    {
      question: 'Como recupero minha senha?',
      answer: 'Clique em "Esqueci minha senha" na página de login e siga as instruções para redefinir sua senha.',
      category: 'Cadastro'
    },
    {
      question: 'Como acessar?',
      answer: 'Preencha o formulário com seu login e senha e complete suas informações de perfil.',
      category: 'Cadastro'
    },
    {
      question: 'Cadastro pela Escola/Empresa',
      answer: 'Seu registro na plataforma também pode ser feito pela sua escola ou empresa. Nesse caso, você receberá seu login e senha. A senha é gerada aleatoriamente por questões de segurança.',
      category: 'Cadastro'
    },
    {
      question: 'Como posso obter minha certificação?',
      answer: 'Para obter seu certificado, você precisa estar no nível 2 em todas as 16 competências para ter acesso ao exame de certificação.',
      category: 'Certificação'
    },
    {
      question: 'Posso avançar de nível sem fazer os exercícios?',
      answer: 'Você pode avançar de nível sem fazer os exercícios. Para isso, é necessário comprar um exame de nível, mas este exame só permite a mudança do nível 1 para o nível 2. Para os outros níveis, será necessário fazer os exames de certificação.',
      category: 'Navegacao'
    },
    {
      question: 'Como ganhar pontos?',
      answer: 'Você as recebe ao progredir nos desafios eengajar-se na plataforma. Com os pontos, é possível acessar recursos exclusivos.',
      category: 'Navegacao'
    },
    {
      question: 'A plataforma é segura?',
      answer: 'Sim, todos os dados são protegidos e tratados de acordo com a LGPD (Lei Geral de Proteção de Dados).',
      category: 'Navegacao'
    },
    {
      question: 'Preciso baixar algum software para usar a Atesteme?',
      answer: 'Não, a Atesteme é totalmente online e acessível via navegador, mas você pode baixar o nosso aplicativo para facilitar o acesso.',
      category: 'Navegacao'
    },
    {
      question: 'Como acesso os conteúdos?',
      answer: 'Após a inscrição, o conteúdo fica disponível no seu painel de aluno, onde você pode acompanhar os materiais e realizar os exercícios.',
      category: 'Navegacao'
    },
    {
      question: 'Posso acessar os desafios pelo celular?',
      answer: 'Sim, a plataforma é responsiva e pode ser acessada por dispositivos móveis através do navegador.',
      category: 'Navegacao'
    },
    {
      question: 'Como são aplicados os testes e exames?',
      answer: 'Os testes são feitos diretamente na plataforma. Após finalizar todos os exercícios de cada nível, será liberado o exame de certificação.',
      category: 'Desafios'
    },
    {
      question: 'O que devo fazer para realizar o exame de certificação?',
      answer: 'Os requisitos para o exame de certificação dependem do seu perfil de usuário. Para fazer o exame,você precisa esta com os dados do seu perfil atualizados.  Além disso, é importante estar em um local calmo e sem distrações para realizar a prova com tranquilidade e obter uma boa nota.',
      category: 'Certificacao'
    },
    {
      question: 'Quais são as vantagens de estudar com a Atesteme?',
      answer: 'Você pode melhorar a performance nos seus estudos, o conteúdo pode ser utilizado por professores em sala de aula, e aumenta a empregabilidade para todos, inclusive para pessoas com 50+.',
      category: 'Navegacao'
    },
    {
      question: 'A Atesteme é a única plataforma de educação alinhada à PNED?',
      answer: 'Sim, a Atesteme é a única plataforma alinhada à Política Nacional de Educação Digital (PNED).',
      category: 'Navegacao'
    },
    {
      question: 'Quero realizar os desafios, mas não sei quais assuntos preciso estudar.',
      answer: 'No seu dashboard, você encontrará um menu lateral com a opção "Conteúdo". Ao clicar nela, você verá os conteúdos abordados nas áreas que precisa dominar para realizar os exercícios e o exame de certificação.',
      category: 'Desafios'
    },
    {
      question: 'Como posso ver o meu progresso na plataforma?',
      answer: 'No seu dashboard, você encontrará um menu lateral com a opção "Progresso". Ao clicar nela, você poderá visualizar o seu progresso dentro da plataforma.',
      category: 'Navegacao'
    },
    {
      question: 'Reprovei em uma competência. O que fazer?',
      answer: 'Se você errou 2 ou mais desafios, você poderá tentar novamente após 5 dias.',
      category: 'Desafios'
    },
    {
      question: 'Encontrei um erro em um desafio. O que fazer?',
      answer: 'Se você encontrou um erro em algum desafio, basta clicar no botão "Enviar Observação", localizado no próprio desafio. Uma caixa de texto será aberta para você deixar sua observação. Depois, é só enviar.',
      category: 'Desafios'
    },
    {
      question: 'Como navegar na plataforma?',
      answer: 'Após fazer login, você será direcionado ao seu dashboard. Nele, você pode acessar sua performance (percentual de acertos), acompanhar suas conquistas relacionadas ao desenvolvimento em cada competência e verificar seus pontoss.',
      category: 'Navegacao'
    },
    {
      question: 'Onde encontro os desafios?',
      answer: 'Para encontrar os desafios, acesse a sessão "Competências" no seu dashboard. Lá, você pode escolher a área de interesse e explorar os desafios disponíveis para avançar na sua jornada de aprendizagem.',
      category: 'Desafios'
    },
    {
      question: 'Por quais desafios devo começar?',
      answer: 'Você pode iniciar por qualquer uma das competências disponíveis, pois não há uma ordem específica. É necessário passar por todas as áreas e competências para desenvolver plenamente suas habilidades. Utilize a barra de filtragem para buscar desafios específicos.',
      category: 'Desafios'
    },
    {
      question: 'Validando seu certificado',
      answer: 'A Atesteme segue as normas da LGPD e do Eca Digital, assegurando a proteção e privacidade dos seus dados. Para alguns perfis, a plataforma utiliza reconhecimento facial. Por isso, durante a inscrição para o Exame de Certificação, você realizará um procedimento de captura de imagem do seu rosto através da webcam. O sistema compara essa imagem com a foto do seu perfil para garantir a autenticidade. Essa tecnologia adiciona uma camada extra de segurança, simplifica o processo de validação e garante a integridade dos certificados, que podem ser autenticados via QR code.',
      category: 'Certificacao'
    }
  ];

  // Filtrar FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Função para ir para um timestamp específico do vídeo
  const jumpToTimestamp = (timestamp: number, chapterId: number) => {
    setActiveChapter(chapterId);
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);

    // Atualiza o src do iframe com o timestamp
    if (videoRef.current) {
      const videoId = 'dQw4w9WgXcQ'; // Substitua pelo ID real do vídeo
      videoRef.current.src = `https://www.youtube.com/embed/${videoId}?start=${timestamp}&autoplay=1`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="faq"
        onNavigate={navigateTo}
        isAdmin={userRole === 'admin'}
      />

      <div className="flex-1 flex flex-col min-w-0 pt-20">
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userName="Usuário"
          navigateTo={navigateTo}
          onLogout={() => navigateTo('login')}
        />

        <main className="flex-1 overflow-auto">
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] text-white">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi02IDYtNmMwIDMuMzE0LTIuNjg2IDYtNiA2cy02IDIuNjg2LTYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

              <div className="relative max-w-7xl mx-auto px-4 py-6 md:py-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl mb-4">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    Central de Ajuda
                  </h1>
                  <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
                    Encontre respostas para suas dúvidas sobre a plataforma ATESTEME
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
              {/* Dicas Rápidas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Dicas Importantes</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tips.map((tip, index) => (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="relative group"
                    >
                      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-full">
                        <div className={`w-14 h-14 bg-gradient-to-br ${tip.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <tip.icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-white mb-2 text-lg">{tip.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tip.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Video Tutorial Card - Trigger for Modal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Guia do Usuário</h2>
                </div>

                <motion.button
                  onClick={() => setIsVideoModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden bg-gradient-to-br from-[#8B27FF] via-[#A855F7] to-[#C084FC] rounded-3xl p-1 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-[22px] p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <Play className="w-12 h-12 text-white fill-white" />
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                          Assista ao Tutorial Completo
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                          Aprenda tudo sobre a plataforma ATESTEME com nosso guia em vídeo dividido em 21 capítulos práticos e objetivos.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#8B27FF] font-semibold">
                          <span>Clique para assistir</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>

                      <div className="flex-shrink-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl px-6 py-4 border-2 border-purple-100 dark:border-purple-800">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-[#8B27FF] dark:text-[#A855F7] mb-1">21</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Capítulos</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Video Modal */}
              <Dialog.Root open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
                <Dialog.Portal>
                  <Dialog.Overlay asChild>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                  </Dialog.Overlay>

                  <Dialog.Content asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                      {/* Hidden Description for Accessibility */}
                      <Dialog.Description className="sr-only">
                        Modal com vídeo tutorial completo da plataforma ATESTEME. Inclui capítulos navegáveis sobre funcionalidades e recursos do sistema.
                      </Dialog.Description>

                      {/* Modal Header */}
                      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <Play className="w-5 h-5" />
                          </div>
                          <div>
                            <Dialog.Title className="font-bold text-lg">
                              Guia do Usuário ATESTEME
                            </Dialog.Title>
                            <p className="text-sm text-purple-100">Tutorial completo da plataforma</p>
                          </div>
                        </div>

                        <Dialog.Close asChild>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                          >
                            <X className="w-6 h-6" />
                          </motion.button>
                        </Dialog.Close>
                      </div>

                      {/* Modal Body - Split Layout */}
                      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        {/* Video Player - Fixed on Left */}
                        <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-4 md:p-6 flex-shrink-0">
                          <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                            <iframe
                              ref={videoRef}
                              className="w-full h-full"
                              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                              title="Tutorial ATESTEME"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>

                        {/* Chapters List - Scrollable on Right */}
                        <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900 flex flex-col min-h-0 md:min-h-full">
                          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-[#8B27FF] dark:text-[#A855F7]" />
                              Capítulos ({videoChapters.length})
                            </h3>
                          </div>

                          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 min-h-0">
                            {videoChapters.map((chapter, index) => (
                              <motion.div
                                key={chapter.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.02 }}
                              >
                                <motion.button
                                  onClick={() => jumpToTimestamp(chapter.timestamp, chapter.id)}
                                  whileHover={{ x: 4 }}
                                  className={`w-full text-left rounded-xl overflow-hidden transition-all ${activeChapter === chapter.id
                                      ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg'
                                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                  <div className="p-4">
                                    <div className="flex items-start gap-3">
                                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${chapter.gradient} flex items-center justify-center flex-shrink-0 ${activeChapter === chapter.id ? 'bg-white/20' : ''
                                        }`}>
                                        <chapter.icon className={`w-5 h-5 ${activeChapter === chapter.id ? 'text-white' : 'text-white'}`} />
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${activeChapter === chapter.id
                                              ? 'bg-white/20 text-white'
                                              : 'bg-purple-100 text-[#8B27FF]'
                                            }`}>
                                            {chapter.duration}
                                          </span>
                                          {activeChapter === chapter.id && (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              className="flex items-center gap-1 text-xs font-medium"
                                            >
                                              <Play className="w-3 h-3 fill-white" />
                                              Reproduzindo
                                            </motion.span>
                                          )}
                                        </div>
                                        <h4 className={`font-bold text-sm mb-1 ${activeChapter === chapter.id ? 'text-white' : 'text-gray-800'
                                          }`}>
                                          {chapter.title}
                                        </h4>
                                      </div>

                                      <motion.div
                                        animate={{ rotate: expandedChapter === chapter.id ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                      >
                                        <ChevronDown className={`w-5 h-5 ${activeChapter === chapter.id ? 'text-white' : 'text-gray-400'
                                          }`} />
                                      </motion.div>
                                    </div>

                                    <AnimatePresence>
                                      {expandedChapter === chapter.id && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="overflow-hidden"
                                        >
                                          <p className={`text-sm mt-3 pt-3 border-t leading-relaxed ${activeChapter === chapter.id
                                              ? 'text-purple-100 border-white/20'
                                              : 'text-gray-600 border-gray-200'
                                            }`}>
                                            {chapter.description}
                                          </p>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Perguntas Frequentes</h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 md:px-6 py-3 rounded-xl font-medium transition-all text-sm md:text-base ${selectedCategory === category
                          ? 'bg-gradient-to-r from-[#8B27FF] to-[#A855F7] text-white shadow-lg shadow-purple-500/30'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* FAQ Accordion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Accordion.Root type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Accordion.Item
                        value={`item-${index}`}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="w-full group">
                            <div className="flex items-center justify-between w-full px-6 md:px-8 py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <span className="font-semibold text-gray-800 dark:text-white text-lg pr-4">
                                {faq.question}
                              </span>
                              <ChevronDown className="w-6 h-6 text-[#8B27FF] dark:text-[#A855F7] flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </div>
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                          <div className="px-6 md:px-8 pb-6 pt-2">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    </motion.div>
                  ))}
                </Accordion.Root>

                {filteredFaqs.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Nenhuma pergunta encontrada
                    </h3>
                    <p className="text-gray-600">
                      Tente ajustar sua busca ou selecione outra categoria
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Contact Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12 border border-purple-100 dark:border-purple-800"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8B27FF] to-[#A855F7] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Ainda tem dúvidas?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                    Nossa equipe está pronta para ajudar você! Entre em contato através do WhatsApp ou envie uma observação diretamente pela plataforma.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigateTo('chatbot')} // ou a rota que você usar
                      className="inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-[#8B27FF] dark:border-[#A855F7] shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="w-6 h-6" />
                      Chatbot
                    </button>

                    <button
                      onClick={() => navigateTo('dashboard')}
                      className="inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-[#8B27FF] dark:text-[#A855F7] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-[#8B27FF] dark:border-[#A855F7] shadow-lg hover:shadow-xl"
                    >
                      Voltar ao Dashboard
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
