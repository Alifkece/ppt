/* ================= DATA (dari repository, diverifikasi) ================= */
var IMG = 'https://raw.githubusercontent.com/Alifkece/kopi-nusantara/main/assets/images/';
var PRODUCTS = [
 {name:'Gayo Arabika',origin:'Aceh',type:'Light Roast',price:'Rp39.000',img:IMG+'product-gayo.jpg',badge:'Terlaris',desc:'Arabika dataran tinggi Gayo, keasaman lembut, aroma rempah, aftertaste bersih khas tanah vulkanik Aceh.'},
 {name:'Toraja Sapan',origin:'Sulawesi',type:'Medium Roast',price:'Rp42.500',img:IMG+'product-toraja.jpg',badge:'Baru',desc:'Karakter earthy, body seimbang, aroma rempah, acidity yang lembut.'},
 {name:'Kintamani Citrus',origin:'Bali',type:'Light Roast',price:'Rp41.000',img:IMG+'product-kintamani.jpg',badge:'',desc:'Ditanam berdampingan dengan jeruk — keasaman citrus cerah dan seduhan ringan.'},
 {name:'Flores Bajawa',origin:'Nusa Tenggara',type:'Medium Roast',price:'Rp40.000',img:IMG+'product-flores.jpg',badge:'',desc:'Body medium, manis karamel, sentuhan floral khas dataran tinggi Bajawa.'},
 {name:'Java Preanger',origin:'Jawa Barat',type:'Dark Roast',price:'Rp38.000',img:IMG+'product-java.jpg',badge:'',desc:'Dark roast klasik Priangan — body tebal, pahit seimbang, aroma cokelat panggang kuat.'},
 {name:'Biji Kopi Arabika',origin:'Aceh',type:'Light Roast',price:'Rp37.000',img:IMG+'product-arabika.jpg',badge:'',desc:'Biji Arabika pilihan, profil rasa ringan, asam buah-buahan, finish bersih.'},
 {name:'Biji Kopi Robusta',origin:'Jawa Barat',type:'Dark Roast',price:'Rp28.000',img:IMG+'product-robusta.jpg',badge:'',desc:'Body kuat dan pahit khas — cocok untuk kopi tubruk maupun campuran espresso.'},
 {name:'Biji Luwak White Coffe',origin:'Bali',type:'Medium Roast',price:'Rp150.000',img:IMG+'product-luwak.jpg',badge:'Premium',desc:'Varietas premium dengan karakter rasa yang halus dan kompleks.'}
];
document.getElementById('productGrid').innerHTML = PRODUCTS.map(function(p,i){
 return '<article class="product-card" data-reveal><img src="'+p.img+'" alt="'+p.name+'" loading="lazy" onerror="imgFail(this)"><div class="p-body"><h6>'+p.name+'</h6><p class="p-meta">'+p.origin+' · '+p.type+'</p><p class="p-desc">'+p.desc+'</p>'+(p.badge?'<span class="p-badge">'+p.badge+'</span>':'')+'<p class="p-price">'+p.price+' <span style="font-weight:400;color:var(--kn-coffee);font-size:.74rem">/ 100gr</span></p></div></article>';
}).join('');

var FEATURES = [
 ['A','Product Catalog','Katalog 16 varietas kopi dengan gambar, info, harga dasar per 100gr, dan pilihan berat 100–1000gr.'],
 ['B','Product Filter & Search','Filter chip per daerah asal + pencarian word-prefix berbasis nama produk (live, tanpa reload).'],
 ['C','Shopping Cart','Tambah produk, atur kuantitas & berat, lihat subtotal Rupiah — tersimpan per akun di localStorage.'],
 ['D','Checkout','Ringkasan pesanan, subtotal, identitas pengguna, dan pilihan metode pembayaran.'],
 ['E','WhatsApp Ordering','Detail pesanan tersusun otomatis diteruskan ke wa.me dengan teks terformat.'],
 ['F','QRIS Payment','Pembayaran non-tunai via QRIS + mekanisme kirim bukti pembayaran melalui WhatsApp.'],
 ['G','User Authentication','Daftar & login email/password atau Google Sign-In, sesi bertahan setelah reload.'],
 ['H','Email OTP Verification','Lapisan verifikasi tambahan: kode 6 digit dikirim via Gmail SMTP setelah Firebase Auth.'],
 ['I','User Profile','Dokumen profil pengguna disimpan pada koleksi users di Cloud Firestore.'],
 ['J','Product Origin & Story','Cerita asal-usul kopi per daerah (Gayo, Toraja, Kintamani) dengan carousel drag-to-scroll.'],
 ['K','Store Location','Informasi kios + peta lokasi via Google Maps embed.'],
 ['L','Journal','Konten artikel/jurnal seputar kopi dengan reveal editorial.'],
 ['M','Customer Reviews','Bagian ulasan pelanggan dengan carousel (data dummy UI preview, sesuai komentar kode).']
];
document.getElementById('featWrap').innerHTML = FEATURES.map(function(f,i){
 return '<div class="feat" data-reveal><span class="f-letter">'+f[0]+'</span><h6>'+f[1]+'</h6><p>'+f[2]+'</p></div>';
}).join('');

