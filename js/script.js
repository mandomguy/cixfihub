// Data (mirrors the structure and links from arpg.info/poe2)
// Data (mirrors the structure and links from arpg.info/poe2)
const DATA = {
  "Official": [
    { label: "Path of Exile Website", url: "https://pathofexile2.com/" },
    { label: "Early Access", url: "https://pathofexile2.com/early-access" },
    { label: "Latest Patch notes", url: "https://www.pathofexile.com/forum/view-forum/2212" }
  ],
  "Important": [
    { label: "Neversink Loot Filter", url: "https://github.com/NeverSinkDev/NeverSink-PoE2litefilter/releases/latest" },
    { label: "FilterBlade", url: "https://www.filterblade.xyz/?game=Poe2", desc: "Build a customized loot filter with an easy-to-use web tool" }
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
    { label: "Official Trade site", url: "https://www.pathofexile.com/trade2", desc: "Search for items to buy with advanced search filters" },
    { label: "Poe.ninja - Prices", url: "https://poe.ninja/poe2/economy/", desc: "Current market prices for everything" },
    { label: "Orb Watch", url: "https://orbwatch.trade/", desc: "Current market prices for items" }
  ],
  "Information": [
    { label: "Community Wiki", url: "https://www.poe2wiki.net/wiki/Path_of_Exile_2_Wiki" },
    { label: "Poe2DB", url: "https://poe2db.tw/" }
  ],
  "Tools": [
    { label: "Path of Building", url: "https://github.com/PathOfBuildingCommunity/PathOfBuilding-PoE2/releases", desc: "Complete build planning tool" },
    { label: "Exile Exchange 2", url: "https://github.com/Kvan7/Exiled-Exchange-2", desc: "Awakened POE Trade for Path of Exile 2" },
    { label: "Sidekick", url: "https://sidekick-poe.github.io/", desc: "Path of exile companion tool." },
    { label: "POE2.re", url: "https://poe2.re/", desc: "Regular Expression builder for UI searches" }
  ],
  "Social": [
    { label: "Reddit", url: "https://www.reddit.com/r/pathofexile/" },
    { label: "Official Discord", url: "https://discord.com/invite/pathofexile" },
    { label: "Youtube Channel", url: "https://www.youtube.com/channel/UCA7X5unt1JrIiVReQDUbl_A" },
    { label: "Twitch", url: "https://www.twitch.tv/directory/category/path-of-exile-2" }
  ],
  "Embeds": [
    { label: "Twitter: Official", url: "https://twitter.com/pathofexile" },
    { label: "Twitter: Bex", url: "https://twitter.com/bexsayswords" },
    { label: "Twitch", url: "https://www.twitch.tv/directory/game/Path%20of%20Exile" }
  ]
};

const sectionsRoot = document.getElementById('sections');

// Utilities
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
  // Open square icon with external link symbol
  const wrap = el('div', { class: 'icon' });
  wrap.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  return wrap;
};

// Build sections
let linkCount = 0;
const openStates = JSON.parse(sessionStorage.getItem('openStates') || '{}');

Object.entries(DATA).forEach(([sectionName, items], idx) => {
  const section = el('section', { class: 'section reveal', 'aria-expanded': openStates[sectionName] ? 'true' : 'false', 'data-name': sectionName });

  const header = el('div', { class: 'section-header', role: 'button', tabindex: 0, 'aria-controls': `${sectionName}-content` });
  const title = el('div', { class: 'section-title' }, [
    el('span', { class: 'pill' }, [sectionName]),
    el('span', {}, [sectionName === 'Embeds' ? 'External Feeds' : 'Links'])
  ]);

  const controls = el('div', { class: 'section-controls' }, [
    el('span', { class: 'pill' }, [`${items.length} link${items.length>1?'s':''}`]),
    el('span', { class: 'chevron', 'aria-hidden': 'true' }, [
      el('svg', { width: 18, height: 18, viewBox: '0 0 24 24' }, [
        el('path', { d: 'M6 9l6 6 6-6', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
      ])
    ])
  ]);

  header.appendChild(title); header.appendChild(controls);

  const content = el('div', { class: 'section-content', id: `${sectionName}-content` });

  items.forEach(it => {
    linkCount++;
    const card = el('a', { class: 'card a', href: it.url, target: '_blank', rel: 'noopener noreferrer', 'data-label': it.label.toLowerCase(), 'data-desc': (it.desc||'').toLowerCase() });
    card.appendChild(makeIcon());
    const meta = el('div', { class: 'meta' }, [
      el('div', { class: 'label' }, [it.label]),
      it.desc ? el('div', { class: 'desc' }, [it.desc]) : null
    ]);
    const actions = el('div', { class: 'actions' }, [
      el('button', { class: 'btn copy', type: 'button', title: 'Copy link', onclick: (e)=>{ e.preventDefault(); navigator.clipboard.writeText(it.url).then(()=> toast(`Copied: ${it.label}`)); } }, ['Copy']),
      it.childs ? el('span', { class: 'pill' }, ['Has sublinks']) : null
    ]);
    card.appendChild(meta);
    card.appendChild(actions);
    content.appendChild(card);

    if (it.childs) {
      it.childs.forEach(ch => {
        linkCount++;
        const child = el('a', { class: 'card a', href: ch.url, target: '_blank', rel: 'noopener noreferrer', 'data-label': ch.label.toLowerCase() });
        child.appendChild(makeIcon());
        child.appendChild(el('div', { class: 'meta' }, [ el('div', { class: 'label' }, [ch.label]), el('div', { class: 'desc' }, ['Sub-link']) ]));
        child.appendChild(el('div', { class: 'actions' }, [ el('button', { class: 'btn copy', type: 'button', title: 'Copy link', onclick: (e)=>{ e.preventDefault(); navigator.clipboard.writeText(ch.url).then(()=> toast(`Copied: ${ch.label}`)); } }, ['Copy']) ]));
        content.appendChild(child);
      });
    }
  });

  section.appendChild(header);
  section.appendChild(content);
  sectionsRoot.appendChild(section);

  // Toggle behavior
  const toggle = () => {
    const expanded = section.getAttribute('aria-expanded') === 'true';
    section.setAttribute('aria-expanded', String(!expanded));
    openStates[sectionName] = !expanded;
    sessionStorage.setItem('openStates', JSON.stringify(openStates));
    updateOpenRate();
  };
  header.addEventListener('click', toggle);
  header.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});

// Header expand/collapse on logo click
const headerInner = document.getElementById('headerInner');
const logoBtn = document.getElementById('logoBtn');

logoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  headerInner.classList.toggle('expanded');
});

