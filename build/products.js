(async () => {
const STR = JSON.parse(await readFile('build/strings.json'));
const sk = (f) => 'img/' + f;
const SCHEMA = {
 'source-home': (t, B) => ({
  hero: { title: 'Source home', lead: t.lead, price: t.from, pdf: 'docs/uputstvo-source-home.pdf', media: { type: 'video', src: 'video/2025-03-25_15-36-29_UTC.mp4', poster: 'img/foto-source-home.jpg', alt: t.photoAlt } },
  sections: [
   { type: 'text', id: 'sta-je', menu: B('Šta je', 'What it is'), title: t.h2a, paras: [t.p1, t.p2, t.p3], note: t.note },
   { type: 'text', id: 'prozor', title: B('Prozor na kip', 'An open window'), paras: [t.open], quote: t.q, after: [t.q2] },
   { type: 'media', id: 'kako-radi', menu: B('Kako radi', 'How it works'), title: t.h2b, paras: [t.torus], img: B('img/k-c01-torus-labels-sr.png', 'img/k-c01-torus-g.png'), alt: t.torusAlt, video: 'video/2024-12-11_11-47-57_UTC.mp4', videoPoster: 'img/k-c01-torus-16x9-g.png', videoCap: t.loop },
   { type: 'media', id: 'konstrukcija', menu: B('Konstrukcija', 'Construction'), title: t.h2c, paras: [t.kon, t.only], img: 'img/k-c02-presek-g.png', alt: t.presekAlt },
   { type: 'feature', id: 'emf', title: t.h2d, lead: t.emf, img: 'img/k-c03-emf-dom-w.png', alt: t.emfAlt, points: B(
      [['ruter', 'Glavni izvor suvišnog potencijala u vašem prostoru.', '39.1%', '61.2%', '16px', '-96px'], ['telefon', 'Nosimo ga uz telo minimum 4h dnevno.', '73.9%', '75.2%', '-262px', '-104px'], ['pametni uredjaji', 'Pametne kuće su prosečno 2,5 puta više ozračene.', '80%', '46.1%', '-262px', '-110px']],
      [['router', 'The main source of excess potential in your space.', '39.1%', '61.2%', '16px', '-96px'], ['phone', 'We carry it close to the body for at least 4 hours a day.', '73.9%', '75.2%', '-262px', '-104px'], ['smart devices', 'Smart homes are on average 2.5 times more irradiated.', '80%', '46.1%', '-262px', '-110px']]) },
   { type: 'media', id: 'kapacitet', menu: B('Kapacitet', 'Capacity'), title: t.h2e, img: 'img/k-c04-kapacitet-g.png', alt: t.kapAlt, side: 'left', tiles: [['Source home', t.c1], ['Source home PRO', t.c2]], list: [t.l1, t.l2, t.l3], quote: t.klima },
   { type: 'media', id: 'prikljucak', menu: B('Priključak', 'Connection'), title: t.h2f, img: 'img/k-c05-prikljucak-g.png', alt: t.plugAlt, spec: B([['PRIKLJUČAK', 'Šuko standard, samo uzemljenje (jedan utikač bez kontakata faze)'], ['ADAPTER', 'dozvoljen; produžni kabl samo sa uzemljenjem'], ['NAPOMENA', 'Source home mora biti jedini uredjaj na tom priključku'], ['RAD', '24/7, pun radni potencijal nakon 3 min']], [['CONNECTION', 'Schuko standard, earth only (one plug with no live contacts)'], ['ADAPTER', 'allowed; extension cords only with an earth contact'], ['NOTE', 'Source home must be the only device on that socket'], ['OPERATION', '24/7, full working potential after 3 min']]), strong: t.safe },
   { type: 'tiles', id: 'test', menu: B('Test', 'Test'), title: t.h2g, items: [[t.t1h, t.t1], [t.t2h, t.t2]], paras: [t.t3], link: { href: 'Blog-post.dc.html?slug=boje-energije', label: t.colors } },
   { type: 'prices', id: 'cene', menu: B('Cene', 'Prices'), title: t.h2h, rows: B([['SOURCE HOME', '25.000 din + dostava', 'do 70 m2'], ['SOURCE HOME PRO', '35.000 din', 'do 120 m2']], [['SOURCE HOME', '25,000 RSD + delivery', 'up to 70 m²'], ['SOURCE HOME PRO', '35,000 RSD', 'up to 120 m²']]), paras: [t.price], note: t.note }
  ], related: ['wifi-ruter-glavni-izvor', 'greska-koja-se-ne-prasta', 'ruter-i-pozitivni-joni'] }),
 'sham': (t, B) => ({
  hero: { title: 'ShAM', lead: t.lead, price: t.from, pdf: 'docs/uputstvo-sham.pdf', media: { type: 'img', src: 'img/k-c11-sham-hero-g.png', alt: t.heroAlt, fit: 'contain', bg: '#fff', ratio: '16/9' } },
  sections: [
   { type: 'text', id: 'sta-je', menu: B('Šta je', 'What it is'), title: t.h2a, paras: [t.p1, B('Tunel efekat · Originalna vibracija · Bez el energije', 'Tunnel effect · Original vibration · No electricity')], note: t.noexp },
   { type: 'media', id: 'nova', menu: B('Nova verzija', 'New version'), title: t.h2b, strongTop: t.tag, paras: [t.p2], quote: t.heals, img: 'img/k-c07-sham-presek-g.png', alt: t.presekAlt, side: 'left' },
   { type: 'feature', id: 'sonda', menu: B('Sonda', 'Probe'), title: t.h2c, lead: t.p3, img: 'img/k-c08-sham-polje-w.png', alt: t.poljeAlt, points: [] },
   { type: 'tiles', id: 'upotreba', menu: B('Upotreba', 'Use'), title: t.h2d, images: [['img/k-c09-sham-orijentacija-g.png', t.orAlt], ['img/k-c10-sham-tok-g.png', t.tokAlt]], paras: [t.use, t.ctx] },
   { type: 'text', id: 'podaci', menu: B('Tehnički podaci', 'Technical data'), title: t.h2e, spec: B([['75%', 'čisti bakar 99,99%'], ['15%', 'PVC plastika'], ['5%', 'silikon'], ['—', 'neodijumski magnet'], ['3%', 'epoksidna smola'], ['2%', 'legura gvožđa i mesinga']], [['75%', 'pure copper 99.99%'], ['15%', 'PVC plastic'], ['5%', 'silicone'], ['—', 'neodymium magnet'], ['3%', 'epoxy resin'], ['2%', 'iron and brass alloy']]), note: t.recy },
   { type: 'prices', id: 'cene', menu: B('Cene', 'Prices'), title: t.h2f, rows: [['ShAM', t.pro1, ''], ['ShAM PRO', t.pro2, '']], paras: [t.plist], note: t.note }
  ], related: ['mi-nismo-baterije', 'svezina-posle-odmora', 'svesno-disanje'] }),
 'paketi': (t, B) => ({
  hero: { title: t.h1, lead: t.lead, price: B('od 33.000 din', 'from 33,000 RSD'), media: { type: 'img', src: 'img/k-c04-kapacitet-g.png', alt: B('Enterijer sa uredjajima Source home i ShAM.', 'Interior with the Source home and ShAM devices.'), fit: 'contain', bg: '#fff' } },
  sections: [
   { type: 'tiles', id: 'paketi', menu: B('Paketi', 'Bundles'), title: B('Paketi i cene', 'Bundles and prices'), items: B([['Family paket', 'HOME + ShAM', '33.000 din + dostava'], ['Space paket', '2x HOME + 2x ShAM', '60.000 din + dostava'], ['Family PRO paket', 'HOME PRO + ShAM PRO', '44.000 din'], ['Space PRO', '2x HOME PRO + 2x ShAM PRO', '82.000 din']], [['Family bundle', 'HOME + ShAM', '33,000 RSD + delivery'], ['Space bundle', '2x HOME + 2x ShAM', '60,000 RSD + delivery'], ['Family PRO bundle', 'HOME PRO + ShAM PRO', '44,000 RSD'], ['Space PRO bundle', '2x HOME PRO + 2x ShAM PRO', '82,000 RSD']]) },
   { type: 'media', id: 'benefiti', menu: B('Benefiti', 'Benefits'), title: t.h2, quote: t.ben, paras: [t.ben2], note: t.note, video: 'video/2025-01-19_11-35-06_UTC.mp4', videoPoster: 'img/k-c04-kapacitet-g.png', videoCap: t.vid }
  ], related: ['greska-koja-se-ne-prasta', 'padovi-energije', 'svezina-posle-odmora'] }),
 'procena': (t, B) => ({
  hero: { title: t.h1, lead: t.body, price: B('0 din', '0 RSD'), cta: t.send, media: { type: 'img', src: sk('2025-11-12_11-06-30_UTC_3764182937168818023.jpg'), alt: t.skAlt, fit: 'cover' } },
  sections: [
   { type: 'text', id: 'posaljite', menu: B('Šta da pošaljete', 'What to send'), title: t.h2a, list: B(['skica stana', 'broj rutera i extendera', 'pametni uredjaji (Google home, Gemini)', 'duplex', 'visina plafona', 'gde provodite najviše vremena'], ['floor plan sketch', 'number of routers and extenders', 'smart devices (Google Home, Gemini)', 'duplex or not', 'ceiling height', 'where you spend most of your time']), quote: t.box },
   { type: 'prices', id: 'cene', menu: B('Cene', 'Prices'), title: t.h2b, rows: [[t.pr1, t.p0, ''], [t.pr2, t.p17, '']] },
   { type: 'gallery', id: 'skice', menu: B('Skice', 'Sketches'), title: t.h2c, items: ['2025-11-12_11-06-30_UTC_3764182937168818023', '2025-11-12_11-06-47_UTC_3764183081142472634', '2025-11-12_11-08-15_UTC_3764184066308988983', '2025-11-12_11-08-17_UTC_3764183906438906141', '2025-11-12_11-08-18_UTC_3764184071065336540', '2025-11-12_11-08-19_UTC_3764183908074695474', '2025-11-12_11-08-20_UTC_3764184072667557506', '2025-11-12_11-08-21_UTC_3764184223159176696', '2025-11-12_11-08-22_UTC_3764184225004652671', '2025-11-12_11-08-23_UTC_3764184265731405414', '2025-11-12_11-08-24_UTC_3764184366747004513', '2025-11-12_11-10-14_UTC_3764185101438073250'].map((f, i) => ({ src: sk(f + '.jpg'), alt: t.skAlt + ' ' + (i + 1) })) }
  ], related: ['formula-procene', 'wifi-ruter-glavni-izvor', 'telefon-i-wifi-24h'] }),
 'implocell': (t, B) => ({
  hero: { title: 'Implocell', lead: t.lead, price: t.price, media: { type: 'img', src: 'img/foto-implocell-voda-1.jpg', alt: t.vAlt, fit: 'cover' } },
  sections: [
   { type: 'media', id: 'opis', menu: B('Opis', 'About'), title: B('Živa voda', 'Live water'), paras: [t.p1, t.p2], link: { href: 'Blog-post.dc.html?slug=implocell-test-vode', label: t.link }, galleryItems: ['foto-implocell-skica-1', 'foto-implocell-skica-2', 'foto-implocell-skica-3', 'foto-implocell-skica-4', 'foto-implocell-skica-5', 'foto-implocell-voda-1', 'foto-implocell-voda-2'].map((f, i) => ({ src: 'img/' + f + '.jpg', alt: (f.includes('voda') ? t.vAlt : t.skAlt) + ' ' + (i + 1) })), galleryLabel: t.photos },
   { type: 'text', id: 'unikat', menu: B('Unikat', 'One of a kind'), title: t.h2u, paras: [t.unik, t.copy], signature: true },
   { type: 'prices', id: 'cene', menu: B('Cena', 'Price'), title: B('Cena', 'Price'), rows: [['Implocell', t.price, t.pline]] }
  ], related: ['voda-i-negativan-naboj', 'implocell-test-vode'] }),
 'ether-pill': (t, B) => ({
  hero: { title: 'Ether pill', lead: t.lead, price: B('na upit', 'on request'), media: { type: 'img', src: 'img/k-ether-pill-card-w.png', alt: B('Crtež uredjaja Ether pill.', 'Drawing of the Ether pill device.'), fit: 'contain', bg: 'rgba(2,40,25,0.25)' } },
  sections: [
   { type: 'text', id: 'projekat', menu: B('Projekat', 'Project'), title: B('Projekat 2022 → 2026', 'Project 2022 → 2026'), quote: t.quote },
   { type: 'text', id: 'celija', menu: B('Foto ćelija', 'Photo cell'), title: t.h2a, paras: [t.cell] },
   { type: 'gallery', id: 'brosura', menu: B('Brošura', 'Brochure'), title: t.h2b, fit: 'contain', items: B(['Kartica Ether pill, 2022: kako je napravljen.', 'Kartica Ether pill, 2022: energetsko polje.', 'Kartica Ether pill, 2022: kako radi.', 'Kartica Ether pill, 2022: sonda izbliza.'], ['Ether pill card, 2022: how it is made.', 'Ether pill card, 2022: energy field.', 'Ether pill card, 2022: how it works.', 'Ether pill card, 2022: probe close-up.']).map((a, i) => ({ src: 'img/foto-ether-pill-2022-' + (i + 1) + '.jpg', alt: a })), paras: [t.soon], link: { href: 'Blog-post.dc.html?slug=ether-pill-put-do-eliksir-vode', label: t.link } }
  ], related: ['ether-pill-put-do-eliksir-vode', 'voda-i-negativan-naboj'] })
};
const data = {};
for (const k of Object.keys(SCHEMA)) {
  data[k] = {};
  for (const L of ['sr', 'en']) {
    const t = STR[k][L];
    const B = (a, b) => L === 'sr' ? a : b;
    data[k][L] = SCHEMA[k](t, B);
  }
}
await saveFile('products-data.js', 'window.SOURCE_PRODUCTS = ' + JSON.stringify(data) + ';\n');
log('ok', JSON.stringify(data).length);
})()
