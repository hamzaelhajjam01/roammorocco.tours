import fs from 'node:fs';
import path from 'node:path';

const blogFiles = fs.readdirSync('src/pages/blog');
const blogImages = {};

for (const bf of blogFiles) {
  if (!bf.endsWith('.astro')) continue;
  const content = fs.readFileSync(path.join('src/pages/blog', bf), 'utf8');
  const imgMatches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  const ogMatches = [...content.matchAll(/ogImage\s*=\s*["']([^"']+)["']/g)].map(m => m[1]);
  blogImages[bf] = {
    imgs: imgMatches,
    og: ogMatches
  };
}

console.log('--- BLOG POST IMAGE AUDIT ---');
for (const [bf, data] of Object.entries(blogImages)) {
  const duplicates = data.imgs.filter((item, index) => data.imgs.indexOf(item) !== index);
  const missing = data.imgs.filter(src => {
    let clean = src.replace(/^https:\/\/roammorocco\.tours/, '').replace(/\?.*$/, '');
    if (!clean.startsWith('/')) clean = '/' + clean;
    return !fs.existsSync('public' + clean) && !src.startsWith('http');
  });

  const dupInfo = duplicates.length ? `⚠️ DUPLICATES (${duplicates.length}): ${JSON.stringify([...new Set(duplicates)])}` : '✓ No dups';
  const missInfo = missing.length ? `❌ MISSING: ${JSON.stringify(missing)}` : '✓ All exist';
  console.log(`${bf.padEnd(46)} Total: ${String(data.imgs.length).padEnd(2)} | ${dupInfo} | ${missInfo}`);
}
