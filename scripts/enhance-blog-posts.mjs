import fs from 'node:fs';
import path from 'node:path';

// ── 1. STRIP DESTRUCTIVE border-radius: 0 OVERRIDES ──
const filesWithZeroRadius = [
  'src/pages/blog/bali-travel-guide.astro',
  'src/pages/blog/dubai-travel-guide.astro',
  'src/pages/blog/ferry-from-spain-to-morocco.astro',
  'src/pages/blog/istanbul-travel-guide.astro',
  'src/pages/blog/paris-travel-guide.astro',
  'src/pages/blog/sahara-desert-tour-merzouga-vs-zagora.astro',
  'src/pages/blog/tokyo-travel-guide.astro'
];

for (const rel of filesWithZeroRadius) {
  const filePath = path.resolve(rel);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = /article,\s*\.roam-day-card,\s*\.roam-tour-cta-box,\s*\.roam-callout-ai,\s*\.table-container,\s*table,\s*th,\s*td,\s*figure,\s*img,\s*\.roam-area-card\s*\{\s*border-radius:\s*0\s*!important;\s*\}/g;
    if (regex.test(content)) {
      content = content.replace(regex, `/* Luxury rounded corners system active */`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Stripped border-radius: 0 from ${rel}`);
    } else {
      // General replacement of any remaining border-radius: 0 !important
      const altRegex = /border-radius:\s*0\s*!important;/g;
      if (altRegex.test(content)) {
        content = content.replace(altRegex, 'border-radius: 16px;');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Upgraded border-radius in ${rel}`);
      }
    }
  }
}

// ── 2. FIX DUPLICATE IN best-time-to-visit-sahara-morocco.astro ──
const saharaBestTimePath = path.resolve('src/pages/blog/best-time-to-visit-sahara-morocco.astro');
if (fs.existsSync(saharaBestTimePath)) {
  let content = fs.readFileSync(saharaBestTimePath, 'utf8');
  const targetOld = `<img src="/images/sahara_camp.webp" alt="Traditional Berber luxury desert camp with evening campfire, wool nomad tents, and lanterns in Erg Chebbi dunes at twilight" class="roam-article-hero-img" />`;
  const replacementNew = `<img src="/images/morocco-sahara-dunes-sunset.jpg" alt="Spectacular golden sunset casting long shadows across the razor-sharp sand ridges of Erg Chebbi dunes in Merzouga Morocco" class="roam-article-hero-img" style="border-radius: 16px; width: 100%; height: auto; max-height: 480px; object-fit: cover;" />`;
  if (content.includes(targetOld)) {
    content = content.replace(targetOld, replacementNew);
    content = content.replace('A luxury camp setup provides comfort no matter the season.', 'Golden hour cresting across the vast dunes of Erg Chebbi during the peak autumn safari window.');
    fs.writeFileSync(saharaBestTimePath, content, 'utf8');
    console.log(`✓ Fixed duplicated image in best-time-to-visit-sahara-morocco.astro`);
  }
}

// ── 3. UPDATE agafay-desert-vs-merzouga.astro WITH DISTINCT IMAGES ──
const agafayPath = path.resolve('src/pages/blog/agafay-desert-vs-merzouga.astro');
if (fs.existsSync(agafayPath)) {
  let content = fs.readFileSync(agafayPath, 'utf8');
  // Update hero to genuine Agafay camp image
  content = content.replace(
    `<img src="/images/hero-desert.jpg" alt="Agafay Desert vs Merzouga Sahara Dunes comparison in Morocco">`,
    `<img src="/images/morocco-agafay-desert-camp.jpg" alt="Luxury bohemian glamping tents perched on the arid rocky hills of the Agafay Desert near Marrakech Morocco">`
  );
  content = content.replace(
    `<figcaption>Two starkly different Moroccan landscapes: the undulating, arid mineral hills of the Agafay Desert near Marrakech and the 150-meter golden sand dunes of Erg Chebbi in Merzouga.</figcaption>`,
    `<figcaption>The Agafay Desert: Just 45 minutes from Marrakech, a barren mineral wonderland of undulating white limestone ridges, heated infinity pools, and luxury nomad tents.</figcaption>`
  );

  // Add inline Merzouga dunes figure before Section 3
  const section3Marker = `<h2>3. Agafay Desert: The Fast, Chic Desert Fix</h2>`;
  if (!content.includes('morocco-sahara-dunes-sunset.jpg') && content.includes(section3Marker)) {
    const merzougaFigure = `
      <figure class="featured-image-box" style="margin: 36px 0;">
        <img src="/images/morocco-sahara-dunes-sunset.jpg" alt="150-meter golden sand sea dunes of Erg Chebbi in Merzouga Moroccan Sahara Desert">
        <figcaption>The True Sahara: Erg Chebbi dunes in Merzouga, rising 150 meters high with orange-gold sand seas stretching toward the horizon.</figcaption>
      </figure>

      `;
    content = content.replace(section3Marker, merzougaFigure + section3Marker);
    fs.writeFileSync(agafayPath, content, 'utf8');
    console.log(`✓ Enhanced agafay-desert-vs-merzouga.astro with distinct Agafay and Merzouga photos`);
  }
}

