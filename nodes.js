function logStatus(msg) {
  try {
    console.log(msg);
  } catch (e) {
    // ignore
  }
}

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

const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
logStatus('java.js loaded — buttons present: ' + (!!noButton) + ', ' + (!!yesButton));
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
    
    document.body.innerHTML = `
      <div style="
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
      ">
        <h1>Thank you 💖</h1>
        <p>Thank you 💖 Thank you 💖 Thank you 💖</p>
        <p>Thank you 💖 Thank you 💖 Thank you 💖</p>
        <h2 style="margin-top:20px;">I love you Mushybear ❤️</h2>
      </div>
    `;

    // Navigate to WhatsApp using location.href (less likely to be blocked)
    setTimeout(() => {
      window.location.href = "https://wa.me/qr/M3GCI7F2OKMOF1";
    }, 1000);
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

