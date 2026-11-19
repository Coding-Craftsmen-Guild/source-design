(function () {
  const q = new URLSearchParams(location.search);
  const en = q.get('lang') === 'en';
  // build file -> production path [sr, en]
  const PATHS = {
    'Pocetna.dc.html': ['/', '/en/'],
    'Source.dc.html': ['/source', '/en/source'],
    'Proizvodi.dc.html': ['/proizvodi', '/en/products'],
    'Source-home.dc.html': ['/proizvodi/source-home', '/en/products/source-home'],
    'ShAM.dc.html': ['/proizvodi/sham', '/en/products/sham'],
    'Paketi.dc.html': ['/proizvodi/paketi', '/en/products/bundles'],
    'Procena-prostora.dc.html': ['/proizvodi/procena-prostora', '/en/products/space-assessment'],
    'Implocell.dc.html': ['/proizvodi/implocell', '/en/products/implocell'],
    'Ether-pill.dc.html': ['/proizvodi/ether-pill', '/en/products/ether-pill'],
    'Blog.dc.html': ['/blog', '/en/blog']
  };
  const CATS = [
    { key: 'Prostor i zračenje', slug: 'prostor-i-zracenje', slugEn: 'space-and-radiation', en: 'Space and radiation' },
    { key: 'Energija tela', slug: 'energija-tela', slugEn: 'body-energy', en: 'Body energy' },
    { key: 'Voda i projekti', slug: 'voda-i-projekti', slugEn: 'water-and-projects', en: 'Water and projects' }
  ];
  const PRODUCTS = {
    'source-home': { file: 'Source-home.dc.html', name: 'Source home', img: 'img/k-c02-presek-w.png', price: ['od 25.000 din', 'from 25,000 RSD'], text: ['Nivelacija potencijala Etra u vašem prostoru uvozom elektrona iz zemlje.', 'Levels the Ether potential in your space by importing electrons from the ground.'], alt: ['Presek uredjaja Source home.', 'Cross-section of the Source home device.'] },
    'sham': { file: 'ShAM.dc.html', name: 'ShAM', img: 'img/k-c11-sham-hero-4x3-w.png', price: ['od 10.800 din', 'from 10,800 RSD'], text: ['Nivelacija energije i direktno uzemljenje vašeg tela uz originalan beli šum.', 'Levels your energy and grounds your body directly, with original white noise.'], alt: ['Uredjaj ShAM.', 'The ShAM device.'] },
    'paketi': { file: 'Paketi.dc.html', name: ['Paketi', 'Bundles'], img: 'img/k-c04-kapacitet-w.png', price: ['od 33.000 din', 'from 33,000 RSD'], text: ['Source home i ShAM zajedno, za vaš prostor i za telo, po povoljnijoj ceni.', 'Source home and ShAM together, for your space and your body, at a better price.'], alt: ['Enterijer sa uredjajem Source home.', 'Interior with the Source home device.'] },
    'procena': { file: 'Procena-prostora.dc.html', name: ['Procena prostora', 'Space assessment'], img: 'img/k-c03-emf-dom-w.png', price: ['0 din', '0 RSD'], text: ['Besplatna skica i procena opterećenosti vašeg prostora pre izbora uredjaja.', 'A free sketch and assessment of the load on your space, before you choose a device.'], alt: ['Presek doma sa izvorima zračenja.', 'Cross-section of a home with radiation sources.'] },
    'implocell': { file: 'Implocell.dc.html', name: 'Implocell', img: 'img/k-implocell-card-w.png', price: ['750e', '€750'], text: ['Živa voda. Ručno izradjen unikat iz limitirane serije, sa potpisom kreatora.', 'Live water. A handmade, one-of-a-kind piece from a limited series, signed by its creator.'], alt: ['Uredjaj Implocell sa čašom vode.', 'Implocell device with a glass of water.'] },
    'ether-pill': { file: 'Ether-pill.dc.html', name: 'Ether pill', img: 'img/k-ether-pill-card-w.png', price: ['na upit', 'on request'], text: ['Implozivni reaktor osnovne životne energije. Projekat u razvoju, na upit.', 'An implosion reactor of basic life energy. A project in development, on request.'], alt: ['Foto ćelija Ether pill, kartica iz 2022.', 'Ether pill photo cell, 2022 card.'] }
  };
  const L = (v) => Array.isArray(v) ? v[en ? 1 : 0] : v;
  const href = (file, extra) => {
    const p = new URLSearchParams(extra || '');
    if (en) p.set('lang', 'en');
    const s = p.toString();
    return file + (s ? '?' + s : '');
  };
  const switchHref = (toEn) => {
    const p = new URLSearchParams(location.search);
    if (toEn) p.set('lang', 'en'); else p.delete('lang');
    const file = location.pathname.split('/').pop() || 'Pocetna.dc.html';
    const s = p.toString();
    return file + (s ? '?' + s : '');
  };
  const prodPath = (file, extra) => {
    if (file === 'Blog-post.dc.html') return (en ? '/en/blog/' : '/blog/') + extra;
    if (file === 'Kategorija.dc.html') { const c = CATS.find(x => x.slug === extra) || CATS[0]; return en ? '/en/blog/category/' + c.slugEn : '/blog/kategorija/' + c.slug; }
    return (PATHS[file] || ['/', '/en/'])[en ? 1 : 0];
  };
  const productCard = (k) => {
    const p = PRODUCTS[k];
    return { href: href(p.file), title: L(p.name), img: p.img, imgAlt: L(p.alt), text: L(p.text), meta: L(p.price), fit: p.fit || '' };
  };
  function setMeta(attr, key, val) {
    let m = document.head.querySelector('meta[' + attr + '="' + key + '"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute(attr, key); document.head.appendChild(m); }
    m.setAttribute('content', val);
  }
  function setLink(rel, hrefv, hl) {
    const sel = 'link[rel="' + rel + '"]' + (hl ? '[hreflang="' + hl + '"]' : '');
    let l = document.head.querySelector(sel);
    if (!l) { l = document.createElement('link'); l.rel = rel; if (hl) l.hreflang = hl; document.head.appendChild(l); }
    l.href = hrefv;
  }
  function seo(o) {
    const origin = location.origin;
    document.documentElement.lang = en ? 'en' : 'sr';
    document.title = o.title;
    setMeta('name', 'description', o.desc);
    const srP = (() => { const was = en; return was ? o.paths[0] : o.paths[0]; })();
    setLink('canonical', origin + o.paths[en ? 1 : 0]);
    setLink('alternate', origin + o.paths[0], 'sr');
    setLink('alternate', origin + o.paths[1], 'en');
    setLink('alternate', origin + o.paths[0], 'x-default');
    setMeta('property', 'og:title', o.title);
    setMeta('property', 'og:description', o.desc);
    setMeta('property', 'og:image', origin + '/' + (o.image || 'img/logo.png'));
    setMeta('property', 'og:type', o.type || 'website');
    setMeta('property', 'og:locale', en ? 'en_US' : 'sr_RS');
    document.head.querySelectorAll('script[data-seo]').forEach(s => s.remove());
    const org = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Source', logo: origin + '/img/logo.png', url: origin + (en ? '/en/' : '/'), sameAs: ['https://www.instagram.com/source_mainpage/'] };
    const blocks = [org].concat(o.schema || []);
    if (o.crumbs && o.crumbs.length) blocks.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: o.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: origin + c.path })) });
    blocks.forEach(b => { const s = document.createElement('script'); s.type = 'application/ld+json'; s.setAttribute('data-seo', ''); s.textContent = JSON.stringify(b); document.head.appendChild(s); });
  }
  // crumbs: [[labelSr,labelEn,file,extra?], ...] last is current page
  function crumbs(list) {
    return list.map((c, i) => ({ label: L([c[0], c[1]]), href: i < list.length - 1 ? href(c[2], c[3]) : '', path: prodPath(c[2], c[4] || c[3]), last: i === list.length - 1 }));
  }
  let dlg;
  function lightbox(src, caption, btn, list, idx) {
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.setAttribute('aria-label', en ? 'Image' : 'Slika');
      dlg.style.cssText = 'border:0;padding:0;background:transparent;max-width:min(96vw,1100px);max-height:94vh;overflow:visible';
      dlg.innerHTML = '<figure style="margin:0;display:flex;flex-direction:column;gap:10px;align-items:center"><img style="max-width:100%;max-height:82vh;object-fit:contain;background:#fff;display:block;border-radius:0" alt=""><figcaption style="color:#fff;font:15px \'Maven Pro\',sans-serif;text-align:center"></figcaption></figure><button type="button" style="position:fixed;top:16px;right:16px;width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.6);background:#23382f;color:#fff;font-size:22px;cursor:pointer">×</button>';
      const st = document.createElement('style');
      st.textContent = 'dialog::backdrop{background:rgba(14,23,19,.88)}';
      document.head.appendChild(st);
      dlg.querySelector('button').addEventListener('click', () => dlg.close());
      const nav = (d) => { if (!dlg._list) return; dlg._idx = (dlg._idx + d + dlg._list.length) % dlg._list.length; const it = dlg._list[dlg._idx]; const im = dlg.querySelector('img'); im.src = it.src; im.alt = it.alt || ''; dlg.querySelector('figcaption').textContent = (it.alt || '') + '  ·  ' + (dlg._idx + 1) + ' / ' + dlg._list.length; };
      ['‹','›'].forEach((ch, k) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = ch; b.className = 'sl-nav'; b.style.cssText = 'position:fixed;top:50%;' + (k ? 'right' : 'left') + ':16px;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;border:1px solid rgba(255,255,255,.6);background:#23382f;color:#fff;font-size:28px;line-height:1;cursor:pointer'; b.setAttribute('aria-label', k ? (en ? 'Next' : 'Sledeća') : (en ? 'Previous' : 'Prethodna')); b.addEventListener('click', (e) => { e.stopPropagation(); nav(k ? 1 : -1); }); dlg.appendChild(b); });
      dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') nav(1); if (e.key === 'ArrowLeft') nav(-1); });
      dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', () => { if (dlg._ret) dlg._ret.focus(); });
      document.body.appendChild(dlg);
    }
    dlg.querySelector('button').setAttribute('aria-label', en ? 'Close' : 'Zatvori');
    const img = dlg.querySelector('img'); img.src = src; img.alt = caption || '';
    dlg.querySelector('figcaption').textContent = caption || '';
    dlg._list = list || null; dlg._idx = idx || 0;
    dlg.querySelectorAll('.sl-nav').forEach(b => { b.style.display = list && list.length > 1 ? 'block' : 'none'; });
    if (list && list.length > 1) dlg.querySelector('figcaption').textContent = (caption || '') + '  ·  ' + ((idx || 0) + 1) + ' / ' + list.length;
    dlg._ret = btn || null;
    dlg.showModal();
  }
  let vdlg;
  function videoBox(src, label, btn) {
    if (!vdlg) {
      vdlg = document.createElement('dialog');
      vdlg.style.cssText = 'border:0;padding:0;background:transparent;width:min(96vw,1100px);max-height:94vh;overflow:visible';
      vdlg.innerHTML = '<video controls playsinline style="width:100%;max-height:86vh;display:block;background:#000;border-radius:0"></video><button type="button" style="position:fixed;top:16px;right:16px;width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.6);background:#23382f;color:#fff;font-size:22px;cursor:pointer">×</button>';
      if (!document.getElementById('sl-dlg-style')) { const st = document.createElement('style'); st.id = 'sl-dlg-style'; st.textContent = 'dialog::backdrop{background:rgba(14,23,19,.88)}'; document.head.appendChild(st); }
      vdlg.querySelector('button').addEventListener('click', () => vdlg.close());
      vdlg.addEventListener('click', (e) => { if (e.target === vdlg) vdlg.close(); });
      vdlg.addEventListener('close', () => { const v = vdlg.querySelector('video'); v.pause(); if (vdlg._ret) vdlg._ret.focus(); });
      document.body.appendChild(vdlg);
    }
    vdlg.querySelector('button').setAttribute('aria-label', en ? 'Close' : 'Zatvori');
    vdlg.setAttribute('aria-label', label || 'Video');
    const v = vdlg.querySelector('video'); v.src = src; v.muted = false; v.setAttribute('aria-label', label || 'Video');
    vdlg._ret = btn || null; vdlg.showModal(); v.play().catch(() => {});
  }
  // drag-to-scroll for horizontal rows
  document.addEventListener('pointerdown', (e) => {
    const el = e.target.closest && e.target.closest('[data-drag]'); if (!el || e.pointerType !== 'mouse') return;
    const x0 = e.clientX, s0 = el.scrollLeft; let moved = false;
    el.style.scrollSnapType = 'none'; el.style.cursor = 'grabbing';
    const mv = (ev) => { const dx = ev.clientX - x0; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = s0 - dx; };
    const up = () => { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); el.style.cursor = 'grab'; el.style.scrollSnapType = 'x mandatory';
      if (moved) { const stop = (ce) => { ce.preventDefault(); ce.stopPropagation(); }; el.addEventListener('click', stop, { capture: true, once: true }); setTimeout(() => el.removeEventListener('click', stop, { capture: true }), 50); } };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up);
    e.preventDefault();
  });
  // scroll-in reveal
  (function reveal() {
    if (window.__slReveal) return; window.__slReveal = true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const seen = new WeakSet();
    const io = new IntersectionObserver((entries) => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target; io.unobserve(el);
      el.style.opacity = '1'; el.style.transform = 'none';
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    const scan = () => {
      document.querySelectorAll('main section > div, main article > div, main article > figure, main article > header').forEach((el, i) => {
        if (seen.has(el)) return; seen.add(el);
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) return;
        el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(.2,.7,.2,1)';
        io.observe(el);
      });
    };
    const start = () => { scan(); new MutationObserver(() => scan()).observe(document.body, { childList: true, subtree: true }); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(start, 200)); else setTimeout(start, 200);
  })();

  // hover / touch spark orbiting interactive elements
  (function spark() {
    if (window.__slSpark || document.getElementById('sl-spark-style')) return; window.__slSpark = true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const st = document.createElement('style'); st.id = 'sl-spark-style';
    st.textContent = "@property --sl-a{syntax:'<angle>';inherits:false;initial-value:0deg}" +
      "@keyframes sl-orbit{to{--sl-a:360deg}}" +
      ".sl-spark{position:fixed;pointer-events:none;z-index:9999;padding:1.5px;box-sizing:border-box;opacity:0;transition:opacity .35s ease;" +
      "background:conic-gradient(from var(--sl-a),transparent 0 62%,rgba(192,228,72,0) 62%,rgba(192,228,72,.35) 82%,#c0e448 96%,#f4ffd0 99%,transparent 100%);" +
      "-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);" +
      "animation:sl-orbit 1.6s linear infinite;filter:drop-shadow(0 0 4px rgba(192,228,72,.75))}" +
      ".sl-spark.on{opacity:1}";
    document.head.appendChild(st);
    document.querySelectorAll('.sl-spark').forEach(n => n.remove());
    const el = document.createElement('div'); el.className = 'sl-spark'; el.setAttribute('aria-hidden', 'true');
    const mount = () => { if (!el.isConnected) document.body.appendChild(el); };
    let target = null, raf = 0, hideT = 0;
    const SEL = 'a[href],button,summary,[role="button"],input,select,textarea';
    const place = () => {
      if (!target || !target.isConnected) return hide();
      const r = target.getBoundingClientRect(), cs = getComputedStyle(target), pad = 2;
      el.style.left = (r.left - pad) + 'px'; el.style.top = (r.top - pad) + 'px';
      el.style.width = (r.width + pad * 2) + 'px'; el.style.height = (r.height + pad * 2) + 'px';
      const br = parseFloat(cs.borderTopLeftRadius) || 0;
      el.style.borderRadius = br >= Math.min(r.width, r.height) / 2 - 1 ? '999px' : (br ? (br + pad) + 'px' : '2px');
      raf = requestAnimationFrame(place);
    };
    const skip = (t) => !t || !!t.closest('nav, header');
    const looksLikeControl = (t) => {
      if (t.tagName !== 'A') return true;
      if (t.hasAttribute('data-spark')) return true;
      const cs = getComputedStyle(t);
      const bg = cs.backgroundColor, bi = cs.backgroundImage;
      const hasBg = (bg && bg !== 'transparent' && !/rgba\([^)]*,\s*0\)$/.test(bg)) || (bi && bi !== 'none');
      const hasBorder = parseFloat(cs.borderTopWidth) > 0 && parseFloat(cs.borderLeftWidth) > 0 && cs.borderTopStyle !== 'none';
      const r = t.getBoundingClientRect();
      const isCard = r.width > 180 && r.height > 180;
      return hasBg || hasBorder || isCard;
    };
    const pick = (n) => { const t = n && n.closest && n.closest(SEL); return t && !skip(t) && looksLikeControl(t) ? t : null; };
    const host = (t) => {
      const m = t.closest('[data-spark-card]'); if (m) return m;
      let p = t.parentElement;
      for (let i = 0; p && i < 6; i++, p = p.parentElement) {
        if (p.tagName === 'SECTION' || p.tagName === 'MAIN' || p.tagName === 'BODY') break;
        const bi = getComputedStyle(p).backgroundImage || '';
        if (bi.includes('gradient') && /rgb\(15, 108, 70\)|rgb\(3, 76, 48\)/.test(bi)) { const r = p.getBoundingClientRect(); if (r.width < window.innerWidth * 0.9) return p; }
      }
      return t;
    };
    const show = (t0) => {
      const t = host(t0);
      if (t === target) { clearTimeout(hideT); return; }
      clearTimeout(hideT); cancelAnimationFrame(raf); target = t; mount();
      place(); requestAnimationFrame(() => el.classList.add('on'));
    };
    function hide() { el.classList.remove('on'); cancelAnimationFrame(raf); target = null; }
    const later = (ms) => { clearTimeout(hideT); hideT = setTimeout(hide, ms); };
    document.addEventListener('pointerover', (e) => {
      if (e.pointerType === 'touch') return;
      const t = pick(e.target);
      if (t) show(t); else if (target) later(120);
    }, true);
    document.addEventListener('pointerout', (e) => {
      if (e.pointerType === 'touch' || !target) return;
      const to = pick(e.relatedTarget);
      if (!to || host(to) !== target) later(120);
    }, true);
    document.addEventListener('touchstart', (e) => { const t = pick(e.target); if (t) { show(t); later(900); } }, { passive: true, capture: true });
    document.addEventListener('focusin', (e) => { const t = pick(e.target); if (t && t.matches(':focus-visible')) show(t); });
    document.addEventListener('focusout', () => later(80));
  })();
  // chipHint: on narrow screens, nudge horizontal chip rows right then back so users see they scroll
  (function chipHint() {
    if (window.__slChips) return; window.__slChips = true;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = (el) => {
      if (el.__hinted || el.scrollWidth <= el.clientWidth + 8) return; el.__hinted = true;
      if (reduce) return;
      const d = Math.min(120, el.scrollWidth - el.clientWidth), t0 = performance.now(), D = 1600;
      const ease = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      el.style.scrollBehavior = 'auto';
      const step = (t) => { const k = Math.min(1, (t - t0) / D); el.scrollLeft = d * Math.sin(Math.PI * ease(k)); if (k < 1) requestAnimationFrame(step); else { el.scrollLeft = 0; el.style.scrollBehavior = 'smooth'; } };
      requestAnimationFrame(step);
    };
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); setTimeout(() => run(e.target), 200); } }), { threshold: 0.6 }) : null;
    const scan = () => document.querySelectorAll('[data-chips]').forEach(el => { if (!el.__obs && io) { el.__obs = true; io.observe(el); } });
    new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true }); scan();
  })();
  // headSpark: once a heading scrolls into view, a lime spark traces the outline of each letter, left to right
  (function headSpark() {
    if (window.__slHead) return; window.__slHead = true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const NS = 'http://www.w3.org/2000/svg';
    let uid = 0;
    const lines = (h) => {
      const out = []; const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT); let n;
      const r = document.createRange();
      while ((n = w.nextNode())) {
        const t = n.textContent;
        for (let i = 0; i < t.length; i++) {
          r.setStart(n, i); r.setEnd(n, i + 1); const b = r.getClientRects()[0]; if (!b || !b.width) { if (out.length && t[i] === ' ') out[out.length - 1].s += ' '; continue; }
          let L = out.find(l => Math.abs(l.top - b.top) < b.height * 0.5);
          if (!L) { L = { top: b.top, bottom: b.bottom, left: b.left, s: '' }; out.push(L); }
          L.s += t[i]; L.left = Math.min(L.left, b.left); L.bottom = Math.max(L.bottom, b.bottom);
        }
      }
      return out.map(l => ({ ...l, s: l.s.trim() })).filter(l => l.s);
    };
    const run = (h) => {
      if (h.__swept) return; h.__swept = true;
      const cs = getComputedStyle(h), hb = h.getBoundingClientRect();
      const L = lines(h); if (!L.length) return;
      const id = 'slhs' + (++uid), up = cs.textTransform === 'uppercase';
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('width', hb.width); svg.setAttribute('height', hb.height);
      svg.style.cssText = 'position:absolute;pointer-events:none;overflow:visible;z-index:1;left:' + (hb.left + scrollX) + 'px;top:' + (hb.top + scrollY) + 'px';
      const fs = parseFloat(cs.fontSize);
      svg.innerHTML = '<defs><linearGradient id="' + id + 'g" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.42" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.5" stop-color="#fff" stop-opacity="1"></stop><stop offset="0.58" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>' +
        '<mask id="' + id + 'm" maskUnits="userSpaceOnUse" x="-50" y="-50" width="' + (hb.width + 100) + '" height="' + (hb.height + 100) + '"><rect id="' + id + 'r" x="' + (-hb.width * 1.2) + '" y="-50" width="' + (hb.width * 1.2) + '" height="' + (hb.height + 100) + '" fill="url(#' + id + 'g)"></rect></mask>' +
        '<filter id="' + id + 'f" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="1.6" result="b"></feGaussianBlur><feMerge><feMergeNode in="b"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs>';
      const g = document.createElementNS(NS, 'g'); g.setAttribute('mask', 'url(#' + id + 'm)'); g.setAttribute('filter', 'url(#' + id + 'f)');
      L.forEach(l => {
        const tx = document.createElementNS(NS, 'text');
        tx.textContent = up ? l.s.toUpperCase() : l.s;
        tx.setAttribute('x', l.left - hb.left); tx.setAttribute('y', l.top - hb.top + (l.bottom - l.top) * 0.5);
        tx.setAttribute('dominant-baseline', 'central');
        tx.style.cssText = 'font-family:' + cs.fontFamily + ';font-size:' + fs + 'px;font-weight:' + cs.fontWeight + ';letter-spacing:' + cs.letterSpacing + ';fill:none;stroke:#c0e448;stroke-width:' + Math.max(0.8, fs / 48) + 'px;stroke-linejoin:round;stroke-dasharray:' + (fs * 0.35) + ' ' + (fs * 0.9) + ';animation:sl-dash 3.2s linear infinite';
        g.appendChild(tx);
      });
      svg.appendChild(g); document.body.appendChild(svg);
      const rect = svg.querySelector('#' + id + 'r'), W = hb.width, D = Math.min(6500, Math.max(3500, W * 7)), t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / D), e = k;
        rect.setAttribute('x', -W * 1.2 + e * W * 2.4);
        if (k < 1) requestAnimationFrame(step); else svg.remove(); };
      requestAnimationFrame(step);
    };
    const st = document.createElement('style'); st.textContent = '@keyframes sl-dash{to{stroke-dashoffset:-200}}'; document.head.appendChild(st);
    const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); setTimeout(() => run(e.target), 500); } }), { threshold: 0.8 });
    const scan = () => document.querySelectorAll('h1, h2').forEach(h => { if (!h.__obs && !h.closest('header, nav, dialog')) { h.__obs = true; io.observe(h); } });
    new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true }); scan();
  })();
  const fmtDate = d => { const [y, m, x] = d.split('-'); return x + '.' + m + '.' + y + '.'; };
  window.SL = { TYPE: {"display":"font-size:clamp(36px,calc(2.5vw + 26px),56px);line-height:1.15;letter-spacing:calc(0.08em + 0.6vw)","title":"font-size:clamp(30px,calc(1.7vw + 23px),44px);line-height:1.2;letter-spacing:calc(0.06em + 0.4vw)","h2":"font-size:clamp(28px,calc(1vw + 24px),36px);line-height:1.25;letter-spacing:calc(0.1em + 0.3vw)","h3":"font-size:clamp(21px,calc(0.4vw + 19.5px),24px);line-height:1.3;letter-spacing:0.14em","lead":"font-size:clamp(18px,calc(0.25vw + 17px),20px);line-height:1.6"}, en, videoBox, L, href, switchHref, prodPath, seo, crumbs, lightbox, CATS, PRODUCTS, productCard, fmtDate,
    marks: q.get('marks') === '1',
    claimNote: en ? 'The effects listed are user experiences and are not medically proven.' : 'Navedeni efekti su iskustva korisnika i nisu medicinski dokazani.' };
})();
