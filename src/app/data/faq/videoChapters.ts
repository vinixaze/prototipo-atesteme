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
  Smartphone,
  Target,
  TrendingUp,
  User,
  UserPlus
} from 'lucide-react';

import type { VideoChapter } from './types';

export const faqVideoChapters: VideoChapter[] = [
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
