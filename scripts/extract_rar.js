const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Try using bun's built-in zip extraction, or a custom approach
// Actually let's try installing the non-free unrar binary

// Download unrar binary
const unrarUrl = 'https://www.rarlab.com/rar/unrarlinux-x64-7.1.3.tar.gz';
const tmpDir = '/tmp/unrar_install';

try {
  if (!fs.existsSync(`${tmpDir}/unrar`)) {
    fs.mkdirSync(tmpDir, { recursive: true });
    console.log('Downloading unrar...');
    execSync(`curl -L -o ${tmpDir}/unrar.tar.gz "${unrarUrl}"`, { stdio: 'inherit' });
    execSync(`cd ${tmpDir} && tar xzf unrar.tar.gz`, { stdio: 'inherit' });
    execSync(`chmod +x ${tmpDir}/unrar`, { stdio: 'inherit' });
  }
  console.log('Testing unrar...');
  const result = execSync(`${tmpDir}/unrar`, { encoding: 'utf-8' });
  console.log(result.substring(0, 200));
} catch (e) {
  console.log('Error:', e.message.substring(0, 300));
  // Try alternative download
  try {
    const altUrl = 'https://www.rarlab.com/rar/unrarlinux-x64-7.0.9.tar.gz';
    console.log('Trying alternative URL...');
    execSync(`curl -L -o ${tmpDir}/unrar.tar.gz "${altUrl}"`, { stdio: 'inherit' });
    execSync(`cd ${tmpDir} && tar xzf unrar.tar.gz`, { stdio: 'inherit' });
    execSync(`chmod +x ${tmpDir}/unrar`, { stdio: 'inherit' });
    console.log('Success with alternative URL');
  } catch (e2) {
    console.log('Alternative also failed:', e2.message.substring(0, 200));
  }
}
