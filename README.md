# 🎓 ATESTEME - Plataforma de Educação Digital

> Plataforma educacional gamificada com sistema de competências, níveis e conquistas.

---

## 🚀 INSTALAÇÃO RÁPIDA

### ⚡ Apenas 2 comandos:

```bash
npm install
npm run dev
```

Abra: **http://localhost:5173**

---

## 🔧 Instalação Automática (Recomendado)

### Windows:
```powershell
.\setup.ps1
```

### Mac/Linux:
```bash
bash setup.sh
```

✨ **O script faz tudo automaticamente!**

---

## 📋 Pré-requisitos

- **Node.js** v18 ou superior
- **NPM** v9 ou superior

**Verificar:**
```bash
node -v
npm -v
```

**Instalar:** https://nodejs.org (versão LTS)

---

## 🎯 Comandos

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## ❌ Problemas? CSS não aparece?

### Solução rápida:

**Mac/Linux:**
```bash
rm -rf node_modules .vite package-lock.json
npm cache clean --force
npm install
npm run dev
```

**Windows:**
```powershell
Remove-Item -Recurse -Force node_modules, .vite, package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
npm run dev
```

### No navegador:
- Pressione `Ctrl + Shift + R` (limpa cache)
- Ou abra em **modo incógnito**

---

## 📚 Documentação Completa

- 📖 **[Guia de Instalação](INSTALAR-E-RODAR.md)** ⭐ **COMECE AQUI!**
- 🆘 **[Solução CSS não aparece](SEM-CSS-SOLUCAO.md)**
- 🔧 **[Solução de Problemas](SOLUCAO-PROBLEMAS.md)**
- 📝 **[Comandos Úteis](COMANDOS-UTEIS.md)**

---

## ✨ Características

### 🎮 Gamificação
- Sistema de níveis e XP
- Conquistas e badges
- Ranking de usuários
- Digcoins (moeda virtual)

