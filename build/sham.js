(async () => {
eval(await readFile('tools-i18n.js'));
const F='ShAM.dc.html';const src=await readFile(F);
const grab=(pre)=>{const i=src.indexOf('>'+pre);if(i<0)throw new Error('grab '+pre);return src.slice(i+1,src.indexOf('<',i+1));};
const pairs=[
['lead',grab('ShAM je  generator'),'ShAM generates original white noise. It passes the vibration and energy of planet Earth to your body: an original pulse that tunes our biological oscillators, grounds us and levels our energy. Feel light and motivated.'],
['h2a','Šta je ShAM','What is ShAM'],
['p1',grab('Originalan beli šum'),'Original white noise activates energy points on the body. It grounds the body and enriches it with free electrons. You can place the device on any part of the body. It delivers more than 100 natural frequencies per second and, through the steady pulse of planet Earth, tunes and aligns our biological oscillators with the universe.'],
['noexp','Nema ograničen rok trajanja, ne troši se upotrebom.','No expiry date. It does not wear out with use.'],
['h2b','Nova verzija 2025','New version 2025'],
['p2',grab('Ovo je nova verzija'),'This is the new version for 2025. It has shown a remarkable effect in a very short time, thanks to a chamber with a toroidal neodymium magnet inside the device. The magnet sends energy into the body and charges us, while the original white noise aligns all physiological processes.'],
['h2c','Bakarna sonda','Copper probe'],
['p3',grab('sham predstavlja'),'ShAM is a vibration probe made of pure copper. Through a sound conductor (a microphone) it receives the pulse and rhythm of the earth itself. The core of the device multiplies the incoming information and spreads it 60x over the round part of the probe, which is shaped to pass the vibration to your skin. The outside is insulated so that the energy stays focused and does not scatter into the space.'],
['h2d','Kako se koristi','How to use it'],
['use','Upotreba - aktivno korišćenje svakodnevno 15 - 30 min. (Detalji u Brošuri )','Use: actively, every day, 15–30 min (details in the brochure).'],
['ctx','možete ga koristiti dok radite za računarom, odmarate, meditirate ili spavate.','You can use it while you work at the computer, rest, meditate or sleep.'],
['h2e','Tehnički podaci','Technical data'],
['recy','Izradjeno od recikliranih materijala · Made in Serbia','Made from recycled materials · Made in Serbia'],
['h2f','Cene','Prices'],
['plist',grab('ShAM - promena vibracije'),'ShAM changes the vibration of the body and grounds it directly. Users report better sleep, more vital energy, a clear mind and calm. Use: actively, every day, 15–30 min (details in the brochure).'],
['note','Navedeni efekti su iskustva korisnika i nisu medicinski dokazani.','The effects listed are user experiences and are not medically proven.'],
['h2g','Uputstvo','Manual (in Serbian)'],
['tag','Novi - ShAM - 50% jače dejstvo, 35% brže dejstvo, Nova tehnologija sa Neodijumskim magnetom.','New — ShAM — 50% stronger effect, 35% faster effect. New technology with a neodymium magnet.','noreplace'],
['heals','ShAM je mirkofon od najfinijih materijala koji sem energije prenosi zvuk vrlo male snage sa ogromnim potencijalnom, ta masa konstantna nas leči','ShAM is a microphone made of the finest materials. Besides energy, it carries sound of very low power with enormous potential. That constant mass heals us.','noreplace'],
['status','dostupno','available','noreplace'],['from','od 10.800 din','from 10,800 RSD','noreplace'],['cta','Zatražite ponudu','Request a quote','noreplace'],
['heroAlt','Uredjaj ShAM.','The ShAM device.','noreplace'],['presekAlt','Presek uredjaja ShAM: bakarna sonda, torusni neodijumski magnet, izolacija.','Cross-section of the ShAM device: copper probe, toroidal neodymium magnet, insulation.','noreplace'],
['poljeAlt','Polje bakarne sonde uredjaja ShAM.','Field of the ShAM copper probe.','noreplace'],['orAlt','Kako se ShAM postavlja na telo.','How to place ShAM on the body.','noreplace'],['tokAlt','Tok energije kroz uredjaj ShAM.','Energy flow through the ShAM device.','noreplace'],
['rel','Povezani tekstovi','Related posts','noreplace'],['page','strana','page','noreplace'],['pro2','12.500 din + dostava','12,500 RSD + delivery','noreplace'],['pro1','10.800 din + dostava','10,800 RSD + delivery','noreplace']
];
const edits=[
[BACKLINK_RE.exec(src)[0],CRUMBS],
['<dc-import name="Pill" label="dostupno" tone="dark"','<dc-import name="Pill" label="{{ t.status }}" tone="dark"'],
['>od 10.800 din<','>{{ t.from }}<'],
['text-decoration:none">Zatražite ponudu</a>','text-decoration:none">{{ t.cta }}</a>'],
['<img src="img/k-c07-sham-presek-g.png" alt="Uredjaj ShAM u preseku." style="width:100%;height:100%;object-fit:contain;display:block">','<img src="img/k-c11-sham-hero-g.png" alt="{{ t.heroAlt }}" style="width:100%;height:100%;object-fit:contain;display:block">'],
[`<span style="position:absolute;left:0;bottom:0;background:#034c30;color:#8fbeaa;font-family:'JetBrains Mono',monospace;font-size:11px;padding:4px 8px">K-C11 · privremeno: K-C07</span>`,''],
['<div style="aspect-ratio:4/3;background:#fff;position:relative">','<div style="aspect-ratio:16/9;background:#fff;position:relative">'],
['alt="Presek uredjaja ShAM: bakarna sonda, torusni neodijumski magnet, izolacija."','alt="{{ t.presekAlt }}"'],
['<li><span style="color:#659682">01</span> bakarna sonda</li><li><span style="color:#659682">02</span> neodijumski magnet (torus)</li><li><span style="color:#659682">03</span> izolacija</li>','<sc-for list="{{ parts }}" as="x" hint-placeholder-count="3"><li><span style="color:#659682">{{ x.n }}</span> {{ x.t }}</li></sc-for>'],
['<p style="margin:0;text-wrap:pretty">{{ t.p2 }}</p>','<p style="margin:0;font-weight:600;color:#034c30">{{ t.tag }}</p>\n      <p style="margin:0;text-wrap:pretty">{{ t.p2 }}</p>\n      <p style="margin:0;padding-left:16px;border-left:2px solid #034c30;font-style:italic;color:#034c30">{{ t.heals }}</p>'],
['<dc-import name="Pill" label="Tvrdnja · provera" tone="claim" style="display:inline-block;margin-left:8px;vertical-align:middle" hint-size="130px,26px"></dc-import>','',1],
['alt="Polje bakarne sonde uredjaja ShAM."','alt="{{ t.poljeAlt }}"'],
[`<span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#b8501c">potvrditi: 12.500 (cenovnik) ili 11.600 (post 2026-10-29)</span>`,`<sc-if value="{{ marks }}" hint-placeholder-val="{{ false }}"><span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#b8501c">potvrditi: 12.500 (cenovnik) ili 11.600 (post 2026-10-29)</span></sc-if>`],
['>12.500 din + dostava<','>{{ t.pro2 }}<'],
['>10.800 din + dostava<','>{{ t.pro1 }}<'],
['<dc-import name="SiteFooter" ctaTitle="ShAM"','<dc-import name="SiteFooter" ctaTitle="ShAM" ctaLabel="{{ t.cta }}" marks="{{ marks }}"'],
['</section>\n\n</main>','</section>\n'+RELATED_BLOCK+'\n</main>'],
['<dc-import name="Pill" label="Tunel efekat" tone="light"','<dc-import name="Pill" label="{{ tags.a }}" tone="light"'],['<dc-import name="Pill" label="Originalna vibracija" tone="light"','<dc-import name="Pill" label="{{ tags.b }}" tone="light"'],['<dc-import name="Pill" label="Bez el energije" tone="light"','<dc-import name="Pill" label="{{ tags.c }}" tone="light"']
];
const ph=src.match(/<div style="aspect-ratio:4\/3;background:#fff;border:1px dashed #659682[^>]*>K-C09 · orijentacija<\/div>\s*<div style="aspect-ratio:4\/3;background:#fff;border:1px dashed #659682[^>]*>K-C10 · tok energije<\/div>/)[0];
edits.push([ph,'<img src="img/k-c09-sham-orijentacija-g.png" alt="{{ t.orAlt }}" style="width:100%;aspect-ratio:4/3;object-fit:contain;display:block;background:#fff">\n      <img src="img/k-c10-sham-tok-g.png" alt="{{ t.tokAlt }}" style="width:100%;aspect-ratio:4/3;object-fit:contain;display:block;background:#fff">']);
const mb=src.match(/<button style="aspect-ratio:9\/16;background:#ebefea;border:1px dashed #659682[^>]*>strana \{\{ m\.n \}\} · \{\{ m\.t \}\}<\/button>/)[0];
edits.push([mb,`<button onClick="{{ m.open }}" aria-label="{{ m.label }}" style="padding:0;border:1px solid #c3bfab;background:#fff;cursor:zoom-in;display:flex;flex-direction:column"><sc-if value="{{ m.src }}" hint-placeholder-val="{{ false }}"><img src="{{ m.src }}" alt="{{ m.label }}" style="width:100%;aspect-ratio:9/16;object-fit:cover;display:block"></sc-if><span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#4d5a42;padding:6px 8px">{{ m.cap }}</span></button>`]);
const body=`const man = ['2025-09-14_21-30-33_UTC_3721735262142266059','2025-09-14_21-35-45_UTC_3721737879773830532','2025-09-14_21-37-03_UTC_3721738535519674580','2025-09-14_21-36-20_UTC_3721738174784340532'];
    return {
      t, marks: S.marks, ${CRUMB_VAL(F,'ShAM','ShAM')}
      tags: en ? { a: 'Tunnel effect', b: 'Original vibration', c: 'No electricity' } : { a: 'Tunel efekat', b: 'Originalna vibracija', c: 'Bez el energije' },
      parts: (en ? ['copper probe','neodymium magnet (torus)','insulation'] : ['bakarna sonda','neodijumski magnet (torus)','izolacija']).map((x,i) => ({ n: '0' + (i+1), t: x })),
      mats: (en ? [['75%','pure copper 99.99%',75],['15%','PVC plastic',15],['5%','silicone',5],['','neodymium magnet',0],['3%','epoxy resin',3],['2%','iron and brass alloy',2]] : [['75%','čisti bakar 99,99%',75],['15%','PVC plastika',15],['5%','silikon',5],['','neodijumski magnet',0],['3%','epoksidna smola',3],['2%','legura gvožđa i mesinga',2]]).map(([p,x,w]) => ({ p, t: x, w: w + '%' })),
      manual: man.map((f,i) => { const cap = t.h2g + ' · ' + t.page + ' ' + (i+1); return { src: 'img/' + f + '.jpg', cap: t.page + ' ' + (i+1), label: cap, open: lb('img/' + f + '.jpg', cap) }; }),
      relTitle: t.rel, related: ['mi-nismo-baterije','svezina-posle-odmora','svesno-disanje'].map(postCard)
    };`;
const seo=productSeo(F,'ShAM','ShAM','ShAM — Source','ShAM — Source','Bakarna sonda sa originalnim belim šumom koja uzemljuje vaše telo. Od 10.800 din.','Copper probe with original white noise that grounds your body. From 10,800 RSD.','img/k-c11-sham-hero-g.png','10800','RSD');
let out=await i18n(F,pairs,edits,(a,b)=>pageLogic(a,b,body,seo,true),{posts:true});
await saveFile(F,out);log('ok',out.includes('Tvrdnja'),out.includes('dashed'));
})()
