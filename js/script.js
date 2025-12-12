/* ==========================================================================
   CONFIGURATION & DATA
   ========================================================================== */
const DATA = {
  "Official": [
    { label: "Path of Exile Website", url: "https://pathofexile2.com/" },
    { label: "Early Access", url: "https://pathofexile2.com/early-access" },
    { label: "Latest Patch notes", url: "https://www.pathofexile.com/forum/view-forum/2212" }
  ],
  "Tools": [
    { label: "Path of Building", url: "https://github.com/PathOfBuildingCommunity/PathOfBuilding-PoE2/releases", desc: "Complete build planning tool" },
    { label: "POE2 Live Search Manager", url: "https://github.com/5k-mirrors/poe-live-search-manager", desc: "Manage multiple live searches, get notifications, and send whispers without leaving the game." },
    { label: "POE2.re", url: "https://poe2.re/", desc: "Regex builder for UI searches" },
    { label: "Exile Exchange 2", url: "https://github.com/Kvan7/Exiled-Exchange-2", desc: "Awakened POE Trade for PoE2" },
    { label: "Sidekick Overlay", url: "https://sidekick-poe.github.io/", desc: "Sidekick Overlay for POE2" },
    { label: "Xiletrade", url: "https://github.com/maxensas/xiletrade", desc: "Xiletrade Overlay for POE2" },
    { label: "XileHUD", url: "https://github.com/XileHUD/poe_overlay", desc: "XileHUD Overlay for POE2" },
    { label: "POE2 Overlay", url: "https://www.poeoverlay.com/", desc: "Standalone/Overwolf POE2 Overlay" },
    { label: "#####", url: "####", desc: "######" },
  ],
  "Builds": [
    { label: "Poe.ninja - Builds", url: "https://poe.ninja/poe2/builds" },
    { label: "PoeVault", url: "https://www.poe-vault.com/poe2" },
    { label: "Maxroll", url: "https://maxroll.gg/poe2/build-guides" },
    { label: "Mobalytics", url: "https://mobalytics.gg/poe-2/builds" }
  ],
  "Crafting": [
    { label: "CraftOfExile", url: "https://www.craftofexile.com", desc: "Comprehensive crafting tools suite",
      childs: [
        { label: "Calculator", url: "https://www.craftofexile.com/?ct=calculator&game=poe2" },
        { label: "Simulator", url: "https://www.craftofexile.com/?ct=simulator&game=poe2" },
        { label: "Emulator", url: "https://www.craftofexile.com/?ct=emulator&game=poe2" }
      ]
    }
  ],
  "Trade": [
    { label: "Official Trade site", url: "https://www.pathofexile.com/trade2", desc: "Search for items to buy" },
    { label: "Poe.ninja - Prices", url: "https://poe.ninja/poe2/economy/", desc: "Current market prices" },
  ],
  "Information/Guides": [
    { label: "Community Wiki", url: "https://www.poe2wiki.net/wiki/Path_of_Exile_2_Wiki", desc: "POE2 Community Wiki" },
    { label: "Poe2DB", url: "https://poe2db.tw/", desc: "POE2 Database" },
    { label: "POE2 Wiki", url: "https://path-of-exile-2.fandom.com/wiki/Path_of_Exile_2_Wiki", desc: "Fandom POE2 Wiki" },
    { label: "Game8", url: "https://game8.co/games/Path-of-Exile-2", desc: "Game8 Guides & More" }
  ],
    "Filter": [
    { label: "Neversink Loot Filter", url: "https://github.com/NeverSinkDev/NeverSink-PoE2litefilter/releases/latest" },
    { label: "FilterBlade", url: "https://www.filterblade.xyz/?game=Poe2", desc: "Build a customized loot filter" },
    { label: "POE2 Filter", url: "https://poe2filter.com/", desc: "Customizable loot filter generator" },
    { label: "Divine View", url: "https://divineview.app/", desc: "POE2 Loot Filter Text Editor" },
  ],
  "Social": [
    { label: "/r/pathofexile2", url: "https://www.reddit.com/r/pathofexile2/", desc: "POE2 Sub Reddit" },
    { label: "/r/poe2builds", url: "https://www.reddit.com/r/poe2builds/", desc: "POE2 Builds Sub Reddit" },
    { label: "Official Discord", url: "https://discord.com/invite/pathofexile", desc: "Path of Exile Official Discord" },
    { label: "Twitch Directory", url: "https://www.twitch.tv/directory/category/path-of-exile-2", desc: "POE2 Streams" },
    { label: "YouTube Channel", url: "https://www.youtube.com/c/PathofExile", desc: "POE2 YouTube Channel" },
  ]
};

