/**
 * Roam Morocco — Booking Engine & Interactive Wizard (Vanilla JS)
 * High-converting upfront pricing for Airport Transfers, Intercity Corridors & Subpage Tours.
 * Version: 2026.10.14
 */

(function () {
  'use strict';

  // WhatsApp Phone Number (International Format)
  const RM_PHONE = '212653506441';

  // ── 1. TRANSFER & INTERCITY PRICING TABLE (PER VEHICLE, ALL-INCLUSIVE) ──
  const WIZARD_RATES = {
    'Marrakech Airport (RAK)': {
      'Marrakech Medina': { '1_4': 25, '5_7': 35, '8_12': 55 },
      'Marrakech Palmeraie': { '1_4': 35, '5_7': 40, '8_12': 59 },
      'Essaouira': { '1_4': 85, '5_7': 130, '8_12': 199 },
      'Taghazout': { '1_4': 145, '5_7': 170, '8_12': 265 },
      'Agadir City': { '1_4': 125, '5_7': 145, '8_12': 225 },
      'Casablanca City': { '1_4': 145, '5_7': 165, '8_12': 255 }
    },
    'Casablanca Airport (CMN)': {
      'Marrakech Medina': { '1_4': 145, '5_7': 165, '8_12': 255 },
      'Marrakech Palmeraie': { '1_4': 150, '5_7': 170, '8_12': 260 },
      'Casablanca City': { '1_4': 40, '5_7': 55, '8_12': 85 },
      'Rabat': { '1_4': 75, '5_7': 100, '8_12': 155 },
      'Essaouira': { '1_4': 190, '5_7': 240, '8_12': 372 }
    },
    'Agadir Airport (AGA)': {
      'Taghazout': { '1_4': 45, '5_7': 60, '8_12': 93 },
      'Agadir City': { '1_4': 25, '5_7': 35, '8_12': 55 },
      'Essaouira': { '1_4': 105, '5_7': 138, '8_12': 215 },
      'Marrakech Medina': { '1_4': 125, '5_7': 145, '8_12': 225 }
    },
    'Marrakech Medina': {
      'Essaouira': { '1_4': 85, '5_7': 130, '8_12': 199 },
      'Agafay Desert': { '1_4': 75, '5_7': 95, '8_12': 149 },
      'Ourika Valley': { '1_4': 75, '5_7': 95, '8_12': 149 },
      'Ouzoud Waterfalls': { '1_4': 160, '5_7': 210, '8_12': 280 },
      'Casablanca City': { '1_4': 145, '5_7': 165, '8_12': 255 },
      'Agadir City': { '1_4': 125, '5_7': 145, '8_12': 225 },
      'Taghazout': { '1_4': 145, '5_7': 170, '8_12': 265 },
      'Imlil': { '1_4': 69, '5_7': 98, '8_12': 149 }
    },
    'Marrakech Palmeraie': {
      'Essaouira': { '1_4': 90, '5_7': 135, '8_12': 205 },
      'Agafay Desert': { '1_4': 80, '5_7': 100, '8_12': 155 },
      'Ourika Valley': { '1_4': 80, '5_7': 100, '8_12': 155 },
      'Ouzoud Waterfalls': { '1_4': 165, '5_7': 215, '8_12': 285 },
      'Casablanca City': { '1_4': 145, '5_7': 165, '8_12': 255 },
      'Agadir City': { '1_4': 130, '5_7': 150, '8_12': 230 },
      'Taghazout': { '1_4': 150, '5_7': 175, '8_12': 270 },
      'Imlil': { '1_4': 74, '5_7': 103, '8_12': 154 }
    },
    'Essaouira': {
      'Agadir City': { '1_4': 105, '5_7': 138, '8_12': 215 },
      'Taghazout': { '1_4': 115, '5_7': 150, '8_12': 233 },
      'Casablanca City': { '1_4': 190, '5_7': 240, '8_12': 372 }
    },
    'Casablanca City': {
      'Rabat': { '1_4': 65, '5_7': 90, '8_12': 140 }
    }
  };

  function lookupRate(pickup, destination, tier, tripType) {
    if (!pickup || !destination) return null;
    if (tier === '13_plus') return 'Custom';

    let rateObj = null;
    if (WIZARD_RATES[pickup] && WIZARD_RATES[pickup][destination]) {
      rateObj = WIZARD_RATES[pickup][destination];
    } else if (WIZARD_RATES[destination] && WIZARD_RATES[destination][pickup]) {
      rateObj = WIZARD_RATES[destination][pickup];
    }

    if (rateObj && rateObj[tier]) {
      const base = rateObj[tier];
      return tripType === 'round_trip' ? Math.round(base * 1.90) : base;
    }

    // Fallback baseline for non-standard routes
    const fallbackBase = tier === '1_4' ? 120 : (tier === '5_7' ? 160 : 230);
    return tripType === 'round_trip' ? Math.round(fallbackBase * 1.90) : fallbackBase;
  }

  // ── 1.1 ROUTE DISTANCE & DURATION ESTIMATES ──
  const ROUTE_METRICS = {
    'Marrakech Airport (RAK) -> Marrakech Medina': { time: '20m', dist: '7 km' },
    'Marrakech Airport (RAK) -> Marrakech Palmeraie': { time: '30m', dist: '14 km' },
    'Marrakech Airport (RAK) -> Essaouira': { time: '2h 45m', dist: '185 km' },
    'Marrakech Airport (RAK) -> Taghazout': { time: '3h 30m', dist: '240 km' },
    'Marrakech Airport (RAK) -> Agadir City': { time: '3h 15m', dist: '250 km' },
    'Marrakech Airport (RAK) -> Casablanca City': { time: '2h 45m', dist: '240 km' },
    'Casablanca Airport (CMN) -> Rabat': { time: '1h', dist: '90 km' },
    'Casablanca Airport (CMN) -> Casablanca City': { time: '35m', dist: '32 km' },
    'Casablanca Airport (CMN) -> Marrakech Medina': { time: '2h 30m', dist: '220 km' },
    'Casablanca Airport (CMN) -> Marrakech Palmeraie': { time: '2h 35m', dist: '225 km' },
    'Agadir Airport (AGA) -> Taghazout': { time: '50m', dist: '45 km' },
    'Agadir Airport (AGA) -> Agadir City': { time: '30m', dist: '25 km' },
    'Agadir Airport (AGA) -> Essaouira': { time: '2h 45m', dist: '175 km' },
    'Agadir Airport (AGA) -> Marrakech Medina': { time: '3h 15m', dist: '250 km' },
    'Marrakech Medina -> Essaouira': { time: '2h 45m', dist: '185 km' },
    'Marrakech Medina -> Agafay Desert': { time: '45m', dist: '35 km' },
    'Marrakech Medina -> Ourika Valley': { time: '1h', dist: '45 km' },
    'Marrakech Medina -> Ouzoud Waterfalls': { time: '2h 30m', dist: '155 km' },
    'Marrakech Medina -> Imlil': { time: '1h 15m', dist: '65 km' },
    'Marrakech Medina -> Casablanca City': { time: '2h 45m', dist: '240 km' },
    'Marrakech Medina -> Agadir City': { time: '3h 15m', dist: '250 km' },
    'Marrakech Medina -> Taghazout': { time: '3h 30m', dist: '260 km' },
    'Casablanca City -> Rabat': { time: '1h', dist: '85 km' }
  };

  function getRouteMetric(p, d) {
    if (!p || !d) return { time: '1h', dist: '60 km' };
    const k1 = `${p} -> ${d}`;
    const k2 = `${d} -> ${p}`;
    return ROUTE_METRICS[k1] || ROUTE_METRICS[k2] || { time: '1h 30m', dist: '90 km' };
  }

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  }

  // ── 2. HERO BOOKING WIZARD INITIALIZER (SMART SYNC & AUTO-APPEND) ──
  function initHeroWizard() {
    const wizardEl = document.getElementById('heroBookingWizard');
    if (!wizardEl) return;

    const collapseEl = document.getElementById('heroWizardCollapse');
    const openWizardBtn = document.getElementById('openBookingWizardBtn');
    const closeWizardBtn = document.getElementById('hbwCloseBtn');

    const pickupSelect = document.getElementById('hbwPickup');
    const destSelect = document.getElementById('hbwDestination');
    const swapBtn = document.getElementById('hbwSwapBtn');
    const roundTripToggle = document.getElementById('hbwRoundTripToggle');

    const paxMinusBtn = document.getElementById('hbwPaxMinus');
    const paxPlusBtn = document.getElementById('hbwPaxPlus');
    const paxValEl = document.getElementById('hbwPaxVal');
    const tierTabs = wizardEl.querySelectorAll('.hbw-tab-btn');

    const unfilledHint = document.getElementById('hbwUnfilledHint');
    const appendedContainer = document.getElementById('hbwAppendedContainer');

    const priceAmountEl = document.getElementById('hbwPriceAmount');
    const routeTimeEl = document.getElementById('hbwRouteTime');
    const routeDistEl = document.getElementById('hbwRouteDist');
    const vehicleSummaryEl = document.getElementById('hbwVehicleSummary');
    const luggageSummaryEl = document.getElementById('hbwLuggageSummary');

    const dateInput = document.getElementById('hbwDateInput');
    const timeInput = document.getElementById('hbwTimeInput');
    const flightInput = document.getElementById('hbwFlightInput');
    const tripDetailsInput = document.getElementById('hbwTripDetails');

    const childSeatBtn = document.getElementById('hbwChildSeatBtn');
    const payCashBtn = document.getElementById('hbwPayCash');
    const payCardBtn = document.getElementById('hbwPayCard');
    const paymentNoteEl = document.getElementById('hbwPaymentNote');

    const submitBtn = document.getElementById('hbwSubmitBtn');
    const buttonPriceEl = document.getElementById('hbwButtonPrice');

    // Default wizard state
    let state = {
      pickup: '',
      destination: '',
      passengers: 2,
      tier: '1_4', // '1_4', '5_7', '8_12', '13_plus'
      tripType: 'one_way', // 'one_way' or 'round_trip'
      childSeat: false,
      payment: 'cash', // 'cash' or 'card'
      date: '',
      time: '',
      flight: '',
      details: '',
      calculatedPrice: null
    };

    // Set today as min date
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    // Smart sync for passengers counter and vehicle tier tabs
    function setPaxAndTier(newPax, directTier) {
      if (newPax !== undefined) {
        state.passengers = Math.max(1, Math.min(30, newPax));
        if (paxValEl) paxValEl.textContent = state.passengers;

        // Auto-select tab according to passenger capacity
        if (state.passengers >= 13) {
          state.tier = '13_plus';
        } else if (state.passengers >= 8) {
          state.tier = '8_12';
        } else if (state.passengers >= 5) {
          state.tier = '5_7';
        } else {
          state.tier = '1_4';
        }
      } else if (directTier) {
        state.tier = directTier;
        // When clicking a tab directly, set passenger count to a natural default for that tier
        if (directTier === '1_4' && (state.passengers < 1 || state.passengers > 4)) {
          state.passengers = 2;
        } else if (directTier === '5_7' && (state.passengers < 5 || state.passengers > 7)) {
          state.passengers = 5;
        } else if (directTier === '8_12' && (state.passengers < 8 || state.passengers > 12)) {
          state.passengers = 8;
        } else if (directTier === '13_plus' && state.passengers < 13) {
          state.passengers = 13;
        }
        if (paxValEl) paxValEl.textContent = state.passengers;
      }

      // Update tab UI active states
      tierTabs.forEach(tab => {
        const isMatch = tab.getAttribute('data-tier') === state.tier;
        tab.classList.toggle('active', isMatch);
        tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      renderUpdate();
    }

    // Main calculation and view update
    function renderUpdate() {
      state.pickup = pickupSelect ? pickupSelect.value : '';
      state.destination = destSelect ? destSelect.value : '';

      const isFilled = Boolean(state.pickup && state.destination && state.pickup !== state.destination);

      // Smoothly reveal or collapse appended form details
      if (appendedContainer) {
        appendedContainer.classList.toggle('is-visible', isFilled);
      }
      if (unfilledHint) {
        unfilledHint.classList.toggle('is-hidden', isFilled);
      }

      if (!isFilled) {
        state.calculatedPrice = null;
        return;
      }

      // 1. Calculate price
      state.calculatedPrice = lookupRate(state.pickup, state.destination, state.tier, state.tripType);

      // 2. Update price card
      if (priceAmountEl) {
        priceAmountEl.textContent = state.calculatedPrice === 'Custom' ? 'Custom Quote' : state.calculatedPrice + '€';
      }
      if (buttonPriceEl) {
        buttonPriceEl.textContent = state.calculatedPrice === 'Custom' ? 'Quote' : state.calculatedPrice + '€';
      }

      // 3. Update route duration and distance
      const metric = getRouteMetric(state.pickup, state.destination);
      if (routeTimeEl) routeTimeEl.textContent = metric.time;
      if (routeDistEl) routeDistEl.textContent = metric.dist;

      // 4. Update vehicle and luggage summaries
      if (vehicleSummaryEl) {
        if (state.tier === '1_4') vehicleSummaryEl.textContent = 'Sedan · 1–4 passengers';
        else if (state.tier === '5_7') vehicleSummaryEl.textContent = 'Van · 5–7 passengers';
        else if (state.tier === '8_12') vehicleSummaryEl.textContent = 'Minibus · 8–12 passengers';
        else vehicleSummaryEl.textContent = 'Coach / Fleet · 13+ passengers';
      }

      if (luggageSummaryEl) {
        if (state.tier === '1_4') luggageSummaryEl.textContent = 'About 3 suitcases';
        else if (state.tier === '5_7') luggageSummaryEl.textContent = 'About 7 suitcases';
        else if (state.tier === '8_12') luggageSummaryEl.textContent = 'About 12 suitcases';
        else luggageSummaryEl.textContent = 'Large luggage capacity';
      }
    }

    // ── EVENT LISTENERS ──

    // Location changes
    if (pickupSelect) pickupSelect.addEventListener('change', renderUpdate);
    if (destSelect) destSelect.addEventListener('change', renderUpdate);

    // Most booked route pills (quick preset)
    document.querySelectorAll('.htr-route-pill').forEach(pill => {
      pill.addEventListener('click', function (e) {
        e.preventDefault();
        const p = this.getAttribute('data-pickup');
        const d = this.getAttribute('data-dest');
        if (pickupSelect && destSelect && p && d) {
          pickupSelect.value = p;
          destSelect.value = d;
          renderUpdate();
          wizardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    // Swap button
    if (swapBtn) {
      swapBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const p = pickupSelect.value;
        const d = destSelect.value;
        pickupSelect.value = d;
        destSelect.value = p;
        renderUpdate();
      });
    }

    // Round trip toggle button
    if (roundTripToggle) {
      roundTripToggle.addEventListener('click', function (e) {
        e.preventDefault();
        state.tripType = state.tripType === 'one_way' ? 'round_trip' : 'one_way';
        const isRound = state.tripType === 'round_trip';
        roundTripToggle.classList.toggle('active', isRound);
        roundTripToggle.setAttribute('aria-pressed', isRound ? 'true' : 'false');
        renderUpdate();
      });
    }

    // Passenger counter buttons
    if (paxMinusBtn) {
      paxMinusBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setPaxAndTier(state.passengers - 1, null);
      });
    }
    if (paxPlusBtn) {
      paxPlusBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setPaxAndTier(state.passengers + 1, null);
      });
    }

    // Vehicle tier tabs
    tierTabs.forEach(tab => {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        const tier = tab.getAttribute('data-tier') || '1_4';
        setPaxAndTier(undefined, tier);
      });
    });

    // Optional inputs
    if (dateInput) dateInput.addEventListener('change', () => { state.date = dateInput.value; });
    if (timeInput) timeInput.addEventListener('change', () => { state.time = timeInput.value; });
    if (flightInput) flightInput.addEventListener('input', () => { state.flight = flightInput.value.trim(); });
    if (tripDetailsInput) tripDetailsInput.addEventListener('input', () => { state.details = tripDetailsInput.value.trim(); });

    // Child seat toggle pill
    if (childSeatBtn) {
      childSeatBtn.addEventListener('click', function (e) {
        e.preventDefault();
        state.childSeat = !state.childSeat;
        childSeatBtn.classList.toggle('active', state.childSeat);
        childSeatBtn.setAttribute('aria-pressed', state.childSeat ? 'true' : 'false');
        childSeatBtn.innerHTML = state.childSeat
          ? '<span class="hbw-pill-icon">✓</span> Child seat included'
          : '<span class="hbw-pill-icon">+</span> Child seat';
      });
    }

    // Payment method toggle buttons
    if (payCashBtn && payCardBtn) {
      payCashBtn.addEventListener('click', function (e) {
        e.preventDefault();
        state.payment = 'cash';
        payCashBtn.classList.add('active');
        payCashBtn.setAttribute('aria-checked', 'true');
        payCardBtn.classList.remove('active');
        payCardBtn.setAttribute('aria-checked', 'false');
        if (paymentNoteEl) paymentNoteEl.textContent = 'ⓘ Pay the driver on the day, in euros or dirhams.';
      });
      payCardBtn.addEventListener('click', function (e) {
        e.preventDefault();
        state.payment = 'card';
        payCardBtn.classList.add('active');
        payCardBtn.setAttribute('aria-checked', 'true');
        payCashBtn.classList.remove('active');
        payCashBtn.setAttribute('aria-checked', 'false');
        if (paymentNoteEl) paymentNoteEl.textContent = 'ⓘ We will send a secure online payment link via WhatsApp after confirmation.';
      });
    }

    // WhatsApp Submit
    if (submitBtn) {
      submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!state.pickup || !state.destination) {
          alert('Please select a pickup location and destination.');
          return;
        }

        let vehicleLabel = 'Sedan (1–4 passengers)';
        if (state.tier === '5_7') vehicleLabel = 'Mercedes Van (5–7 passengers)';
        else if (state.tier === '8_12') vehicleLabel = 'Minibus (8–12 passengers)';
        else if (state.tier === '13_plus') vehicleLabel = 'Large Coach / Multiple Vehicles (13+ passengers)';

        let msg = `Salam Roam Morocco! I would like to book a private transfer:\n\n`;
        msg += `📍 *From:* ${state.pickup}\n`;
        msg += `🏁 *To:* ${state.destination}\n`;
        msg += `🚗 *Trip Type:* ${state.tripType === 'round_trip' ? 'Round Trip (-10% return applied)' : 'One Way Direct'}\n`;
        msg += `👥 *Passengers:* ${state.passengers} (${vehicleLabel})\n`;
        if (state.date) msg += `📅 *Date:* ${state.date}${state.time ? ' at ' + state.time : ''}\n`;
        if (state.flight) msg += `✈️ *Flight Number:* ${state.flight}\n`;
        if (state.childSeat) msg += `👶 *Child Seat:* 1 requested\n`;
        if (state.details) msg += `📝 *Notes/Pickup:* ${state.details}\n`;
        msg += `💳 *Payment Method:* ${state.payment === 'cash' ? 'Cash to driver on arrival' : 'Card via secure link'}\n`;
        msg += `💰 *Quoted Rate:* ${state.calculatedPrice === 'Custom' ? 'Custom Quote Requested' : state.calculatedPrice + '€ total for group'}\n\n`;
        msg += `Could you please confirm driver availability? Shukran!`;

        const waUrl = `https://wa.me/${RM_PHONE}?text=${encodeURIComponent(msg)}`;

        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', {
            event_category: 'booking_wizard',
            event_label: `${state.pickup} -> ${state.destination}`,
            value: typeof state.calculatedPrice === 'number' ? state.calculatedPrice : 50,
            currency: 'EUR'
          });
        }

        if (isMobileDevice()) {
          window.open(waUrl, '_blank');
        } else {
          openQrModal(waUrl, msg);
        }
      });
    }

    // ── Open / Close Collapse Handling ──
    function openHeroWizard(shouldScroll) {
      if (collapseEl) collapseEl.classList.add('is-open');
      if (wizardEl) wizardEl.classList.add('is-open');
      if (openWizardBtn) {
        openWizardBtn.classList.add('is-active');
        openWizardBtn.setAttribute('aria-expanded', 'true');
      }
      if (shouldScroll) {
        setTimeout(() => {
          const target = collapseEl || wizardEl;
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 120);
      }
    }

    function closeHeroWizard() {
      if (collapseEl) collapseEl.classList.remove('is-open');
      if (wizardEl) wizardEl.classList.remove('is-open');
      if (openWizardBtn) {
        openWizardBtn.classList.remove('is-active');
        openWizardBtn.setAttribute('aria-expanded', 'false');
      }
    }

    function toggleHeroWizard() {
      const target = collapseEl || wizardEl;
      if (!target) return;
      if (target.classList.contains('is-open')) {
        closeHeroWizard();
      } else {
        openHeroWizard(true);
      }
    }

    if (openWizardBtn) {
      openWizardBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleHeroWizard();
      });
    }

    if (closeWizardBtn) {
      closeWizardBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeHeroWizard();
      });
    }

    // Default state: Always visible on hero per user requirement
    if (collapseEl) collapseEl.classList.add('is-open');
    if (wizardEl) wizardEl.classList.add('is-open');

    // Run initial passenger counter setup
    setPaxAndTier(2, null);

    // URL search params support for route pre-selection
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlFrom = urlParams.get('from') || urlParams.get('pickup');
      const urlTo = urlParams.get('to') || urlParams.get('dest');
      const urlTier = urlParams.get('tier');

      if (urlTier) {
        setPaxAndTier(undefined, urlTier);
      }
      if (urlFrom && pickupSelect) {
        for (let i = 0; i < pickupSelect.options.length; i++) {
          if (pickupSelect.options[i].value.toLowerCase().includes(urlFrom.toLowerCase())) {
            pickupSelect.selectedIndex = i;
            state.pickup = pickupSelect.options[i].value;
            break;
          }
        }
      }
      if (urlTo && destSelect) {
        for (let i = 0; i < destSelect.options.length; i++) {
          if (destSelect.options[i].value.toLowerCase().includes(urlTo.toLowerCase())) {
            destSelect.selectedIndex = i;
            state.destination = destSelect.options[i].value;
            break;
          }
        }
      }
      if (state.pickup && state.destination) {
        updateCalculation();
      }
    } catch (err) {}
  }

  // ── 3. DESKTOP QR CODE MODAL ──
  function openQrModal(waUrl, rawMessage) {
    let modal = document.getElementById('wizardQrModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'wizardQrModal';
      modal.className = 'wizard-qr-modal-overlay';
      modal.innerHTML = `
        <div class="wizard-qr-modal-card">
          <button type="button" class="wizard-qr-close" id="wizardQrClose" aria-label="Close modal">&times;</button>
          <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(200,164,92,0.15);color:#8c6a28;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;text-transform:uppercase;margin-bottom:8px;">
            <span>●</span> Direct WhatsApp Desk
          </div>
          <h3 style="font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:800;margin:0 0 6px;color:#111827;">Instant Booking Confirmation</h3>
          <p style="font-family:'Inter',sans-serif;font-size:13px;color:#6b7280;margin:0 0 16px;">Scan with your phone camera to chat instantly with our Marrakech operations desk.</p>
          <img id="wizardQrImg" class="wizard-qr-img" src="" alt="Scan QR Code to WhatsApp">
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:14px;">
            <a id="wizardWebBtn" class="wizard-web-link" href="#" target="_blank" rel="noopener">Open WhatsApp Web on Desktop &rarr;</a>
            <a id="wizardEmailBtn" href="#" style="font-size:12px;color:#4b5563;text-decoration:underline;">Prefer Email? Send booking request via email</a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = document.getElementById('wizardQrClose');
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    const qrImg = document.getElementById('wizardQrImg');
    const webBtn = document.getElementById('wizardWebBtn');
    const emailBtn = document.getElementById('wizardEmailBtn');

    if (qrImg) {
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(waUrl)}`;
    }
    if (webBtn) {
      webBtn.href = `https://web.whatsapp.com/send?phone=${RM_PHONE}&text=${encodeURIComponent(rawMessage)}`;
    }
    if (emailBtn) {
      const emailSubject = encodeURIComponent('Booking Inquiry — Roam Morocco Private Tour');
      const emailBody = encodeURIComponent(rawMessage.replace(/[*_]/g, ''));
      emailBtn.href = `mailto:contact@roammorocco.tours?subject=${emailSubject}&body=${emailBody}`;
    }

    modal.classList.add('open');
  }

  // ── 4. SUBPAGE PRE-LOCKED ROUTE BOOKING CARDS ──
  function initSubpagePreLockedCards() {
    const cards = document.querySelectorAll('.dest-prelocked-widget');
    if (!cards.length) return;

    cards.forEach(card => {
      const tourName = card.getAttribute('data-tour-name') || 'Private Morocco Tour';
      const prices = {
        '1_4': parseInt(card.getAttribute('data-price-1-4'), 10) || 180,
        '5_7': parseInt(card.getAttribute('data-price-5-7'), 10) || 230,
        '8_12': parseInt(card.getAttribute('data-price-8-12'), 10) || 310
      };
      const pickupSelect = card.querySelector('.dest-prelocked-city');
      const dateInput = card.querySelector('.dest-prelocked-date');
      const tierBtns = card.querySelectorAll('.dest-tier-btn');
      const priceNum = card.querySelector('.dest-prelocked-price-num');
      const waBtn = card.querySelector('.dest-prelocked-wa-btn');
      const waBtnPrice = card.querySelector('.dest-prelocked-btn-price');

      let currentTier = '1_4';

      // Check URL search params for tier preselection (e.g. ?tier=5_7)
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const requestedTier = urlParams.get('tier');
        if (requestedTier && prices[requestedTier]) {
          currentTier = requestedTier;
          tierBtns.forEach(b => {
            const match = b.getAttribute('data-tier') === currentTier;
            b.classList.toggle('active', match);
          });
        }
      } catch (err) {}

      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
      }

      function getCitySurcharge() {
        if (!pickupSelect || !pickupSelect.selectedOptions || !pickupSelect.selectedOptions[0]) return 0;
        const s = pickupSelect.selectedOptions[0].getAttribute('data-surcharge');
        return s ? (parseInt(s, 10) || 0) : 0;
      }

      function updateCard() {
        const basePrice = prices[currentTier] || prices['1_4'];
        const currentPrice = basePrice + getCitySurcharge();

        if (priceNum) priceNum.textContent = currentPrice + '€';
        if (waBtnPrice) waBtnPrice.textContent = '— ' + currentPrice + '€';

        // Also update sticky mobile bar if exists
        const stickyPrice = document.querySelector('.smt-price-num');
        if (stickyPrice) stickyPrice.textContent = currentPrice + '€';
      }

      tierBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          tierBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentTier = btn.getAttribute('data-tier') || '1_4';
          updateCard();
        });
      });

      if (dateInput) dateInput.addEventListener('change', updateCard);
      if (pickupSelect) pickupSelect.addEventListener('change', updateCard);

      if (waBtn) {
        waBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const pickupCity = pickupSelect ? pickupSelect.value : 'Marrakech';
          const travelDate = dateInput ? dateInput.value : '';
          const basePrice = prices[currentTier] || prices['1_4'];
          const currentPrice = basePrice + getCitySurcharge();

          let vehicleLabel = 'Private Sedan / 4x4 Prado (1-4 pax)';
          if (currentTier === '5_7') vehicleLabel = 'Mercedes VIP Van (5-7 pax)';
          else if (currentTier === '8_12') vehicleLabel = 'VIP Minibus (8-12 pax)';

          let msg = `Salam Roam Morocco! I want to book the *${tourName}*:\n\n`;
          msg += `📍 *Departure City:* ${pickupCity}\n`;
          msg += `🚗 *Vehicle:* ${vehicleLabel}\n`;
          if (travelDate) msg += `📅 *Preferred Date:* ${travelDate}\n`;
          msg += `💰 *Confirmed Starting Price:* ${currentPrice}€ for our private group\n`;
          msg += `💳 *Payment:* Cash to driver / Card upon arrival\n\n`;
          msg += `Can you please confirm driver & itinerary availability?`;

          const waUrl = `https://wa.me/${RM_PHONE}?text=${encodeURIComponent(msg)}`;

          if (typeof gtag === 'function') {
            gtag('event', 'generate_lead', {
              event_category: 'tour_prelocked_card',
              event_label: tourName,
              value: currentPrice,
              currency: 'EUR'
            });
          }

          if (isMobileDevice()) {
            window.open(waUrl, '_blank');
          } else {
            openQrModal(waUrl, msg);
          }
        });
      }

      updateCard();
    });
  }

  // ── 5. STICKY MOBILE TOUR BAR (<900px) ──
  function initStickyMobileTourBar() {
    const bar = document.querySelector('.sticky-mobile-tour-bar');
    if (!bar) return;

    function handleScroll() {
      if (document.body.classList.contains('mobile-drawer-open')) {
        bar.classList.remove('visible');
        return;
      }
      if (window.scrollY > 320) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initHeroWizard();
      initSubpagePreLockedCards();
      initStickyMobileTourBar();
    });
  } else {
    initHeroWizard();
    initSubpagePreLockedCards();
    initStickyMobileTourBar();
  }
})();
