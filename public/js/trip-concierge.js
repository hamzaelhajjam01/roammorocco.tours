/**
 * Roam Morocco AI Trip Concierge & Lead Generator
 * Dual-Engine: High-ticket Morocco private tour leads (WhatsApp) + Worldwide Travel Deals (Travelpayouts)
 */

(function () {
  const WHATSAPP_NUMBER = "212653506441";

  function getConciergeLang() {
    const root = document.getElementById('rm-concierge-root');
    if (root && root.getAttribute('data-lang')) return root.getAttribute('data-lang');
    const match = window.location.pathname.match(/^\/(fr|es|de|it)(\.html|\/|$)/);
    if (match) return match[1];
    return (document.documentElement.lang || 'en').slice(0, 2);
  }

  const CONCIERGE_I18N = {
    en: {
      planCustomTour: "Plan a Custom Morocco Tour with Private Driver",
      exploreDeals: "Explore Worldwide Travel Deals & Flight Tools",
      destTitle: "Which circuits would you like to explore?",
      destDesc: "Select a region to customize with our local Marrakech team:",
      destOpt1: "Sahara Desert & Luxury Glamping (Merzouga)",
      destOpt2: "Imperial Cities (Marrakech, Fes & Rabat)",
      destOpt3: "High Atlas Mountains & Berber Valleys",
      destOpt4: "Chefchaouen Blue City & Tangier Coast",
      destOpt5: "Grand Morocco Complete Circuit (All Highlights)",
      durTitle: "How many days are you planning?",
      durDesc: "Every itinerary is completely flexible and tailored to your travel dates:",
      durOpt1: "3 to 5 Days • Short Highlight Getaway",
      durOpt2: "7 to 10 Days • Classic Sahara & Cities (Recommended)",
      durOpt3: "12 to 14+ Days • In-Depth Grand Tour",
      styleTitle: "What travel style suits you best?",
      styleDesc: "We handpick every property to match your comfort preferences:",
      styleOpt1: "Luxury Riads & 5-Star Desert Glamping",
      styleOpt2: "Authentic Boutique & Historic Riads",
      styleOpt3: "Family-Friendly & Relaxed Pace",
      styleOpt4: "Active Trekking & Sahara Expedition",
      finalTag: "🎉 Itinerary Draft Ready",
      finalTitle: "Your Custom Journey Overview",
      recapTitle: "Selected Preferences",
      recapTransport: "🚗 Private 4x4 & Driver",
      waDesk: "● Marrakech Local Desk Online",
      waDesc: "Send your custom itinerary draft directly to our Marrakech headquarters for a fast, tailored quote with transparent pricing.",
      waBtn: "Plan on WhatsApp",
      waMsg: "Salam Roam Morocco! I used your online trip planner:\n\n" +
        "• Destination: {dest}\n" +
        "• Duration: {dur}\n" +
        "• Style: {style}\n" +
        "• Transport: Private Air-Conditioned 4x4 with Chauffeur\n\n" +
        "Could you please send me a custom itinerary quote and availability?",
      essentialsTitle: "✈️ Travel Essentials & Connectivity",
      flightsText: "✈️ Search Cheap Flights to Marrakech / Casablanca",
      esimText: "📱 High-Speed Morocco eSIM (Instant Setup)"
    },
    fr: {
      planCustomTour: "Planifier un circuit sur mesure au Maroc avec chauffeur",
      exploreDeals: "Offres de voyage dans le monde & vols",
      destTitle: "Quels circuits souhaitez-vous explorer ?",
      destDesc: "Choisissez une région à personnaliser avec notre équipe locale à Marrakech :",
      destOpt1: "Désert du Sahara & Camp de Luxe (Merzouga)",
      destOpt2: "Villes Impériales (Marrakech, Fès & Rabat)",
      destOpt3: "Haut Atlas & Vallées Berbères",
      destOpt4: "Chefchaouen la Perle Bleue & Côte de Tanger",
      destOpt5: "Grand Circuit Complet du Maroc (Tous les incontournables)",
      durTitle: "Combien de jours prévoyez-vous ?",
      durDesc: "Chaque itinéraire est 100% personnalisable selon vos dates :",
      durOpt1: "3 à 5 jours • Escapade courte et intense",
      durOpt2: "7 à 10 jours • Sahara classique & Cités impériales (Recommandé)",
      durOpt3: "12 à 14+ jours • Grand tour approfondi",
      styleTitle: "Quel style de voyage vous correspond le mieux ?",
      styleDesc: "Nous sélectionnons chaque adresse selon vos préférences de confort :",
      styleOpt1: "Riads de Luxe & Glamping 5 Étoiles au Sahara",
      styleOpt2: "Riads Historiques & de Charme Authentiques",
      styleOpt3: "En Famille & Rythme Paisible",
      styleOpt4: "Trekking Actif & Expédition Sahara",
      finalTag: "🎉 Projet d'itinéraire prêt",
      finalTitle: "Aperçu de votre voyage sur mesure",
      recapTitle: "Préférences sélectionnées",
      recapTransport: "🚗 4x4 Privé & Chauffeur dédié",
      waDesk: "● Desk Local Marrakech en ligne",
      waDesc: "Envoyez votre projet d'itinéraire directement à notre équipe à Marrakech pour un devis rapide, clair et sans engagement.",
      waBtn: "Planifier sur WhatsApp",
      waMsg: "Salam Roam Morocco ! J'ai configuré mon voyage sur votre planificateur en ligne :\n\n" +
        "• Destination : {dest}\n" +
        "• Durée : {dur}\n" +
        "• Style : {style}\n" +
        "• Transport : 4x4 privé climatisé avec chauffeur\n\n" +
        "Pourriez-vous me transmettre une proposition d'itinéraire personnalisé et les disponibilités ?",
      essentialsTitle: "✈️ Indispensables de voyage & connectivité",
      flightsText: "✈️ Trouver des vols avantageux pour Marrakech / Casablanca",
      esimText: "📱 eSIM Maroc haut débit (Activation immédiate)"
    },
    es: {
      planCustomTour: "Diseñar un tour privado en Marruecos a medida",
      exploreDeals: "Ofertas de viajes y vuelos en todo el mundo",
      destTitle: "¿Qué rutas le gustaría explorar?",
      destDesc: "Seleccione una región para personalizarla con nuestro equipo local en Marrakech:",
      destOpt1: "Desierto del Sahara y Campamento de Lujo (Merzouga)",
      destOpt2: "Ciudades Imperiales (Marrakech, Fez y Rabat)",
      destOpt3: "Alto Atlas y Valles Bereberes",
      destOpt4: "Chefchaouen Ciudad Azul y Costa de Tánger",
      destOpt5: "Gran Circuito Completo de Marruecos",
      durTitle: "¿Cuántos días tiene planeados?",
      durDesc: "Cada itinerario es totalmente flexible y adaptado a sus fechas:",
      durOpt1: "3 a 5 días • Escapada corta destacada",
      durOpt2: "7 a 10 días • Sahara clásico y ciudades (Recomendado)",
      durOpt3: "12 a 14+ días • Gran viaje en profundidad",
      styleTitle: "¿Qué estilo de viaje prefiere?",
      styleDesc: "Elegimos cada alojamiento a la medida de su comodidad:",
      styleOpt1: "Riads de Lujo y Glamping 5 Estrellas en el Sahara",
      styleOpt2: "Riads con Encanto Histórico y Auténtico",
      styleOpt3: "Familiar y a Ritmo Tranquilo",
      styleOpt4: "Trekking Activo y Expedición en el Sahara",
      finalTag: "🎉 Borrador de Itinerario Listo",
      finalTitle: "Resumen de su Viaje Personalizado",
      recapTitle: "Preferencias Seleccionadas",
      recapTransport: "🚗 4x4 Privado y Chófer Dedicado",
      waDesk: "● Centro de Operaciones en Marrakech Online",
      waDesc: "Envíe su borrador de viaje directamente a nuestro equipo en Marrakech para recibir un presupuesto rápido y detallado.",
      waBtn: "Planificar en WhatsApp",
      waMsg: "¡Salam Roam Morocco! He completado el planificador de viaje online:\n\n" +
        "• Destino: {dest}\n" +
        "• Duración: {dur}\n" +
        "• Estilo: {style}\n" +
        "• Transporte: 4x4 privado con aire acondicionado y chófer\n\n" +
        "¿Podrían enviarme una propuesta de itinerario a medida y disponibilidad?",
      essentialsTitle: "✈️ Esenciales de Viaje y Conectividad",
      flightsText: "✈️ Buscar vuelos a Marrakech / Casablanca",
      esimText: "📱 eSIM de alta velocidad para Marruecos"
    },
    de: {
      planCustomTour: "Individuelle Marokko-Privatreise planen",
      exploreDeals: "Weltweite Reiseangebote & Flugsuche",
      destTitle: "Welche Regionen möchten Sie erkunden?",
      destDesc: "Wählen Sie ein Ziel, das unser Team in Marrakesch für Sie maßschneidert:",
      destOpt1: "Sahara-Wüste & Luxus-Glamping (Merzouga)",
      destOpt2: "Königsstädte (Marrakesch, Fès & Rabat)",
      destOpt3: "Hoher Atlas & Berber-Täler",
      destOpt4: "Blaue Stadt Chefchaouen & Küste von Tanger",
      destOpt5: "Große Marokko-Rundreise (Alle Höhepunkte)",
      durTitle: "Wie viele Reisetage planen Sie?",
      durDesc: "Jede Route ist vollkommen flexibel und an Ihre Reisedaten angepasst:",
      durOpt1: "3 bis 5 Tage • Kurztrip-Highlights",
      durOpt2: "7 bis 10 Tage • Klassische Sahara & Städte (Empfohlen)",
      durOpt3: "12 bis 14+ Tage • Ausführliche Rundreise",
      styleTitle: "Welcher Reisestil passt zu Ihnen?",
      styleDesc: "Wir wählen jede Unterkunft passend zu Ihrem Komfortwunsch aus:",
      styleOpt1: "Luxus-Riads & 5-Sterne Wüsten-Glamping",
      styleOpt2: "Authentische Boutique- & historische Riads",
      styleOpt3: "Familienfreundlich & entspanntes Tempo",
      styleOpt4: "Aktives Trekking & Sahara-Expedition",
      finalTag: "🎉 Reiseentwurf fertig",
      finalTitle: "Übersicht Ihrer maßgeschneiderten Reise",
      recapTitle: "Ausgewählte Wünsche",
      recapTransport: "🚗 Privater 4x4 & eigener Fahrer",
      waDesk: "● Marrakesch-Team jetzt online",
      waDesc: "Senden Sie Ihren Reiseentwurf direkt an unsere Zentrale in Marrakesch für ein schnelles, transparentes Angebot.",
      waBtn: "Über WhatsApp planen",
      waMsg: "Salam Roam Morocco! Ich habe Ihren Online-Reiseplaner genutzt:\n\n" +
        "• Reiseziel: {dest}\n" +
        "• Reisedauer: {dur}\n" +
        "• Reisestil: {style}\n" +
        "• Transport: Privater klimatisierter 4x4 mit Chauffeur\n\n" +
        "Könnten Sie mir bitte ein individuelles Reiseangebot und die Verfügbarkeit zusenden?",
      essentialsTitle: "✈️ Reise-Essentials & Internet",
      flightsText: "✈️ Günstige Flüge nach Marrakesch / Casablanca",
      esimText: "📱 Schnelle Marokko-eSIM (Sofortige Aktivierung)"
    },
    it: {
      planCustomTour: "Pianifica un tour privato su misura con autista",
      exploreDeals: "Offerte di viaggio mondiali e voli",
      destTitle: "Quali circuiti desideri esplorare?",
      destDesc: "Seleziona una regione da personalizzare con il nostro team locale di Marrakech:",
      destOpt1: "Deserto del Sahara & Glamping di Lusso (Merzouga)",
      destOpt2: "Città Imperiali (Marrakech, Fes & Rabat)",
      destOpt3: "Alto Atlante & Valli Berbere",
      destOpt4: "Chefchaouen Perla Blu & Costa di Tangeri",
      destOpt5: "Gran Circuito Completo del Marocco",
      durTitle: "Quanti giorni stai pianificando?",
      durDesc: "Ogni itinerario è completamente flessibile e su misura per le tue date:",
      durOpt1: "Da 3 a 5 giorni • Fuga breve tra le meraviglie",
      durOpt2: "Da 7 a 10 giorni • Sahara classico e città (Consigliato)",
      durOpt3: "Da 12 a 14+ giorni • Gran tour approfondito",
      styleTitle: "Quale stile di viaggio preferisci?",
      styleDesc: "Selezioniamo con cura ogni struttura per offrirti il massimo comfort:",
      styleOpt1: "Riad di Lusso & Glamping 5 Stelle nel Sahara",
      styleOpt2: "Riad Storici & Boutique di Charme",
      styleOpt3: "Per Famiglie & Ritmo Rilassato",
      styleOpt4: "Trekking Attivo & Spedizione nel Sahara",
      finalTag: "🎉 Bozza d'itinerario pronta",
      finalTitle: "Riepilogo del tuo viaggio su misura",
      recapTitle: "Preferenze selezionate",
      recapTransport: "🚗 4x4 Privato con autista dedicato",
      waDesk: "● Desk Locale Marrakech online",
      waDesc: "Invia la tua bozza d'itinerario al nostro team di Marrakech per ricevere un preventivo rapido, trasparente e senza impegno.",
      waBtn: "Pianifica su WhatsApp",
      waMsg: "Salam Roam Morocco! Ho configurato il mio viaggio con il planner online:\n\n" +
        "• Destinazione: {dest}\n" +
        "• Durata: {dur}\n" +
        "• Stile: {style}\n" +
        "• Trasporto: 4x4 privato con aria condizionata e autista\n\n" +
        "Potreste inviarmi un preventivo personalizzato e verificare le disponibilità?",
      essentialsTitle: "✈️ Indispensabili di viaggio e connessione",
      flightsText: "✈️ Cerca voli per Marrakech / Casablanca",
      esimText: "📱 eSIM Marocco ad alta velocità (Configurazione immediata)"
    }
  };
  
  // Trip State
  let tripState = {
    mode: null, // 'morocco' or 'worldwide'
    destinations: [],
    duration: '',
    style: '',
    group: '',
    worldDest: ''
  };

  // Inject HTML into DOM (or bind to existing Astro component)
  function initWidget() {
    let root = document.getElementById('rm-concierge-root');
    if (!root) {
      // Ensure trip-concierge.css is loaded dynamically if missing
      const isSub = window.location.pathname.includes('/blog/');
      const cssHref = isSub ? '../css/trip-concierge.css?v=20261012_gold4' : 'css/trip-concierge.css?v=20261012_gold4';
      if (!document.querySelector('link[href*="trip-concierge.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssHref;
        document.head.appendChild(link);
      }

      root = document.createElement('div');
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
    }

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
        isReplying = false;
        removeTypingIndicator();
        tripState = { mode: null, destinations: [], duration: '', style: '', group: '', worldDest: '' };
        const stream = document.getElementById('rm-chat-stream');
        if (stream) stream.innerHTML = '';
        renderWelcome();
      });
    }
  }

  let isReplying = false;

  function scrollToBottom() {
    const stream = document.getElementById('rm-chat-stream');
    if (!stream) return;
    setTimeout(() => {
      stream.scrollTo({
        top: stream.scrollHeight,
        behavior: 'smooth'
      });
    }, 40);
  }

  function showTypingIndicator() {
    const stream = document.getElementById('rm-chat-stream');
    if (!stream) return;
    removeTypingIndicator();
    const typing = document.createElement('div');
    typing.className = 'rm-bot-msg rm-typing-msg';
    typing.id = 'rm-typing-indicator';
    typing.innerHTML = `
      <div class="rm-bot-avatar-mini" aria-hidden="true">RM</div>
      <div class="rm-msg-bubble rm-typing-bubble" aria-label="Roam Concierge is typing...">
        <span class="rm-typing-dot"></span>
        <span class="rm-typing-dot"></span>
        <span class="rm-typing-dot"></span>
      </div>
    `;
    stream.appendChild(typing);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('rm-typing-indicator');
    if (el) el.remove();
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
    scrollToBottom();
  }

  function addUserMessage(text) {
    const stream = document.getElementById('rm-chat-stream');
    if (!stream) return;
    const msg = document.createElement('div');
    msg.className = 'rm-user-msg';
    msg.innerHTML = `<div class="rm-msg-bubble">${text}</div>`;
    stream.appendChild(msg);
    scrollToBottom();
  }

  function simulateBotReply(html, delayMs = 950) {
    isReplying = true;
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      addBotMessage(html);
      attachActionHandlers();
      isReplying = false;
    }, delayMs);
  }

  // Step 1: Welcome & Path Selection
  function renderWelcome() {
    const stream = document.getElementById('rm-chat-stream');
    if (!stream) return;
    if (stream.children.length === 0) {
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
    }

    attachActionHandlers();
  }

  // MOROCCO FLOW: Step 2: Destinations
  function renderMoroccoDestinations() {
    tripState.mode = 'morocco';
    const i18n = CONCIERGE_I18N[getConciergeLang()] || CONCIERGE_I18N.en;
    addUserMessage(i18n.planCustomTour);
    simulateBotReply(`
      <div class="rm-bubble-title">${i18n.destTitle}</div>
      <div class="rm-bubble-desc">${i18n.destDesc}</div>
      <div class="rm-options-grid">
        <button class="rm-choice-pill highlight" data-dest="${i18n.destOpt1}" type="button">
          <span class="rm-pill-text"><span>🐪</span> <span>${i18n.destOpt1}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill" data-dest="${i18n.destOpt2}" type="button">
          <span class="rm-pill-text"><span>🏰</span> <span>${i18n.destOpt2}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill" data-dest="${i18n.destOpt3}" type="button">
          <span class="rm-pill-text"><span>🏔️</span> <span>${i18n.destOpt3}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill" data-dest="${i18n.destOpt4}" type="button">
          <span class="rm-pill-text"><span>💙</span> <span>${i18n.destOpt4}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill highlight" data-dest="${i18n.destOpt5}" type="button">
          <span class="rm-pill-text"><span>⭐</span> <span>${i18n.destOpt5}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
      </div>
    `, 950);
  }

  // MOROCCO FLOW: Step 3: Duration
  function renderMoroccoDuration(selectedDest) {
    tripState.destinations = [selectedDest];
    addUserMessage(selectedDest);
    const i18n = CONCIERGE_I18N[getConciergeLang()] || CONCIERGE_I18N.en;
    simulateBotReply(`
      <div class="rm-bubble-title">${i18n.durTitle}</div>
      <div class="rm-bubble-desc">${i18n.durDesc}</div>
      <div class="rm-options-grid">
        <button class="rm-choice-pill" data-dur="${i18n.durOpt1}" type="button">
          <span class="rm-pill-text"><span>⏱️</span> <span>${i18n.durOpt1}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill highlight" data-dur="${i18n.durOpt2}" type="button">
          <span class="rm-pill-text"><span>⭐</span> <span>${i18n.durOpt2}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill" data-dur="${i18n.durOpt3}" type="button">
          <span class="rm-pill-text"><span>👑</span> <span>${i18n.durOpt3}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
      </div>
    `, 950);
  }

  // MOROCCO FLOW: Step 4: Travel Style & Group
  function renderMoroccoStyle(selectedDur) {
    tripState.duration = selectedDur;
    addUserMessage(selectedDur);
    const i18n = CONCIERGE_I18N[getConciergeLang()] || CONCIERGE_I18N.en;
    simulateBotReply(`
      <div class="rm-bubble-title">${i18n.styleTitle}</div>
      <div class="rm-bubble-desc">${i18n.styleDesc}</div>
      <div class="rm-options-grid">
        <button class="rm-choice-pill highlight" data-style="${i18n.styleOpt1}" type="button">
          <span class="rm-pill-text"><span>💎</span> <span>${i18n.styleOpt1}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill" data-style="${i18n.styleOpt2}" type="button">
          <span class="rm-pill-text"><span>🏛️</span> <span>${i18n.styleOpt2}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill" data-style="${i18n.styleOpt3}" type="button">
          <span class="rm-pill-text"><span>👨‍👩‍👧</span> <span>${i18n.styleOpt3}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
        <button class="rm-choice-pill" data-style="${i18n.styleOpt4}" type="button">
          <span class="rm-pill-text"><span>🥾</span> <span>${i18n.styleOpt4}</span></span>
          <span class="rm-pill-arrow">→</span>
        </button>
      </div>
    `, 950);
  }

  // MOROCCO FLOW: Step 5: Final WhatsApp Lead Conversion
  function renderMoroccoFinal(selectedStyle) {
    tripState.style = selectedStyle;
    addUserMessage(selectedStyle);
    const i18n = CONCIERGE_I18N[getConciergeLang()] || CONCIERGE_I18N.en;

    const textMessage = i18n.waMsg
      .replace('{dest}', tripState.destinations[0] || '')
      .replace('{dur}', tripState.duration || '')
      .replace('{style}', tripState.style || '');

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textMessage)}`;

    simulateBotReply(`
      <div class="rm-bubble-tag">${i18n.finalTag}</div>
      <div class="rm-bubble-title">${i18n.finalTitle}</div>
      
      <div class="rm-recap-box">
        <div class="rm-recap-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ${i18n.recapTitle}
        </div>
        <div class="rm-recap-tags">
          <span class="rm-recap-tag">📍 ${tripState.destinations[0]}</span>
          <span class="rm-recap-tag">⏱️ ${tripState.duration}</span>
          <span class="rm-recap-tag">✨ ${tripState.style}</span>
          <span class="rm-recap-tag">${i18n.recapTransport}</span>
        </div>
      </div>

      <div class="rm-wa-card">
        <span class="rm-wa-badge">${i18n.waDesk}</span>
        <p>${i18n.waDesc}</p>
        <a href="${waLink}" target="_blank" rel="noopener" class="rm-wa-btn" style="color:#ffffff !important; text-decoration:none;">
          <img src="/img/whatsapp-logo.png" alt="WhatsApp" class="wa-btn-icon" width="20" height="20" style="vertical-align:middle; margin-right:8px;">
          <span style="color:#ffffff !important;">${i18n.waBtn}</span>
        </a>
      </div>

      <div class="rm-affiliate-card">
        <div class="rm-affiliate-title">
          <span>${i18n.essentialsTitle}</span>
        </div>
        <div class="rm-affiliate-links">
          <a href="https://roammorocco.tours/blog/cheap-flights-to-morocco.html" class="rm-aff-link" target="_blank" rel="noopener">
            <span>${i18n.flightsText}</span>
            <span class="rm-aff-link-meta">SkyScanner / Trip.com →</span>
          </a>
          <a href="https://roammorocco.tours/travel-deals.html#esim" class="rm-aff-link" target="_blank" rel="noopener">
            <span>${i18n.esimText}</span>
            <span class="rm-aff-link-meta">Airalo →</span>
          </a>
        </div>
      </div>
    `, 1100);
  }

  // WORLDWIDE FLOW: Deals and Popular Hotspots
  function renderWorldwideDeals() {
    tripState.mode = 'worldwide';
    addUserMessage("Explore Worldwide Travel Deals & Flight Tools");
    simulateBotReply(`
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
    `, 950);
  }

  // WORLDWIDE FLOW: Specific City Cards
  function renderWorldwideCity(cityName) {
    addUserMessage(cityName);
    if (cityName.includes("All Worldwide Deals Hub")) {
      window.location.href = "/travel-deals.html";
      return;
    }

    simulateBotReply(`
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
        <a href="/travel-deals.html" class="rm-choice-pill highlight" style="display:inline-flex; justify-content:center; text-decoration:none;">
          <span>Browse Full Travel Deals Directory →</span>
        </a>
      </div>
    `, 950);
  }

  // Event dispatcher for interactive buttons
  function attachActionHandlers() {
    const stream = document.getElementById('rm-chat-stream');
    if (!stream) return;
    const buttons = stream.querySelectorAll('button:not([data-bound])');

    buttons.forEach(btn => {
      btn.setAttribute('data-bound', 'true');
      btn.addEventListener('click', (e) => {
        if (isReplying) return;

        // Visual feedback & lock previous option choices
        const parentGrid = btn.closest('.rm-options-grid');
        if (parentGrid) {
          parentGrid.querySelectorAll('button').forEach(b => {
            b.style.pointerEvents = 'none';
            if (b !== btn) {
              b.style.opacity = '0.35';
            } else {
              b.style.borderColor = 'var(--rm-gold-light)';
              b.style.background = 'rgba(200, 164, 92, 0.18)';
            }
          });
        }

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
