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
    const cssHref = isSub ? '../css/trip-concierge.css?v=20261011_modern' : 'css/trip-concierge.css?v=20261011_modern';
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
      <div class="rm-concierge-modal" id="rm-modal" role="dialog" aria-hidden="true" aria-label="Roam Morocco Concierge">
        <div class="rm-modal-header">
          <div class="rm-header-left">
            <div class="rm-avatar-wrapper">
              <div class="rm-avatar-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <span class="rm-online-indicator" title="Marrakech Specialists Online"></span>
            </div>
            <div class="rm-header-info">
              <h4>Roam Concierge</h4>
              <p><span class="rm-header-status-dot"></span> Marrakech Travel Desk • Online</p>
            </div>
          </div>
          <button class="rm-close-btn" id="rm-close-btn" aria-label="Close Concierge" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="rm-chat-body" id="rm-chat-stream">
          <!-- Dynamic conversation content renders here -->
        </div>

        <div class="rm-chat-footer">
          <div class="rm-footer-security">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
            <span>Verified Roam Morocco Desk</span>
          </div>
          <button class="rm-reset-btn" id="rm-reset-btn" type="button" aria-label="Start conversation over">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            <span>Start Over</span>
          </button>
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
    if (!stream) return;
    const msg = document.createElement('div');
    msg.className = 'rm-bot-msg';
    msg.innerHTML = `
      <div class="rm-bot-avatar-mini" aria-hidden="true">RM</div>
      <div class="rm-msg-bubble">${html}</div>
    `;
    stream.appendChild(msg);
    stream.scrollTop = stream.scrollHeight;
  }

  function addUserMessage(text) {
    const stream = document.getElementById('rm-chat-stream');
    if (!stream) return;
    const msg = document.createElement('div');
    msg.className = 'rm-user-msg';
    msg.innerHTML = `<div class="rm-msg-bubble">${text}</div>`;
    stream.appendChild(msg);
    stream.scrollTop = stream.scrollHeight;
  }

  // Step 1: Welcome & Path Selection
  function renderWelcome() {
    addBotMessage(`
      <div class="rm-bubble-tag">✨ Marhaba • Private Concierge</div>
      <div class="rm-bubble-title">Welcome to Roam Morocco</div>
      <div class="rm-bubble-desc">I am your 24/7 personal travel advisor. How would you like to begin your journey?</div>
      
      <div class="rm-options-grid">
        <button class="rm-choice-card primary" data-action="mode-morocco" type="button">
          <div class="rm-card-icon-wrap" aria-hidden="true">🐪</div>
          <div class="rm-card-content">
            <div class="rm-card-title">Custom Morocco Private Tour</div>
            <div class="rm-card-desc">Private 4x4 driver, Sahara glamping & tailor-made route</div>
          </div>
          <div class="rm-card-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </button>

        <button class="rm-choice-card" data-action="mode-worldwide" type="button">
          <div class="rm-card-icon-wrap" aria-hidden="true">✈️</div>
          <div class="rm-card-content">
            <div class="rm-card-title">Flights & Global Travel Deals</div>
            <div class="rm-card-desc">Compare airfare, boutique hotels & instant eSIMs</div>
          </div>
          <div class="rm-card-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
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
        <div class="rm-bubble-title">Which circuits would you like to explore?</div>
        <div class="rm-bubble-desc">Select a region to customize with our local Marrakech team:</div>
        <div class="rm-options-grid">
          <button class="rm-choice-pill highlight" data-dest="Sahara Desert & Erg Chebbi Luxury Camp" type="button">
            <span class="rm-pill-text"><span>🐪</span> <span>Sahara Desert & Luxury Glamping (Merzouga)</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-dest="Imperial Cities (Marrakech, Fes & Rabat)" type="button">
            <span class="rm-pill-text"><span>🏰</span> <span>Imperial Cities (Marrakech, Fes & Rabat)</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-dest="High Atlas Mountains & Berber Valleys" type="button">
            <span class="rm-pill-text"><span>🏔️</span> <span>High Atlas Mountains & Berber Valleys</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-dest="Chefchaouen Blue City & Tangier Coast" type="button">
            <span class="rm-pill-text"><span>💙</span> <span>Chefchaouen Blue City & Tangier Coast</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill highlight" data-dest="Grand Morocco Complete Circuit" type="button">
            <span class="rm-pill-text"><span>⭐</span> <span>Grand Morocco Complete Circuit (All Highlights)</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
        </div>
      `);
      attachActionHandlers();
    }, 280);
  }

  // MOROCCO FLOW: Step 3: Duration
  function renderMoroccoDuration(selectedDest) {
    tripState.destinations = [selectedDest];
    addUserMessage(selectedDest);
    setTimeout(() => {
      addBotMessage(`
        <div class="rm-bubble-title">How many days are you planning?</div>
        <div class="rm-bubble-desc">Every itinerary is completely flexible and tailored to your travel dates:</div>
        <div class="rm-options-grid">
          <button class="rm-choice-pill" data-dur="3 to 5 Days (Short Gateway)" type="button">
            <span class="rm-pill-text"><span>⏱️</span> <span>3 to 5 Days • Short Highlight Getaway</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill highlight" data-dur="7 to 10 Days (The Sweet Spot)" type="button">
            <span class="rm-pill-text"><span>⭐</span> <span>7 to 10 Days • Classic Sahara & Cities (Recommended)</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-dur="12 to 14+ Days (Grand Circuit)" type="button">
            <span class="rm-pill-text"><span>👑</span> <span>12 to 14+ Days • In-Depth Grand Tour</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
        </div>
      `);
      attachActionHandlers();
    }, 280);
  }

  // MOROCCO FLOW: Step 4: Travel Style & Group
  function renderMoroccoStyle(selectedDur) {
    tripState.duration = selectedDur;
    addUserMessage(selectedDur);
    setTimeout(() => {
      addBotMessage(`
        <div class="rm-bubble-title">What travel style suits you best?</div>
        <div class="rm-bubble-desc">We handpick every property to match your comfort preferences:</div>
        <div class="rm-options-grid">
          <button class="rm-choice-pill highlight" data-style="Luxury Riads & 5-Star Glamping" type="button">
            <span class="rm-pill-text"><span>💎</span> <span>Luxury Riads & 5-Star Desert Glamping</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-style="Authentic Boutique & Cultural Riads" type="button">
            <span class="rm-pill-text"><span>🏛️</span> <span>Authentic Boutique & Historic Riads</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-style="Family-Friendly & Relaxed Pace" type="button">
            <span class="rm-pill-text"><span>👨‍👩‍👧</span> <span>Family-Friendly & Relaxed Pace</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-style="Active Trekking & Sahara Expedition" type="button">
            <span class="rm-pill-text"><span>🥾</span> <span>Active Trekking & Sahara Expedition</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
        </div>
      `);
      attachActionHandlers();
    }, 280);
  }

  // MOROCCO FLOW: Step 5: Final WhatsApp Lead Conversion
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
        <div class="rm-bubble-tag">🎉 Itinerary Draft Ready</div>
        <div class="rm-bubble-title">Your Custom Journey Overview</div>
        
        <div class="rm-recap-box">
          <div class="rm-recap-title">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Selected Preferences
          </div>
          <div class="rm-recap-tags">
            <span class="rm-recap-tag">📍 ${tripState.destinations[0]}</span>
            <span class="rm-recap-tag">⏱️ ${tripState.duration}</span>
            <span class="rm-recap-tag">✨ ${tripState.style}</span>
            <span class="rm-recap-tag">🚗 Private 4x4 & Driver</span>
          </div>
        </div>

        <div class="rm-wa-card">
          <span class="rm-wa-badge">● Marrakech Local Desk Online</span>
          <p>Send your custom itinerary draft directly to our Marrakech headquarters for a fast, tailored quote with transparent pricing.</p>
          <a href="${waLink}" target="_blank" rel="noopener" class="rm-wa-btn">
            <img src="${window.location.pathname.includes('/blog/') ? '../img/whatsapp-logo.png' : 'img/whatsapp-logo.png'}" alt="WhatsApp" class="wa-btn-icon" width="20" height="20" style="vertical-align:middle; margin-right:8px;">
            <span>Plan on WhatsApp</span>
          </a>
        </div>

        <div class="rm-affiliate-card">
          <div class="rm-affiliate-title">
            <span>✈️ Travel Essentials & Connectivity</span>
          </div>
          <div class="rm-affiliate-links">
            <a href="https://roammorocco.tours/blog/cheap-flights-to-morocco.html" class="rm-aff-link" target="_blank" rel="noopener">
              <span>✈️ Search Cheap Flights to Marrakech / Casablanca</span>
              <span class="rm-aff-link-meta">SkyScanner / Trip.com →</span>
            </a>
            <a href="https://roammorocco.tours/travel-deals.html#esim" class="rm-aff-link" target="_blank" rel="noopener">
              <span>📱 High-Speed Morocco eSIM (Instant Setup)</span>
              <span class="rm-aff-link-meta">Airalo →</span>
            </a>
          </div>
        </div>
      `);
    }, 280);
  }

  // WORLDWIDE FLOW: Deals and Popular Hotspots
  function renderWorldwideDeals() {
    tripState.mode = 'worldwide';
    addUserMessage("Explore Worldwide Travel Deals & Flight Tools");
    setTimeout(() => {
      addBotMessage(`
        <div class="rm-bubble-title">Where are you traveling next?</div>
        <div class="rm-bubble-desc">Choose a destination or tool to access partner rates and travel savings:</div>
        <div class="rm-options-grid">
          <button class="rm-choice-pill" data-world="Dubai, UAE" type="button">
            <span class="rm-pill-text"><span>🇦🇪</span> <span>Dubai, UAE • Luxury stays & desert safaris</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-world="Paris, France" type="button">
            <span class="rm-pill-text"><span>🇫🇷</span> <span>Paris, France • Boutique hotels & passes</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-world="Bali, Indonesia" type="button">
            <span class="rm-pill-text"><span>🇮🇩</span> <span>Bali, Indonesia • Private villas & tours</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-world="Rome, Italy" type="button">
            <span class="rm-pill-text"><span>🇮🇹</span> <span>Rome, Italy • Colosseum & Vatican VIP tours</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill" data-world="Tokyo, Japan" type="button">
            <span class="rm-pill-text"><span>🇯🇵</span> <span>Tokyo, Japan • Rail passes & modern hotels</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
          <button class="rm-choice-pill highlight" data-world="All Worldwide Deals Hub" type="button">
            <span class="rm-pill-text"><span>🎁</span> <span>Browse All Worldwide Travel Deals Hub</span></span>
            <span class="rm-pill-arrow">→</span>
          </button>
        </div>
      `);
      attachActionHandlers();
    }, 280);
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
        <div class="rm-bubble-title">Curated Travel Deals for ${cityName}</div>
        <div class="rm-bubble-desc">Official partner tools with best rate guarantees:</div>

        <div class="rm-affiliate-card">
          <div class="rm-affiliate-links">
            <a href="https://roammorocco.tours/travel-deals.html#flights" target="_blank" rel="noopener" class="rm-aff-link">
              <span>✈️ Search Cheap Flights to ${cityName}</span>
              <span class="rm-aff-link-meta">Trip.com / Aviasales →</span>
            </a>
            <a href="https://roammorocco.tours/travel-deals.html#hotels" target="_blank" rel="noopener" class="rm-aff-link">
              <span>🏨 Best Hotel & Resort Deals in ${cityName}</span>
              <span class="rm-aff-link-meta">Booking.com →</span>
            </a>
            <a href="https://roammorocco.tours/travel-deals.html#tours" target="_blank" rel="noopener" class="rm-aff-link">
              <span>🎟️ Top Rated Day Tours & Activities</span>
              <span class="rm-aff-link-meta">GetYourGuide →</span>
            </a>
            <a href="https://roammorocco.tours/travel-deals.html#esim" target="_blank" rel="noopener" class="rm-aff-link">
              <span>📱 Instant International Travel eSIM</span>
              <span class="rm-aff-link-meta">Airalo →</span>
            </a>
          </div>
        </div>

        <div style="margin-top: 12px; text-align:center;">
          <a href="/travel-deals.html" class="rm-wa-btn" style="background: rgba(200, 164, 92, 0.15); border: 1px solid rgba(200, 164, 92, 0.4); color: #faebd0; box-shadow: none;">
            <span>Browse Full Travel Deals Directory →</span>
          </a>
        </div>
      `);
    }, 280);
  }

  // Event dispatcher for interactive buttons
  function attachActionHandlers() {
    const stream = document.getElementById('rm-chat-stream');
    if (!stream) return;
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
