export const competencyTestQuestions = [
  {
  id: 1,
  category: 'INFORMAÇÕES E DADOS',
  categoryColor: '#FFD700',
  competency: '1.1 Navegar, pesquisar e filtrar dados',
  text: 'Luana está utilizando filtros em uma loja online para encontrar botas na cor azul. Execute a simulação abaixo, aplique os filtros corretamente e responda: qual o número total de resultados encontrados?',
  interactiveHtml: `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: sans-serif;
            background-color: #e0e0e0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            box-sizing: border-box;
        }
        .search-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.25rem;
            font-weight: bold;
            color: #333;
        }
        .window {
            width: 100%;
            max-width: 400px;
            height: auto;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            overflow: hidden;
        }
        .title-bar {
            background-color: rgb(252 216 30);
            color: #000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 15px;
        }
        .title {
            font-weight: bold;
        }
        .buttons {
            display: flex;
        }
        .close-button, .minimize-button, .maximize-button {
            width: 15px;
            height: 15px;
            margin-left: 8px;
            border-radius: 50%;
        }
        .close-button { background-color: #ff3b30; }
        .minimize-button { background-color: #003aff; }
        .maximize-button { background-color: #4cd964; }
        .content {
            padding: 20px;
            display: flex;
            flex-direction: column;
        }
        .filter-section {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .filter-section p {
            margin: 0;
            font-weight: bold;
            font-size: 0.9rem;
        }
        select {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
            box-sizing: border-box;
            background-color: white;
        }
        button {
            padding: 12px;
            background-color: rgb(252 216 30);
            color: black;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-weight: bold;
            width: 100%;
            margin-top: 10px;
            font-size: 16px;
        }
        button:hover {
            background-color: rgb(212, 180, 20);
        }
        .divider {
            margin: 20px 0;
            border: none;
            border-top: 1px solid #ccc;
        }
        .result-section {
            text-align: center;
        }
        #result-text {
            font-weight: bold;
            font-size: 18px;
            color: #333;
        }
        @media (max-width: 350px) {
            .search-title { font-size: 1rem; }
        }
    </style>
</head>
<body>
    <h1 id="search-title" class="search-title">Luana quer pesquisar Botas na cor Azul</h1>
    <div class="window">
        <div class="title-bar">
            <span class="title">Filtro:</span>
            <div class="buttons">
                <div class="close-button"></div>
                <div class="minimize-button"></div>
                <div class="maximize-button"></div>
            </div>
        </div>
        <div class="content">
            <div class="filter-section">
                <p>Selecione um tipo de calçado:</p>
                <select id="shoe-filter">
                    <option value="tennis">Tênis</option>
                    <option value="shoes">Sapatos</option>
                    <option value="boots">Botas</option>
                    <option value="sandals">Sandálias</option>
                    <option value="flats">Sapatilhas</option>
                </select>
                <p>Selecione uma cor:</p>
                <select id="color-filter">
                    <option value="blue">Azul</option>
                    <option value="green">Verde</option>
                    <option value="red">Vermelho</option>
                    <option value="black">Preto</option>
                    <option value="pink">Rosa</option>
                    <option value="yellow">Amarelo</option>
                    <option value="purple">Roxo</option>
                    <option value="white">Branco</option>
                </select>
                <button id="apply-filters-button">Aplicar</button>
            </div>
            <hr class="divider">
            <div class="result-section">
                <p id="result-text"></p>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const applyFiltersButton = document.getElementById("apply-filters-button");
            const shoeFilter = document.getElementById("shoe-filter");
            const colorFilter = document.getElementById("color-filter");
            const resultText = document.getElementById("result-text");
            const shoeResults = { "tennis": 26, "shoes": 39, "boots": 22, "sandals": 14, "flats": 24 };
            const colorResults = { "blue": 8, "green": 6, "red": 9, "black": 19, "pink": 8, "yellow": 6, "purple": 4, "white": 14 };
            applyFiltersButton.addEventListener("click", function () {
                const selectedShoe = shoeFilter.value;
                const selectedColor = colorFilter.value;
                let shoeCount = shoeResults[selectedShoe] || 0;
                let colorCount = colorResults[selectedColor] || 0;
                resultText.textContent = "Foi encontrado " + (shoeCount + colorCount) + " resultados.";
            });
        });
    </script>
</body>
</html>
`,
  options: [
    { letter: 'a', text: 'Foi encontrado 26 resultados.', isCorrect: false },
    { letter: 'b', text: 'Foi encontrado 30 resultados.', isCorrect: true },
    { letter: 'c', text: 'Foi encontrado 15 resultados.', isCorrect: false },
    { letter: 'd', text: 'Foi encontrado 22 resultados.', isCorrect: false },
    { letter: 'e', text: 'Foi encontrado 8 resultados.', isCorrect: false },
  ],
},
  {
    id: 2,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    competency: '1.2 Avaliar dados e informações',
    text: 'Como você pode identificar uma notícia falsa (fake news)?',
    options: [
      { letter: 'a', text: 'Pelo número de compartilhamentos', isCorrect: false },
      { letter: 'b', text: 'Verificando a fonte, data e checando fatos', isCorrect: true },
      { letter: 'c', text: 'Pelo título sensacionalista', isCorrect: false },
      { letter: 'd', text: 'Pelos comentários das pessoas', isCorrect: false },
      { letter: 'e', text: 'Pela quantidade de curtidas', isCorrect: false },
    ],
  },
  {
    id: 3,
    category: 'INFORMAÇÕES E DADOS',
    categoryColor: '#FFD700',
    competency: '1.3 Gerenciar dados e informações',
    text: 'Qual é a melhor forma de organizar seus arquivos digitais?',
    options: [
      { letter: 'a', text: 'Salvar tudo na área de trabalho', isCorrect: false },
      { letter: 'b', text: 'Criar pastas com nomes claros e categorias', isCorrect: true },
      { letter: 'c', text: 'Deixar tudo em Downloads', isCorrect: false },
      { letter: 'd', text: 'Não organizar, usar a busca quando precisar', isCorrect: false },
      { letter: 'e', text: 'Manter todos os arquivos em uma única pasta', isCorrect: false },
    ],
  },
  {
    id: 4,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    competency: '2.1 Interagir através de tecnologias',
    text: 'Qual ferramenta é mais apropriada para videoconferências profissionais?',
    options: [
      { letter: 'a', text: 'Instagram Stories', isCorrect: false },
      { letter: 'b', text: 'Google Meet ou Zoom', isCorrect: true },
      { letter: 'c', text: 'WhatsApp Status', isCorrect: false },
      { letter: 'd', text: 'TikTok', isCorrect: false },
      { letter: 'e', text: 'Facebook Reels', isCorrect: false },
    ],
  },
  {
    id: 5,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    competency: '2.2 Compartilhar através de tecnologias',
    text: 'Ao compartilhar um documento para trabalho colaborativo, você deve:',
    options: [
      { letter: 'a', text: 'Enviar por e-mail para cada pessoa', isCorrect: false },
      { letter: 'b', text: 'Usar Google Docs ou OneDrive compartilhado', isCorrect: true },
      { letter: 'c', text: 'Imprimir e distribuir cópias', isCorrect: false },
      { letter: 'd', text: 'Postar em redes sociais públicas', isCorrect: false },
      { letter: 'e', text: 'Enviar por mensagem de texto', isCorrect: false },
    ],
  },
  {
    id: 6,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    competency: '2.3 Participar da cidadania através de tecnologias',
    text: 'Como a tecnologia pode promover a cidadania digital?',
    options: [
      { letter: 'a', text: 'Permitindo participação em consultas públicas online', isCorrect: true },
      { letter: 'b', text: 'Restringindo acesso à informação', isCorrect: false },
      { letter: 'c', text: 'Isolando comunidades', isCorrect: false },
      { letter: 'd', text: 'Dificultando o diálogo', isCorrect: false },
      { letter: 'e', text: 'Limitando a comunicação entre cidadãos', isCorrect: false },
    ],
  },
  {
    id: 7,
    category: 'COMUNICAÇÃO E COLABORAÇÃO',
    categoryColor: '#00BCD4',
    competency: '2.4 Colaborar através de tecnologias',
    text: 'Qual é uma boa prática em trabalho colaborativo online?',
    options: [
      { letter: 'a', text: 'Trabalhar isoladamente e juntar no final', isCorrect: false },
      { letter: 'b', text: 'Comunicar-se regularmente e compartilhar progresso', isCorrect: true },
      { letter: 'c', text: 'Não compartilhar ideias até a conclusão', isCorrect: false },
      { letter: 'd', text: 'Ignorar as contribuições dos outros', isCorrect: false },
      { letter: 'e', text: 'Evitar feedback da equipe', isCorrect: false },
    ],
  },
  {
    id: 8,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    competency: '3.1 Desenvolver conteúdo digital',
    text: 'Qual ferramenta é adequada para criar uma apresentação digital?',
    options: [
      { letter: 'a', text: 'Microsoft PowerPoint ou Google Slides', isCorrect: true },
      { letter: 'b', text: 'Bloco de notas', isCorrect: false },
      { letter: 'c', text: 'Calculadora', isCorrect: false },
      { letter: 'd', text: 'Paint', isCorrect: false },
      { letter: 'e', text: 'Windows Explorer', isCorrect: false },
    ],
  },
  {
    id: 9,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    competency: '3.2 Integrar e reelaborar conteúdo digital',
    text: 'Ao usar conteúdo de terceiros, você deve:',
    options: [
      { letter: 'a', text: 'Copiar sem citar a fonte', isCorrect: false },
      { letter: 'b', text: 'Dar créditos e citar a fonte original', isCorrect: true },
      { letter: 'c', text: 'Modificar levemente e usar como próprio', isCorrect: false },
      { letter: 'd', text: 'Usar apenas se for popular', isCorrect: false },
      { letter: 'e', text: 'Remover marcas d\'água e usar livremente', isCorrect: false },
    ],
  },
  {
    id: 10,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    competency: '3.3 Direitos autorais e licenças',
    text: 'O que significa uma licença Creative Commons?',
    options: [
      { letter: 'a', text: 'Conteúdo totalmente restrito', isCorrect: false },
      { letter: 'b', text: 'Permissões específicas para uso de conteúdo', isCorrect: true },
      { letter: 'c', text: 'Conteúdo gratuito sem regras', isCorrect: false },
      { letter: 'd', text: 'Apenas para uso comercial', isCorrect: false },
      { letter: 'e', text: 'Conteúdo de domínio público sem restrições', isCorrect: false },
    ],
  },
  {
    id: 11,
    category: 'CRIAÇÃO DE CONTEÚDO',
    categoryColor: '#FF9800',
    competency: '3.4 Programação',
    text: 'Qual linguagem de programação é comumente usada para web?',
    options: [
      { letter: 'a', text: 'JavaScript', isCorrect: true },
      { letter: 'b', text: 'Excel', isCorrect: false },
      { letter: 'c', text: 'Windows', isCorrect: false },
      { letter: 'd', text: 'Chrome', isCorrect: false },
      { letter: 'e', text: 'Photoshop', isCorrect: false },
    ],
  },
  {
    id: 12,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    competency: '4.1 Proteger dispositivos',
    text: 'Qual é uma boa prática para proteger seus dispositivos?',
    options: [
      { letter: 'a', text: 'Desativar antivírus para melhor performance', isCorrect: false },
      { letter: 'b', text: 'Manter sistema e aplicativos atualizados', isCorrect: true },
      { letter: 'c', text: 'Compartilhar senhas livremente', isCorrect: false },
      { letter: 'd', text: 'Clicar em todos os links recebidos', isCorrect: false },
      { letter: 'e', text: 'Desabilitar atualizações automáticas', isCorrect: false },
    ],
  },
  {
    id: 13,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    competency: '4.2 Proteger dados pessoais',
    text: 'Como criar uma senha segura?',
    options: [
      { letter: 'a', text: 'Usar "123456"', isCorrect: false },
      { letter: 'b', text: 'Combinar letras, números e símbolos', isCorrect: true },
      { letter: 'c', text: 'Usar apenas seu nome', isCorrect: false },
      { letter: 'd', text: 'Usar a mesma senha em todos os lugares', isCorrect: false },
      { letter: 'e', text: 'Usar sequências do teclado como "qwerty"', isCorrect: false },
    ],
  },
  {
    id: 14,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    competency: '4.3 Proteger saúde e bem-estar',
    text: 'Para evitar problemas de saúde no uso de tecnologia:',
    options: [
      { letter: 'a', text: 'Fazer pausas regulares e postura adequada', isCorrect: true },
      { letter: 'b', text: 'Usar dispositivos 24 horas por dia', isCorrect: false },
      { letter: 'c', text: 'Não fazer exercícios', isCorrect: false },
      { letter: 'd', text: 'Ignorar desconfortos', isCorrect: false },
      { letter: 'e', text: 'Manter a mesma posição o dia todo', isCorrect: false },
    ],
  },
  {
    id: 15,
    category: 'PROTEÇÃO E SEGURANÇA',
    categoryColor: '#4CAF50',
    competency: '4.4 Proteger o ambiente',
    text: 'Como a tecnologia pode ser ambientalmente responsável?',
    options: [
      { letter: 'a', text: 'Descartando eletrônicos no lixo comum', isCorrect: false },
      { letter: 'b', text: 'Reciclando equipamentos e economizando energia', isCorrect: true },
      { letter: 'c', text: 'Comprando novos dispositivos todo ano', isCorrect: false },
      { letter: 'd', text: 'Deixando tudo ligado sempre', isCorrect: false },
      { letter: 'e', text: 'Trocando dispositivos funcionais por novos modelos', isCorrect: false },
    ],
  },
  {
    id: 16,
    category: 'RESOLUÇÃO DE PROBLEMAS',
    categoryColor: '#E91E63',
    competency: '5.1 Resolver problemas técnicos',
    text: 'Quando um programa não responde, você deve:',
    options: [
      { letter: 'a', text: 'Desligar o computador sem salvar', isCorrect: false },
      { letter: 'b', text: 'Usar o Gerenciador de Tarefas para fechar', isCorrect: true },
      { letter: 'c', text: 'Esperar indefinidamente', isCorrect: false },
      { letter: 'd', text: 'Jogar o computador fora', isCorrect: false },
      { letter: 'e', text: 'Reiniciar sem tentar solucionar', isCorrect: false },
    ],
  },
];
