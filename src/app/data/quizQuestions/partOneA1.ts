import type { QuizQuestion } from './types';
export const quizQuestionsPartOneA1: Record<string, QuizQuestion[]> = {
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
};
