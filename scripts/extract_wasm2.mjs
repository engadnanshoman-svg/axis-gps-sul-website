import pkg from 'unrar.js';
import fs from 'fs';
import path from 'path';

const { RarArchive } = pkg;

function extractRar(rarPath, outputDir) {
  console.log(`\n=== Extracting: ${rarPath} ===`);
  fs.mkdirSync(outputDir, { recursive: true });
  
  try {
    const data = fs.readFileSync(rarPath);
    const archive = new RarArchive(data);
    
    let extracted = 0;
    for (const entry of archive.entries) {
      if (entry.isDirectory) continue;
      
      const baseName = path.basename(entry.filename);
      const outPath = path.join(outputDir, baseName);
      
      try {
        const fileData = entry.read();
        fs.writeFileSync(outPath, Buffer.from(fileData));
        extracted++;
        if (extracted <= 3) console.log(`  Saved: ${baseName} (${fileData.length} bytes)`);
      } catch(e) {
        if (extracted === 0) console.log(`  Error on ${baseName}: ${e.message}`);
      }
    }
    
    console.log(`Total extracted: ${extracted}`);
    return extracted;
  } catch(e) {
    console.log(`Error: ${e.message}`);
    return 0;
  }
}

extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_customers3/');
extractRar('/home/z/my-project/upload/صور زبائن.rar', '/home/z/my-project/upload/new_customers3/');

// Check results
console.log('\n=== Results ===');
for (const dir of ['/home/z/my-project/upload/old_customers3/', '/home/z/my-project/upload/new_customers3/']) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`${dir}: ${files.length} image files`);
  files.slice(0, 5).forEach(f => console.log(`  ${f}`));
}
