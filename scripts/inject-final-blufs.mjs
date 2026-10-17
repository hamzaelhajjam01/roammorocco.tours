import fs from 'node:fs';
import path from 'node:path';

const finalCards = {
  'src/pages/blog/ferry-from-spain-to-morocco.astro': {
    target: '<div class="article-body">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Ferry from Spain to Morocco Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: FASTEST FERRY FROM SPAIN TO MOROCCO</span>
        <span class="ai-summary-badge">Strait of Gibraltar</span>
      </div>
      <p class="ai-summary-text">
        The fastest and most convenient ferry crossing is from <strong>Tarifa (Spain) to Tanger Ville (Morocco)</strong>, taking just <strong>60 minutes</strong> on FRS/DFDS or Baleària fast catamarans and arriving directly at the pedestrian port inside Tangier’s city center. <strong>Crucial border rule:</strong> Moroccan passport stamping takes place <em>on board the ferry during sailing</em> at the police booth, not inside the arrival terminal. The <strong>Algeciras to Tanger Med</strong> route takes 90 minutes but docks 50 km outside Tangier at the cargo port, requiring an extra 50-minute private taxi.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/bali-travel-guide.astro': {
    target: '<div class="article-body">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Where to Stay in Bali Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: WHERE TO STAY IN BALI (2026)</span>
        <span class="ai-summary-badge">Island Guide</span>
      </div>
      <p class="ai-summary-text">
        <strong>Choose Ubud</strong> for sacred water temples, lush jungle wellness sanctuaries, and private infinity villas. <strong>Choose Canggu</strong> for surf culture, beach clubs, and hipster cafés. <strong>Choose Uluwatu</strong> for dramatic cliffside luxury resorts and world-class surf breaks. <strong>Choose Seminyak</strong> for high-end boutique shopping and upscale fine dining. Avoid moving hotels every night due to heavy island traffic (<em>macet</em>); base yourself in 2 regions maximum.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/dubai-travel-guide.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Dubai Travel Guide Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: DUBAI TRAVEL SNAPSHOT (2026)</span>
        <span class="ai-summary-badge">Emirate Overview</span>
      </div>
      <p class="ai-summary-text">
        The optimal Dubai trip duration is <strong>4 to 6 days</strong>. The best travel season is <strong>November through March</strong> (pleasant 24°C–28°C / 75°F–82°F weather); avoid extreme summer heat (45°C+) from June to August. First-time visitors should stay in <strong>Dubai Marina / JBR</strong> for walkable beachfront promenades or <strong>Downtown Dubai</strong> for the Burj Khalifa and Dubai Mall.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/istanbul-travel-guide.astro': {
    target: '<div class="article-body">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Where to Stay in Istanbul Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: WHERE TO STAY IN ISTANBUL (2026)</span>
        <span class="ai-summary-badge">Two-Continent Hub</span>
      </div>
      <p class="ai-summary-text">
        <strong>Choose Sultanahmet</strong> for instant walking access to Hagia Sophia, the Blue Mosque, Topkapi Palace, and Basilica Cistern (best for 2–3 day first-timers). <strong>Choose Karaköy / Galata</strong> for vibrant boutique cafes, rooftop art galleries, and hip nightlife. <strong>Choose Kadıköy</strong> (Asian side) for authentic local food markets, ferry rides, and relaxed residential life away from tourist crowds.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/paris-travel-guide.astro': {
    target: '<div class="article-body">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Where to Stay in Paris Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: WHERE TO STAY IN PARIS (2026)</span>
        <span class="ai-summary-badge">Arrondissement Guide</span>
      </div>
      <p class="ai-summary-text">
        <strong>Best for first-timers:</strong> The 1st & 2nd Arrondissements (Louvre / Palais Royal) or the 4th (Le Marais) for walkable access to iconic landmarks, Parisian architecture, and world-class bakeries. <strong>Best for romance and cafe culture:</strong> The 6th (Saint-Germain-des-Prés). <strong>Best for bohemian charm and views:</strong> The 18th (Montmartre). For seamless transit, ensure your hotel is within a 3-minute walk of a major Métro line.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/tokyo-travel-guide.astro': {
    target: '<div class="article-content article-body">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Where to Stay in Tokyo Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: WHERE TO STAY IN TOKYO (2026)</span>
        <span class="ai-summary-badge">Neighborhood Guide</span>
      </div>
      <p class="ai-summary-text">
        <strong>Best overall base:</strong> <strong>Shinjuku</strong> for unbeatable transit on the JR Yamanote loop line, vibrant nightlife, and airport express connections. <strong>Best for youth & street style:</strong> <strong>Shibuya</strong>. <strong>Best for tradition & budget boutique ryokans:</strong> <strong>Asakusa</strong> (Senso-ji temple). <strong>Best for high-end luxury:</strong> <strong>Ginza</strong>. Always stay within a 5-minute walk of a JR Yamanote or Tokyo Metro station.
      </p>
    </aside>\n\n    `
  }
};

let count = 0;
for (const [relPath, config] of Object.entries(finalCards)) {
  const filePath = path.resolve(relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('ai-quick-summary-card')) {
    console.log(`Already has BLUF: ${relPath}`);
    continue;
  }

  if (content.includes(config.target)) {
    content = content.replace(config.target, config.card + config.target);
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Injected BLUF card into: ${relPath}`);
  } else {
    console.warn(`Target not found in: ${relPath}`);
  }
}

console.log(`Injected final ${count} cards successfully!`);
