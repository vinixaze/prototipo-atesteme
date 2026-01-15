export interface Question {
  id: number;
  text: string;
  image?: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
  category: string;
  categoryColor: string;
  area: string;
  competency: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text:
      "A imagem abaixo apresenta uma parte de um aparelho eletrônico. Selecione a opção que indica de qual aparelho se trata.",
    image:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?w=600&h=400&fit=crop",
    options: [
      { letter: "a", text: "Teclado de computador", isCorrect: true },
      { letter: "b", text: "Mouse sem fio", isCorrect: false },
      { letter: "c", text: "Controle remoto", isCorrect: false },
      { letter: "d", text: "Tablet", isCorrect: false },
      { letter: "e", text: "Smartphone", isCorrect: false },
    ],
    category: "INFORMAÇÕES E DADOS",
    categoryColor: "#FFD700",
    area: "Informações e Dados",
    competency: "Navegação e Pesquisa",
  },
  {
    id: 2,
    text: "Qual das opções abaixo representa um navegador de internet?",
    options: [
      { letter: "a", text: "Microsoft Word", isCorrect: false },
      { letter: "b", text: "Google Chrome", isCorrect: true },
      { letter: "c", text: "Adobe Photoshop", isCorrect: false },
      { letter: "d", text: "Windows Media Player", isCorrect: false },
      { letter: "e", text: "Microsoft Excel", isCorrect: false },
    ],
    category: "COMUNICAÇÃO E COLABORAÇÃO",
    categoryColor: "#00BCD4",
    area: "Comunicação e Colaboração",
    competency: "Interação por Meios Digitais",
  },
  {
    id: 3,
    text: 'O que significa "WWW" em um endereço de site?',
    options: [
      { letter: "a", text: "World Wide Web", isCorrect: true },
      { letter: "b", text: "World Web Work", isCorrect: false },
      { letter: "c", text: "Web World Wide", isCorrect: false },
      { letter: "d", text: "Wireless Web World", isCorrect: false },
      { letter: "e", text: "Web Wide World", isCorrect: false },
    ],
    category: "PROTEÇÃO E SEGURANÇA",
    categoryColor: "#4CAF50",
    area: "Proteção e Segurança",
    competency: "Proteção de Dados Pessoais",
  },
];

export const explanations = [
  "O teclado é um dos principais dispositivos de entrada de dados em um computador, permitindo a digitação de textos e comandos.",
  "Google Chrome é um navegador de internet desenvolvido pelo Google, usado para acessar páginas da web. Os demais são programas com outras finalidades.",
  'WWW significa "World Wide Web", que é o sistema de documentos interligados acessíveis pela internet através de navegadores.',
];
