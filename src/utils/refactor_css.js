const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, ''); // antes de executar esse script, lembre-se de conferir os imports das páginas
const cssDir = path.join(rootDir, 'src', 'css');

if (!fs.existsSync(cssDir)) {
  console.log("src/css já movido ou não existe.");
  process.exit(0);
}

const moves = [
  { file: 'home.css', dest: 'src/pages/home/home.css' },
  { file: 'sobre.css', dest: 'src/pages/sobre/sobre.css' },
  { file: 'lojinha.css', dest: 'src/pages/lojinha/lojinha.css' },
  { file: 'receber.css', dest: 'src/pages/receber/receber.css' },
  { file: 'voluntarie-se.css', dest: 'src/pages/voluntariado/voluntarie-se.css' },
  { file: 'doar.css', dest: 'src/pages/doar/doar.css' },
  { file: 'doar-usados.css', dest: 'src/pages/doar/doar-usados.css' },
  { file: 'doar-dinheiro.css', dest: 'src/pages/doar/doar-dinheiro.css' },
  { file: 'galeria.css', dest: 'src/pages/galeria/galeria.css' },
  { file: 'globals.css', dest: 'src/shared/css/globals.css' },
  { file: 'reset.css', dest: 'src/shared/css/reset.css' }
];

moves.forEach(m => {
  const source = path.join(cssDir, m.file);
  const destination = path.join(rootDir, m.dest);
  
  if (fs.existsSync(source)) {
    const destDir = path.dirname(destination);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.renameSync(source, destination);
    console.log(`Moved ${m.file} -> ${m.dest}`);
  }
});

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.git')) {
        getAllHtmlFiles(fullPath, fileList);
      }
    } else if (f.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);

console.log("Updating HTML references...");
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  moves.forEach(m => {
    // Escape string for regex
    const regex = new RegExp(`href=["'](?:src\/)?css/${m.file}["']`, 'g');
    content = content.replace(regex, `href="${m.dest}"`);
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated links in ${file}`);
  }
});

// Clean up empty src/css dir
const remaining = fs.readdirSync(cssDir);
if (remaining.length === 0) {
  fs.rmdirSync(cssDir);
  console.log("Removido src/css base.");
} else {
  console.log("src/css ainda tem: ", remaining);
}
