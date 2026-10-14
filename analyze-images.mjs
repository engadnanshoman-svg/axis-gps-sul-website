import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const images = [
  'customer-dsc-01.jpg',
  'customer-dsc-02.jpg',
  'customer-dsc-03.jpg',
  'customer-dsc-04.jpg',
  'customer-dsc-05.jpg',
  'customer-dsc-06.jpg',
  'customer-dsc-07.jpg',
  'customer-dsc-08.jpg',
  'customer-dsc-09.jpg',
  'customer-dsc-10.jpg',
  'customer-dsc-13.jpg',
  'customer-dsc-14.jpg',
];

const baseDir = '/home/z/my-project/public/customers';

async function analyzeImage(zai, imagePath, filename) {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const mimeType = 'image/jpeg';

  const response = await zai.chat.completions.createVision({
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Briefly describe this image in 1-2 sentences. Specifically note: how many people are in the photo, their gender (male/female), and whether it is a portrait or group photo. If there are exactly two females/girls/women together, say so clearly.'
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`
            }
          }
        ]
      }
    ],
    thinking: { type: 'disabled' }
  });

  return response.choices[0]?.message?.content;
}

async function main() {
  const zai = await ZAI.create();
  
  for (let i = 0; i < images.length; i++) {
    const filename = images[i];
    const imagePath = path.join(baseDir, filename);
    
    console.log(`\n=== Analyzing ${filename} ===`);
    
    try {
      const result = await analyzeImage(zai, imagePath, filename);
      console.log(result);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      // If rate limited, wait and retry
      if (error.message.includes('429')) {
        console.log('Rate limited, waiting 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        try {
          const result = await analyzeImage(zai, imagePath, filename);
          console.log(result);
        } catch (retryError) {
          console.log(`Retry failed: ${retryError.message}`);
        }
      }
    }
    
    // Wait 3 seconds between requests to avoid rate limiting
    if (i < images.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

main();
