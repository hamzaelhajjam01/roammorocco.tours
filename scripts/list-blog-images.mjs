import fs from 'node:fs';
import path from 'node:path';

const blogFiles = fs.readdirSync('src/pages/blog').filter(f => f.endsWith('.astro'));

for (const bf of blogFiles) {
  const content = fs.readFileSync(path.join('src/pages/blog', bf), 'utf8');
  const imgs = [...content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)].map(m => m[0]);
  console.log(`\n=== ${bf} === (${imgs.length} images)`);
  imgs.forEach(img => console.log('   ' + img));
}
