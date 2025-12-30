# ⚡ GUIA RÁPIDO - ATESTEME

## 🎯 3 PASSOS PARA RODAR LOCALMENTE

```bash
# 1️⃣ Instalar dependências
npm install

# 2️⃣ Rodar o projeto
npm run dev

# 3️⃣ Abrir no navegador
http://localhost:5173
```

---

## 🚀 3 PASSOS PARA SUBIR NO VERCEL

### Opção A: Via Interface Web (RECOMENDADO)

```bash
# 1️⃣ Subir código para o GitHub
git init
git add .
git commit -m "Primeiro commit"
git remote add origin https://github.com/SEU_USUARIO/atesteme.git
git push -u origin main

# 2️⃣ Importar no Vercel
- Acesse: https://vercel.com
- Clique em "Add New Project"
- Selecione seu repositório GitHub
- Clique em "Deploy"

# 3️⃣ Aguardar deploy
✅ Pronto! Link gerado automaticamente
```

### Opção B: Via CLI

```bash
# 1️⃣ Instalar Vercel CLI
npm install -g vercel

# 2️⃣ Fazer login
vercel login

# 3️⃣ Deploy
vercel --prod
```

---

## 📦 COMANDOS ÚTEIS

```bash
# Rodar localmente
npm run dev

# Criar build de produção
npm run build

# Testar build localmente
npm run preview

# Testar PWA
npm run pwa:test
# Depois acesse: http://localhost:5173/pwa-test.html
```

---

## 🔄 ATUALIZAR PROJETO NO VERCEL

### Se usou GitHub:
```bash
git add .
git commit -m "Atualização"
git push
# Deploy automático! ✅
```

### Se usou CLI:
```bash
vercel --prod
```

---

## 🎨 CREDENCIAIS DE TESTE

**Login padrão:**
- Email: qualquer email
- Senha: qualquer senha
- Role: selecione "Usuário" ou "Admin"

---

## 📱 TESTAR EM DISPOSITIVOS MÓVEIS

Após fazer deploy no Vercel:

1. Acesse o link do Vercel no celular
2. No Chrome/Safari, clique em "Adicionar à tela inicial"
3. O app será instalado como PWA! 📱

---

## ⚠️ PROBLEMAS COMUNS

### ❌ Erro ao instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Página em branco
- Abra F12 e veja o console
- Verifique se fez `npm run build` antes do deploy

### ❌ PWA não instala
- Certifique-se de estar em HTTPS (Vercel já usa)
- Verifique se `manifest.json` está na pasta `public`

---

## 📞 VERIFICAÇÃO RÁPIDA

Antes de fazer deploy, teste localmente:

```bash
npm install      # ✅ Instalou sem erros?
npm run dev      # ✅ Rodou sem erros?
# Abra http://localhost:5173
# ✅ Página carregou?
# ✅ Consegue fazer login?
# ✅ Navegação funciona?
```

Se tudo estiver ✅, pode fazer deploy com confiança! 🚀

---

**Pronto para começar? Execute `npm install` e depois `npm run dev`!** 🎉
