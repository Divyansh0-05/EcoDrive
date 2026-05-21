const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'src', 'pages');

const replacements = {
  'text-white': 'text-foreground',
  'bg-white/5': 'bg-card',
  'bg-white/10': 'bg-muted',
  'border-white/5': 'border-border',
  'border-white/10': 'border-border',
  'bg-black/40': 'bg-card',
  'bg-black/20': 'bg-card',
  'bg-black/10': 'bg-muted',
  'text-gray-400': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'placeholder-gray-500': 'placeholder-muted-foreground',
  'placeholder-gray-600': 'placeholder-muted-foreground',
  'bg-[#0a0f0d]/80': 'bg-card',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  for (const [oldClass, newClass] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${oldClass.replace(/\//g, '\\/')}\\b`, 'g');
    content = content.replace(regex, newClass);
  }

  if (original !== content) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${path.basename(filePath)}`);
  }
}

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') && f !== 'Dashboard.tsx');

for (const file of files) {
  processFile(path.join(pagesDir, file));
}
