#!/bin/bash

# 🚨 SCRIPT DE CORREÇÃO AUTOMÁTICA - CSS NÃO APARECE
# Execute: bash corrigir-css.sh

echo "🚨 ATESTEME - Correção Automática de CSS"
echo "=========================================="
echo ""
echo "⏱️  Tempo estimado: 3-5 minutos"
echo ""

# Passo 1: Parar servidor se estiver rodando
echo "📍 Passo 1/6: Verificando processos..."
pkill -f "vite" 2>/dev/null || true
echo "✅ Processos parados"
echo ""

# Passo 2: Deletar node_modules
echo "📍 Passo 2/6: Deletando node_modules..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "✅ node_modules deletado"
else
    echo "⚠️  node_modules já não existe"
fi
echo ""

# Passo 3: Deletar .vite
echo "📍 Passo 3/6: Deletando cache .vite..."
if [ -d ".vite" ]; then
    rm -rf .vite
    echo "✅ .vite deletado"
else
    echo "⚠️  .vite já não existe"
fi
echo ""

# Passo 4: Deletar package-lock.json
echo "📍 Passo 4/6: Deletando package-lock.json..."
if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    echo "✅ package-lock.json deletado"
else
    echo "⚠️  package-lock.json já não existe"
fi
echo ""

# Passo 5: Limpar cache do npm
echo "📍 Passo 5/6: Limpando cache do npm..."
npm cache clean --force
echo "✅ Cache limpo"
echo ""

# Passo 6: Reinstalar dependências
echo "📍 Passo 6/6: Reinstalando dependências..."
echo "⏱️  Aguarde 2-5 minutos (isso é normal)..."
echo ""
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Instalação concluída com sucesso!"
    echo ""
    echo "=========================================="
    echo "🎉 CORREÇÃO COMPLETA!"
    echo "=========================================="
    echo ""
    echo "📍 PRÓXIMOS PASSOS:"
    echo ""
    echo "1️⃣  Execute:"
    echo "    npm run dev"
    echo ""
    echo "2️⃣  Abra o navegador em:"
    echo "    http://localhost:5173"
    echo ""
    echo "3️⃣  Limpe o cache do navegador:"
    echo "    Ctrl + Shift + R"
    echo "    ou abra em modo incógnito"
    echo ""
    echo "✨ O CSS deve aparecer agora!"
    echo ""
else
    echo ""
    echo "❌ ERRO durante npm install"
    echo ""
    echo "Tente executar manualmente:"
    echo "  npm install"
    echo ""
    echo "Se persistir, veja: SEM-CSS-SOLUCAO.md"
    echo ""
fi
