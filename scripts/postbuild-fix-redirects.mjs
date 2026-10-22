import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const mappings = [
  ['dist/transfers.html', 'dist/transfers/index.html'],
  ['dist/blog.html', 'dist/blog/index.html'],
  ['dist/fr/transfers.html', 'dist/fr/transfers/index.html'],
  ['dist/fr/blog.html', 'dist/fr/blog/index.html'],
  ['dist/es/transfers.html', 'dist/es/transfers/index.html'],
  ['dist/es/blog.html', 'dist/es/blog/index.html'],
  ['dist/de/transfers.html', 'dist/de/transfers/index.html'],
  ['dist/de/blog.html', 'dist/de/blog/index.html'],
  ['dist/it/transfers.html', 'dist/it/transfers/index.html'],
  ['dist/it/blog.html', 'dist/it/blog/index.html'],
];

let created = 0;
for (const [srcRel, destRel] of mappings) {
  const src = path.join(ROOT_DIR, srcRel);
  const dest = path.join(ROOT_DIR, destRel);
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    created++;
  }
}

console.log(`[postbuild] Successfully ensured ${created} directory index.html files.`);
