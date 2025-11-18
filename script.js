// LANGUAGES
const langData = {
  ms: { title:"Tabung Kemanusiaan Palestin", subtitle:"Solidariti dan bantuan kecemasan", nav:{menu:"Menu",history:"Sejarah",stats:"Statistik",damage:"Kerosakan"}, menu_title:"Menu Utama", menu_desc:"Pilih bahagian di atas untuk melihat sejarah, statistik dan kerosakan.", history_title:"Sejarah Palestin", history_text:"Ringkasan sejarah Palestin...", stats_title:"Statistik Kematian (Live)", stats_note:"Memuat data …", stats_cta:"Sokong Kecemasan Perubatan", damage_title:"Kerosakan Infrastruktur (Live)", damage_note:"Memuat data …", damage_cta:"Bantuan Infrastruktur", donation_title:"Sumbangan", donation_desc:"Pilih kaedah pembayaran dan isi maklumat ringkas.", qr_label:"💳 QR Pay (Malaysia)", tng_label:"🟦 Touch 'n Go eWallet", paypal_label:"🌍 PayPal", paypal_btn:"Derma melalui PayPal", donate_button:"Hantar" },
  en: { /* English translations */ },
  ar: { /* Arabic translations */ },
  id: { /* Bahasa Indonesia translations */ }
};

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

navButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const tgt=btn.getAttribute('data-target');
    sections.forEach(s=>s.classList.remove('active'));
    document.getElementById(tgt).classList.add('active');
    navButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    [statsCta, damageCta].forEach(c=>c.classList.remove('show'));
    if(tgt==='stats') statsCta.classList.add('show');
    if(tgt==='damage') damageCta.classList.add('show');

    if(tgt==='stats'||tgt==='damage') drawChartsLive();
  });
});

langSelect.addEventListener('change',()=>applyLanguage(langSelect.value));

function applyLanguage(lang){
  currentLang=lang;
  const d=langData[lang];
  document.getElementById('title').textContent=d.title;
  document.getElementById('subtitle').textContent=d.subtitle;
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

// Demo donation
document.getElementById('donate_button').addEventListener('click',()=>{
  const name=document.getElementById('nameField').value.trim();
  if(!name) { alert('Sila masukkan nama'); return; }
  alert('Terima kasih atas sumbangan! (demo)');
});

// OKU mode
let oku=false;
okuBtn.addEventListener('click',()=>{
  oku=!oku;
  document.body.style.fontSize = oku?'1.25rem':'';
  okuBtn.textContent = oku?(currentLang==='ar'?'الوضع العادي ♿':'♿ Mod Biasa'):(currentLang==='ar'?'♿ نمط الوصول':'♿ Mesra OKU');
});

// Dummy live charts
async function drawChartsLive(){
  if(!chartsLoaded) return;
  const statsData = google.visualization.arrayToDataTable([['Date','Killed'],['18/11',5],['17/11',8],['16/11',6]]);
  const statsChart = new google.visualization.ColumnChart(document.getElementById('chart_stats'));
  statsChart.draw(statsData,{title:'Korban Harian',height:340,legend:{position:'none'},colors:['#ca3a3a']});

  const pieData = google.visualization.arrayToDataTable([['Group','%'],['Children',40],['Women',33],['Elderly',27]]);
  const pieChart = new google.visualization.PieChart(document.getElementById('chart_damage'));
  pieChart.draw(pieData,{title:'Pecahan Umur',height:320,pieHole:0.36,legend:{position:'bottom'}});
}
