# 📺 PASSO A PASSO VISUAL - ATESTEME

## 🎬 TUTORIAL COMPLETO COM SCREENSHOTS (Descrição)

---

## 🖥️ PARTE 1: PREPARAÇÃO (5 minutos)

### Passo 1.1: Verificar Instalações

**O que fazer:**
1. Abra o terminal/prompt de comando
2. Digite cada comando abaixo e pressione Enter:

```bash
node --version
```
✅ **Deve aparecer:** `v18.x.x` ou superior  
❌ **Se aparecer erro:** Instale em https://nodejs.org

```bash
npm --version
```
✅ **Deve aparecer:** `9.x.x` ou superior  
❌ **Se aparecer erro:** Instale o Node.js (npm vem junto)

```bash
git --version
```
✅ **Deve aparecer:** `git version 2.x.x`  
❌ **Se aparecer erro:** Instale em https://git-scm.com

---

### Passo 1.2: Abrir o Projeto no VS Code

**Opção A - Via Interface:**
1. Abra o VS Code
2. Clique em **File** (Arquivo)
3. Clique em **Open Folder** (Abrir Pasta)
4. Navegue até a pasta `atesteme`
5. Clique em **Select Folder** (Selecionar Pasta)

**Opção B - Via Terminal:**
```bash
cd caminho/para/atesteme
code .
```

**Resultado esperado:**
- VS Code abre com a pasta do projeto
- Barra lateral mostra estrutura de arquivos
- Você vê: `src/`, `public/`, `package.json`, etc.

---

### Passo 1.3: Abrir Terminal Integrado

**Como fazer:**
1. No VS Code, clique em **Terminal** (menu superior)
2. Clique em **New Terminal** (Novo Terminal)

**Atalho de teclado:**
- Windows/Linux: `Ctrl + '`
- Mac: `Cmd + '`

**Resultado esperado:**
- Painel de terminal aparece na parte inferior
- Mostra o caminho da pasta atual
- Exemplo: `C:\Users\Você\atesteme>` ou `~/atesteme $`

---

## 🔧 PARTE 2: INSTALAÇÃO (2-5 minutos)

### Passo 2.1: Instalar Dependências

**No terminal que você acabou de abrir, digite:**

```bash
npm install
```

**Pressione Enter**

**O que acontece:**
1. Aparece uma barra de progresso
2. Muitas linhas de texto passam rapidamente
3. Mensagens sobre pacotes sendo instalados
4. Pode aparecer avisos (warnings) - isso é normal!

**Aguarde:**
- Primeira vez: 2-5 minutos
- Próximas vezes: mais rápido

**Resultado esperado:**
```
added 1234 packages in 2m

12 packages are looking for funding
  run `npm fund` for details
```

✅ **Se viu isso:** Sucesso! Próximo passo.  
❌ **Se deu erro:** Role até "SOLUÇÃO DE PROBLEMAS" no final.

---

### Passo 2.2: Verificar Instalação

**Digite no terminal:**

```bash
ls node_modules
```
(ou `dir node_modules` no Windows)

**Resultado esperado:**
- Lista enorme de pastas aparece
- Você vê nomes como: `react`, `vite`, `lucide-react`, etc.

✅ **Instalação OK!**

---

## 🚀 PARTE 3: EXECUTAR O PROJETO (1 minuto)

### Passo 3.1: Iniciar Servidor de Desenvolvimento

**No terminal, digite:**

```bash
npm run dev
```

**Pressione Enter**

**O que acontece:**
1. Vite faz o build inicial (10-30 segundos)
2. Aparece uma mensagem verde

**Resultado esperado:**
```
  VITE v6.3.5  ready in 823 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

✅ **Se viu isso:** Servidor está rodando!

---

### Passo 3.2: Abrir no Navegador

**Opção A - Clique no link:**
- No terminal, segure `Ctrl` (ou `Cmd` no Mac)
- Clique em `http://localhost:5173/`
- Navegador abre automaticamente

**Opção B - Manual:**
1. Abra seu navegador (Chrome, Firefox, Edge, Safari)
2. Na barra de endereço, digite: `http://localhost:5173`
3. Pressione Enter

**Resultado esperado:**
- Página de login do ATESTEME aparece
- Design roxo vibrante
- Campos de email e senha
- Botão "ENTRAR"

✅ **Funcionou! Projeto está rodando!** 🎉

---

### Passo 3.3: Testar a Aplicação

**Faça login:**
1. Email: Digite qualquer email (ex: `teste@teste.com`)
2. Senha: Digite qualquer senha (ex: `123456`)
3. Selecione: **Usuário**
4. Clique em: **ENTRAR**