/* ==========================================================================
   DOM ELEMENTS & UTILITIES
   ========================================================================== */
const sectionsRoot = document.getElementById('sections');
const countSections = document.getElementById('countSections');
const countLinks = document.getElementById('countLinks');
const openRate = document.getElementById('openRate');
const currentPlayers = document.getElementById('currentPlayers');

const el = (tag, props = {}, children = []) => {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  [].concat(children).forEach(c => c && node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return node;
};

const makeIcon = () => {
  const wrap = el('div', { class: 'icon' });
  wrap.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return wrap;
};

let toastTimer;
function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = el('div', { id: 'toast' });
    Object.assign(t.style, {
      position: 'fixed', left: '50%', bottom: '24px', transform: 'translateX(-50%)',
      background: 'color-mix(in oklab, var(--bg-soft) 90%, transparent)',
      border: '1px solid', borderColor: 'color-mix(in oklab, var(--ring) 40%, transparent)',
      color: 'var(--text)', padding: '10px 14px', borderRadius: '12px', boxShadow: 'var(--shadow)', zIndex: '100',
      opacity: '0', transition: 'opacity 0.2s ease'
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;      
  t.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ t.style.opacity = '0'; }, 2000);
}

/* ==========================================================================
   APP LOGIC
   ========================================================================== */

// 1. HEADER - No interactive functionality needed
const headerInner = document.getElementById('headerInner');
const filterInput = document.getElementById('filterInput');

// Logo is now just visual, no click handler needed

// 2. Favorites System
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
  favorites = favs;
}

function isFavorite(url) {
  const favs = getFavorites();
  return favs.some(f => f.url === url);
}

function updateFavoriteButtons() {
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const url = btn.getAttribute('data-url');
    if (isFavorite(url)) {
      btn.classList.add('active');
      btn.innerHTML = '★';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '☆';
    }
  });
}

function renderFavorites() {
  const favoritesList = document.getElementById('favorites-list');
  if (!favoritesList) return;
  
  const favs = getFavorites();
  
  if (favs.length === 0) {
    favoritesList.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 20px;">No favorites yet. Click the star icon on any link to add it to favorites.</p>';
    return;
  }
  
  // Clear existing content
  favoritesList.innerHTML = '';
  
  // Group favorites by section
  const grouped = {};
  favs.forEach(fav => {
    if (!grouped[fav.section]) {
      grouped[fav.section] = [];
    }
    grouped[fav.section].push(fav);
  });
  
  Object.entries(grouped).forEach(([section, items]) => {
    const sectionHeader = el('h3', {
      style: 'margin: 20px 0 12px 0; font-size: 14px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px;'
    }, [section]);
    favoritesList.appendChild(sectionHeader);
    
    items.forEach(fav => {
      const card = el('div', { class: 'resource-card favorite-card' });
      
      const icon = el('div', { class: 'resource-icon' }, ['🔗']);
      card.appendChild(icon);
      
      const info = el('div', { class: 'resource-info' });
      const title = el('div', { class: 'resource-title' });
      const link = el('a', {
        href: fav.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        style: 'color: var(--text); text-decoration: none;'
      }, [fav.label]);
      title.appendChild(link);
      info.appendChild(title);
      
      if (fav.desc) {
        const desc = el('div', { class: 'resource-desc' }, [fav.desc]);
        info.appendChild(desc);
      }
      
      card.appendChild(info);
      
      const favBtn = el('button', {
        class: 'favorite-btn active',
        'data-url': fav.url,
        type: 'button',
        onclick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.toggleFavorite(fav.url, fav.label, fav.section, fav.desc || '');
        }
      }, ['★']);
      card.appendChild(favBtn);
      
      favoritesList.appendChild(card);
    });
  });
}

