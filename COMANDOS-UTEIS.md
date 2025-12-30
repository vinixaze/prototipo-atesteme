# 📝 Comandos Úteis - Atesteme

## 🚀 Comandos Básicos

### Instalar dependências
```bash
npm install
```

### Rodar em desenvolvimento
```bash
npm run dev
```

### Fazer build para produção
```bash
npm run build
```

### Visualizar build localmente
```bash
npm run preview
```

---

## 📦 Git - Comandos Essenciais

### Primeira vez configurando Git
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

### Inicializar repositório
```bash
git init
```

### Verificar status dos arquivos
```bash
git status
```

### Adicionar todos os arquivos
```bash
git add .
```

### Fazer commit
```bash
git commit -m "Sua mensagem descritiva"
```

### Ver histórico de commits
```bash
git log
```

### Ver diferenças
```bash
git diff
```

---

## 🌐 GitHub - Subir código

### Conectar repositório remoto
```bash
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

### Verificar repositório remoto
```bash
git remote -v
```

### Enviar código para GitHub (primeira vez)
```bash
git push -u origin main
```

### Enviar atualizações
```bash
git push
```

### Baixar atualizações
```bash
git pull
```

---

## 🔄 Workflow Completo (Dia a Dia)

### Depois de fazer mudanças no código:

1. **Ver o que mudou:**
```bash
git status
```

2. **Adicionar as mudanças:**
```bash
git add .
```

3. **Fazer commit:**
```bash
git commit -m "Descrição do que você mudou"
```

4. **Enviar para GitHub:**
```bash
git push
```

5. **A Vercel vai fazer deploy automaticamente!**

---

## 🎯 Exemplos de Mensagens de Commit

### Boas mensagens:
```bash
git commit -m "Adiciona página de perfil do usuário"
git commit -m "Corrige bug no sistema de login"
git commit -m "Melhora responsividade do dashboard"
git commit -m "Atualiza cores do módulo Prosaeb"
git commit -m "Adiciona animação nos cards de competências"
```

### Mensagens ruins (evitar):
```bash
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
git commit -m "asdfasdf"
```

---

## 🆘 Comandos de Emergência

### Desfazer último commit (mantendo as mudanças)
```bash
git reset --soft HEAD~1
```

### Desfazer mudanças não commitadas
```bash
git checkout -- .
```

### Ver branches
```bash
git branch
```

### Criar nova branch
```bash
git checkout -b nome-da-branch
```

### Trocar de branch
```bash
git checkout main
```

---

## 📱 NPM - Gerenciar Pacotes

### Instalar pacote específico
```bash
npm install nome-do-pacote
```

### Instalar pacote de desenvolvimento
```bash
npm install --save-dev nome-do-pacote
```

### Remover pacote
```bash
npm uninstall nome-do-pacote
```

### Atualizar todos os pacotes
```bash
npm update
```

### Verificar pacotes desatualizados
```bash
npm outdated
```

### Limpar cache
```bash
npm cache clean --force
```

---

## 🧹 Limpeza

### Deletar node_modules e reinstalar
```bash
# Windows
rmdir /s /q node_modules
npm install

# Mac/Linux
rm -rf node_modules
npm install
```

### Deletar node_modules e build
```bash
# Windows
rmdir /s /q node_modules dist
npm install

# Mac/Linux
rm -rf node_modules dist
npm install
```

---

## 🔍 Debugging

### Ver versão do Node
```bash
node -v
```

### Ver versão do NPM
```bash
npm -v
```

### Ver versão do Git
```bash
git --version
```

### Verificar erros no package.json
```bash
npm doctor
```

---

## 🌐 Vercel CLI (Opcional)

### Instalar Vercel CLI globalmente
```bash
npm install -g vercel
```

### Login na Vercel
```bash
vercel login
```

### Deploy direto do terminal
```bash
vercel
```

### Deploy para produção
```bash
vercel --prod
```

---

## ⚡ Atalhos do VSCode

### Terminal
- **Abrir terminal:** `Ctrl + '`
- **Novo terminal:** `Ctrl + Shift + '`
- **Fechar terminal:** Digite `exit` ou clique no lixeira

### Arquivos
- **Abrir arquivo:** `Ctrl + P`
- **Salvar:** `Ctrl + S`
- **Salvar todos:** `Ctrl + K S`

### Edição
- **Buscar:** `Ctrl + F`
- **Substituir:** `Ctrl + H`
- **Comentar linha:** `Ctrl + /`

---

## 📊 Verificar uso de disco

### Ver tamanho dos node_modules
```bash
# Windows PowerShell
(Get-ChildItem node_modules -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB

# Mac/Linux
du -sh node_modules
```

---

## 🎯 Sequência Completa: Do Zero ao Deploy

```bash
# 1. Clonar/baixar projeto
cd caminho/para/pasta

# 2. Instalar dependências
npm install

# 3. Rodar localmente para testar
npm run dev

# 4. Fazer mudanças no código...

# 5. Inicializar Git (primeira vez)
git init
git add .
git commit -m "Primeiro commit"

# 6. Conectar GitHub (primeira vez)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main

# 7. Para mudanças futuras
git add .
git commit -m "Descrição das mudanças"
git push

# 8. Vercel faz deploy automático!
```

---

## 💡 Dicas Úteis

1. **Sempre rode `npm run dev` antes de fazer commit** para garantir que está tudo funcionando
2. **Faça commits pequenos e frequentes** ao invés de um commit gigante
3. **Use mensagens de commit descritivas** para saber o que mudou
4. **Teste o build localmente** com `npm run build` antes de fazer deploy
5. **Mantenha o node_modules no .gitignore** (já está configurado)

---

**Salve este arquivo para consulta rápida!** 📌
