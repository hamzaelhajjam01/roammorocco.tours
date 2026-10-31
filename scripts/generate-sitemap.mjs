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
      if (
        relPath === 'transfers/index.html' ||
        relPath === 'blog/index.html' ||
        /^(fr|es|de|it)\/(transfers|blog)\/index\.html$/.test(relPath) ||
        /^(fr\/|es\/|de\/|it\/)?marrakech-free-walking-tour\.html$/.test(relPath)
      ) {
        continue;
      }
      results.push(relPath);
    }
  }
  return results;
}

function getPriorityAndFreq(relPath) {
  const clean = relPath.replace(/^(fr|es|de|it)\//, '');
  if (clean === 'index.html') {
    return { priority: '1.0', changefreq: 'weekly' };
  }
  if (
    clean === 'transfers.html' ||
    clean === 'tours.html' ||
    clean === 'morocco-private-driver.html' ||
    clean === 'destinations.html' ||
    clean === 'custom-morocco-tour.html'
  ) {
    return { priority: '0.95', changefreq: 'weekly' };
  }
  if (
    clean.startsWith('destination-') ||
    clean.startsWith('tour-') ||
    clean.startsWith('marrakech-') ||
    clean === 'morocco-trip-cost-calculator.html'
  ) {
    return { priority: '0.90', changefreq: 'weekly' };
  }
  if (clean.startsWith('transfers/')) {
    return { priority: '0.85', changefreq: 'weekly' };
  }
  if (clean === 'blog.html') {
    return { priority: '0.85', changefreq: 'weekly' };
  }
  if (clean.startsWith('blog/')) {
    return { priority: '0.80', changefreq: 'monthly' };
  }
  if (
    clean === 'privacy-policy.html' ||
    clean === 'refund-policy.html' ||
    clean === 'terms-conditions.html' ||
    clean === 'travel-policy.html'
  ) {
    return { priority: '0.50', changefreq: 'monthly' };
  }
  return { priority: '0.70', changefreq: 'monthly' };
}

function categorizeFile(file) {
  const clean = file.replace(/^(fr|es|de|it)\//, '');
  if (clean === 'tours.html' || clean.startsWith('tour-') || clean.includes('free-tour') || clean.includes('walking-tour') || clean.includes('-desert-tour-')) {
    return 'tours';
  }
  if (clean === 'destinations.html' || clean.startsWith('destination-')) {
    return 'destinations';
  }
  if (clean === 'transfers.html' || clean.startsWith('transfers/')) {
    return 'transfers';
  }
  if (clean === 'blog.html' || clean.startsWith('blog/')) {
    return 'blog';
  }
  return 'main';
}

function buildUrlsetXml(files, today) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const file of files) {
    let loc = `${SITE_URL}/${file}`;
    if (file === 'index.html') {
      loc = `${SITE_URL}/`;
    } else if (file.endsWith('/index.html')) {
      loc = `${SITE_URL}/${file.replace(/index\.html$/, '')}`;
    }
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
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
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

  // Normalize localized homepages: Astro build with format: 'file' generates dist/{lang}.html
  // Copy to dist/{lang}/index.html so web servers serve {lang}/ directly and sitemap generates canonical URLs
  const locales = ['fr', 'es', 'de', 'it'];
  for (const loc of locales) {
    const langHtml = path.join(DIST_DIR, `${loc}.html`);
    const langDir = path.join(DIST_DIR, loc);
    const langIndex = path.join(langDir, 'index.html');
    if (fs.existsSync(langHtml)) {
      if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });
      fs.copyFileSync(langHtml, langIndex);
      fs.unlinkSync(langHtml);
    }
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

  // Copy sitemap.xsl to dist/
  if (fs.existsSync(path.join(PUBLIC_DIR, 'sitemap.xsl'))) {
    fs.copyFileSync(path.join(PUBLIC_DIR, 'sitemap.xsl'), path.join(DIST_DIR, 'sitemap.xsl'));
  }

  console.log(`Successfully generated master sitemap.xml index referencing ${subSitemaps.length} categorized sitemaps (${rawFiles.length} total URLs).`);
}

generateCategorizedSitemaps();
