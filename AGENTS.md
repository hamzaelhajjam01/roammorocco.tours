# Roam Morocco Tours — AI Agent Guidelines & SEO System

## Project Overview
This repository contains the static production website for **Roam Morocco** ([https://roammorocco.tours/](https://roammorocco.tours/)), an inbound luxury & adventure travel agency based in Marrakech, Morocco.

### Business & SEO Context
- **Business Type:** Travel Agency / Tourism Services (Local & Inbound)
- **Target Audience:** English-speaking international travelers (US, UK, Canada, Australia, EU)
- **Primary Service Offerings:** Custom Morocco Private Tours, Sahara Desert Expeditions (Merzouga/Erg Chebbi), Imperial Cities, Atlas Mountains Trekking, Luxury Riads.
- **Top Competitors:** Authentic Morocco (authentic-morocco.com), Sun Trails (sun-trails.com), Travel Exploration (travel-exploration.com), Mint Tea Tours (mintteatours.com), Desert Luxury Camp (desertluxurycamp.com).
- **Key Landing Pages:**
  - `index.html` — Homepage
  - `tour-active-atlas.html`, `tour-heritage-cinema.html`, `tour-premium-explorer.html` — Signature tour packages
  - `destinations.html`, `experiences.html`, `about.html`, `blog.html`
  - `blog/*.html` — High-intent travel guides (packing, best time for Sahara, safety, Marrakech vs Fes)
  - `llms.txt` — AI Search context and site summary
  - `sitemap.xml`, `robots.txt`

---

## 🛠️ Integrated SEO Skill Suite (`claude-seo` adapted for Antigravity)

The repository is equipped with 25 specialized SEO skills in `.agents/skills/` and 50 Python automation scripts in `.agents/skills/claude-seo/scripts/`.

### Available Capabilities & Commands:
1. **Full SEO Audit**: 
   - Ask: *"Run a full SEO audit on the website"* or *"Audit index.html"*
   - Analyzes technical health, crawlability, mobile responsiveness, schema, and content quality.
2. **Technical SEO**:
   - Ask: *"Perform a technical SEO check"*
   - Evaluates `robots.txt`, `sitemap.xml`, canonical URLs, meta tags, and Core Web Vitals.
3. **Structured Data & Schema.org**:
   - Ask: *"Audit or generate Schema markup"*
   - Validates & generates JSON-LD for `TravelAgency`, `TouristTrip`, `Offer`, `Review`, and `FAQPage`.
4. **Content Quality & E-E-A-T**:
   - Ask: *"Analyze content quality and E-E-A-T"*
   - Checks keyword density, depth, authoritativeness, and trust factors.
5. **AI Search Optimization (GEO)**:
   - Ask: *"Optimize for AI Search (GEO)"*
   - Verifies citability for ChatGPT, Perplexity, and Gemini, optimizing `llms.txt` and semantic entities.
6. **Local SEO & Maps**:
   - Ask: *"Check Local SEO and Marrakech signals"*
   - NAP consistency, local Schema, and tourism-specific location attributes.

### Execution Guidelines
- Python scripts are located at `.agents/skills/claude-seo/scripts/` and `scripts/`.
- Run commands using the existing Python environment:
  - `python .agents/skills/claude-seo/scripts/parse_html.py <file-or-url>`
  - `python .agents/skills/claude-seo/scripts/content_quality.py <file-or-url>`
  - `python .agents/skills/claude-seo/scripts/schema_generate.py <args>`

---

## 📸 Automated Image Curation Policy (Pexels API)
For all current and future blog posts, guides, and landing pages:
1. **Mandatory Sourcing via Pexels Pipeline:** Whenever a new blog post or landing page is created or expanded, use `scripts/pexels-curator.py` to search and curate high-resolution visuals.
2. **Brand Visual Standard:** Always apply the Roam Morocco luxury warm-gold filter (`#C8A45C` desert warmth) by default to maintain visual cohesion across third-party photography.
3. **Responsive WebP Sets:** Always generate responsive variants (`1200w`, `800w`, `400w`) with WebP compression (target < 120KB) to ensure perfect Core Web Vitals (LCP) and zero layout shift.
4. **Metadata & Entity Signals:** All images must have kebab-case descriptive filenames, descriptive contextual alt text, and embedded EXIF copyright/attribution metadata.
5. **Markup Standard:** Use `<picture>` with `type="image/webp"`, responsive `srcset`, `sizes`, explicit `width` and `height`, `loading="lazy"`, and `decoding="async"`.

