const langData = { /* sama seperti yang anda beri, lengkap ms, en, ar, id */ };

const navButtons = document.querySelectorAll('nav.topnav button');
const sections = document.querySelectorAll('.section');
const langSelect = document.getElementById('langSelect');
const statsCta = document.getElementById('stats_cta');
const damageCta = document.getElementById('damage_cta');
const okuBtn = document.getElementById('okuBtn');
let currentLang = 'ms';
let chartsLoaded = false;

google.charts.load('current', { packages:['corechart','bar'] });
google.charts.setOnLoadCallback(()=>{ chartsLoaded=true; drawChartsLive(); });

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tgt = btn.getAttribute('data-target');
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(tgt).classList.add('active');
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

    [statsCta, damageCta].forEach(c=>c.classList.remove('show'));
    if(tgt==='stats') statsCta.classList.add('show');
    if(tgt==='damage') damageCta.classList.add('show');

    if(tgt==='stats'||tgt==='damage') drawChartsLive();
  });
});

langSelect.addEventListener('change',()=>applyLanguage(langSelect.value));
applyLanguage(currentLang);

function applyLanguage(lang){
  currentLang = lang;
  const d = langData[lang];
  document.getElementById('title').textContent=d.title;
  document.getElementById('subtitle').textContent=d.subtitle;
  document.getElementById('langLabel').textContent=d.langLabel;
  document.getElementById('nav_menu').textContent=d.nav.menu;
  document.getElementById('nav_history').textContent=d.nav.history;
  document.getElementById('nav_stats').textContent=d.nav.stats;
  document.getElementById('nav_damage').textContent=d.nav.damage;
  document.getElementById('menu_title').textContent=d.menu_title;
  document.getElementById('menu_desc').textContent=d.menu_desc;
  document.getElementById('history_title').textContent=d.history_title;
  document.getElementById('history_text').textContent=d.history_text;
  statsCta.textContent=d.stats_cta;
  damageCta.textContent=d.damage_cta;
  document.getElementById('donation_title').textContent=d.donation_title;
  document.getElementById('donation_desc').textContent=d.donation_desc;
  document.getElementById('qr_label').textContent=d.qr_label;
  document.getElementById('tng_label').textContent=d.tng_label;
  document.getElementById('paypal_label').textContent=d.paypal_label;
  document.getElementById('paypal_btn').textContent=d.paypal_btn;
  document.getElementById('donate_button').textContent=d.donate_button;

  document.body.classList.toggle('rtl', lang==='ar');
  if(chartsLoaded) drawChartsLive();
}

// Fungsi chart live & donation sama seperti versi lengkap HTML sebelumnya

function submitDonation(){
  const name = document.getElementById('nameField').value.trim();
  if(!name){ alert('Sila masukkan nama'); return; }
  alert('Terima kasih atas sumbangan! (demo)');
}

let oku=false;
okuBtn.addEventListener('click',()=>{
  oku = !oku;
  document.body.style.fontSize = oku?'1.25rem':'';
  okuBtn.textContent = oku?(currentLang==='ar'?'الوضع العادي ♿':'♿ Mod Biasa'):(currentLang==='ar'?'♿ نمط الوصول':'♿ Mesra OKU');
});

async function drawChartsLive(){
  if(!chartsLoaded) return;
  // fetch & render chart seperti kod penuh sebelum ini
}