var FLOW = [
 ['Visit Website','Pengguna membuka website Kopi Nusantara.'],
 ['Login or Register','Buat akun atau masuk — guest boleh browse & add to cart.'],
 ['Authentication','Firebase Authentication memproses Email/Password atau Google Sign-In.'],
 ['Gmail OTP Verification','Server memverifikasi ID token, membatasi domain @gmail.com, lalu mengirim kode OTP 6 digit via Gmail SMTP.'],
 ['Verified Access','Cookie kn_verified bertanda tangan HS256 diterbitkan (berlaku 12 jam).'],
 ['Browse Products','Pengguna menjelajahi katalog kopi dengan filter & pencarian.'],
 ['Add to Cart','Pilih produk, berat (100–1000gr), dan jumlah.'],
 ['Checkout','Periksa ringkasan pesanan dan subtotal.'],
 ['Payment','Pilih metode: pesan via WhatsApp atau bayar QRIS.'],
 ['Order Confirmation','Detail pesanan / bukti pembayaran diteruskan via WhatsApp sesuai metode.']
];
document.getElementById('flowWrap').innerHTML = FLOW.map(function(s,i){
 var auth = (i>=1&&i<=4)?' auth':'';
 return '<div class="flow-step'+auth+'" data-reveal><span class="flow-num">'+(i+1)+'</span><div><h6>Step '+(i+1)+' — '+s[0]+'</h6><p>'+s[1]+'</p></div></div>';
}).join('');

var ARCH = ['USER','FIREBASE AUTHENTICATION','FIREBASE ID TOKEN (RS256)','SERVER-SIDE TOKEN VERIFICATION (JWKS Google)','GMAIL DOMAIN CHECK','OTP GENERATION (6 digit)','GMAIL SMTP DELIVERY (TLS :465)','OTP VERIFICATION (maks. 5 percobaan)','SIGNED SESSION COOKIE (JWT HS256)','VERIFIED ACCESS'];
document.getElementById('archWrap').innerHTML = ARCH.map(function(a,i){
 return '<div class="arch-node'+(i%2?' alt':'')+'" data-reveal>'+a+'</div>'+(i<ARCH.length-1?'<span class="arch-arrow" data-reveal></span>':'');
}).join('');

var MOTION = [
 ['GSAP Animation','Animasi halus & terkontrol: batch reveal, tween, dan timeline per section.'],
 ['ScrollTrigger','Animasi terhubung posisi scroll — clip-path reveal jurnal, about, vision, peta.'],
 ['Scroll Reveal','Elemen masuk viewport secara bertahap (start: top 80–88%, once).'],
 ['Image Reveal','Gambar ditampilkan via clip-path inset + scale, memberi kesan editorial.'],
 ['Stagger Animation','Kartu produk/asal/kios muncul berurutan dengan stagger 0.06–0.1s.'],
 ['Subtle Parallax','Parallax scroll-linked sangat halus (--py -4% → 4%) untuk kedalaman.'],
 ['Micro Interaction','3D tilt pada kartu, magnetic buttons, elastic bump badge keranjang.'],
 ['Responsive Motion','Tilt & magnetik hanya di fine pointer; reduced motion mematikan semuanya; IntersectionObserver fallback.']
];
document.getElementById('motionWrap').innerHTML = MOTION.map(function(m){
 return '<div class="feat" data-reveal><span class="f-letter" style="font-size:1.3rem;font-family:var(--fd);font-weight:600">'+m[0].split(' ')[0]+'</span><h6>'+m[0]+'</h6><p>'+m[1]+'</p></div>';
}).join('');

