/**
 * Roam Morocco Luxury Multilingual Controller (i18n)
 * Supports English (en), French (fr), Spanish (es), German (de), Italian (it)
 * Features:
 * - Seamless in-place translation across all 176 pages
 * - Automatic browser locale detection on first visit
 * - Persistent language preference in localStorage & cookies
 * - Real-time UI updates (flags, codes, active checkmarks)
 * - Complete suppression of default third-party translation frames/banners
 */

(function () {
  const SUPPORTED_LANGS = {
    en: { code: 'EN', name: 'English', flag: '🇬🇧' },
    fr: { code: 'FR', name: 'Français', flag: '🇫🇷' },
    es: { code: 'ES', name: 'Español', flag: '🇪🇸' },
    de: { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    it: { code: 'IT', name: 'Italiano', flag: '🇮🇹' }
  };

  const STORAGE_KEY = 'roam_selected_language';

  // 1. Determine active language (localStorage -> cookie -> browser auto-detection -> default 'en')
  function getInitialLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGS[stored]) {
        return stored;
      }

      // Check existing cookie
      const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
      if (match) {
        const parts = match[1].split('/');
        const lang = parts[parts.length - 1];
        if (lang && SUPPORTED_LANGS[lang]) {
          return lang;
        }
      }

      // Auto-detect browser language for European tourists
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('de')) return 'de';
      if (browserLang.startsWith('it')) return 'it';
    } catch (e) {
      // fallback
    }
    return 'en';
  }

  let currentLang = getInitialLanguage();

  // 2. Set Cookie across current host and root path
  function setTransCookie(lang) {
    const val = lang === 'en' ? '' : `/en/${lang}`;
    const expires = lang === 'en' ? 'Thu, 01 Jan 1970 00:00:00 UTC' : 'Fri, 31 Dec 2030 23:59:59 UTC';
    const domain = window.location.hostname;

    document.cookie = `googtrans=${val}; expires=${expires}; path=/;`;
    document.cookie = `googtrans=${val}; expires=${expires}; path=/; domain=${domain};`;
    if (domain.includes('.')) {
      document.cookie = `googtrans=${val}; expires=${expires}; path=/; domain=.${domain};`;
    }
  }

  // 3. Update all UI elements
  function updateUI(lang) {
    const info = SUPPORTED_LANGS[lang] || SUPPORTED_LANGS.en;

    // Update Desktop button flag & code
    const flagEl = document.getElementById('currentLangFlag');
    const codeEl = document.getElementById('currentLangCode');
    if (flagEl) flagEl.textContent = info.flag;
    if (codeEl) codeEl.textContent = info.code;

    // Update Desktop Dropdown active states
    document.querySelectorAll('.lang-row-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update Mobile Drawer active states
    document.querySelectorAll('.mob-lang-pill').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // 4. Trigger DOM translation via Google Translate Element combo
  function applyLanguage(lang, reloadIfNeeded) {
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    setTransCookie(lang);
    updateUI(lang);

    const select = document.querySelector('.goog-te-combo');
    if (select) {
      if (select.value !== lang) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      }
    } else {
      // If combo not ready yet and lang is not English, reload to let cookie take effect
      if (reloadIfNeeded) {
        window.location.reload();
      }
    }
  }

  // 5. Initialize Google Translate Element SDK
  window.googleTranslateElementInit = function () {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr,es,de,it',
        autoDisplay: false
      }, 'google_translate_element');

      // Check after load if currentLang needs to be selected
      setTimeout(() => {
        const select = document.querySelector('.goog-te-combo');
        if (select && currentLang !== 'en') {
          select.value = currentLang;
          select.dispatchEvent(new Event('change'));
        }
      }, 250);
    }
  };

  function loadGoogleTranslateSDK() {
    // Ensure hidden mount container exists
    let mount = document.getElementById('google_translate_element');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'google_translate_element';
      mount.style.cssText = 'display:none!important;visibility:hidden!important;position:absolute;top:-9999px;';
      document.body.appendChild(mount);
    }

    if (!document.getElementById('google-translate-sdk')) {
      const script = document.createElement('script');
      script.id = 'google-translate-sdk';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  // 6. Bind click events
  function initEvents() {
    updateUI(currentLang);

    // Desktop and Mobile Buttons
    document.addEventListener('click', function (e) {
      const langBtn = e.target.closest('.lang-row-btn, .mob-lang-pill');
      if (langBtn) {
        e.preventDefault();
        e.stopPropagation();
        const selected = langBtn.getAttribute('data-lang');
        if (selected && SUPPORTED_LANGS[selected]) {
          applyLanguage(selected, true);
        }
      }
    });

    // Auto-apply initial language if non-English
    if (currentLang !== 'en') {
      setTransCookie(currentLang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initEvents();
      loadGoogleTranslateSDK();
    });
  } else {
    initEvents();
    loadGoogleTranslateSDK();
  }
})();
