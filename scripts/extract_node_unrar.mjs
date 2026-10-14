import { createExtractorFromFile } from 'node-unrar-js';
import fs from 'fs';
import path from 'path';

async function extractRar(rarPath, outputDir) {
  console.log(`\n=== Extracting: ${rarPath} ===`);
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });
  
  const extractor = await createExtractorFromFile({
    filepath: rarPath,
    targetDir: outputDir,
  });
  
  const result = extractor.extract({ files: ['*'] });
  
  // Check result.files - it should be a generator
  let fileCount = 0;
  try {
    for (const f of result.files) {
      fileCount++;
    }
  } catch(e) {
    // ignore
  }
  
  console.log(`Generator produced ${fileCount} items`);
  
  // Also check what was written to disk
  const walk = (d) => {
    let files = [];
    try {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) files = files.concat(walk(full));
        else files.push(full);
      }
    } catch(e) {}
    return files;
  };
  
  const diskFiles = walk(outputDir);
  console.log(`Files on disk: ${diskFiles.length}`);
  diskFiles.slice(0, 5).forEach(f => {
    const stat = fs.statSync(f);
    console.log(`  ${f} (${stat.size} bytes)`);
  });
  if (diskFiles.length > 5) console.log(`  ... and ${diskFiles.length - 5} more`);
}

await extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_extracted/');
await extractRar('/home/z/my-project/upload/صور زبائن.rar', '/home/z/my-project/upload/new_extracted/');