/* ================= NAVIGASI PRESENTASI + SCROLL ================= */
var sections = Array.prototype.slice.call(document.querySelectorAll('section.slide'));
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('totIdx').textContent = String(sections.length).padStart(2,'0');

/* Util gambar: coba ekstensi lain, lalu placeholder jelas (bukan foto acak) */
function imgFail(img){
 var n=+(img.dataset.try||0),ex=['webp','png','jpeg','jpg'],m=img.src.match(/^(.*)\.(jpe?g|png|webp)(\?.*)?$/i);
 if(m&&n<ex.length){img.dataset.try=n+1;if(ex[n]!==m[2].toLowerCase()){img.src=m[1]+'.'+ex[n]}else{imgFail(img)}return}
 var d=document.createElement('div');d.className='ph';d.setAttribute('role','img');
 var t=(img.alt||'Foto').replace(/[<>&"]/g,'');d.setAttribute('aria-label','Foto belum tersedia: '+t);
 d.innerHTML='<span>'+t+'</span><small>Foto belum tersedia</small>';
 console.warn('[gambar gagal dimuat]',img.src);img.replaceWith(d);
}
window.imgFail=imgFail;
function $(s,r){return (r||document).querySelector(s)}
var pad=function(n){return String(n).padStart(2,'0')};
var current=0,lockIdx=null,lockTimer=null,ticking=false;
var topOf=function(i){return sections[i].getBoundingClientRect().top+window.scrollY};

/* Menu chapter (aksesibel, fokus terkunci, scroll body dikunci) */
var menuList=document.getElementById('menuList'),overlay=document.getElementById('menuOverlay'),menuBtn=document.getElementById('menuBtn'),menuClose=document.getElementById('menuClose');
menuList.innerHTML=sections.map(function(s,i){return '<button type="button" data-go="'+i+'"><span class="idx">'+pad(i+1)+'</span><span>'+s.dataset.title+'</span><span class="tag">'+s.dataset.tag+'</span></button>'}).join('');
overlay.setAttribute('aria-hidden','true');
function openMenu(){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');menuClose.focus()}
function closeMenu(){if(!overlay.classList.contains('open'))return;overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');menuBtn.focus()}
menuBtn.addEventListener('click',openMenu);menuClose.addEventListener('click',closeMenu);
overlay.addEventListener('click',function(e){var b=e.target.closest('[data-go]');if(b){closeMenu();goTo(+b.dataset.go)}});
overlay.addEventListener('keydown',function(e){if(e.key!=='Tab')return;var f=overlay.querySelectorAll('button'),a=f[0],z=f[f.length-1];
 if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});

/* Navigasi: target dikunci selama scroll halus supaya Next/Prev tidak melompat */
function setCurrent(i){current=i;var s=sections[i];label.textContent=s.dataset.title;curIdx.textContent=pad(i+1);
 prevBtn.disabled=i===0;nextBtn.disabled=i===sections.length-1}
function goTo(i){i=Math.max(0,Math.min(sections.length-1,i));lockIdx=i;setCurrent(i);
 clearTimeout(lockTimer);lockTimer=setTimeout(function(){lockIdx=null;onScroll()},900);
 window.scrollTo({top:topOf(i),behavior:reduced?'auto':'smooth'})}
function step(d){var base=lockIdx!==null?lockIdx:current;
 if(d<0&&lockIdx===null&&window.scrollY-topOf(base)>160){goTo(base);return}
 goTo(base+d)}
var label=document.getElementById('chapterLabel'),curIdx=document.getElementById('curIdx'),pFill=document.getElementById('pFill');
var prevBtn=document.getElementById('prevBtn'),nextBtn=document.getElementById('nextBtn');
prevBtn.addEventListener('click',function(){step(-1)});nextBtn.addEventListener('click',function(){step(1)});

document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){closeMenu();return}
 if(e.defaultPrevented||e.ctrlKey||e.metaKey||e.altKey||overlay.classList.contains('open'))return;
 var t=e.target,tag=t&&t.tagName;
 if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||(t&&t.isContentEditable))return;
 var k=e.key;
 if(k==='ArrowRight'||k==='PageDown'){e.preventDefault();step(1)}
 else if(k==='ArrowLeft'||k==='PageUp'){e.preventDefault();step(-1)}
 else if(k==='Home'){e.preventDefault();goTo(0)}
 else if(k==='End'){e.preventDefault();goTo(sections.length-1)}
});

