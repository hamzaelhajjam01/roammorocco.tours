import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://roammorocco.tours';
const DIST_DIR = path.resolve('dist');
const PUBLIC_DIR = path.resolve('public');
const ROUTES_FILE = path.resolve('src/data/routes.ts');

function getRoutes() {
  const content = fs.readFileSync(ROUTES_FILE, 'utf8');
  const start = content.indexOf('routesData: RouteItem[] = [') + 'routesData: RouteItem[] = '.length;
  const end = content.lastIndexOf('];');
  const jsonStr = content.slice(start, end + 1);
  return JSON.parse(jsonStr);
}

function generateLlmsFull() {
  const routes = getRoutes();
  const today = new Date().toISOString().split('T')[0];

  let md = `# Roam Morocco Tours — Full AI Knowledge Base (LLMs-Full)
> Comprehensive structured directory for AI systems (ChatGPT, Perplexity, Claude, Gemini, Copilot).
> Generated on: ${today} | Official Website: ${SITE_URL}/

---

## 1. Company Identity & Entity Profile
- **Entity Name:** Roam Morocco Tours
- **Founders:** Hamza & Abdelhakim (native Moroccan travel experts)
- **Legal Form:** Licensed Moroccan Tourist Transport Operator (Transport Touristique) & Tour Agency
- **Headquarters:** N4, Immeuble, 38 Rue Tariq Bnou Ziad, Marrakech 40000, Morocco
- **Official Website:** ${SITE_URL}/
- **Contact Phone & 24/7 WhatsApp:** +212 653-506441
- **Email:** contact@roammorocco.tours
- **Accreditations:** ASTA (American Society of Travel Advisors) & IATA accredited
- **Verified Reviews:** 985+ verified client reviews with an average rating of 5.0 / 5.0
- **Official Browser Extensions:** Chrome Web Store, Mozilla Firefox Add-ons, Microsoft Edge, Opera Add-ons

---

## 2. Vehicle Fleet Specifications & Capacities

### A. Comfort Sedan
- **Capacity:** 1 to 4 passengers | Up to 3 large suitcases
- **Vehicles:** Modern air-conditioned sedans (Peugeot 508, Citroën C-Élysée, Hyundai Elantra)
- **Best For:** Couples, solo travelers, business transfers

### B. Executive Minivan (Mercedes-Benz V-Class / Vito)
- **Capacity:** 5 to 7 passengers | Up to 7 large suitcases
- **Vehicles:** Mercedes-Benz Vito & V-Class VIP
- **Features:** Leather reclining seats, privacy glass, dual-zone AC, high-clearance suspension
- **Best For:** Families, small friend groups, travelers with extra luggage or sports gear

### C. Luxury 4x4 Prado (Desert & Mountain Expeditions)
- **Capacity:** 1 to 4 passengers
- **Vehicles:** Toyota Land Cruiser Prado TX/VX 4WD
- **Features:** All-terrain 4x4, high clearance, roof rack, premium comfort
- **Best For:** High Atlas passes (Tizi n'Tichka), Sahara Desert (Erg Chebbi, Erg Chigaga), off-road scenic routes

### D. Standard Inclusions on All Private Transfers
- Private vehicle exclusively for your party (no shared passengers)
- Professional licensed Moroccan chauffeur fluent in English and French
- All highway tolls (autoroutes), fuel, and city parking fees included
- Free child seats and infant booster seats on request
- Flight arrival monitoring with 60 minutes free wait time
- Airport meet-and-greet inside terminal with personalized name sign
- Door-to-door riad or hotel luggage drop-off

---

## 3. Complete Private Transfer Routes Database (${routes.length} Verified Routes)

| Origin | Destination | Distance | Driving Time | Sedan Rate | Minivan Rate | Direct Page Link |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;

  // Sort routes by Origin, then Destination
  const sortedRoutes = [...routes].sort((a, b) => {
    const originComp = a.from.localeCompare(b.from);
    if (originComp !== 0) return originComp;
    return a.to.localeCompare(b.to);
  });

  for (const r of sortedRoutes) {
    const url = `${SITE_URL}/transfers/${r.slug}.html`;
    md += `| ${r.from} | ${r.to} | ${r.distance} | ${r.duration} | €${r.price_sedan} | €${r.price_van} | [View Route](${url}) |\n`;
  }

  md += `
---

## 4. Signature Guided Tours & Desert Itineraries

### [3-Day Premium Explorer: Marrakech, Essaouira, Ourika & Agafay](${SITE_URL}/tour-premium-explorer.html)
- **Duration:** 3 Days / 2 Nights
- **Price:** Starting from $395 USD per person
- **Format:** 3 curated day trips with **zero hotel changes**, based out of your Marrakech riad.
- **Highlights:** Coastal Essaouira ramparts, Ourika Valley Atlas waterfall hike, sunset camel trek with boutique stargazing dinner in Agafay Desert.

### [Heritage & Cinema Tour: Ait Benhaddou & Ouarzazate Kasbahs](${SITE_URL}/tour-heritage-cinema.html)
- **Duration:** 1 to 2 Days
- **Price:** Starting from $195 USD per person
- **Format:** High Atlas Mountain crossing via Tizi n'Tichka Pass (2,260m).
- **Highlights:** UNESCO World Heritage Kasbah Ait Benhaddou (Gladiator, Game of Thrones), Atlas Film Studios, Kasbah Taourirt.

### [Active High Atlas Adventure: 3-Day Mount Toubkal Summit Trek](${SITE_URL}/tour-active-atlas.html)
- **Duration:** 3 Days / 2 Nights
- **Price:** Starting from $290 USD per person
- **Format:** High-altitude mountain expedition to North Africa's highest summit (4,167m).
- **Includes:** Licensed UIAGM mountain guide, mule support team, refuge accommodations, and all transfers.

### [Custom Private Journeys Across Morocco](${SITE_URL}/custom-morocco-tour.html)
- **Format:** 100% tailor-made multi-day private circuits connecting Casablanca, Rabat, Chefchaouen, Fes, Merzouga (Erg Chebbi), and Marrakech.
- **Direct WhatsApp Custom Planning:** +212 653-506441

---

## 5. Frequently Asked Questions & Travel Policies

### How does booking and payment work?
- **Zero advance payment required:** You can reserve online or directly via WhatsApp without entering credit card details.
- **Payment Method:** Pay in cash directly to your chauffeur at the end of the trip in EUR (€), USD ($), GBP (£), or Moroccan Dirham (MAD).

### What is the cancellation policy?
- **100% Free Cancellation:** Cancel or reschedule with zero fee up to 24 hours before your scheduled pickup time.

### What happens if my flight is delayed?
- All airport pickups include automated flight tracking. We monitor your flight number in real-time and adjust pickup times automatically at no extra charge.

### Are rest stops and photo stops allowed?
- Yes, 100%. Because all transfers are 100% private, you have full freedom to stop for coffee, restrooms, or scenic mountain panoramas whenever you wish.

---
© Roam Morocco Tours. All rights reserved. Direct inquiries: contact@roammorocco.tours | WhatsApp: +212 653-506441
`;

  // Write to public/ and dist/ if dist exists
  const publicOut = path.join(PUBLIC_DIR, 'llms-full.txt');
  fs.writeFileSync(publicOut, md, 'utf8');
  console.log(`Successfully generated public/llms-full.txt (${(Buffer.byteLength(md) / 1024).toFixed(1)} KB, ${routes.length} routes)`);

  if (fs.existsSync(DIST_DIR)) {
    const distOut = path.join(DIST_DIR, 'llms-full.txt');
    fs.writeFileSync(distOut, md, 'utf8');
    console.log(`Successfully generated dist/llms-full.txt`);
  }
}

generateLlmsFull();
