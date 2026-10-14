import { createExtractorFromFile } from 'node-unrar-js';
import fs from 'fs';
import path from 'path';

async function extractRar(rarPath, outputDir) {
  try {
    console.log(`Extracting: ${rarPath}`);
    const extractor = await createExtractorFromFile({
      filepath: rarPath,
      targetDir: outputDir
    });
    
    const list = extractor.getFileList();
    const files = [...list.fileList];
    console.log(`Found ${files.length} files`);
    
    // Extract all
    const extracted = extractor.extractAll();
    console.log(`Extracted successfully`);
    
    // List extracted files
    if (fs.existsSync(outputDir)) {
      const walkDir = (dir) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            walkDir(fullPath);
          } else {
            console.log(`  ${fullPath}`);
          }
        }
      };
      walkDir(outputDir);
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
}

await extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_customers/');
console.log('\n---\n');
await extractRar('/home/z/my-project/upload/صور زبائن.rar', '/home/z/my-project/upload/new_customers/');
