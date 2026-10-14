import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://roammorocco.tours',
  build: {
    format: 'file' // Outputs exact .html files (e.g. index.html) matching current site
  }
});
