import fs from 'node:fs';
import path from 'node:path';

const imagesToDownload = [
  {
    filename: 'spain-seville-plaza.jpg',
    url: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=1200&q=80',
    desc: 'Plaza de Espana in Seville Andalusia'
  },
  {
    filename: 'morocco-agafay-desert-camp.jpg',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    desc: 'Agafay desert rocky hills and luxury camp'
  },
  {
    filename: 'morocco-fes-chouara-tanneries.jpg',
    url: 'https://images.unsplash.com/photo-1548685913-fe6574346a23?auto=format&fit=crop&w=1200&q=80',
    desc: 'Chouara leather tanneries in Fes el-Bali'
  },
  {
    filename: 'morocco-sahara-dunes-sunset.jpg',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    desc: 'Golden sand dunes of Erg Chebbi Sahara'
  },
  {
    filename: 'morocco-marrakech-souk-lamps.jpg',
    url: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
    desc: 'Marrakech souk handcrafted brass lamps and spices'
  },
  {
    filename: 'morocco-tangier-medina-coast.jpg',
    url: 'https://images.unsplash.com/photo-1579033462043-0f12d4d98993?auto=format&fit=crop&w=1200&q=80',
    desc: 'Tangier kasbah and medina looking over Strait of Gibraltar'
  }
];

async function downloadAll() {
  for (const img of imagesToDownload) {
    const dest = path.join('public', 'images', img.filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log(`Already exists: ${img.filename}`);
      continue;
    }
    try {
      console.log(`Downloading ${img.desc}...`);
      const res = await fetch(img.url);
      if (!res.ok) {
        console.error(`Failed to download ${img.filename}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`✓ Saved ${img.filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error downloading ${img.filename}:`, err.message);
    }
  }
}

downloadAll();
