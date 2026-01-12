import type { QuizQuestion } from './types';

export const quizQuestionsPartThree: Record<string, QuizQuestion[]> = {
  'Editar texto multimídia': [
    {
      id: 1,
      text: 'Qual formato de imagem preserva a transparência?',
      explanation: 'PNG é o formato de imagem que preserva a transparência, permitindo que partes da imagem sejam transparentes.',
      options: [
        { letter: 'a', text: 'JPG', isCorrect: false },
        { letter: 'b', text: 'PNG', isCorrect: true },
        { letter: 'c', text: 'BMP', isCorrect: false },
        { letter: 'd', text: 'TXT', isCorrect: false },
        { letter: 'e', text: 'PDF', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'O que é resolução de imagem?',
      explanation: 'Resolução de imagem é a quantidade de pixels por polegada (DPI/PPI), que afeta a qualidade e o tamanho da imagem.',
      options: [
        { letter: 'a', text: 'O tamanho do arquivo em MB', isCorrect: false },
        { letter: 'b', text: 'A quantidade de pixels por polegada (DPI/PPI)', isCorrect: true },
        { letter: 'c', text: 'O tempo de carregamento da imagem', isCorrect: false },
        { letter: 'd', text: 'A marca da câmera usada', isCorrect: false },
        { letter: 'e', text: 'O formato do arquivo', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Qual software é popular para edição de vídeos?',
      explanation: 'Adobe Premiere ou DaVinci Resolve são softwares populares e poderosos para edição de vídeos.',
      options: [
        { letter: 'a', text: 'Microsoft Word', isCorrect: false },
        { letter: 'b', text: 'Adobe Premiere ou DaVinci Resolve', isCorrect: true },
        { letter: 'c', text: 'Excel', isCorrect: false },
        { letter: 'd', text: 'Bloco de Notas', isCorrect: false },
        { letter: 'e', text: 'Calculadora', isCorrect: false },
      ],
    },
  ],
  'Editar texto escrito': [
    {
      id: 1,
      text: 'Qual é a extensão de arquivo do Microsoft Word?',
      explanation: 'A extensão de arquivo do Microsoft Word é .docx.',
      options: [
        { letter: 'a', text: '.txt', isCorrect: false },
        { letter: 'b', text: '.docx', isCorrect: true },
        { letter: 'c', text: '.pdf', isCorrect: false },
        { letter: 'd', text: '.jpg', isCorrect: false },
        { letter: 'e', text: '.xlsx', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'O que faz o atalho Ctrl+B (ou Cmd+B no Mac)?',
      explanation: 'O atalho Ctrl+B (ou Cmd+B no Mac) deixa o texto selecionado em negrito.',
      options: [
        { letter: 'a', text: 'Salvar o documento', isCorrect: false },
        { letter: 'b', text: 'Deixar o texto em negrito', isCorrect: true },
        { letter: 'c', text: 'Copiar o texto', isCorrect: false },
        { letter: 'd', text: 'Fechar o programa', isCorrect: false },
        { letter: 'e', text: 'Abrir um novo documento', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Para que serve a ferramenta "Localizar e Substituir"?',
      explanation: 'A ferramenta "Localizar e Substituir" ajuda a encontrar palavras e substituí-las por outras automaticamente.',
      options: [
        { letter: 'a', text: 'Mudar a cor do texto', isCorrect: false },
        { letter: 'b', text: 'Encontrar palavras e substituí-las por outras automaticamente', isCorrect: true },
        { letter: 'c', text: 'Inserir imagens', isCorrect: false },
        { letter: 'd', text: 'Imprimir o documento', isCorrect: false },
        { letter: 'e', text: 'Alterar o formato do arquivo', isCorrect: false },
      ],
    },
  ],
  'Adaptar arquivos': [
    {
      id: 1,
      text: 'O que significa converter um arquivo para PDF?',
      explanation: 'Converter um arquivo para PDF transforma-o em um formato universal e não editável, preservando a formatação.',
      options: [
        { letter: 'a', text: 'Deletar o arquivo original', isCorrect: false },
        { letter: 'b', text: 'Transformar em um formato universal e não editável', isCorrect: true },
        { letter: 'c', text: 'Comprimir o arquivo para ocupar menos espaço', isCorrect: false },
        { letter: 'd', text: 'Enviar por e-mail automaticamente', isCorrect: false },
        { letter: 'e', text: 'Imprimir o documento', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Para reduzir o tamanho de um arquivo de imagem, você deve:',
      explanation: 'Redimensionar ou comprimir a imagem ajuda a reduzir seu tamanho sem comprometer muito a qualidade.',
      options: [
        { letter: 'a', text: 'Renomear o arquivo', isCorrect: false },
        { letter: 'b', text: 'Redimensionar ou comprimir a imagem', isCorrect: true },
        { letter: 'c', text: 'Mudar a extensão do arquivo', isCorrect: false },
        { letter: 'd', text: 'Deletar metadados', isCorrect: false },
        { letter: 'e', text: 'Converter para PDF', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'O que é um arquivo compactado (.zip, .rar)?',
      explanation: 'Um arquivo compactado agrupa e reduz o tamanho de outros arquivos, facilitando o armazenamento e compartilhamento.',
      options: [
        { letter: 'a', text: 'Um arquivo corrompido', isCorrect: false },
        { letter: 'b', text: 'Um arquivo que agrupa e reduz o tamanho de outros arquivos', isCorrect: true },
        { letter: 'c', text: 'Um tipo de vírus', isCorrect: false },
        { letter: 'd', text: 'Um formato de imagem', isCorrect: false },
        { letter: 'e', text: 'Um documento de texto', isCorrect: false },
      ],
    },
  ],
  'Proteger o ambiente digital': [
    {
      id: 1,
      text: 'O que é um antivírus?',
      explanation: 'Um antivírus é software que detecta e remove ameaças digitais, como vírus e malware, protegendo o sistema.',
      options: [
        { letter: 'a', text: 'Um tipo de vírus perigoso', isCorrect: false },
        { letter: 'b', text: 'Software que detecta e remove ameaças digitais', isCorrect: true },
        { letter: 'c', text: 'Um navegador de internet', isCorrect: false },
        { letter: 'd', text: 'Uma ferramenta de edição de texto', isCorrect: false },
        { letter: 'e', text: 'Um tipo de firewall', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'O que você deve fazer ao receber um e-mail suspeito de remetente desconhecido?',
      explanation: 'Não abrir anexos e marcar como spam ajuda a evitar a instalação de malware ou roubo de informações.',
      options: [
        { letter: 'a', text: 'Clicar em todos os links para verificar', isCorrect: false },
        { letter: 'b', text: 'Não abrir anexos e marcar como spam', isCorrect: true },
        { letter: 'c', text: 'Responder perguntando quem é', isCorrect: false },
        { letter: 'd', text: 'Encaminhar para todos os contatos', isCorrect: false },
        { letter: 'e', text: 'Baixar todos os anexos', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'O que é phishing?',
      explanation: 'Phishing é uma tentativa de roubar dados pessoais através de mensagens falsas que parecem ser de fontes confiáveis.',
      options: [
        { letter: 'a', text: 'Um tipo de pesca esportiva', isCorrect: false },
        { letter: 'b', text: 'Tentativa de roubar dados pessoais através de mensagens falsas', isCorrect: true },
        { letter: 'c', text: 'Um jogo online', isCorrect: false },
        { letter: 'd', text: 'Uma rede social', isCorrect: false },
        { letter: 'e', text: 'Um tipo de antivírus', isCorrect: false },
      ],
    },
  ],
};
