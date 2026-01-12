import type { QuizQuestion } from './types';

export const quizQuestionsPartOneB: Record<string, QuizQuestion[]> = {
  'Gerenciar dados': [
    {
      id: 1,
      text: 'Qual é a melhor prática para nomear arquivos digitais?',
      explanation: 'Usar nomes descritivos com data ajuda a identificar e organizar arquivos facilmente.',
      options: [
        { letter: 'a', text: 'Usar apenas números aleatórios', isCorrect: false },
        { letter: 'b', text: 'Usar nomes descritivos com data (ex: relatorio_vendas_2024-12)', isCorrect: true },
        { letter: 'c', text: 'Deixar com o nome padrão (ex: documento1.docx)', isCorrect: false },
        { letter: 'd', text: 'Usar apenas emojis', isCorrect: false },
        { letter: 'e', text: 'Usar caracteres especiais e símbolos', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'O que é armazenamento em nuvem?',
      explanation: 'Armazenar dados em servidores online acessíveis pela internet permite acesso remoto e segurança.',
      options: [
        { letter: 'a', text: 'Guardar arquivos em um HD externo', isCorrect: false },
        { letter: 'b', text: 'Armazenar dados em servidores online acessíveis pela internet', isCorrect: true },
        { letter: 'c', text: 'Salvar arquivos na área de trabalho', isCorrect: false },
        { letter: 'd', text: 'Imprimir documentos', isCorrect: false },
        { letter: 'e', text: 'Guardar em pen drive', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Com que frequência você deve fazer backup de dados importantes?',
      explanation: 'Fazer backup regularmente, seguindo a regra 3-2-1, ajuda a proteger dados importantes contra perda.',
      options: [
        { letter: 'a', text: 'Nunca, pois os dados estão seguros no computador', isCorrect: false },
        { letter: 'b', text: 'Regularmente, seguindo a regra 3-2-1 (3 cópias, 2 mídias, 1 externa)', isCorrect: true },
        { letter: 'c', text: 'Apenas uma vez por ano', isCorrect: false },
        { letter: 'd', text: 'Somente quando o computador apresentar problemas', isCorrect: false },
        { letter: 'e', text: 'Apenas antes de viajar', isCorrect: false },
      ],
    },
  ],
  'Interagir': [
    {
      id: 1,
      text: 'Qual é a forma mais apropriada de se comunicar profissionalmente por e-mail?',
      explanation: 'Ser claro, educado e usar assunto descritivo ajuda a garantir que a mensagem seja compreendida.',
      options: [
        { letter: 'a', text: 'Usar abreviações e gírias', isCorrect: false },
        { letter: 'b', text: 'Ser claro, educado e usar assunto descritivo', isCorrect: true },
        { letter: 'c', text: 'Escrever tudo em letras maiúsculas', isCorrect: false },
        { letter: 'd', text: 'Não incluir saudações ou despedidas', isCorrect: false },
        { letter: 'e', text: 'Usar apenas emojis para se expressar', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Em videoconferências, qual é uma boa prática de etiqueta digital?',
      explanation: 'Silenciar o microfone quando não estiver falando ajuda a reduzir ruídos e distrações.',
      options: [
        { letter: 'a', text: 'Manter o microfone sempre aberto mesmo com barulho ao fundo', isCorrect: false },
        { letter: 'b', text: 'Silenciar o microfone quando não estiver falando', isCorrect: true },
        { letter: 'c', text: 'Nunca ligar a câmera', isCorrect: false },
        { letter: 'd', text: 'Fazer outras tarefas enquanto os outros falam', isCorrect: false },
        { letter: 'e', text: 'Comer durante a reunião com câmera ligada', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'O que significa "CC" em um e-mail?',
      explanation: 'CC significa "Com Cópia" e é usado para enviar cópias do e-mail para outras pessoas.',
      options: [
        { letter: 'a', text: 'Cancelar Comunicação', isCorrect: false },
        { letter: 'b', text: 'Com Cópia (enviar cópia para outras pessoas)', isCorrect: true },
        { letter: 'c', text: 'Conteúdo Confidencial', isCorrect: false },
        { letter: 'd', text: 'Correção de Conteúdo', isCorrect: false },
        { letter: 'e', text: 'Cópia Cancelada', isCorrect: false },
      ],
    },
  ],
};
