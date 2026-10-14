import { createExtractorFromFile } from 'node-unrar-js';
import fs from 'fs';
import path from 'path';

async function extractRar(rarPath, outputDir) {
  console.log(`\n=== Extracting: ${rarPath} ===`);
  fs.mkdirSync(outputDir, { recursive: true });
  
  const extractor = await createExtractorFromFile({
    filepath: rarPath,
  });
  
  const result = extractor.extract({ files: ['*'] });
  
  let fileCount = 0;
  // result.files is a generator/iterator
  const filesIterator = result.files;
  
  // Try different iteration methods
  try {
    // Check if it's a generator
    if (filesIterator && typeof filesIterator.next === 'function') {
      let item;
      while (!(item = filesIterator.next()).done) {
        const f = item.value;
        fileCount++;
        const filename = f.filename || f.name || `file_${fileCount}.jpg`;
        const baseName = path.basename(filename);
        const outPath = path.join(outputDir, baseName);
        
        if (f.data) {
          const data = Buffer.from(f.data);
          fs.writeFileSync(outPath, data);
          if (fileCount <= 3) console.log(`  Saved: ${baseName} (${data.length} bytes)`);
        } else {
          // Maybe the data is elsewhere
          const keys = Object.keys(f);
          if (fileCount <= 3) console.log(`  File ${fileCount} keys: ${keys.join(', ')}`);
        }
      }
    } else {
      console.log('files is not a generator, type:', typeof filesIterator);
      console.log('files constructor:', filesIterator?.constructor?.name);
    }
  } catch (e) {
    console.log('Generator error:', e.message);
  }
  
  console.log(`Total files processed: ${fileCount}`);
  
  // If that didn't work, try the low-level API
  if (fileCount === 0) {
    console.log('\nTrying low-level extraction...');
    try {
      const buf = fs.readFileSync(rarPath);
      const extractor2 = createExtractorFromFile({ 
        filepath: rarPath,
      });
      
      // Maybe the data was already extracted to the target
      // Check if any new files appeared
    } catch(e) {
      console.log('Low-level error:', e.message);
    }
  }
}

await extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_customers/');
await extractRar('/home/z/my-project/upload/صور زبائن.rar', '/home/z/my-project/upload/new_customers/');

// Check results
console.log('\n=== Results ===');
for (const dir of ['/home/z/my-project/upload/old_customers/', '/home/z/my-project/upload/new_customers/']) {
  const files = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else files.push(full);
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  console.log(`${dir}: ${files.length} files`);
  files.slice(0, 5).forEach(f => console.log(`  ${f}`));
}
