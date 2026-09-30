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
