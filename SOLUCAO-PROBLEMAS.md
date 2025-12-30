# 🆘 Solução de Problemas - Atesteme

## 🔴 Problemas na Instalação

### ❌ Erro: "npm não é reconhecido como comando"

**Causa:** Node.js não instalado ou não está no PATH

**Solução:**
1. Baixe o Node.js: [nodejs.org](https://nodejs.org)
2. Instale a versão LTS (recomendada)
3. **IMPORTANTE:** Marque a opção "Add to PATH" durante instalação
4. Reinicie o computador
5. Abra o terminal e teste:
```bash
node -v
npm -v
```

---

### ❌ Erro: "EACCES: permission denied"

**Causa:** Sem permissão para instalar pacotes

**Solução Windows:**
1. Feche o VSCode
2. Clique com botão direito no VSCode
3. Selecione "Executar como administrador"
4. Rode novamente: `npm install`

**Solução Mac/Linux:**
```bash
sudo npm install
```

---

### ❌ Erro: "npm ERR! code ENOENT"

**Causa:** Você não está na pasta correta do projeto

**Solução:**
1. Verifique se você está na pasta correta:
```bash
pwd  # Mac/Linux
cd   # Windows
```

2. Certifique-se de estar na pasta que contém o `package.json`
3. No VSCode, use: **Terminal → New Terminal** (abre automaticamente na pasta certa)

---

### ❌ Erro: "Module not found" ou "Cannot find module"

**Causa:** Dependências não instaladas ou corrompidas

**Solução:**
1. Delete a pasta `node_modules` e o arquivo `package-lock.json`
2. Reinstale:
```bash
npm install
```

**Windows (PowerShell):**
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

**Mac/Linux:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🔴 Problemas ao Rodar Localmente

### ❌ Erro: "Port 5173 is already in use"

**Causa:** Outra instância do projeto já está rodando

**Solução 1 - Fechar processo:**
- **Windows:** Pressione `Ctrl+C` em todos os terminais abertos
- Ou vá no Gerenciador de Tarefas e finalize processos "Node.js"

**Solução 2 - Usar outra porta:**
```bash
npm run dev -- --port 3000
```
Depois acesse: `http://localhost:3000`

---

### ❌ Erro: "Failed to load config"

**Causa:** Problema no arquivo de configuração do Vite

**Solução:**
1. Verifique se o arquivo `vite.config.ts` existe
2. Reinstale as dependências:
```bash
npm install
```

---

### ❌ Página em branco no navegador

**Causa:** Erros no código JavaScript

**Solução:**
1. Abra o Console do navegador:
   - Chrome/Edge: Pressione `F12`
   - Vá na aba "Console"
2. Veja a mensagem de erro
3. No VSCode, pressione `Ctrl+Shift+M` para ver erros
4. Corrija os erros indicados

---

### ❌ Imagens não aparecem

**Causa:** Caminho incorreto das imagens

**Solução:**
- Imagens devem estar em `/public` ou importadas com `import`
- Use caminhos relativos corretos
- Exemplo: `<img src="/icons/logo.png" />`

---

## 🔴 Problemas com Git/GitHub

### ❌ Erro: "git não é reconhecido"

**Causa:** Git não instalado

**Solução:**
1. Baixe: [git-scm.com/download](https://git-scm.com/download)
2. Instale com opções padrão
3. Reinicie o VSCode
4. Teste: `git --version`

---

### ❌ Erro: "Permission denied (publickey)"

**Causa:** SSH não configurado

**Solução - Use HTTPS em vez de SSH:**
```bash
git remote set-url origin https://github.com/SEU-USUARIO/SEU-REPO.git
```

---

### ❌ Erro: "remote: Repository not found"

**Causa:** URL do repositório incorreta ou repositório não existe

**Solução:**
1. Verifique se o repositório existe no GitHub
2. Corrija a URL:
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/NOME-CORRETO.git
```

---

### ❌ Erro: "fatal: not a git repository"

**Causa:** Git não foi inicializado na pasta

**Solução:**
```bash
git init
```

---

### ❌ Conflitos ao fazer push

**Causa:** Versão remota diferente da local

**Solução:**
```bash
git pull origin main --rebase
git push origin main
```

---

## 🔴 Problemas no Deploy (Vercel)

### ❌ Build Failed - "Command failed"

**Causa:** Erros no código que impedem compilação

**Solução:**
1. Teste o build localmente:
```bash
npm run build
```

2. Veja os erros no terminal
3. Corrija os erros
4. Teste novamente localmente
5. Faça commit e push das correções

---

### ❌ Deploy Failed - "Install command failed"

**Causa:** Problema nas dependências

**Solução:**
1. Verifique se `package.json` está correto
2. Teste localmente:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. Se funcionar localmente, faça commit do `package-lock.json`:
```bash
git add package-lock.json
git commit -m "Fix package-lock.json"
git push
```

---

### ❌ Site funcionando localmente mas não na Vercel

**Causa:** Caminhos absolutos ou variáveis de ambiente

**Solução:**
1. Use sempre caminhos relativos
2. Imagens devem estar em `/public`
3. Verifique o console do navegador no site publicado (F12)

---

### ❌ PWA não funciona no deploy

**Causa:** Service Worker bloqueado

**Solução:**
- PWA só funciona em HTTPS (Vercel já usa)
- Certifique-se que `manifest.json` está em `/public`
- Aguarde 5 minutos após deploy
- Limpe o cache do navegador (`Ctrl+Shift+Delete`)
- Teste em navegador anônimo

---

### ❌ Erro 404 ao recarregar página

**Causa:** SPA routing não configurado

**Solução:**
- O arquivo `vercel.json` já está configurado para isso
- Se persistir, adicione nas configurações da Vercel:
  - Rewrites: `/*` → `/index.html`

---

## 🔴 Problemas de Performance

### ❌ Build muito lento

**Solução:**
1. Limpe o cache:
```bash
npm cache clean --force
rm -rf node_modules .vite
npm install
```

---

### ❌ Site carregando lento

**Solução:**
1. Otimize imagens (use formato WebP)
2. Imagens grandes devem estar otimizadas
3. Use lazy loading para imagens:
```jsx
<img loading="lazy" src="..." />
```

---

## 🔴 Problemas no VSCode

### ❌ IntelliSense não funciona

**Solução:**
1. Pressione `Ctrl+Shift+P`
2. Digite: "TypeScript: Restart TS Server"
3. Pressione Enter

---

### ❌ Extensões recomendadas

Instale essas extensões no VSCode:
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **GitLens**
- **Error Lens**
- **Prettier**

---

## 🔴 Problemas com TypeScript

### ❌ Erro: "Cannot find name" ou "Type error"

**Solução:**
1. Ignore temporariamente com:
```typescript
// @ts-ignore
```

2. Ou adicione tipagem correta:
```typescript
const minhaVariavel: string = "valor";
```

---

## 🔴 Problemas com Dark Mode

### ❌ Dark mode não funciona

**Solução:**
1. Verifique se está usando classes `dark:` do Tailwind
2. O estado deve estar salvo no localStorage
3. Limpe o cache do navegador

---

## 🔴 Comandos de Emergência

### 🧹 Limpeza Total e Reinstalação

**Windows (PowerShell):**
```bash
Remove-Item -Recurse -Force node_modules, dist, .vite
Remove-Item package-lock.json
npm cache clean --force
npm install
npm run dev
```

**Mac/Linux:**
```bash
rm -rf node_modules dist .vite package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

### 🔄 Reset Git (CUIDADO!)

**Desfazer todas as mudanças locais:**
```bash
git reset --hard HEAD
git clean -fd
```

**⚠️ ATENÇÃO:** Isso vai APAGAR todas as mudanças não commitadas!

---

## 📞 Ainda com Problemas?

### 1. **Copie a mensagem de erro completa**
   - Tire um print ou copie o texto

### 2. **Verifique:**
   - Qual comando você executou?
   - Em qual etapa está?
   - O que apareceu no terminal?

### 3. **Informações úteis:**
   - Sistema operacional: Windows/Mac/Linux
   - Versão do Node: `node -v`
   - Versão do NPM: `npm -v`
   - Mensagem de erro completa

---

## 🎯 Checklist de Verificação

Antes de pedir ajuda, verifique:

- [ ] Node.js está instalado? (`node -v`)
- [ ] NPM está instalado? (`npm -v`)
- [ ] Está na pasta correta? (tem `package.json`?)
- [ ] Rodou `npm install`?
- [ ] Tem arquivo `.gitignore`?
- [ ] Git está instalado? (`git --version`)
- [ ] Repositório GitHub existe?
- [ ] Vercel está conectado ao GitHub?

---

## 💡 Dicas Preventivas

1. ✅ Sempre faça `npm run dev` antes de commit
2. ✅ Teste `npm run build` antes de fazer deploy
3. ✅ Faça commits pequenos e frequentes
4. ✅ Escreva mensagens de commit descritivas
5. ✅ Mantenha o Node.js atualizado
6. ✅ Não edite `node_modules` manualmente
7. ✅ Sempre use o terminal integrado do VSCode
8. ✅ Mantenha backup do código

---

**Este guia resolve 99% dos problemas comuns! 🎯**
