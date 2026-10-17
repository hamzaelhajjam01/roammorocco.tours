import fs from 'node:fs';
import path from 'node:path';

const CACHE_FILE = path.resolve('scripts/translation-cache.json');
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    cache = {};
  }
}

let cacheDirty = false;
function saveCache() {
  if (cacheDirty) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
    cacheDirty = false;
  }
}

// Concurrency pool helper
async function mapConcurrent(items, concurrency, fn) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// Translate a single string or HTML fragment
async function translateString(text, targetLang) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;
  if (/^[\d\s€$.,:;%+\-*\/()#_|=><]+$/.test(trimmed)) return text; // symbols or numbers only
  if (/^https?:\/\//.test(trimmed)) return text; // URLs

  const cacheKey = `${targetLang}:${trimmed}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // Fallback chain: dict-chrome-ex -> at -> MyMemory
  const apis = [
    {
      name: 'dict-chrome-ex',
      getUrl: (q) => `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(q)}`,
      parse: (d) => d[0].map(s => s[0]).join('')
    },
    {
      name: 'at',
      getUrl: (q) => `https://translate.googleapis.com/translate_a/single?client=at&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(q)}`,
      parse: (d) => d[0].map(s => s[0]).join('')
    },
    {
      name: 'mymemory',
      getUrl: (q) => `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=en|${targetLang}`,
      parse: (d) => d.responseData.translatedText
    }
  ];

  for (const api of apis) {
    try {
      const res = await fetch(api.getUrl(trimmed), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) continue;
      const data = await res.json();
      const result = api.parse(data);
      if (result && typeof result === 'string') {
        cache[cacheKey] = result;
        cacheDirty = true;
        return result;
      }
    } catch (err) {
      // try next API
    }
  }

  // fallback to original if all fail
  return text;
}

