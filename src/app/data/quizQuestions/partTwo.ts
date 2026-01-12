import type { QuizQuestion } from './types';

export const quizQuestionsPartTwo: Record<string, QuizQuestion[]> = {
  'Gerir a identidade digital': [
    {
      id: 1,
      text: 'O que é "pegada digital"?',
      explanation: 'Pegada digital é o rastro de informações que você deixa online, como atividades em redes sociais e sites visitados.',
      options: [
        { letter: 'a', text: 'O tamanho dos arquivos que você baixa', isCorrect: false },
        { letter: 'b', text: 'O rastro de informações que você deixa online', isCorrect: true },
        { letter: 'c', text: 'A impressão digital usada para desbloquear o celular', isCorrect: false },
        { letter: 'd', text: 'A quantidade de dados móveis que você usa', isCorrect: false },
        { letter: 'e', text: 'O número de seguidores nas redes sociais', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Qual é a melhor prática para gerenciar sua reputação online?',
      explanation: 'Pensar antes de postar e manter um comportamento respeitoso ajuda a construir uma reputação positiva online.',
      options: [
        { letter: 'a', text: 'Postar qualquer conteúdo sem pensar nas consequências', isCorrect: false },
        { letter: 'b', text: 'Pensar antes de postar e manter um comportamento respeitoso', isCorrect: true },
        { letter: 'c', text: 'Usar apenas perfis anônimos', isCorrect: false },
        { letter: 'd', text: 'Nunca usar redes sociais', isCorrect: false },
        { letter: 'e', text: 'Postar apenas conteúdo polêmico', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Por que é importante revisar as configurações de privacidade em redes sociais?',
      explanation: 'Revisar configurações de privacidade ajuda a controlar quem pode ver suas informações pessoais e proteger sua privacidade.',
      options: [
        { letter: 'a', text: 'Não é importante, tudo pode ser público', isCorrect: false },
        { letter: 'b', text: 'Para controlar quem pode ver suas informações pessoais', isCorrect: true },
        { letter: 'c', text: 'Apenas para esconder posts antigos', isCorrect: false },
        { letter: 'd', text: 'Somente se você for uma pessoa famosa', isCorrect: false },
        { letter: 'e', text: 'Para evitar que amigos vejam seu perfil', isCorrect: false },
      ],
    },
  ],
  'Compartilhar e publicar': [
    {
      id: 1,
      text: 'O que você deve verificar antes de compartilhar uma notícia nas redes sociais?',
      explanation: 'Verificar a veracidade da fonte e o conteúdo completo ajuda a evitar a disseminação de informações falsas.',
      options: [
        { letter: 'a', text: 'Apenas o título', isCorrect: false },
        { letter: 'b', text: 'A veracidade da fonte e o conteúdo completo', isCorrect: true },
        { letter: 'c', text: 'Quantas curtidas o post tem', isCorrect: false },
        { letter: 'd', text: 'Nada, pode compartilhar imediatamente', isCorrect: false },
        { letter: 'e', text: 'Se o título é sensacionalista', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'O que são direitos autorais em conteúdo digital?',
      explanation: 'Direitos autorais protegem legalmente o criador sobre seu trabalho original, garantindo que ele seja reconhecido e respeitado.',
      options: [
        { letter: 'a', text: 'Permissão automática para usar qualquer conteúdo da internet', isCorrect: false },
        { letter: 'b', text: 'Proteção legal do criador sobre seu trabalho original', isCorrect: true },
        { letter: 'c', text: 'Uma taxa que deve ser paga para postar online', isCorrect: false },
        { letter: 'd', text: 'Regras apenas para empresas grandes', isCorrect: false },
        { letter: 'e', text: 'Permissão para modificar qualquer conteúdo', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Qual é a forma correta de compartilhar um documento colaborativo?',
      explanation: 'Usar link de compartilhamento com permissões adequadas ajuda a garantir que apenas as pessoas autorizadas possam acessar e editar o documento.',
      options: [
        { letter: 'a', text: 'Enviar uma captura de tela por WhatsApp', isCorrect: false },
        { letter: 'b', text: 'Usar link de compartilhamento com permissões adequadas', isCorrect: true },
        { letter: 'c', text: 'Copiar e colar o conteúdo em um e-mail', isCorrect: false },
        { letter: 'd', text: 'Imprimir e entregar pessoalmente', isCorrect: false },
        { letter: 'e', text: 'Postar em redes sociais públicas', isCorrect: false },
      ],
    },
  ],
  'Colaborar': [
    {
      id: 1,
      text: 'Qual ferramenta é ideal para trabalhar simultaneamente em um documento com outras pessoas?',
      explanation: 'Google Docs ou Microsoft 365 Online permitem que várias pessoas trabalhem no mesmo documento ao mesmo tempo.',
      options: [
        { letter: 'a', text: 'Microsoft Word instalado no computador', isCorrect: false },
        { letter: 'b', text: 'Google Docs ou Microsoft 365 Online', isCorrect: true },
        { letter: 'c', text: 'Bloco de notas', isCorrect: false },
        { letter: 'd', text: 'Enviar o arquivo por e-mail repetidamente', isCorrect: false },
        { letter: 'e', text: 'Paint', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'O que é importante ao colaborar em projetos digitais em equipe?',
      explanation: 'Comunicar-se claramente e respeitar contribuições dos outros ajuda a garantir que o projeto seja bem-sucedido.',
      options: [
        { letter: 'a', text: 'Trabalhar isoladamente sem comunicação', isCorrect: false },
        { letter: 'b', text: 'Comunicar-se claramente e respeitar contribuições dos outros', isCorrect: true },
        { letter: 'c', text: 'Fazer todas as alterações sem avisar a equipe', isCorrect: false },
        { letter: 'd', text: 'Ignorar prazos e combinados', isCorrect: false },
        { letter: 'e', text: 'Delegar tudo para os outros', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Para gerenciar tarefas em equipe, qual tipo de ferramenta é recomendada?',
      explanation: 'Trello, Asana ou Microsoft Planner são ferramentas eficazes para gerenciar tarefas e projetos em equipe.',
      options: [
        { letter: 'a', text: 'Calculadora', isCorrect: false },
        { letter: 'b', text: 'Trello, Asana ou Microsoft Planner', isCorrect: true },
        { letter: 'c', text: 'Paint', isCorrect: false },
        { letter: 'd', text: 'Media Player', isCorrect: false },
        { letter: 'e', text: 'Bloco de notas', isCorrect: false },
      ],
    },
  ],
  'Programar sistemas': [
    {
      id: 1,
      text: 'O que é um algoritmo?',
      explanation: 'Um algoritmo é uma sequência lógica de passos para resolver um problema, usado em programação e computação.',
      options: [
        { letter: 'a', text: 'Um tipo de vírus de computador', isCorrect: false },
        { letter: 'b', text: 'Uma sequência lógica de passos para resolver um problema', isCorrect: true },
        { letter: 'c', text: 'Um software pago', isCorrect: false },
        { letter: 'd', text: 'Uma marca de computador', isCorrect: false },
        { letter: 'e', text: 'Um tipo de linguagem de programação', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Qual linguagem é mais usada para criar páginas web?',
      explanation: 'HTML é a linguagem mais usada para estruturar e criar páginas web.',
      options: [
        { letter: 'a', text: 'Python', isCorrect: false },
        { letter: 'b', text: 'HTML', isCorrect: true },
        { letter: 'c', text: 'Java', isCorrect: false },
        { letter: 'd', text: 'C++', isCorrect: false },
        { letter: 'e', text: 'Ruby', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'O que significa "bug" em programação?',
      explanation: 'Um bug é um erro no código do programa que pode causar comportamentos inesperados ou falhas.',
      options: [
        { letter: 'a', text: 'Um inseto que entrou no computador', isCorrect: false },
        { letter: 'b', text: 'Um erro no código do programa', isCorrect: true },
        { letter: 'c', text: 'Uma nova funcionalidade', isCorrect: false },
        { letter: 'd', text: 'Um tipo de vírus', isCorrect: false },
        { letter: 'e', text: 'Uma atualização do sistema', isCorrect: false },
      ],
    },
  ],
};
