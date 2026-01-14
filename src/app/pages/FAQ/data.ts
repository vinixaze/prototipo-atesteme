import {
  Award,
  BookOpen,
  Camera,
  CheckCircle,
  Coins,
  Eye,
  FileText,
  HelpCircle,
  Lock,
  Play,
  Smartphone,
  Target,
  TrendingUp,
  User,
  UserPlus
} from 'lucide-react';
import { TipCard, VideoChapter, FAQItem } from './types';

export const categories = [
  'Todas',
  'Cadastro',
  'Navegação',
  'Desafios',
  'Certificação',
  'Pagamento'
];

export const tips: TipCard[] = [
  {
    id: 1,
    title: 'Complete seu perfil',
    description: 'Atualize seu perfil para validar exames e acumular mais pontos.',
    icon: UserPlus,
    gradient: 'from-[#8B27FF] to-[#A855F7]'
  },
  {
    id: 2,
    title: 'Gerencie o uso',
    description: 'Defina metas e acompanhe o tempo dedicado à plataforma.',
    icon: Smartphone,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 3,
    title: 'Tenha um editor de imagens',
    description: 'Alguns desafios exigem manipulação de imagens. Tenha um app instalado.',
    icon: BookOpen,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Prepare-se para o exame',
    description: 'Reserve pelo menos uma hora, esteja em um ambiente calmo e com boa conexão.',
    icon: Award,
    gradient: 'from-green-500 to-emerald-500'
  }
];

