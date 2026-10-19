# RoamMorocco — Workspace Rules

## Project Overview
This workspace contains the static website for **RoamMorocco** (https://roammorocco.tours/), a premier Morocco travel agency based in Marrakech.

### Business Type
- **Category:** Local Service / Tourism / Travel Agency
- **Industry:** Travel & Tourism
- **Target Market:** International tourists (US, UK, Canada, Australia, Europe)
- **Location:** Marrakech, Morocco

### Tech Stack
- Static HTML/CSS/JS (Vite build output)
- Hosted at: https://roammorocco.tours/

### Key Files
- `index.html` — Main landing page with Schema.org markup and meta tags
- `llms.txt` — AI-readable site summary (exists)
- `robots.txt` — Crawler rules
- `sitemap.xml` — XML sitemap
- `privacy-policy.html`, `terms-conditions.html`, `refund-policy.html`, `travel-policy.html` — Policy pages

### SEO Context
- Schema: TravelAgency + FAQPage JSON-LD implemented
- 985 reviews at 5.0 rating (aggregateRating)
- Canonical URL set to https://roammorocco.tours/
- OG + Twitter cards implemented
- Primary keywords: Morocco tours, Sahara desert tours, Marrakech tours

### Image & Media Standard (Pexels API Automation)
- Script: `scripts/pexels-curator.py`
- All blog posts and landing pages must use WebP responsive sets (`1200w`, `800w`, `400w`) with warm-gold luxury filter applied.
- All new blog generation must invoke `scripts/pexels-curator.py` to source, brand-grade, and embed responsive `<picture>` tags.