**O que acontece:**
- Você é redirecionado para o Dashboard
- Vê cards coloridos de competências
- Barra lateral com navegação
- Toggle de dark mode

**Teste a navegação:**
- Clique em **Habilidades** (sidebar ou menu)
- Clique em **Progresso**
- Teste o dark mode (ícone de lua/sol)
- Tente instalar como PWA (ícone de download, se aparecer)

✅ **Tudo funcionando? Perfeito!**

---

## 🛑 PARTE 4: PARAR O SERVIDOR

### Como parar:

**No terminal onde está rodando `npm run dev`:**
1. Pressione `Ctrl + C`
2. Confirme se perguntado (digite `Y` ou `S`)

**Resultado:**
- Terminal volta ao prompt normal
- Servidor para de rodar
- `http://localhost:5173` não funciona mais

**Para rodar novamente:**
```bash
npm run dev
```

---

## 🌐 PARTE 5: DEPLOY NO VERCEL (10-15 minutos)

### Passo 5.1: Criar Conta no GitHub

**Acesse:** https://github.com

1. Clique em **Sign up** (Cadastrar-se)
2. Preencha:
   - Email
   - Senha
   - Username
3. Verifique email
4. Faça login

✅ **Conta criada!**

---

### Passo 5.2: Criar Repositório

**No GitHub:**

1. Clique no **+** (canto superior direito)
2. Selecione **New repository**
3. Preencha:
   - **Repository name**: `atesteme`
   - **Description**: (opcional) "Plataforma de educação digital"
   - **Public** ou **Private**: Escolha Public
   - **NÃO** marque "Add a README file"
4. Clique em **Create repository**

**Resultado:**
- Página com comandos Git aparece
- **DEIXE ESSA PÁGINA ABERTA!**

---

### Passo 5.3: Enviar Código para o GitHub

**No terminal do VS Code, execute UM POR VEZ:**

```bash
git init
```
⏳ *Aguarde... deve aparecer: "Initialized empty Git repository"*

```bash
git add .
```
⏳ *Aguarde... nenhuma mensagem é normal*

```bash
git commit -m "Primeiro commit - ATESTEME"
```
⏳ *Aguarde... aparece lista de arquivos commitados*

```bash
git branch -M main
```
⏳ *Rápido, sem mensagem*

**Agora, COPIE o comando da página do GitHub** (algo como):
```bash
git remote add origin https://github.com/SEU_USUARIO/atesteme.git
```
**Cole no terminal e pressione Enter**

Por fim:
```bash
git push -u origin main
```
⏳ *Aguarde... arquivos sendo enviados...*

**Resultado esperado:**
```
Enumerating objects: 123, done.
Counting objects: 100% (123/123), done.
...
To https://github.com/SEU_USUARIO/atesteme.git
 * [new branch]      main -> main
```

✅ **Código no GitHub!**

**Volte à página do GitHub e atualize** - você verá seus arquivos!

---

### Passo 5.4: Criar Conta no Vercel

**Acesse:** https://vercel.com

1. Clique em **Sign Up**
2. Escolha **Continue with GitHub**
3. Autorize o Vercel a acessar seu GitHub
4. Faça login

✅ **Conta Vercel criada e conectada ao GitHub!**

---

### Passo 5.5: Importar Projeto

**No Dashboard do Vercel:**

1. Clique em **Add New...** (botão azul)
2. Selecione **Project**
3. Na lista, procure `atesteme`
4. Clique em **Import** ao lado dele

**Configuração:**
- **Framework Preset**: Vite (já deve estar selecionado)
- **Root Directory**: `./` (deixe como está)
- **Build Command**: `npm run build` (deixe)
- **Output Directory**: `dist` (deixe)
- **Install Command**: `npm install` (deixe)

**NÃO MUDE NADA!**

5. Clique em **Deploy** (botão azul grande)

---

### Passo 5.6: Aguardar Deploy

**O que acontece:**
1. Barra de progresso aparece
2. Log de build em tempo real
3. Mensagens sobre instalação de pacotes
4. Mensagens sobre build do Vite
5. Otimização de assets

**Aguarde:** 2-4 minutos

**Resultado esperado:**

🎉 **Tela de sucesso com confetes!**

Você vê:
- ✅ Congratulations!
- Link do seu site (ex: `https://atesteme-seu-usuario.vercel.app`)
- Screenshot do site
- Botões: **Visit**, **Continue to Dashboard**

---

### Passo 5.7: Testar Site Online

**Clique em:** **Visit** ou copie o link

**O que acontece:**
- Nova aba abre
- Seu site está online!
- Mesma tela de login que você viu localmente

