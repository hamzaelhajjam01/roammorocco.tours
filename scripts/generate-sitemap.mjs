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

function categorizeFile(file) {
  if (file === 'tours.html' || file.startsWith('tour-') || file.includes('free-tour') || file.includes('walking-tour')) {
    return 'tours';
  }
  if (file === 'destinations.html' || file.startsWith('destination-')) {
    return 'destinations';
  }
  if (file === 'transfers.html' || file.startsWith('transfers/')) {
    return 'transfers';
  }
  if (file === 'blog.html' || file.startsWith('blog/')) {
    return 'blog';
  }
  return 'main';
}

function buildUrlsetXml(files, today) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const file of files) {
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
  return xml;
}

function buildSitemapIndexXml(sitemaps, today) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const sitemapName of sitemaps) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${SITE_URL}/${sitemapName}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </sitemap>\n';
  }

  xml += '</sitemapindex>\n';
  return xml;
}

function generateCategorizedSitemaps() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('Error: dist directory does not exist. Run astro build first.');
    process.exit(1);
  }

  const rawFiles = getFilesRecursively(DIST_DIR);
  const today = new Date().toISOString().split('T')[0];

  const categories = {
    main: [],
    tours: [],
    destinations: [],
    transfers: [],
    blog: []
  };

  for (const file of rawFiles) {
    const cat = categorizeFile(file);
    categories[cat].push(file);
  }

  // Sort files within categories (index.html always first in main)
  for (const cat of Object.keys(categories)) {
    categories[cat].sort((a, b) => {
      if (a === 'index.html') return -1;
      if (b === 'index.html') return 1;
      return a.localeCompare(b);
    });
  }

  const subSitemaps = [
    { filename: 'sitemap-main.xml', files: categories.main },
    { filename: 'sitemap-tours.xml', files: categories.tours },
    { filename: 'sitemap-destinations.xml', files: categories.destinations },
    { filename: 'sitemap-transfers.xml', files: categories.transfers },
    { filename: 'sitemap-blog.xml', files: categories.blog }
  ];

  // 1. Write individual category sitemaps to both dist/ and public/
  for (const { filename, files } of subSitemaps) {
    const xml = buildUrlsetXml(files, today);
    fs.writeFileSync(path.join(DIST_DIR, filename), xml, 'utf8');
    fs.writeFileSync(path.join(PUBLIC_DIR, filename), xml, 'utf8');
    console.log(` - ${filename}: ${files.length} URLs`);
  }

  // 2. Write master sitemap.xml as a Sitemap Index referencing all sub-sitemaps
  const sitemapFilenames = subSitemaps.map((s) => s.filename);
  const indexXml = buildSitemapIndexXml(sitemapFilenames, today);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), indexXml, 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml, 'utf8');

  console.log(`Successfully generated master sitemap.xml index referencing ${subSitemaps.length} categorized sitemaps (${rawFiles.length} total URLs).`);
}

generateCategorizedSitemaps();
