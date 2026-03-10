/**
 * ============================================
 *    GRID PAGE – DATA & LOGIC
 *    ============================================
 *
 *    HOW TO ADD A NEW RESOURCE:
 *    1. Add an entry to the RESOURCES array below
 *    2. Set the category to one of the CATEGORIES ids
 *    3. Optionally add a badge { text, color }
 *    4. Done! The grid will auto-render it.
 *
 *    HOW TO ADD A NEW CATEGORY:
 *    1. Add { id: "mycategory", label: "My Category" } to CATEGORIES
 *    2. Use that id in your resource entries
 *    3. Done! A filter button will auto-appear.
 *
 * @format
 */

/* ==========================================================================
   CATEGORIES
   ========================================================================== */

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "official", label: "Official" },
  { id: "tools", label: "Tools" },
  { id: "builds", label: "Builds" },
  { id: "trade", label: "Trade" },
  { id: "media", label: "Media" },
];

/* ==========================================================================
   RESOURCES – Add/remove/edit entries freely
   ========================================================================== */

const RESOURCES = [
  {
    title: "Official Portal",
    description: "Direct access to GGG forums, patch notes, and dev logs.",
    image: "../images/grid-official.png",
    category: "official",
    categoryLabel: "Official",
    badge: { text: "HOT", color: "#ef4444" },
    url: "https://pathofexile2.com/",
  },
  {
    title: "Path of Building",
    description: "Essential character planning tool for PoE 2 skill trees.",
    image: "../images/grid-tools.png",
    category: "tools",
    categoryLabel: "Tools",
    badge: { text: "Updated", color: "#8b5cf6" },
    url: "https://github.com/PathOfBuildingCommunity/PathOfBuilding-PoE2/releases",
  },
  {
    title: "Mercenary Guides",
    description:
      "Complete breakdown of the new Mercenary class and ammo types.",
    image: "../images/grid-builds.png",
    category: "builds",
    categoryLabel: "Builds",
    badge: { text: "New", color: "#22c55e" },
    url: "https://maxroll.gg/poe2/build-guides",
  },
  {
    title: "Crafting Lab",
    description:
      "Simulate PoE 2 currency usage and suffix/prefix probabilities.",
    image: "../images/grid-official.png",
    category: "tools",
    categoryLabel: "Utility",
    url: "https://www.craftofexile.com/?game=poe2",
  },
  {
    title: "Trading Hub",
    description: "Bulk exchange and item indexing specifically for PoE 2.",
    image: "../images/grid-atlas.png",
    category: "trade",
    categoryLabel: "Trade",
    url: "https://www.pathofexile.com/trade2",
  },
  {
    title: "Atlas Planner",
    description: "Plan your end-game map strategy and passive pathing.",
    image: "../images/grid-atlas.png",
    category: "builds",
    categoryLabel: "Endgame",
    url: "https://poe.ninja/poe2/builds",
  },
  {
    title: "Community Discord",
    description: "Connect with thousands of players and build theorists.",
    image: "../images/grid-social.png",
    category: "media",
    categoryLabel: "Social",
    url: "https://discord.com/invite/pathofexile",
  },
  {
    title: "Gameplay Trailers",
    description:
      "All official class reveal trailers and gameplay demonstrations.",
    image: "../images/grid-media.png",
    category: "media",
    categoryLabel: "Media",
    badge: { text: "Media", color: "#3b82f6" },
    url: "https://www.youtube.com/c/PathofExile",
  },

  // ─── PAGE 2 RESOURCES ────────────────────────────────
  {
    title: "Poe.ninja Builds",
    description:
      "Live meta tracking with the most popular ascendancies and gear.",
    image: "../images/grid-builds.png",
    category: "builds",
    categoryLabel: "Builds",
    badge: { text: "Popular", color: "#f59e0b" },
    url: "https://poe.ninja/poe2/builds",
  },
  {
    title: "Sidekick Overlay",
    description:
      "In-game overlay for real-time price checking and item evaluation.",
    image: "../images/grid-tools.png",
    category: "tools",
    categoryLabel: "Tools",
    url: "https://sidekick-poe.github.io/",
  },
  {
    title: "Community Wiki",
    description:
      "Comprehensive player-maintained wiki covering all game mechanics.",
    image: "../images/grid-social.png",
    category: "media",
    categoryLabel: "Wiki",
    url: "https://www.poe2wiki.net/wiki/Path_of_Exile_2_Wiki",
  },
  {
    title: "FilterBlade",
    description:
      "Build and customize loot filters with a powerful visual editor.",
    image: "../images/grid-tools.png",
    category: "tools",
    categoryLabel: "Tools",
    badge: { text: "Updated", color: "#8b5cf6" },
    url: "https://www.filterblade.xyz/?game=Poe2",
  },
  {
    title: "PoeScout Prices",
    description:
      "Current market prices with historical charts and API support.",
    image: "../images/grid-atlas.png",
    category: "trade",
    categoryLabel: "Trade",
    badge: { text: "New", color: "#22c55e" },
    url: "https://poe2scout.com",
  },
  {
    title: "Reddit Community",
    description: "Join /r/pathofexile2 for discussions, memes, and game news.",
    image: "../images/grid-social.png",
    category: "media",
    categoryLabel: "Social",
    url: "https://www.reddit.com/r/pathofexile2/",
  },
  {
    title: "Exile Exchange 2",
    description: "Awakened PoE Trade successor — fast in-game price checks.",
    image: "../images/grid-tools.png",
    category: "tools",
    categoryLabel: "Tools",
    url: "https://github.com/Kvan7/Exiled-Exchange-2",
  },
  {
    title: "Twitch Directory",
    description: "Watch live PoE 2 streamers, guides, and hardcore races.",
    image: "../images/grid-media.png",
    category: "media",
    categoryLabel: "Media",
    url: "https://www.twitch.tv/directory/category/path-of-exile-2",
  },
];

