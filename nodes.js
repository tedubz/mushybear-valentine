function logStatus(msg) {
  try {
    console.log(msg);
  } catch (e) {
    // ignore
  }
}

// Love phrases array
const lovePhrases = [
  'I choose you, everyday',
  'Forever and ever',
  'You complete me',
  'if we perish we perish',
  'if we die we die'
];

// Love emojis
const loveEmojis = ['❤️', '💖', '💕', '💗', '💓', '💞', '✨', '🌹'];

let animationsActive = true;

// Start floating emojis
function startFloatingEmojis() {
  if (!animationsActive) return;
  
  const emojiContainer = document.getElementById('emojiContainer');
  if (!emojiContainer) return;
  
  setInterval(() => {
    if (!animationsActive) return;
    
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
    emoji.style.left = Math.random() * 100 + '%';
    emoji.style.animationDuration = (4 + Math.random() * 3) + 's';
    
    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 9000);
  }, 800);
}

// Start love phrases
function startLovePhrases() {
  if (!animationsActive) return;
  
  const phraseContainer = document.getElementById('phraseContainer');
  if (!phraseContainer) return;
  
  setInterval(() => {
    if (!animationsActive) return;
    
    const phrase = document.createElement('div');
    phrase.className = 'love-phrase';
    phrase.textContent = lovePhrases[Math.floor(Math.random() * lovePhrases.length)];
    phrase.style.color = ['rgba(255, 105, 180, 0.8)', 'rgba(220, 20, 60, 0.8)', 'rgba(255, 192, 203, 0.8)'][Math.floor(Math.random() * 3)];
    
    phraseContainer.appendChild(phrase);
    setTimeout(() => phrase.remove(), 4500);
  }, 3000);
}

// Enable audio on user interaction (mobile requirement)
function enableAudio() {
  const audio = document.getElementById('bgAudio');
  if (audio) {
    logStatus('Enabling audio...');
    audio.muted = false;
    audio.volume = 0.5;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          logStatus('Audio playing successfully');
          document.getElementById('unmuteBtn')?.style.display = 'none';
        })
        .catch(err => {
          logStatus('Audio play error: ' + err);
          // Show unmute button if autoplay fails
          const btn = document.getElementById('unmuteBtn');
          if (btn) btn.style.display = 'block';
        });
    }
  }
}

// Add click listener to enable audio (mobile requirement)
document.addEventListener('click', enableAudio, { once: true });
document.addEventListener('touchstart', enableAudio, { once: true });

