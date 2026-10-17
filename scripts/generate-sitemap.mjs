import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://roammorocco.tours';
const DIST_DIR = path.resolve('dist');
const PUBLIC_DIR = path.resolve('public');

function getFilesRecursively(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else if (file.endsWith('.html') && file !== '404.html') {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push(relPath);
    }
  }
  return results;
}

function getPriorityAndFreq(relPath) {
  if (relPath === 'index.html') {
    return { priority: '1.0', changefreq: 'weekly' };
  }
  if (
    relPath === 'transfers.html' ||
    relPath === 'tours.html' ||
    relPath === 'morocco-private-driver.html' ||
    relPath === 'destinations.html' ||
    relPath === 'custom-morocco-tour.html'
  ) {
    return { priority: '0.95', changefreq: 'weekly' };
  }
  if (
    relPath.startsWith('destination-') ||
    relPath.startsWith('tour-') ||
    relPath.startsWith('marrakech-') ||
    relPath === 'morocco-trip-cost-calculator.html'
  ) {
    return { priority: '0.90', changefreq: 'weekly' };
  }
  if (relPath.startsWith('transfers/')) {
    return { priority: '0.85', changefreq: 'weekly' };
  }
  if (relPath === 'blog.html') {
    return { priority: '0.85', changefreq: 'weekly' };
  }
  if (relPath.startsWith('blog/')) {
    return { priority: '0.80', changefreq: 'monthly' };
  }
  if (
    relPath === 'privacy-policy.html' ||
    relPath === 'refund-policy.html' ||
    relPath === 'terms-conditions.html' ||
    relPath === 'travel-policy.html'
  ) {
    return { priority: '0.50', changefreq: 'monthly' };
  }
  return { priority: '0.70', changefreq: 'monthly' };
}

function generateSitemap() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('Error: dist directory does not exist. Run astro build first.');
    process.exit(1);
  }

  const rawFiles = getFilesRecursively(DIST_DIR);
  const htmlFiles = rawFiles.sort((a, b) => {
    if (a === 'index.html') return -1;
    if (b === 'index.html') return 1;
    return a.localeCompare(b);
  });
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const file of htmlFiles) {
    const loc = file === 'index.html' ? `${SITE_URL}/` : `${SITE_URL}/${file}`;
    const { priority, changefreq } = getPriorityAndFreq(file);

    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  const distSitemap = path.join(DIST_DIR, 'sitemap.xml');
  const publicSitemap = path.join(PUBLIC_DIR, 'sitemap.xml');

  fs.writeFileSync(distSitemap, xml, 'utf8');
  fs.writeFileSync(publicSitemap, xml, 'utf8');

  console.log(`Successfully generated sitemap with ${htmlFiles.length} URLs:`);
  console.log(` - ${distSitemap}`);
  console.log(` - ${publicSitemap}`);
}

generateSitemap();
