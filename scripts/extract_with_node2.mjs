import { createExtractorFromFile } from 'node-unrar-js';
import fs from 'fs';
import path from 'path';

async function extractRar(rarPath, outputDir) {
  try {
    console.log(`Extracting: ${rarPath}`);
    
    // Create extractor - try different API patterns
    const extractor = await createExtractorFromFile({
      filepath: rarPath,
    });
    
    // Debug the API
    console.log('Extractor type:', typeof extractor);
    console.log('Extractor keys:', Object.keys(extractor));
    
    // Try to extract
    const result = extractor.extract({
      files: ['*'],  
    });
    
    console.log('Result type:', typeof result);
    if (result) {
      console.log('Result keys:', Object.keys(result));
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
}

await extractRar('/home/z/my-project/upload/صور زبائن قديم.rar', '/home/z/my-project/upload/old_customers/');