### 📱 Interface
- Design roxo vibrante (#8B27FF)
- Dark mode completo
- Responsivo (mobile/tablet/desktop)
- PWA Ready

### 🎓 Funcionalidades
- Dashboard gamificado
- Sistema de habilidades por categorias
- Testes de competências
- Acompanhamento de progresso
- Controle parental

### 🔐 Módulos
- **ATESTEME** - Plataforma principal
- **Prosaeb** - Módulo específico

---

## 📂 Estrutura

```
atesteme/
├── src/
│   ├── app/
│   │   ├── App.tsx              # App principal
│   │   ├── pages/               # Páginas
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── HabilidadesPage.tsx
│   │   │   └── ProgressoPage.tsx
│   │   └── components/          # Componentes
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── ui/              # Componentes UI
│   ├── styles/
│   │   ├── index.css           # CSS principal
│   │   ├── tailwind.css        # Tailwind config
│   │   └── theme.css           # Tema e cores
│   └── main.tsx                # Entry point
├── public/                     # Assets estáticos
├── package.json                # Dependências
└── vite.config.ts             # Config Vite
```

---

## 🛠️ Tecnologias

- ⚛️ **React 18.3** - Framework
- ⚡ **Vite 6.3** - Build tool
- 🎨 **Tailwind CSS v4** - Estilização
- 🎯 **TypeScript** - Tipagem
- 📦 **Radix UI** - Componentes acessíveis
- 🎮 **Lucide React** - Ícones
- 🌙 **Next Themes** - Dark mode
- 📱 **PWA** - Progressive Web App

---

## 🎨 Design System

### Cores Principais
- **Primária:** `#8B27FF` (Roxo vibrante)
- **Secundárias:** 5 cores para categorias de competências
- **Background:** Branco / Dark mode

### Tipografia
- Inter (fonte principal)
- Poppins (títulos)

### Componentes
- Bordas arredondadas (`rounded-lg`)
- Ícones em linha consistentes
- Animações suaves
- Feedback visual imediato

---

## 📱 PWA (Progressive Web App)

O projeto já está configurado como PWA:

- ✅ Service Worker
- ✅ Manifest
- ✅ Offline support
- ✅ Instalável
- ✅ Ícones otimizados

**Testar PWA:**
```
http://localhost:5173/pwa-test.html
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conecte repositório na Vercel
3. Deploy automático! 🎉

### Netlify

1. Build: `npm run build`
2. Publish directory: `dist`
3. Deploy!

---

## 🔒 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Login com email/senha
- [x] Persistência de sessão
- [x] Logout

### ✅ Dashboard
- [x] Sidebar gamificada
- [x] Estatísticas de progresso
- [x] XP e níveis
- [x] Conquistas recentes
- [x] Troca de módulos

### ✅ Habilidades
- [x] 5 categorias de competências
- [x] Sistema de cores por categoria
- [x] Progresso individual
- [x] Bloqueio de competências

### ✅ Progresso
- [x] Sistema de níveis (1-10)
- [x] Tabela de competências
- [x] Aba de conquistas
- [x] Aba de ranking
- [x] Aba de digcoins

### ✅ Dark Mode
- [x] Toggle no header
- [x] Todas as telas adaptadas
- [x] Persistência de preferência

### ✅ Responsivo
- [x] Mobile
- [x] Tablet
- [x] Desktop
- [x] Hint de rotação (landscape)

---

## 🌐 Idioma

**100% em Português Brasileiro**

❌ Sem termos em inglês na interface  
✅ Todas as mensagens traduzidas  
✅ Feedback em PT-BR  

---

## 👥 Controle Parental

- Configuração de horários
- Limite de tempo de uso
- Bloqueio de conteúdo
- Relatórios de progresso

---

## 🎯 Próximos Passos

Após instalação bem-sucedida:

1. ✅ Explore a tela de login
2. ✅ Entre com qualquer email/senha (mock)
3. ✅ Teste o dark mode
4. ✅ Navegue pelas páginas
5. ✅ Experimente os testes de competências

---

## 🆘 Suporte

### Problemas comuns:

#### CSS não aparece
→ Veja: [SEM-CSS-SOLUCAO.md](SEM-CSS-SOLUCAO.md)

#### "Cannot find module"
```bash
npm install
```

#### Port já em uso
```bash
npm run dev -- --port 3000
```

#### Node/NPM desatualizado
→ Atualize em: https://nodejs.org

---

## 📊 Status do Projeto

- ✅ **Interface:** 100% completa
- ✅ **Responsividade:** 100% completa
- ✅ **Dark Mode:** 100% completo
- ✅ **PWA:** 100% funcional
- ✅ **Gamificação:** 100% implementada
- ✅ **Módulos:** Sistema de troca funcionando
- ⚠️ **Backend:** Mock (frontend only)

---

## 📄 Licença

Projeto desenvolvido para a plataforma educacional **ATESTEME**.

---

## 🙏 Créditos

- Interface: Design minimalista e clean
- Ícones: Lucide React
- Componentes: Radix UI + Shadcn/UI
- Tipografia: Inter + Poppins

---

## 📞 Contato

Para dúvidas ou suporte, consulte a documentação em:
- **[INSTALAR-E-RODAR.md](INSTALAR-E-RODAR.md)** - Guia de instalação
- **[SEM-CSS-SOLUCAO.md](SEM-CSS-SOLUCAO.md)** - Solução de CSS
- **[FAQ.md](FAQ.md)** - Perguntas frequentes

---

**Última atualização:** Dezembro 2024  
**Versão:** 1.0.0  
**Status:** ✅ PRONTO PARA USO

---

## ⭐ Começar Agora

```bash
# 1. Clone o repositório
git clone [url-do-repositorio]

# 2. Entre na pasta
cd atesteme

# 3. Instale
npm install

# 4. Rode
npm run dev

# 5. Abra
http://localhost:5173
```

**É isso! Simples assim! 🚀**
