const fs = require('fs');
const path = require('path');

const assetsDir = 'src/assets';
const assets = fs.readdirSync(assetsDir);

// Define mapping of root HTML files to their corresponding src/pages folders
const htmlToPageMap = {
  'index.html': 'src/pages/home',
  'sobre.html': 'src/pages/sobre',
  'lojinha.html': 'src/pages/lojinha',
  'receber.html': 'src/pages/receber',
  'voluntarie-se.html': 'src/pages/voluntariado',
  'doar-inicial.html': 'src/pages/doar',
  'galeria.html': 'src/pages/galeria'
};

function getAllFiles(dir, exts, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('.gemini') && !filePath.includes('.vscode')) {
        getAllFiles(filePath, exts, fileList);
      }
    } else {
      if (exts.some(ext => filePath.endsWith(ext))) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allCodeFiles = getAllFiles('.', ['.html', '.css', '.js']);

const assetUsages = {};
assets.forEach(asset => {
  assetUsages[asset] = [];
  allCodeFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(asset)) {
      assetUsages[asset].push(file.replace(/\\/g, '/'));
    }
  });
});

console.log('Classifying assets...');

const moves = [];

Object.entries(assetUsages).forEach(([asset, files]) => {
  if (files.length === 0) {
    console.log('Unused asset:', asset);
    moves.push({ asset, targetFolder: 'src/shared/assets', usedIn: [] });
    return;
  }
  
  let targetFolder = 'src/shared/assets';
  
  const owners = new Set();
  
  files.forEach(file => {
    if (file.startsWith('src/components/')) {
        const parts = file.split('/');
        owners.add(parts.slice(0, 4).join('/'));
    } else if (file.startsWith('src/pages/')) {
        const parts = file.split('/');
        owners.add(parts.slice(0, 3).join('/'));
    } else {
        const basename = path.basename(file);
        if (htmlToPageMap[basename]) {
            owners.add(htmlToPageMap[basename]);
        } else {
            owners.add('src/shared');
        }
    }
  });
  
  if (owners.size === 1) {
    const owner = Array.from(owners)[0];
    if (owner.startsWith('src/components/') || owner.startsWith('src/pages/')) {
        targetFolder = owner + '/assets';
    }
  }
  
  moves.push({ asset, targetFolder, usedIn: files });
});

moves.forEach(({ asset, targetFolder, usedIn }) => {
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }
  
  const sourcePath = path.join(assetsDir, asset);
  const destPath = path.join(targetFolder, asset);
  
  fs.renameSync(sourcePath, destPath);
  console.log('Moved', asset, 'to', targetFolder);
  
  // Update files
  usedIn.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Pattern to look for `assets/...` or `src/assets/...`
    const regex1 = new RegExp('([\"\'\\(])(?:src/)?assets/' + asset.replace('.', '\\.'), 'g');
    
    // Target replacement is `targetFolder/asset` for HTML/JS and relative for CSS
    if (file.endsWith('.css')) {
        let rel = path.relative(path.dirname(file), targetFolder).replace(/\\/g, '/');
        // If they are in the exact same directory, rel is ''
        if (rel === '') rel = '.';
        content = content.replace(regex1, '$1' + rel + '/' + asset);
    } else {
        content = content.replace(regex1, '$1' + targetFolder + '/' + asset);
    }
    
    fs.writeFileSync(file, content, 'utf8');
  });
});

console.log('Done distribution!');

if (fs.readdirSync(assetsDir).length === 0) {
    fs.rmdirSync(assetsDir);
}
