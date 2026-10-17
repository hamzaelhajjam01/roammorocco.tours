import fs from 'node:fs';
import path from 'node:path';

const distFiles = new Set();
function getFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFiles(full);
    } else {
      const rel = full.replace(/\\/g, '/').replace(/^dist/, '');
      distFiles.add(rel);
    }
  }
}
getFiles('dist');

console.log(`Total indexed files in dist: ${distFiles.size}`);

const brokenRefs = [];
for (const relFile of distFiles) {
  if (!relFile.endsWith('.html')) continue;
  const fullPath = path.join('dist', relFile);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Find all hrefs
  const matches = content.matchAll(/href=["']([^"'#?]+)["']/g);
  for (const match of matches) {
    const href = match[1].trim();
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href.startsWith('#') ||
      href.startsWith('//')
    ) {
      continue;
    }

    let normalized = href;
    if (!normalized.startsWith('/')) {
      const currentDir = path.posix.dirname(relFile);
      normalized = path.posix.normalize(path.posix.join(currentDir, href));
    }

    // Check variations
    const checks = [
      normalized,
      normalized + '.html',
      normalized.replace(/\.html$/, '') + '/index.html',
      path.posix.join(normalized, 'index.html')
    ];

    const existsInDist = checks.some(c => distFiles.has(c));
    const existsInPublic = checks.some(c => fs.existsSync(path.join('public', c)));

    if (!existsInDist && !existsInPublic) {
      brokenRefs.push({
        source: relFile,
        href,
        resolved: normalized
      });
    }
  }
}

console.log(`\nFound ${brokenRefs.length} broken link occurrences.`);
const uniqueBroken = {};
for (const b of brokenRefs) {
  if (!uniqueBroken[b.href]) uniqueBroken[b.href] = [];
  uniqueBroken[b.href].push(b.source);
}

console.log(`\nUnique broken URLs (${Object.keys(uniqueBroken).length}):`);
for (const [url, sources] of Object.entries(uniqueBroken)) {
  console.log(`  ${url} (referenced in ${sources.length} places, e.g. ${sources.slice(0, 3).join(', ')})`);
}
