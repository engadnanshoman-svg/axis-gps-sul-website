import { createExtractorFromFile } from 'node-unrar-js';
import fs from 'fs';
import path from 'path';

async function extractRar(rarPath, outputDir) {
  try {
    console.log(`\n=== Extracting: ${rarPath} ===`);
    fs.mkdirSync(outputDir, { recursive: true });
    
    const extractor = await createExtractorFromFile({
      filepath: rarPath,
    });
    
    const result = extractor.extract({
      files: ['*'],
    });
    
    // Process extracted files
    let fileCount = 0;
    if (result && result.files) {
      for (const file of result.files) {
        if (file.extract && file.data) {
          const fileName = file.filename || file.name || `file_${fileCount}`;
          // Remove any leading directory
          const baseName = path.basename(fileName);
          const outPath = path.join(outputDir, baseName);
          
          // Write file data
          const data = Buffer.from(file.data);
          fs.writeFileSync(outPath, data);
          fileCount++;
          
          if (fileCount <= 5) {
            console.log(`  Extracted: ${baseName} (${data.length} bytes)`);
          }
        } else if (file.filename) {
          // Just a directory entry
        }
      }
      console.log(`Total extracted: ${fileCount} files`);
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
    console.error(e.stack);
  }
}

await extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_customers/');
await extractRar('/home/z/my-project/upload/صور زبائن.rar', '/home/z/my-project/upload/new_customers/');

// Verify
console.log('\n=== Verification ===');
const oldFiles = fs.readdirSync('/home/z/my-project/upload/old_customers/').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
console.log(`Old customers: ${oldFiles.length} image files`);
const newFiles = fs.readdirSync('/home/z/my-project/upload/new_customers/').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
console.log(`New customers: ${newFiles.length} image files`);
