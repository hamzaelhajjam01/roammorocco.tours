import fs from 'node:fs';
import path from 'node:path';

const HOST = 'roammorocco.tours';
const KEY = '1b3a65414d2c467f816e7f4227d2d2a2';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.resolve('public/sitemap.xml');

// Read all URLs from sitemap-transfers.xml, sitemap-main.xml, sitemap-tours.xml, sitemap-destinations.xml, sitemap-blog.xml
const sitemapFiles = [
  'public/sitemap-transfers.xml',
  'public/sitemap-blog.xml',
  'public/sitemap-destinations.xml',
  'public/sitemap-tours.xml',
  'public/sitemap-main.xml'
];

let urls = [];
for (const file of sitemapFiles) {
  const filePath = path.resolve(file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(/<loc>(https:\/\/[^<]+)<\/loc>/g);
    if (matches) {
      for (const m of matches) {
        const u = m.replace('<loc>', '').replace('</loc>', '').trim();
        if (!urls.includes(u)) {
          urls.push(u);
        }
      }
    }
  }
}

console.log(`Found ${urls.length} total URLs to submit to IndexNow.`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls
};

async function submitIndexNow() {
  const endpoints = [
    'https://api.indexnow.org/IndexNow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    console.log(`Submitting to ${endpoint}...`);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`Response from ${endpoint}: ${response.status} ${response.statusText}`);
      const text = await response.text();
      if (text) {
        console.log(`Body: ${text}`);
      }
    } catch (err) {
      console.error(`Error submitting to ${endpoint}:`, err.message);
    }
  }
}

submitIndexNow();
