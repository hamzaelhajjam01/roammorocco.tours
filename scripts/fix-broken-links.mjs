import fs from 'node:fs';
import path from 'node:path';

const blogFiles = fs.readdirSync('src/pages/blog')
  .filter(f => f.endsWith('.astro'))
  .map(f => f.replace(/\.astro$/, ''));

console.log(`Targeting ${blogFiles.length} known blog slugs for link fixes.`);

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, callback);
    } else if (full.endsWith('.astro') || full.endsWith('.js') || full.endsWith('.mjs') || full.endsWith('.json')) {
      callback(full);
    }
  }
}

let totalReplacements = 0;
const affectedFiles = [];

walkDir('src', filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const slug of blogFiles) {
    // Matches href="/slug.html" or href="/slug" but NOT href="/blog/slug...
    // Also avoid matching when preceded by /blog/
    const patternHtml = new RegExp(`href=["']/(?!blog/)${slug}\\.html(["'])`, 'g');
    const patternNoExt = new RegExp(`href=["']/(?!blog/)${slug}(["'])`, 'g');

    if (patternHtml.test(content)) {
      content = content.replace(patternHtml, `href="/blog/${slug}.html$1`);
    }
    if (patternNoExt.test(content)) {
      content = content.replace(patternNoExt, `href="/blog/${slug}.html$1`);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    affectedFiles.push(filePath);
    totalReplacements++;
  }
});

console.log(`Updated ${totalReplacements} files with corrected /blog/ URLs:`);
affectedFiles.forEach(f => console.log(`  - ${f}`));

// Add Apache 301 redirects in public/.htaccess for seamless backwards compatibility
const htaccessPath = path.resolve('public/.htaccess');
let htaccess = fs.readFileSync(htaccessPath, 'utf8');

const marker = '# 3. Blog Slug Permalinks (Legacy & Direct Link Redirects to /blog/)';
if (!htaccess.includes(marker)) {
  let redirectRules = `\n  ${marker}\n`;
  for (const slug of blogFiles) {
    redirectRules += `  RewriteRule ^${slug}\\.html$ /blog/${slug}.html [L,R=301]\n`;
    redirectRules += `  RewriteRule ^${slug}$ /blog/${slug}.html [L,R=301]\n`;
  }

  // Insert right after RewriteBase /
  htaccess = htaccess.replace('RewriteBase /', `RewriteBase /\n${redirectRules}`);
  fs.writeFileSync(htaccessPath, htaccess, 'utf8');
  console.log(`Appended 301 redirect rules to public/.htaccess!`);
} else {
  console.log(`public/.htaccess already contains blog redirect rules.`);
}
