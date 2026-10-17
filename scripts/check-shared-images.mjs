import fs from 'node:fs';
import path from 'node:path';

const blogFiles = fs.readdirSync('src/pages/blog');
const imgCounts = {};

for (const bf of blogFiles) {
  if (!bf.endsWith('.astro')) continue;
  const content = fs.readFileSync(path.join('src/pages/blog', bf), 'utf8');
  const imgMatches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  imgMatches.forEach(src => {
    if (src.includes('whatsapp') || src.includes('logo')) return;
    imgCounts[src] = imgCounts[src] || [];
    imgCounts[src].push(bf);
  });
}

console.log('\n--- IMAGES SHARED ACROSS DIFFERENT BLOG POSTS ---');
for (const [src, posts] of Object.entries(imgCounts)) {
  if (posts.length > 1) {
    console.log(`${src} (${posts.length} posts): \n  -> ${posts.join('\n  -> ')}\n`);
  }
}
