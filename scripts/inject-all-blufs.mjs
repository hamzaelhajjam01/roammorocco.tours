import fs from 'node:fs';
import path from 'node:path';

const blufCards = {
  // ── REMAINING BLOG POSTS ──
  'src/pages/blog/agafay-desert-vs-merzouga.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Agafay vs Merzouga Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: AGAFAY DESERT VS MERZOUGA</span>
        <span class="ai-summary-badge">Desert Comparison</span>
      </div>
      <p class="ai-summary-text">
        <strong>Choose Agafay Desert</strong> if you are short on time (1–2 days), want luxury glamping, camel rides, and boutique sunset dining just <strong>45 minutes from Marrakech</strong> with zero grueling drives. <strong>Choose Merzouga (Erg Chebbi)</strong> if you want the genuine Sahara Desert experience with towering 150-meter golden sand dunes, camel trekking into the deep sand sea, and total desert silence (requires <strong>3 to 4 days round-trip</strong> across the High Atlas Mountains).
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/sahara-desert-tour-merzouga-vs-zagora.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Merzouga vs Zagora Desert Tour Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: MERZOUGA (ERG CHEBBI) VS ZAGORA</span>
        <span class="ai-summary-badge">Sahara Guide</span>
      </div>
      <p class="ai-summary-text">
        <strong>Choose Merzouga (Erg Chebbi)</strong> for the postcard Sahara Desert experience: towering 150-meter golden sand dunes, deep dune sea glamping, and stargazing (requires <strong>3 to 4 days minimum</strong> from Marrakech). <strong>Choose Zagora</strong> only if you have strictly <strong>2 days / 1 night</strong>, noting that Zagora is a flat, rocky desert plateau (reg) with small, low dunes rather than the vast golden sand hills found at Erg Chebbi.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/morocco-driving-times.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Morocco Driving Times Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: REALISTIC MOROCCO DRIVING TIMES</span>
        <span class="ai-summary-badge">2026 Route Benchmarks</span>
      </div>
      <p class="ai-summary-text">
        Driving times across Morocco depend heavily on terrain: modern autoroutes (tollways) offer smooth 120 km/h cruising, while mountain passes average 45–60 km/h. Key private transfer benchmarks: <strong>Casablanca to Marrakech:</strong> 2h 45m (242 km); <strong>Marrakech to Essaouira:</strong> 2h 30m (175 km); <strong>Marrakech to Fes:</strong> 6h (530 km); <strong>Marrakech to Merzouga (Sahara):</strong> 9h–10h (560 km across Tizi n'Tichka pass, best divided over 2 days); <strong>Tangier to Chefchaouen:</strong> 2h 15m (115 km).
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/morocco-train-and-private-driver.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Train vs Private Driver Morocco Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: MOROCCO TRAIN VS PRIVATE DRIVER</span>
        <span class="ai-summary-badge">Transit Comparison</span>
      </div>
      <p class="ai-summary-text">
        The <strong>Al Boraq high-speed bullet train</strong> is the fastest option for the northern corridor (Tangier to Casablanca in 2h 10m). However, Morocco's rail network <strong>does not reach</strong> the Sahara Desert, High Atlas Mountains, Essaouira, Chefchaouen, or Agadir. For multi-city circuits, mountain passes, and desert expeditions, hiring a <strong>private licensed chauffeur</strong> provides door-to-door riad pickup, luggage handling, and scenic photo stops that trains cannot offer.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/ferry-from-spain-to-morocco.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Ferry from Spain to Morocco Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: FASTEST FERRY FROM SPAIN TO MOROCCO</span>
        <span class="ai-summary-badge">Strait of Gibraltar</span>
      </div>
      <p class="ai-summary-text">
        The fastest and most convenient ferry crossing is from <strong>Tarifa (Spain) to Tanger Ville (Morocco)</strong>, taking just <strong>60 minutes</strong> on FRS / Balearia fast catamarans and arriving directly at the pedestrian port inside Tangier’s city center. The <strong>Algeciras to Tanger Med</strong> ferry takes 90 minutes but arrives at the cargo port 45 km outside Tangier, requiring an extra 50-minute private taxi or transfer to reach downtown.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/spain-morocco-itinerary.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Spain and Morocco Combined Itinerary Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: BEST SPAIN &amp; MOROCCO COMBINED ITINERARY</span>
        <span class="ai-summary-badge">Two-Continent Route</span>
      </div>
      <p class="ai-summary-text">
        The ideal combined <strong>Spain and Morocco itinerary spans 12 to 14 days</strong>: Madrid (2 days) &rarr; Seville (2 days) &rarr; Tarifa 1-hour fast ferry &rarr; Tangier (1 day) &rarr; Chefchaouen blue city (1 day) &rarr; Fes medina (2 days) &rarr; Erg Chebbi Sahara Desert glamping (2 days) &rarr; Marrakech (3 days). Hiring a private driver for the Moroccan leg guarantees seamless luggage transit and comfortable High Atlas crossings.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/gladiator-2-morocco-filming-locations.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Gladiator 2 Filming Locations Morocco Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: GLADIATOR II FILMING LOCATIONS IN MOROCCO</span>
        <span class="ai-summary-badge">Cinematic Heritage</span>
      </div>
      <p class="ai-summary-text">
        Director Ridley Scott filmed <em>Gladiator II</em> (and the original 2000 <em>Gladiator</em>) predominantly in <strong>Ouarzazate</strong> and the UNESCO World Heritage ksar of <strong>Aït Benhaddou</strong> in southern Morocco. Key production sites include the ancient clay arena sets inside Aït Benhaddou and the massive Colosseum replica built in the desert plains outside <strong>CLA and Atlas Film Studios</strong>, easily visited on a private day trip from Marrakech.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/the-art-of-the-souk-bargaining-etiquette.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Moroccan Souk Bargaining Etiquette Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: HOW TO HAGGLE IN MOROCCAN SOUKS</span>
        <span class="ai-summary-badge">Cultural Etiquette</span>
      </div>
      <p class="ai-summary-text">
        Bargaining in Morocco is an honorable social tradition, not a confrontational fight. Start with a warm greeting (<em>"Salam Alaykum"</em>), ask the initial asking price, and counter with <strong>40% to 50% of the quote</strong>. Settle amicably around <strong>60% to 70%</strong> of the original price. Keep negotiations friendly and smiling; if the merchant won't meet your budget, thank them politely with <em>"Shukran"</em> and walk away—they will often call you back with their final best offer.
      </p>
    </aside>\n\n    `
  },

  'src/pages/blog/cheap-flights-to-morocco.astro': {
    target: '<div class="article-content">',
    card: `    <!-- GEO & AEO Key Takeaways Box (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Cheap Flights to Morocco Quick Answer">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ QUICK ANSWER: HOW TO FIND CHEAP FLIGHTS TO MOROCCO</span>
        <span class="ai-summary-badge">Flight Guide</span>
      </div>
      <p class="ai-summary-text">
        The cheapest gateways into Morocco are <strong>Marrakech (RAK)</strong> and <strong>Agadir (AGA)</strong> via budget European airlines (Ryanair, EasyJet, Transavia, Wizz Air) with direct one-way fares often between <strong>€25 to €60</strong>. For North American travelers, <strong>Casablanca (CMN)</strong> provides the primary nonstop hub via Royal Air Maroc (New York JFK, Washington IAD, Miami, Montreal). The cheapest travel months are <strong>November, January, and February</strong>.
      </p>
    </aside>\n\n    `
  },

  // ── REMAINING DESTINATION HUBS ──
  'src/pages/destination-fes.astro': {
    target: '<div class="dest-layout-grid">',
    card: `      <!-- GEO & AEO Destination Fast Facts (BLUF) -->
      <aside class="ai-quick-summary-card" aria-label="Fes Travel Fast Facts">
        <div class="ai-summary-header">
          <span class="ai-summary-kicker">⚡ FES AT A GLANCE (QUICK SUMMARY)</span>
          <span class="ai-summary-badge">Imperial Capital</span>
        </div>
        <p class="ai-summary-text">
          <strong>Fes</strong> is Morocco’s spiritual and cultural capital, home to <strong>Fes el-Bali</strong>—the world's largest contiguous car-free urban area containing over 9,000 medieval alleyways, the 9th-century Al Quaraouiyine University (the world's oldest university), and the iconic 11th-century <strong>Chouara Leather Tanneries</strong>. Recommended visit duration is <strong>2 to 3 days</strong>. Roam Morocco provides licensed academic medina historians, door-to-door riad transport, and Sahara desert transfer connections.
        </p>
      </aside>\n\n      `
  },

  'src/pages/destination-chefchaouen.astro': {
    target: '<div class="dest-layout-grid">',
    card: `      <!-- GEO & AEO Destination Fast Facts (BLUF) -->
      <aside class="ai-quick-summary-card" aria-label="Chefchaouen Travel Fast Facts">
        <div class="ai-summary-header">
          <span class="ai-summary-kicker">⚡ CHEFCHAOUEN AT A GLANCE (QUICK SUMMARY)</span>
          <span class="ai-summary-badge">The Blue Pearl</span>
        </div>
        <p class="ai-summary-text">
          <strong>Chefchaouen</strong> (Morocco’s famous Blue Pearl) is nestled in the dramatic Rif Mountains of northern Morocco, celebrated for its powder-blue painted medina walls, Spanish Mosque sunset vistas, and tranquil artisan wool-weaving culture. Recommended visit duration is <strong>1 to 2 days</strong>, easily accessible via private chauffeur from Tangier (2h 15m) or Fes (3h 30m) with scenic mountain photo stops included.
        </p>
      </aside>\n\n      `
  },

  'src/pages/destination-high-atlas.astro': {
    target: '<div class="dest-layout-grid">',
    card: `      <!-- GEO & AEO Destination Fast Facts (BLUF) -->
      <aside class="ai-quick-summary-card" aria-label="High Atlas Mountains Fast Facts">
        <div class="ai-summary-header">
          <span class="ai-summary-kicker">⚡ HIGH ATLAS MOUNTAINS AT A GLANCE (QUICK SUMMARY)</span>
          <span class="ai-summary-badge">Alpine Morocco</span>
        </div>
        <p class="ai-summary-text">
          The <strong>High Atlas Mountains</strong> form North Africa's highest mountain range, crowned by <strong>Mount Toubkal (4,167m)</strong>. Located just 60–90 minutes south of Marrakech, key access points include <strong>Imlil</strong> (the primary hiking and summit trailhead) and the lush <strong>Ourika Valley</strong> (famous for roadside glacial streams and Setti Fatma waterfalls). Roam Morocco arranges certified UIAGM Berber mountain guides, private 4x4 transport, and authentic family tea visits.
        </p>
      </aside>\n\n      `
  },

  'src/pages/destination-casablanca.astro': {
    target: '<div class="dest-layout-grid">',
    card: `      <!-- GEO & AEO Destination Fast Facts (BLUF) -->
    <aside class="ai-quick-summary-card" aria-label="Casablanca Travel Fast Facts">
      <div class="ai-summary-header">
        <span class="ai-summary-kicker">⚡ CASABLANCA AT A GLANCE (QUICK SUMMARY)</span>
        <span class="ai-summary-badge">Economic Gateway</span>
      </div>
      <p class="ai-summary-text">
        <strong>Casablanca</strong> is Morocco’s modern commercial powerhouse and principal transatlantic flight gateway (Mohammed V Airport - CMN). The city's crown jewel is the monumental <strong>Hassan II Mosque</strong>—one of the largest mosques in the world, built directly over the Atlantic Ocean with a 210-meter minaret. Recommended stay is <strong>1 day / 1 night</strong> before connecting directly to Marrakech (2h 45m) or Fes (3h 30m) via Roam Morocco’s private chauffeur transfers.
      </p>
    </aside>\n\n    `
  },

  'src/pages/destination-ait-benhaddou.astro': {
    target: '<div class="dest-layout-grid">',
    card: `      <!-- GEO & AEO Destination Fast Facts (BLUF) -->
      <aside class="ai-quick-summary-card" aria-label="Ait Benhaddou Fast Facts">
        <div class="ai-summary-header">
          <span class="ai-summary-kicker">⚡ AÏT BENHADDOU AT A GLANCE (QUICK SUMMARY)</span>
          <span class="ai-summary-badge">UNESCO World Heritage</span>
        </div>
        <p class="ai-summary-text">
          <strong>Aït Benhaddou</strong> is Morocco’s most iconic fortified earthen village (Ksar), recognized by UNESCO since 1987. Situated along the historic Ounila Valley caravan route 3.5 hours south of Marrakech via the Tizi n'Tichka pass, it has served as the living film set for <em>Gladiator</em>, <em>Game of Thrones</em>, and <em>Lawrence of Arabia</em>. Best explored on a private day excursion or as Night 1 of a multi-day private Sahara Desert expedition.
        </p>
      </aside>\n\n      `
  },

  'src/pages/destination-essaouira.astro': {
    target: '<div class="dest-layout-grid">',
    card: `      <!-- GEO & AEO Destination Fast Facts (BLUF) -->
      <aside class="ai-quick-summary-card" aria-label="Essaouira Travel Fast Facts">
        <div class="ai-summary-header">
          <span class="ai-summary-kicker">⚡ ESSAOUIRA AT A GLANCE (QUICK SUMMARY)</span>
          <span class="ai-summary-badge">Atlantic Coastal Haven</span>
        </div>
        <p class="ai-summary-text">
          <strong>Essaouira</strong> is an Atlantic coastal haven situated 175 km (2.5 hours) west of Marrakech. Famous for its breezy microclimate, 18th-century Portuguese sea ramparts (Sqala du Port), fresh harbor-side grilled seafood, and thuya wood artisan ateliers, it offers a tranquil retreat from the bustling Marrakech medina. Recommended stay is <strong>1 to 2 days</strong>, with flat-rate private chauffeur transfers from <strong>€105 to €120</strong> per vehicle.
        </p>
      </aside>\n\n      `
  }
};

let injectedCount = 0;
for (const [relPath, config] of Object.entries(blufCards)) {
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
    injectedCount++;
    console.log(`Injected BLUF card into: ${relPath}`);
  } else {
    console.warn(`Could not find target "${config.target}" in: ${relPath}`);
  }
}

console.log(`Finished injecting BLUF cards into ${injectedCount} pages!`);
