/**
 * Roam Morocco Tours — Interactive Trip Cost & Route Estimator
 * Version: 2026.1 (Modular Vanilla JS)
 */

(function () {
  'use strict';

  // Routes Database
  const ROUTES = {
    'marrakech-desert-fes': {
      name: 'Marrakech to Fes via Merzouga Sahara',
      desc: 'High Atlas, Ait Benhaddou, Dades Gorges, Erg Chebbi luxury camp, Middle Atlas cedar forest.',
      distance: '1,050 km',
      driveHours: '16–18 hours total driving over 3–5 days',
      minDays: 3,
      maxDays: 7,
      defaultDays: 4,
      highlights: 'Crosses 2,260m Tizi n\'Tichka pass. Sunset camel trek over 150m golden dunes.'
    },
    'imperial-cities-north': {
      name: 'Imperial Cities & Blue Pearl',
      desc: 'Casablanca, Rabat, Tangier, Chefchaouen blue medina, Roman Volubilis, ancient Fes.',
      distance: '950 km',
      driveHours: '13–15 hours total driving over 5–8 days',
      minDays: 5,
      maxDays: 10,
      defaultDays: 7,
      highlights: 'High-speed coastal highways combined with winding Rif Mountain mountain roads.'
    },
    'marrakech-coast-atlas': {
      name: 'Marrakech, Atlantic Coast & High Atlas',
      desc: 'Marrakech base, breezy Essaouira ramparts, Ourika Valley river trekking, Agafay sunset.',
      distance: '480 km',
      driveHours: '7–9 hours total driving over 3–6 days',
      minDays: 3,
      maxDays: 6,
      defaultDays: 4,
      highlights: 'Zero hotel changes option. Fresh Atlantic seafood & secluded stone desert dinners.'
    },
    'grand-morocco-loop': {
      name: 'Grand Morocco Grand Circuit',
      desc: 'Casablanca, Chefchaouen, Fes, Merzouga Sahara, Todra Gorges, Marrakech, Essaouira.',
      distance: '2,250 km',
      driveHours: '32–36 hours total driving over 9–14 days',
      minDays: 9,
      maxDays: 14,
      defaultDays: 10,
      highlights: 'The definitive all-encompassing Kingdom expedition. Mediterranean to deep Sahara.'
    }
  };

  // Pricing Parameters in EUR
  const STYLE_PARAMS = {
    'boutique': {
      label: 'Authentic Boutique',
      roomPerNight: 85,
      foodPerPersonDay: 25,
      expPerPersonTotal: 60,
      transportDailyPrado: 170,
      transportDailyVan: 220
    },
    'luxury': {
      label: 'Curated Luxury',
      roomPerNight: 195,
      foodPerPersonDay: 45,
      expPerPersonTotal: 120,
      transportDailyPrado: 200,
      transportDailyVan: 260
    },
    'palace': {
      label: 'Royal Palace & VIP',
      roomPerNight: 450,
      foodPerPersonDay: 90,
      expPerPersonTotal: 250,
      transportDailyPrado: 260,
      transportDailyVan: 340
    }
  };

  const GROUP_PARAMS = {
    'solo': { label: 'Solo Traveler', count: 1, rooms: 1, isVan: false },
    'couple': { label: 'Couple (2 Travelers)', count: 2, rooms: 1, isVan: false },
    'family': { label: 'Family (3–4 Travelers)', count: 3.5, rooms: 2, isVan: false },
    'group': { label: 'Small Group (5–8 Travelers)', count: 6, rooms: 3, isVan: true }
  };

  const EUR_TO_USD = 1.08;

  // State
  let state = {
    routeKey: 'marrakech-desert-fes',
    days: 4,
    style: 'luxury',
    group: 'couple',
    currency: 'EUR' // 'EUR' or 'USD'
  };

  // DOM Elements
  let els = {};

  function init() {
    els = {
      container: document.getElementById('roamEstimator'),
      slider: document.getElementById('estSliderDays'),
      daysDisplay: document.getElementById('estDaysVal'),
      sliderMin: document.getElementById('estSliderMin'),
      sliderMax: document.getElementById('estSliderMax'),
      routeCards: document.querySelectorAll('.est-route-card'),
      stylePills: document.querySelectorAll('[data-est-style]'),
      groupPills: document.querySelectorAll('[data-est-group]'),
      currBtns: document.querySelectorAll('.curr-btn'),
      // Output fields
      totalDisplay: document.getElementById('estTotalAmount'),
      perPersonDisplay: document.getElementById('estPerPersonVal'),
      meterTransport: document.getElementById('estMeterTransport'),
      meterLodging: document.getElementById('estMeterLodging'),
      meterExp: document.getElementById('estMeterExp'),
      meterFood: document.getElementById('estMeterFood'),
      valTransport: document.getElementById('estValTransport'),
      valLodging: document.getElementById('estValLodging'),
      valExp: document.getElementById('estValExp'),
      valFood: document.getElementById('estValFood'),
      // Intel
      intelRouteName: document.getElementById('estIntelRouteName'),
      intelDist: document.getElementById('estIntelDist'),
      intelTime: document.getElementById('estIntelTime'),
      intelHighlight: document.getElementById('estIntelHighlight'),
      // Modal / Form
      leadTriggerBtn: document.getElementById('estTriggerLeadBtn'),
      leadModal: document.getElementById('estLeadModal'),
      leadForm: document.getElementById('estLeadForm'),
      leadMsg: document.getElementById('estLeadMsg'),
      leadSubmitBtn: document.getElementById('estSubmitLeadBtn')
    };

    if (!els.container) return;

    setupEvents();
    syncRouteBounds();
    calculateAndRender();
  }

  function setupEvents() {
    // Route Selection
    els.routeCards.forEach(card => {
      card.addEventListener('click', () => {
        els.routeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.routeKey = card.getAttribute('data-route');
        syncRouteBounds();
        calculateAndRender();
      });
    });

    // Slider
    if (els.slider) {
      els.slider.addEventListener('input', (e) => {
        state.days = parseInt(e.target.value, 10);
        if (els.daysDisplay) els.daysDisplay.textContent = `${state.days} Days`;
        calculateAndRender();
      });
    }

    // Style Pills
    els.stylePills.forEach(pill => {
      pill.addEventListener('click', () => {
        els.stylePills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        state.style = pill.getAttribute('data-est-style');
        calculateAndRender();
      });
    });

    // Group Pills
    els.groupPills.forEach(pill => {
      pill.addEventListener('click', () => {
        els.groupPills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        state.group = pill.getAttribute('data-est-group');
        calculateAndRender();
      });
    });

    // Currency Toggle
    els.currBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        els.currBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currency = btn.getAttribute('data-curr');
        calculateAndRender();
      });
    });

    // Lead Drawer Toggle
    if (els.leadTriggerBtn && els.leadModal) {
      els.leadTriggerBtn.addEventListener('click', () => {
        const isHidden = !els.leadModal.classList.contains('active');
        els.leadModal.classList.toggle('active', isHidden);
        if (isHidden) {
          els.leadModal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          const firstInput = els.leadModal.querySelector('input');
          if (firstInput) firstInput.focus();
        }
      });
    }

    // Form Submission
    if (els.leadForm) {
      els.leadForm.addEventListener('submit', handleLeadSubmit);
    }
  }

  function syncRouteBounds() {
    const route = ROUTES[state.routeKey];
    if (!route) return;

    if (els.slider) {
      els.slider.min = route.minDays;
      els.slider.max = route.maxDays;
      if (state.days < route.minDays) state.days = route.minDays;
      if (state.days > route.maxDays) state.days = route.maxDays;
      els.slider.value = state.days;
    }
    if (els.daysDisplay) els.daysDisplay.textContent = `${state.days} Days`;
    if (els.sliderMin) els.sliderMin.textContent = `${route.minDays} Days`;
    if (els.sliderMax) els.sliderMax.textContent = `${route.maxDays} Days`;
  }

  function calculateAndRender() {
    const route = ROUTES[state.routeKey] || ROUTES['marrakech-desert-fes'];
    const styleObj = STYLE_PARAMS[state.style] || STYLE_PARAMS['luxury'];
    const groupObj = GROUP_PARAMS[state.group] || GROUP_PARAMS['couple'];

    const days = state.days;
    const nights = Math.max(1, days - 1);
    const travelers = groupObj.count;
    const rooms = groupObj.rooms;

    // 1. Transport Cost (Includes fuel, driver accommodation, per diem, tolls, insurance)
    const transportDaily = groupObj.isVan ? styleObj.transportDailyVan : styleObj.transportDailyPrado;
    const costTransportEUR = transportDaily * days;

    // 2. Lodging Cost (Riads & Desert Camps)
    const costLodgingEUR = (styleObj.roomPerNight * rooms) * nights;

    // 3. Guided Experiences, Entrance Fees & Activities
    const costExpEUR = styleObj.expPerPersonTotal * travelers;

    // 4. Meals, Refreshments & Daily Incidentals
    const costFoodEUR = (styleObj.foodPerPersonDay * travelers) * days;

    // Totals in EUR
    const totalEUR = costTransportEUR + costLodgingEUR + costExpEUR + costFoodEUR;
    const lowEUR = Math.round(totalEUR * 0.94);
    const highEUR = Math.round(totalEUR * 1.08);

    const perPersonDayEUR = Math.round(totalEUR / (travelers * days));

    // Currency Formatting Helper
    const rate = state.currency === 'USD' ? EUR_TO_USD : 1;
    const symbol = state.currency === 'USD' ? '$' : '€';

    function fmt(amountEUR) {
      return symbol + Math.round(amountEUR * rate).toLocaleString();
    }

    // Render Totals
    if (els.totalDisplay) {
      els.totalDisplay.textContent = `${fmt(lowEUR)} – ${fmt(highEUR)}`;
    }
    if (els.perPersonDisplay) {
      els.perPersonDisplay.innerHTML = `<span class="badge">~${fmt(perPersonDayEUR)} / person / day</span> based on ${groupObj.label}`;
    }

    // Render Breakdown
    if (els.valTransport) els.valTransport.textContent = fmt(costTransportEUR);
    if (els.valLodging) els.valLodging.textContent = fmt(costLodgingEUR);
    if (els.valExp) els.valExp.textContent = fmt(costExpEUR);
    if (els.valFood) els.valFood.textContent = fmt(costFoodEUR);

    // Render Meter Bars (% of total)
    if (els.meterTransport) els.meterTransport.style.width = `${Math.min(100, Math.round((costTransportEUR / totalEUR) * 100))}%`;
    if (els.meterLodging) els.meterLodging.style.width = `${Math.min(100, Math.round((costLodgingEUR / totalEUR) * 100))}%`;
    if (els.meterExp) els.meterExp.style.width = `${Math.min(100, Math.round((costExpEUR / totalEUR) * 100))}%`;
    if (els.meterFood) els.meterFood.style.width = `${Math.min(100, Math.round((costFoodEUR / totalEUR) * 100))}%`;

    // Render Route Intel
    if (els.intelRouteName) els.intelRouteName.textContent = route.name;
    if (els.intelDist) els.intelDist.textContent = `Route Distance: ${route.distance}`;
    if (els.intelTime) els.intelTime.textContent = `Driving Schedule: ${route.driveHours}`;
    if (els.intelHighlight) els.intelHighlight.textContent = route.highlights;

    // Cache current calculations on form dataset for lead submission
    if (els.leadForm) {
      els.leadForm.dataset.calcSummary = `${days} Days | ${route.name} | ${styleObj.label} | ${groupObj.label} | Estimate: ${fmt(lowEUR)} - ${fmt(highEUR)}`;
    }
  }

  async function handleLeadSubmit(e) {
    e.preventDefault();
    const form = els.leadForm;
    const btn = els.leadSubmitBtn;
    const msg = els.leadMsg;

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const notes = form.querySelector('[name="notes"]').value.trim();
    const summary = form.dataset.calcSummary || 'Morocco Trip Estimate';

    btn.disabled = true;
    btn.innerHTML = 'Submitting Your Itinerary...';

    const payload = {
      name: name,
      email: email,
      phone: phone,
      service: 'Trip Cost Calculator Estimate',
      pickup: state.routeKey,
      duration: `${state.days} Days`,
      passengers: state.group,
      vehicle: state.style,
      notes: `CALCULATOR SPECIFICATIONS:\n${summary}\n\nCLIENT NOTES:\n${notes}`
    };

    // Pre-formatted WhatsApp Message
    const waText = `Salam Roam Morocco! I calculated my trip budget on your website:%0A%0A` +
      `🗺 *Itinerary:* ${encodeURIComponent(summary)}%0A` +
      `👤 *Name:* ${encodeURIComponent(name)}%0A` +
      `✉️ *Email:* ${encodeURIComponent(email)}%0A` +
      `📱 *Phone:* ${encodeURIComponent(phone)}%0A` +
      (notes ? `📝 *Notes:* ${encodeURIComponent(notes)}%0A` : '') +
      `%0ACan you please confirm availability and lock in this rate?`;
    const waUrl = `https://wa.me/212653506441?text=${waText}`;

    try {
      await fetch('send-quote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      msg.style.display = 'block';
      msg.style.background = '#f0fdf4';
      msg.style.border = '1px solid #86efac';
      msg.style.borderLeft = '4px solid #16a34a';
      msg.style.color = '#14532d';
      msg.innerHTML = `<strong>✓ Estimate Saved &amp; Dispatched!</strong><br>Thank you, ${name}. Your calculation has been sent to our Marrakech team. We will review riad availability and email you at <strong>${email}</strong> within 30 minutes.<br><br><a href="${waUrl}" target="_blank" rel="noopener" class="btn-wa-solid" style="display:inline-flex; align-items:center; gap:6px; background:#25D366; color:#000; padding:10px 18px; font-weight:800; font-size:12px; text-transform:uppercase; text-decoration:none; margin-top:8px;">💬 Chat on WhatsApp (+212 653-506441) &rarr;</a>`;

      btn.innerHTML = '✓ Estimate Sent to Hamza';
      btn.style.background = '#16a34a';
      btn.style.borderColor = '#16a34a';

      // GA4 conversion event
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          'event_category': 'conversion',
          'event_label': 'trip_cost_estimator',
          'value': 200,
          'currency': 'EUR'
        });
      }

      // Open WhatsApp in new tab after 1.5s
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1500);

    } catch (err) {
      msg.style.display = 'block';
      msg.style.background = '#fefce8';
      msg.style.border = '1px solid #fde047';
      msg.style.color = '#713f12';
      msg.innerHTML = `Connecting directly to our WhatsApp concierge...<br><br><a href="${waUrl}" target="_blank" rel="noopener" style="font-weight:800; color:#000;">Open WhatsApp Chat &rarr;</a>`;
      window.open(waUrl, '_blank');
    }
  }

  // Auto-boot on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
