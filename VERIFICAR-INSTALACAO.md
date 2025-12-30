# ✅ VERIFICAÇÃO DE INSTALAÇÃO

Use este guia para verificar se tudo está funcionando corretamente.

---

## 🔍 CHECKLIST PRÉ-INSTALAÇÃO

Antes de começar, verifique:

### 1. Node.js e NPM instalados

```bash
node -v
npm -v
```

**Deve retornar:**
```
v18.x.x  (ou superior)
9.x.x    (ou superior)
```

❌ **Se não aparecer:**
- Instale de: https://nodejs.org (versão LTS)
- Feche e abra o terminal novamente
- Teste de novo

---

## 📦 INSTALAÇÃO

### Passo 1: Instalar dependências

```bash
npm install
```

**Duração:** 2-5 minutos (normal!)

**✅ Sucesso se aparecer:**
```
added XXX packages
```

**❌ Erro se aparecer:**
```
npm ERR! 
npm ERR! Cannot find module...
```

→ **Solução:**
```bash
npm cache clean --force
npm install
```

---

### Passo 2: Iniciar servidor

```bash
npm run dev
```

**✅ Sucesso se aparecer:**
```
  VITE v6.3.5  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**❌ Erro se aparecer:**
```
Port 5173 is already in use
```

→ **Solução:**
```bash
npm run dev -- --port 3000
```

---

## 🌐 VERIFICAÇÃO NO NAVEGADOR

### 1. Abra o navegador

```
http://localhost:5173
```

### 2. O que você DEVE ver:

#### ✅ CORRETO:

**Tela de Login:**
- [ ] Fundo roxo vibrante (#8B27FF)
- [ ] Logo "ATESTEME" branca
- [ ] Campos de input estilizados (fundo branco, bordas arredondadas)
- [ ] Botão "Entrar" roxo
- [ ] Botão dark mode no canto superior direito
- [ ] Texto "Bem-vindo de volta!" visível
- [ ] Link "Esqueceu a senha?" azul

#### ❌ ERRADO (Problema!):

**Se aparecer assim:**
- [ ] Tela toda branca ou preta
- [ ] Sem cores
- [ ] Texto sem formatação
- [ ] Botões sem estilo
- [ ] Layout bagunçado
- [ ] Apenas HTML puro

→ **Se estiver errado, vá para "SOLUÇÃO CSS NÃO APARECE"**

---

## 🧪 TESTES FUNCIONAIS

### Teste 1: Dark Mode

1. Clique no ícone 🌙 no canto superior direito
2. A tela deve ficar escura
3. Clique novamente
4. Deve voltar ao normal

**✅ Funcionou?** SIM / NÃO

---

### Teste 2: Login

1. Digite qualquer email: `teste@email.com`
2. Digite qualquer senha: `123456`
3. Clique em "Entrar"
4. Deve aparecer a tela "Bem-vindo!"

**✅ Funcionou?** SIM / NÃO

---

### Teste 3: Navegação

1. Na tela de boas-vindas, clique em "Começar Jornada"
2. Deve aparecer o Dashboard roxo
3. Clique no menu hambúrguer (☰) no canto superior esquerdo
4. Sidebar deve deslizar da esquerda

**✅ Funcionou?** SIM / NÃO

---

### Teste 4: Habilidades

1. Na sidebar, clique em "Habilidades"
2. Deve aparecer 5 categorias coloridas:
   - 🟣 Roxo
   - 🔵 Azul
   - 🟢 Verde
   - 🟡 Amarelo
   - 🔴 Vermelho

**✅ Funcionou?** SIM / NÃO

---

### Teste 5: Progresso

1. Na sidebar, clique em "Progresso"
2. Deve aparecer 3 abas:
   - Níveis
   - Conquistas
   - Ranking

**✅ Funcionou?** SIM / NÃO

---

## 🐛 SOLUÇÃO: CSS NÃO APARECE

Se os testes visuais falharam (tela sem estilo):

### Opção 1: Limpar cache do navegador

```
Ctrl + Shift + R
```

Ou abra em modo incógnito:
```
Ctrl + Shift + N  (Chrome)
Ctrl + Shift + P  (Firefox)
```

---

### Opção 2: Reinstalar tudo

**Pare o servidor:**
```
Ctrl + C
```

**Execute:**

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

**Depois:**
```
Ctrl + Shift + R no navegador
```

---

## 📊 VERIFICAÇÃO DO CONSOLE

### 1. Abra DevTools

Pressione `F12` no navegador

### 2. Verifique a aba Console

**✅ Deve estar LIMPO (sem erros)**

**❌ Se tiver erros como:**
```
Failed to load module
404 Not Found
Cannot find module 'tailwindcss'
```

→ **Solução:**
```bash
# Pare o servidor (Ctrl+C)
npm install @tailwindcss/vite tailwindcss --save-dev
npm run dev
```

---

### 3. Verifique a aba Network

1. Recarregue a página (F5)
2. Procure por arquivos `.css`
3. **✅ Todos devem estar com status 200 (verde)**
4. **❌ Se algum estiver 404 (vermelho) = problema**

→ **Solução:**
```bash
rm -rf .vite
npm run dev
```

---

## 🎯 RESUMO DE VERIFICAÇÃO

### ✅ Tudo OK se:

- [ ] Node.js v18+ instalado
- [ ] npm install executou sem erros
- [ ] npm run dev iniciou normalmente
- [ ] Navegador mostra tela roxa estilizada
- [ ] Dark mode funciona
- [ ] Login funciona
- [ ] Navegação entre páginas funciona
- [ ] Console do navegador sem erros
- [ ] Network mostra CSS com status 200

### ❌ Problema se:

- [ ] Tela branca/preta sem estilo
- [ ] Erros no console
- [ ] CSS com status 404
- [ ] npm install falhou
- [ ] npm run dev falhou

---

## 📞 PRÓXIMOS PASSOS

### Se TUDO FUNCIONOU:

🎉 **Parabéns! Instalação bem-sucedida!**

Agora você pode:
1. Explorar todas as páginas
2. Testar as funcionalidades
3. Começar a desenvolver
4. Fazer deploy

---

### Se ALGO FALHOU:

Consulte a documentação específica:

1. **CSS não aparece:**  
   → [SEM-CSS-SOLUCAO.md](SEM-CSS-SOLUCAO.md)

2. **Erros de instalação:**  
   → [SOLUCAO-PROBLEMAS.md](SOLUCAO-PROBLEMAS.md)

3. **Outros problemas:**  
   → [FAQ.md](FAQ.md)

---

## 🔧 COMANDOS DE DIAGNÓSTICO

### Verificar versões:
```bash
node -v
npm -v
```

### Verificar dependências instaladas:
```bash
npm list --depth=0
```

### Verificar se Tailwind está instalado:
```bash
npm list tailwindcss
npm list @tailwindcss/vite
```

**Deve retornar:**
```
tailwindcss@4.1.12
@tailwindcss/vite@4.1.12
```

### Verificar arquivos críticos:

```bash
ls src/styles/
```

**Deve mostrar:**
```
fonts.css
index.css
mobile-responsive.css
tailwind.css
theme.css
```

---

## 📝 LOG DE VERIFICAÇÃO

Use esta seção para anotar seus resultados:

**Data:** _______________

**Node.js:** v____________

**NPM:** v____________

**npm install:** ✅ / ❌

**npm run dev:** ✅ / ❌

**CSS aparece:** ✅ / ❌

**Dark mode:** ✅ / ❌

**Login:** ✅ / ❌

**Navegação:** ✅ / ❌

**Console limpo:** ✅ / ❌

**Network OK:** ✅ / ❌

**Observações:**
_______________________________
_______________________________
_______________________________

---

**Última atualização:** Dezembro 2024  
**Status:** ✅ GUIA COMPLETO DE VERIFICAÇÃO
