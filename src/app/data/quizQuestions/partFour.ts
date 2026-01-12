import type { QuizQuestion } from './types';

export const quizQuestionsPartFour: Record<string, QuizQuestion[]> = {
  'Proteger dados pessoais e privacidade': [
    {
      id: 1,
      text: 'Qual é uma característica de uma senha forte?',
      explanation: 'Combinar letras maiúsculas, minúsculas, números e símbolos ajuda a criar senhas mais seguras e difíceis de quebrar.',
      options: [
        { letter: 'a', text: 'Usar apenas seu nome', isCorrect: false },
        { letter: 'b', text: 'Combinar letras maiúsculas, minúsculas, números e símbolos', isCorrect: true },
        { letter: 'c', text: 'Usar "123456"', isCorrect: false },
        { letter: 'd', text: 'Usar a mesma senha para tudo', isCorrect: false },
        { letter: 'e', text: 'Usar apenas números', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'O que é autenticação de dois fatores (2FA)?',
      explanation: 'Autenticação de dois fatores (2FA) é uma verificação adicional além da senha, como código SMS ou app de autenticação.',
      options: [
        { letter: 'a', text: 'Usar duas senhas diferentes', isCorrect: false },
        { letter: 'b', text: 'Verificação adicional além da senha (código SMS, app)', isCorrect: true },
        { letter: 'c', text: 'Fazer login em dois dispositivos', isCorrect: false },
        { letter: 'd', text: 'Ter dois e-mails cadastrados', isCorrect: false },
        { letter: 'e', text: 'Usar biometria apenas', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Por que você não deve usar Wi-Fi público para acessar informações sensíveis?',
      explanation: 'Wi-Fi público pode ser inseguro e permitir interceptação de dados, aumentando o risco de roubo de informações pessoais.',
      options: [
        { letter: 'a', text: 'É muito lento', isCorrect: false },
        { letter: 'b', text: 'Pode ser inseguro e permitir interceptação de dados', isCorrect: true },
        { letter: 'c', text: 'É ilegal', isCorrect: false },
        { letter: 'd', text: 'Gasta muita bateria', isCorrect: false },
        { letter: 'e', text: 'É muito caro', isCorrect: false },
      ],
    },
  ],
  'Proteger a saúde e o meio ambiente': [
    {
      id: 1,
      text: 'Qual é uma boa prática para evitar fadiga ocular ao usar dispositivos digitais?',
      explanation: 'Seguir a regra 20-20-20 (a cada 20min, olhar 20m de distância por 20s) ajuda a reduzir a fadiga ocular.',
      options: [
        { letter: 'a', text: 'Aumentar o brilho ao máximo', isCorrect: false },
        { letter: 'b', text: 'Seguir a regra 20-20-20 (a cada 20min, olhar 20m de distância por 20s)', isCorrect: true },
        { letter: 'c', text: 'Usar óculos escuros o tempo todo', isCorrect: false },
        { letter: 'd', text: 'Nunca piscar', isCorrect: false },
        { letter: 'e', text: 'Ficar o mais perto possível da tela', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Como descartar corretamente equipamentos eletrônicos antigos?',
      explanation: 'Levar equipamentos eletrônicos antigos a pontos de coleta de lixo eletrônico ajuda a reciclar e proteger o meio ambiente.',
      options: [
        { letter: 'a', text: 'Jogar no lixo comum', isCorrect: false },
        { letter: 'b', text: 'Levar a pontos de coleta de lixo eletrônico', isCorrect: true },
        { letter: 'c', text: 'Queimar no quintal', isCorrect: false },
        { letter: 'd', text: 'Deixar na rua', isCorrect: false },
        { letter: 'e', text: 'Jogar no rio', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'O que é "economia de energia" em dispositivos digitais?',
      explanation: 'Economia de energia é um modo que reduz o consumo de energia quando o dispositivo não está em uso, prolongando a vida útil da bateria.',
      options: [
        { letter: 'a', text: 'Desligar o dispositivo permanentemente', isCorrect: false },
        { letter: 'b', text: 'Modo que reduz consumo de energia quando não está em uso', isCorrect: true },
        { letter: 'c', text: 'Usar apenas durante o dia', isCorrect: false },
        { letter: 'd', text: 'Nunca carregar a bateria completamente', isCorrect: false },
        { letter: 'e', text: 'Desligar a tela sempre', isCorrect: false },
      ],
    },
  ],
  'Resolver problemas técnicos': [
    {
      id: 1,
      text: 'O que você deve fazer primeiro quando um programa não responde?',
      explanation: 'Tentar fechar o programa ou usar o gerenciador de tarefas ajuda a resolver problemas de aplicativos que não respondem.',
      options: [
        { letter: 'a', text: 'Formatar o computador', isCorrect: false },
        { letter: 'b', text: 'Tentar fechar o programa ou usar o gerenciador de tarefas', isCorrect: true },
        { letter: 'c', text: 'Desligar o computador forçadamente', isCorrect: false },
        { letter: 'd', text: 'Comprar um computador novo', isCorrect: false },
        { letter: 'e', text: 'Reiniciar o sistema operacional', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Qual é o primeiro passo para resolver problemas de conexão com a internet?',
      explanation: 'Reiniciar o roteador e verificar cabos ajuda a resolver problemas de conexão com a internet.',
      options: [
        { letter: 'a', text: 'Trocar de provedor imediatamente', isCorrect: false },
        { letter: 'b', text: 'Reiniciar o roteador e verificar cabos', isCorrect: true },
        { letter: 'c', text: 'Comprar um novo computador', isCorrect: false },
        { letter: 'd', text: 'Desinstalar o navegador', isCorrect: false },
        { letter: 'e', text: 'Formatar o computador', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'O que significa "atualizar" um software?',
      explanation: 'Atualizar um software instala a versão mais recente com melhorias e correções, melhorando a funcionalidade e segurança.',
      options: [
        { letter: 'a', text: 'Desinstalar o programa', isCorrect: false },
        { letter: 'b', text: 'Instalar a versão mais recente com melhorias e correções', isCorrect: true },
        { letter: 'c', text: 'Mudar a cor da interface', isCorrect: false },
        { letter: 'd', text: 'Pagar uma taxa mensal', isCorrect: false },
        { letter: 'e', text: 'Deletar arquivos temporários', isCorrect: false },
      ],
    },
  ],
  'Evoluir em um ambiente digital': [
    {
      id: 1,
      text: 'O que caracteriza a aprendizagem contínua no ambiente digital?',
      explanation: 'Aprender contínua no ambiente digital envolve estar sempre atualizado com novas tecnologias e ferramentas para se manter competitivo.',
      options: [
        { letter: 'a', text: 'Aprender apenas uma vez e nunca mais estudar', isCorrect: false },
        { letter: 'b', text: 'Estar sempre atualizado com novas tecnologias e ferramentas', isCorrect: true },
        { letter: 'c', text: 'Evitar mudanças tecnológicas', isCorrect: false },
        { letter: 'd', text: 'Usar apenas tecnologias antigas', isCorrect: false },
        { letter: 'e', text: 'Aprender apenas quando obrigado', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Qual plataforma é útil para aprender novas habilidades digitais gratuitamente?',
      explanation: 'Plataformas como Coursera, YouTube ou Khan Academy oferecem cursos gratuitos para aprender novas habilidades digitais.',
      options: [
        { letter: 'a', text: 'Instagram', isCorrect: false },
        { letter: 'b', text: 'Coursera, YouTube ou Khan Academy', isCorrect: true },
        { letter: 'c', text: 'TikTok', isCorrect: false },
        { letter: 'd', text: 'WhatsApp', isCorrect: false },
        { letter: 'e', text: 'Facebook', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Por que é importante se adaptar às mudanças tecnológicas?',
      explanation: 'Se adaptar às mudanças tecnológicas ajuda a se manter competitivo e aproveitar novas oportunidades no ambiente digital.',
      options: [
        { letter: 'a', text: 'Não é importante, tecnologia antiga funciona sempre', isCorrect: false },
        { letter: 'b', text: 'Para se manter competitivo e aproveitar novas oportunidades', isCorrect: true },
        { letter: 'c', text: 'Apenas para impressionar outras pessoas', isCorrect: false },
        { letter: 'd', text: 'Somente se você trabalhar com TI', isCorrect: false },
        { letter: 'e', text: 'Apenas se for obrigatório', isCorrect: false },
      ],
    },
  ],
};
