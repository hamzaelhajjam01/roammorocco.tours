/**
 * Roam Morocco — Dynamic Sticky & Mobile-Friendly Table of Contents Controller
 * Automatically generates a sticky sidebar TOC for desktop,
 * and a floating capsule button + bottom drawer for mobile.
 */

(function () {
  function initDynamicTOC() {
    // 1. Identify article content
    const content = document.querySelector(".article-content") || document.querySelector(".roam-article-body");
    if (!content) return;

    // 2. Query all h2 headings
    const headings = Array.from(content.querySelectorAll("h2"));
    if (headings.length < 2) return; // Only generate if at least 2 headings exist

    // Helper: Slugify title to create clean ID
    function slugify(text) {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
        .substring(0, 50);
    }

    // 3. Ensure every heading has a unique ID and record list
    const tocItems = headings.map((h2, idx) => {
      if (!h2.id) {
        h2.id = "section-" + (idx + 1) + "-" + slugify(h2.textContent || "heading");
      }
      return {
        id: h2.id,
        text: h2.textContent.replace(/^\s*\d+[\.\)]\s*/, "").trim(), // Strip leading numbering if present
        element: h2
      };
    });

    // 4. Build Desktop Sidebar
    const sidebar = document.createElement("aside");
    sidebar.className = "roam-toc-sidebar";
    sidebar.setAttribute("aria-label", "Table of Contents");

    const header = document.createElement("div");
    header.className = "roam-toc-header";
    header.innerHTML = `
      <span class="roam-toc-title">Table of Contents</span>
      <span class="roam-toc-progress-text" id="roamTocProgress">0%</span>
    `;

    const progressTrack = document.createElement("div");
    progressTrack.className = "roam-toc-progress-track";
    progressTrack.innerHTML = `<div class="roam-toc-progress-bar" id="roamTocBar"></div>`;

    const desktopList = document.createElement("ul");
    desktopList.className = "roam-toc-list";

    tocItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "roam-toc-item";
      const a = document.createElement("a");
      a.className = "roam-toc-link";
      a.href = "#" + item.id;
      a.textContent = item.text;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(item.id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          history.pushState(null, "", "#" + item.id);
        }
      });
      li.appendChild(a);
      desktopList.appendChild(li);
    });

    sidebar.appendChild(header);
    sidebar.appendChild(progressTrack);
    sidebar.appendChild(desktopList);

    // 5. Wrap content and sidebar into .roam-article-layout
    const layout = document.createElement("div");
    layout.className = "roam-article-layout";
    content.parentNode.insertBefore(layout, content);
    layout.appendChild(content);
    layout.appendChild(sidebar);

    // 6. Build Mobile Floating Button & Drawer
    const mobileBtn = document.createElement("button");
    mobileBtn.className = "roam-mobile-toc-btn";
    mobileBtn.setAttribute("aria-label", "Open Table of Contents");
    mobileBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
      <span>Contents</span>
    `;

    const overlay = document.createElement("div");
    overlay.className = "roam-toc-modal-overlay";

    const modal = document.createElement("div");
    modal.className = "roam-toc-modal";
    modal.innerHTML = `
      <div class="roam-toc-modal-header">
        <span class="roam-toc-modal-title">Table of Contents</span>
        <button class="roam-toc-modal-close" id="roamTocModalClose" aria-label="Close Table of Contents">✕</button>
      </div>
      <ul class="roam-toc-modal-list" id="roamTocModalList"></ul>
    `;

    const mobileList = modal.querySelector("#roamTocModalList");
    tocItems.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + item.id;
      a.textContent = item.text;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        closeMobileTOC();
        const target = document.getElementById(item.id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          history.pushState(null, "", "#" + item.id);
        }
      });
      li.appendChild(a);
      mobileList.appendChild(li);
    });

    document.body.appendChild(mobileBtn);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // Mobile Drawer Controls
    function openMobileTOC() {
      overlay.classList.add("open");
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeMobileTOC() {
      overlay.classList.remove("open");
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }

    mobileBtn.addEventListener("click", openMobileTOC);
    overlay.addEventListener("click", closeMobileTOC);
    const closeBtn = modal.querySelector("#roamTocModalClose");
    if (closeBtn) closeBtn.addEventListener("click", closeMobileTOC);

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeMobileTOC();
      }
    });

    // 7. ScrollSpy & Reading Progress via IntersectionObserver & scroll event
    const desktopLinks = desktopList.querySelectorAll(".roam-toc-link");
    const mobileLinks = mobileList.querySelectorAll("a");
    const progressBar = document.getElementById("roamTocBar");
    const progressText = document.getElementById("roamTocProgress");

    // Safe helper: scroll link inside sidebar list WITHOUT affecting window scroll
    function scrollActiveIntoSidebarList(link) {
      if (!desktopList || !link) return;
      const listRect = desktopList.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      if (linkRect.top < listRect.top) {
        desktopList.scrollTop -= (listRect.top - linkRect.top + 8);
      } else if (linkRect.bottom > listRect.bottom) {
        desktopList.scrollTop += (linkRect.bottom - listRect.bottom + 8);
      }
    }

    function setActiveHeading(id) {
      desktopLinks.forEach((link) => {
        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
          scrollActiveIntoSidebarList(link);
        } else {
          link.classList.remove("active");
        }
      });

      mobileLinks.forEach((link) => {
        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    // IntersectionObserver for active section highlight
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0
      }
    );

    headings.forEach((h2) => observer.observe(h2));

    // Reading Progress calculation
    function updateProgress() {
      const rect = content.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const contentTotal = content.offsetHeight;
      const contentScrolled = Math.max(0, -rect.top);
      const pct = Math.min(100, Math.max(0, Math.round((contentScrolled / (contentTotal - windowHeight / 2)) * 100)));

      if (progressBar) progressBar.style.width = pct + "%";
      if (progressText) progressText.textContent = pct + "%";

      if (rect.top > 80 && tocItems.length > 0) {
        setActiveHeading(tocItems[0].id);
      }
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDynamicTOC);
  } else {
    initDynamicTOC();
  }
})();
