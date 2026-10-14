import Unrar from 'unrar';
import fs from 'fs';
import path from 'path';

function extractRar(rarPath, outputDir) {
  return new Promise((resolve, reject) => {
    console.log(`\n=== Extracting: ${rarPath} ===`);
    fs.mkdirSync(outputDir, { recursive: true });
    
    const archive = new Unrar(rarPath);
    
    archive.list((err, entries) => {
      if (err) {
        console.log('List error:', err.message);
        reject(err);
        return;
      }
      
      console.log(`Found ${entries.length} entries`);
      
      let extracted = 0;
      let failed = 0;
      
      for (const entry of entries) {
        if (entry.type !== 'file') continue;
        
        const baseName = path.basename(entry.name);
        const outPath = path.join(outputDir, baseName);
        
        archive.extract(entry.name, (err, data) => {
          if (err) {
            failed++;
            if (failed <= 3) console.log(`  Failed: ${baseName} - ${err.message}`);
          } else {
            fs.writeFileSync(outPath, data);
            extracted++;
            if (extracted <= 3) console.log(`  Saved: ${baseName} (${data.length} bytes)`);
          }
          
          if (extracted + failed === entries.filter(e => e.type === 'file').length) {
            console.log(`Done: ${extracted} extracted, ${failed} failed`);
            resolve(extracted);
          }
        });
      }
    });
  });
}

// Extract both
try {
  await extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_customers2/');
} catch(e) {
  console.log('Old RAR failed:', e.message);
}

try {
  await extractRar('/home/z/my-project/upload/صور زبائن.rar', '/home/z/my-project/upload/new_customers2/');
} catch(e) {
  console.log('New RAR failed:', e.message);
}

// Wait a bit for async extraction
await new Promise(r => setTimeout(r, 5000));

// Check results
console.log('\n=== Results ===');
for (const dir of ['/home/z/my-project/upload/old_customers2/', '/home/z/my-project/upload/new_customers2/']) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`${dir}: ${files.length} image files`);
  files.slice(0, 5).forEach(f => console.log(`  ${f}`));
}
