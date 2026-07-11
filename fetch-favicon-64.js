const https = require('https');
const fs = require('fs');
const path = require('path');

const domains = {
  'sun cellular': 'suncellular.com.ph',
  'compaq': 'compaq.com',
  'smart': 'smart.com.ph'
};

const outDir = path.join(__dirname, 'public', 'brands');

async function download() {
  for (const [name, domain] of Object.entries(domains)) {
    const dest = path.join(outDir, name + '.svg');
    let url = 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=64';
    
    await new Promise((resolve) => {
      const fetchUrl = (currentUrl) => {
        https.get(currentUrl, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            fetchUrl(res.headers.location);
            return;
          }
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
            const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 64 64">
  <image href="data:image/png;base64,${base64}" width="64" height="64" />
</svg>`;
            fs.writeFileSync(dest, svgCode);
            console.log('Created SVG wrapper for', name);
            resolve();
          });
        });
      };
      fetchUrl(url);
    });
  }
}
download();