// Create unmute button
setTimeout(() => {
  const unmuteBtn = document.createElement('button');
  unmuteBtn.id = 'unmuteBtn';
  unmuteBtn.textContent = '🔊 Unmute Music';
  unmuteBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
    padding: 10px 15px;
    background: rgba(255, 105, 180, 0.9);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `;
  
  unmuteBtn.addEventListener('click', () => {
    const audio = document.getElementById('bgAudio');
    if (audio) {
      audio.muted = false;
      audio.volume = 0.5;
      audio.play().then(() => {
        logStatus('Audio started via button');
        unmuteBtn.style.display = 'none';
      }).catch(err => logStatus('Button play failed: ' + err));
    }
  });
  
  document.body.appendChild(unmuteBtn);
}, 500);

// Image cycling for backgrounds
const bgImages = ['background1.jpg', 'background2.jpg'];
let currentImageIndex = 0;
let imageInterval = null;

function setBackgroundImage(imagePath) {
  document.body.style.backgroundImage = `url('${imagePath}')`;
  logStatus('Background image set to: ' + imagePath);
}

function startImageCycle() {
  if (imageInterval) clearInterval(imageInterval);
  setBackgroundImage(bgImages[0]);
  currentImageIndex = 0;
  
  imageInterval = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % bgImages.length;
    setBackgroundImage(bgImages[currentImageIndex]);
  }, 3000); // Switch every 3 seconds
}

// Start cycling on page load
startImageCycle();

// Delay animations start slightly to ensure DOM is ready
setTimeout(() => {
  startFloatingEmojis();
  startLovePhrases();
}, 500);

const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
logStatus('nodes.js loaded — buttons present: ' + (!!noButton) + ', ' + (!!yesButton));
window._javaJsLoaded = true;

// Defensive check: stop if buttons not found
if (!noButton || !yesButton) {
  console.error("Required buttons not found in DOM", { noButton, yesButton });
} else {
  // Make NO button escape (mouse + touch)
  function moveNoButton() {
    const maxX = Math.max(0, window.innerWidth - noButton.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - noButton.offsetHeight);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noButton.style.position = "fixed";
    noButton.style.left = x + "px";
    noButton.style.top = y + "px";
    logStatus('moveNoButton -> ' + Math.round(x) + ',' + Math.round(y));
  }

  // Use pointer events (covers mouse + touch) and provide fallbacks for older devices
  // pointerenter for mouse, touchstart/touchend/click for touch devices
  noButton.addEventListener("pointerenter", (e) => { logStatus('pointerenter on noButton'); moveNoButton(); });
  noButton.addEventListener("touchstart", (e) => { e.preventDefault(); logStatus('touchstart on noButton'); moveNoButton(); }, { passive: false });
  noButton.addEventListener("touchend", (e) => { e.preventDefault(); logStatus('touchend on noButton'); moveNoButton(); }, { passive: false });
  noButton.addEventListener("touchmove", (e) => { /* don't spam moves on touchmove */ e.preventDefault(); }, { passive: false });
  noButton.addEventListener("click", (e) => { logStatus('click on noButton'); moveNoButton(); });
  // Improve touch responsiveness hint
  noButton.style.touchAction = 'manipulation';

  // YES button action
  yesButton.addEventListener("click", () => {
    if (imageInterval) clearInterval(imageInterval);
    setBackgroundImage('background3.jpg');
    
    const originalHTML = document.body.innerHTML;
    
    document.body.innerHTML = `
      <div id="finalMessage" style="
        background:rgba(0,0,0,0.6);
        color:white;
        height:100vh;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        text-align:center;
        font-size:22px;
        padding:20px;
        z-index: 10;
        position: relative;
      ">
        <h1>Thank you 💖</h1>
        <p>Thank you 💖 Thank you 💖 Thank you 💖</p>
        <p>Thank you 💖 Thank you 💖 Thank you 💖</p>
        <h2 style="margin-top:20px;">I love you Mushybear ❤️</h2>
      </div>
      <div id="emojiContainer"></div>
      <div id="phraseContainer"></div>
    `;
    
    startFloatingEmojis();
    startLovePhrases();

    // Navigate to WhatsApp using location.href (less likely to be blocked)
    setTimeout(() => {
      window.location.href = "https://wa.me/qr/M3GCI7F2OKMOF1";
    }, 3000);
  });
}


// Ensure styles are applied — inject fallback if styles.css didn't load
(function ensureStyles() {
  const found = Array.from(document.styleSheets).some(s => s.href && s.href.endsWith('styles.css'));
  if (found) { logStatus('styles.css loaded'); return; }
  logStatus('styles.css not loaded — injecting fallback styles');
  const css = `
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%;font-family:Arial,sans-serif;background:#000}
    #bg-video{position:fixed;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:-1}
    .overlay{background:rgba(0,0,0,0.55);height:100%;display:flex;align-items:center;justify-content:center}
    .card{background:#fff;padding:24px;border-radius:12px;max-width:420px;width:90%;text-align:center}
    .card h1{color:#d62828;margin-bottom:8px}
    .buttons{position:relative;height:120px}
    button{padding:10px 16px;border-radius:8px;border:0;cursor:pointer}
    #yesButton{background:#e63946;color:#fff}
    #noButton{background:#ccc;position:absolute;right:0}
  `;
  const styleEl = document.createElement('style');
  styleEl.id = 'fallback-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
})();

