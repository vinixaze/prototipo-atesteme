# 🚀 ATESTEME - Configuração Automática
# Execute: .\setup.ps1

Clear-Host
Write-Host "🚀 ATESTEME - Configuração Automática" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não está instalado!" -ForegroundColor Red
    Write-Host "   Baixe de: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Verificar NPM
try {
    $npmVersion = npm -v
    Write-Host "✅ NPM: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ NPM não está instalado!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Perguntar se quer limpar tudo
$clean = Read-Host "🔄 Limpar instalação anterior? (s/N)"

if ($clean -eq "s" -or $clean -eq "S") {
    Write-Host ""
    Write-Host "🗑️  Limpando arquivos antigos..." -ForegroundColor Yellow
    
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force ".vite" -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force "dist" -ErrorAction SilentlyContinue
    Remove-Item "package-lock.json" -Force -ErrorAction SilentlyContinue
    
    npm cache clean --force
    
    Write-Host "✅ Limpeza concluída!" -ForegroundColor Green
    Write-Host ""
}

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Cyan
Write-Host "⏱️  Isso pode levar 2-5 minutos..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Clear-Host
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "✨ INSTALAÇÃO CONCLUÍDA COM SUCESSO!" -ForegroundColor Green
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1️⃣  Inicie o servidor:" -ForegroundColor White
    Write-Host "    npm run dev" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2️⃣  Abra no navegador:" -ForegroundColor White
    Write-Host "    http://localhost:5173" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "3️⃣  Limpe o cache do navegador:" -ForegroundColor White
    Write-Host "    Ctrl + Shift + R" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Perguntar se quer iniciar automaticamente
    $start = Read-Host "🚀 Deseja iniciar o servidor agora? (S/n)"
    Write-Host ""
    
    if ($start -ne "n" -and $start -ne "N") {
        Write-Host "🔥 Iniciando servidor..." -ForegroundColor Green
        Write-Host ""
        npm run dev
    }
} else {
    Write-Host ""
    Write-Host "❌ ERRO durante instalação!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Tente executar manualmente:" -ForegroundColor Yellow
    Write-Host "  npm install" -ForegroundColor Cyan
    Write-Host ""
}