**Teste:**
1. Faça login
2. Navegue pelas páginas
3. Teste no celular (digite o link no celular)
4. Tente instalar como PWA

✅ **SITE NO AR!** 🚀

---

### Passo 5.8: Configurações Adicionais (Opcional)

**No Dashboard do Vercel:**

- **Domínio personalizado**: Settings > Domains
- **Variáveis de ambiente**: Settings > Environment Variables
- **Analytics**: Analytics (tab)
- **Redeploy**: Deployments > ⋯ > Redeploy

---

## 🔄 PARTE 6: FAZER ALTERAÇÕES (Workflow Diário)

### Cenário: Você quer mudar algo no código

**Passo a passo:**

1. **Edite o arquivo no VS Code**
   - Exemplo: Mude cor, texto, etc.
   - Salve o arquivo (`Ctrl + S`)

2. **Teste localmente**
   ```bash
   npm run dev
   ```
   - Veja mudanças em `http://localhost:5173`

3. **Se estiver OK, commite**
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push
   ```

4. **Vercel atualiza automaticamente!**
   - Aguarde 2-3 minutos
   - Acesse seu link do Vercel
   - Mudança está online!

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### ❌ Erro: "command not found: node"

**Solução:**
1. Instale Node.js: https://nodejs.org
2. Baixe a versão **LTS** (recomendada)
3. Execute o instalador
4. Reinicie o terminal
5. Tente novamente: `node --version`

---

### ❌ Erro ao rodar `npm install`

**Erro:** `npm ERR! code EACCES` ou similar

**Solução 1 - Limpar cache:**
```bash
npm cache clean --force
npm install
```

**Solução 2 - Deletar e reinstalar:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Solução 3 - Usar npm legado:**
```bash
npm install --legacy-peer-deps
```

---

### ❌ Página em branco ao abrir `localhost:5173`

**Solução:**
1. Abra o console do navegador (F12)
2. Veja se tem erros na aba **Console**
3. Se tiver erros, copie e procure no Google
4. Tente reconstruir:
   ```bash
   # Pare o servidor (Ctrl + C)
   rm -rf node_modules dist .vite
   npm install
   npm run dev
   ```

---

### ❌ Porta já em uso

**Erro:** `Port 5173 is already in use`

**Solução:**
```bash
# Use outra porta
npm run dev -- --port 3000
```

Acesse: `http://localhost:3000`

---

### ❌ Erro no Git push

**Erro:** `Permission denied` ou `Authentication failed`

**Solução:**
1. Configure suas credenciais Git:
   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "seu@email.com"
   ```
2. Ou use HTTPS e coloque usuário/senha quando pedir

---

### ❌ Deploy falhou no Vercel

**Solução:**
1. Veja os logs do build no Vercel
2. Procure por erros em vermelho
3. Geralmente é erro de sintaxe ou dependência
4. Corrija o código localmente
5. Faça novo commit:
   ```bash
   git add .
   git commit -m "Fix build error"
   git push
   ```
6. Vercel tenta deploy novamente automaticamente

---

## ✅ CHECKLIST FINAL

Antes de considerar concluído, verifique:

- [ ] `node --version` funciona
- [ ] `npm --version` funciona
- [ ] `git --version` funciona
- [ ] `npm install` completou sem erros
- [ ] `npm run dev` inicia o servidor
- [ ] `http://localhost:5173` abre a aplicação
- [ ] Consegue fazer login
- [ ] Consegue navegar entre páginas
- [ ] Dark mode funciona
- [ ] Código está no GitHub
- [ ] Deploy no Vercel foi bem-sucedido
- [ ] Link do Vercel funciona
- [ ] Site funciona no celular

---

## 🎓 PRÓXIMOS PASSOS

Agora que está tudo funcionando:

1. **Explore o código**
   - Abra `src/app/App.tsx`
   - Veja como as páginas são organizadas
   - Entenda a estrutura de componentes

2. **Faça alterações**
   - Mude cores em `src/styles/theme.css`
   - Mude textos nas páginas
   - Adicione novas funcionalidades

3. **Aprenda mais**
   - Leia a documentação do React
   - Estude Tailwind CSS
   - Entenda PWA

4. **Personalize**
   - Troque o nome "ATESTEME"
   - Mude o logo
   - Ajuste as cores da marca

---

## 📞 RECURSOS ÚTEIS

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Vercel Docs**: https://vercel.com/docs
- **Git Tutorial**: https://git-scm.com/docs/gittutorial

---

**🎉 PARABÉNS! Você completou o tutorial!** 🎉

Seu projeto está rodando localmente E online no Vercel! 🚀
