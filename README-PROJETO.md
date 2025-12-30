# 🎓 ATESTEME - Plataforma de Educação Digital

Plataforma gamificada de educação digital com sistema de competências, níveis, conquistas e múltiplos módulos de aprendizagem.

## 🎨 Recursos Principais

### ✨ Interface
- Design minimalista e clean
- Sistema de cores por categoria de competências
- Dark mode completo
- Totalmente responsivo
- PWA (Progressive Web App) - Instalável como app

### 🎮 Gamificação
- Sistema de níveis e XP
- Conquistas e medalhas
- Pontos (Digcoins)
- Rankings (turma, escola, rede)
- Badges de competências

### 📚 Módulos Educacionais
- **Educação Digital** (Atesteme) - Cor roxa
- **Prosaeb** - Cor azul
- Troca dinâmica de tema visual entre módulos

### 🎯 Categorias de Competências
1. **Informações e Dados** - Amarelo/Dourado (#FFD700)
2. **Comunicação e Colaboração** - Azul Cyan (#00BCD4)
3. **Criação de Conteúdo** - Laranja (#FF9800)
4. **Proteção e Segurança** - Verde (#4CAF50)
5. **Resolução de Problemas** - Rosa/Magenta (#E91E63)

### 📱 Telas Principais
- Login com design split-screen
- Dashboard com sidebar gamificada
- Página de habilidades por categorias
- Página de progresso e níveis
- Sistema de quiz/desafios
- Painel de conquistas
- Controle parental
- FAQ e Acessibilidade

## 🚀 Como Rodar o Projeto

### Instalação
```bash
npm install
```

### Desenvolvimento Local
```bash
npm run dev
```
Acesse: `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 🛠️ Tecnologias Utilizadas

- **React** 18.3.1 - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** 6.3.5 - Build tool
- **Tailwind CSS** 4.1.12 - Estilização
- **Motion/React** 12.23.24 - Animações
- **Lucide React** 0.487.0 - Ícones
- **Radix UI** - Componentes acessíveis
- **Recharts** 2.15.2 - Gráficos

## 📦 Estrutura de Pastas

```
/
├── public/              # Arquivos estáticos
│   ├── icons/          # Ícones PWA
│   ├── manifest.json   # Manifesto PWA
│   └── service-worker.js
├── src/
│   ├── app/
│   │   ├── components/ # Componentes React
│   │   ├── pages/      # Páginas da aplicação
│   │   ├── data/       # Dados e conteúdos
│   │   └── utils/      # Funções utilitárias
│   ├── styles/         # Arquivos CSS
│   └── main.tsx        # Entrada da aplicação
├── package.json
└── vite.config.ts
```

## 🎨 Sistema de Cores

### Módulo Atesteme (Padrão)
- Primária: `#8B27FF` (Roxo vibrante)
- Gradientes: `from-[#8B27FF] to-[#A855F7]`

### Módulo Prosaeb
- Primária: Azul (`from-blue-500 to-blue-700`)
- Logo: Menor para caber no navbar

## 🌐 Deploy na Vercel

1. Conecte seu repositório GitHub à Vercel
2. Configure:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automático a cada push

## 📱 PWA - Progressive Web App

O projeto está configurado como PWA:
- ✅ Instalável em dispositivos móveis e desktop
- ✅ Funciona offline
- ✅ Ícones e splash screens configurados
- ✅ Service Worker implementado

## 🎯 Funcionalidades Especiais

### Sistema de Competências
- 25 competências distribuídas em 5 categorias
- Sistema de bloqueio por pré-requisitos
- Timer de 15 dias para completar
- Armazenamento local do progresso

### Controle Parental
- Gestão de tempo de uso
- Bloqueio de acesso
- Relatórios de atividade

### Acessibilidade
- Ajuste de tamanho de fonte
- Alto contraste
- Navegação por teclado
- ARIA labels

## 📄 Licença

Este projeto é propriedade da plataforma ATESTEME.

## 👨‍💻 Desenvolvimento

Desenvolvido com Figma Make para educação digital de qualidade.

---

**Versão:** 1.0.0  
**Última atualização:** Dezembro 2024
