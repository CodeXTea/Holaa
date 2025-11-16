function showPrank(type) {
  document.querySelector('.container').classList.add('hidden');

  // Hide all prank screens first
  document.querySelectorAll('.prank').forEach(p => p.classList.add('hidden'));

  // Show selected prank
  document.getElementById(type).classList.remove('hidden');

  if (type === 'gift') startGiftPrank();
  if (type === 'camera') startCameraPrank();
  if (type === 'bsod') startBSOD();
}

// ---------- PRANK 1: GIFT ----------
function startGiftPrank() {
  setTimeout(() => {
    document.querySelector('.loader').classList.add('hidden');
    let r = Math.random();
    let msg = document.getElementById('gift-result');
    msg.classList.remove('hidden');

    if (r < 0.5) msg.textContent = "😂 Server Error 404 — Prank je bro!";
    else msg.textContent = "🤣 Hadiah dibatalkan — kawan anda dah kena prank!";
  }, 3000);
}

// ---------- PRANK 2: FAKE CAMERA ----------
function startCameraPrank() {
  const video = document.getElementById('fakeCam');

  // Fake camera video — random looping clip
  video.src =
    "https://cdn.jsdelivr.net/gh/jerrykdev/fakecam/fakecam.mp4";

  video.play();

  setTimeout(() => {
    alert("😂 Hahah! Itu bukan kamera sebenar — video palsu!");
  }, 5000);
}

// ---------- PRANK 3: BSOD ----------
function startBSOD() {
  setTimeout(() => {
    alert("😂 Bro relaks… ini prank je, phone kau OK!");
  }, 4000);
}
