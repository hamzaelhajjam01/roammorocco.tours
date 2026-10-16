/**
 * Roam Morocco Unified Navigation & Header Controller
 * Handles dynamic morphing navbar, scroll detection, mobile drawer, and back-to-top button.
 */

(function () {
  function initNav() {
    const bBtn = document.getElementById("burgerBtn");
    const mDraw = document.getElementById("mobileDrawer");

    // Create backdrop overlay if not present
    let backdrop = document.getElementById("mobileDrawerBackdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "mobileDrawerBackdrop";
      backdrop.className = "mobile-drawer-backdrop";
      document.body.appendChild(backdrop);
    }

    function updateDrawerPosition() {
      if (!mDraw) return;
      const topEl = document.querySelector(".top");
      if (!topEl) return;
      if (topEl.classList.contains("at-top")) {
        const rect = topEl.getBoundingClientRect();
        mDraw.style.top = Math.round(rect.bottom + 10) + "px";
        mDraw.style.bottom = "auto";
      } else {
        mDraw.style.top = "auto";
        mDraw.style.bottom = "calc(72px + env(safe-area-inset-bottom, 0px))";
      }
    }

    function openDrawer() {
      if (!mDraw) return;
      updateDrawerPosition();
      mDraw.classList.add("open");
      document.body.classList.add("mobile-drawer-open");
      if (backdrop) backdrop.classList.add("active");
      const cTrig = document.getElementById("rmConciergeTrigger");
      if (cTrig) cTrig.classList.add("rm-hidden");
    }

    function closeDrawer() {
      if (!mDraw) return;
      mDraw.classList.remove("open");
      document.body.classList.remove("mobile-drawer-open");
      if (backdrop) backdrop.classList.remove("active");
      const cTrig = document.getElementById("rmConciergeTrigger");
      if (cTrig) cTrig.classList.remove("rm-hidden");
    }

    function toggleDrawer(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!mDraw) return;
      if (mDraw.classList.contains("open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    // Expose global methods
    window.toggleDrawer = toggleDrawer;
    window.closeDrawer = closeDrawer;

    if (bBtn && mDraw) {
      // Direct onclick ensures precedence over any inline duplicate handlers
      bBtn.onclick = toggleDrawer;

      // Passive false touchend for instantaneous mobile responsiveness
      bBtn.addEventListener("touchend", function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDrawer();
      }, { passive: false });
    }

    if (backdrop) {
      backdrop.addEventListener("click", closeDrawer);
      backdrop.addEventListener("touchstart", function (e) {
        e.preventDefault();
        closeDrawer();
      }, { passive: false });
    }

    // Close when clicking any link inside drawer
    if (mDraw) {
      mDraw.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          closeDrawer();
        });
      });
    }

    // Close when clicking outside drawer
    document.addEventListener("click", function (e) {
      if (mDraw && mDraw.classList.contains("open")) {
        if (!mDraw.contains(e.target) && (!bBtn || !bBtn.contains(e.target))) {
          closeDrawer();
        }
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mDraw && mDraw.classList.contains("open")) {
        closeDrawer();
      }
    });

    window.addEventListener("resize", function () {
      if (mDraw && mDraw.classList.contains("open")) {
        updateDrawerPosition();
      }
    });

    const isSubfolder = window.location.pathname.includes('/blog/') || window.location.pathname.includes('/transfers/');
    const waLogoSrc = '/img/whatsapp-logo.png';
    const WA_IMG = `<img src="${waLogoSrc}" alt="WhatsApp" width="20" height="20" class="wa-btn-icon">`;
    
    function getContextWhatsAppMessage() {
      const path = (window.location.pathname || '').toLowerCase();
      if (path.includes('private-driver')) {
        return "Salam Roam Morocco! I'd like to check chauffeur availability and rates for a private driver in Morocco.";
      }
      if (path.includes('cost-calculator')) {
        return "Salam Roam Morocco! I'd like to calculate and discuss my Morocco trip budget.";
      }
      if (path.includes('active-atlas')) {
        return "Salam Roam Morocco! I'm interested in booking the Active High Atlas & Toubkal Tour.";
      }
      if (path.includes('heritage-cinema')) {
        return "Salam Roam Morocco! I'd like to book the Heritage & Cinema Tour (Ait Benhaddou / Ouarzazate).";
      }
      if (path.includes('premium-explorer')) {
        return "Salam Roam Morocco! I want to book the 3-Day Sahara Premium Explorer Tour.";
      }
      if (path.includes('custom-morocco')) {
        return "Salam Roam Morocco! I'd like to plan a custom tour in Morocco.";
      }
      if (path.includes('/blog/')) {
        const cleanTitle = (document.title || '').split(/—|\||-/)[0].trim();
        return `Salam Roam Morocco! I was reading your guide on "${cleanTitle}" and have a few questions.`;
      }
      return "Salam Roam Morocco! I'd like to plan a custom tour in Morocco.";
    }

    const waMsg = getContextWhatsAppMessage();
    const waUrl = `https://wa.me/212653506441?text=${encodeURIComponent(waMsg)}`;

    const topLatest = document.querySelector(".top .latest");
    if (topLatest) {
      topLatest.classList.add("nav-wa-btn");
      topLatest.href = waUrl;
      topLatest.target = "_blank";
      topLatest.rel = "noopener";
      topLatest.setAttribute("aria-label", "Chat on WhatsApp");
      topLatest.innerHTML = `${WA_IMG}<span>WhatsApp</span>`;
    }

    if (mDraw) {
      const drawerInner = mDraw.querySelector(".mobile-drawer-inner");
      if (drawerInner) {
        let mobWa = drawerInner.querySelector(".mobile-wa-cta");
        if (!mobWa) {
          mobWa = document.createElement("a");
          mobWa.className = "mobile-wa-cta";
          mobWa.target = "_blank";
          mobWa.rel = "noopener";
          mobWa.onclick = closeDrawer;
          drawerInner.appendChild(mobWa);
        }
        mobWa.href = waUrl;
        mobWa.innerHTML = `${WA_IMG}<span>Chat on WhatsApp</span>`;
      }
    }

    // Ensure all WhatsApp buttons on the page display ONLY the official logo and white text
    document.querySelectorAll('.roam-btn-wa, .d-btn-wa, .btn-wa-solid, .c-wa-trigger-btn, .rm-wa-btn').forEach(function (btn) {
      // Remove any stray SVG icons (chat bubbles, speech icons, etc.)
      const svgs = btn.querySelectorAll('svg');
      svgs.forEach(function (s) { s.remove(); });

      // Remove any chat emojis or stray characters
      if (btn.innerHTML.includes('💬')) {
        btn.innerHTML = btn.innerHTML.replace(/💬/g, '').trim();
      }

      // Check if button has the official WhatsApp image logo
      let img = btn.querySelector('.wa-btn-icon') || btn.querySelector('img[src*="whatsapp"]');
      if (!img) {
        img = document.createElement('img');
        img.src = waLogoSrc;
        img.alt = 'WhatsApp';
        img.className = 'wa-btn-icon';
        img.width = 20;
        img.height = 20;
        img.style.verticalAlign = 'middle';
        img.style.marginRight = '8px';
        btn.insertBefore(img, btn.firstChild);
      } else {
        img.style.verticalAlign = 'middle';
        img.style.marginRight = '8px';
      }

      // Normalize action text to "Plan on WhatsApp" in clean white
      const rawText = btn.textContent.trim().toLowerCase();
      if (!rawText.includes('plan on whatsapp')) {
        btn.innerHTML = '';
        btn.appendChild(img);
        const span = document.createElement('span');
        span.textContent = 'Plan on WhatsApp';
        span.style.color = '#ffffff';
        btn.appendChild(span);
      } else {
        let span = btn.querySelector('span');
        if (span) {
          span.style.color = '#ffffff';
        }
      }

      // Enforce white text styling on the button itself
      btn.style.setProperty('color', '#ffffff', 'important');
      btn.style.setProperty('text-decoration', 'none', 'important');
    });

    const darkLogo = '/img/logo-for-dark-bg.png?v=20261015_v2';
    const lightLogo = '/img/logo-for-light-bg.png?v=20261015_v2';

    function onScroll() {
      const currentY = window.scrollY;
      const topEl = document.querySelector(".top");
      const logo = document.getElementById('navLogo');

      if (topEl) {
        if (currentY < 70) {
          topEl.classList.add("at-top");
          topEl.classList.remove("at-bottom");
          if (logo) logo.src = darkLogo;
        } else {
          topEl.classList.add("at-bottom");
          topEl.classList.remove("at-top");
          if (logo) logo.src = lightLogo;
        }
        if (mDraw && mDraw.classList.contains("open")) {
          updateDrawerPosition();
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Global back-to-top handler
    window.scrollToTop = function (e) {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Global Accordion Handler (.faq-item / .faq-question)
    document.addEventListener("click", function (e) {
      const q = e.target.closest(".faq-question, .roam-faq-q, .roam-faq-question");
      if (!q) return;
      if (e.__faqHandled) return;
      e.__faqHandled = true;

      const item = q.closest(".faq-item, .roam-faq-item");
      if (!item) return;

      const container = item.closest(".faq-accordion, .roam-faq-section, .roam-faq-block") || item.parentElement;
      const wasActive = item.classList.contains("active");

      if (container) {
        const siblings = container.querySelectorAll(".faq-item, .roam-faq-item");
        siblings.forEach(function (s) { s.classList.remove("active"); });
      }

      if (!wasActive) {
        item.classList.add("active");
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
