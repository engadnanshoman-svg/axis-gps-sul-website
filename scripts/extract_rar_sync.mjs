import { unrarSync, unrar } from 'unrar.js';
import fs from 'fs';
import path from 'path';

function extractRar(rarPath, outputDir) {
  console.log(`\n=== Extracting: ${rarPath} ===`);
  fs.mkdirSync(outputDir, { recursive: true });
  
  try {
    // unrarSync extracts to a directory
    const result = unrarSync({
      src: rarPath,
      dest: outputDir,
    });
    
    console.log('Result:', JSON.stringify(result).substring(0, 300));
  } catch(e) {
    console.log(`unrarSync error: ${e.message}`);
    
    // Try async version
    try {
      unrar({
        src: rarPath,
        dest: outputDir,
      }, (err, result) => {
        if (err) {
          console.log(`unrar error: ${err.message}`);
        } else {
          console.log('unrar result:', JSON.stringify(result).substring(0, 300));
        }
      });
    } catch(e2) {
      console.log(`unrar error: ${e2.message}`);
    }
  }
}

extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_customers4/');

// Wait for async
await new Promise(r => setTimeout(r, 5000));

// Check results
for (const dir of ['/home/z/my-project/upload/old_customers4/']) {
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
  console.log(`${dir}: ${files.length} files`);
  files.slice(0, 5).forEach(f => console.log(`  ${f}`));
}
