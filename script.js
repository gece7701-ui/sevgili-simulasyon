// script.js — Türkçe, şifre 2808, YouTube oynatma butonu
document.addEventListener('DOMContentLoaded', () => {
  const pwInput = document.getElementById('pw');
  const submit = document.getElementById('submit-pw');
  const overlay = document.getElementById('login-overlay');
  const app = document.getElementById('app');
  const pwError = document.getElementById('pw-error');
  const musicInit = document.getElementById('play-music-init');
  const ytPlayerContainer = document.getElementById('yt-player');
  const correctPw = '2808';

  // Kullanıcı müziği başlatmak için tıklarsa iframe ekle
  musicInit.addEventListener('click', () => {
    // Eğer zaten eklendiyse görünür yap
    if (!ytPlayerContainer.classList.contains('hidden')) return;
    ytPlayerContainer.classList.remove('hidden');
    ytPlayerContainer.setAttribute('aria-hidden', 'false');
    // YouTube embed — autoplay kullanıcı etkileşimi ile başladığında çalışır
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/JYlS1xRrpAg?rel=0&autoplay=1';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.title = 'Müzik';
    ytPlayerContainer.appendChild(iframe);
  });

  submit.addEventListener('click', tryLogin);
  pwInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') tryLogin(); });

  function tryLogin() {
    const val = pwInput.value.trim();
    if (val === correctPw) {
      overlay.classList.add('hidden');
      app.classList.remove('hidden');
      // Eğer kullanıcı daha önce müziği başlattıysa iframe görünür kalsın
    } else {
      pwError.textContent = 'Şifre yanlış. Tekrar dene.';
      shake(pwInput);
    }
  }

  function shake(el) {
    el.style.transition = 'transform 0.08s';
    el.style.transform = 'translateX(-8px)';
    setTimeout(()=>{ el.style.transform='translateX(8px)'; }, 80);
    setTimeout(()=>{ el.style.transform=''; }, 160);
    setTimeout(()=>{ pwError.textContent = ''; }, 2000);
  }

  // Kartlara tıklama: viewer aç
  const cards = document.querySelectorAll('.card');
  const viewer = document.getElementById('viewer');
  const viewerTitle = document.getElementById('viewer-title');
  const panorama = document.getElementById('panorama');
  const viewerDesc = document.getElementById('viewer-desc');
  const closeViewer = document.getElementById('close-viewer');
  const startBtn = document.getElementById('start-sim');
  const stopBtn = document.getElementById('stop-sim');

  const descriptions = {
    "İsviçre — Alpler": "Sisli sabahlarda dağ evleri, buz gibi hava ve el ele yürüyüş. Sanki oradaymışsın gibi nefes al.",
    "Maldivler": "Deniz ayaklarının altında parlak, turkuaz. Güneş yavaşça batar ve gökyüzü pembeye döner.",
    "Romanya — Transilvanya": "Eski taş kaleler, sisli orman yolları ve hafif bir gizem. Elini tutup birlikte keşfet.",
    "Avustralya — Kıyılar": "Uçsuz bucaksız sahiller, dalgaların sesi ve rahatlatan rüzgâr. Yeni maceralar seni bekler."
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title;
      const img = card.dataset.image;
      viewerTitle.textContent = title;
      panorama.style.backgroundImage = `url('${img}')`;
      viewerDesc.textContent = descriptions[title] || '';
      viewer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      // simülasyon başlangıçta duruyor; kullanıcı başlatır
      stopSim();
    });
  });

  closeViewer.addEventListener('click', closeV);
  function closeV(){
    viewer.classList.add('hidden');
    document.body.style.overflow = '';
    stopSim();
  }

  startBtn.addEventListener('click', startSim);
  stopBtn.addEventListener('click', stopSim);

  function startSim(){
    panorama.classList.add('simulating');
  }
  function stopSim(){
    panorama.classList.remove('simulating');
  }

  // ESC ile kapatma
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !viewer.classList.contains('hidden')) closeV();
  });
});
