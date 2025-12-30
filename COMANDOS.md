# 🎯 COMANDOS - COLA RÁPIDA

## 💻 DESENVOLVIMENTO LOCAL

```bash
# Instalar tudo pela primeira vez
npm install

# Rodar o projeto em modo desenvolvimento
npm run dev
# Abra: http://localhost:5173

# Criar build de produção
npm run build

# Testar o build localmente
npm run preview
# Abra: http://localhost:4173

# Limpar tudo e reinstalar (se der problema)
rm -rf node_modules package-lock.json dist
npm install
```

---

## 📤 GIT & GITHUB

```bash
# Inicializar repositório Git
git init

# Ver status dos arquivos
git status

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Sua mensagem aqui"

# Adicionar repositório remoto (só uma vez)
git remote add origin https://github.com/SEU_USUARIO/NOME_REPO.git

# Enviar para o GitHub (primeira vez)
git push -u origin main

# Enviar para o GitHub (próximas vezes)
git push

# Ver histórico de commits
git log --oneline

# Criar nova branch
git checkout -b nome-da-branch

# Voltar para branch main
git checkout main
```

---

## 🚀 VERCEL

### Via CLI (Terminal)

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Verificar se instalou
vercel --version

# Fazer login
vercel login

# Deploy em ambiente de preview
vercel

# Deploy em produção
vercel --prod

# Ver lista de projetos
vercel list

# Ver logs do projeto
vercel logs

# Remover projeto
vercel remove
```

### Via Interface Web

1. Acesse: https://vercel.com
2. Clique em: **Add New** → **Project**
3. Importe seu repositório do GitHub
4. Clique em: **Deploy**

---

## 🔄 WORKFLOW DIÁRIO

```bash
# 1. Fazer alterações no código
# (edite os arquivos no VS Code)

# 2. Testar localmente
npm run dev

# 3. Se estiver OK, commitar
git add .
git commit -m "Descrição da alteração"
git push

# 4. Vercel faz deploy automático!
# (se configurou via GitHub)
```

---

## 🐛 SOLUÇÃO DE PROBLEMAS

```bash
# Erro de dependências
rm -rf node_modules package-lock.json
npm install

# Cache do Vite corrompido
rm -rf node_modules/.vite
npm run dev

# Erro de build
npm run build --debug

# Verificar erros de TypeScript
npx tsc --noEmit

# Limpar tudo e recomeçar
rm -rf node_modules package-lock.json dist .vite
npm install
npm run build
```

---

## 📦 GERENCIAMENTO DE PACOTES

```bash
# Instalar novo pacote
npm install nome-do-pacote

# Instalar pacote de desenvolvimento
npm install -D nome-do-pacote

# Remover pacote
npm uninstall nome-do-pacote

# Atualizar todos os pacotes
npm update

# Verificar pacotes desatualizados
npm outdated

# Auditar segurança
npm audit

# Corrigir vulnerabilidades
npm audit fix
```

---

## 🔍 INFORMAÇÕES DO PROJETO

```bash
# Ver versão do Node
node --version

# Ver versão do npm
npm --version

# Ver versão do Git
git --version

# Ver todas as dependências instaladas
npm list --depth=0

# Ver informações do package.json
npm run
```

---

## 📱 TESTES

```bash
# Rodar em modo dev
npm run dev

# Testar build de produção localmente
npm run build && npm run preview

# Verificar service worker (PWA)
# Acesse: http://localhost:5173/pwa-test.html

# Abrir no navegador (macOS)
open http://localhost:5173

# Abrir no navegador (Windows)
start http://localhost:5173

# Abrir no navegador (Linux)
xdg-open http://localhost:5173
```

---

## 🌐 URLS IMPORTANTES

- **Desenvolvimento Local**: http://localhost:5173
- **Preview Build**: http://localhost:4173
- **Teste PWA**: http://localhost:5173/pwa-test.html
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub**: https://github.com
- **Node.js**: https://nodejs.org

---

## 💡 DICAS ÚTEIS

```bash
# Abrir VS Code na pasta atual
code .

# Abrir terminal integrado do VS Code
# Atalho: Ctrl + ` (ou Cmd + ` no Mac)

# Limpar terminal
clear  # (ou cls no Windows)

# Parar servidor em execução
# Atalho: Ctrl + C

# Histórico de comandos
# Seta para cima/baixo

# Autocompletar caminho
# Pressione Tab
```

---

## 📋 SEQUÊNCIA COMPLETA DO ZERO

```bash
# 1. Navegar até a pasta do projeto
cd caminho/para/atesteme

# 2. Instalar dependências
npm install

# 3. Rodar localmente
npm run dev
# ✅ Teste tudo no navegador

# 4. Criar build
npm run build
# ✅ Sem erros?

# 5. Inicializar Git (se ainda não fez)
git init
git add .
git commit -m "Primeiro commit - ATESTEME"

# 6. Criar repositório no GitHub
# (faça pela interface web: github.com/new)

# 7. Conectar ao GitHub
git remote add origin https://github.com/SEU_USUARIO/atesteme.git
git branch -M main
git push -u origin main

# 8. Deploy no Vercel
# Opção A: Via web (vercel.com)
# Opção B: Via CLI
vercel --prod

# 9. ✅ PRONTO!
```

---

**💾 Salve este arquivo para consulta rápida!**
