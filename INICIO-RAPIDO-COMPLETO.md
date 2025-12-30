# ⚡ Início Rápido - 5 Minutos para Rodar

## 🎯 Você Precisa

- ✅ VSCode instalado
- ✅ Node.js instalado ([baixar aqui](https://nodejs.org))
- ✅ Código do projeto baixado/extraído

---

## 🚀 3 Comandos e Pronto!

### 1️⃣ Abrir terminal no VSCode
- Pressione `Ctrl + '` ou vá em **Terminal → New Terminal**

### 2️⃣ Instalar dependências
```bash
npm install
```
⏱️ *Aguarde 2-5 minutos*

### 3️⃣ Rodar o projeto
```bash
npm run dev
```

### 4️⃣ Abrir no navegador
📱 Acesse: **http://localhost:5173**

---

## 🎉 Pronto! O projeto está rodando!

---

# 🌐 Deploy Rápido na Vercel (10 minutos)

## Pré-requisitos
- Conta no GitHub ([criar aqui](https://github.com/signup))
- Conta na Vercel ([criar aqui](https://vercel.com/signup))
- Git instalado ([baixar aqui](https://git-scm.com/download/win))

---

## 📤 Subir para o GitHub

### No terminal do VSCode:

```bash
# 1. Inicializar Git
git init

# 2. Adicionar arquivos
git add .

# 3. Fazer primeiro commit
git commit -m "Plataforma Atesteme - deploy inicial"

# 4. Criar repositório no GitHub
# Vá em: https://github.com/new
# Nome: atesteme-plataforma
# Clique em "Create repository"

# 5. Conectar e enviar (substitua SEU-USUARIO pelo seu nome de usuário do GitHub)
git remote add origin https://github.com/SEU-USUARIO/atesteme-plataforma.git
git branch -M main
git push -u origin main
```

---

## 🚀 Deploy na Vercel

### 1. Acesse [vercel.com](https://vercel.com) e faça login

### 2. Clique em **"Add New Project"**

### 3. Importe seu repositório do GitHub
- Procure por `atesteme-plataforma`
- Clique em **"Import"**

### 4. Configurações (deixe os padrões):
- Framework: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

### 5. Clique em **"Deploy"**

### 6. Aguarde 2-3 minutos ⏱️

### 7. 🎉 **Pronto!** Seu site está no ar!

---

## 🔄 Atualizar o Site (após mudanças)

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

✨ **Deploy automático!** A Vercel detecta e atualiza sozinha.

---

## ❓ Problemas?

### "npm não é reconhecido"
→ Reinstale o Node.js e reinicie o VSCode

### "Port 5173 já está em uso"
→ Feche outros terminais ou use:
```bash
npm run dev -- --port 3000
```

### "Permission denied"
→ Execute o VSCode como Administrador (Windows)

### Build falhou na Vercel
→ Teste localmente primeiro:
```bash
npm run build
```

---

## 📱 Link do Site

Seu site ficará acessível em:
```
https://atesteme-plataforma.vercel.app
```

Você pode personalizar o domínio nas configurações da Vercel!

---

## 🎯 Próximos Passos

1. ✅ Projeto rodando localmente
2. ✅ Código no GitHub
3. ✅ Site no ar na Vercel
4. 🎨 Personalizar conteúdos
5. 🚀 Compartilhar com o mundo!

---

## 📚 Quer saber mais?

- **Guia completo:** `GUIA-INSTALACAO-DEPLOY.md`
- **Comandos úteis:** `COMANDOS-UTEIS.md`
- **Documentação do projeto:** `README-PROJETO.md`

---

**Boa sorte! 🚀**
