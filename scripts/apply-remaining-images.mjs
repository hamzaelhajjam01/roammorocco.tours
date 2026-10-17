import fs from 'node:fs';

// 1. Agafay hero image update
let agafay = fs.readFileSync('src/pages/blog/agafay-desert-vs-merzouga.astro', 'utf8');
agafay = agafay.replace(
  'src="/images/hero-desert.jpg" alt="Agafay Desert vs Merzouga Sahara Dunes comparison in Morocco"',
  'src="/images/morocco-agafay-desert-camp.jpg" alt="Luxury bohemian glamping tents perched on the arid rocky hills of the Agafay Desert near Marrakech Morocco"'
);
agafay = agafay.replace(
  'Two starkly different Moroccan landscapes: the undulating, arid mineral hills of the Agafay Desert near Marrakech and the 150-meter golden sand dunes of Erg Chebbi in Merzouga.',
  'The Agafay Desert: Just 45 minutes from Marrakech, a barren mineral wonderland of undulating white limestone ridges, heated infinity pools, and luxury nomad tents.'
);
fs.writeFileSync('src/pages/blog/agafay-desert-vs-merzouga.astro', agafay, 'utf8');
console.log('✓ Updated Agafay hero image');

// 2. Spain & Morocco Seville photo
let spain = fs.readFileSync('src/pages/blog/spain-morocco-itinerary.astro', 'utf8');
const sevilleTarget = '<h3>Seville: The Heart of Andalusia (Days 1–2)</h3>';
const sevilleFigure = `<figure class="featured-image-box" style="margin: 32px 0;">
        <img src="/images/spain-seville-plaza.jpg" alt="Plaza de Espana in Seville Spain with Moorish revival bridges and canal pavilions">
        <figcaption>The Spanish Chapter: Seville's majestic Plaza de España, celebrating the historic architectural kinship between Andalusia and Morocco.</figcaption>
      </figure>

      <h3>Seville: The Heart of Andalusia (Days 1–2)</h3>`;

if (!spain.includes('spain-seville-plaza.jpg') && spain.includes(sevilleTarget)) {
  spain = spain.replace(sevilleTarget, sevilleFigure);
  fs.writeFileSync('src/pages/blog/spain-morocco-itinerary.astro', spain, 'utf8');
  console.log('✓ Added Seville photo to Spain itinerary');
} else {
  console.log('Seville photo check: already present or target not found');
}