// Stats
const countSections = document.getElementById('countSections');
const countLinks = document.getElementById('countLinks');
const openRate = document.getElementById('openRate');
const currentPlayers = document.getElementById('currentPlayers');

countSections.textContent = Object.keys(DATA).length;
countLinks.textContent = linkCount;
const updateOpenRate = () => {
  const total = Object.keys(DATA).length;
  const opened = [...document.querySelectorAll('.section[aria-expanded="true"]').values()].length;
  const pct = Math.round((opened / total) * 100);
  openRate.textContent = `${pct}%`;
};
updateOpenRate();

// Filter behavior
const filterInput = document.getElementById('filterInput');
const filter = () => {
  const q = filterInput.value.trim().toLowerCase();
  document.querySelectorAll('.section').forEach(section => {
    let visibleCards = 0;
    section.querySelectorAll('.card').forEach(card => {
      const text = (card.getAttribute('data-label') || '') + ' ' + (card.getAttribute('data-desc') || '');
      const show = text.includes(q);
      card.style.display = show ? '' : 'none';
      if (show) visibleCards++;
    });
    // Show section if any match
    section.style.display = visibleCards ? '' : 'none';
    if (q && visibleCards && section.getAttribute('aria-expanded') !== 'true') {
      section.setAttribute('aria-expanded', 'true');
    }
  });
  updateOpenRate();
};
filterInput.addEventListener('input', filter);

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
themeToggle.setAttribute('aria-pressed', savedTheme === 'light');
themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
  themeToggle.setAttribute('aria-pressed', String(!isLight));
});

// Scroll reveal animations
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(elm => io.observe(elm));

// Back to top button
const toTop = document.getElementById('toTop');
const onScroll = () => {
  const show = window.scrollY > 400;
  toTop.classList.toggle('show', show);
};
window.addEventListener('scroll', onScroll, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Tiny toast
let toastTimer;
function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = el('div', { id: 'toast' });
    Object.assign(t.style, {
      position: 'fixed', left: '50%', bottom: '24px', transform: 'translateX(-50%)',
      background: 'color-mix(in oklab, var(--bg-soft) 90%, transparent)',
      border: '1px solid', borderColor: 'color-mix(in oklab, var(--ring) 40%, transparent)',
      color: 'var(--text)', padding: '10px 14px', borderRadius: '12px', boxShadow: 'var(--shadow)', zIndex: '100'
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;      
  t.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ t.style.opacity = '0'; }, 1500);
}




// ============================================
// Steam API - Fixed CORS Issue
// ============================================
// OPTION 1: Use a CORS proxy (quick fix for testing)
// Note: For production, use your own backend proxy
// const appId = 2694490; // Path of Exile 2

// async function getSteamPlayerCount() {
//   try {
//     // Using a public CORS proxy - replace with your own backend in production
//     const proxyUrl = 'https://api.allorigins.win/raw?url=';
//     const apiUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;
    
//     const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     console.log('Steam API Response:', data);
    
//     if (data.response && data.response.player_count !== undefined) {
//       console.log(`Current players for app ${appId}:`, data.response.player_count);
//       // You can display this in your UI if needed
//       // Example: document.getElementById('playerCount').textContent = data.response.player_count;
//     }
    
//     return data;
//   } catch (error) {
//     console.error('Error fetching Steam data:', error.message);
//     // Fallback: show a message or use cached data
//   }
// }

// getSteamPlayerCount();
// Call the function when page loads


// OPTION 2: Backend proxy (recommended for production)
// Create a file called proxy-server.js:
/*
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/api/steam/players/:appid', async (req, res) => {
  const { appid } = req.params;
  const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Steam' });
  }
});

app.listen(4000, () => console.log('Proxy running on http://localhost:4000'));
*/

// Then replace getSteamPlayerCount() with:
/*
async function getSteamPlayerCount() {
  try {
    const response = await fetch(`http://localhost:4000/api/steam/players/${appId}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log('Steam players:', data.response.player_count);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}
*/
