const https = require('https');
const fs = require('fs');
const path = require('path');

const logos = {
  'gcash': 'https://upload.wikimedia.org/wikipedia/commons/5/52/GCash_logo.svg',
  'maya': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Maya_logo.svg',
  'dito telecommunity': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/DITO_Telecommunity_logo.svg',
  'globe': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Globe_Telecom_logo.svg',
  'sun cellular': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Sun_Cellular_logo.svg',
  'predator': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Acer_Predator_logo.svg',
  'compaq': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Compaq_Logo.svg',
  'republic of gamers (rog)': 'https://upload.wikimedia.org/wikipedia/commons/a/ad/ROG_Logo.svg',
  'sony vaio': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Vaio_logo.svg',
  'msi': 'https://upload.wikimedia.org/wikipedia/commons/2/25/MSI_logo.svg',
  'alienware': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Alienware_logo.svg',
  'toshiba': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Toshiba_logo.svg',
  'android': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg'
};

const outDir = path.join(__dirname, 'public', 'brands');

async function download() {
  for (const [name, url] of Object.entries(logos)) {
    const dest = path.join(outDir, `${name}.svg`);
    await new Promise((resolve) => {
      https.get(url, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          fs.writeFileSync(dest, body);
          console.log('Downloaded', name);
          resolve();
        });
      }).on('error', (e) => {
        console.error('Failed to download', name, e.message);
        resolve();
      });
    });
  }
}

download();
