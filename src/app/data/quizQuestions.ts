export interface QuizQuestion {
  id: number;
  text: string;
  explanation: string;
  htmlContent?: string; // HTML interativo opcional
  showRotateHint?: boolean; // Mostra aviso para girar tela no mobile
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export const quizQuestions: Record<string, QuizQuestion[]> = {
  // INFORMA�?�.ES E DADOS
  'Realizar pesquisa e monitoramento': [
    {
      id: 1,
      text: 'Qual é a melhor estratégia para avaliar a confiabilidade de uma fonte de informação online?',
      explanation: 'Verificar a data de publicação, autor e referências citadas ajuda a garantir que a informação é atual e confiável.',
      options: [
        { letter: 'a', text: 'Verificar apenas o título da página', isCorrect: false },
        { letter: 'b', text: 'Checar a data de publicação, autor e referências citadas', isCorrect: true },
        { letter: 'c', text: 'Confiar em qualquer site que apareça no Google', isCorrect: false },
        { letter: 'd', text: 'Usar apenas redes sociais como fonte', isCorrect: false },
        { letter: 'e', text: 'Aceitar informações sem verificar a credibilidade', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'O que são "operadores booleanos" em pesquisas online?',
      explanation: 'Termos como AND, OR, NOT que refinam buscas ajudam a encontrar informações mais precisas.',
      options: [
        { letter: 'a', text: 'Termos como AND, OR, NOT que refinam buscas', isCorrect: true },
        { letter: 'b', text: 'Códigos de programação', isCorrect: false },
        { letter: 'c', text: 'Tipos de sites de busca', isCorrect: false },
        { letter: 'd', text: 'Filtros automáticos do navegador', isCorrect: false },
        { letter: 'e', text: 'Extensões de arquivos de texto', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'Luana quer pesquisar Botas na cor Azul. Use o sistema de filtros interativo abaixo e responda: Quantos resultados serão encontrados quando Luana aplicar os filtros corretos?',
      explanation: 'Ao selecionar "Botas" (22 resultados) e "Azul" (8 resultados), o sistema soma os valores: 22 + 8 = 30 resultados.',
      htmlContent: `<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Windows Simulation</title>
    <style>
        /* Estilos gerais */
        body {
            margin: 0;
            padding: 20px;
            font-family: sans-serif;
            /* Fonte solicitada */
            background-color: #e0e0e0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            box-sizing: border-box;
        }

        /* Título da busca fora da janela */
        .search-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.25rem;
            /* Responsivo */
            font-weight: bold;
            color: #333;
        }

        /* Estilo da janela */
        .window {
            width: 100%;
            /* Ocupa 100% do espaço disponível... */
            max-width: 400px;
            /* ...até o limite de 400px (tablet/desktop) */
            height: auto;
            /* Altura se ajusta ao conteúdo */
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            /* Leve arredondamento para mobile */
            overflow: hidden;
            /* Garante que filhos não vazem */
        }

        /* Barra de título */
        .title-bar {
            background-color: rgb(252 216 30);
            /* Cor solicitada */
            color: #000;
            /* Texto preto para contraste com amarelo */
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

        .close-button,
        .minimize-button,
        .maximize-button {
            width: 15px;
            height: 15px;
            margin-left: 8px;
            border-radius: 50%;
            /* Estilo bolinha mac/win moderno */
        }

        .close-button {
            background-color: #ff3b30;
        }

        .minimize-button {
            background-color: #003aff;
        }

        .maximize-button {
            background-color: #4cd964;
        }

        /* Conteúdo da janela */
        .content {
            padding: 20px;
            display: flex;
            flex-direction: column;
        }

        /* Estilo para os filtros */
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
            /* Tamanho bom para toque no celular */
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
            /* Largura total no mobile */
            box-sizing: border-box;
            background-color: white;
        }

        button {
            padding: 12px;
            background-color: rgb(252 216 30);
            /* Cor solicitada */
            color: black;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-weight: bold;
            width: 100%;
            /* Botão full width para mobile */
            margin-top: 10px;
            font-size: 16px;
        }

        button:hover {
            background-color: rgb(212, 180, 20);
            /* Amarelo um pouco mais escuro */
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

        /* Ajustes específicos para telas muito pequenas */
        @media (max-width: 350px) {
            .search-title {
                font-size: 1rem;
            }
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

            const shoeResults = {
                "tennis": 26,
                "shoes": 39,
                "boots": 22,
                "sandals": 14,
                "flats": 24
            };

            const colorResults = {
                "blue": 8,
                "green": 6,
                "red": 9,
                "black": 19,
                "pink": 8,
                "yellow": 6,
                "purple": 4,
                "white": 14
            };

            applyFiltersButton.addEventListener("click", function () {
                const selectedShoe = shoeFilter.value;
                const selectedColor = colorFilter.value;

                let shoeCount = shoeResults[selectedShoe];
                let colorCount = colorResults[selectedColor];

                if (!shoeCount) shoeCount = 0;
                if (!colorCount) colorCount = 0;

                const resultMessage = 'Foi encontrado ' + (shoeCount + colorCount) + ' resultados.';
                resultText.textContent = resultMessage;
            });
        });
    </script>
</body>

</html>`,
      showRotateHint: true,
      options: [
        { letter: 'a', text: '22 resultados', isCorrect: false },
        { letter: 'b', text: '30 resultados', isCorrect: true },
        { letter: 'c', text: '8 resultados', isCorrect: false },
        { letter: 'd', text: '14 resultados', isCorrect: false },
        { letter: 'e', text: '50 resultados', isCorrect: false },
      ],
    },
  ],

  'Realizar o tratamento de dados': [
    {
      id: 1,
      text: 'O que significa "limpar dados" em um contexto de análise?',
      explanation: 'Remover dados duplicados, incorretos ou irrelevantes ajuda a garantir a precisão dos resultados.',
      options: [
        { letter: 'a', text: 'Deletar todos os dados antigos', isCorrect: false },
        { letter: 'b', text: 'Remover dados duplicados, incorretos ou irrelevantes', isCorrect: true },
        { letter: 'c', text: 'Formatar o computador', isCorrect: false },
        { letter: 'd', text: 'Organizar arquivos em pastas', isCorrect: false },
        { letter: 'e', text: 'Apagar o histórico do navegador', isCorrect: false },
      ],
    },
    {
      id: 2,
      text: 'Qual ferramenta é mais adequada para organizar e analisar grandes volumes de dados tabulares?',
      explanation: 'Microsoft Excel ou Google Sheets são excelentes para manipular e analisar dados em formato tabular.',
      options: [
        { letter: 'a', text: 'Microsoft Word', isCorrect: false },
        { letter: 'b', text: 'Microsoft Excel ou Google Sheets', isCorrect: true },
        { letter: 'c', text: 'Bloco de notas', isCorrect: false },
        { letter: 'd', text: 'PowerPoint', isCorrect: false },
        { letter: 'e', text: 'Windows Media Player', isCorrect: false },
      ],
    },
    {
      id: 3,
      text: 'O que é uma "célula" em uma planilha eletrônica?',
      explanation: 'A interseção entre uma linha e uma coluna forma uma célula, que pode conter dados ou fórmulas.',
      options: [
        { letter: 'a', text: 'Um tipo de fórmula matemática', isCorrect: false },
        { letter: 'b', text: 'A interseção entre uma linha e uma coluna', isCorrect: true },
        { letter: 'c', text: 'Um gráfico de dados', isCorrect: false },
        { letter: 'd', text: 'Um arquivo de backup', isCorrect: false },
        { letter: 'e', text: 'Uma aba da planilha', isCorrect: false },
      ],
    },
  ],

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

  // COMUNICA�?�fO E COLABORA�?�fO
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

  // CRIA�?�fO DE CONTE�sDO
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

  // PROTE�?�fO E SEGURAN�?A
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
        { letter: 'a', text: '�? muito lento', isCorrect: false },
        { letter: 'b', text: 'Pode ser inseguro e permitir interceptação de dados', isCorrect: true },
        { letter: 'c', text: '�? ilegal', isCorrect: false },
        { letter: 'd', text: 'Gasta muita bateria', isCorrect: false },
        { letter: 'e', text: '�? muito caro', isCorrect: false },
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

  // RESOLU�?�fO DE PROBLEMAS
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