// Make toggleFavorite globally accessible
window.toggleFavorite = function(url, label, section, desc = '') {
  const favs = getFavorites();
  const existingIndex = favs.findIndex(f => f.url === url);
  
  if (existingIndex >= 0) {
    favs.splice(existingIndex, 1);
    saveFavorites(favs);
    toast('Removed from favorites');
    updateFavoriteButtons();
    renderFavorites();
    return false;
  } else {
    favs.push({ url, label, section, desc });
    saveFavorites(favs);
    toast('Added to favorites');
    updateFavoriteButtons();
    renderFavorites();
    return true;
  }
};

// 2. Build Sections
let linkCount = 0;
const openStates = JSON.parse(sessionStorage.getItem('openStates') || '{}');

Object.entries(DATA).forEach(([sectionName, items]) => {
  const isExpanded = openStates[sectionName] ? 'true' : 'false';
  const section = el('section', { class: 'section reveal', 'aria-expanded': isExpanded, 'data-name': sectionName });

  const header = el('div', { class: 'section-header', role: 'button', tabindex: 0 });
  const title = el('div', { class: 'section-title' }, [
    el('span', { class: 'pill' }, [sectionName]),
    el('span', {}, ['Links'])
  ]);

  const controls = el('div', { class: 'section-controls' }, [
    el('span', { class: 'pill' }, [`${items.length} link${items.length>1?'s':''}`]),
    el('span', { class: 'chevron' }, [
      el('svg', { width: 18, height: 18, viewBox: '0 0 24 24' }, [
        el('path', { d: 'M6 9l6 6 6-6', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' })
      ])
    ])
  ]);

  header.appendChild(title); header.appendChild(controls);
  const content = el('div', { class: 'section-content' });

  const createCard = (it, isSub = false) => {
    linkCount++;
    const card = el('a', { class: 'card a', href: it.url, target: '_blank', rel: 'noopener noreferrer', 'data-label': it.label.toLowerCase() });
    card.appendChild(makeIcon());
    card.appendChild(el('div', { class: 'meta' }, [
      el('div', { class: 'label' }, [it.label]),
      it.desc ? el('div', { class: 'desc' }, [it.desc]) : null
    ]));
    
    const favoriteBtn = el('button', { 
      class: `favorite-btn ${isFavorite(it.url) ? 'active' : ''}`, 
      type: 'button',
      'data-url': it.url,
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.toggleFavorite(it.url, it.label, sectionName, it.desc || '');
      },
      title: isFavorite(it.url) ? 'Remove from favorites' : 'Add to favorites'
    }, [isFavorite(it.url) ? '★' : '☆']);
    
    card.appendChild(el('div', { class: 'actions' }, [
      favoriteBtn,
      el('button', { class: 'btn copy', type: 'button', onclick: (e)=>{ e.preventDefault(); e.stopPropagation(); navigator.clipboard.writeText(it.url).then(()=> toast('Copied!')); }}, ['Copy'])
    ]));
    content.appendChild(card);
    if (it.childs) it.childs.forEach(ch => createCard(ch, true));
  };

  items.forEach(item => createCard(item));
  section.appendChild(header);
  section.appendChild(content);
  sectionsRoot.appendChild(section);

  const toggle = () => {
    const isExpanded = section.getAttribute('aria-expanded') === 'true';
    section.setAttribute('aria-expanded', !isExpanded);
    openStates[sectionName] = !isExpanded;
    sessionStorage.setItem('openStates', JSON.stringify(openStates));
    updateOpenRate();
  };
  
  header.addEventListener('click', toggle);
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});

// 3. Stats & Filters
countSections.textContent = Object.keys(DATA).length;
countLinks.textContent = linkCount;

const updateOpenRate = () => {
  const total = Object.keys(DATA).length;
  const opened = document.querySelectorAll('.section[aria-expanded="true"]').length;
  openRate.textContent = total ? `${Math.round((opened / total) * 100)}%` : '0%';
};
updateOpenRate();

if (filterInput) {
  filterInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.section').forEach(sec => {
      let visible = 0;
      sec.querySelectorAll('.card').forEach(card => {
        const match = (card.getAttribute('data-label') || '').includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      sec.style.display = visible ? '' : 'none';
      if (q && visible && sec.getAttribute('aria-expanded') !== 'true') sec.setAttribute('aria-expanded', 'true');
    });
  });
}

