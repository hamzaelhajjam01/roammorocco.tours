/**
 * Roam Morocco AI Trip Concierge & Lead Generator
 * Dual-Engine: High-ticket Morocco private tour leads (WhatsApp) + Worldwide Travel Deals (Travelpayouts)
 */

(function () {
  const WHATSAPP_NUMBER = "212653506441";
  
  // Trip State
  let tripState = {
    mode: null, // 'morocco' or 'worldwide'
    destinations: [],
    duration: '',
    style: '',
    group: '',
    worldDest: ''
  };

  // Inject HTML into DOM
  function initWidget() {
    if (document.getElementById('rm-concierge-root')) return;

    // Ensure trip-concierge.css is loaded dynamically if missing
    const isSub = window.location.pathname.includes('/blog/');
    const cssHref = isSub ? '../css/trip-concierge.css?v=20260928_plantrip' : 'css/trip-concierge.css?v=20260928_plantrip';
    if (!document.querySelector('link[href*="trip-concierge.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssHref;
      document.head.appendChild(link);
    }

    const root = document.createElement('div');
    root.id = 'rm-concierge-root';
    root.innerHTML = `
      <!-- Luxury Edge Tab: Plan a Trip Trigger (Pinned Right-Center) -->
      <button class="rm-concierge-trigger" id="rm-trigger-btn" type="button" aria-label="Plan a Trip" title="Plan a Trip">
        <span class="rm-trigger-label">Plan a Trip</span>
        <span class="rm-trigger-dot" aria-hidden="true"></span>
      </button>

      <!-- Chatbot Modal -->
      <div class="rm-concierge-modal" id="rm-modal" role="dialog" aria-hidden="true">
        <div class="rm-modal-header">
          <div class="rm-header-left">
            <div class="rm-trigger-avatar" style="width:30px; height:30px; border-radius:50%; background:rgba(200,164,92,0.12); border:1px solid rgba(200,164,92,0.4); display:flex; align-items:center; justify-content:center;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4b76a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                <circle cx="8.5" cy="12" r="1" fill="#d4b76a"></circle>
                <circle cx="12" cy="12" r="1" fill="#d4b76a"></circle>
                <circle cx="15.5" cy="12" r="1" fill="#d4b76a"></circle>
              </svg>
            </div>
            <div class="rm-header-info">
              <h4>ROAM AI CONCIERGE</h4>
              <p>Marrakech Operations</p>
            </div>
          </div>
          <button class="rm-close-btn" id="rm-close-btn" aria-label="Close Concierge">✕</button>
        </div>

        <div class="rm-chat-body" id="rm-chat-stream">
          <!-- Dynamic conversation content renders here -->
        </div>

        <div class="rm-chat-footer">
          <span>Official Roam Morocco Booking System</span>
          <button class="rm-reset-btn" id="rm-reset-btn">Start Over</button>
        </div>
      </div>
    `;

    document.body.appendChild(root);
    setupEvents();
    renderWelcome();
  }

  function setupEvents() {
    const triggerBtn = document.getElementById('rm-trigger-btn');
    const closeBtn = document.getElementById('rm-close-btn');
    const resetBtn = document.getElementById('rm-reset-btn');
    const modal = document.getElementById('rm-modal');

    function openModal() {
      if (!modal) return;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      if (triggerBtn) triggerBtn.classList.add('rm-hidden');
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      if (triggerBtn) triggerBtn.classList.remove('rm-hidden');
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Close on clicking outside modal
    document.addEventListener('click', (e) => {
      if (modal && modal.classList.contains('active') && !modal.contains(e.target) && triggerBtn && !triggerBtn.contains(e.target)) {
        closeModal();
      }
    });

    // Global hooks
    window.openTripConcierge = openModal;
    window.closeTripConcierge = closeModal;

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        tripState = { mode: null, destinations: [], duration: '', style: '', group: '', worldDest: '' };
        const stream = document.getElementById('rm-chat-stream');
        if (stream) stream.innerHTML = '';
        renderWelcome();
      });
    }
  }

  function addBotMessage(html) {
    const stream = document.getElementById('rm-chat-stream');
    const msg = document.createElement('div');
    msg.className = 'rm-bot-msg';
    msg.innerHTML = `
      <div class="rm-trigger-avatar" style="width:26px; height:26px; border-radius:50%; font-size:10px; font-weight:800; font-family:Helvetica,Arial,sans-serif; color:#d4b76a; background:rgba(200,164,92,0.12); border:1px solid rgba(200,164,92,0.35); display:flex; align-items:center; justify-content:center;">
        RM
      </div>
      <div class="rm-msg-bubble">${html}</div>
    `;
    stream.appendChild(msg);
    stream.scrollTop = stream.scrollHeight;
  }

  function addUserMessage(text) {
    const stream = document.getElementById('rm-chat-stream');
    const msg = document.createElement('div');
    msg.className = 'rm-user-msg';
    msg.innerHTML = `<div class="rm-msg-bubble">${text}</div>`;
    stream.appendChild(msg);
    stream.scrollTop = stream.scrollHeight;
  }

  // Step 1: Welcome & Path Selection
  function renderWelcome() {
    addBotMessage(`
      <strong>Marhaba & Welcome to Roam Morocco!</strong><br>
      I'm your 24/7 personal travel concierge. What would you like to plan today?
      <div class="rm-options-grid">
        <button class="rm-chip-btn primary" data-action="mode-morocco">
          <span><strong>Custom Morocco Tour</strong> (Private Driver & Concierge)</span>
          <span>→</span>
        </button>
        <button class="rm-chip-btn" data-action="mode-worldwide">
          <span><strong>Travel Deals & Flights</strong> (Global Routes & Airfare)</span>
          <span>→</span>
        </button>
      </div>
    `);

    attachActionHandlers();
  }

  // MOROCCO FLOW: Step 2: Destinations
  function renderMoroccoDestinations() {
    tripState.mode = 'morocco';
    addUserMessage("Plan a Custom Morocco Tour with Private Driver");
    setTimeout(() => {
      addBotMessage(`
        Which landscapes or circuits would you like to experience?
        <div class="rm-options-grid">
          <button class="rm-chip-btn" data-dest="Sahara Desert & Erg Chebbi Dunes">
            <span>Sahara Desert & Luxury Camp (Merzouga)</span>
          </button>
          <button class="rm-chip-btn" data-dest="Marrakech & Imperial Cities (Fes, Rabat)">
            <span>Imperial Cities (Marrakech, Fes, Rabat)</span>
          </button>
          <button class="rm-chip-btn" data-dest="High Atlas Mountains & Berber Villages">
            <span>High Atlas Mountains & Berber Valleys</span>
          </button>
          <button class="rm-chip-btn" data-dest="Chefchaouen Blue City & North">
            <span>Chefchaouen Blue City & Tangier</span>
          </button>
          <button class="rm-chip-btn primary" data-dest="Complete Grand Morocco Circuit">
            <span>Grand Morocco Circuit (Complete Route)</span>
          </button>
        </div>
      `);
      attachActionHandlers();
    }, 300);
  }

  // MOROCCO FLOW: Step 3: Duration
  function renderMoroccoDuration(selectedDest) {
    tripState.destinations = [selectedDest];
    addUserMessage(selectedDest);
    setTimeout(() => {
      addBotMessage(`
        Excellent choice. How many days are you planning for your Morocco journey?
        <div class="rm-options-grid">
          <button class="rm-chip-btn" data-dur="3 to 5 Days (Quick Highlight)">
            <span>3 to 5 Days (Short Gateway)</span>
          </button>
          <button class="rm-chip-btn primary" data-dur="7 to 10 Days (The Sweet Spot)">
            <span>7 to 10 Days (Recommended for Sahara)</span>
          </button>
          <button class="rm-chip-btn" data-dur="12 to 14+ Days (Grand Circuit)">
            <span>12 to 14+ Days (In-Depth Grand Tour)</span>
          </button>
        </div>
      `);
      attachActionHandlers();
    }, 300);
  }

  // MOROCCO FLOW: Step 4: Travel Style & Group
  function renderMoroccoStyle(selectedDur) {
    tripState.duration = selectedDur;
    addUserMessage(selectedDur);
    setTimeout(() => {
      addBotMessage(`
        Understood. What style of accommodation and travel do you prefer?
        <div class="rm-options-grid">
          <button class="rm-chip-btn primary" data-style="Luxury Riads & 5-Star Glamping">
            <span>Luxury Riads & 5-Star Desert Glamping</span>
          </button>
          <button class="rm-chip-btn" data-style="Authentic Boutique & Cultural">
            <span>Authentic Boutique & Historic Riads</span>
          </button>
          <button class="rm-chip-btn" data-style="Family-Friendly & Relaxed">
            <span>Family-Friendly & Relaxed Pace</span>
          </button>
          <button class="rm-chip-btn" data-style="Active Trekking & Adventure">
            <span>Active Trekking & Sahara Expedition</span>
          </button>
        </div>
      `);
      attachActionHandlers();
    }, 300);
  }

  // MOROCCO FLOW: Step 5: Group Size & Final WhatsApp Pitch
  function renderMoroccoFinal(selectedStyle) {
    tripState.style = selectedStyle;
    addUserMessage(selectedStyle);
    setTimeout(() => {
      // Build WhatsApp Pre-filled message
      const textMessage = `Salam Roam Morocco! I used your online trip planner:%0A%0A` +
        `• Destination: ${tripState.destinations[0]}%0A` +
        `• Duration: ${tripState.duration}%0A` +
        `• Style: ${tripState.style}%0A` +
        `• Transport: Private Air-Conditioned 4x4 with English-speaking Driver%0A%0A` +
        `Could you please send me a custom itinerary quote and availability?`;

      const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${textMessage}`;

      addBotMessage(`
        <strong>Your Tailored Morocco Journey is Ready!</strong>
        <p style="margin: 8px 0; font-size:12px; color:rgba(255,255,255,0.85);">
          ✅ Dedicated English-speaking driver in a luxury 4x4 Prado<br>
          ✅ Handpicked luxury riads & Sahara glamping<br>
          ✅ Flexible private itinerary with door-to-door pickup
        </p>

        <div class="rm-wa-card">
          <h5>Direct Local Guide Confirmation</h5>
          <p>Send your custom itinerary directly to our Marrakech headquarters on WhatsApp for an immediate quote.</p>
          <a href="${waLink}" target="_blank" rel="noopener" class="rm-wa-btn">
            <span>💬 Send Itinerary on WhatsApp (+212 653-506441)</span>
          </a>
        </div>

        <div class="rm-affiliate-card">
          <div class="rm-affiliate-title">✈️ Planning Your Flights & Connectivity?</div>
          <div class="rm-affiliate-links">
            <a href="https://roammorocco.tours/blog/cheap-flights-to-morocco.html" class="rm-aff-link" target="_blank">
              <span>✈️ Find Cheap Flights to Marrakech / Casablanca</span>
              <span>→</span>
            </a>
            <a href="https://roammorocco.tours/travel-deals.html#esim" class="rm-aff-link" target="_blank">
              <span>📱 Get Morocco High-Speed eSIM (Airalo)</span>
              <span>→</span>
            </a>
          </div>
        </div>
      `);
    }, 300);
  }

  // WORLDWIDE FLOW: Deals and Popular Hotspots
  function renderWorldwideDeals() {
    tripState.mode = 'worldwide';
    addUserMessage("🌍 Explore Worldwide Travel Deals & Partners");
    setTimeout(() => {
      addBotMessage(`
        Where in the world are you dreaming of traveling next? Choose a destination or travel tool to discover partner deals:
        <div class="rm-options-grid">
          <button class="rm-chip-btn" data-world="Dubai, UAE">
            <span>🇦🇪 <strong>Dubai, UAE</strong> (Luxury stays & desert safaris)</span>
          </button>
          <button class="rm-chip-btn" data-world="Paris, France">
            <span>🇫🇷 <strong>Paris, France</strong> (Boutique hotels & museum passes)</span>
          </button>
          <button class="rm-chip-btn" data-world="Bali, Indonesia">
            <span>🇮🇩 <strong>Bali, Indonesia</strong> (Private villas & island tours)</span>
          </button>
          <button class="rm-chip-btn" data-world="Rome, Italy">
            <span>🇮🇹 <strong>Rome, Italy</strong> (Vatican & Colosseum VIP tours)</span>
          </button>
          <button class="rm-chip-btn" data-world="Tokyo, Japan">
            <span>🇯🇵 <strong>Tokyo, Japan</strong> (Bullet trains & luxury hotels)</span>
          </button>
          <button class="rm-chip-btn primary" data-world="All Worldwide Deals Hub">
            <span>🎁 <strong>Browse All Travel Deals & Flight Tools</strong></span>
          </button>
        </div>
      `);
      attachActionHandlers();
    }, 300);
  }

  // WORLDWIDE FLOW: Specific City Cards
  function renderWorldwideCity(cityName) {
    addUserMessage(cityName);
    setTimeout(() => {
      if (cityName.includes("All Worldwide Deals Hub")) {
        window.location.href = "/travel-deals.html";
        return;
      }

      addBotMessage(`
        <strong>Top Curated Deals for ${cityName}:</strong>
        <p style="margin: 6px 0 10px; font-size:12px; color:rgba(255,255,255,0.7);">
          Powered by Roam Morocco global travel partners (best rate guarantees):
        </p>

        <div class="rm-affiliate-card">
          <div class="rm-affiliate-links">
            <a href="https://roammorocco.tours/travel-deals.html#flights" target="_blank" class="rm-aff-link">
              <span>✈️ Search Cheap Flights to ${cityName}</span>
              <span>Trip.com / Aviasales</span>
            </a>
            <a href="https://roammorocco.tours/travel-deals.html#hotels" target="_blank" class="rm-aff-link">
              <span>🏨 Best Hotel & Resort Deals in ${cityName}</span>
              <span>Booking.com</span>
            </a>
            <a href="https://roammorocco.tours/travel-deals.html#tours" target="_blank" class="rm-aff-link">
              <span>🎟️ Top Rated Day Tours & Attraction Tickets</span>
              <span>GetYourGuide</span>
            </a>
            <a href="https://roammorocco.tours/travel-deals.html#esim" target="_blank" class="rm-aff-link">
              <span>📱 Instant International Travel eSIM</span>
              <span>Airalo</span>
            </a>
          </div>
        </div>

        <div style="margin-top: 12px; text-align:center;">
          <a href="/travel-deals.html" class="rm-chip-btn primary" style="display:block; text-align:center;">
            View All Global Deals & Discounts →
          </a>
        </div>
      `);
    }, 300);
  }

  // Event dispatcher for buttons
  function attachActionHandlers() {
    const stream = document.getElementById('rm-chat-stream');
    const buttons = stream.querySelectorAll('button:not([data-bound])');

    buttons.forEach(btn => {
      btn.setAttribute('data-bound', 'true');
      btn.addEventListener('click', (e) => {
        const action = btn.getAttribute('data-action');
        const dest = btn.getAttribute('data-dest');
        const dur = btn.getAttribute('data-dur');
        const style = btn.getAttribute('data-style');
        const world = btn.getAttribute('data-world');

        if (action === 'mode-morocco') {
          renderMoroccoDestinations();
        } else if (action === 'mode-worldwide') {
          renderWorldwideDeals();
        } else if (dest) {
          renderMoroccoDuration(dest);
        } else if (dur) {
          renderMoroccoStyle(dur);
        } else if (style) {
          renderMoroccoFinal(style);
        } else if (world) {
          renderWorldwideCity(world);
        }
      });
    });
  }

  // Auto-wrap editorial tables in responsive scroll container
  function makeTablesScrollable() {
    document.querySelectorAll('.roam-article-body table, .roam-tour-main table, .article-content table, article table, main table').forEach(tbl => {
      if (!tbl.closest('.table-container') && !tbl.closest('.roam-table-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-container';
        tbl.parentNode.insertBefore(wrapper, tbl);
        wrapper.appendChild(tbl);
      }
    });
  }

  // Initialize on DOM load
  function boot() {
    initWidget();
    makeTablesScrollable();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
