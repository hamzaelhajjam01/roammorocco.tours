async function verifyLive() {
  const urls = [
    { name: 'Root English Home', url: 'https://roammorocco.tours/' },
    { name: 'Master Sitemap Index', url: 'https://roammorocco.tours/sitemap.xml' },
    { name: 'Sitemap Main XML', url: 'https://roammorocco.tours/sitemap-main.xml' },
    { name: 'French Home (/fr/)', url: 'https://roammorocco.tours/fr/' },
    { name: 'Spanish Transfer Route', url: 'https://roammorocco.tours/es/transfers/marrakech-to-essaouira.html' },
    { name: 'German Blog Post', url: 'https://roammorocco.tours/de/blog/morocco-10-day-itinerary.html' },
    { name: 'Italian Commercial Page', url: 'https://roammorocco.tours/it/morocco-private-driver.html' }
  ];

  console.log('🌐 VERIFYING LIVE ROAM MOROCCO MULTILINGUAL DEPLOYMENT...\n');

  for (const item of urls) {
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const text = await res.text();
      const langMatch = text.match(/<html\b[^>]*lang="([^"]+)"/i);
      const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
      const canMatch = text.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
      const hreflangs = [...text.matchAll(/hreflang="([^"]+)"/g)].map(m => m[1]);

      console.log(`✅ [HTTP ${res.status}] ${item.name}`);
      console.log(`   URL: ${item.url}`);
      if (langMatch) console.log(`   HTML Lang: <${langMatch[1]}>`);
      if (titleMatch) console.log(`   Title: ${titleMatch[1].slice(0, 70)}...`);
      if (canMatch) console.log(`   Canonical: ${canMatch[1]}`);
      if (hreflangs.length > 0) console.log(`   Hreflangs: [${hreflangs.join(', ')}]`);
      console.log('');
    } catch (err) {
      console.error(`❌ [ERROR] ${item.name}:`, err.message);
    }
  }
}

verifyLive();
