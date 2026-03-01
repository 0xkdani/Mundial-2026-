// Script para compilar targets de MindAR
const fs = require('fs');
const path = require('path');

console.log('===================================');
console.log('MindAR Target Compiler');
console.log('===================================\n');

console.log('INSTRUCCIONES:');
console.log('1. Coloca la(s) imagen(es) del escudo en la carpeta: public/targets/images/');
console.log('2. Ejecuta: node compile-target.js');
console.log('\nO usa el compilador online de MindAR:');
console.log('https://hiukim.github.io/mind-ar-js-doc/tools/compile\n');

// Verificar si existe la carpeta de imágenes
const imagesDir = path.join(__dirname, 'public', 'targets', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('✅ Carpeta creada: public/targets/images/');
  console.log('📁 Coloca tus imágenes de escudos ahí\n');
}

// Verificar si hay imágenes
const files = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : [];
const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

if (imageFiles.length === 0) {
  console.log('⚠️  No se encontraron imágenes en public/targets/images/');
  console.log('\nUSA EL COMPILADOR ONLINE (más fácil):');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1. Ve a: https://hiukim.github.io/mind-ar-js-doc/tools/compile');
  console.log('2. Arrastra tu imagen del escudo de México');
  console.log('3. Haz clic en "Start"');
  console.log('4. Descarga el archivo .mind');
  console.log('5. Renómbralo a "targets.mind"');
  console.log('6. Colócalo en: public/targets/');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
} else {
  console.log(`📸 Imágenes encontradas: ${imageFiles.length}`);
  imageFiles.forEach((f, i) => console.log(`   ${i}: ${f}`));
  console.log('\n⚠️  Para compilar necesitas instalar: npm install -g @hiukim/mind-ar-cli');
  console.log('Luego ejecuta: npx mind-ar-cli compile ./public/targets/images ./public/targets/targets.mind\n');
}

console.log('===================================\n');
