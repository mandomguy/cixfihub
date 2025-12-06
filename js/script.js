/* ==========================================================================
   CONFIGURATION & DATA
   ========================================================================== */
const DATA = {
  "Official": [
    { label: "Path of Exile Website", url: "https://pathofexile2.com/" },
    { label: "Early Access", url: "https://pathofexile2.com/early-access" },
    { label: "Latest Patch notes", url: "https://www.pathofexile.com/forum/view-forum/2212" }
  ],
  "Important": [
    { label: "Neversink Loot Filter", url: "https://github.com/NeverSinkDev/NeverSink-PoE2litefilter/releases/latest" },
    { label: "FilterBlade", url: "https://www.filterblade.xyz/?game=Poe2", desc: "Build a customized loot filter" }
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
    { label: "Orb Watch", url: "https://orbwatch.trade/", desc: "Live currency rates" }
  ],
  "Information": [
    { label: "Community Wiki", url: "https://www.poe2wiki.net/wiki/Path_of_Exile_2_Wiki" },
    { label: "Poe2DB", url: "https://poe2db.tw/" }
  ],
  "Tools": [
    { label: "Path of Building", url: "https://github.com/PathOfBuildingCommunity/PathOfBuilding-PoE2/releases", desc: "Complete build planning tool" },
    { label: "Exile Exchange 2", url: "https://github.com/Kvan7/Exiled-Exchange-2", desc: "Awakened POE Trade for PoE2" },
    { label: "POE2.re", url: "https://poe2.re/", desc: "Regex builder for UI searches" }
  ],
  "Social": [
    { label: "Reddit", url: "https://www.reddit.com/r/pathofexile/" },
    { label: "Official Discord", url: "https://discord.com/invite/pathofexile" },
    { label: "Twitch Directory", url: "https://www.twitch.tv/directory/category/path-of-exile-2" }
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

// 1. HEADER INTERACTION (Fixed)
const headerInner = document.getElementById('headerInner');
const logoBtn = document.getElementById('logoBtn');
const filterInput = document.getElementById('filterInput');

if (headerInner && logoBtn) {
  logoBtn.addEventListener('click', (e) => {
    // Prevent the page from jumping to top
    e.preventDefault();
    
    // Toggle the 'expanded' class
    headerInner.classList.toggle('expanded');
    
    // If opening, focus the search bar after a small delay for animation
    if (headerInner.classList.contains('expanded')) {
      setTimeout(() => {
        if (filterInput) filterInput.focus();
      }, 100);
    }
  });
}

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
    card.appendChild(el('div', { class: 'actions' }, [
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
    const expanded = section.getAttribute('aria-expanded') === 'true';
    section.setAttribute('aria-expanded', String(!expanded));
    openStates[sectionName] = !expanded;
    sessionStorage.setItem('openStates', JSON.stringify(openStates));
    updateOpenRate();
  };
  header.addEventListener('click', toggle);
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
document.getElementById('themeToggle').addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent header collapse when clicking theme button
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