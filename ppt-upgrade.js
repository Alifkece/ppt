/* ppt-upgrade.js — taruh SETELAH <script> bawaan, sebelum </body> */
(function(){
'use strict';
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var secs=[].slice.call(document.querySelectorAll('section.slide'));
var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};

/* ---- A. Rapikan teks internal yang tidak pantas tampil ke audiens ---- */
var lead=document.querySelector('#tech>.lead');
if(lead)lead.textContent='Teknologi inti yang dikuasai tim LEXY AURA, dari antarmuka sampai deployment.';
$$('#kn-intro h4 span').forEach(function(s){if(/script\.js/.test(s.textContent))s.textContent=''});
var cd=document.querySelector('.ceo-desc');
if(cd)cd.textContent=cd.textContent.replace(/\s*Identitas dan foto telah dikonfirmasi oleh pemilik proyek\./,'');

/* ---- B. Ikon unik untuk chip yang tadinya memakai ikon generik ---- */
var MONO={'Next.js':['N','#f4f4f8'],'PHP':['php','#8993be'],'MySQL':['My','#4f9bd1'],'PostgreSQL':['Pg','#5b9bd5'],'MongoDB':['M','#47a248'],
'Express.js':['ex','#cfcfdc'],'Figma':['Fg','#f24e1e'],'Photoshop':['Ps','#31a8ff'],'Illustrator':['Ai','#ff9a00'],'Git':['Git','#f05032'],
'Netlify':['N','#00c7b7'],'Docker':['D','#2496ed'],'GSAP 3.12.5 + ScrollTrigger':['Gs','#88ce02'],'QRIS':['QR','#e6e6ef'],'HS256':['JWT','#d63aff']};
$$('.chip').forEach(function(c,i){
  c.style.setProperty('--i',i%9);
  var g=c.querySelector('.tl--gen');if(!g)return;
  var m=MONO[c.textContent.trim()];if(!m)return;
  var s=document.createElement('span');s.className='mono';s.style.setProperty('--c',m[1]);s.textContent=m[0];g.replaceWith(s);
});

/* ---- C. Latar parallax (orb + grid) di setiap slide ---- */
var layers=[];
secs.forEach(function(s){
  if(s.id==='conclusion')return;
  var bg=document.createElement('div');bg.className='px-bg';bg.setAttribute('aria-hidden','true');
  bg.innerHTML='<i class="g"></i><i class="a"></i><i class="b"></i><i class="c"></i>';
  s.insertBefore(bg,s.firstChild);
  var k=bg.children;
  layers.push({s:s,el:k[0],v:.10,m:140},{s:s,el:k[1],v:.28,m:260},{s:s,el:k[2],v:-.18,m:220},{s:s,el:k[3],v:.38,m:300});
});

/* ---- D. Elemen konten berparalaks (kecepatan beda tiap elemen) ---- */
function px(sel,v,m,alt){
  $$(sel).forEach(function(el,i){
    var sec=el.closest('section.slide');if(!sec)return;
    el.setAttribute('data-px','');
    layers.push({s:sec,el:el,v:alt?(i%2?v:-v*.6):v,m:m});
  });
}
px('.chapter-label',.05,26);
px('section.slide h3.display,.trans-title,.days-hero,.c-up',.07,36);
px('.lead,.trans-line,.trans-sub',.04,24);
px('.ceo-photo,.kn-hero>img,.hero-visual,.show-card',.12,60,true);
px('.value-card,.contact-card,.product-card,.layer,.feat',.045,22,true);
px('.process-strip>div,.tl-card,.kn-facts>div,.stat-strip>div',.04,20,true);
px('.vision-card,.cfg-table,.endpoints,.kn-note,.demo-note',.05,26,true);
px('.c-light .lead,.c-down h3',.05,28);

/* ---- E. Varian animasi masuk + stagger untuk tiap kelompok ---- */
var fresh=[];
function tag(el,anim,delay){
  if(!el)return;
  if(!el.hasAttribute('data-reveal')){el.setAttribute('data-reveal','');el.setAttribute('data-px-new','');fresh.push(el)}
  if(anim)el.setAttribute('data-anim',anim);
  if(delay!=null)el.style.transitionDelay=Math.min(delay,700)+'ms';
}
function group(sel,anim,step,altAnim){
  $$(sel).forEach(function(el,i){tag(el,altAnim&&i%2?altAnim:anim,i*step)});
}
group('.hero-cta>*','blur',120);
group('.svc-row','left',70);
group('.value-card','zoom',110);
group('.process-strip>div','blur',120);
group('.contact-card','pop',90);
group('.social-row>*','pop',80);
group('.vision-card','left',150);
group('.stat-strip>div','right',140);
group('.product-card','zoom',80);
group('.feat','blur',45);
group('.flow-step','left',60,'right');
group('.layer','right',70,'left');
group('.tl-card','blur',100);
group('.arch-node','pop',60);
group('.arch-arrow',null,60);
group('.endpoint','left',100);
group('.cfg-table tr','left',50);
group('.kn-facts>div','zoom',120);
group('.tech-group','zoom',120);
group('.chip','pop',45);
group('.show-card','zoom',160,'zoom');
group('.c-links>*','pop',80);
tag(document.querySelector('.ceo-photo'),'left',0);
tag(document.querySelector('.kn-hero>img'),'right',100);
tag(document.querySelector('.foot-line'),'blur',200);

if(fresh.length){
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:0,rootMargin:'0px 0px -6% 0px'});
    fresh.forEach(function(el){io.observe(el)});
  }else fresh.forEach(function(el){el.classList.add('in')});
}

/* ---- F. Count-up angka ---- */
function countUp(el,txt){
  var m=txt.match(/\d+/);if(!m||reduce)return;
  var end=+m[0],t0=null,pre=txt.slice(0,m.index),post=txt.slice(m.index+m[0].length);
  el.textContent=pre+'0'+post;
  var io2=new IntersectionObserver(function(en){if(!en[0].isIntersecting)return;io2.disconnect();
    (function tick(t){t0=t0||t;var p=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-p,3);el.textContent=pre+Math.round(end*e)+post;if(p<1)requestAnimationFrame(tick)})(performance.now());
  },{threshold:.4});
  io2.observe(el);
}
$$('.kn-facts b,.days-hero,.stat-strip b').forEach(function(el){countUp(el,el.textContent)});

/* ---- G. Loop parallax (satu rAF, translate terpisah dari transform reveal) ---- */
var vh=innerHeight,tick=false,amp=innerWidth<720?.5:1;
function frame(){
  tick=false;if(reduce)return;
  for(var i=0;i<layers.length;i++){
    var L=layers[i],r=L.s.getBoundingClientRect();
    if(r.bottom<-300||r.top>vh+300)continue;
    var d=(r.top+r.height/2)-vh/2;
    var y=Math.max(-L.m,Math.min(L.m,-d*L.v*amp));
    L.el.style.translate='0 '+y.toFixed(1)+'px';
  }
  var probe=vh*.4,on=false;
  for(var j=0;j<secs.length;j++){var b=secs[j].getBoundingClientRect();if(b.top<=probe&&b.bottom>probe){on=secs[j].classList.contains('kn')||secs[j].id==='conclusion'&&b.top+b.height*.45>probe;break}}
  document.body.classList.toggle('on-light',!!on);
}
function req(){if(!tick){tick=true;requestAnimationFrame(frame)}}
addEventListener('scroll',req,{passive:true});
addEventListener('resize',function(){vh=innerHeight;amp=innerWidth<720?.5:1;req()});
frame();
})();
