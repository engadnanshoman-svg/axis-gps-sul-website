import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();
  
  // Images to check for Star of David (left cinema)
  const leftImages = [
    '/home/z/my-project/public/customers/navvis-scanning.jpg',
    '/home/z/my-project/public/customers/navvis-industrial.jpg',
    '/home/z/my-project/public/customers/navvis-screen.jpg',
    '/home/z/my-project/public/customers/navvis-team.jpg',
    '/home/z/my-project/public/customers/field-surveyor.jpg',
    '/home/z/my-project/public/customers/surveyor-site.jpg',
    '/home/z/my-project/public/customers/cat-excavator.jpg',
    '/home/z/my-project/public/customers/trimble-gnss.jpg',
    '/home/z/my-project/public/customers/trimble-s9.jpg',
    '/home/z/my-project/public/customers/trimble-tripod.jpg',
    '/home/z/my-project/public/customers/trimble-fieldlink.jpg',
    '/home/z/my-project/public/customers/gps-rover.jpg',
    '/home/z/my-project/public/customers/website-I.jpg',
  ];
  
  // Images to compare with Walaa (right cinema)
  const walaaPath = '/home/z/my-project/public/team/walaa.jpg';
  
  for (const imgPath of leftImages) {
    try {
      const buf = fs.readFileSync(imgPath);
      const b64 = buf.toString('base64');
      const ext = imgPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
      
      const resp = await zai.chat.completions.createVision({
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: 'Does this image contain a Star of David (hexagram/Magen David) or Israeli flag? Answer ONLY: YES or NO' },
            { type: 'image_url', image_url: { url: `data:${ext};base64,${b64}` } }
          ]
        }],
        thinking: { type: 'disabled' }
      });
      
      const answer = resp.choices[0]?.message?.content;
      const name = imgPath.split('/').pop();
      console.log(`${name}: ${answer}`);
      if (answer?.includes('YES')) {
        console.log(`  ⚠️ REMOVE: ${name}`);
      }
      
      // Small delay
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.log(`${imgPath.split('/').pop()}: ERROR - ${e.message}`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  
  // Now check for Walaa in right cinema images
  console.log('\n--- Checking right cinema for Walaa ---');
  const walaaBuf = fs.readFileSync(walaaPath);
  const walaaB64 = walaaBuf.toString('base64');
  
  // Check client images 1-54
  for (let i = 1; i <= 54; i++) {
    const num = String(i).padStart(2, '0');
    const imgPath = `/home/z/my-project/public/customers/client-${num}.jpg`;
    if (!fs.existsSync(imgPath)) continue;
    
    try {
      const buf = fs.readFileSync(imgPath);
      const b64 = buf.toString('base64');
      
      const resp = await zai.chat.completions.createVision({
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: 'Is the person in the second photo the same woman as in the first (reference) photo? Compare facial features. Answer ONLY: SAME or DIFFERENT' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${walaaB64}` } },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${b64}` } }
          ]
        }],
        thinking: { type: 'disabled' }
      });
      
      const answer = resp.choices[0]?.message?.content;
      console.log(`client-${num}: ${answer}`);
      if (answer?.includes('SAME')) {
        console.log(`  ⚠️ WALAA FOUND IN: client-${num}.jpg`);
      }
      
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.log(`client-${num}: ERROR - ${e.message}`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

main().catch(console.error);
