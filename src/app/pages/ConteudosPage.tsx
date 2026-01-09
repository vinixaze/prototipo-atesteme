import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Database, Users, FileEdit, Shield, Wrench, BookOpen, Play, FileText, Globe, Search, Filter, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface Content {
  id: string;
  title: string;
  competency: string;
  level: number;
  category: string;
  categoryColor: string;
  format: string;
  description: string;
  link: string;
}

interface ConteudosPageProps {
  navigateTo: (page: string) => void;
  filterData?: {
    category?: string;
  };
  userRole?: 'admin' | 'user';
}

// Mock de conteúdos organizados por competência e nível
const mockContents: Content[] = [
  // INFORMAÇÕES E DADOS - Realizar o tratamento de dados
  {
    id: '1',
    title: 'Introdução ao tratamento de dados no Excel',
    competency: 'Realizar o tratamento de dados',
    level: 1,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Vídeo',
    description: 'Aprenda os fundamentos de organização e análise de dados.',
    link: '#'
  },
  {
    id: '2',
    title: 'Fórmulas básicas e funções do Excel',
    competency: 'Realizar o tratamento de dados',
    level: 1,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Site',
    description: 'Conteúdo web sobre fórmulas essenciais.',
    link: '#'
  },
  {
    id: '3',
    title: 'Gráficos e visualização de dados',
    competency: 'Realizar o tratamento de dados',
    level: 2,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Tutorial',
    description: 'Como criar visualizações eficazes dos seus dados.',
    link: '#'
  },
  {
    id: '4',
    title: 'Análise avançada com tabelas dinâmicas',
    competency: 'Realizar o tratamento de dados',
    level: 3,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Site',
    description: 'Técnicas avançadas de análise de dados.',
    link: '#'
  },
  {
    id: '5',
    title: 'Automação e macros para dados',
    competency: 'Realizar o tratamento de dados',
    level: 4,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Curso',
    description: 'Automatize processos complexos de análise.',
    link: '#'
  },
  {
    id: '5-5',
    title: 'Big Data e ciência de dados',
    competency: 'Realizar o tratamento de dados',
    level: 5,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Especialização',
    description: 'Domine análise de grandes volumes de dados e machine learning.',
    link: '#'
  },

  // INFORMAÇÕES E DADOS - Gerenciar dados
  {
    id: '6',
    title: 'Organização básica de arquivos digitais',
    competency: 'Gerenciar dados',
    level: 1,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Artigo',
    description: 'Aprenda a organizar suas pastas e arquivos.',
    link: '#'
  },
  {
    id: '7',
    title: 'Backup e armazenamento em nuvem',
    competency: 'Gerenciar dados',
    level: 2,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Vídeo',
    description: 'Proteja seus dados com backup eficiente.',
    link: '#'
  },
  {
    id: '8',
    title: 'Sistemas de gestão de banco de dados',
    competency: 'Gerenciar dados',
    level: 3,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Tutorial',
    description: 'Introdução a sistemas de banco de dados.',
    link: '#'
  },
  {
    id: '9',
    title: 'Governança e compliance de dados',
    competency: 'Gerenciar dados',
    level: 4,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Guia',
    description: 'Gerencie dados conforme normas e regulamentos.',
    link: '#'
  },
  {
    id: '9-5',
    title: 'Arquitetura de dados empresarial',
    competency: 'Gerenciar dados',
    level: 5,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    format: 'Especialização',
    description: 'Projete e implemente arquiteturas de dados escaláveis e robustas.',
    link: '#'
  },

  // COMUNICAÇÃO E COLABORAÇÃO - Interagir
  {
    id: '10',
    title: 'Comunicação digital: e-mail e mensagens',
    competency: 'Interagir',
    level: 1,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Site',
    description: 'Fundamentos da comunicação digital.',
    link: '#'
  },
  {
    id: '11',
    title: 'Etiqueta em videoconferências',
    competency: 'Interagir',
    level: 2,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Vídeo',
    description: 'Boas práticas em reuniões virtuais.',
    link: '#'
  },
  {
    id: '12',
    title: 'Comunicação assertiva no digital',
    competency: 'Interagir',
    level: 3,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Artigo',
    description: 'Desenvolva habilidades de comunicação online.',
    link: '#'
  },
  {
    id: '13',
    title: 'Gestão de comunidades online',
    competency: 'Interagir',
    level: 4,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Curso',
    description: 'Lidere e modere comunidades digitais.',
    link: '#'
  },

  // COMUNICAÇÃO E COLABORAÇÃO - Gerir a identidade digital
  {
    id: '14',
    title: 'Sua presença digital: primeiros passos',
    competency: 'Gerir a identidade digital',
    level: 1,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Guia',
    description: 'Construa sua identidade digital de forma segura.',
    link: '#'
  },
  {
    id: '15',
    title: 'Reputação online e privacidade',
    competency: 'Gerir a identidade digital',
    level: 2,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Vídeo',
    description: 'Gerencie sua reputação nas redes sociais.',
    link: '#'
  },
  {
    id: '16',
    title: 'Personal branding digital',
    competency: 'Gerir a identidade digital',
    level: 3,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Tutorial',
    description: 'Crie uma marca pessoal forte online.',
    link: '#'
  },
  {
    id: '17',
    title: 'Gestão profissional de múltiplas identidades',
    competency: 'Gerir a identidade digital',
    level: 4,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Curso',
    description: 'Administre diferentes perfis profissionais.',
    link: '#'
  },

  // COMUNICAÇÃO E COLABORAÇÃO - Compartilhar e publicar
  {
    id: '18',
    title: 'Como compartilhar arquivos com segurança',
    competency: 'Compartilhar e publicar',
    level: 1,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Artigo',
    description: 'Métodos seguros de compartilhamento.',
    link: '#'
  },
  {
    id: '19',
    title: 'Publicação em redes sociais',
    competency: 'Compartilhar e publicar',
    level: 2,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Vídeo',
    description: 'Aprenda a publicar conteúdo eficaz.',
    link: '#'
  },
  {
    id: '20',
    title: 'Licenças e direitos autorais digitais',
    competency: 'Compartilhar e publicar',
    level: 3,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Guia',
    description: 'Entenda licenças Creative Commons e copyright.',
    link: '#'
  },
  {
    id: '21',
    title: 'Estratégias de conteúdo e distribuição',
    competency: 'Compartilhar e publicar',
    level: 4,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Curso',
    description: 'Otimize a distribuição do seu conteúdo.',
    link: '#'
  },

  // COMUNICAÇÃO E COLABORAÇÃO - Colaborar
  {
    id: '22',
    title: 'Ferramentas de colaboração online',
    competency: 'Colaborar',
    level: 1,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Site',
    description: 'Conheça Google Docs, Teams e outras ferramentas.',
    link: '#'
  },
  {
    id: '23',
    title: 'Trabalho em equipe remoto',
    competency: 'Colaborar',
    level: 2,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Vídeo',
    description: 'Técnicas para colaboração à distância.',
    link: '#'
  },
  {
    id: '24',
    title: 'Gestão de projetos colaborativos',
    competency: 'Colaborar',
    level: 3,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Tutorial',
    description: 'Use Trello, Asana e outras plataformas.',
    link: '#'
  },
  {
    id: '25',
    title: 'Liderança em equipes virtuais',
    competency: 'Colaborar',
    level: 4,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Curso',
    description: 'Lidere equipes distribuídas com eficácia.',
    link: '#'
  },

  // CRIAÇÃO DE CONTEÚDO - Programar sistemas
  {
    id: '26',
    title: 'Introdução à lógica de programação',
    competency: 'Programar sistemas',
    level: 1,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Vídeo',
    description: 'Primeiros passos no mundo da programação.',
    link: '#'
  },
  {
    id: '27',
    title: 'HTML e CSS básico',
    competency: 'Programar sistemas',
    level: 2,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Tutorial',
    description: 'Crie suas primeiras páginas web.',
    link: '#'
  },
  {
    id: '28',
    title: 'JavaScript e interatividade',
    competency: 'Programar sistemas',
    level: 3,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Curso',
    description: 'Adicione comportamento dinâmico às páginas.',
    link: '#'
  },
  {
    id: '29',
    title: 'Desenvolvimento full-stack',
    competency: 'Programar sistemas',
    level: 4,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Site',
    description: 'Construa aplicações completas.',
    link: '#'
  },

  // CRIAÇÃO DE CONTEÚDO - Editar texto multimídia
  {
    id: '30',
    title: 'Edição de vídeos básica',
    competency: 'Editar texto multimídia',
    level: 1,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Vídeo',
    description: 'Aprenda a editar vídeos simples.',
    link: '#'
  },
  {
    id: '31',
    title: 'Edição de áudio e podcasts',
    competency: 'Editar texto multimídia',
    level: 2,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Tutorial',
    description: 'Produza conteúdo de áudio profissional.',
    link: '#'
  },
  {
    id: '32',
    title: 'Animações e motion graphics',
    competency: 'Editar texto multimídia',
    level: 3,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Curso',
    description: 'Crie animações e efeitos visuais.',
    link: '#'
  },
  {
    id: '33',
    title: 'Produção audiovisual avançada',
    competency: 'Editar texto multimídia',
    level: 4,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Site',
    description: 'Domine técnicas profissionais de produção.',
    link: '#'
  },

  // CRIAÇÃO DE CONTEÚDO - Editar texto escrito
  {
    id: '34',
    title: 'Processadores de texto básicos',
    competency: 'Editar texto escrito',
    level: 1,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Site',
    description: 'Domine Word, Google Docs e similares.',
    link: '#'
  },
  {
    id: '35',
    title: 'Formatação e estilos profissionais',
    competency: 'Editar texto escrito',
    level: 2,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Vídeo',
    description: 'Crie documentos bem formatados.',
    link: '#'
  },
  {
    id: '36',
    title: 'Redação para web e SEO',
    competency: 'Editar texto escrito',
    level: 3,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Artigo',
    description: 'Escreva conteúdo otimizado para internet.',
    link: '#'
  },
  {
    id: '37',
    title: 'Escrita técnica e documentação',
    competency: 'Editar texto escrito',
    level: 4,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Curso',
    description: 'Produza documentação técnica de qualidade.',
    link: '#'
  },

  // CRIAÇÃO DE CONTEÚDO - Adaptar arquivos
  {
    id: '38',
    title: 'Conversão básica de formatos',
    competency: 'Adaptar arquivos',
    level: 1,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Guia',
    description: 'Converta entre PDF, Word, imagens e outros.',
    link: '#'
  },
  {
    id: '39',
    title: 'Compressão e otimização de arquivos',
    competency: 'Adaptar arquivos',
    level: 2,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Tutorial',
    description: 'Reduza tamanho sem perder qualidade.',
    link: '#'
  },
  {
    id: '40',
    title: 'Adaptação para acessibilidade',
    competency: 'Adaptar arquivos',
    level: 3,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Vídeo',
    description: 'Torne documentos acessíveis a todos.',
    link: '#'
  },
  {
    id: '41',
    title: 'Automação de conversões em lote',
    competency: 'Adaptar arquivos',
    level: 4,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Site',
    description: 'Processe múltiplos arquivos automaticamente.',
    link: '#'
  },

  // PROTEÇÃO E SEGURANÇA - Proteger o ambiente digital
  {
    id: '42',
    title: 'Antivírus e proteção básica',
    competency: 'Proteger o ambiente digital',
    level: 1,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Artigo',
    description: 'Mantenha seus dispositivos seguros.',
    link: '#'
  },
  {
    id: '43',
    title: 'Firewall e segurança de rede',
    competency: 'Proteger o ambiente digital',
    level: 2,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Vídeo',
    description: 'Proteja sua rede doméstica.',
    link: '#'
  },
  {
    id: '44',
    title: 'Detecção e resposta a ameaças',
    competency: 'Proteger o ambiente digital',
    level: 3,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Tutorial',
    description: 'Identifique e neutralize ameaças digitais.',
    link: '#'
  },
  {
    id: '45',
    title: 'Segurança corporativa avançada',
    competency: 'Proteger o ambiente digital',
    level: 4,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Curso',
    description: 'Implemente políticas de segurança empresarial.',
    link: '#'
  },

  // PROTEÇÃO E SEGURANÇA - Proteger dados pessoais e privacidade
  {
    id: '46',
    title: 'Senhas fortes e autenticação',
    competency: 'Proteger dados pessoais e privacidade',
    level: 1,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Guia',
    description: 'Crie e gerencie senhas seguras.',
    link: '#'
  },
  {
    id: '47',
    title: 'LGPD e proteção de dados',
    competency: 'Proteger dados pessoais e privacidade',
    level: 2,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Site',
    description: 'Entenda seus direitos sobre dados pessoais.',
    link: '#'
  },
  {
    id: '48',
    title: 'Criptografia e comunicação segura',
    competency: 'Proteger dados pessoais e privacidade',
    level: 3,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Vídeo',
    description: 'Proteja suas comunicações digitais.',
    link: '#'
  },
  {
    id: '49',
    title: 'Privacidade total e anonimato',
    competency: 'Proteger dados pessoais e privacidade',
    level: 4,
    category: 'PROTEÇÃO E SEGURANA',
    categoryColor: '#4CAF50',
    format: 'Curso',
    description: 'Técnicas avançadas de privacidade online.',
    link: '#'
  },

  // PROTEÇÃO E SEGURANÇA - Proteger a saúde e o meio ambiente
  {
    id: '50',
    title: 'Ergonomia digital e postura',
    competency: 'Proteger a saúde e o meio ambiente',
    level: 1,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Artigo',
    description: 'Cuide da sua saúde no uso de tecnologia.',
    link: '#'
  },
  {
    id: '51',
    title: 'Sustentabilidade digital',
    competency: 'Proteger a saúde e o meio ambiente',
    level: 2,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Vídeo',
    description: 'Reduza o impacto ambiental da tecnologia.',
    link: '#'
  },
  {
    id: '52',
    title: 'Detox digital e bem-estar',
    competency: 'Proteger a saúde e o meio ambiente',
    level: 3,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Tutorial',
    description: 'Equilibre vida digital e saúde mental.',
    link: '#'
  },
  {
    id: '53',
    title: 'Green IT e computação sustentável',
    competency: 'Proteger a saúde e o meio ambiente',
    level: 4,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Curso',
    description: 'Implemente TI sustentável.',
    link: '#'
  },

  // RESOLUÇÃO DE PROBLEMAS - Resolver problemas técnicos
  {
    id: '54',
    title: 'Troubleshooting básico',
    competency: 'Resolver problemas técnicos',
    level: 1,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Vídeo',
    description: 'Resolva problemas comuns de hardware e software.',
    link: '#'
  },
  {
    id: '55',
    title: 'Diagnóstico de problemas de rede',
    competency: 'Resolver problemas técnicos',
    level: 2,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Site',
    description: 'Identifique e corrija falhas de conexão.',
    link: '#'
  },
  {
    id: '56',
    title: 'Recuperação de sistemas e dados',
    competency: 'Resolver problemas técnicos',
    level: 3,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Tutorial',
    description: 'Recupere sistemas danificados.',
    link: '#'
  },
  {
    id: '57',
    title: 'Análise forense e debugging avançado',
    competency: 'Resolver problemas técnicos',
    level: 4,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Curso',
    description: 'Técnicas avançadas de análise e correção.',
    link: '#'
  },

  // RESOLUÇÃO DE PROBLEMAS - Evoluir em um ambiente digital
  {
    id: '58',
    title: 'Aprendizado contínuo em tecnologia',
    competency: 'Evoluir em um ambiente digital',
    level: 1,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Artigo',
    description: 'Desenvolva mentalidade de crescimento digital.',
    link: '#'
  },
  {
    id: '59',
    title: 'Acompanhando tendências tecnológicas',
    competency: 'Evoluir em um ambiente digital',
    level: 2,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Vídeo',
    description: 'Mantenha-se atualizado com inovações.',
    link: '#'
  },
  {
    id: '60',
    title: 'Adaptação a novas ferramentas',
    competency: 'Evoluir em um ambiente digital',
    level: 3,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Guia',
    description: 'Aprenda rapidamente novas tecnologias.',
    link: '#'
  },
  {
    id: '61',
    title: 'Inovação e transformação digital',
    competency: 'Evoluir em um ambiente digital',
    level: 4,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Curso',
    description: 'Lidere processos de transformação digital.',
    link: '#'
  },

  // ===== CONTEÚDOS NÍVEL 5 =====

  // COMUNICAÇÃO E COLABORAÇÃO - Interagir - Nível 5
  {
    id: '13-5',
    title: 'Estratégias avançadas de engajamento digital',
    competency: 'Interagir',
    level: 5,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Especialização',
    description: 'Domine técnicas de influência e engajamento em ambientes digitais complexos.',
    link: '#'
  },

  // COMUNICAÇÃO E COLABORAÇÃO - Gerir a identidade digital - Nível 5
  {
    id: '17-5',
    title: 'Gestão estratégica de reputação corporativa digital',
    competency: 'Gerir a identidade digital',
    level: 5,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Especialização',
    description: 'Construa e proteja reputações digitais de marcas e organizações.',
    link: '#'
  },

  // COMUNICAÇÃO E COLABORAÇÃO - Compartilhar e publicar - Nível 5
  {
    id: '21-5',
    title: 'Marketing de conteúdo e viralização',
    competency: 'Compartilhar e publicar',
    level: 5,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Especialização',
    description: 'Crie estratégias de conteúdo viral e campanhas digitais de alto impacto.',
    link: '#'
  },

  // COMUNICAÇÃO E COLABORAÇÃO - Colaborar - Nível 5
  {
    id: '25-5',
    title: 'Gestão ágil e DevOps em equipes globais',
    competency: 'Colaborar',
    level: 5,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    format: 'Especialização',
    description: 'Implemente metodologias ágeis em equipes distribuídas globalmente.',
    link: '#'
  },

  // CRIAÇÃO DE CONTEÚDO - Programar sistemas - Nível 5
  {
    id: '29-5',
    title: 'Arquitetura de software e microsserviços',
    competency: 'Programar sistemas',
    level: 5,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Especialização',
    description: 'Projete sistemas escaláveis com arquiteturas modernas e cloud native.',
    link: '#'
  },

  // CRIAÇÃO DE CONTEÚDO - Editar texto multimídia - Nível 5
  {
    id: '33-5',
    title: 'Produção cinematográfica e efeitos especiais',
    competency: 'Editar texto multimídia',
    level: 5,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Especialização',
    description: 'Crie produções de nível cinematográfico com VFX e pós-produção avançada.',
    link: '#'
  },

  // CRIAÇÃO DE CONTEÚDO - Editar texto escrito - Nível 5
  {
    id: '37-5',
    title: 'Copywriting persuasivo e storytelling',
    competency: 'Editar texto escrito',
    level: 5,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Especialização',
    description: 'Domine técnicas avançadas de escrita persuasiva e narrativas envolventes.',
    link: '#'
  },

  // CRIAÇÃO DE CONTEÚDO - Adaptar arquivos - Nível 5
  {
    id: '41-5',
    title: 'Transformação digital de documentos com IA',
    competency: 'Adaptar arquivos',
    level: 5,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    format: 'Especialização',
    description: 'Use inteligência artificial para processar e adaptar documentos em escala.',
    link: '#'
  },

  // PROTEÇÃO E SEGURANÇA - Proteger o ambiente digital - Nível 5
  {
    id: '45-5',
    title: 'Segurança cibernética e ethical hacking',
    competency: 'Proteger o ambiente digital',
    level: 5,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Especialização',
    description: 'Torne-se especialista em segurança ofensiva e defensiva de sistemas.',
    link: '#'
  },

  // PROTEÇÃO E SEGURANÇA - Proteger dados pessoais e privacidade - Nível 5
  {
    id: '49-5',
    title: 'Privacidade por design e zero-trust',
    competency: 'Proteger dados pessoais e privacidade',
    level: 5,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Especialização',
    description: 'Implemente arquiteturas de segurança zero-trust e privacidade nativa.',
    link: '#'
  },

  // PROTEÇÃO E SEGURANÇA - Proteger a saúde e o meio ambiente - Nível 5
  {
    id: '53-5',
    title: 'Economia circular digital e ESG tech',
    competency: 'Proteger a saúde e o meio ambiente',
    level: 5,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    format: 'Especialização',
    description: 'Lidere iniciativas de sustentabilidade digital e tecnologia ESG.',
    link: '#'
  },

  // RESOLUÇÃO DE PROBLEMAS - Resolver problemas técnicos - Nível 5
  {
    id: '57-5',
    title: 'Engenharia de confiabilidade de sites (SRE)',
    competency: 'Resolver problemas técnicos',
    level: 5,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Especialização',
    description: 'Garanta alta disponibilidade e performance de sistemas críticos.',
    link: '#'
  },

  // RESOLUÇÃO DE PROBLEMAS - Evoluir em um ambiente digital - Nível 5
  {
    id: '61-5',
    title: 'Liderança em transformação digital e IA',
    competency: 'Evoluir em um ambiente digital',
    level: 5,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    format: 'Especialização',
    description: 'Lidere organizações na era da inteligência artificial e automação.',
    link: '#'
  },
];

