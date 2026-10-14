const { unrarSync } = require('unrar.js');
const fs = require('fs');
const path = require('path');

function extractRar(rarPath, outputDir) {
  console.log(`\n=== Extracting: ${rarPath} ===`);
  fs.mkdirSync(outputDir, { recursive: true });
  
  try {
    // unrarSync takes src as string path
    const result = unrarSync(rarPath, outputDir);
    console.log('Result type:', typeof result);
    if (result) console.log('Result:', JSON.stringify(result).substring(0, 500));
  } catch(e) {
    console.log(`Error: ${e.message}`);
  }
}

extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_customers6/');
extractRar('/home/z/my-project/upload/صور زبائن.rar', '/home/z/my-project/upload/new_customers6/');

// Check results
for (const dir of ['/home/z/my-project/upload/old_customers6/', '/home/z/my-project/upload/new_customers6/']) {
  if (!fs.existsSync(dir)) continue;
  const walk = (d) => {
    let files = [];
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) files = files.concat(walk(full));
      else files.push(full);
    }
    return files;
  };
  const files = walk(dir);
  console.log(`\n${dir}: ${files.length} files`);
  files.slice(0, 5).forEach(f => console.log(`  ${f}`));
  if (files.length > 5) console.log(`  ... and ${files.length - 5} more`);
}
