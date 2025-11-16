// Simple prank flow + lightweight confetti
const startBtn = document.getElementById('start-btn');
const loader = document.getElementById('loader');
const resultBox = document.getElementById('result');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const resetBtn = document.getElementById('reset-btn');
const confettiCanvas = document.getElementById('confetti');

startBtn.addEventListener('click', () => {
  startBtn.classList.add('hidden');
  loader.classList.remove('hidden');

  // fake "checking" sequence with increasing delays
  fakeCheckSequence()
    .then(outcome => {
      loader.classList.add('hidden');
      showResult(outcome);
    });
});

resetBtn.addEventListener('click', resetAll);

function fakeCheckSequence(){
  // series of timed steps to make it believable
  const steps = [900, 1200, 800]; // ms
  return steps.reduce((p, ms) => {
    return p.then(() => new Promise(res => setTimeout(res, ms)));
  }, Promise.resolve()).then(() => {
    // determine random outcome
    const r = Math.random();
    if (r < 0.25) return {title: 'Anda Menang!', text: 'Tebak? Hadiah: 5000 points (palsu) 🎁', win:true};
    if (r < 0.6)  return {title: ' hampir!', text: 'Anda hampir menang — cuba lagi!', win:false};
    return {title: 'Ups!', text: 'Maaf — tiada hadiah kali ini. 😊', win:false};
  });
}

function showResult(outcome){
  resultTitle.textContent = outcome.title;
  resultText.textContent = outcome.text;
  resultBox.classList.remove('hidden');

  if (outcome.win) {
    // start confetti for winners
    startConfetti();
    // stop after 5s
    setTimeout(stopConfetti, 5000);
  }
}

function resetAll(){
  resultBox.classList.add('hidden');
  startBtn.classList.remove('hidden');
  resultTitle.textContent = '';
  resultText.textContent = '';
}

// --- tiny confetti implementation ---
let confettiCtx, confettiParticles = [], confettiRAF;
function initConfetti(){
  confettiCanvas.width = innerWidth;
  confettiCanvas.height = innerHeight;
  confettiCtx = confettiCanvas.getContext('2d');
}

function random(min, max){ return Math.random()*(max-min)+min }

function makeParticles(n=80){
  confettiParticles = [];
  const colors = ['#ff3b3b','#ffb86b','#ffd166','#8be9a1','#6be7ff','#b19cff'];
  for(let i=0;i<n;i++){
    confettiParticles.push({
      x: random(0, innerWidth),
      y: random(-innerHeight, 0),
      w: random(6,12),
      h: random(8,18),
      vx: random(-0.6, 0.6),
      vy: random(1.2, 4),
      angle: random(0, Math.PI*2),
      va: random(-0.07,0.07),
      color: colors[Math.floor(random(0, colors.length))]
    });
  }
}

function drawConfetti(){
  confettiCtx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
  for(let p of confettiParticles){
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.angle);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
    confettiCtx.restore();

    p.x += p.vx;
    p.y += p.vy;
    p.angle += p.va;

    if (p.y > innerHeight + 20){
      p.y = random(-40, -10);
      p.x = random(0, innerWidth);
    }
  }
}

function confettiLoop(){
  drawConfetti();
  confettiRAF = requestAnimationFrame(confettiLoop);
}

function startConfetti(){
  initConfetti();
  makeParticles(120);
  if (!confettiRAF) confettiLoop();
}

function stopConfetti(){
  if (confettiRAF) {
    cancelAnimationFrame(confettiRAF);
    confettiRAF = null;
    confettiCtx && confettiCtx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
  }
}

// handle resize
window.addEventListener('resize', () => {
  confettiCanvas.width = innerWidth;
  confettiCanvas.height = innerHeight;
});
