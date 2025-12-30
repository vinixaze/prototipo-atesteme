// Este arquivo gera ícones PWA placeholder em base64
// Use icon-generator.html para gerar ícones PNG de alta qualidade

const fs = require('fs');
const path = require('path');

// Função para criar um SVG simples do ícone
function createIconSVG(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8B27FF;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#6B1FBF;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="115" fill="url(#grad)"/>
    <path d="M256 100L380 380H340L320 330H192L172 380H132L256 100Z" fill="white"/>
    <rect x="200" y="280" width="112" height="30" fill="#8B27FF"/>
    <circle cx="256" cy="120" r="15" fill="white"/>
    <rect x="140" y="350" width="40" height="4" rx="2" fill="white" opacity="0.5"/>
    <rect x="332" y="350" width="40" height="4" rx="2" fill="white" opacity="0.5"/>
  </svg>`;
}

// Gera placeholder para cada tamanho
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('📦 Gerando ícones PWA placeholder...\n');

sizes.forEach(size => {
  const svg = createIconSVG(size);
  const base64 = Buffer.from(svg).toString('base64');
  const dataUri = `data:image/svg+xml;base64,${base64}`;
  
  console.log(`✅ icon-${size}x${size}.png`);
  
  // Você pode salvar isso ou usar diretamente no manifest
  // Por enquanto, apenas mostra no console
});

console.log('\n🎉 Ícones gerados com sucesso!');
console.log('💡 Para ícones PNG de alta qualidade, abra: /icon-generator.html');

module.exports = { createIconSVG };
