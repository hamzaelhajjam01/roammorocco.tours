/**
 * Roam Morocco — Reusable Tour CTA Box Component
 * Automatically initializes and renders high-contrast, high-converting booking callout cards.
 * Usage:
 *   <div class="roam-tour-cta-component" data-preset="sahara"></div>
 *   OR custom attributes: data-kicker, data-title, data-desc, data-btn-text, data-btn-url, data-wa-text
 */

(function () {
  const WHATSAPP_NUMBER = "212653506441";

  const PRESETS = {
    sahara: {
      kicker: "★ PRIVATE SAHARA EXPEDITIONS",
      title: "Ready to Design Your Bespoke Sahara Expedition?",
      desc: "Tell our local Marrakech team your travel dates, group size, and preferred luxury camp tier. We will craft a customized, transparent proposal with licensed Berber chauffeurs, modern 4x4 vehicles, and 24/7 concierge support.",
      btnText: "Create Custom Desert Tour →",
      btnUrl: "../custom-morocco-tour.html",
      waText: "Salam Roam Morocco! I'd like to customize a private Sahara itinerary."
    },
    driver: {
      kicker: "★ PRIVATE CHAUFFEUR & LOGISTICS",
      title: "Prefer Not to Drive in Morocco? Let Roam Morocco Chauffeur You",
      desc: "Avoid winding mountain passes, navigation stress, and medina parking. Explore the Kingdom with a licensed, English-speaking driver in a luxury air-conditioned 4x4 Prado or Mercedes van.",
      btnText: "Plan a Custom Private Tour →",
      btnUrl: "../custom-morocco-tour.html",
      waText: "Salam Roam Morocco! I'd like to hire a private driver in Morocco."
    },
    souk: {
      kicker: "★ INSIDER MEDINA CONCIERGE",
      title: "Experience Marrakech Souks with Trusted Local Culture Curators",
      desc: "Explore historic artisan workshops, decode authentic Berber carpets, and navigate the labyrinthine medinas with our licensed English-speaking local curators.",
      btnText: "Plan Your Custom Journey →",
      btnUrl: "../custom-morocco-tour.html",
      waText: "Salam Roam Morocco! I'd like to book a private cultural tour."
    },
    general: {
      kicker: "★ TAILORED PRIVATE EXPEDITIONS",
      title: "Ready to Plan Your Custom Morocco Journey?",
      desc: "Handcrafted private itineraries with dedicated English-speaking driver, handpicked boutique riads, Sahara luxury glamping, and door-to-door concierge care from Marrakech.",
      btnText: "Create Your Custom Tour →",
      btnUrl: "../custom-morocco-tour.html",
      waText: "Salam Roam Morocco! I'd like to plan a custom private tour."
    }
  };

  function renderCTA(el) {
    const isSub = window.location.pathname.includes('/blog/');
    const defaultUrl = isSub ? '../custom-morocco-tour.html' : 'custom-morocco-tour.html';

    const presetKey = el.getAttribute('data-preset') || 'general';
    const preset = PRESETS[presetKey] || PRESETS.general;

    const kicker = el.getAttribute('data-kicker') || preset.kicker;
    const title = el.getAttribute('data-title') || preset.title;
    const desc = el.getAttribute('data-desc') || preset.desc;
    const btnText = el.getAttribute('data-btn-text') || preset.btnText;
    const btnUrl = el.getAttribute('data-btn-url') || defaultUrl;
    const waMsg = el.getAttribute('data-wa-text') || preset.waText;
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;

    el.className = 'roam-tour-cta-box';
    el.innerHTML = `
      <span class="roam-tour-cta-kicker">${kicker}</span>
      <h3 class="roam-tour-cta-title">${title}</h3>
      <p class="roam-tour-cta-desc">${desc}</p>
      <div class="roam-tour-cta-actions">
        <a href="${btnUrl}" class="roam-btn-white">${btnText}</a>
        <a href="${waLink}" target="_blank" rel="noopener" class="roam-btn-wa">
          <img src="/img/whatsapp-logo.png" alt="WhatsApp" class="wa-btn-icon" width="20" height="20" style="vertical-align:middle; margin-right:8px;">
          Plan on WhatsApp
        </a>
      </div>
    `;

    // Apply defensive styling so it can NEVER be black-on-black or clipped
    el.style.setProperty('background', '#000000', 'important');
    el.style.setProperty('color', '#ffffff', 'important');
    el.style.setProperty('border', '1px solid rgba(200, 164, 92, 0.45)', 'important');
    el.style.setProperty('box-shadow', '0 16px 48px rgba(0, 0, 0, 0.35), 0 0 24px rgba(200, 164, 92, 0.12)', 'important');

    const h3 = el.querySelector('.roam-tour-cta-title');
    if (h3) {
      h3.style.setProperty('color', '#ffffff', 'important');
      h3.style.setProperty('font-family', "'Playfair Display', Georgia, serif", 'important');
    }

    const p = el.querySelector('.roam-tour-cta-desc');
    if (p) {
      p.style.setProperty('color', 'rgba(255, 255, 255, 0.85)', 'important');
    }
  }

  function initCTAComponents() {
    // 1. Target all declarative component elements
    const components = document.querySelectorAll('.roam-tour-cta-component');
    components.forEach(renderCTA);

    // 2. Also normalize any pre-existing static .roam-tour-cta-box elements
    const staticBoxes = document.querySelectorAll('.roam-tour-cta-box:not([data-rendered])');
    staticBoxes.forEach(box => {
      box.setAttribute('data-rendered', 'true');
      box.style.setProperty('background', '#000000', 'important');
      box.style.setProperty('color', '#ffffff', 'important');
      box.style.setProperty('border', '1px solid rgba(200, 164, 92, 0.45)', 'important');
      box.style.setProperty('box-shadow', '0 16px 48px rgba(0, 0, 0, 0.35), 0 0 24px rgba(200, 164, 92, 0.12)', 'important');

      // Ensure kicker exists
      if (!box.querySelector('.roam-tour-cta-kicker')) {
        const kicker = document.createElement('span');
        kicker.className = 'roam-tour-cta-kicker';
        kicker.textContent = '★ PRIVATE EXPEDITIONS & CHAUFFEURED TOURS';
        box.insertBefore(kicker, box.firstChild);
      }

      // Ensure title is white
      const title = box.querySelector('.roam-tour-cta-title') || box.querySelector('h3') || box.querySelector('h4');
      if (title) {
        title.className = 'roam-tour-cta-title';
        title.style.setProperty('color', '#ffffff', 'important');
        title.style.setProperty('font-family', "'Playfair Display', Georgia, serif", 'important');
        title.style.setProperty('text-transform', 'none', 'important');
      }

      // Ensure description is high-contrast white
      const desc = box.querySelector('.roam-tour-cta-desc') || box.querySelector('p');
      if (desc) {
        desc.className = 'roam-tour-cta-desc';
        desc.style.setProperty('color', 'rgba(255, 255, 255, 0.85)', 'important');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCTAComponents);
  } else {
    initCTAComponents();
  }
})();
