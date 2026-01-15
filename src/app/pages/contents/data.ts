import { Database, Users, FileEdit, Shield, Wrench } from 'lucide-react';
import { ContentCategory, ContentItem } from './types';

export const contentItems: ContentItem[] = [
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

  // COMUNICA��O E COLABORA��O - Gerir a identidade digital
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

  // COMUNICA��O E COLABORA��O - Compartilhar e publicar
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
    title: 'Edição de vídeos básicas',
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
    category: 'PROTEÇÃO E SEGURANÇA',
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

  // RESOLU��O DE PROBLEMAS - Evoluir em um ambiente digital
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

export const contentCategories: ContentCategory[] = [
    { name: 'INFORMAÇÕES E DADOS', color: '#FFD700', icon: Database },
    { name: 'COMUNICAÇÃO E COLABORAÇÃO', color: '#00BCD4', icon: Users },
    { name: 'CRIAÇÃO DE CONTEÚDO', color: '#FF9800', icon: FileEdit },
    { name: 'PROTEÇÃO E SEGURANÇA', color: '#4CAF50', icon: Shield },
    { name: 'RESOLUÇÃO DE PROBLEMAS', color: '#E91E63', icon: Wrench },
  ];

