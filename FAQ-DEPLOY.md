# ❓ FAQ - Perguntas Frequentes sobre Deploy

## 📚 Índice de Perguntas

### 💰 Custos
- [É grátis?](#é-grátis)
- [Preciso de cartão de crédito?](#preciso-de-cartão-de-crédito)
- [Tem limite de uso?](#tem-limite-de-uso)

### ⏱️ Tempo
- [Quanto tempo leva?](#quanto-tempo-leva)
- [O site fica lento?](#o-site-fica-lento)
- [Quanto tempo o site fica no ar?](#quanto-tempo-o-site-fica-no-ar)

### 🔧 Técnicas
- [Preciso saber programar?](#preciso-saber-programar)
- [Funciona no Windows/Mac/Linux?](#funciona-no-windowsmaclinux)
- [Posso usar meu próprio domínio?](#posso-usar-meu-próprio-domínio)
- [Como atualizar o site?](#como-atualizar-o-site)

### 🌐 Vercel
- [Por que Vercel?](#por-que-vercel)
- [Posso usar outra plataforma?](#posso-usar-outra-plataforma)
- [O que acontece se eu exceder o limite grátis?](#o-que-acontece-se-eu-exceder-o-limite-grátis)

### 📱 PWA
- [O que é PWA?](#o-que-é-pwa)
- [Funciona offline?](#funciona-offline)
- [Como instalar no celular?](#como-instalar-no-celular)

### 🔒 Segurança
- [O site é seguro?](#o-site-é-seguro)
- [Tem HTTPS?](#tem-https)
- [Posso adicionar autenticação?](#posso-adicionar-autenticação)

---

## 💰 Custos

### É grátis?

**SIM!** Totalmente grátis! ✅

- ✅ Node.js - Grátis
- ✅ VSCode - Grátis
- ✅ Git - Grátis
- ✅ GitHub - Grátis (para repositórios públicos e privados)
- ✅ Vercel - Grátis (plano Hobby)

**Limitações do plano grátis da Vercel:**
- 100 GB de bandwidth por mês
- 100 builds por dia
- Unlimited deployments

**Para uso pessoal, educacional ou pequenos projetos, isso é MAIS do que suficiente!**

---

### Preciso de cartão de crédito?

**NÃO!** ❌

Nem GitHub nem Vercel exigem cartão de crédito para o plano grátis.

---

### Tem limite de uso?

**Sim, mas é bem generoso:**

**GitHub (grátis):**
- Repositórios ilimitados
- 500 MB de storage
- 1 GB de bandwidth por mês

**Vercel (Hobby - grátis):**
- 100 GB de bandwidth/mês
- 100 builds/dia
- Projetos ilimitados
- Deploy automático

**Para referência:** Um site educacional como o Atesteme com 1000 visitantes/mês consome aproximadamente 5-10 GB de bandwidth.

---

## ⏱️ Tempo

### Quanto tempo leva?

**Primeira vez (do zero ao deploy completo):**
- ⏱️ Instalar ferramentas: 15 minutos
- ⏱️ Configurar projeto: 5 minutos
- ⏱️ Deploy: 5 minutos
- **Total: ~25-40 minutos**

**Próximas vezes (atualizar):**
- ⏱️ Fazer mudanças: quanto tempo quiser
- ⏱️ Git push: 30 segundos
- ⏱️ Deploy automático: 2-3 minutos
- **Total: ~3 minutos**

---

### O site fica lento?

**NÃO!** 🚀

A Vercel usa CDN global (Content Delivery Network):
- Servidores em todo o mundo
- Carregamento ultra-rápido
- Cache automático
- Otimização automática

**Performance típica:**
- Primeira carga: 1-2 segundos
- Navegação: Instantânea
- PWA instalado: Ainda mais rápido!

---

### Quanto tempo o site fica no ar?

**Para sempre!** ∞

O plano gratuito da Vercel:
- ✅ Sem data de expiração
- ✅ Sem limite de tempo
- ✅ 99.9% de uptime

**Seu site só sai do ar se:**
- Você deletar manualmente
- Exceder MUITO os limites (difícil de acontecer)
- Violar os termos de uso

---

## 🔧 Técnicas

### Preciso saber programar?

**Para rodar o projeto:** NÃO! ❌
- Basta seguir os passos do guia
- Copiar e colar comandos

**Para modificar o projeto:** SIM! ✅
- Conhecimento básico de React
- HTML/CSS/JavaScript
- Mas você pode aprender fazendo!

**Recomendação:** Comece rodando, depois aprenda a modificar aos poucos.

---

### Funciona no Windows/Mac/Linux?

**SIM!** Funciona em todos! ✅

**Windows:**
- ✅ Windows 10
- ✅ Windows 11
- ✅ Windows 8.1 (com atualizações)

**Mac:**
- ✅ macOS 10.14+
- ✅ Intel e Apple Silicon (M1/M2)

**Linux:**
- ✅ Ubuntu
- ✅ Debian
- ✅ Fedora
- ✅ Arch
- ✅ Qualquer distro com Node.js

---

### Posso usar meu próprio domínio?

**SIM!** ✅

**URL padrão da Vercel:**
```
https://seu-projeto.vercel.app
```

**Domínio customizado (opcional):**
```
https://www.seusite.com
```

**Como configurar:**
1. Compre um domínio (Registro.br, GoDaddy, Namecheap, etc.)
2. Na Vercel: Settings → Domains
3. Adicione seu domínio
4. Configure os DNS
5. Pronto! SSL automático

**Custo do domínio:**
- .com.br: R$ 40/ano
- .com: R$ 60-100/ano
- .app: R$ 80/ano

---

### Como atualizar o site?

**Super fácil!** 🚀

```bash
# 1. Faça suas mudanças no código
# 2. Salve os arquivos

# 3. No terminal:
git add .
git commit -m "Descrição da mudança"
git push

# 4. Aguarde 2-3 minutos
# 5. Pronto! Site atualizado!
```

**A Vercel detecta automaticamente e faz novo deploy!**

**Não precisa:**
- ❌ Fazer login na Vercel
- ❌ Clicar em nenhum botão
- ❌ Configurar nada

---

## 🌐 Vercel

### Por que Vercel?

**Vantagens:**

1. **Deploy Automático** 🚀
   - Push no GitHub = Deploy automático
   
2. **Grátis para Sempre** 💰
   - Plano Hobby sem limite de tempo
   
3. **HTTPS Automático** 🔒
   - SSL grátis e automático
   
4. **CDN Global** 🌍
   - Site rápido em todo mundo
   
5. **Zero Config** ⚙️
   - Detecta Vite automaticamente
   
6. **Preview Deploys** 👀
   - Cada branch tem URL de preview
   
7. **Rollback Fácil** ⏮️
   - Voltar para versão anterior em 1 clique

**Alternativas:**
- Netlify (similar à Vercel)
- GitHub Pages (mais limitado)
- Render (mais complexo)
- Railway (foco em backend)

---

### Posso usar outra plataforma?

**SIM!** ✅

O projeto funciona em qualquer plataforma que suporte Vite/React:

**Outras opções:**

1. **Netlify**
   - Similar à Vercel
   - Também tem plano grátis
   - Deploy automático

2. **GitHub Pages**
   - Grátis
   - Mais limitado
   - Precisa de configuração extra

3. **Render**
   - Grátis
   - Mais técnico
   - Boa documentação

**Recomendação:** Comece com Vercel (mais fácil), depois teste outras se quiser.

---

### O que acontece se eu exceder o limite grátis?

**Cenário 1: Bandwidth (100 GB/mês)**

Se exceder:
- Vercel te avisa por email
- Site continua funcionando
- Você pode:
  - Esperar o mês virar (reset automático)
  - Fazer upgrade para Pro ($20/mês)
  - Otimizar imagens para reduzir uso

**Para referência:** 
- 100 GB = ~10.000 visitantes/mês
- Difícil exceder para projeto educacional

**Cenário 2: Builds (100/dia)**

Se exceder:
- Vercel para de fazer deploy no dia
- No dia seguinte, volta ao normal
- Solução: Agrupe commits antes de fazer push

**Na prática:** Muito difícil exceder os limites em uso normal!

---

## 📱 PWA

### O que é PWA?

**PWA = Progressive Web App**

É um site que funciona como aplicativo:

✅ **Instalável** - Adiciona ícone na tela inicial  
✅ **Offline** - Funciona sem internet  
✅ **Rápido** - Carrega instantaneamente  
✅ **Nativo** - Abre em janela própria (sem navegador)  

**Exemplo:**
- Twitter PWA
- Instagram PWA
- Spotify PWA

**Seu projeto Atesteme já é um PWA completo!**

---

### Funciona offline?

**SIM!** (Parcialmente) ✅

**O que funciona offline:**
- ✅ Navegação entre páginas
- ✅ Visualização de conteúdo já carregado
- ✅ Interface completa

**O que NÃO funciona offline:**
- ❌ Novos dados do servidor (se tiver)
- ❌ Login (se precisar verificar com servidor)

**Como funciona:**
- Service Worker cacheia arquivos
- Na primeira visita online, baixa tudo
- Depois funciona offline

---

### Como instalar no celular?

**Android (Chrome):**
1. Acesse seu site
2. Toque no menu (⋮)
3. "Adicionar à tela inicial"
4. Confirme
5. Ícone aparece na tela inicial!

**iOS (Safari):**
1. Acesse seu site
2. Toque no botão compartilhar (□↑)
3. "Adicionar à Tela de Início"
4. Confirme
5. Ícone aparece na tela inicial!

**Desktop (Chrome/Edge):**
1. Acesse seu site
2. Veja ícone de "Instalar" na barra de endereço
3. Clique em "Instalar"
4. App instalado no sistema!

---

## 🔒 Segurança

### O site é seguro?

**SIM!** ✅

**Segurança automática da Vercel:**
- ✅ HTTPS obrigatório
- ✅ SSL/TLS grátis
- ✅ Proteção DDoS
- ✅ Headers de segurança
- ✅ Firewall automático

**Já configurado no projeto:**
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block

---

### Tem HTTPS?

**SIM!** Automático! ✅

**Vercel fornece:**
- ✅ SSL grátis (Let's Encrypt)
- ✅ Renovação automática
- ✅ HTTPS obrigatório
- ✅ Redirect HTTP → HTTPS

**Seu site sempre será:**
```
https://seu-projeto.vercel.app
```

**Nunca:**
```
http://seu-projeto.vercel.app ❌
```

---

### Posso adicionar autenticação?

**SIM!** ✅

**Opções:**

1. **Supabase** (Recomendado)
   - Grátis
   - Fácil integração
   - Auth completa
   
2. **Firebase Auth**
   - Google, Facebook, Email
   - Grátis até 50k usuários/mês
   
3. **Auth0**
   - Robusto
   - Grátis até 7k usuários
   
4. **NextAuth**
   - Open source
   - Self-hosted

**Nota:** O projeto atual não tem backend, mas é fácil adicionar!

---

## 🎯 Perguntas Específicas

### Posso ter múltiplos projetos na Vercel grátis?

**SIM!** Projetos ilimitados! ✅

### Posso deletar e recriar o projeto?

**SIM!** Sem limites! ✅

### Preciso renovar algo?

**NÃO!** Tudo automático! ✅

### O site aparece no Google?

**SIM!** Mas você pode precisar:
- Adicionar meta tags SEO
- Enviar sitemap
- Aguardar indexação (dias/semanas)

### Posso fazer backup?

**SIM!** O código está no GitHub = backup automático! ✅

### E se eu perder minha senha do GitHub?

Use "Esqueci a senha" - GitHub envia email de recuperação.

### Posso trabalhar em equipe?

**SIM!** GitHub suporta colaboradores ilimitados! ✅

### Posso adicionar analytics?

**SIM!** 
- Vercel Analytics (grátis até 2500 events/mês)
- Google Analytics
- Plausible
- Fathom

---

## 📊 Comparação de Plataformas

| Recurso | Vercel | Netlify | GitHub Pages |
|---------|--------|---------|--------------|
| Grátis? | ✅ | ✅ | ✅ |
| HTTPS | ✅ Auto | ✅ Auto | ✅ Auto |
| Deploy Auto | ✅ | ✅ | ⚠️ Manual |
| CDN Global | ✅ | ✅ | ✅ |
| Domínio Custom | ✅ | ✅ | ✅ |
| Bandwidth | 100GB | 100GB | 100GB |
| Build Minutes | Ilimitado | 300min | Ilimitado |
| Preview Deploys | ✅ | ✅ | ❌ |
| Facilidade | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

**Recomendação:** Vercel (mais fácil e completo)

---

## 🎓 Recursos Adicionais

### Documentação Oficial

- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vitejs.dev)
- [GitHub Docs](https://docs.github.com)

### Vídeos Tutorial (YouTube)

Busque por:
- "Deploy React Vite Vercel"
- "GitHub Pages tutorial"
- "PWA tutorial"

### Comunidades

- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vercel)

---

## ❓ Sua Pergunta Não Está Aqui?

1. Veja: [`SOLUCAO-PROBLEMAS.md`](SOLUCAO-PROBLEMAS.md)
2. Veja: [`COMANDOS-UTEIS.md`](COMANDOS-UTEIS.md)
3. Veja: [`GUIA-INSTALACAO-DEPLOY.md`](GUIA-INSTALACAO-DEPLOY.md)

---

**Última atualização:** Dezembro 2024  
**Versão:** 1.0.0
