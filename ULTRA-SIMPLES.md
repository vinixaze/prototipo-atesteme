# 🎯 ATESTEME - GUIA ULTRA SIMPLES

> Para quem quer apenas **INSTALAR E RODAR**. Sem complicação!

---

## 🚀 PASSO A PASSO

### 1️⃣ Abra o terminal na pasta do projeto

**Windows:**
- Clique com botão direito na pasta
- Escolha "Abrir no Terminal" ou "PowerShell aqui"

**Mac:**
- Clique com botão direito na pasta
- Escolha "Novo Terminal na Pasta"

---

### 2️⃣ Digite este comando:

```bash
npm install
```

**Pressione ENTER e aguarde** (2-5 minutos é normal!)

---

### 3️⃣ Quando terminar, digite:

```bash
npm run dev
```

**Pressione ENTER**

---

### 4️⃣ Abra o navegador em:

```
http://localhost:5173
```

---

## ✅ PRONTO!

Se você ver uma **tela roxa** com a logo "ATESTEME", **FUNCIONOU!** 🎉

---

## ❌ E se não funcionar?

### Problema 1: "npm não é reconhecido"

**Solução:** Instale o Node.js

1. Acesse: https://nodejs.org
2. Baixe a versão **LTS** (recomendada)
3. Instale
4. **Feche e abra o terminal novamente**
5. Tente de novo

---

### Problema 2: Tela branca/sem estilo

**Solução:** Limpe e reinstale

**No terminal, digite:**

```bash
rm -rf node_modules .vite package-lock.json
npm cache clean --force
npm install
npm run dev
```

**Depois no navegador:**
- Pressione `Ctrl + Shift + R`

**Windows (PowerShell):**
```powershell
Remove-Item -Recurse -Force node_modules, .vite, package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
npm run dev
```

---

### Problema 3: "Port 5173 já está em uso"

**Solução:** Use outra porta

```bash
npm run dev -- --port 3000
```

Depois abra: `http://localhost:3000`

---

## 🎯 ATALHOS ÚTEIS

### Parar o servidor:
```
Ctrl + C
```

### Limpar cache do navegador:
```
Ctrl + Shift + R
```

### Abrir modo incógnito:
```
Ctrl + Shift + N  (Chrome)
Ctrl + Shift + P  (Firefox)
```

---

## 📱 Testar no celular

1. Rode `npm run dev`
2. Veja o IP que aparece no terminal (exemplo: `192.168.1.10:5173`)
3. No celular, acesse esse IP no navegador
4. Deve funcionar!

---

## 🎨 O que deve aparecer

### ✅ Tela de Login:
- Fundo roxo vibrante
- Logo "ATESTEME" branca
- Campos de email e senha
- Botão "Entrar" roxo
- Ícone de dark mode no canto

### ✅ Funcionalidades:
- Login (qualquer email/senha funciona)
- Dark mode (botão no canto)
- Navegação entre páginas
- Sidebar deslizante
- Animações suaves

---

## 📚 Precisa de mais ajuda?

- **Instalação detalhada:** [README.md](README.md)
- **CSS não aparece:** [SEM-CSS-SOLUCAO.md](SEM-CSS-SOLUCAO.md)
- **Verificar tudo:** [VERIFICAR-INSTALACAO.md](VERIFICAR-INSTALACAO.md)

---

## ⏱️ Resumo do tempo

- **Instalar Node.js:** 5 minutos (só se precisar)
- **npm install:** 2-5 minutos
- **npm run dev:** 5 segundos
- **TOTAL:** Menos de 10 minutos!

---

## 💡 Dica Final

Se você é **completamente iniciante**:

1. Instale o Node.js primeiro
2. Abra o terminal na pasta do projeto
3. Digite: `npm install` e aguarde
4. Digite: `npm run dev`
5. Abra `http://localhost:5173` no navegador
6. **É isso!**

**Não complique! É simples assim! 🚀**

---

**Data:** Dezembro 2024  
**Status:** ✅ FUNCIONANDO
