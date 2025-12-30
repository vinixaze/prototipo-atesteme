# 🚨 SCRIPT DE CORREÇÃO AUTOMÁTICA - CSS NÃO APARECE
# Execute: .\corrigir-css.ps1
# Se der erro de permissão: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Write-Host "🚨 ATESTEME - Correção Automática de CSS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏱️  Tempo estimado: 3-5 minutos" -ForegroundColor Yellow
Write-Host ""

# Passo 1: Parar servidor se estiver rodando
Write-Host "📍 Passo 1/6: Verificando processos..." -ForegroundColor White
Get-Process | Where-Object { $_.ProcessName -like "*node*" } | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "✅ Processos parados" -ForegroundColor Green
Write-Host ""

# Passo 2: Deletar node_modules
Write-Host "📍 Passo 2/6: Deletando node_modules..." -ForegroundColor White
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
    Write-Host "✅ node_modules deletado" -ForegroundColor Green
} else {
    Write-Host "⚠️  node_modules já não existe" -ForegroundColor Yellow
}
Write-Host ""

# Passo 3: Deletar .vite
Write-Host "📍 Passo 3/6: Deletando cache .vite..." -ForegroundColor White
if (Test-Path ".vite") {
    Remove-Item -Recurse -Force ".vite" -ErrorAction SilentlyContinue
    Write-Host "✅ .vite deletado" -ForegroundColor Green
} else {
    Write-Host "⚠️  .vite já não existe" -ForegroundColor Yellow
}
Write-Host ""

# Passo 4: Deletar package-lock.json
Write-Host "📍 Passo 4/6: Deletando package-lock.json..." -ForegroundColor White
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force -ErrorAction SilentlyContinue
    Write-Host "✅ package-lock.json deletado" -ForegroundColor Green
} else {
    Write-Host "⚠️  package-lock.json já não existe" -ForegroundColor Yellow
}
Write-Host ""

# Passo 5: Limpar cache do npm
Write-Host "📍 Passo 5/6: Limpando cache do npm..." -ForegroundColor White
npm cache clean --force
Write-Host "✅ Cache limpo" -ForegroundColor Green
Write-Host ""

# Passo 6: Reinstalar dependências
Write-Host "📍 Passo 6/6: Reinstalando dependências..." -ForegroundColor White
Write-Host "⏱️  Aguarde 2-5 minutos (isso é normal)..." -ForegroundColor Yellow
Write-Host ""
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Instalação concluída com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🎉 CORREÇÃO COMPLETA!" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📍 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1️⃣  Execute:" -ForegroundColor White
    Write-Host "    npm run dev" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2️⃣  Abra o navegador em:" -ForegroundColor White
    Write-Host "    http://localhost:5173" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "3️⃣  Limpe o cache do navegador:" -ForegroundColor White
    Write-Host "    Ctrl + Shift + R" -ForegroundColor Cyan
    Write-Host "    ou abra em modo incógnito" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "✨ O CSS deve aparecer agora!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ ERRO durante npm install" -ForegroundColor Red
    Write-Host ""
    Write-Host "Tente executar manualmente:" -ForegroundColor Yellow
    Write-Host "  npm install" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Se persistir, veja: SEM-CSS-SOLUCAO.md" -ForegroundColor Yellow
    Write-Host ""
}