export default function ConteudosPage({ navigateTo, filterData, userRole }: ConteudosPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('INFORMAÇÕES E DADOS');
  const [selectedCompetency, setSelectedCompetency] = useState(''); // vazio
  const [selectedLevel, setSelectedLevel] = useState(''); // vazio



  const categories = [
    { name: 'INFORMAÇÕES E DADOS', color: '#FFD700', icon: Database },
    { name: 'COMUNICAÇÃO E COLABORAÇÃO', color: '#00BCD4', icon: Users },
    { name: 'CRIAÇÃO DE CONTEÚDO', color: '#FF9800', icon: FileEdit },
    { name: 'PROTEÇÃO E SEGURANÇA', color: '#4CAF50', icon: Shield },
    { name: 'RESOLUÇÃO DE PROBLEMAS', color: '#E91E63', icon: Wrench },
  ];

  // Obter competências únicas da categoria selecionada
  const availableCompetencies = Array.from(
    new Set(
      mockContents
        .filter(content => content.category === selectedCategory)
        .map(content => content.competency)
    )
  );



  // Filtrar conteúdos
  const filteredContents = mockContents.filter(content => {
    const matchesCategory = content.category === selectedCategory;
    const matchesCompetency = !selectedCompetency || content.competency === selectedCompetency;
    const matchesLevel = content.level === parseInt(selectedLevel);
    return matchesCategory && matchesCompetency && matchesLevel;
  });

  const currentCategory = categories.find(cat => cat.name === selectedCategory);

  useEffect(() => {
    if (filterData) {
      setSelectedCategory(filterData.category || 'INFORMAÇÕES E DADOS');
      setSelectedCompetency('');
      setSelectedLevel('');
    }
  }, [filterData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage="conteudos"
        onNavigate={(page) => {
          setSidebarOpen(false);
          navigateTo(page);
        }}
        isAdmin={userRole === 'admin'}
      />
      <Header onMenuClick={() => setSidebarOpen(true)} userName="Usuário" navigateTo={navigateTo} onLogout={() => navigateTo('login')} />

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header Título Principal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Espaço de Aprendizagem
          </h1>
          <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-4">
            Conteúdo para você estudar
          </h2>
          <div className="bg-gradient-to-r from-[#8B27FF]/10 to-[#A855F7]/10 dark:from-[#8B27FF]/20 dark:to-[#A855F7]/20 rounded-xl px-6 py-3 inline-block">
            <p className="text-lg font-semibold text-[#8B27FF] dark:text-[#A855F7]">
              Explore materiais organizados por competências e níveis
            </p>
          </div>
        </motion.div>

        {/* Tabs de Categorias - Design Moderno */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-2 flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.name;

              return (
                <motion.button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSelectedCompetency('');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 min-w-[120px] md:min-w-[160px] 
                    flex flex-col md:flex-row 
                    items-center justify-center 
                    gap-1 md:gap-2 
                    px-3 py-3 rounded-xl 
                    transition-all font-semibold text-sm
                    ${isActive
                      ? 'text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  style={{
                    backgroundColor: isActive ? category.color : 'transparent',
                  }}
                >
                  {/* Ícone */}
                  <Icon className="w-5 h-5 md:w-4 md:h-4" />

                  {/* Texto */}
                  <span className="text-[11px] leading-tight text-center md:text-sm">
                    {category.name}
                  </span>
                </motion.button>

              );
            })}
          </div>
        </motion.div>

        {/* Filtros Compactos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />

              {/* Texto que aparece no "botão" */}
              <span className="absolute left-10 right-10 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800 dark:text-gray-100 pointer-events-none truncate">
                {selectedCompetency ? selectedCompetency : 'Competências'}
              </span>

              <select
                value={selectedCompetency}
                onChange={(e) => setSelectedCompetency(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl
                 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] transition-all appearance-none cursor-pointer
                 text-transparent"
              >
                <option value="" disabled hidden>
                  Competências
                </option>

                {availableCompetencies.map((competency) => (
                  <option key={competency} value={competency} className="text-gray-900">
                    {competency}
                  </option>
                ))}
              </select>
            </div>
          </div>



          <div className="w-full md:w-48">
            <div className="relative">
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />

              {/* Texto do "botão" */}
              <span className="absolute left-4 right-10 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800 dark:text-gray-100 pointer-events-none truncate">
                {selectedLevel ? `Nível ${selectedLevel}` : 'Níveis'}
              </span>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 pr-10 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl
                 focus:outline-none focus:border-[#8B27FF] dark:focus:border-[#A855F7] transition-all appearance-none cursor-pointer
                 text-transparent"
              >
                <option value="" disabled hidden>
                  Níveis
                </option>

                <option value="1" className="text-gray-900">Nível 1</option>
                <option value="2" className="text-gray-900">Nível 2</option>
                <option value="3" className="text-gray-900">Nível 3</option>
                <option value="4" className="text-gray-900">Nível 4</option>
                <option value="5" className="text-gray-900">Nível 5</option>
              </select>
            </div>
          </div>


        </motion.div>

        {/* Grid de Cards Modernos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content, index) => {
            // Ícone baseado no formato
            const formatIcon = content.format === 'Vídeo' ? Play :
              content.format === 'Site' ? Globe :
                FileText;
            const FormatIcon = formatIcon;

            return (
              <motion.a
                key={content.id}
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Header do Card com Cor da Categoria */}
                <div
                  className="h-2"
                  style={{ backgroundColor: currentCategory?.color }}
                />

                <div className="p-6">
                  {/* Badge de Formato */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: `${currentCategory?.color}15`,
                        color: currentCategory?.color
                      }}
                    >
                      <FormatIcon className="w-3.5 h-3.5" />
                      {content.format}
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#8B27FF] dark:group-hover:text-[#A855F7] transition-colors">
                    {content.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {content.description}
                  </p>

                  {/* Footer com CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Nível {content.level}
                    </span>
                    <div className="flex items-center gap-1 text-sm font-semibold text-[#8B27FF] dark:text-[#A855F7] group-hover:gap-2 transition-all">
                      <span>Acessar</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Empty State Melhorado */}
        {filteredContents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-16 text-center"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${currentCategory?.color}15` }}
            >
              {currentCategory?.icon && (
                <currentCategory.icon
                  className="w-12 h-12"
                  style={{ color: currentCategory.color }}
                />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Nenhum conteúdo disponível
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Não há materiais para esta competência e nível no momento. Tente selecionar outra combinação.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}