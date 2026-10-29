/* Kalendarz świąt – dane (Tuptuś). f: stała data [miesiąc,dzień]; e: przesunięcie od Wielkanocy; nth: [miesiąc, dzień tyg. 0=nd, który]. pub: dzień ustawowo wolny. */
window.SWIETA=[
{n:'Nowy Rok',f:[1,1],i:'🎆',pub:1},{n:'Trzech Króli',f:[1,6],i:'👑',pub:1},
{n:'Dzień Babci',f:[1,21],i:'👵'},{n:'Dzień Dziadka',f:[1,22],i:'👴'},
{n:'Dzień Kota',f:[2,17],i:'🐱'},{n:'Dzień Kobiet',f:[3,8],i:'💐'},
{n:'Pierwszy dzień wiosny',f:[3,21],i:'🌷'},
{n:'Wielkanoc',e:0,i:'🐣',pub:1},{n:'Poniedziałek Wielkanocny',e:1,i:'💧',pub:1},
{n:'Dzień Ziemi',f:[4,22],i:'🌍'},{n:'Święto Pracy',f:[5,1],i:'🇵🇱',pub:1},
{n:'Święto Konstytucji 3 Maja',f:[5,3],i:'🇵🇱',pub:1},{n:'Dzień Strażaka',f:[5,4],i:'🚒'},
{n:'Zielone Świątki',e:49,i:'🌿',pub:1},{n:'Boże Ciało',e:60,i:'⛪',pub:1},
{n:'Dzień Matki',f:[5,26],i:'💖'},{n:'Dzień Dziecka',f:[6,1],i:'🎈'},{n:'Dzień Ojca',f:[6,23],i:'👔'},
{n:'Wniebowzięcie NMP / Święto Wojska Polskiego',f:[8,15],i:'🇵🇱',pub:1},
{n:'Dzień Przedszkolaka',f:[9,20],i:'🎒'},
{n:'Dzień Uśmiechu',nth:[10,5,1],i:'😊'},
{n:'Dzień Kasztana',f:[10,3],i:'🌰',note:'data zwyczajowa'},
{n:'Dzień Zwierząt',f:[10,4],i:'🐾'},
{n:'Wszystkich Świętych',f:[11,1],i:'🕯️',pub:1},{n:'Dzień Postaci z Bajek',f:[11,5],i:'🧚'},
{n:'Święto Niepodległości',f:[11,11],i:'🇵🇱',pub:1},{n:'Dzień Praw Dziecka',f:[11,20],i:'🧒'},
{n:'Dzień Pluszowego Misia',f:[11,25],i:'🧸'},{n:'Mikołajki',f:[12,6],i:'🎅'},
{n:'Wigilia',f:[12,24],i:'🌟',pub:1},{n:'Boże Narodzenie',f:[12,25],i:'🎄',pub:1},{n:'Drugi dzień świąt',f:[12,26],i:'🎁',pub:1}];
window.swietaEaster=function(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451);return new Date(y,Math.floor((h+l-7*m+114)/31)-1,((h+l-7*m+114)%31)+1)};
window.swietaYear=function(y){const E=swietaEaster(y);return SWIETA.map(s=>{let d;if(s.f)d=new Date(y,s.f[0]-1,s.f[1]);else if(s.e!=null){d=new Date(E);d.setDate(d.getDate()+s.e)}else{const[m,wd,n]=s.nth;d=new Date(y,m-1,1);while(d.getDay()!==wd)d.setDate(d.getDate()+1);d.setDate(d.getDate()+7*(n-1))}return {...s,d,var:!s.f}}).sort((a,b)=>a.d-b.d)};
window.swietaWidget=function(now){now=now||new Date();const t0=new Date(now.getFullYear(),now.getMonth(),now.getDate());const y=t0.getFullYear(),mo=t0.getMonth();
const all=[...swietaYear(y),...swietaYear(y+1)];const inM=all.filter(s=>s.d.getFullYear()===y&&s.d.getMonth()===mo);const nx=all.filter(s=>s.d>=t0).slice(0,5);
const MN=['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
const first=(new Date(y,mo,1).getDay()+6)%7,days=new Date(y,mo+1,0).getDate();let g='';['Pn','Wt','Śr','Cz','Pt','Sb','Nd'].forEach(x=>g+=`<b>${x}</b>`);for(let i=0;i<first;i++)g+='<span></span>';
for(let d=1;d<=days;d++){const ev=inM.filter(s=>s.d.getDate()===d);const cl=(d===t0.getDate()?' td':'')+(ev.some(s=>s.pub)?' pub':ev.length?' ev':'');g+=`<span class="kd${cl}" title="${ev.map(s=>s.n).join(', ')}">${d}${ev.length?`<i>${ev[0].i}</i>`:''}</span>`}
const fmt=d=>d.getDate()+'.'+String(d.getMonth()+1).padStart(2,'0');const ile=d=>{const n=Math.round((d-t0)/864e5);return n===0?'dziś':n===1?'jutro':'za '+n+' dni'};
return `<div class="card kal"><div class="h1s">🎉 Kalendarz świąt</div><div class="kalw"><div><div class="mm" style="text-align:center;font-weight:700">${MN[mo]} ${y}</div><div class="kg">${g}</div></div>
<ul class="kl">${nx.map(s=>`<li><span class="ki">${s.i}</span><span><b>${s.n}</b><br><small>${fmt(s.d)} · ${ile(s.d)}${s.pub?' · dzień wolny':''}${s.var?' · data ruchoma':''}${s.note?' · '+s.note:''}</small></span></li>`).join('')}</ul></div></div>`};
