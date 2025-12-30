# ❓ FAQ - Perguntas Frequentes

## 📋 ÍNDICE

- [Instalação e Configuração](#instalação-e-configuração)
- [Execução Local](#execução-local)
- [Git e GitHub](#git-e-github)
- [Deploy no Vercel](#deploy-no-vercel)
- [Erros Comuns](#erros-comuns)
- [Funcionalidades](#funcionalidades)
- [Personalização](#personalização)
- [Performance](#performance)

---

## 🔧 INSTALAÇÃO E CONFIGURAÇÃO

### P: Qual versão do Node.js preciso?

**R:** Versão 18 ou superior (LTS recomendada).

Verifique com: `node --version`

Baixe em: https://nodejs.org

---

### P: Preciso instalar algo além do Node.js?

**R:** Sim:
- **Git**: https://git-scm.com (para controle de versão)
- **VS Code**: https://code.visualstudio.com (editor recomendado)

---

### P: Posso usar Yarn ou PNPM ao invés de npm?

**R:** Sim! Comandos equivalentes:

```bash
# npm
npm install
npm run dev

# yarn
yarn
yarn dev

# pnpm
pnpm install
pnpm dev
```

---

### P: Quanto espaço em disco preciso?

**R:** Aproximadamente:
- Projeto base: ~50 MB
- node_modules: ~400-500 MB
- Total: ~550 MB

---

## 🚀 EXECUÇÃO LOCAL

### P: Como sei se está rodando corretamente?

**R:** Você deve ver no terminal:

```
VITE v6.3.5  ready in 823 ms
➜  Local:   http://localhost:5173/
```

E ao acessar `http://localhost:5173`, vê a tela de login.

---

### P: A página recarrega automaticamente ao editar?

**R:** Sim! O Vite tem **Hot Module Replacement (HMR)**. Basta salvar o arquivo e a página atualiza automaticamente.

---

### P: Como parar o servidor?

**R:** Pressione `Ctrl + C` no terminal onde está rodando `npm run dev`.

---

### P: Posso rodar em outra porta?

**R:** Sim!

```bash
npm run dev -- --port 3000
```

Depois acesse: `http://localhost:3000`

---

### P: Como ver em outro dispositivo na mesma rede?

**R:** 

1. Execute com `--host`:
   ```bash
   npm run dev -- --host
   ```

2. O terminal mostra o IP da rede:
   ```
   ➜  Network: http://192.168.1.100:5173/
   ```

3. Acesse esse IP em outro dispositivo na mesma Wi-Fi

---

## 🌿 GIT E GITHUB

### P: Nunca usei Git. Preciso aprender tudo?

**R:** Não! Você só precisa de 5 comandos:

```bash
git add .              # Adiciona arquivos
git commit -m "..."    # Salva mudanças
git push               # Envia para GitHub
git status             # Ver o que mudou
git log --oneline      # Ver histórico
```

---

### P: O que é "commit"?

**R:** É como tirar uma "foto" do seu código naquele momento. Você pode voltar a essa versão depois se quiser.

---

### P: Devo commitar sempre que mudar algo?

**R:** Boa prática:
- Commit a cada funcionalidade completa
- Commit antes de fazer algo arriscado
- Commit pelo menos 1x por dia de trabalho

---

### P: O que escrever na mensagem do commit?

**R:** Seja descritivo e objetivo:

✅ **Bom:**
- "Adiciona dark mode"
- "Corrige bug no login"
- "Melhora responsividade mobile"

❌ **Ruim:**
- "update"
- "changes"
- "fix"

---

### P: Comiti algo errado! Como desfazer?

**R:** Se ainda NÃO fez push:

```bash
# Desfaz último commit, mantém alterações
git reset --soft HEAD~1

# Desfaz último commit, descarta alterações
git reset --hard HEAD~1
```

Se JÁ fez push: melhor fazer um novo commit corrigindo.

---

## 🌐 DEPLOY NO VERCEL

### P: O Vercel é gratuito?

**R:** Sim! O plano gratuito (Hobby) inclui:
- Deploys ilimitados
- 100 GB de bandwidth/mês
- SSL automático (HTTPS)
- Domínios .vercel.app

---

### P: Preciso de cartão de crédito?

**R:** Não! O plano gratuito não pede cartão.

---

### P: Quanto tempo leva o primeiro deploy?

**R:** Geralmente 2-4 minutos:
- Clonando repositório: 10s
- Instalando dependências: 1-2 min
- Build: 30-60s
- Deploy: 10-30s

---

### P: Como atualizar o site depois?

**R:** Basta fazer push para o GitHub:

```bash
git add .
git commit -m "Atualização"
git push
```

O Vercel detecta e faz redeploy automaticamente!

---

### P: Posso usar domínio próprio?

**R:** Sim!

1. No Vercel: Settings > Domains
2. Adicione seu domínio (ex: `meusite.com`)
3. Configure DNS conforme instruções
4. Vercel configura HTTPS automaticamente

---

### P: Como ver logs de erro do site?

**R:** No Dashboard do Vercel:
1. Clique no seu projeto
2. Aba **Deployments**
3. Clique no deploy específico
4. Veja **Build Logs** ou **Function Logs**

---

### P: O site ficará offline se eu apagar o repositório?

**R:** Sim! O Vercel precisa do repositório. Se apagar, o site sai do ar.

---

## 🐛 ERROS COMUNS

### P: "npm: command not found"

**R:** Node.js não está instalado.

**Solução:** Instale Node.js de https://nodejs.org e reinicie o terminal.

---

### P: "EACCES: permission denied"

**R:** Problema de permissões (comum no macOS/Linux).

**Solução:**
```bash
sudo npm install -g npm@latest
```

Ou use NVM: https://github.com/nvm-sh/nvm

---

### P: "Port 5173 is already in use"

**R:** Outro processo está usando a porta.

**Solução 1 - Usar outra porta:**
```bash
npm run dev -- --port 3000
```

**Solução 2 - Matar processo:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID [número] /F

# macOS/Linux
lsof -ti:5173 | xargs kill -9
```

---

### P: "Cannot find module 'react'"

**R:** Dependências não instaladas.

**Solução:**
```bash
npm install
```

---

### P: Página em branco no navegador

**R:** Erro no código ou build.

**Solução:**
1. Abra console do navegador (F12)
2. Veja erros na aba Console
3. Verifique terminal onde rodou `npm run dev`
4. Procure por erros em vermelho

---

### P: "git: command not found"

**R:** Git não está instalado.

**Solução:** Instale Git de https://git-scm.com e reinicie o terminal.

---

### P: Build falha no Vercel com "out of memory"

**R:** Build muito pesado para o plano gratuito.

**Solução:**
```bash
# Adicione em vercel.json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max_old_space_size=4096"
    }
  }
}
```

---

## 🎨 FUNCIONALIDADES

### P: Como trocar as cores do tema?

**R:** Edite `src/styles/theme.css`:

```css
:root {
  --color-primary: #8B27FF; /* Roxo principal */
  --color-info: #FFD700;    /* Amarelo */
  /* etc... */
}
```

---

### P: Como adicionar uma nova página?

**R:**

1. Crie arquivo em `src/app/pages/MinhaPage.tsx`
2. Adicione rota em `src/app/App.tsx`
3. Adicione link na Sidebar

Exemplo:
```typescript
// MinhaPage.tsx
export default function MinhaPage() {
  return <div>Minha nova página!</div>
}

// App.tsx
case 'minha-pagina':
  return <MinhaPage />
```

---

### P: Como mudar o logo?

**R:** Substitua as imagens em `public/icons/` pelos seus logos.

Tamanhos necessários:
- 192x192 (icon-192.png)
- 512x512 (icon-512.png)
- 180x180 (apple-touch-icon.png)

---

### P: Os dados são salvos em banco?

**R:** Não. O projeto usa **dados mockados** (falsos) para demonstração.

Para salvar de verdade, você precisaria:
- Backend (Node.js, Python, etc.)
- Banco de dados (PostgreSQL, MongoDB, etc.)
- Ou serviço como Supabase, Firebase

---

### P: Como adicionar autenticação real?

**R:** Opções:

1. **Firebase Auth**: https://firebase.google.com
2. **Supabase Auth**: https://supabase.com
3. **Auth0**: https://auth0.com
4. **NextAuth.js**: https://next-auth.js.org

---

## 🎨 PERSONALIZAÇÃO

### P: Como remover dark mode?

**R:** Remova o toggle em `src/app/components/Header.tsx`:

```typescript
// Encontre e remova/comente esta linha:
<button onClick={toggleTheme}>...</button>
```

---

### P: Como mudar o nome "ATESTEME"?

**R:** Busque e substitua em todos os arquivos:

1. No VS Code: `Ctrl + Shift + F`
2. Busque: `ATESTEME`
3. Substitua por: `SEU NOME`
4. Click em **Replace All**

Também mude em:
- `public/manifest.json` (campo "name")
- `index.html` (tag `<title>`)

---

### P: Como adicionar Google Analytics?

**R:**

1. Crie conta no Google Analytics
2. Obtenha ID de medição (G-XXXXXXXXXX)
3. Adicione em `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

### P: Como mudar a fonte?

**R:** Edite `src/styles/fonts.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=SUA_FONTE&display=swap');

* {
  font-family: 'SUA_FONTE', sans-serif;
}
```

---

## 🚀 PERFORMANCE

### P: Como melhorar a velocidade do site?

**R:** O Vite já otimiza automaticamente, mas você pode:

1. **Lazy loading de imagens:**
   ```tsx
   <img loading="lazy" src="..." />
   ```

2. **Code splitting:**
   ```tsx
   const MinhaPage = lazy(() => import('./pages/MinhaPage'));
   ```

3. **Otimizar imagens** antes de usar (use https://tinypng.com)

---

### P: O build está muito grande!

**R:** Veja o que está ocupando espaço:

```bash
npm run build
npx vite-bundle-visualizer
```

Isso abre um gráfico mostrando o tamanho de cada pacote.

---

### P: Como ativar cache no navegador?

**R:** O Vercel já configura cache automaticamente. Mas você pode ajustar em `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

### P: PWA está funcionando?

**R:** Teste em:

1. **Localmente**: http://localhost:5173/pwa-test.html
2. **Produção**: Abra DevTools > Application > Service Workers

Se aparecer "activated and is running", está funcionando!

---

## 🔐 SEGURANÇA

### P: É seguro deixar o código público no GitHub?

**R:** Sim, desde que:
- ❌ Não tenha senhas/chaves de API no código
- ❌ Não tenha dados sensíveis
- ❌ Não tenha tokens de autenticação

Use variáveis de ambiente para dados sensíveis.

---

### P: Como usar variáveis de ambiente?

**R:**

1. Crie `.env.local`:
   ```
   VITE_API_KEY=sua_chave_aqui
   ```

2. Use no código:
   ```typescript
   const apiKey = import.meta.env.VITE_API_KEY;
   ```

3. No Vercel: Settings > Environment Variables

⚠️ **IMPORTANTE:** Nunca commite `.env.local`!

---

## 📱 MOBILE E PWA

### P: Como testar no celular?

**R:**

1. Execute `npm run dev -- --host`
2. Veja o IP da rede no terminal
3. Acesse esse IP no celular
4. Certifique-se de estar na mesma Wi-Fi

---

### P: Como instalar como app no celular?

**R:**

**Android (Chrome):**
1. Abra o site
2. Menu (⋮) > "Adicionar à tela inicial"
3. Confirme

**iOS (Safari):**
1. Abra o site
2. Botão compartilhar
3. "Adicionar à Tela de Início"

---

### P: PWA funciona offline?

**R:** Sim! O Service Worker em `public/service-worker.js` faz cache de:
- HTML, CSS, JS
- Imagens e ícones
- Fontes

Páginas visitadas ficam disponíveis offline.

---

## 💡 DICAS E TRUQUES

### P: Atalhos úteis do VS Code?

**R:**

- `Ctrl + P`: Buscar arquivo
- `Ctrl + Shift + P`: Comando
- `Ctrl + ` `: Terminal
- `Ctrl + B`: Toggle sidebar
- `Alt + ↑/↓`: Mover linha
- `Ctrl + /`: Comentar linha
- `F2`: Renomear símbolo

---

### P: Como ver todas as páginas do projeto?

**R:** Olhe em `src/app/pages/`:

```
src/app/pages/
├── LoginPage.tsx
├── DashboardPage.tsx
├── HabilidadesPage.tsx
├── ProgressoPage.tsx
├── NocoesBasicasPage.tsx
├── TesteCompetenciasPage.tsx
├── QuizPage.tsx
├── PerfilPage.tsx
└── ... (outras)
```

---

### P: Onde estão os componentes reutilizáveis?

**R:** Em `src/app/components/`:

```
src/app/components/
├── Header.tsx
├── Sidebar.tsx
├── ProgressTracker.tsx
├── CompetencyTimer.tsx
├── Toast.tsx
└── ... (outros)
```

---

### P: Como contribuir com melhorias?

**R:**

1. Faça fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit: `git commit -m "Add minha feature"`
4. Push: `git push origin minha-feature`
5. Abra Pull Request

---

## 🆘 AINDA TEM DÚVIDAS?

### Recursos adicionais:

1. **Documentação do React**: https://react.dev
2. **Documentação do Vite**: https://vitejs.dev
3. **Tailwind CSS**: https://tailwindcss.com/docs
4. **Vercel Docs**: https://vercel.com/docs
5. **MDN Web Docs**: https://developer.mozilla.org

### Não achou sua resposta?

1. Veja **COMANDOS.md** (seção Solução de Problemas)
2. Procure o erro no Google
3. Veja issues no GitHub (se for open source)
4. Pergunte no Stack Overflow

---

**💡 Dica:** Use `Ctrl + F` nesta página para buscar sua dúvida específica!
