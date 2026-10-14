import { createExtractorFromFile } from 'node-unrar-js';
import fs from 'fs';
import path from 'path';

const extractor = await createExtractorFromFile({
  filepath: '/home/z/my-project/upload/صور زبائن قديم.rar',
});

// Check file headers
const list = extractor.getFileList();
console.log('fileHeaders type:', typeof list.fileHeaders);

let count = 0;
for (const header of list.fileHeaders) {
  count++;
  if (count <= 3) {
    console.log(`Header ${count}:`, JSON.stringify(header).substring(0, 200));
  }
}
console.log(`Total headers: ${count}`);

// Now try extraction with explicit output
const outputDir = '/home/z/my-project/upload/old_customers';
fs.mkdirSync(outputDir, { recursive: true });

// Try extract with target dir
try {
  const extractor2 = await createExtractorFromFile({
    filepath: '/home/z/my-project/upload/صور زبائن قديم.rar',
    targetDir: outputDir,
  });
  
  const result2 = extractor2.extract({ files: ['*'] });
  console.log('\nResult2 arcHeader:', JSON.stringify(result2.arcHeader).substring(0, 100));
  
  // Check what's in files
  let fileCount = 0;
  for (const f of result2.files) {
    fileCount++;
    const keys = Object.keys(f);
    console.log(`File ${fileCount} keys:`, keys);
    
    if (f.data) {
      const data = Buffer.from(f.data);
      const filename = f.filename || `file_${fileCount}.jpg`;
      const baseName = path.basename(filename);
      const outPath = path.join(outputDir, baseName);
      fs.writeFileSync(outPath, data);
      if (fileCount <= 3) console.log(`  Saved: ${baseName} (${data.length} bytes)`);
    }
  }
  console.log(`Total files processed: ${fileCount}`);
} catch(e) {
  console.log('Error with targetDir:', e.message);
}

// Check output dir
const extracted = fs.readdirSync(outputDir);
console.log(`\nFiles in output dir: ${extracted.length}`);
extracted.slice(0, 10).forEach(f => console.log(`  ${f}`));