// 4. Robust Steam API Fetch
async function fetchSteamPlayers() {
  const appId = 2694490;
  // Proxy URL handles CORS and HTTPS
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`)}`;
  
  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Proxy failed');
    const data = await response.json();
    
    if (data.response && data.response.player_count) {
      currentPlayers.textContent = data.response.player_count.toLocaleString();
    } else {
      currentPlayers.textContent = 'N/A';
    }
  } catch (err) {
    console.error("Steam API Error:", err);
    currentPlayers.textContent = 'N/A';
  }
}
fetchSteamPlayers();

// 5. Theme Toggle & UI
document.getElementById('themeToggle').addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
});

const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')));
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 6. Back-to-top button
(() => {
  const btn = document.getElementById('toTop');
  if (!btn) return;

  const toggleVisibility = () => {
    const show = window.scrollY > 200;
    btn.style.opacity = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  };

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Keyboard access
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
})();

/* ==========================================================================
   SIDEBAR - GLOBAL FUNCTIONS (Must be accessible to onclick handlers)
   ========================================================================== */

// SIDEBAR 
const sidebar = document.getElementById('sidebar-widget');
const body = document.body;

// 1. OPEN FUNCTION (Global scope)
window.openSidebar = function() {
  if (sidebar) {
    sidebar.classList.add('active');
    body.classList.add('sidebar-is-open');
  }
};

// 2. CLOSE FUNCTION (Global scope)
window.closeSidebar = function() {
  if (sidebar) {
    sidebar.classList.remove('active');
    body.classList.remove('sidebar-is-open');
  }
};

// 3. OPEN FAVORITES PANEL (Global scope)
window.openFavoritesPanel = function(clickedElement) {
  // Open sidebar if closed
  const sidebar = document.getElementById('sidebar-widget');
  if (sidebar && !sidebar.classList.contains('active')) {
    window.openSidebar();
  }
  
  // Switch to favorites tab
  const favoritesView = document.getElementById('tab-favorites');
  if (favoritesView) {
    // Hide all views
    document.querySelectorAll('.panel-view').forEach(view => {
      view.classList.remove('visible');
    });
    
    // Show favorites view
    favoritesView.classList.add('visible');
    renderFavorites();
    
    // Update icon states - mark favorites icon as active
    document.querySelectorAll('.sidebar-rail .rail-icon:not(.close-action)').forEach(icon => {
      icon.classList.remove('active-tab');
    });
    
    // Activate the clicked favorites icon
    if (clickedElement) {
      clickedElement.classList.add('active-tab');
    } else {
      // Find the favorites icon if clickedElement not provided
      const railIcons = document.querySelectorAll('.sidebar-rail .rail-icon:not(.close-action)');
      if (railIcons.length > 0) {
        railIcons[0].classList.add('active-tab');
      }
    }
  }
};

// 4. TAB SWITCHING (Global scope)
window.switchTab = function(tabId, clickedElement) {
  // Hide all views
  document.querySelectorAll('.panel-view').forEach(view => {
    view.classList.remove('visible');
  });
  // Show target view
  const targetView = document.getElementById(tabId);
  if (targetView) {
    targetView.classList.add('visible');
    // If switching to favorites tab, render favorites
    if (tabId === 'tab-favorites') {
      renderFavorites();
    }
  }

  // Update Icon States
  // Note: We skip the first child because that is the Close Button (X)
  document.querySelectorAll('.sidebar-rail .rail-icon:not(.close-action)').forEach(icon => {
    icon.classList.remove('active-tab');
  });
  if (clickedElement) {
    clickedElement.classList.add('active-tab');
  }
};

// 4. THEME TOGGLE (Global scope - already defined above, but ensure sidebar version works)
window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
};

// 5. Initialize favorites on page load
document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();
});