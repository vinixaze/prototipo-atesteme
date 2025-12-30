# 🚀 ATESTEME - INSTALAÇÃO DEFINITIVA

## ⚡ APENAS 3 COMANDOS

### 1️⃣ Instale as dependências:
```bash
npm install
```

### 2️⃣ Rode o projeto:
```bash
npm run dev
```

### 3️⃣ Abra no navegador:
```
http://localhost:5173
```

---

## ✅ PRONTO! SIMPLES ASSIM!

Se aparecer tudo roxo e bonito = **FUNCIONOU!** 🎉

---

## ❌ Se não funcionar (CSS não aparece)

### Execute ESTES comandos na ordem:

```bash
# 1. Delete tudo
rm -rf node_modules .vite package-lock.json

# 2. Limpe cache
npm cache clean --force

# 3. Instale novamente
npm install

# 4. Rode
npm run dev
```

**No Windows (PowerShell):**
```powershell
Remove-Item -Recurse -Force node_modules, .vite, package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
npm run dev
```

### Depois no navegador:
- Pressione `Ctrl + Shift + R` para limpar cache
- Ou abra em modo incógnito: `Ctrl + Shift + N`

---

## 🔧 Requisitos

- **Node.js:** v18 ou superior
- **NPM:** v9 ou superior

**Verificar versões:**
```bash
node -v
npm -v
```

**Se precisar atualizar:**
- Baixe de: https://nodejs.org (versão LTS)

---

## 🎯 O que você deve ver

### ✅ No Terminal:
```
VITE v6.3.5  ready in 500 ms

➜  Local:   http://localhost:5173/
```

### ✅ No Navegador:
- Tela de login roxa (#8B27FF)
- Logo "ATESTEME" branca
- Inputs estilizados
- Tudo bonito e colorido

### ❌ Se estiver assim = PROBLEMA:
- Tela branca/preta sem estilo
- Texto sem formatação
- Sem cores

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Port 5173 already in use"
```bash
npm run dev -- --port 3000
```
Depois acesse: `http://localhost:3000`

### CSS não aparece
```bash
# Limpe TUDO e reinstale
rm -rf node_modules .vite package-lock.json
npm cache clean --force
npm install
npm run dev

# No navegador: Ctrl + Shift + R
```

---

## 💡 Dicas

1. **Sempre use modo incógnito** quando testar pela primeira vez
2. **Limpe o cache** do navegador com `Ctrl + Shift + R`
3. **Feche outras abas** do localhost antes de rodar
4. **Use Node.js v18+** (versão mais recente LTS)

---

## 📚 Estrutura do Projeto

```
atesteme/
├── src/
│   ├── app/
│   │   ├── App.tsx          # Componente principal
│   │   ├── pages/           # Páginas da aplicação
│   │   └── components/      # Componentes reutilizáveis
│   ├── styles/
│   │   ├── index.css        # CSS principal
│   │   ├── tailwind.css     # Configuração Tailwind
│   │   └── theme.css        # Tema e cores
│   └── main.tsx             # Entrada da aplicação
├── public/                  # Arquivos estáticos
├── package.json             # Dependências
└── vite.config.ts           # Configuração Vite
```

---

## 🎮 Comandos Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm build

# Preview do build
npm run preview
```

---

## 🚀 Deploy

O projeto já está configurado para deploy na **Vercel**.

1. Faça push para o GitHub
2. Conecte o repositório na Vercel
3. Deploy automático! 🎉

---

## ✨ Tecnologias

- ⚛️ **React 18**
- ⚡ **Vite 6**
- 🎨 **Tailwind CSS v4**
- 🎯 **TypeScript**
- 📱 **PWA Ready**
- 🌙 **Dark Mode**

---

## 📝 Licença

Criado para a plataforma educacional **ATESTEME**

---

**Última atualização:** Dezembro 2024  
**Status:** ✅ TESTADO E FUNCIONANDO
