(async () => {
eval(await readFile('tools-i18n.js'));
const F='O-nama.dc.html';const src=await readFile(F);
const grab=(pre)=>{const i=src.indexOf('>'+pre);if(i<0)throw new Error('grab '+pre);return src.slice(i+1,src.indexOf('<',i+1));};
const teslaP=src.match(/<p style="margin:0;font-size:16px">Tesla naucna[\s\S]*?<\/p>/)[0];
const pairs=[
['eyebrow','Osnivač','Founder'],
['bio',grab('Ćetko Ćorluka - izumitelj'),'Ćetko Ćorluka is the inventor and creator of Source products. The goal of the work is to help 21st-century people become aware of their energy and reprogram it, so that we and modern technology can live side by side.'],
['h2a','Priča','Story'],
['s1','2020 godina, moj rad na temu, Medjućelijska komunikacija - prevencija i zaštita.','2020: my paper "Intercellular communication — prevention and protection".'],
['s2',grab('Alek Račić'),'Alek Račić was the first to see the elements and the potential of the work and to help develop the idea in practice. I then presented the paper to a committee at the research centre of the Clinical Centre of Serbia. The result? Verification and a strong tailwind: I became an honorary member of the Serbian Development Academy.'],
['h2b','Hronologija','Timeline'],
['h2c','Mediji i događaji','Media and events'],
['d1','jul 2025','July 2025'],['d2','april 2026','April 2026'],['d3','nov 2024','Nov 2024'],
['h3a','Tesla · Art &amp; tehnology','Tesla · Art & Technology'],
['h3c','Istočnik · intervju','Istočnik · interview'],
['b92',grab('B92, ponedeljak'),'B92, Monday at 9:15: "Horizont stvarnosti" (Horizon of Reality), a show that pushes the limits of knowledge and gives space to the most original minds of our time.'],
['ist',grab('Intervju na kanalu'),'Interview on the Istočnik channel: "Ether pill — taking information directly from the Ether". Watch the full interview on the Istočnik YouTube channel (Ćetko Ćorluka).'],
['tesla',teslaP.replace('<p style="margin:0;font-size:16px">','').replace('</p>','').replace(/&amp;/g,'&').replace(/<br>/g,'\n'),"The Tesla Science Foundation organised an exhibition in honour of Nikola Tesla, \"Art & Technology\", at King Peter's House. We presented our Source home. Thanks to the organisers. The exhibition runs from 8 to 24 July.",'noreplace'],
['sigAlt','Potpis Ćetka Ćorluke.','Signature of Ćetko Ćorluka.','noreplace'],['portrait','portret · zatražiti original visoke rezolucije','portrait · high-resolution original requested','noreplace'],
['presAlt','Slajd prezentacije: istorija rada','Presentation slide: history of the work','noreplace'],['shotAlt','Snimak ekrana iz 2020. godine','Screenshot from 2020','noreplace'],['teslaAlt','Source home na izložbi Art & tehnology, Kuća Kralja Petra, jul 2025.',"Source home at the Art & Technology exhibition, King Peter's House, July 2025.",'noreplace'],
['b92v','Video: B92, Horizont stvarnosti','Video: B92, Horizont stvarnosti','noreplace'],['istv','Video: intervju na kanalu Istočnik','Video: interview on the Istočnik channel','noreplace'],['creator','Izumitelj i kreator','Inventor and creator','noreplace']
];
const sig=src.match(/<div style="width:56px;height:56px;border:1px dashed #8fbeaa[^>]*>K-C12<\/div>/)[0];
const port=src.match(/<div style="aspect-ratio:4\/5;max-width:420px;[^>]*>[^<]*<\/div>/)[0];
const ph1=src.match(/<div style="aspect-ratio:3\/4;background:#ebefea;border:1px dashed #659682[^>]*>prez[^<]*<\/div>/)[0];
const ph2=src.match(/<div style="aspect-ratio:3\/4;background:#ebefea;border:1px dashed #659682[^>]*>2020[^<]*<\/div>/)[0];
const tes=src.match(/<div style="aspect-ratio:16\/9;background:#ebefea;display:flex;align-items:flex-end;padding:10px;[^>]*>izložba · 3 fotografije<\/div>/)[0];
const v1=src.match(/<div style="aspect-ratio:16\/9;background:#191b1c;display:flex;align-items:center;justify-content:center;position:relative"><button aria-label="Pusti video"[\s\S]*?<\/button><\/div>/)[0];
const v2=src.match(/<div style="aspect-ratio:16\/9;background:#191b1c;display:flex;align-items:center;justify-content:center"><button aria-label="Pusti YouTube intervju"[\s\S]*?<\/button><\/div>/)[0];
const edits=[
['<h1 style','<dc-import name="Breadcrumbs" items="{{ crumbs }}" hint-size="100%,32px"></dc-import>\n      <h1 style'],
['padding:112px 16px 56px;display:grid','padding:88px 16px 56px;display:grid'],
[sig,'<figure style="margin:0;display:flex;align-items:center;gap:12px"><img src="img/k-c12-potpis-w.png" alt="{{ t.sigAlt }}" style="width:72px;height:72px;object-fit:contain;display:block"><figcaption style="font-size:13px;color:#8fbeaa">{{ t.creator }}</figcaption></figure>'],
[port,port.replace(/>[^<]*<\/div>$/,'>{{ t.portrait }}</div>')],
[ph1,'<button onClick="{{ open1 }}" aria-label="{{ t.presAlt }}" style="aspect-ratio:3/4;padding:0;border:1px solid #ebefea;background:#fff;cursor:zoom-in;overflow:hidden"><img src="img/2025-07-08_11-57-16_UTC_3672162050944189248.jpg" alt="{{ t.presAlt }}" style="width:100%;height:100%;object-fit:cover;display:block"></button>'],
[ph2,'<button onClick="{{ open2 }}" aria-label="{{ t.shotAlt }}" style="aspect-ratio:3/4;padding:0;border:1px solid #ebefea;background:#fff;cursor:zoom-in;overflow:hidden"><img src="img/2026-02-20_19-11-12_UTC.webp" alt="{{ t.shotAlt }}" style="width:100%;height:100%;object-fit:cover;display:block"></button>'],
[tes,'<button onClick="{{ open3 }}" aria-label="{{ t.teslaAlt }}" style="aspect-ratio:16/9;padding:0;border:0;background:#ebefea;cursor:zoom-in;overflow:hidden"><img src="img/2025-07-08_11-57-17_UTC_3672162048276516228.jpg" alt="{{ t.teslaAlt }}" style="width:100%;height:100%;object-fit:cover;display:block"></button>'],
[teslaP,'<p style="margin:0;font-size:16px;white-space:pre-line">{{ t.tesla }}</p>'],
[v1,'<dc-import name="Video" src="video/2026-04-19_15-35-16_UTC.mp4" label="{{ t.b92v }}" autoplay="{{ false }}" hint-size="100%,200px"></dc-import>'],
[v2,'<dc-import name="Video" src="video/2024-11-19_14-16-44_UTC.mp4" label="{{ t.istv }}" autoplay="{{ false }}" hint-size="100%,200px"></dc-import>']
];
const body=`return {
      t, crumbs: S.crumbs([['Početna','Home','Pocetna.dc.html'],['O nama','About','O-nama.dc.html']]),
      open1: lb('img/2025-07-08_11-57-16_UTC_3672162050944189248.jpg', t.presAlt), open2: lb('img/2026-02-20_19-11-12_UTC.webp', t.shotAlt), open3: lb('img/2025-07-08_11-57-17_UTC_3672162048276516228.jpg', t.teslaAlt),
      timeline: (en ? [['2020','Paper "Intercellular communication — prevention and protection"'],['2022','Start of the Ether pill project'],['2024','Source home and ShAM, brochures and manuals'],['Nov 2024','Interview on the Istočnik channel (Ether pill)'],['Jun 2025','New ShAM version with a neodymium magnet'],['Jul 2025',"Exhibition \\"Art & Technology\\", King Peter's House, Belgrade"],['Nov 2025','Zeleni bazar (Green Bazaar)'],['Apr 2026','B92, "Horizont stvarnosti" (Horizon of Reality)'],['Sep 2026','Implocell, limited series']]
        : [['2020','Rad "Medjućelijska komunikacija - prevencija i zaštita"'],['2022','Početak projekta Ether pill'],['2024','Source home i ShAM, brošure i uputstva'],['nov 2024','Intervju na kanalu "Istočnik" (Ether pill)'],['jun 2025','Nova verzija ShAM sa neodijumskim magnetom'],['jul 2025','Izložba "Art & tehnology", Kuća Kralja Petra'],['nov 2025','Zeleni bazar'],['apr 2026','B92, "Horizont stvarnosti"'],['sep 2026','Implocell, limitirana serija']]).map(([d,e]) => ({ d, e }))
    };`;
const seo=`S.seo({ paths: ['/o-nama', '/en/about'], image: 'img/2025-07-08_11-57-16_UTC_3672162050944189248.jpg', title: en ? 'About Source — Ćetko Ćorluka' : 'O nama — Ćetko Ćorluka · Source', desc: en ? 'The inventor behind Source home, ShAM, Implocell and Ether pill. Timeline, exhibitions and interviews.' : 'Izumitelj uredjaja Source home, ShAM, Implocell i Ether pill. Hronologija, izložbe i intervjui.', crumbs: S.crumbs([['Početna','Home','Pocetna.dc.html'],['O nama','About','O-nama.dc.html']]) });`;
let out=await i18n(F,pairs,edits,(a,b)=>pageLogic(a,b,body,seo,false),{});
await saveFile(F,out);log('ok',(out.match(/dashed/g)||[]).length);
})()