// Process an Astro file content for a target language
async function processAstroFile(content, lang, isBlog) {
  // 1. Separate frontmatter from template
  const parts = content.split(/^---$/m);
  if (parts.length < 3) return content; // Not standard Astro

  let frontmatter = parts[1];
  let template = parts.slice(2).join('---');

  // 2. Adjust imports in frontmatter
  if (isBlog) {
    frontmatter = frontmatter.replace(/from '\.\.\/\.\.\/layouts\/Layout\.astro'/g, "from '../../../layouts/Layout.astro'");
    frontmatter = frontmatter.replace(/from '\.\.\/\.\.\/components\//g, "from '../../../components/");
  } else {
    frontmatter = frontmatter.replace(/from '\.\.\/layouts\/Layout\.astro'/g, "from '../../layouts/Layout.astro'");
    frontmatter = frontmatter.replace(/from '\.\.\/components\//g, "from '../../components/");
    frontmatter = frontmatter.replace(/from '\.\/components\//g, "from '../components/");
    frontmatter = frontmatter.replace(/from '\.\.\/data\//g, "from '../../data/");
  }

  // 3. Adjust canonical URL in frontmatter
  frontmatter = frontmatter.replace(/(canonical\s*=\s*["']https:\/\/roammorocco\.tours\/)([^"']*)(["'])/g, (m, p1, p2, p3) => {
    return `${p1}${lang}/${p2}${p3}`;
  });

  // 4. Translate title and description in frontmatter
  const titleMatch = frontmatter.match(/title\s*=\s*(["'])((?:(?!\1)[^\\]|\\.)*)\1/);
  if (titleMatch && titleMatch[2]) {
    const trTitle = await translateString(titleMatch[2], lang);
    frontmatter = frontmatter.replace(titleMatch[0], `title = ${JSON.stringify(trTitle)}`);
  }

  const descMatch = frontmatter.match(/description\s*=\s*(["'])((?:(?!\1)[^\\]|\\.)*)\1/);
  if (descMatch && descMatch[2]) {
    const trDesc = await translateString(descMatch[2], lang);
    frontmatter = frontmatter.replace(descMatch[0], `description = ${JSON.stringify(trDesc)}`);
  }

  // 5. Adjust <Layout> call
  template = template.replace(/<Layout\b/g, `<Layout lang="${lang}"`);

  // 6. Protect <script> and <style> blocks in template
  const protectedBlocks = [];
  template = template.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (match) => {
    const token = `___PROTECTED_BLOCK_${protectedBlocks.length}___`;
    protectedBlocks.push(match);
    return token;
  });

  // 7. Update internal navigation links
  const linkReplacements = [
    { from: /href="\/(#top)?"/g, to: `href="/${lang}/"` },
    { from: /href="\/index\.html"/g, to: `href="/${lang}/index.html"` },
    { from: /href="\/tours\.html"/g, to: `href="/${lang}/tours.html"` },
    { from: /href="\/transfers\.html"/g, to: `href="/${lang}/transfers.html"` },
    { from: /href="\/destinations\.html"/g, to: `href="/${lang}/destinations.html"` },
    { from: /href="\/blog\.html"/g, to: `href="/${lang}/blog.html"` },
    { from: /href="\/morocco-private-driver\.html"/g, to: `href="/${lang}/morocco-private-driver.html"` },
    { from: /href="\/custom-morocco-tour\.html"/g, to: `href="/${lang}/custom-morocco-tour.html"` },
    { from: /href="\/about\.html"/g, to: `href="/${lang}/about.html"` },
    { from: /href="\/travel-deals\.html"/g, to: `href="/${lang}/travel-deals.html"` },
    { from: /href="\/experiences\.html"/g, to: `href="/${lang}/experiences.html"` },
    { from: /href="\/morocco-trip-cost-calculator\.html"/g, to: `href="/${lang}/morocco-trip-cost-calculator.html"` },
    { from: /href="\/marrakech-free-walking-tour\.html"/g, to: `href="/${lang}/marrakech-free-walking-tour.html"` },
    { from: /href="\/marrakech-medina-sunset-free-tour\.html"/g, to: `href="/${lang}/marrakech-medina-sunset-free-tour.html"` },
    { from: /href="\/privacy-policy\.html"/g, to: `href="/${lang}/privacy-policy.html"` },
    { from: /href="\/refund-policy\.html"/g, to: `href="/${lang}/refund-policy.html"` },
    { from: /href="\/terms-conditions\.html"/g, to: `href="/${lang}/terms-conditions.html"` },
    { from: /href="\/travel-policy\.html"/g, to: `href="/${lang}/travel-policy.html"` },
    { from: /href="\/destination-([^"]+)"/g, to: `href="/${lang}/destination-$1"` },
    { from: /href="\/tour-([^"]+)"/g, to: `href="/${lang}/tour-$1"` },
    { from: /href="\/transfers\/([^"]+)"/g, to: `href="/${lang}/transfers/$1"` },
    { from: /href="\/blog\/([^"]+)"/g, to: `href="/${lang}/blog/$1"` }
  ];

  for (const rep of linkReplacements) {
    template = template.replace(rep.from, rep.to);
  }

  // 8. Translate headings, paragraphs, and list items with concurrency
  const tagRegex = /<(h1|h2|h3|h4|h5|p|li|blockquote|figcaption|th|td)\b([^>]*)>([\s\S]*?)<\/\1>/gi;

  const matches = [];
  let m;
  while ((m = tagRegex.exec(template)) !== null) {
    const full = m[0];
    const tag = m[1];
    const attrs = m[2];
    const inner = m[3];
    if (!inner.includes('___PROTECTED_BLOCK_') && !/<(div|section|article|table|ul|ol)\b/i.test(inner)) {
      matches.push({ full, tag, attrs, inner });
    }
  }

  const validItems = matches.filter(item => {
    const t = item.inner.trim();
    return t && !t.includes('{') && !t.includes('}');
  });

  await mapConcurrent(validItems, 6, async (item) => {
    const trimmed = item.inner.trim();
    const translated = await translateString(trimmed, lang);
    if (translated && translated !== trimmed) {
      item.replacement = `<${item.tag}${item.attrs}>${translated}</${item.tag}>`;
    }
  });

  for (const item of validItems) {
    if (item.replacement) {
      template = template.replace(item.full, item.replacement);
    }
  }

  // 9. Restore protected blocks
  for (let i = 0; i < protectedBlocks.length; i++) {
    template = template.replace(`___PROTECTED_BLOCK_${i}___`, protectedBlocks[i]);
  }

  return `---${frontmatter}---${template}`;
}

async function main() {
  console.log('🚀 Starting Optimized Multilingual Static Generator (6x Concurrency)...');
  const languages = ['fr', 'es', 'de', 'it'];

  const pagesDir = path.resolve('src/pages');
  const blogDir = path.resolve('src/pages/blog');

  const coreFiles = fs.readdirSync(pagesDir)
    .filter(f => f.endsWith('.astro') && f !== '404.astro');

  const blogFiles = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.astro'));

  console.log(`Processing ${coreFiles.length} core pages and ${blogFiles.length} blog posts across 4 locales.`);

  for (const lang of languages) {
    console.log(`\n========================================`);
    console.log(`🌐 GENERATING LOCALE: [${lang.toUpperCase()}]`);
    console.log(`========================================`);

    const targetLangDir = path.resolve(`src/pages/${lang}`);
    const targetBlogDir = path.resolve(`src/pages/${lang}/blog`);

    if (!fs.existsSync(targetLangDir)) fs.mkdirSync(targetLangDir, { recursive: true });
    if (!fs.existsSync(targetBlogDir)) fs.mkdirSync(targetBlogDir, { recursive: true });

    // 1. Process Core Pages
    for (let i = 0; i < coreFiles.length; i++) {
      const file = coreFiles[i];
      const srcPath = path.join(pagesDir, file);
      const destPath = path.join(targetLangDir, file);

      console.log(`[${lang.toUpperCase()}] (${i + 1}/${coreFiles.length}) Core: ${file}...`);
      const raw = fs.readFileSync(srcPath, 'utf8');
      const processed = await processAstroFile(raw, lang, false);
      fs.writeFileSync(destPath, processed, 'utf8');
      saveCache();
    }

    // 2. Process Blog Posts
    for (let i = 0; i < blogFiles.length; i++) {
      const file = blogFiles[i];
      const srcPath = path.join(blogDir, file);
      const destPath = path.join(targetBlogDir, file);

      console.log(`[${lang.toUpperCase()}] (${i + 1}/${blogFiles.length}) Blog: ${file}...`);
      const raw = fs.readFileSync(srcPath, 'utf8');
      const processed = await processAstroFile(raw, lang, true);
      fs.writeFileSync(destPath, processed, 'utf8');
      saveCache();
    }

    console.log(`✅ [${lang.toUpperCase()}] Completed ${coreFiles.length + blogFiles.length} pages!`);
  }

  saveCache();
  console.log('\n🎉 ALL STATIC MULTILINGUAL PAGES GENERATED CLEANLY!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
