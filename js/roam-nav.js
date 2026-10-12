/**
 * Roam Morocco Unified Navigation & Header Controller
 * Handles dynamic morphing navbar, scroll detection, mobile drawer, and back-to-top button.
 */

(function () {
  function initNav() {
    const bBtn = document.getElementById("burgerBtn");
    const mDraw = document.getElementById("mobileDrawer");

    if (bBtn && mDraw) {
      bBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mDraw.classList.toggle("open");
      });

      document.addEventListener("click", (e) => {
        if (!mDraw.contains(e.target) && !bBtn.contains(e.target)) {
          mDraw.classList.remove("open");
        }
      });
    }

    // Official WhatsApp SVG and Contextual Message Controller
    const WA_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.19 8.19 0 0 1-5.82 2.42c-1.42 0-2.82-.37-4.05-1.08l-.29-.17-3.11.82.83-3.03-.19-.3a8.21 8.21 0 0 1-1.25-4.46c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>';
    
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
      topLatest.innerHTML = `${WA_SVG}<span>WhatsApp</span>`;
    }

    if (mDraw) {
      const drawerInner = mDraw.querySelector(".mobile-drawer-inner");
      if (drawerInner && !drawerInner.querySelector(".mobile-wa-cta")) {
        const mobWa = document.createElement("a");
        mobWa.className = "mobile-wa-cta";
        mobWa.target = "_blank";
        mobWa.rel = "noopener";
        mobWa.onclick = window.closeDrawer;
        mobWa.href = waUrl;
        mobWa.innerHTML = `${WA_SVG}<span>Chat on WhatsApp</span>`;
        drawerInner.appendChild(mobWa);
      }
    }

    const isSubfolder = window.location.pathname.includes('/blog/');
    const darkLogo = isSubfolder ? '../img/logo-for-dark-bg.png' : 'img/logo-for-dark-bg.png';
    const lightLogo = isSubfolder ? '../img/logo-for-light-bg.png' : 'img/logo-for-light-bg.png';

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
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Global back-to-top handler
    window.scrollToTop = function (e) {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.closeDrawer = function () {
      if (mDraw) mDraw.classList.remove("open");
    };

    // Global Accordion Handler (.faq-item / .faq-question)
    document.addEventListener("click", function (e) {
      const q = e.target.closest(".faq-question");
      if (!q) return;
      const item = q.closest(".faq-item");
      if (!item) return;
      const parent = item.parentElement;
      const isActive = item.classList.contains("active");
      if (parent && parent.classList.contains("faq-accordion")) {
        const siblings = parent.querySelectorAll(".faq-item");
        siblings.forEach(function (s) { s.classList.remove("active"); });
      }
      if (!isActive) {
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
