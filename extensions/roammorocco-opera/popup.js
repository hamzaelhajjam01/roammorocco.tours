/**
 * Roam Morocco Travel Companion — Extension Controller
 * Handles currency conversion, tipping calculation, tab switching, and navigation.
 */

(function () {
  // Exchange rates: 1 Foreign Unit = X Moroccan Dirhams (MAD)
  const RATES = {
    USD: { rate: 9.95, symbol: "$" },
    EUR: { rate: 10.85, symbol: "€" },
    GBP: { rate: 12.95, symbol: "£" },
    CAD: { rate: 7.35, symbol: "CA$" },
    AUD: { rate: 6.65, symbol: "AU$" },
    CHF: { rate: 11.20, symbol: "Fr" }
  };

  // State
  let currentCurrency = "USD";
  let activeTipMode = "restaurant";

  // Elements
  const tabButtons = document.querySelectorAll(".ext-tab-btn");
  const tabPanels = document.querySelectorAll(".ext-tab-panel");
  const currencySelect = document.getElementById("currencySelect");
  const foreignAmount = document.getElementById("foreignAmount");
  const madAmount = document.getElementById("madAmount");
  const foreignSymbol = document.getElementById("foreignSymbol");
  const rateDisplay = document.getElementById("rateDisplay");
  const swapBtn = document.getElementById("swapBtn");
  const presetButtons = document.querySelectorAll(".preset-btn");
  const tipOptions = document.querySelectorAll(".tip-option");
  const billInput = document.getElementById("billInput");
  const tipResultAmount = document.getElementById("tipResultAmount");

  // Tab Switching
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = "tab-" + btn.getAttribute("data-tab");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // Conversion Functions
  function updateFromForeign() {
    const val = parseFloat(foreignAmount.value);
    if (isNaN(val) || val < 0) {
      madAmount.value = "";
      return;
    }
    const rate = RATES[currentCurrency].rate;
    const mad = (val * rate).toFixed(2);
    madAmount.value = mad.replace(/\.00$/, "");
  }

  function updateFromMad() {
    const val = parseFloat(madAmount.value);
    if (isNaN(val) || val < 0) {
      foreignAmount.value = "";
      return;
    }
    const rate = RATES[currentCurrency].rate;
    const foreign = (val / rate).toFixed(2);
    foreignAmount.value = foreign.replace(/\.00$/, "");
  }

  function updateRateDisplay() {
    const cur = RATES[currentCurrency];
    foreignSymbol.textContent = cur.symbol;
    rateDisplay.textContent = `1 ${currentCurrency} ≈ ${cur.rate} MAD`;

    // Update preset button labels
    presetButtons.forEach((btn) => {
      const v = btn.getAttribute("data-val");
      btn.textContent = `${cur.symbol}${v}`;
    });

    updateFromForeign();
  }

  // Currency Selection Event
  currencySelect.addEventListener("change", (e) => {
    currentCurrency = e.target.value;
    updateRateDisplay();
    savePreferredCurrency(currentCurrency);
  });

  foreignAmount.addEventListener("input", updateFromForeign);
  madAmount.addEventListener("input", updateFromMad);

  // Swap Button
  swapBtn.addEventListener("click", () => {
    if (document.activeElement === foreignAmount) {
      madAmount.focus();
    } else {
      foreignAmount.focus();
    }
    // Subtle button animation
    swapBtn.style.transform = "rotate(180deg)";
    setTimeout(() => {
      swapBtn.style.transform = "";
    }, 250);
  });

  // Quick Presets
  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = parseFloat(btn.getAttribute("data-val"));
      foreignAmount.value = val;
      updateFromForeign();
    });
  });

  // Tipping Calculator Logic
  function calculateTip() {
    const bill = parseFloat(billInput.value) || 0;
    if (activeTipMode === "restaurant") {
      const tip = Math.round(bill * 0.10);
      tipResultAmount.textContent = `${Math.max(10, tip)} MAD (10%)`;
    } else if (activeTipMode === "luggage") {
      tipResultAmount.textContent = "20–30 MAD (Per bag/porter)";
    } else if (activeTipMode === "driver") {
      tipResultAmount.textContent = "150–200 MAD / day";
    }
  }

  tipOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      tipOptions.forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      activeTipMode = opt.getAttribute("data-tip");

      const tipCalcBox = document.getElementById("tipCalcBox");
      if (activeTipMode === "restaurant") {
        billInput.parentElement.style.display = "flex";
        billInput.previousElementSibling.style.display = "inline";
        document.querySelector(".small-label").style.display = "block";
      } else {
        billInput.parentElement.style.display = "none";
        document.querySelector(".small-label").style.display = "none";
      }

      calculateTip();
    });
  });

  billInput.addEventListener("input", calculateTip);

  // Storage Persistence Helper (Chrome/Firefox/Edge compatible)
  function savePreferredCurrency(curr) {
    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ preferredCurrency: curr });
      } else {
        localStorage.setItem("roam_preferred_curr", curr);
      }
    } catch (e) {
      // Ignore storage errors in restricted contexts
    }
  }

  function loadPreferredCurrency() {
    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(["preferredCurrency"], (res) => {
          if (res && res.preferredCurrency && RATES[res.preferredCurrency]) {
            currentCurrency = res.preferredCurrency;
            currencySelect.value = currentCurrency;
            updateRateDisplay();
          }
        });
      } else {
        const saved = localStorage.getItem("roam_preferred_curr");
        if (saved && RATES[saved]) {
          currentCurrency = saved;
          currencySelect.value = currentCurrency;
          updateRateDisplay();
        }
      }
    } catch (e) {
      // Fallback to default
    }
  }

  // Ensure all external links open in a new browser tab cleanly
  document.querySelectorAll("a[href^='http']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const url = link.getAttribute("href");
      if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
        e.preventDefault();
        chrome.tabs.create({ url: url });
      }
    });
  });

  // Initialize
  loadPreferredCurrency();
  updateRateDisplay();
  calculateTip();
})();