// ── 4. ENRICH spain-morocco-itinerary.astro WITH JOURNEY VISUALS ──
const spainPath = path.resolve('src/pages/blog/spain-morocco-itinerary.astro');
if (fs.existsSync(spainPath)) {
  let content = fs.readFileSync(spainPath, 'utf8');

  // Insert Seville photo in Spanish Chapter
  const markerSpain = `<h3>Day 2: Seville's Moorish Alcazar & Santa Cruz</h3>`;
  if (!content.includes('spain-seville-plaza.jpg') && content.includes(markerSpain)) {
    const sevilleFigure = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/spain-seville-plaza.jpg" alt="Plaza de Espana in Seville Spain with Moorish revival bridges and canal pavilions">
        <figcaption>The Spanish Chapter: Seville's majestic Plaza de España, celebrating the historic architectural kinship between Andalusia and Morocco.</figcaption>
      </figure>

      `;
    content = content.replace(markerSpain, sevilleFigure + markerSpain);
  }

  // Insert Strait of Gibraltar ferry photo in Strait Chapter
  const markerFerry = `<h2>Part 2: Crossing the Strait of Gibraltar (Day 5 to 6)</h2>`;
  if (!content.includes('spain-morocco-ferry-hero.jpg') && content.includes(markerFerry)) {
    const ferryFigure = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/spain-morocco-ferry-hero.jpg" alt="High speed catamaran ferry crossing the Strait of Gibraltar from Tarifa Spain to Tangier Ville port Morocco">
        <figcaption>Crossing the Strait: 60-minute fast catamaran passage from Tarifa directly into Tangier Ville historic port.</figcaption>
      </figure>

      `;
    content = content.replace(markerFerry, markerFerry + ferryFigure);
  }

  // Insert Sahara sunset photo in Desert Chapter
  const markerSahara = `<h3>Days 9-10: Erg Chebbi Sahara Desert Glamping</h3>`;
  if (!content.includes('morocco-sahara-dunes-sunset.jpg') && content.includes(markerSahara)) {
    const saharaFigure = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/morocco-sahara-dunes-sunset.jpg" alt="Golden sand dunes and camel trekking in Erg Chebbi Merzouga Morocco">
        <figcaption>The Deep Sahara: Camel trekking across the amber ridges of Erg Chebbi to your private luxury Berber camp.</figcaption>
      </figure>

      `;
    content = content.replace(markerSahara, saharaFigure + markerSahara);
  }

  fs.writeFileSync(spainPath, content, 'utf8');
  console.log(`✓ Enhanced spain-morocco-itinerary.astro with Seville, Strait ferry, and Sahara visuals`);
}

// ── 5. ENRICH morocco-10-day-itinerary.astro WITH SCENIC STOPS ──
const tenDayPath = path.resolve('src/pages/blog/morocco-10-day-itinerary.astro');
if (fs.existsSync(tenDayPath)) {
  let content = fs.readFileSync(tenDayPath, 'utf8');

  // Insert High Atlas image on Day 3
  const markerDay3 = `<h2>Day 3: The High Atlas Mountains & Tizi n'Tichka Pass</h2>`;
  if (!content.includes('wall-atlas.jpg') && content.includes(markerDay3)) {
    const atlasFigure = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/wall-atlas.jpg" alt="High Atlas Mountains serpentine road and Berber stone villages along Tizi n'Tichka pass in Morocco">
        <figcaption>High Atlas Mountains: Ascending the sweeping 2,260m Tizi n'Tichka pass toward southern Morocco.</figcaption>
      </figure>

      `;
    content = content.replace(markerDay3, markerDay3 + atlasFigure);
  }

  // Insert Ait Benhaddou on Day 4
  const markerDay4 = `<h2>Day 4: Ait Benhaddou & The Thousand Kasbahs</h2>`;
  if (!content.includes('tour_cinema_ait_benhaddou.jpg') && content.includes(markerDay4)) {
    const aitFigure = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/tour_cinema_ait_benhaddou.jpg" alt="UNESCO World Heritage earthen Ksar of Ait Benhaddou fortress in Morocco">
        <figcaption>UNESCO World Heritage: The ancient clay ksar of Aït Benhaddou, setting of Gladiator and Game of Thrones.</figcaption>
      </figure>

      `;
    content = content.replace(markerDay4, markerDay4 + aitFigure);
  }

  // Insert Fes architecture on Day 8
  const markerDay8 = `<h2>Days 8-9: Arriving in Fes & The Medieval Medina</h2>`;
  if (!content.includes('morocco-fes-medina-architecture.jpg') && content.includes(markerDay8)) {
    const fesFigure = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/morocco-fes-medina-architecture.jpg" alt="Ornate Islamic zellige tilework and carved cedarwood in historic Fes el-Bali medina">
        <figcaption>Fes el-Bali: The world's largest car-free medieval urban district, adorned in centuries-old zellige mosaic craftsmanship.</figcaption>
      </figure>

      `;
    content = content.replace(markerDay8, markerDay8 + fesFigure);
  }

  fs.writeFileSync(tenDayPath, content, 'utf8');
  console.log(`✓ Enhanced morocco-10-day-itinerary.astro with High Atlas, Ait Benhaddou, and Fes photos`);
}

// ── 6. ENRICH marrakech-vs-fes.astro WITH DISTINCT PHOTOS ──
const mvsfPath = path.resolve('src/pages/blog/marrakech-vs-fes.astro');
if (fs.existsSync(mvsfPath)) {
  let content = fs.readFileSync(mvsfPath, 'utf8');
  const fesSection = `<h2>Fes: The Timeless Medieval Sanctuary</h2>`;
  if (!content.includes('morocco-fes-medina-architecture.jpg') && content.includes(fesSection)) {
    const fesFig = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/morocco-fes-medina-architecture.jpg" alt="Intricate carved plaster and geometric zellige tiles in historic Fes madrasa">
        <figcaption>Fes: An ancient imperial world of academic contemplation, spiritual centers, and artisanal guilds.</figcaption>
      </figure>

      `;
    content = content.replace(fesSection, fesSection + fesFig);
  }

  const mrkSection = `<h2>Marrakech: The Vibrant Ochre Oasis</h2>`;
  if (!content.includes('morocco-marrakech-souk-lamps.jpg') && content.includes(mrkSection)) {
    const mrkFig = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/morocco-marrakech-souk-lamps.jpg" alt="Vibrant Marrakech souk filled with handcrafted brass lanterns and aromatic spice pyramids">
        <figcaption>Marrakech: Sensory excitement, bustling spice souks, and illuminated evening medina alleys.</figcaption>
      </figure>

      `;
    content = content.replace(mrkSection, mrkSection + mrkFig);
  }

  fs.writeFileSync(mvsfPath, content, 'utf8');
  console.log(`✓ Enhanced marrakech-vs-fes.astro with separate Fes and Marrakech photos`);
}

// ── 7. ENRICH is-morocco-safe-for-tourists.astro ──
const safePath = path.resolve('src/pages/blog/is-morocco-safe-for-tourists.astro');
if (fs.existsSync(safePath)) {
  let content = fs.readFileSync(safePath, 'utf8');
  const riadSection = `<h2>4. Accommodations: Riads vs Modern Hotels</h2>`;
  if (!content.includes('morocco-luxury-riad-pool.jpg') && content.includes(riadSection)) {
    const riadFig = `
      <figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/morocco-luxury-riad-pool.jpg" alt="Private tranquil courtyard riad with emerald mosaic plunge pool and orange trees in Morocco">
        <figcaption>Moroccan Hospitality: Traditional enclosed riads offer total security, serene tranquility, and 24/7 attentive hosts.</figcaption>
      </figure>

      `;
    content = content.replace(riadSection, riadSection + riadFig);
    fs.writeFileSync(safePath, content, 'utf8');
    console.log(`✓ Enhanced is-morocco-safe-for-tourists.astro with riad hospitality photo`);
  }
}
