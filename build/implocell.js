(async () => {
eval(await readFile('tools-i18n.js'));
const F='Implocell.dc.html';const src=await readFile(F);
const grab=(pre)=>{const i=src.indexOf('>'+pre);if(i<0)throw new Error('grab '+pre);return src.slice(i+1,src.indexOf('<',i+1));};
const unik=src.match(/<p style="margin:0">I m p l o c e l l -[\s\S]*?<\/p>/)[0];
const unikSr=unik.replace('<p style="margin:0">','').replace('</p>','');
const pairs=[
['sold','Uredjaj sa snimka je prodat.','The device in the video has been sold.'],
['lead','živa voda · live water','live water'],
['price','750e','€750'],
['p1',grab('Implocell - živa voda'),"Implocell — live water. The device grew as a cutting, an offshoot, of the Ether pill project. That project set out to draw in, by implosion, the energy of photons and bring it alive in water with the help of the Earth's vibration, so that we can drink that amplified, condensed energy through water."],
['h2u','Unikat','One of a kind'],
['copy','Autorska prava kao stvaraoca uredjaja ostaju Izumitelju.','Copyright in the device stays with its inventor.'],
['pline','Cena ovakvog  uredjaja u ovoj izvedbi je','The price of this device in this version is'],
['p2','Implocell prirodne procese pojačava čak 1700 puta, što ima za rezultat, instant promenu površinskog napona vode, uspostavljanje novih hidrogenskih veza, i napona izmedju samih molekula, ovakva voda je u stanju da prodre kroz ćelijsku membranu ( puštena kao " Familiar ") i oporavi naš organizam na svim nivoima u vrlo kratkom roku, sem fizioloških procesa, ovakva voda direktno utiče na nivo svesnosti osobe samo nekoliko sekundi nakon ispijanja iste.','Implocell amplifies natural processes as much as 1,700 times. The result is an instant change in the surface tension of the water, new hydrogen bonds, and new tension between the molecules themselves. Water like this can pass through the cell membrane (released as a "Familiar") and restore the body on every level in a very short time. Beyond physiological processes, this water acts directly on a person\'s level of awareness only a few seconds after they drink it.','noreplace'],
['unik',unikSr,'I m p l o c e l l — the series is limited. We do not make them in larger runs. Every device is a handmade, one-of-a-kind piece. The buyer receives all accompanying documents, with the creator\'s signature and stamp.','noreplace'],
['status','Limitirana serija','Limited series','noreplace'],['link','Prvi test vode iz Implocell-a →','First water test from Implocell →','noreplace'],
['credit','Izumitelj i kreator :','Inventor and creator:','noreplace'],['sigAlt','Potpis Ćetka Ćorluke.','Signature of Ćetko Ćorluka.','noreplace'],
['photos','Fotografije','Photos','noreplace'],['skAlt','Ručni crtež uredjaja Implocell, autor Ćetko Ćorluka','Hand drawing of the Implocell device by Ćetko Ćorluka','noreplace'],['vAlt','Voda napravljena u uredjaju Implocell','Water made in the Implocell device','noreplace'],
['rel','Povezani tekstovi','Related posts','noreplace'],['ctaT','Ostale informacije u Dm.','More information via DM.','noreplace'],['ctaL','Pošaljite poruku','Send a message','noreplace']
];
const bigPh=src.match(/<div style="grid-column:1 \/ -1;aspect-ratio:4\/3;background:#ebefea;border:1px dashed[^>]*>[^<]*<\/div>/)[0];
const gridPh=src.match(/<sc-for list="\{\{ photos \}\}"[\s\S]*?<\/sc-for>/)[0];
const linkA=src.match(/<a href="Blog-post\.dc\.html\?slug=implocell-test-vode"[^>]*>[^<]*<\/a>/)[0];
const sig=src.match(/<span style="width:48px;height:48px;border:1px dashed #659682[^>]*>K-C12<\/span>/)[0];
const edits=[
[BACKLINK_RE.exec(src)[0],CRUMBS],
['<dc-import name="Pill" label="Limitirana serija" tone="dark"','<dc-import name="Pill" label="{{ t.status }}" tone="dark"'],
['<p style="margin:0;font-size:19px;text-wrap:pretty">{{ t.p1 }}</p>','<p style="margin:0;font-size:19px;text-wrap:pretty">{{ t.p1 }}</p>\n      <p style="margin:0;text-wrap:pretty">{{ t.p2 }}</p>'],
[linkA,linkA.replace('href="Blog-post.dc.html?slug=implocell-test-vode"','href="{{ testHref }}"').replace(/>[^<]*<\/a>$/,'>{{ t.link }}</a>')],
[bigPh,'<p style="grid-column:1 / -1;margin:0;font-family:\'Maven Pro\',Arial,sans-serif;font-weight:600;font-size:13px;letter-spacing:0.3em;text-transform:uppercase;color:#034c30">{{ t.photos }}</p>\n      <button onClick="{{ big.open }}" aria-label="{{ big.alt }}" style="grid-column:1 / -1;aspect-ratio:4/3;padding:0;border:0;background:#fff;cursor:zoom-in;overflow:hidden"><img src="img/foto-implocell-skica-1.jpg" alt="{{ big.alt }}" style="width:100%;height:100%;object-fit:cover;display:block"></button>'],
[gridPh,'<sc-for list="{{ photos }}" as="f" hint-placeholder-count="6"><button onClick="{{ f.open }}" aria-label="{{ f.alt }}" style="aspect-ratio:1;padding:0;border:0;background:#fff;cursor:zoom-in;overflow:hidden"><sc-if value="{{ f.src }}" hint-placeholder-val="{{ false }}"><img src="{{ f.src }}" alt="{{ f.alt }}" style="width:100%;height:100%;object-fit:cover;display:block"></sc-if></button></sc-for>'],
[unik,'<p style="margin:0">{{ t.unik }}</p>'],
['<span>Izumitelj i kreator :  <strong style="color:#034c30">Ćetko Ćorluka</strong></span>','<span>{{ t.credit }}  <strong style="color:#034c30">Ćetko Ćorluka</strong></span>'],
[sig,'<img src="img/k-c12-potpis-g.png" alt="{{ t.sigAlt }}" style="width:72px;height:72px;object-fit:contain;display:block">'],
['</section>\n</main>','</section>\n'+RELATED_BLOCK+'</main>'],
['<dc-import name="SiteFooter" ctaTitle="Ostale informacije u Dm." ctaLabel="Pošaljite poruku"','<dc-import name="SiteFooter" ctaTitle="{{ t.ctaT }}" ctaLabel="{{ t.ctaL }}"']
];
const body=`const ph = ['foto-implocell-skica-2','foto-implocell-skica-3','foto-implocell-skica-4','foto-implocell-skica-5','foto-implocell-voda-1','foto-implocell-voda-2'];
    return {
      t, ${CRUMB_VAL(F,'Implocell','Implocell')}
      testHref: S.href('Blog-post.dc.html', 'slug=implocell-test-vode'),
      big: { alt: t.skAlt + ' 1', open: lb('img/foto-implocell-skica-1.jpg', t.skAlt + ' 1') },
      photos: ph.map((f,i) => { const alt = f.includes('voda') ? t.vAlt + ' ' + (i - 3) : t.skAlt + ' ' + (i + 2); return { src: 'img/' + f + '.jpg', alt, open: lb('img/' + f + '.jpg', alt) }; }),
      relTitle: t.rel, related: ['voda-i-negativan-naboj','implocell-test-vode'].map(postCard)
    };`;
const seo=productSeo(F,'Implocell','Implocell','Implocell — Source','Implocell — Source','Živa voda. Ručno izradjen unikat iz limitirane serije. 750e.','Live water. A handmade, one-of-a-kind device from a limited series. €750.','img/foto-implocell-voda-1.jpg','750','EUR');
let out=await i18n(F,pairs,edits,(a,b)=>pageLogic(a,b,body,seo,true),{posts:true});
await saveFile(F,out);log('ok',out.includes('dashed'));
})()
