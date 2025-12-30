# 🚀 INÍCIO RÁPIDO - 5 MINUTOS

## ⚡ OPÇÃO 1: Rodar Localmente (MAIS RÁPIDO)

### Passo 1: Abrir o Terminal
- Abra o VS Code
- Menu: **Terminal** → **New Terminal**
- Ou atalho: `Ctrl + '` (Windows/Linux) ou `Cmd + '` (Mac)

### Passo 2: Instalar
Cole no terminal e pressione Enter:
```bash
npm install
```
⏳ Aguarde 1-2 minutos...

### Passo 3: Rodar
Cole no terminal e pressione Enter:
```bash
npm run dev
```

### Passo 4: Abrir
Abra seu navegador em:
```
http://localhost:5173
```

✅ **PRONTO! A plataforma está rodando!**

---

## 🌐 OPÇÃO 2: Publicar no Vercel (10 MINUTOS)

### Passo 1: Criar conta no GitHub
1. Acesse: https://github.com
2. Clique em **Sign up**
3. Crie sua conta

### Passo 2: Criar repositório
1. Acesse: https://github.com/new
2. Nome: `atesteme`
3. Deixe **Public**
4. Clique em **Create repository**
5. **DEIXE A PÁGINA ABERTA** - você vai precisar dela

### Passo 3: Subir código para o GitHub
No terminal do VS Code, cole estes comandos **UM POR VEZ**:

```bash
git init
```
Pressione Enter. Aguarde.

```bash
git add .
```
Pressione Enter. Aguarde.

```bash
git commit -m "Primeiro commit"
```
Pressione Enter. Aguarde.

```bash
git branch -M main
```
Pressione Enter.

Agora cole o comando que está na página do GitHub (algo como):
```bash
git remote add origin https://github.com/SEU_USUARIO/atesteme.git
```
⚠️ **IMPORTANTE**: Use O COMANDO que aparece NA SUA tela do GitHub!

Por fim:
```bash
git push -u origin main
```
Pressione Enter. Aguarde.

### Passo 4: Criar conta no Vercel
1. Acesse: https://vercel.com
2. Clique em **Sign Up**
3. Escolha **Continue with GitHub**
4. Autorize o Vercel no GitHub

### Passo 5: Importar projeto
1. No Vercel, clique em **Add New** → **Project**
2. Procure por `atesteme` na lista
3. Clique em **Import**
4. **NÃO MUDE NADA** nas configurações
5. Clique em **Deploy**

### Passo 6: Aguardar deploy
⏳ Aguarde 2-3 minutos...

✅ **PRONTO! Seu site está no ar!**

O Vercel vai mostrar um link como:
```
https://atesteme-seu-usuario.vercel.app
```

---

## 📱 TESTAR NO CELULAR

1. Abra o link do Vercel no celular
2. No **Chrome/Safari**, abra o menu (⋮)
3. Clique em **Adicionar à tela inicial**
4. O app será instalado! 🎉

---

## 🔄 FAZER ALTERAÇÕES

Depois que tudo estiver funcionando, para fazer alterações:

### 1. Edite os arquivos no VS Code

### 2. Teste localmente:
```bash
npm run dev
```

### 3. Se estiver OK, envie para o GitHub:
```bash
git add .
git commit -m "Descrição da alteração"
git push
```

### 4. Vercel atualiza automaticamente!
Aguarde 2-3 minutos e seu site estará atualizado.

---

## ❓ TEM DÚVIDAS?

### "Como vejo se está funcionando localmente?"
Acesse: http://localhost:5173
Se aparecer a tela de login, está funcionando!

### "Como paro o servidor local?"
Pressione `Ctrl + C` no terminal.

### "Como rodo de novo?"
```bash
npm run dev
```

### "Deu erro ao instalar"
Tente:
```bash
npm cache clean --force
npm install
```

### "A página não abre"
Certifique-se de que:
1. O comando `npm run dev` está rodando
2. Não tem outro programa usando a porta 5173
3. Você acessou exatamente: http://localhost:5173

### "Erro no Vercel"
1. Verifique se o build local funciona:
   ```bash
   npm run build
   ```
2. Se funcionar, faça um novo commit:
   ```bash
   git add .
   git commit -m "Fix build"
   git push
   ```

---

## 📞 VERIFICAÇÃO RÁPIDA

Antes de qualquer coisa, verifique se tem instalado:

```bash
# Verificar Node.js
node --version
# Deve mostrar: v18.x.x ou superior

# Verificar npm
npm --version
# Deve mostrar: 9.x.x ou superior

# Verificar Git
git --version
# Deve mostrar: git version 2.x.x
```

Se algum comando não funcionar, você precisa instalar:
- **Node.js**: https://nodejs.org (versão LTS)
- **Git**: https://git-scm.com

---

## 🎯 RESUMO DE 3 COMANDOS

Para rodar o projeto:
```bash
npm install
npm run dev
# Abra: http://localhost:5173
```

---

## 📚 PRÓXIMOS PASSOS

Depois que estiver funcionando, leia:
1. **README.md** - Documentação completa
2. **COMANDOS.md** - Todos os comandos úteis
3. **CHECKLIST-DEPLOY.md** - Antes de fazer deploy

---

**🎉 Boa sorte! Em 5 minutos você terá a plataforma rodando!**
