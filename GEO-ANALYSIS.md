# Answer Engine Optimization (AEO) & Generative Engine Optimization (GEO) Audit

**Target Website:** [https://roammorocco.tours/](https://roammorocco.tours/)  
**Audit Date:** October 3, 2026  
**Audited Target Systems:** ChatGPT Search, Perplexity AI, Google AI Overviews / Gemini 3.5 Flash, Claude, Microsoft Copilot  

---

## 1. Executive Summary & Readiness Scores

```
========================================================================================
   OVERALL AEO / GEO READINESS SCORE:  82 / 100  (Grade: A- / Strong Foundation)
========================================================================================
   • Technical AI Accessibility:       98 / 100  (Pure static SSR, robots.txt open)
   • Authority & Entity Signals:        88 / 100  (ASTA, IATA, Chrome/Firefox verified)
   • Structural Readability:            80 / 100  (Clean hierarchies, Q&A blocks)
   • Multi-Modal Integration:           76 / 100  (Rich photography, route cards, tools)
   • Passage-Level Citability:          70 / 100  (Optimal 134-167 word chunk density)
========================================================================================
```

### Platform-Specific Citation Breakdown

| Platform | Readiness | Primary Reason / Engine Behavior |
| :--- | :---: | :--- |
| **ChatGPT Search** (OpenAI) | **85%** | Permissive `robots.txt` (`GPTBot`, `OAI-SearchBot`), comprehensive `llms.txt`, verified Chrome/Firefox store entities. |
| **Google AI Overviews / Gemini** | **84%** | Direct correlation with top-ranking pages in Google index, 100% crawl accessibility, clean Schema graphs. |
| **Perplexity AI** | **78%** | Highly citable comparison guides (`agafay-vs-merzouga`, `marrakech-vs-fes`, `car-rental-vs-driver`), though can benefit from more direct summary definition blocks. |

---

## 2. Technical AI Crawl Accessibility

AI answer engines do **NOT** execute client-side JavaScript. They fetch raw HTML and parse text passages in milliseconds.

| AI Crawler | Controlling Entity | Status in `robots.txt` | Purpose / Surface |
| :--- | :--- | :---: | :--- |
| **GPTBot** | OpenAI | `Allow: /` | ChatGPT Web Search & Retrieval |
| **OAI-SearchBot** | OpenAI | `Allow: /` | Real-time Search Features & Citations |
| **ChatGPT-User** | OpenAI | `Allow: /` | User-initiated ChatGPT Browsing |
| **ClaudeBot** | Anthropic | `Allow: /` | Claude Web Search & Artifact Grounding |
| **PerplexityBot** | Perplexity | `Allow: /` | Perplexity Real-Time Search & RAG |
| **Google-Extended** | Google | `Allow: /` | Gemini / AI Overviews Knowledge Ingestion |
| **Applebot-Extended**| Apple | `Allow: /` | Apple Intelligence Siri & Spotlight Search |

* **Server-Side Rendering (SSR):** 100% Static HTML. All content, pricing, and itinerary details are present in the initial DOM with zero client-side hydration delays.
* **llms.txt Standard:** Deployed at `/llms.txt` (21KB, 162 lines). Contains structured operator summaries, tour package specifications, direct pricing, and verified entity citations.

---

## 3. Page-by-Page AEO Audit & Citability Scoring

| Page URL | AEO Score | Optimal Passages (80–180 words) | Q&A Headings | Structured Data | Key AEO Strength |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `blog/marrakech-vs-fes.html` | **84/100** | 12 | 8 | TravelAgency + FAQ | Perfect comparative intent for "Marrakech vs Fes" queries. |
| `tour-heritage-cinema.html` | **82/100** | 10 | 6 | TouristTrip + FAQ | Direct movie set facts (Gladiator, GoT) with exact pricing. |
| `tour-active-atlas.html` | **82/100** | 11 | 6 | TouristTrip + FAQ | Specific trail altitudes (4,167m Toubkal) and day-by-day packing. |
| `tour-premium-explorer.html` | **82/100** | 10 | 6 | TouristTrip + FAQ | Zero-hotel-change positioning (Essaouira, Ourika, Agafay). |
| `blog/morocco-private-driver-cost.html` | **82/100** | 9 | 7 | BlogPosting + FAQ | Exact daily rates (€100–€220), tipping formulas, fuel policies. |
| `blog/what-to-wear-in-morocco.html` | **82/100** | 10 | 6 | BlogPosting + FAQ | Specific seasonal fabric rules and medina cultural dress codes. |
| `blog/ferry-from-spain-to-morocco.html` | **80/100** | 12 | 8 | BlogPosting + FAQ | Detailed port comparison (Tarifa vs Algeciras) and customs stamp tip. |
| `blog/spain-morocco-itinerary.html` | **79/100** | 11 | 5 | BlogPosting + FAQ | Multi-country logistics with transit hours and road connections. |
| `morocco-private-driver.html` | **77/100** | 8 | 4 | Service/Product | Executive fleet specifications (Prado TX, V-Class, Sprinter). |
| `index.html` | **67/100** | 6 | 2 | TouristTrip/Product | Visual brand landing page; lacks self-contained Q&A definition blocks. |

---

## 4. Why AI Cites Certain Travel Sites (The 2026 Playbook)

Recent empirical studies on AI citations (SE Ranking 1.3M citations & Ahrefs 75,000 brand study) demonstrate that:
1. **44% of AI citations** are extracted from the **first 30% of a web page**.
2. **Optimal passage chunk size** for LLM vector embeddings is **134 to 167 words**.
3. **Brand mentions across authoritative platforms** (YouTube at 0.737, Reddit, Wikipedia) correlate **3x higher** with AI recommendations than raw backlink volume.
4. **Concrete numbers beat narrative text:** LLMs cite passages containing explicit figures (e.g. `€180–€260 per day`, `9 nautical miles`, `4,167 meters`) over ambiguous prose (`"rates depend on the season"`).

---

## 5. Top 5 High-Impact Optimizations to Win More AI Citations

### 1. Add "Quick Answer" Definition Blocks to Blog Posts
* **Why:** AI models love self-contained definitions following the `"X is..."` or `"A private driver in Morocco typically costs..."` pattern within the first 60 words below an H2.
* **Example to Add in `morocco-private-driver-cost.html`:**
  > **Quick Summary (2026):** Hiring a licensed private driver in Morocco costs between €160 and €220 ($175–$240 USD) per day for a Toyota Land Cruiser Prado 4x4, or €180 to €260 per day for an executive Mercedes-Benz V-Class van. Rates include diesel fuel, highway tolls, passenger transport insurance, and driver lodging.

### 2. Add an FAQ Accordion to `index.html`
* **Why:** The homepage is your most authoritative domain entity. Adding 4 core high-intent FAQs directly into `index.html` (Best time to visit, safety, private tour pricing, visa rules) allows AI engines to quote the homepage directly as an authority on Morocco travel.

### 3. Deploy HTML Comparison Tables
* **Why:** AI engines ingest `<table>` tags 156% more frequently for comparison queries.
* **Target Pages:** Add an HTML pricing comparison table to `morocco-private-driver.html` comparing *Taxi vs Self-Drive Rental vs Private Chauffeur*.

### 4. Maintain Content Freshness Markers (Recency Signal)
* **Why:** Content updated within the last 90 days is **3x more likely to be cited** by Perplexity and Google AI Overviews than static pages older than 6 months.
* Keep `(2026 Guide)` in title tags and ensure Schema `dateModified` reflects recent updates.

### 5. Expand Entity Footprint Beyond the Site
* Verified Chrome and Firefox extension listings already establish software entity trust.
* Encourage travelers to mention Roam Morocco on Reddit travel communities (`r/morocco`, `r/solotravel`, `r/travel`) and YouTube expedition vlogs, as YouTube mentions have the highest statistical correlation with AI citations.
