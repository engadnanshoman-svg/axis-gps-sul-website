import { createExtractorFromFile } from 'node-unrar-js';

const extractor = await createExtractorFromFile({
  filepath: '/home/z/my-project/upload/صور زبائن قديم.rar',
});

const result = extractor.extract({ files: ['*'] });

console.log('arcHeader:', JSON.stringify(result.arcHeader).substring(0, 200));
console.log('files type:', typeof result.files);
console.log('files is array?', Array.isArray(result.files));

// Try iterating
try {
  let count = 0;
  for (const f of result.files) {
    count++;
    console.log(`File ${count}:`, {
      filename: f.filename,
      name: f.name,
      hasData: !!f.data,
      dataType: typeof f.data,
      extract: f.extract,
      keys: Object.keys(f)
    });
    if (count >= 5) break;
  }
  console.log(`Total iterated: ${count}`);
} catch (e) {
  console.log('Iteration error:', e.message);
}

// Try the list method
try {
  const list = extractor.getFileList();
  console.log('List type:', typeof list);
  console.log('List keys:', Object.keys(list));
  if (list.fileList) {
    console.log('fileList type:', typeof list.fileList);
    // Try as generator
    let count = 0;
    for (const item of list.fileList) {
      count++;
      if (count <= 3) console.log('Item:', item.filename || item.name || JSON.stringify(item).substring(0, 100));
    }
    console.log(`Total files in list: ${count}`);
  }
} catch (e) {
  console.log('List error:', e.message);
}
