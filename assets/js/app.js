(() => {
  'use strict';
  const entries = window.ATLAS_ENTRIES || [];
  const categories = window.ATLAS_CATEGORIES || {};
  const page = document.body.dataset.page;
  const $ = (selector, root = document) => root.querySelector(selector);
  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  const linkFor = entry => `article.html?slug=${encodeURIComponent(entry.slug)}`;

  // Theme: user choice is persisted locally; no remote tracking and no dependency.
  const themeButton = $('#theme-toggle');
  try {
    if (localStorage.getItem('skin-atlas-theme') === 'light') document.documentElement.dataset.theme = 'light';
  } catch (_e) { /* private browsing may disable localStorage */ }
  function updateThemeLabel() {
    if (!themeButton) return;
    const light = document.documentElement.dataset.theme === 'light';
    themeButton.textContent = light ? '☀' : '☾';
    themeButton.setAttribute('aria-label', light ? '切換深色模式' : '切換淺色模式');
  }
  updateThemeLabel();
  if (themeButton) themeButton.addEventListener('click', () => {
    const light = document.documentElement.dataset.theme === 'light';
    document.documentElement.dataset.theme = light ? 'dark' : 'light';
    try { localStorage.setItem('skin-atlas-theme', light ? 'dark' : 'light'); } catch (_e) { /* graceful fallback */ }
    updateThemeLabel();
  });

  function makeCard(entry) {
    const a = element('a', 'article-card');
    a.href = linkFor(entry);
    a.setAttribute('aria-label', `閱讀：${entry.title}`);
    const top = element('div', 'article-card-top');
    top.append(element('span', 'tag', categories[entry.category] || '其他'));
    top.append(element('span', 'reading-time', `${entry.readMins} MIN READ`));
    a.append(top, element('h3', '', entry.title), element('p', '', entry.summary));
    const bottom = element('div', 'article-card-footer');
    bottom.append(element('span', '', '閱讀文章'), element('span', '', '↗'));
    a.append(bottom);
    return a;
  }
  function renderCards(target, list) {
    if (!target) return;
    target.replaceChildren(...list.map(makeCard));
  }

  if (page === 'home') {
    const count = $('#entry-count');
    if (count) count.textContent = String(entries.length).padStart(2, '0');
    const featured = ['rcm', 'skin-sb', 'ai-reconstruction']
      .map(slug => entries.find(item => item.slug === slug)).filter(Boolean);
    renderCards($('#featured-cards'), featured);
  }

  if (page === 'library') {
    const search = $('#search-input');
    const count = $('#results-count');
    const empty = $('#empty-state');
    const filters = [...document.querySelectorAll('[data-filter]')];
    const urlCategory = new URLSearchParams(location.search).get('category');
    let category = Object.hasOwn(categories, urlCategory) ? urlCategory : 'all';
    function update() {
      const query = (search?.value || '').trim().toLocaleLowerCase();
      const filtered = entries.filter(entry => {
        const text = [entry.title, entry.titleEn, entry.summary, ...entry.keywords, categories[entry.category]].join(' ').toLocaleLowerCase();
        return (category === 'all' || entry.category === category) && (!query || text.includes(query));
      });
      filters.forEach(btn => {
        const active = btn.dataset.filter === category;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      renderCards($('#library-cards'), filtered);
      if (count) count.textContent = `找到 ${filtered.length} 篇文章 / 共 ${entries.length} 篇`;
      if (empty) empty.hidden = filtered.length > 0;
    }
    filters.forEach(btn => btn.addEventListener('click', () => {
      category = btn.dataset.filter;
      const url = new URL(location.href);
      if (category === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', category);
      history.replaceState(null, '', url);
      update();
    }));
    if (search) search.addEventListener('input', update);
    update();
  }

  if (page === 'article') {
    const holder = $('#article-content');
    const slug = new URLSearchParams(location.search).get('slug');
    const entry = entries.find(item => item.slug === slug);
    if (!entry) {
      document.title = '找不到文章｜Skin Optics Atlas';
      const wrap = element('div', 'page-intro');
      wrap.append(element('p', 'eyebrow', '404 / ARTICLE NOT FOUND'), element('h1', '', '找不到這篇文章'));
      wrap.append(element('p', '', '文章可能已移動或網址有誤，請回到文章列表繼續探索。'));
      const back = element('a', 'button button-primary', '返回文章列表 ↗');
      back.href = 'library.html';
      wrap.append(back);
      holder.replaceChildren(wrap);
    } else {
      document.title = `${entry.title}｜Skin Optics Atlas`;
      const description = $('meta[name="description"]');
      if (description) description.content = entry.summary;
      const back = element('a', 'article-back', '← 返回文章列表'); back.href = 'library.html';
      const header = element('header', 'article-header');
      header.append(element('span', 'tag', categories[entry.category]), element('h1', '', entry.title), element('p', 'article-en', entry.titleEn), element('p', 'article-lead', entry.lead));
      const meta = element('div', 'article-meta');
      meta.append(element('span', '', `${entry.readMins} 分鐘閱讀`), element('span', '', `分類：${categories[entry.category]}`), element('span', '', '適合入門學習'));
      header.append(meta);
      const highlight = element('div', 'article-hero-panel');
      highlight.append(element('strong', '', 'QUICK TAKEAWAY'), element('p', '', entry.highlight));
      const layout = element('div', 'article-layout');
      const body = element('div', 'article-body');
      const aside = element('nav', 'article-sidebar');
      aside.setAttribute('aria-label', '本頁段落');
      aside.append(element('h3', '', '本篇目錄'));
      entry.sections.forEach((section, index) => {
        const sec = element('section');
        sec.id = `section-${index + 1}`;
        sec.append(element('h2', '', section.heading));
        (section.paragraphs || []).forEach(p => sec.append(element('p', '', p)));
        if (section.bullets?.length) {
          const ul = element('ul');
          section.bullets.forEach(text => ul.append(element('li', '', text)));
          sec.append(ul);
        }
        body.append(sec);
        const anchor = element('a', '', section.heading); anchor.href = `#${sec.id}`; aside.append(anchor);
      });
      if (entry.references?.length) {
        const refs = element('section', 'references');
        refs.append(element('h2', '', '參考資料'));
        const list = element('ol');
        entry.references.forEach(ref => {
          const li = element('li');
          const a = element('a', '', ref.label);
          a.href = ref.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
          li.append(a); list.append(li);
        });
        refs.append(list); body.append(refs);
      }
      layout.append(body, aside);
      const next = element('section', 'section');
      next.append(element('p', 'eyebrow', 'KEEP EXPLORING'), element('h2', '', '延伸閱讀'));
      const related = (entry.related || []).map(slug => entries.find(e => e.slug === slug)).filter(Boolean);
      const cards = element('div', 'article-grid'); related.forEach(item => cards.append(makeCard(item)));
      next.append(cards);
      holder.replaceChildren(back, header, highlight, layout, next);
    }
  }
})();