/* ==========================================================================
   CONFIG
   ========================================================================== */

const ITEMS_PER_PAGE = 8;

/* ==========================================================================
   STATE
   ========================================================================== */

let currentCategory = "all";
let currentPage = 1;
let currentSearch = "";

/* ==========================================================================
   DOM REFERENCES
   ========================================================================== */

const gridContainer = document.getElementById("resource-grid");
const filterBar = document.getElementById("filter-bar");
const paginationContainer = document.getElementById("pagination");
const gridSearchInput = document.getElementById("gridSearch");
const statSections = document.getElementById("statSections");
const statLinks = document.getElementById("statLinks");

/* ==========================================================================
   UTILITIES
   ========================================================================== */

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/* Arrow SVG template */
const ARROW_SVG = `<svg class="grid-card__arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ==========================================================================
   FILTERING & PAGINATION
   ========================================================================== */

function getFilteredResources() {
  let filtered = RESOURCES;

  if (currentCategory !== "all") {
    filtered = filtered.filter((r) => r.category === currentCategory);
  }

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.categoryLabel.toLowerCase().includes(q),
    );
  }

  return filtered;
}

/* ==========================================================================
   RENDER: RESOURCE GRID
   ========================================================================== */

function renderGrid() {
  const filtered = getFilteredResources();
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  // Clamp page
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Clear
  gridContainer.innerHTML = "";

  if (pageItems.length === 0) {
    gridContainer.innerHTML =
      '<div class="resource-grid__empty">No resources found matching your criteria.</div>';
    renderPagination(0);
    return;
  }

  // Render cards
  pageItems.forEach((resource, index) => {
    const card = document.createElement("a");
    card.href = resource.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "grid-card";
    card.style.animationDelay = `${index * 70}ms`;

    const badgeHTML = resource.badge
      ? `<span class="grid-card__badge" style="background: ${resource.badge.color}">${resource.badge.text}</span>`
      : "";

    card.innerHTML = `
      <div class="grid-card__image">
        <img src="${resource.image}" alt="${resource.title}" loading="lazy">
        ${badgeHTML}
      </div>
      <div class="grid-card__body">
        <h3 class="grid-card__title">${resource.title}</h3>
        <p class="grid-card__desc">${resource.description}</p>
        <div class="grid-card__footer">
          <span class="grid-card__category">${resource.categoryLabel}</span>
          ${ARROW_SVG}
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  renderPagination(totalPages);
}

/* ==========================================================================
   RENDER: FILTER BUTTONS
   ========================================================================== */

function renderFilters() {
  filterBar.innerHTML = "";

  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = `filter-btn${cat.id === currentCategory ? " active" : ""}`;
    btn.textContent = cat.label;

    btn.addEventListener("click", () => {
      currentCategory = cat.id;
      currentPage = 1;
      renderFilters();
      renderGrid();
    });

    filterBar.appendChild(btn);
  });
}

/* ==========================================================================
   RENDER: PAGINATION
   ========================================================================== */

function renderPagination(totalPages) {
  paginationContainer.innerHTML = "";
  if (totalPages <= 1) return;

  // Prev
  const prevBtn = createPageBtn("‹", currentPage <= 1);
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderGrid();
      scrollToGrid();
    }
  });
  paginationContainer.appendChild(prevBtn);

  // Pages
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = createPageBtn(String(i), false, i === currentPage);
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderGrid();
      scrollToGrid();
    });
    paginationContainer.appendChild(pageBtn);
  }

  // Next
  const nextBtn = createPageBtn("›", currentPage >= totalPages);
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderGrid();
      scrollToGrid();
    }
  });
  paginationContainer.appendChild(nextBtn);
}

function createPageBtn(text, disabled, isActive = false) {
  const btn = document.createElement("button");
  btn.className = `pagination__btn${isActive ? " active" : ""}`;
  btn.textContent = text;
  btn.disabled = disabled;
  return btn;
}

function scrollToGrid() {
  const el = document.getElementById("grid-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ==========================================================================
   STATS
   ========================================================================== */

function updateStats() {
  // Count unique categories (excluding "all")
  const uniqueCategories = new Set(RESOURCES.map((r) => r.category));
  if (statSections) statSections.textContent = uniqueCategories.size;
  if (statLinks) statLinks.textContent = RESOURCES.length;
}

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */

function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) return;

  themeBtn.addEventListener("click", () => {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "dark" : "light",
    );
  });
}

/* ==========================================================================
   SEARCH
   ========================================================================== */

function initSearch() {
  if (!gridSearchInput) return;

  gridSearchInput.addEventListener(
    "input",
    debounce((e) => {
      currentSearch = e.target.value;
      currentPage = 1;
      renderGrid();
    }, 200),
  );
}

/* ==========================================================================
   INTERSECTION OBSERVER (Reveal animations)
   ========================================================================== */

function initRevealAnimations() {
  const io = new IntersectionObserver((entries) =>
    entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ==========================================================================
   BACK TO TOP
   ========================================================================== */

function initBackToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  const toggleVisibility = () => {
    const show = window.scrollY > 200;
    btn.style.opacity = show ? "1" : "0";
    btn.style.pointerEvents = show ? "auto" : "none";
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();
}

/* ==========================================================================
   INITIALIZE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  renderFilters();
  renderGrid();
  initThemeToggle();
  initSearch();
  initRevealAnimations();
  initBackToTop();
});
