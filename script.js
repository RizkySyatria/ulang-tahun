const gate = document.getElementById('gate');
const content = document.getElementById('content');
const openBtn = document.getElementById('openBtn');
const muteBtn = document.getElementById('muteBtn');
const bgm = document.getElementById('bgm');

openBtn.addEventListener('click', () => {
  bgm.volume = 0.6;
  bgm.play().catch(() => {}); // aman kalau gagal

  gate.classList.add('fade-out');
  content.classList.remove('hidden');
  muteBtn.classList.remove('hidden');

  setTimeout(() => gate.classList.add('hidden'), 800);
});

muteBtn.addEventListener('click', () => {
  bgm.muted = !bgm.muted;
  muteBtn.textContent = bgm.muted ? '🔇' : '🔊';
});

const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const tapHint = document.getElementById('tapHint');

envelope.addEventListener('click', () => {
  envelope.classList.add('open');
  tapHint.classList.add('hidden');
  setTimeout(() => {
    letter.classList.add('show');
    letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 600);
});

const tlItems = document.querySelectorAll('.tl-item');
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

tlItems.forEach((item) => tlObserver.observe(item));

// ===== 21 Alasan =====
// Ganti teks di bawah dengan versimu sendiri (tetap 21 item).
const reasons = [
  'Kamu nggak gampang nyerah, bahkan pas semuanya terasa berat',
  'Kamu mandiri dan berani ngadepin masalah dengan caramu sendiri',
  'Kamu tetap lanjut skripsi walau capek dan sempat nangis',
  'Kamu tulus sama orang-orang di sekitarmu',
  'Senyummu bisa bikin hariku langsung membaik',
  'Kamu lucu banget, apalagi pas lagi nggak sadar lagi lucu',
  'Kamu sayang banget sama kucing dan boneka-bonekamu',
  'Kamu bikin hal-hal kecil jadi terasa spesial',
  'Kamu selalu berusaha jadi versi terbaik dirimu',
  'Kamu pendengar yang baik',
  'Kamu kuat, walau kadang nggak mau ngaku',
  'Kamu pintar, dan aku lihat sendiri kerja kerasnya',
  'Ketawamu menular',
  'Kamu punya hati yang lembut',
  'Kamu bikin aku pengen jadi orang yang lebih baik',
  'Kamu nggak pernah setengah-setengah kalau berusaha',
  'Kamu selalu bisa bangkit lagi setelah jatuh',
  '[alasan personal: sesuatu yang cuma kamu yang tahu]',
  '[alasan personal: momen yang bikin kamu makin sayang]',
  '[alasan personal: kebiasaan kecilnya yang kamu suka]',
  'Karena kamu adalah kamu, dan itu lebih dari cukup 💗'
];

const grid = document.getElementById('reasonsGrid');
const openedCount = document.getElementById('openedCount');
const reasonsDone = document.getElementById('reasonsDone');
let opened = 0;

reasons.forEach((text, i) => {
  const card = document.createElement('div');
  card.className = 'flip';
  card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-front"><span class="num">${i + 1}</span><span class="paw">🐾</span></div>
      <div class="flip-back">${text}</div>
    </div>`;

  card.addEventListener('click', () => {
    if (card.classList.contains('flipped')) return;
    card.classList.add('flipped');
    opened++;
    openedCount.textContent = opened;
    if (opened === reasons.length) reasonsDone.classList.remove('hidden');
  });

  grid.appendChild(card);
});

// ===== Finale =====
const blowBtn = document.getElementById('blowBtn');
const replayBtn = document.getElementById('replayBtn');
const flame = document.getElementById('flame');
const credits = document.getElementById('credits');

function fireConfetti() {
  const colors = ['#ff6fa5', '#ffd6e7', '#ffffff', '#ffe58a'];
  const end = Date.now() + 2500;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function fireSprinkles() {
  if (typeof confetti !== 'function') return;

  const colors = ['#ff6fa5', '#ffd6e7', '#ffe58a', '#ffffff', '#a0e7ff'];
  const scalar = 1.6; // harus sama untuk shapeFromText dan confetti
  const heart = confetti.shapeFromText({ text: '💗', scalar });
  const paw = confetti.shapeFromText({ text: '🐾', scalar });
  const end = Date.now() + 4000; // lama hujan: 4 detik

  (function rain() {
    confetti({
      particleCount: 3,
      angle: 270,            // 270 = jatuh ke bawah
      spread: 60,
      startVelocity: 12,
      gravity: 0.8,
      ticks: 350,
      drift: (Math.random() - 0.5) * 2,
      origin: { x: Math.random(), y: -0.05 },
      colors,
      shapes: ['circle', 'square', heart, paw],
      scalar
    });
    if (Date.now() < end) requestAnimationFrame(rain);
  })();
}

blowBtn.addEventListener('click', () => {
  flame.classList.add('out');
  blowBtn.classList.add('hidden');
  fireConfetti();
  fireSprinkles();
  setTimeout(() => {
    credits.classList.remove('hidden');
    credits.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 900);
});

replayBtn.addEventListener('click', () => {
  fireConfetti();
  fireSprinkles();
});

// ===== Countdown =====
const LOCK_UNTIL_BIRTHDAY = false;   // ubah ke true kalau mau dikunci sampai tengah malam
const TARGET = new Date('2026-11-18T00:00:00+07:00');
const countdownEl = document.getElementById('countdown');

function tickCountdown() {
  const diff = TARGET - new Date();
  if (diff <= 0) {
    countdownEl.textContent = '🎉 Hari ini hari spesialmu! 🎉';
    openBtn.disabled = false;
    return;
  }
  const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
  const m = String(Math.floor(diff / 60000) % 60).padStart(2, '0');
  const s = String(Math.floor(diff / 1000) % 60).padStart(2, '0');
  countdownEl.textContent = `Menuju hari spesialmu: ${h}:${m}:${s}`;
  if (LOCK_UNTIL_BIRTHDAY) openBtn.disabled = true;
  setTimeout(tickCountdown, 1000);
}
tickCountdown();