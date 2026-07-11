const https = require('https');
const fs = require('fs');
const path = require('path');

const pngDomains = {
  'gcash': 'gcash.com',
  'maya': 'maya.ph',
  'dito telecommunity': 'dito.ph',
  'globe': 'globe.com.ph',
  'sun cellular': 'suncellular.com.ph',
  'predator': 'acer.com',
  'compaq': 'compaq.com',
  'smart': 'smart.com.ph'
};

const outDir = path.join(__dirname, 'public', 'brands');

async function download() {
  for (const [name, domain] of Object.entries(pngDomains)) {
    const dest = path.join(outDir, name + '.svg');
    const url = 'https://logo.clearbit.com/' + domain;
    
    await new Promise((resolve) => {
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          console.log('Failed to fetch', domain, res.statusCode);
          resolve();
          return;
        }
        
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const base64 = buffer.toString('base64');
          // Wrap in SVG
          const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 128 128">
  <image href="data:image/png;base64,${base64}" width="128" height="128" />
</svg>`;
          fs.writeFileSync(dest, svgCode);
          console.log('Created SVG wrapper for', name);
          resolve();
        });
      }).on('error', (e) => {
        console.error('Error fetching', name, e.message);
        resolve();
      });
    });
  }
}
download();
