# 🚀 Guia Completo: Instalação e Deploy no Vercel

## 📋 Pré-requisitos

Você já tem instalado:
- ✅ VSCode
- ✅ Node.js

---

## 📥 PASSO 1: Baixar o Código

### Opção A: Se você está no Figma Make
1. Clique no botão **"Export"** ou **"Download"** no canto superior direito
2. Será baixado um arquivo `.zip` com todo o projeto
3. Extraia o arquivo `.zip` em uma pasta de sua escolha (exemplo: `C:\Projetos\atesteme`)

### Opção B: Criar a estrutura manualmente
Se você não tem acesso ao Export, vou te fornecer todos os arquivos necessários através do chat.

---

## 💻 PASSO 2: Abrir o Projeto no VSCode

1. Abra o VSCode
2. Clique em **File** → **Open Folder** (ou `Ctrl+K Ctrl+O`)
3. Navegue até a pasta onde você extraiu o projeto
4. Selecione a pasta e clique em **"Selecionar Pasta"**

---

## 📦 PASSO 3: Instalar as Dependências

1. No VSCode, abra o **Terminal Integrado**:
   - Menu: **Terminal** → **New Terminal** (ou `Ctrl+'`)
   
2. No terminal, digite o comando:

```bash
npm install
```

3. Aguarde o processo terminar (pode demorar alguns minutos)
   - Você verá muitas linhas no terminal
   - Quando terminar, você verá algo como: `added XXX packages`

---

## 🏃 PASSO 4: Rodar o Projeto Localmente

1. No mesmo terminal, digite:

```bash
npm run dev
```

2. Você verá uma mensagem parecida com:
```
  VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

3. **Abra seu navegador** e acesse: `http://localhost:5173/`

4. 🎉 **Pronto!** Seu projeto está rodando localmente!

### 🛑 Para parar o servidor:
- Pressione `Ctrl+C` no terminal

---

## 🌐 PASSO 5: Deploy na Vercel

### 5.1 - Criar conta na Vercel

1. Acesse: [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"** (recomendado) ou **"Continue with Email"**
4. Complete o cadastro

### 5.2 - Criar conta no GitHub (se ainda não tiver)

1. Acesse: [github.com](https://github.com)
2. Clique em **"Sign Up"**
3. Complete o cadastro com seu email
4. Verifique seu email

### 5.3 - Instalar Git (se ainda não tiver)

1. Baixe em: [git-scm.com/download/win](https://git-scm.com/download/win)
2. Instale com as opções padrão
3. Reinicie o VSCode

### 5.4 - Subir código para o GitHub

1. No VSCode, abra o terminal e digite:

```bash
git init
git add .
git commit -m "Primeiro commit - Plataforma Atesteme"
```

2. Crie um novo repositório no GitHub:
   - Acesse [github.com/new](https://github.com/new)
   - Nome do repositório: `atesteme-plataforma`
   - Deixe como **Public** ou **Private**
   - **NÃO** marque "Initialize with README"
   - Clique em **"Create repository"**

3. De volta ao terminal do VSCode, copie os comandos que apareceram na tela do GitHub e cole no terminal:

```bash
git remote add origin https://github.com/SEU-USUARIO/atesteme-plataforma.git
git branch -M main
git push -u origin main
```

> **Nota:** Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub

4. Se pedir login, digite suas credenciais do GitHub

### 5.5 - Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Import Git Repository"**
4. Encontre e selecione o repositório `atesteme-plataforma`
5. Clique em **"Import"**
6. Configure o projeto:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
7. Clique em **"Deploy"**

### 5.6 - Aguardar o Deploy

- A Vercel vai:
  1. ⬇️ Baixar seu código
  2. 📦 Instalar as dependências
  3. 🔨 Compilar o projeto
  4. 🚀 Publicar online

- Isso leva de **2 a 5 minutos**

### 5.7 - Acessar seu Site

1. Quando terminar, você verá: **"Congratulations! 🎉"**
2. Clique no botão **"Visit"** ou copie o link que aparece
3. Seu link será algo como: `https://atesteme-plataforma.vercel.app`

---

## 🔄 Atualizando o Site (Após Mudanças)

Sempre que você fizer alterações no código e quiser atualizar o site online:

1. No terminal do VSCode:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

2. A Vercel vai **automaticamente** detectar e fazer o deploy das mudanças!
3. Aguarde 2-3 minutos e recarregue seu site

---

## ⚠️ Problemas Comuns e Soluções

### ❌ Erro: "npm não é reconhecido"
**Solução:** Reinstale o Node.js de [nodejs.org](https://nodejs.org) e reinicie o VSCode

### ❌ Erro: "EACCES: permission denied"
**Solução (Windows):** Execute o VSCode como Administrador
**Solução (Mac/Linux):** Use `sudo npm install`

### ❌ Erro: "Port 5173 is already in use"
**Solução:** 
- Feche outros terminais que possam estar rodando o projeto
- Ou use: `npm run dev -- --port 3000`

### ❌ Deploy falhou na Vercel
**Solução:**
1. Verifique os logs de erro na Vercel
2. Certifique-se que todas as dependências estão no `package.json`
3. Rode `npm run build` localmente para testar

### ❌ Imagens não aparecem no deploy
**Solução:** Certifique-se que as imagens estão na pasta `/public` ou importadas corretamente

---

## 📱 Configurar PWA (Opcional)

Seu projeto já está configurado como PWA! Para testar:

1. Acesse seu site publicado (não funciona em `localhost`)
2. No Chrome/Edge: Clique no ícone de **"Instalar"** na barra de endereço
3. Ou vá em **Menu** → **Instalar Atesteme**

---

## 🎯 Links Úteis

- **Documentação Vite:** [vitejs.dev](https://vitejs.dev)
- **Documentação Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Documentação React:** [react.dev](https://react.dev)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com)

---

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] VSCode instalado
- [ ] Projeto extraído
- [ ] Dependências instaladas (`npm install`)
- [ ] Projeto rodando localmente (`npm run dev`)
- [ ] Conta no GitHub criada
- [ ] Git instalado
- [ ] Código no GitHub
- [ ] Conta na Vercel criada
- [ ] Deploy realizado com sucesso
- [ ] Site acessível online

---

## 🆘 Precisa de Ajuda?

Se tiver algum problema em qualquer etapa:
1. Copie a mensagem de erro completa
2. Me envie junto com a descrição do que estava fazendo
3. Vou te ajudar a resolver!

---

**Boa sorte com seu deploy! 🚀**
