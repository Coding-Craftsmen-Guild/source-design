(async () => {
eval(await readFile('tools-i18n.js'));
const F='Procena-prostora.dc.html';const src=await readFile(F);
const grab=(pre)=>{const i=src.indexOf('>'+pre);if(i<0)throw new Error('grab '+pre);return src.slice(i+1,src.indexOf('<',i+1));};
const pairs=[
['h1','Procena prostora','Space assessment'],
['body',grab('Formula procene'),'Assessment formula: Google Home, Gemini smart devices, 1 router, 2 routers, 1 router + 2 extenders, is your space a duplex? Ceiling height, room volume, and the time you spend in each part of the space during the day. All of this is essential for calculating the load on your space. It lets us work out the cumulative and absorbed radiation in your space, which is also the main way devices affect us through the space.'],
['h2a','Šta da pošaljete','What to send'],
['h2b','Cene','Prices'],
['pr1','Procena (skica)','Assessment (sketch)'],
['pr2','Procena teren — pravna lica','On-site assessment — companies'],
['boxH','Greška koja se ne prašta',"A mistake you can't undo"],
['box',grab('Greška koja se ne prašta -'),"A mistake you can't undo: less than 2.5 m of open space between the Wi-Fi router and your body is a problem no device can solve. The only fix is to do less: move the router."],
['h2c','Primeri skica','Sample sketches'],
['send','Pošaljite skicu','Send a sketch','noreplace'],['p0','0 din','0 RSD','noreplace'],['p17','17.000 din','17,000 RSD','noreplace'],['rel','Povezani tekstovi','Related posts','noreplace'],['skAlt','Primer skice osnove stana','Sample floor plan sketch','noreplace'],['ctaT','Pošaljite skicu u Instagram poruci','Send your sketch by Instagram message','noreplace']
];
const skb=src.match(/<button style="aspect-ratio:3\/4;background:#fff;border:1px dashed #659682[^>]*>[^<]*<\/button>/)[0];
const edits=[
[BACKLINK_RE.exec(src)[0],CRUMBS],
['text-decoration:none">Pošaljite skicu</a>','text-decoration:none">{{ t.send }}</a>'],
['>0 din<','>{{ t.p0 }}<'],['>17.000 din<','>{{ t.p17 }}<'],
[skb,'<button onClick="{{ s.open }}" aria-label="{{ s.alt }}" style="aspect-ratio:3/4;padding:0;background:#fff;border:1px solid #c3bfab;cursor:zoom-in;overflow:hidden"><sc-if value="{{ s.src }}" hint-placeholder-val="{{ false }}"><img src="{{ s.src }}" alt="{{ s.alt }}" style="width:100%;height:100%;object-fit:cover;display:block"></sc-if></button>'],
['\n    <p style="margin:0;font-size:14px;color:#4d5a42">Imena i adrese na skicama su zamagljeni.</p>',''],
['</section>\n</main>','</section>\n'+RELATED_BLOCK+'</main>'],
['<dc-import name="SiteFooter" ctaTitle="Pošaljite skicu u Instagram poruci" ctaLabel="Pošaljite skicu"','<dc-import name="SiteFooter" ctaTitle="{{ t.ctaT }}" ctaLabel="{{ t.send }}"']
];
const body=`const sk = ['2025-11-12_11-06-30_UTC_3764182937168818023','2025-11-12_11-06-47_UTC_3764183081142472634','2025-11-12_11-08-15_UTC_3764184066308988983','2025-11-12_11-08-17_UTC_3764183906438906141','2025-11-12_11-08-18_UTC_3764184071065336540','2025-11-12_11-08-19_UTC_3764183908074695474','2025-11-12_11-08-20_UTC_3764184072667557506','2025-11-12_11-08-21_UTC_3764184223159176696','2025-11-12_11-08-22_UTC_3764184225004652671','2025-11-12_11-08-23_UTC_3764184265731405414','2025-11-12_11-08-24_UTC_3764184366747004513','2025-11-12_11-10-14_UTC_3764185101438073250'];
    return {
      t, ${CRUMB_VAL(F,'Procena prostora','Space assessment')}
      check: (en ? ['floor plan sketch','number of routers and extenders','smart devices (Google Home, Gemini)','duplex or not','ceiling height','where you spend most of your time'] : ['skica stana','broj rutera i extendera','pametni uredjaji (Google home, Gemini)','duplex','visina plafona','gde provodite najviše vremena']).map((x,i) => ({ t: x, n: i+1 })),
      sketches: sk.map((f,i) => ({ src: 'img/' + f + '.jpg', alt: t.skAlt + ' ' + (i+1), open: lb('img/' + f + '.jpg', t.skAlt + ' ' + (i+1)) })),
      relTitle: t.rel, related: ['formula-procene','wifi-ruter-glavni-izvor','telefon-i-wifi-24h'].map(postCard)
    };`;
const seo=productSeo(F,'Procena prostora','Space assessment','Procena prostora — Source','Space assessment — Source','Pošaljite skicu osnove i dobijte besplatnu procenu opterećenosti vašeg prostora.','Send a floor plan sketch and get a free assessment of the load on your space.','img/2025-11-12_11-06-30_UTC_3764182937168818023.jpg','0','RSD');
let out=await i18n(F,pairs,edits,(a,b)=>pageLogic(a,b,body,seo,true),{posts:true});
await saveFile(F,out);log('ok');
})()
