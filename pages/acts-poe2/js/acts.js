/**
 * POE2 Acts Guide — Renderer
 * Reads ACTS_DATA from actsData.js and builds nested accordion UI.
 */

(function () {
  const container = document.getElementById('actsContainer');
  const searchInput = document.getElementById('actsSearch');
  const noResults = document.getElementById('noResults');
  const expandBtn = document.getElementById('expandAll');
  const collapseBtn = document.getElementById('collapseAll');

  // SVG helpers
  const chevron = `<svg class="act-header__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;
  const areaChevron = `<svg class="area-header__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;

  function makePills(area) {
    const pills = [];
    if (area.isTown) pills.push(`<span class="pill pill--town">Town</span>`);
    if (area.npcs && area.npcs.length) pills.push(`<span class="pill pill--npc">NPCs</span>`);
    if (area.bosses && area.bosses.length) pills.push(`<span class="pill pill--boss">Boss</span>`);
    if (area.quests && area.quests.length) pills.push(`<span class="pill pill--quest">Quest</span>`);
    return pills.join('');
  }

  function makeMetaItem(type, label, value) {
    if (!value) return '';
    return `
      <div class="area-meta__item area-meta__item--${type}">
        <span class="area-meta__label">${label}</span>
        <span class="area-meta__value">${value}</span>
      </div>`;
  }

  function makeSteps(steps) {
    if (!steps || !steps.length) return '';
    const items = steps.map(s => {
      const cls = s.startsWith('Note:') || s.startsWith('Author') ? 'note' :
                  s.startsWith('Warning') ? 'warning' : '';
      return `<li class="${cls}">${s}</li>`;
    }).join('');
    return `<ul class="area-steps">${items}</ul>`;
  }

  function renderArea(area) {
    const waypoint = area.waypoint ? 'Yes' : 'No';
    const bosses = area.bosses ? area.bosses.join(', ') : '—';
    const quests = area.quests ? area.quests.join(', ') : '—';
    const npcs = area.npcs ? area.npcs.join(', ') : null;
    const pois = area.pois ? area.pois.join(', ') : null;
    const icon = area.isTown ? '🏘' : area.bosses ? '⚔' : '📍';

    return `
      <div class="area-card" data-name="${area.name.toLowerCase()}" data-boss="${bosses.toLowerCase()}" data-quest="${quests.toLowerCase()}">
        <button class="area-header" aria-expanded="false">
          <span class="area-header__icon">${icon}</span>
          <span class="area-header__name">${area.name}</span>
          <span class="area-header__pills">${makePills(area)}</span>
          ${areaChevron}
        </button>
        <div class="area-body">
          <div class="area-body__inner">
            <div class="area-body__content">
              <div class="area-meta">
                ${makeMetaItem('waypoint', 'Waypoint', waypoint)}
                ${area.bosses ? makeMetaItem('boss', 'Bosses', bosses) : ''}
                ${area.quests ? makeMetaItem('quest', 'Quests', quests) : ''}
                ${npcs ? makeMetaItem('npc', 'NPCs', npcs) : ''}
                ${pois ? makeMetaItem('poi', 'Points of Interest', pois) : ''}
              </div>
              ${makeSteps(area.steps)}
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderAct(act, index) {
    const areas = act.areas.map(renderArea).join('');
    return `
      <div class="act-block" id="act-block-${index}" data-act="${index}">
        <button class="act-header" aria-expanded="false">
          <span class="act-header__badge">${act.tag || ('Act ' + (index + 1))}</span>
          <div class="act-header__info">
            <div class="act-header__title">${act.title}</div>
            <div class="act-header__sub">${act.subtitle || ''}</div>
          </div>
          <span class="act-header__count">${act.areas.length} areas</span>
          ${chevron}
        </button>
        <div class="act-body">
          <div class="act-body__inner">
            ${act.summary ? `<p class="act-summary">${act.summary}</p>` : ''}
            <div class="area-list">${areas}</div>
          </div>
        </div>
      </div>`;
  }

  // Build DOM
  if (typeof ACTS_DATA !== 'undefined') {
    container.innerHTML = ACTS_DATA.map((act, i) => renderAct(act, i)).join('');
  }

  // Toggle helpers
  function toggleBlock(block, open) {
    block.classList.toggle('open', open);
    block.querySelector('[aria-expanded]').setAttribute('aria-expanded', open);
  }

  // Act-level click
  container.addEventListener('click', function (e) {
    const actBtn = e.target.closest('.act-header');
    const areaBtn = e.target.closest('.area-header');

    if (actBtn) {
      const block = actBtn.closest('.act-block');
      const isOpen = block.classList.contains('open');
      toggleBlock(block, !isOpen);
    } else if (areaBtn) {
      const card = areaBtn.closest('.area-card');
      const isOpen = card.classList.contains('open');
      card.classList.toggle('open', !isOpen);
      areaBtn.setAttribute('aria-expanded', !isOpen);
    }
  });

  // Expand / Collapse all
  expandBtn.addEventListener('click', () => {
    document.querySelectorAll('.act-block:not(.hidden)').forEach(b => toggleBlock(b, true));
  });
  collapseBtn.addEventListener('click', () => {
    document.querySelectorAll('.act-block').forEach(b => {
      toggleBlock(b, false);
      b.querySelectorAll('.area-card').forEach(c => {
        c.classList.remove('open');
        c.querySelector('.area-header').setAttribute('aria-expanded', false);
      });
    });
  });

  // Search
  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    let totalVisible = 0;

    document.querySelectorAll('.act-block').forEach(block => {
      const areas = block.querySelectorAll('.area-card');
      let visibleAreas = 0;

      areas.forEach(card => {
        const name = card.dataset.name || '';
        const boss = card.dataset.boss || '';
        const quest = card.dataset.quest || '';
        const match = !q || name.includes(q) || boss.includes(q) || quest.includes(q);
        card.classList.toggle('hidden', !match);
        if (match) visibleAreas++;
      });

      block.classList.toggle('hidden', visibleAreas === 0);
      if (visibleAreas > 0) {
        totalVisible++;
        if (q) toggleBlock(block, true);
      }
    });

    noResults.classList.toggle('visible', totalVisible === 0 && q.length > 0);
  });

})();
