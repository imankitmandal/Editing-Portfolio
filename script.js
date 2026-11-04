const grid=document.getElementById('grid'),filters=document.getElementById('filters'),dialog=document.getElementById('player'),pv=document.getElementById('pv'),pt=document.getElementById('pt');
const tones=[['#f2557f','#3a1f5c'],['#4aa8ff','#1d2a5c'],['#ffb347','#5c2a1d'],['#6be3b5','#1d4a4a'],['#c084fc','#2a1d5c']];
let videos=[
{title:'Travel reel — Goa',category:'Reels',dur:'0:42',t:0},
{title:'Product launch teaser',category:'Ads',dur:'0:30',t:1},
{title:'Vlog edit — Kolkata street food',category:'YouTube',dur:'8:14',t:2},
{title:'Short film — The Last Train',category:'Short film',dur:'12:05',t:3},
{title:'Gym motivation cut',category:'Reels',dur:'0:28',t:4},
{title:'Brand story',category:'Ads',dur:'1:15',t:1}],active='All';
const fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
function renderFilters(){const cats=['All',...new Set(videos.map(v=>v.category))];filters.innerHTML='';
cats.forEach(c=>{const b=document.createElement('button');b.textContent=c;b.setAttribute('aria-pressed',c===active);b.onclick=()=>{active=c;renderFilters();renderGrid()};filters.appendChild(b)})}
function renderGrid(){grid.innerHTML='';
videos.filter(v=>active==='All'||v.category===active).forEach(v=>{
const card=document.createElement('button');card.className='card';
const th=document.createElement('div');th.className='thumb';
if(v.url){const vid=document.createElement('video');vid.muted=true;vid.preload='metadata';vid.src=v.url+'#t=0.5';th.appendChild(vid);
vid.addEventListener('loadedmetadata',()=>{d.textContent=fmt(vid.duration)})}
else{const [a,b]=tones[v.t%tones.length];const p=document.createElement('div');p.className='ph';p.style.background='linear-gradient(135deg,'+b+','+a+')';th.appendChild(p)}
const d=document.createElement('span');d.className='dur';d.textContent=v.dur||'';th.appendChild(d);
const h=document.createElement('h3');h.textContent=v.title;const s=document.createElement('span');s.textContent=v.category;
card.append(th,h,s);
card.onclick=()=>{if(!v.url){alert('Sample card. Add your own video with the button above to see the player.');return}
pv.src=v.url;pt.textContent=v.title;dialog.showModal();pv.play()};
grid.appendChild(card)})}
function closePlayer(){pv.pause();dialog.close()}
document.getElementById('close').onclick=closePlayer;
dialog.addEventListener('click',e=>{if(e.target===dialog)closePlayer()});
document.getElementById('pick').onchange=e=>{const f=e.target.files[0];if(!f)return;
videos.unshift({title:f.name.replace(/\.[^.]+$/,''),category:'Reels',url:URL.createObjectURL(f),t:0});active='All';renderFilters();renderGrid()};
renderFilters();renderGrid();