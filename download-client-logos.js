import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (response) => {
      if (response.statusCode === 200) {
        // Check if it's an SVG or PNG
        const ext = url.includes('.svg') ? '.svg' : '.png';
        const finalFilename = filename.endsWith(ext) ? filename : filename + ext;
        
        const fileStream = fs.createWriteStream(finalFilename);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${finalFilename}`);
          resolve();
        });
        fileStream.on('error', reject);
      } else {
        reject(new Error(`Failed to download ${url} - Status: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

const clientLogos = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Amway_logo.svg/1200px-Amway_logo.svg.png',
    filename: 'public/clients/amway.png',
    name: 'Amway'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SeekAsia_Logo.svg/2560px-SeekAsia_Logo.svg.png',
    filename: 'public/clients/seekasia.png',
    name: 'SeekAsia'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/YMCA_logo.svg/1200px-YMCA_logo.svg.png',
    filename: 'public/clients/ymca.png',
    name: 'YMCA'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Nextracker_logo.svg/1200px-Nextracker_logo.svg.png',
    filename: 'public/clients/nextracker.png',
    name: 'Nextracker'
  }
];

async function downloadAll() {
  try {
    console.log('🔄 Downloading client logos...\n');
    
    // Ensure the clients directory exists
    if (!fs.existsSync('public/clients')) {
      fs.mkdirSync('public/clients', { recursive: true });
    }
    
    for (const img of clientLogos) {
      try {
        await downloadImage(img.url, img.filename);
      } catch (error) {
        console.log(`⚠️ Could not download ${img.name}: ${error.message}`);
      }
    }
    console.log('\n✅ Client logo download complete!');
  } catch (error) {
    console.error('❌ Error downloading images:', error.message);
  }
}

downloadAll();