export const videoChapters: VideoChapter[] = [
  {
    id: 1,
    title: 'O que é a Atesteme?',
    description:
      'A Atesteme é um programa de inclusão digital que desenvolve competências e habilidades nos usuários.',
    timestamp: 0,
    duration: '0:00',
    icon: HelpCircle,
    gradient: 'from-[#8B27FF] to-[#A855F7]',
    category: 'intro'
  },
  {
    id: 2,
    title: 'Como acessar?',
    description: 'Preencha login e senha e complete suas informações de perfil.',
    timestamp: 90,
    duration: '1:30',
    icon: UserPlus,
    gradient: 'from-purple-500 to-pink-500',
    category: 'cadastro'
  },
  {
    id: 3,
    title: 'Cadastro via escola ou empresa',
    description:
      'Seu login pode ser emitido pela instituição. A senha é gerada automaticamente com perguntas de segurança.',
    timestamp: 210,
    duration: '3:30',
    icon: User,
    gradient: 'from-purple-500 to-indigo-500',
    category: 'cadastro'
  },
  {
    id: 4,
    title: 'Esqueci minha senha',
    description:
      'Clique em "Esqueci minha senha", informe o e-mail e siga o passo a passo para recuperar o acesso.',
    timestamp: 300,
    duration: '5:00',
    icon: Lock,
    gradient: 'from-red-500 to-orange-500',
    category: 'cadastro'
  },
  {
    id: 5,
    title: 'Dica 1 — Complete o perfil',
    description:
      'Adicione uma foto parecida com o RG para validar exames e certificados na plataforma.',
    timestamp: 360,
    duration: '6:00',
    icon: UserPlus,
    gradient: 'from-amber-500 to-yellow-500',
    category: 'dicas'
  },
  {
    id: 6,
    title: 'Editar informações do perfil',
    description:
      'Clique em "Editar perfil" no canto superior direito, atualize os dados e salve as mudanças.',
    timestamp: 420,
    duration: '7:00',
    icon: User,
    gradient: 'from-blue-500 to-cyan-500',
    category: 'navegacao'
  },
  {
    id: 7,
    title: 'Como navegar na plataforma?',
    description:
      'No dashboard você acompanha desempenho, conquistas por competência e pontos acumulados.',
    timestamp: 480,
    duration: '8:00',
    icon: Target,
    gradient: 'from-cyan-500 to-blue-500',
    category: 'navegacao'
  },
  {
    id: 8,
    title: 'Como ganhar pontos?',
    description:
      'Avance nos desafios e engaje-se para desbloquear recursos exclusivos com os pontos.',
    timestamp: 600,
    duration: '10:00',
    icon: Coins,
    gradient: 'from-yellow-500 to-amber-600',
    category: 'navegacao'
  },
  {
    id: 9,
    title: 'Onde encontro os desafios?',
    description:
      'Entre em "Habilidades" no dashboard e escolha a área de interesse para avançar nos desafios.',
    timestamp: 720,
    duration: '12:00',
    icon: Target,
    gradient: 'from-orange-500 to-red-500',
    category: 'desafios'
  },
  {
    id: 10,
    title: 'Por onde começar?',
    description:
      'Você pode iniciar por qualquer uma das 16 competências. Falhas liberam novas tentativas após cinco dias.',
    timestamp: 840,
    duration: '14:00',
    icon: BookOpen,
    gradient: 'from-orange-600 to-red-600',
    category: 'desafios'
  },
  {
    id: 11,
    title: 'Dica 2 — Use o zoom',
    description:
      'Amplie o conteúdo dos desafios para garantir que imagens e textos fiquem legíveis.',
    timestamp: 960,
    duration: '16:00',
    icon: Smartphone,
    gradient: 'from-cyan-500 to-blue-600',
    category: 'dicas'
  },
  {
    id: 12,
    title: 'Solucionando desafios',
    description:
      'Cada bloco tem três questões. Leia atentamente, analise anexos e registre a resposta correta.',
    timestamp: 1020,
    duration: '17:00',
    icon: CheckCircle,
    gradient: 'from-green-500 to-emerald-600',
    category: 'desafios'
  },
  {
    id: 13,
    title: 'Dica 3 — Instale um editor',
    description:
      'Instale um app de edição caso seu dispositivo não possua ferramentas nativas para imagens.',
    timestamp: 1140,
    duration: '19:00',
    icon: BookOpen,
    gradient: 'from-orange-500 to-red-500',
    category: 'dicas'
  },
  {
    id: 14,
    title: 'Acessando conteúdos',
    description:
      'Use o menu "Conteúdo" para consultar links e vídeos por área e competência.',
    timestamp: 1200,
    duration: '20:00',
    icon: FileText,
    gradient: 'from-indigo-500 to-purple-600',
    category: 'navegacao'
  },
  {
    id: 15,
    title: 'Checando o progresso',
    description:
      'O painel "Progresso" mostra desafios concluídos, níveis vencidos e os pontos conquistados.',
    timestamp: 1320,
    duration: '22:00',
    icon: TrendingUp,
    gradient: 'from-green-500 to-teal-600',
    category: 'navegacao'
  },
  {
    id: 16,
    title: 'Exames de certificação',
    description:
      'Acesse a aba "Exames" para visualizar históricos e agendar novas provas.',
    timestamp: 1440,
    duration: '24:00',
    icon: Award,
    gradient: 'from-green-600 to-emerald-700',
    category: 'certificacao'
  },
  {
    id: 17,
    title: 'Dica 4 — Organize-se',
    description:
      'Reserve uma hora contínua. Mantenha a câmera ligada para validação facial do certificado.',
    timestamp: 1560,
    duration: '26:00',
    icon: Award,
    gradient: 'from-amber-500 to-orange-600',
    category: 'dicas'
  },
  {
    id: 18,
    title: 'Exame de certificação',
    description:
      'Aprovados com 70% liberam desafios do próximo nível. O exame faz parte da assinatura.',
    timestamp: 1680,
    duration: '28:00',
    icon: CheckCircle,
    gradient: 'from-green-500 to-teal-500',
    category: 'certificacao'
  },
  {
    id: 19,
    title: 'Exame de nível',
    description:
      'Atingir 70% nos exames desbloqueia as 16 competências do próximo nível.',
    timestamp: 1800,
    duration: '30:00',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-indigo-600',
    category: 'certificacao'
  },
  {
    id: 20,
    title: 'Validando o certificado',
    description:
      'O reconhecimento facial compara a selfie com a foto do perfil para garantir a autenticidade.',
    timestamp: 1920,
    duration: '32:00',
    icon: Camera,
    gradient: 'from-purple-500 to-pink-600',
    category: 'certificacao'
  },
  {
    id: 21,
    title: 'Acessibilidade',
    description:
      'Clique em "Acessibilidade" no menu do dashboard para ativar recursos compatíveis com suas necessidades.',
    timestamp: 2040,
    duration: '34:00',
    icon: Eye,
    gradient: 'from-indigo-500 to-purple-500',
    category: 'navegacao'
  }
];

