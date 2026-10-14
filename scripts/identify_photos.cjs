const ZAI = require('/home/z/.bun/install/global/node_modules/z-ai-web-dev-sdk').default;
const fs = require('fs');
const path = require('path');

async function main() {
  const zai = await ZAI.create();
  
  const teamDir = '/home/z/my-project/public/team';
  const custDir = '/home/z/my-project/public/customers';
  
  function encode(filePath) {
    const buf = fs.readFileSync(filePath);
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  }
  
  const walaaUrl = encode(path.join(teamDir, 'walaa.jpg'));
  const sajaUrl = encode(path.join(teamDir, 'saja_new.jpg'));
  
  const dscFiles = [
    'customer-dsc-01.jpg', 'customer-dsc-02.jpg', 'customer-dsc-03.jpg',
    'customer-dsc-04.jpg', 'customer-dsc-05.jpg', 'customer-dsc-06.jpg',
    'customer-dsc-07.jpg', 'customer-dsc-08.jpg', 'customer-dsc-09.jpg',
    'customer-dsc-10.jpg', 'customer-dsc-13.jpg', 'customer-dsc-14.jpg'
  ];
  
  for (const dscFile of dscFiles) {
    const dscUrl = encode(path.join(custDir, dscFile));
    let attempts = 0;
    let success = false;
    
    while (attempts < 3 && !success) {
      try {
        const response = await zai.chat.completions.createVision({
          messages: [{
            role: 'user',
            content: [
              { type: 'text', text: `First photo is Walaa (ولاء البكري), second is Saja (سجى مسالمة). Does either appear in the third group photo? Answer ONLY: WALAA, SAJA, BOTH, or NONE` },
              { type: 'image_url', image_url: { url: walaaUrl } },
              { type: 'image_url', image_url: { url: sajaUrl } },
              { type: 'image_url', image_url: { url: dscUrl } }
            ]
          }],
          thinking: { type: 'disabled' }
        });
        
        const result = response.choices[0]?.message?.content || 'No response';
        console.log(`${dscFile}: ${result}`);
        success = true;
      } catch (e) {
        attempts++;
        console.log(`${dscFile}: attempt ${attempts} failed - ${String(e.message).substring(0, 80)}`);
        if (attempts < 3) {
          const delay = attempts * 15000;
          console.log(`  waiting ${delay/1000}s...`);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }
    
    if (!success) {
      console.log(`${dscFile}: FAILED after 3 attempts`);
    }
    
    await new Promise(r => setTimeout(r, 8000));
  }
}

main().catch(console.error);
