// helper used by build scripts (not loaded by pages)
async function i18n(file, pairs, edits, logicFn, opts) {
  opts = opts || {};
  let s = await readFile(file);
  const R = (a, b) => { if (!s.includes(a)) throw new Error(file + ' miss: ' + a.slice(0, 70)); s = s.split(a).join(b); };
  const SR = {}, EN = {};
  for (const [k, sr, en, raw] of pairs) {
    SR[k] = sr; EN[k] = en;
    if (raw === 'noreplace') continue;
    R('>' + sr + '<', '>{{ t.' + k + ' }}<');
  }
  for (const [a, b, opt] of edits) { if (opt && !s.includes(a)) continue; R(a, b); }
  if (!s.includes('site.js')) {
    const i = s.indexOf('<style>');
    s = s.slice(0, i) + '<link rel="icon" href="img/favicon-32.png" sizes="32x32">\n<link rel="apple-touch-icon" href="img/apple-touch-icon.png">\n<script src="site.js"></script>\n' + (opts.posts && !s.includes('posts.js') ? '<script src="posts.js"></script>\n' : '') + s.slice(i);
  }
  s = s.replace('<div lang="sr-Latn">', '<div>');
  const start = s.indexOf('class Component extends DCLogic'), end = s.lastIndexOf('</script>');
  s = s.slice(0, start) + logicFn(JSON.stringify(SR), JSON.stringify(EN)) + '\n' + s.slice(end);
  return s;
}
function pageLogic(SRj, ENj, body, seo, needPosts) {
  const need = needPosts ? 'window.SL && window.SOURCE_POSTS' : 'window.SL';
  return `class Component extends DCLogic {
  state = { ready: !!(${need}) };
  componentDidMount() {
    if (this.state.ready) this.seo(); else this.wt = setInterval(() => { if (${need}) { clearInterval(this.wt); this.setState({ ready: true }); this.seo(); } }, 30);
  }
  componentWillUnmount() { clearInterval(this.wt); }
  seo() { const S = window.SL, en = S.en; ${seo} }
  renderVals() {
    if (!(${need})) return {};
    const S = window.SL, en = S.en, t = en ? ${ENj} : ${SRj};
    const lb = (src, cap) => (e) => S.lightbox(src, cap, e.currentTarget);
    const postCard = (slug) => { const p = window.SOURCE_POSTS.find(x => x.slug === slug); return { href: S.href('Blog-post.dc.html', 'slug=' + slug), title: en ? p.titleEn : p.title, img: p.hero.replace('-g.png', '-w.png'), imgAlt: en ? p.heroAltEn : p.heroAlt, text: en ? p.bodyEn[0] : p.body[0], date: S.fmtDate(p.date), meta: en ? 'Read' : 'Pročitajte', fit: p.hero.includes('ether-pill-2022') ? 'contain-white' : '' }; };
    ${body}
  }
}`;
}
var RELATED_BLOCK = `<section data-screen-label="Povezani tekstovi" style="background:#fff">
  <div style="max-width:1200px;margin:0 auto;padding:64px 16px;display:flex;flex-direction:column;gap:28px">
    <h2 style="margin:0;font-family:'Maven Pro',Arial,sans-serif;font-weight:400;font-size:clamp(22px,4vw,32px);letter-spacing:0.24em;text-transform:uppercase;color:#034c30">{{ relTitle }}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:20px;align-items:stretch">
      <sc-for list="{{ related }}" as="p" hint-placeholder-count="3">
        <dc-import name="Card" style="height:100%" href="{{ p.href }}" img="{{ p.img }}" img-alt="{{ p.imgAlt }}" ratio="16/9" fit="{{ p.fit }}" title="{{ p.title }}" text="{{ p.text }}" date="{{ p.date }}" meta="{{ p.meta }}" hint-size="100%,460px"></dc-import>
      </sc-for>
    </div>
  </div>
</section>
`;
var BACKLINK_RE = /<a href="Proizvodi\.dc\.html" style="align-self:flex-start;color:#8fbeaa[^>]*>← Proizvodi<\/a>/;
var CRUMBS = '<dc-import name="Breadcrumbs" items="{{ crumbs }}" hint-size="100%,32px"></dc-import>';
function productSeo(file, nameSr, nameEn, titleSr, titleEn, descSr, descEn, img, price, cur) {
  return `const P = S.prodPath; S.seo({ paths: [${JSON.stringify(PATHS_FOR[file])}][0], image: '${img}', title: en ? ${JSON.stringify(titleEn)} : ${JSON.stringify(titleSr)}, desc: en ? ${JSON.stringify(descEn)} : ${JSON.stringify(descSr)}, type: 'product',
    crumbs: S.crumbs([['Početna','Home','Pocetna.dc.html'],['Proizvodi','Products','Proizvodi.dc.html'],[${JSON.stringify(nameSr)},${JSON.stringify(nameEn)},'${file}']]),
    schema: [{ '@context': 'https://schema.org', '@type': 'Product', name: ${JSON.stringify(nameEn)} === ${JSON.stringify(nameSr)} ? ${JSON.stringify(nameSr)} : (en ? ${JSON.stringify(nameEn)} : ${JSON.stringify(nameSr)}), image: location.origin + '/${img}', description: en ? ${JSON.stringify(descEn)} : ${JSON.stringify(descSr)}, brand: { '@type': 'Brand', name: 'Source' }${price ? `, offers: { '@type': 'Offer', price: '${price}', priceCurrency: '${cur}', availability: 'https://schema.org/InStock', url: location.origin + (en ? ${JSON.stringify(PATHS_FOR[file][1])} : ${JSON.stringify(PATHS_FOR[file][0])}) }` : ''} }] });`;
}
var PATHS_FOR = {
  'Source-home.dc.html': ['/proizvodi/source-home', '/en/products/source-home'],
  'ShAM.dc.html': ['/proizvodi/sham', '/en/products/sham'],
  'Paketi.dc.html': ['/proizvodi/paketi', '/en/products/bundles'],
  'Procena-prostora.dc.html': ['/proizvodi/procena-prostora', '/en/products/space-assessment'],
  'Implocell.dc.html': ['/proizvodi/implocell', '/en/products/implocell'],
  'Ether-pill.dc.html': ['/proizvodi/ether-pill', '/en/products/ether-pill']
};
var CRUMB_VAL = (file, nameSr, nameEn) => `crumbs: S.crumbs([['Početna','Home','Pocetna.dc.html'],['Proizvodi','Products','Proizvodi.dc.html'],[${JSON.stringify(nameSr)},${JSON.stringify(nameEn)},'${file}']]),`;
