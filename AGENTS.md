# Roam Morocco Tours — AI Agent Guidelines & SEO System

## Project Overview
This repository contains the static production website for **Roam Morocco** ([https://roammorocco.tours/](https://roammorocco.tours/)), an inbound luxury & adventure travel agency based in Marrakech, Morocco.

### Business & SEO Context
- **Business Type:** Travel Agency / Tourism Services (Local & Inbound)
- **Target Audience:** English-speaking international travelers (US, UK, Canada, Australia, EU)
- **Primary Service Offerings:** Custom Morocco Private Tours, Sahara Desert Expeditions (Merzouga/Erg Chebbi), Imperial Cities, Atlas Mountains Trekking, Luxury Riads.
- **Top Competitors:** Authentic Morocco Tours, Morocco Explored, Desert Luxury Camp.
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
- Python scripts are located at `.agents/skills/claude-seo/scripts/`.
- Run commands using the existing Python environment:
  - `python .agents/skills/claude-seo/scripts/parse_html.py <file-or-url>`
  - `python .agents/skills/claude-seo/scripts/content_quality.py <file-or-url>`
  - `python .agents/skills/claude-seo/scripts/schema_generate.py <args>`
