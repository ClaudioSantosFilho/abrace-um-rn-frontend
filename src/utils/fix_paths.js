const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const assetsDir = path.join(rootDir, 'src', 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error("src/assets não existe!");
  process.exit(1);
}

// 1. Mapeamento de HTML -> Pasta
const htmlToFolderMap = {
  'index.html': 'home',
  'galeria.html': 'galeria',
  'doar-inicial.html': 'doar',
  'lojinha.html': 'lojinha',
  'sobre.html': 'sobre',
  'receber.html': 'receber',
  'voluntarie-se.html': 'voluntarie'
};

const allFiles = [];
function findFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.git') && !f.includes('assets') && !f.includes('.gemini') && !f.includes('.vscode')) {
        findFiles(fullPath);
      }
    } else if (f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js')) {
      allFiles.push(fullPath);
    }
  }
}
findFiles(rootDir);

// 2. Coletando os assets
const assets = fs.readdirSync(assetsDir).filter(f => !fs.statSync(path.join(assetsDir, f)).isDirectory());

const assetUsage = {};
assets.forEach(a => assetUsage[a] = new Set());

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  assets.forEach(asset => {
    // Escapar o asset pro regex
    const regex = new RegExp(asset.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g');
    if (regex.test(content)) {
      // Descobrir a qual categoria esse arquivo pertence
      const fileName = path.basename(file);
      if (htmlToFolderMap[fileName]) {
        assetUsage[asset].add(htmlToFolderMap[fileName]);
      } else if (file.includes(path.sep + 'components' + path.sep)) {
        assetUsage[asset].add('shared');
      } else if (file.includes('home.css') || file.includes('home-viewmodel')) {
         assetUsage[asset].add('home');
      } else if (file.includes('galeria.css') || file.includes('galeria.js')) {
         assetUsage[asset].add('galeria');
      } else if (file.includes('lojinha.css') || file.includes('lojinha-model')) {
         assetUsage[asset].add('lojinha');
      } else if (file.includes('doar.css')) {
         assetUsage[asset].add('doar');
      } else {
         assetUsage[asset].add('shared');
      }
    }
  });
});

console.log("Planejando movimentações...");

const moves = [];
assets.forEach(asset => {
  const usages = Array.from(assetUsage[asset]);
  let category = 'shared';
  
  if (usages.length === 1 && usages[0] !== 'shared') {
    category = usages[0]; // ex: 'home', 'galeria'
  }
  
  moves.push({ asset, category });
});

// Movendo arquivos
moves.forEach(({ asset, category }) => {
  const catFolder = path.join(assetsDir, category);
  if (!fs.existsSync(catFolder)) {
    fs.mkdirSync(catFolder, { recursive: true });
  }
  const oldPath = path.join(assetsDir, asset);
  const newPath = path.join(catFolder, asset);
  fs.renameSync(oldPath, newPath);
  console.log(`Movido ${asset} -> src/assets/${category}`);
});

// 3. Atualizando as referências de todo mundo
console.log("Corrigindo referências mágicas...");
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  // Corrigir css/ e js/ genéricos que quebraram (ex: src="js/custom..." -> src="src/js/custom...")
  if (file.endsWith('.html')) {
     content = content.replace(/(href|src)="css\//g, '$1="src/css/');
     content = content.replace(/(href|src)="js\//g, '$1="src/js/');
  }

  // Corrigir referências a assets
  moves.forEach(({ asset, category }) => {
    const escapedAsset = asset.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
    
    // Se estava referenciando `assets/imagem.png` ou `src/assets/imagem.png`
    // Agora vai ser `src/assets/{category}/imagem.png` em HTML/JS solto
    // e relativo para CSS (ex: `../assets/...`)
    
    const assetRegex = new RegExp(`(?:src/)?assets/${escapedAsset}`, 'g');
    
    let replacement = `src/assets/${category}/${asset}`;
    
    if (file.endsWith('.css')) {
        // Se o CSS tá em `src/css/algo.css`, ir para `src/assets/cat/img.png`
        // o caminho relativo é `../assets/${category}/${asset}`
        replacement = `../assets/${category}/${asset}`;
    }
    
    content = content.replace(assetRegex, replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Corrigido: ${file}`);
  }
});

console.log('Concluído! Todos os caminhos ajustados e imagens separadas.');