export const faqs: FAQItem[] = [
  {
    question: 'O que é a Atesteme?',
    answer:
      'A Atesteme é uma plataforma de educação com treinamentos e certificações online de alta qualidade.',
    category: 'Navegação'
  },
  {
    question: 'Como recupero minha senha?',
    answer:
      'Clique em "Esqueci minha senha" no login e siga as instruções que chegam por e-mail.',
    category: 'Cadastro'
  },
  {
    question: 'Como acessar?',
    answer:
      'Informe login e senha e complete os dados do perfil para ter acesso completo ao dashboard.',
    category: 'Cadastro'
  },
  {
    question: 'Cadastro via escola ou empresa',
    answer:
      'Instituições podem registrar alunos. Receba login, senha e finalize o perfil com perguntas de segurança.',
    category: 'Cadastro'
  },
  {
    question: 'Como obtenho certificação?',
    answer:
      'Você precisa atingir nível 2 em todas as 16 competências para liberar o exame de certificação.',
    category: 'Certificação'
  },
  {
    question: 'Posso avançar sem fazer exercícios?',
    answer:
      'É possível comprar um exame de nível, mas somente o nível 1 pode ser alterado dessa forma.',
    category: 'Desafios'
  },
  {
    question: 'Como ganho pontos?',
    answer:
      'Pontos são ganhos ao progredir nos desafios e desbloquear recursos exclusivos.',
    category: 'Navegação'
  },
  {
    question: 'A plataforma é segura?',
    answer: 'Sim, seus dados são tratados conforme a LGPD, garantindo privacidade e proteção.',
    category: 'Navegação'
  },
  {
    question: 'Preciso de software adicional?',
    answer:
      'A Atesteme é totalmente online, mas você pode instalar o app móvel para facilitar o acesso.',
    category: 'Navegação'
  },
  {
    question: 'Como acesso conteúdos?',
    answer:
      'No painel do aluno, abra o menu "Conteúdo" e explore materiais por área e competência.',
    category: 'Navegação'
  },
  {
    question: 'Posso acessar desafios no celular?',
    answer:
      'Sim, a plataforma é responsiva e funciona em navegadores mobile.',
    category: 'Navegação'
  },
  {
    question: 'Como são aplicados testes e exames?',
    answer:
      'Os testes estão disponíveis diretamente no portal. Após concluir exercícios, o exame abre.',
    category: 'Desafios'
  },
  {
    question: 'O que devo fazer para o exame de certificação?',
    answer:
      'Mantenha o perfil atualizado, escolha um local tranquilo e siga as orientações para garantir uma boa nota.',
    category: 'Certificação'
  },
  {
    question: 'Quais são as vantagens da Atesteme?',
    answer:
      'Melhore performance, use conteúdo em aula e aumente a empregabilidade, inclusive para pessoas com 50+.',
    category: 'Navegação'
  },
  {
    question: 'A Atesteme é única plataforma alinhada à PNED?',
    answer:
      'Sim, somos alinhados à Política Nacional de Educação Digital (PNED).',
    category: 'Navegação'
  },
  {
    question: 'Quero estudar, mas não sei o foco.',
    answer:
      'Abra o menu "Conteúdo" para ver materiais das áreas relacionadas aos desafios e exames.',
    category: 'Desafios'
  },
  {
    question: 'Como acompanho meu progresso?',
    answer:
      'O menu "Progresso" mostra desempenho, níveis alcançados e pontos acumulados.',
    category: 'Navegação'
  },
  {
    question: 'Reprovei em uma competência, o que fazer?',
    answer:
      'Chances extras aparecem cinco dias após dois erros. Continue praticando e tente novamente.',
    category: 'Desafios'
  },
  {
    question: 'Encontrei um erro em um desafio.',
    answer:
      'Use o botão "Enviar Observação" no próprio desafio para nos avisar sobre a inconsistência.',
    category: 'Desafios'
  },
  {
    question: 'Como navegar na plataforma?',
    answer:
      'Comece pelo dashboard para ver performance, conquistas por competência e pontuações.',
    category: 'Navegação'
  },
  {
    question: 'Onde encontro desafios?',
    answer:
      'Acesse a seção "Competências" para explorar desafios por área de interesse.',
    category: 'Desafios'
  },
  {
    question: 'Por quais desafios devo começar?',
    answer:
      'Não há ordem fixa. Use o filtro para encontrar desafios específicos e avance no seu ritmo.',
    category: 'Desafios'
  },
  {
    question: 'Validando seu certificado',
    answer:
      'Reconhecimento facial compara a selfie com a foto do perfil para garantir autenticidade.',
    category: 'Certificação'
  }
];
