#!/bin/bash

clear
echo "🚀 ATESTEME - Configuração Automática"
echo "======================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "   Baixe de: https://nodejs.org"
    exit 1
fi

# Verificar NPM
if ! command -v npm &> /dev/null; then
    echo "❌ NPM não está instalado!"
    exit 1
fi

# Mostrar versões
echo "✅ Node.js: $(node -v)"
echo "✅ NPM: $(npm -v)"
echo ""

# Perguntar se quer limpar tudo
read -p "🔄 Limpar instalação anterior? (s/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo ""
    echo "🗑️  Limpando arquivos antigos..."
    rm -rf node_modules .vite dist package-lock.json 2>/dev/null
    npm cache clean --force
    echo "✅ Limpeza concluída!"
    echo ""
fi

# Instalar dependências
echo "📦 Instalando dependências..."
echo "⏱️  Isso pode levar 2-5 minutos..."
echo ""

npm install

if [ $? -eq 0 ]; then
    clear
    echo "======================================"
    echo "✨ INSTALAÇÃO CONCLUÍDA COM SUCESSO!"
    echo "======================================"
    echo ""
    echo "🎯 PRÓXIMOS PASSOS:"
    echo ""
    echo "1️⃣  Inicie o servidor:"
    echo "    npm run dev"
    echo ""
    echo "2️⃣  Abra no navegador:"
    echo "    http://localhost:5173"
    echo ""
    echo "3️⃣  Limpe o cache do navegador:"
    echo "    Ctrl + Shift + R"
    echo ""
    echo "======================================"
    echo ""
    
    # Perguntar se quer iniciar automaticamente
    read -p "🚀 Deseja iniciar o servidor agora? (S/n): " -n 1 -r
    echo ""
    echo ""
    
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        echo "🔥 Iniciando servidor..."
        echo ""
        npm run dev
    fi
else
    echo ""
    echo "❌ ERRO durante instalação!"
    echo ""
    echo "Tente executar manualmente:"
    echo "  npm install"
    echo ""
fi