/* Fullscreen (disembunyikan bila tidak didukung, mis. iPhone Safari) */
var fsBtn=document.getElementById('fsBtn'),root=document.documentElement;
var fsOn=function(){return document.fullscreenElement||document.webkitFullscreenElement};
if(!(document.fullscreenEnabled||document.webkitFullscreenEnabled)){fsBtn.hidden=true}
fsBtn.addEventListener('click',function(){
 var p=fsOn()?(document.exitFullscreen||document.webkitExitFullscreen).call(document):(root.requestFullscreen||root.webkitRequestFullscreen).call(root);
 if(p&&p.catch)p.catch(function(){});
});
['fullscreenchange','webkitfullscreenchange'].forEach(function(ev){document.addEventListener(ev,function(){fsBtn.setAttribute('aria-pressed',fsOn()?'true':'false')})});

/* Scroll: progress + section spy (satu rAF, tanpa listener berulang) */
function onScroll(){ticking=false;
 var h=document.documentElement.scrollHeight-window.innerHeight;
 pFill.style.transform='scaleX('+(h>0?Math.min(1,window.scrollY/h):0)+')';pFill.style.width='100%';
 if(lockIdx!==null){clearTimeout(lockTimer);lockTimer=setTimeout(function(){lockIdx=null;onScroll()},140);return}
 var probe=window.scrollY+window.innerHeight*.4,idx=0;
 for(var i=0;i<sections.length;i++){if(topOf(i)<=probe)idx=i}
 if(h>0&&window.scrollY>=h-2)idx=sections.length-1;
 if(idx!==current||!label.textContent)setCurrent(idx);
}
window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
window.addEventListener('resize',onScroll);
onScroll();setCurrent(current);

/* Reveal: threshold 0 agar elemen yang lebih tinggi dari layar tetap muncul */
var revs=document.querySelectorAll('[data-reveal]');
if('IntersectionObserver' in window&&!reduced){
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:0,rootMargin:'0px 0px -6% 0px'});
 revs.forEach(function(el){io.observe(el)});
}else{revs.forEach(function(el){el.classList.add('in')})}

/* Live showcase: iframe dulu; bila tidak termuat / ditolak -> screenshot asli + tombol buka tab baru */
document.querySelectorAll('.show-card').forEach(function(card){
 var st=card.querySelector('.stage'),fr=st.querySelector('iframe'),img=st.querySelector('img'),lb=st.querySelector('.stage-label');
 var status=card.querySelector('.sc-status'),btn=card.querySelector('.sc-toggle'),srcs=st.dataset.srcs.split('|'),done=false,mode='live',shotReady=false;
 function loadShot(){if(shotReady||img.dataset.busy)return;img.dataset.busy=1;var i=0;
  (function next(){if(i>=srcs.length){status.textContent='Pratinjau gambar belum tersedia — gunakan Visit Website.';return}
   var t=new Image(),u=srcs[i++];t.onload=function(){img.src=u;shotReady=true;if(mode==='shot')show('shot')};t.onerror=next;t.src=u})()}
 function show(m){mode=m;var shot=m==='shot';fr.hidden=shot;img.hidden=!shot||!shotReady;lb.hidden=!shot||!shotReady;
  btn.textContent=shot?'Coba mode interaktif':'Pratinjau gambar';btn.setAttribute('aria-pressed',shot);if(shot)loadShot()}
 function fallback(why){if(done)return;done=true;show('shot');status.textContent=why}
 fr.addEventListener('load',function(){if(done)return;done=true;clearTimeout(w);status.textContent='Mode interaktif. Jika area kosong atau ditolak, pilih Pratinjau gambar.'});
 var w=setTimeout(function(){fallback('Website tidak termuat di iframe (kemungkinan diblokir X-Frame-Options/CSP). Menampilkan pratinjau gambar.')},9000);
 btn.addEventListener('click',function(){if(mode==='live'){show('shot');status.textContent='Pratinjau gambar — bukan website interaktif.'}else{show('live');status.textContent='Mode interaktif.'}});
 loadShot();
});
document.querySelectorAll("[data-go-next]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();goTo(1)})});
