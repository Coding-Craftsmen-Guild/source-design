(async () => {
eval(await readFile('tools-i18n.js'));
const F='Ether-pill.dc.html';const src=await readFile(F);
const grab=(pre)=>{const i=src.indexOf('>'+pre);if(i<0)throw new Error('grab '+pre);return src.slice(i+1,src.indexOf('<',i+1));};
const pairs=[
['lead','Ether pill - imolozivni reaktor osnovne životne energije,','Ether pill — an implosion reactor of basic life energy.'],
['quote',grab('Naš najveći projekat'),'Our biggest project, Ether pill, started in 2022, has finally come to fruition. I am happy with the test results […] The goal of the project was and remains "Elixir water". I put all my knowledge into one whole, respecting every property of photons and electrons, of water as a carrier of information, and of the ways we can drink it […] My bioelectronic mushroom has finally seen the light of day. We will present the final product, with all data, photos and videos, on our profile.'],
['h2a','Foto ćelija','Photo cell'],
['cell',grab('Ether photo cell'),'The Ether photo cell connects light and water under controlled conditions. It is an orgone cell with an output: copper winding without an end, and a magnetic field around a graphite nanotube core, all set in resin with a special magnifying shape. Its output leads into the water in a glass. The accumulated light energy stays trapped in the salt water as information, and for some time after the cell is removed from the glass, a higher energy charge can still be recorded.'],
['h2b','Brošura 2022','Brochure 2022'],
['soon','Uskoro serijal i detaljana priča koja je trajala 4 godine do potpune manifestacije ideje.','Coming soon: a series and the full story of the four years it took for the idea to fully take shape.'],
['status','Uskoro / na upit','Coming soon / on request','noreplace'],['link','Ether pill: put do "Eliksir vode" →','Ether pill: the road to "Elixir water" →','noreplace'],
['rel','Povezani tekstovi','Related posts','noreplace'],['ctaT','Ether pill — na upit','Ether pill — on request','noreplace'],['ctaL','Na upit','On request','noreplace']
];
const main=src.match(/<div style="aspect-ratio:4\/3;background:#ebefea;border:1px dashed #083868[^>]*>[^<]*<\/div>/)[0];
const grid=src.match(/<sc-for list="\{\{ pages \}\}"[\s\S]*?<\/sc-for>/)[0];
const linkA=src.match(/<a href="Blog-post\.dc\.html\?slug=ether-pill-put-do-eliksir-vode"[^>]*>[^<]*<\/a>/)[0];
const edits=[
[BACKLINK_RE.exec(src)[0],CRUMBS],
['<dc-import name="Pill" label="Uskoro / na upit" tone="dark"','<dc-import name="Pill" label="{{ t.status }}" tone="dark"'],
[main,'<button onClick="{{ cover.open }}" aria-label="{{ cover.alt }}" style="aspect-ratio:4/3;padding:8px;border:1px solid #ebefea;background:#fff;cursor:zoom-in"><img src="img/foto-ether-pill-2022-1.jpg" alt="{{ cover.alt }}" style="width:100%;height:100%;object-fit:contain;display:block"></button>'],
[grid,'<sc-for list="{{ pages }}" as="g" hint-placeholder-count="4"><button onClick="{{ g.open }}" aria-label="{{ g.alt }}" style="aspect-ratio:3/4;padding:8px;border:1px solid #ebefea;background:#fff;cursor:zoom-in"><sc-if value="{{ g.src }}" hint-placeholder-val="{{ false }}"><img src="{{ g.src }}" alt="{{ g.alt }}" style="width:100%;height:100%;object-fit:contain;display:block"></sc-if></button></sc-for>'],
[linkA,linkA.replace('href="Blog-post.dc.html?slug=ether-pill-put-do-eliksir-vode"','href="{{ postHref }}"').replace(/>[^<]*<\/a>$/,'>{{ t.link }}</a>')],
['</section>\n</main>','</section>\n'+RELATED_BLOCK+'</main>'],
['<dc-import name="SiteFooter" ctaTitle="Ether pill — na upit" ctaLabel="Na upit"','<dc-import name="SiteFooter" ctaTitle="{{ t.ctaT }}" ctaLabel="{{ t.ctaL }}"']
];
const body=`const alts = en ? ['Ether pill card, 2022: how it is made.','Ether pill card, 2022: energy field.','Ether pill card, 2022: how it works.','Ether pill card, 2022: probe close-up.'] : ['Kartica Ether pill, 2022: kako je napravljen.','Kartica Ether pill, 2022: energetsko polje.','Kartica Ether pill, 2022: kako radi.','Kartica Ether pill, 2022: sonda izbliza.'];
    return {
      t, ${CRUMB_VAL(F,'Ether pill','Ether pill')}
      postHref: S.href('Blog-post.dc.html', 'slug=ether-pill-put-do-eliksir-vode'),
      cover: { alt: alts[0], open: lb('img/foto-ether-pill-2022-1.jpg', alts[0]) },
      pages: alts.map((a,i) => ({ src: 'img/foto-ether-pill-2022-' + (i+1) + '.jpg', alt: a, open: lb('img/foto-ether-pill-2022-' + (i+1) + '.jpg', a) })),
      relTitle: t.rel, related: ['ether-pill-put-do-eliksir-vode','voda-i-negativan-naboj'].map(postCard)
    };`;
const seo=productSeo(F,'Ether pill','Ether pill','Ether pill — Source','Ether pill — Source','Implozivni reaktor osnovne životne energije. Projekat 2022–2026, na upit.','An implosion reactor of basic life energy. Project 2022–2026, on request.','img/foto-ether-pill-2022-1.jpg','','');
let out=await i18n(F,pairs,edits,(a,b)=>pageLogic(a,b,body,seo,true),{posts:true});
await saveFile(F,out);log('ok',out.includes('dashed'));
})()
