(async () => {
eval(await readFile('tools-i18n.js'));
const F='Paketi.dc.html';const src=await readFile(F);
const grab=(pre)=>{const i=src.indexOf('>'+pre);if(i<0)throw new Error('grab '+pre);return src.slice(i+1,src.indexOf('<',i+1));};
const pairs=[
['h1','Paketi','Bundles'],
['lead',grab('Home Polarizacija'),"Home: polarisation and energy levelling of the Ether in your space. ShAM: a change in the body's vibration, feeding the body with electrons, direct grounding, with original white noise."],
['h2','Benefiti','Benefits'],
['ben',grab('Benefiti : Dobar san'),'Benefits users report: good sleep, a lasting sense of calm, a clear mind, relaxation, faster recovery, and a distinct feeling of peace in your home.'],
['note','Navedeni efekti su iskustva korisnika i nisu medicinski dokazani.','The effects listed are user experiences and are not medically proven.'],
['ben2','Otklanjanje tehnogenog uticaja zračenja na nas, oporavak centralnog nervnog i endokrinog sistema, promena raspoloženja, povećanje vitalne energije, vraćanje volje i kontinuirano povećanje energije 🙏','Removing the effect of technogenic radiation on us, recovery of the central nervous and endocrine systems, a change of mood, more vital energy, the return of willpower, and a continuous rise in energy 🙏','noreplace'],
['vid','Video: Source home i ShAM','Video: Source home and ShAM','noreplace'],['rel','Povezani tekstovi','Related posts','noreplace'],['cta','Zatražite ponudu','Request a quote','noreplace'],['ctaT','Family ili Space paket','Family or Space bundle','noreplace']
];
const vid=src.match(/<div style="aspect-ratio:16\/9;background:#191b1c;display:flex;align-items:center;justify-content:center;position:relative">[\s\S]*?video · 2025-01-19_11-35-06\.mp4<\/span>\s*<\/div>/)[0];
const edits=[
[BACKLINK_RE.exec(src)[0],CRUMBS],
['<p style="margin:0;font-size:14px;color:#4d5a42">{{ t.note }}</p>','<p style="margin:0;text-wrap:pretty">{{ t.ben2 }}</p>\n      <p style="margin:0;font-size:14px;color:#4d5a42">{{ t.note }}</p>'],
[vid,'<dc-import name="Video" src="video/2025-01-19_11-35-06_UTC.mp4" poster="img/k-c04-kapacitet-g.png" label="{{ t.vid }}" hint-size="100%,260px"></dc-import>'],
['<span style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:#b8501c">sadržaj potvrditi sa klijentom</span>','<span style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:#b8501c">{{ k.confirmTxt }}</span>'],
['</section>\n</main>','</section>\n'+RELATED_BLOCK+'</main>'],
['<dc-import name="SiteFooter" ctaTitle="Family ili Space paket"','<dc-import name="SiteFooter" ctaTitle="{{ t.ctaT }}" ctaLabel="{{ t.cta }}" marks="{{ marks }}"']
];
const body=`return {
      t, marks: S.marks, ${CRUMB_VAL(F,'Paketi','Bundles')}
      packs: (en ? [
        { tier: 'standard', name: 'Family bundle', content: 'HOME + ShAM', price: '33,000 RSD + delivery' },
        { tier: 'standard', name: 'Space bundle', content: '2x HOME + 2x ShAM', price: '60,000 RSD + delivery' },
        { tier: 'PRO', name: 'Family PRO bundle', content: 'HOME PRO + ShAM PRO', price: '44,000 RSD', confirm: true },
        { tier: 'PRO', name: 'Space PRO bundle', content: '2x HOME PRO + 2x ShAM PRO', price: '82,000 RSD', confirm: true }
      ] : [
        { tier: 'standard', name: 'Family paket', content: 'HOME + ShAM', price: '33.000 din + dostava' },
        { tier: 'standard', name: 'Space paket', content: '2x HOME + 2x ShAM', price: '60.000 din + dostava' },
        { tier: 'PRO', name: 'Family PRO paket', content: 'HOME PRO + ShAM PRO', price: '44.000 din', confirm: true },
        { tier: 'PRO', name: 'Space PRO', content: '2x HOME PRO + 2x ShAM PRO', price: '82.000 din', confirm: true }
      ]).map(k => ({ ...k, confirm: !!k.confirm && S.marks, confirmTxt: 'sadržaj potvrditi sa klijentom' })),
      relTitle: t.rel, related: ['greska-koja-se-ne-prasta','padovi-energije','svezina-posle-odmora'].map(postCard)
    };`;
const seo=productSeo(F,'Paketi','Bundles','Paketi — Source','Bundles — Source','Source home i ShAM zajedno, za vaš prostor i za telo. Od 33.000 din.','Source home and ShAM together, for your space and your body. From 33,000 RSD.','img/k-c04-kapacitet-g.png','33000','RSD');
let out=await i18n(F,pairs,edits,(a,b)=>pageLogic(a,b,body,seo,true),{posts:true});
await saveFile(F,out);log('ok');
})()
