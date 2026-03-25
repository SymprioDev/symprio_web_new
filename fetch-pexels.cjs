const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'PtZfU5V0MFi67bUx7XPu4RT83uzdYBSnJjmDDqmgleSl4Cbs5U7YbIRA';
const BASE_URL = 'https://api.pexels.com/v1/search';

const queries = [
  { query: 'robotic process automation', filename: 'rpa.jpg' },
  { query: 'artificial intelligence technology', filename: 'ai-development.jpg' },
  { query: 'digital brain network', filename: 'agentic-ai.jpg' },
  { query: 'business consultant flowchart', filename: 'process-assessment.jpg' },
  { query: 'digital transformation office', filename: 'digital-transformation.jpg' },
  { query: 'enterprise software network', filename: 'erp-oracle.jpg' },
  { query: 'software development programming', filename: 'custom-dev.jpg' },
  { query: 'remote team digital collaboration', filename: 'digital-workforce.jpg' },
  { query: 'abstract technology background blue', filename: 'hero-bg.jpg' },
  { query: 'training classroom technology', filename: 'training-bg.jpg' },
  { query: 'business meeting innovation', filename: 'about-bg.jpg' }
];

const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

const fetchAndDownload = async (queryObj) => {
  const url = `${BASE_URL}?query=${encodeURIComponent(queryObj.query)}&per_page=1`;
  
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': API_KEY
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          if (json.photos && json.photos.length > 0) {
            const imageUrl = json.photos[0].src.large2x;
            const dest = path.join('public/assets/images', queryObj.filename);
            console.log(`Downloading ${queryObj.filename} from ${imageUrl}...`);
            await downloadImage(imageUrl, dest);
            console.log(`✅ Success: ${queryObj.filename}`);
            resolve();
          } else {
            console.log(`⚠️ No photos found for query: ${queryObj.query}`);
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

async function main() {
  const dir = 'public/assets/images';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  console.log('🚀 Starting Pexels image fetch...');
  for (const q of queries) {
    try {
      await fetchAndDownload(q);
    } catch (err) {
      console.error(`❌ Error fetching ${q.query}:`, err.message);
    }
  }
  console.log('🏁 Finished!');
}

main();
