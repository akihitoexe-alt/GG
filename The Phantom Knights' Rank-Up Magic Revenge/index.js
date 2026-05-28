// APP CONTROLLER STATE
const state = {
  rarity: 'ultra',
  isSoundEnabled: true,
  isFlipped: false,
  customColors: {
    primary: '#22d3ee',
    secondary: '#c084fc',
    background: '#38bdf8'
  },
  defaultEffect: `When your opponent declares a direct attack: Pay half your LP, then target 1 "The Phantom Knights" or "Xyz Dragon" Xyz Monster in your GY or banishment; Special Summon it, and if you do, Special Summon from your Extra Deck, 1 "The Phantom Knights" or "Xyz Dragon" Xyz Monster that is 1 or 2 Ranks higher than that monster, by using it as the Xyz Material. (This is treated as an Xyz Summon.)

You can banish this card from your GY, except the turn this card was sent to the GY, then target 1 "The Phantom Knights" or "Xyz Dragon" Xyz Monster you control; it gains 800 ATK for each "The Phantom Knights" monster in your GY.

If your LP is 1000 or less, you can activate this card from your hand.

You can only use each effect of "The Phantom Knights' Rank-Up Magic Revenge" once per turn.`
};

// DOM ELEMENTS
const cardWrapper = document.getElementById('cardWrapper');
const cardInner = document.getElementById('cardInner');
const displayCardTitle = document.getElementById('displayCardTitle');
const displayCardType = document.getElementById('displayCardType');
const displayCardEffect = document.getElementById('displayCardEffect');
const displayCardSerial = document.getElementById('displayCardSerial');
const displayAttributeSvg = document.getElementById('displayAttributeSvg');
const holoShimmer = document.getElementById('holoShimmer');
const secretRareGlitter = document.getElementById('secretRareGlitter');

// UI Controls
const raritySelect = document.getElementById('raritySelect');
const soundToggle = document.getElementById('soundToggle');
const btnActivateCard = document.getElementById('btnActivateCard');
const tabButtons = document.querySelectorAll('.panel-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Customizer Inputs
const inputName = document.getElementById('inputName');
const inputType = document.getElementById('inputType');
const inputAttribute = document.getElementById('inputAttribute');
const inputSerial = document.getElementById('inputSerial');
const inputEffect = document.getElementById('inputEffect');
const colorArtPrimary = document.getElementById('colorArtPrimary');
const colorArtSecondary = document.getElementById('colorArtSecondary');
const colorArtBackground = document.getElementById('colorArtBackground');
const btnResetCustomizer = document.getElementById('btnResetCustomizer');

// Readout Displays
const readoutName = document.getElementById('readoutName');
const readoutType = document.getElementById('readoutType');

// Activation Overlay Elements
const activationOverlay = document.getElementById('activationOverlay');
const btnCloseActivation = document.getElementById('btnCloseActivation');
const activationCanvas = document.getElementById('activationCanvas');
const activationCardTarget = document.getElementById('activationCardTarget');
const activeCardNameText = document.getElementById('activeCardNameText');
const activeCardEffectTyping = document.getElementById('activeCardEffectTyping');

// ----------------------------------------------------
// WEB AUDIO API - AUDIO SYNTHESIZER
// ----------------------------------------------------
let audioCtx = null;
let humOscillator = null;
let humGain = null;

function initAudio() {
  if (audioCtx) return;
  // Initialize context on user interaction
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContextClass();
  
  // Start subtle hum for hover effects
  setupHum();
}

function setupHum() {
  if (!state.isSoundEnabled || !audioCtx) return;
  
  humOscillator = audioCtx.createOscillator();
  humGain = audioCtx.createGain();
  
  humOscillator.type = 'sine';
  humOscillator.frequency.value = 85; // Low sci-fi drone
  humGain.gain.value = 0.0; // Start silent
  
  // Connect lowpass filter for smoother hum
  const lpFilter = audioCtx.createBiquadFilter();
  lpFilter.type = 'lowpass';
  lpFilter.frequency.value = 150;
  
  humOscillator.connect(lpFilter);
  lpFilter.connect(humGain);
  humGain.connect(audioCtx.destination);
  
  humOscillator.start();
}

function updateHum(pitchMultiplier, gainValue) {
  if (!state.isSoundEnabled || !audioCtx || !humOscillator || !humGain) return;
  
  // Smoothly shift pitch and gain
  const targetFreq = 85 + (pitchMultiplier * 35);
  humOscillator.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.1);
  humGain.gain.setTargetAtTime(gainValue * 0.07, audioCtx.currentTime, 0.15);
}

function stopHum() {
  if (humGain) {
    humGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
  }
}

// Draw/Rustle SFX (White Noise Burst)
function playDrawSound() {
  if (!state.isSoundEnabled) return;
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const bufferSize = audioCtx.sampleRate * 0.18; // Short burst
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  
  // Fill buffer with white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = buffer;
  
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  filter.Q.value = 1.5;
  
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.16);
  
  noiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  noiseNode.start();
}

// Spell/Trap Activation SFX
function playActivationSound() {
  if (!state.isSoundEnabled) return;
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const now = audioCtx.currentTime;
  
  // 1. Bass Drop / Shockwave
  const bassOsc = audioCtx.createOscillator();
  const bassGain = audioCtx.createGain();
  bassOsc.type = 'sawtooth';
  bassOsc.frequency.setValueAtTime(150, now);
  bassOsc.frequency.exponentialRampToValueAtTime(30, now + 1.2);
  
  const bassFilter = audioCtx.createBiquadFilter();
  bassFilter.type = 'lowpass';
  bassFilter.frequency.setValueAtTime(300, now);
  bassFilter.frequency.exponentialRampToValueAtTime(60, now + 0.8);
  
  bassGain.gain.setValueAtTime(0.3, now);
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
  
  bassOsc.connect(bassFilter);
  bassFilter.connect(bassGain);
  bassGain.connect(audioCtx.destination);
  
  // 2. Mystic Resonant Bell Chimes
  const frequencies = [329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // Pentatonic chord
  frequencies.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + (idx * 0.04)); // Arpeggiated entry
    
    // Vibrato
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 6;
    lfoGain.gain.value = 8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05 + (idx * 0.04));
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0 + (idx * 0.1));
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    lfo.start(now);
    osc.start(now + (idx * 0.04));
    osc.stop(now + 3.0);
  });
  
  // 3. Shimmer Noise Sweep
  const bufferSize = audioCtx.sampleRate * 1.5;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  
  const sweepFilter = audioCtx.createBiquadFilter();
  sweepFilter.type = 'bandpass';
  sweepFilter.Q.value = 4.0;
  sweepFilter.frequency.setValueAtTime(80, now);
  sweepFilter.frequency.exponentialRampToValueAtTime(6000, now + 1.0);
  
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.01, now);
  noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.4);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
  
  noise.connect(sweepFilter);
  sweepFilter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  
  bassOsc.start(now);
  bassOsc.stop(now + 1.8);
  noise.start(now);
  noise.stop(now + 1.8);
}

// ----------------------------------------------------
// 3D CARD TILT & GLOW INTERACTION
// ----------------------------------------------------
cardWrapper.addEventListener('mousemove', (e) => {
  initAudio();
  const rect = cardWrapper.getBoundingClientRect();
  const x = e.clientX - rect.left; // x position within card
  const y = e.clientY - rect.top;  // y position within card
  
  // Calculate relative coordinate percentages
  const px = (x / rect.width) * 100;
  const py = (y / rect.height) * 100;
  
  // Calculate rotation angles (max tilt 20 degrees)
  const rx = ((y / rect.height) - 0.5) * -20;
  const ry = ((x / rect.width) - 0.5) * 20;
  
  // Write custom properties to CSS
  cardWrapper.style.setProperty('--rx', `${rx}deg`);
  cardWrapper.style.setProperty('--ry', `${ry}deg`);
  cardWrapper.style.setProperty('--mx', `${px}%`);
  cardWrapper.style.setProperty('--my', `${py}%`);
  
  // Update hover sound synthesis based on tilt angle magnitude
  const intensity = Math.min(1, Math.sqrt(rx*rx + ry*ry) / 14);
  updateHum(intensity, intensity);
});

cardWrapper.addEventListener('mouseleave', () => {
  // Smoothly restore default tilt
  cardWrapper.style.setProperty('--rx', '0deg');
  cardWrapper.style.setProperty('--ry', '0deg');
  cardWrapper.style.setProperty('--mx', '50%');
  cardWrapper.style.setProperty('--my', '50%');
  
  stopHum();
});

// Flip card on double-click
cardWrapper.addEventListener('dblclick', () => {
  state.isFlipped = !state.isFlipped;
  playDrawSound();
  if (state.isFlipped) {
    cardInner.style.transform = 'rotateY(180deg)';
  } else {
    cardInner.style.transform = 'rotateY(0deg)';
  }
});

// ----------------------------------------------------
// RARITY SYSTEM CONFIGURATOR
// ----------------------------------------------------
function updateFoilRarity(rarity) {
  state.rarity = rarity;
  
  // Remove existing classes
  displayCardTitle.classList.remove('rarity-common', 'rarity-ultra', 'rarity-secret', 'rarity-ultimate');
  holoShimmer.classList.remove('rarity-ultra-holo', 'rarity-ultimate-holo');
  secretRareGlitter.classList.remove('rarity-secret-holo');
  
  // Apply appropriate styles
  displayCardTitle.classList.add(`rarity-${rarity}`);
  
  if (rarity === 'ultra') {
    holoShimmer.classList.add('rarity-ultra-holo');
  } else if (rarity === 'secret') {
    secretRareGlitter.classList.add('rarity-secret-holo');
  } else if (rarity === 'ultimate') {
    holoShimmer.classList.add('rarity-ultimate-holo');
  }
  
  playDrawSound();
}

raritySelect.addEventListener('change', (e) => {
  updateFoilRarity(e.target.value);
});

soundToggle.addEventListener('change', (e) => {
  state.isSoundEnabled = e.target.checked;
  if (!state.isSoundEnabled) {
    stopHum();
  }
});

// ----------------------------------------------------
// CONTROLS PANEL TABS
// ----------------------------------------------------
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(`tab-${tabId}`).classList.add('active');
    
    playDrawSound();
  });
});

// ----------------------------------------------------
// CARD CUSTOMIZER ENGINE
// ----------------------------------------------------
function bindCustomizer() {
  // Input: Name
  inputName.addEventListener('input', (e) => {
    const value = e.target.value || "Untitled Card";
    displayCardTitle.textContent = value;
    readoutName.textContent = value;
  });

  // Input: Classification (Normal Trap, Spell, etc.)
  inputType.addEventListener('change', (e) => {
    const value = e.target.value;
    const border = document.querySelector('.card-border');
    
    // Reset classes
    border.classList.remove('trap-card', 'spell-card', 'dark-card');
    
    let classificationText = '';
    
    if (value.includes('trap')) {
      border.classList.add('trap-card');
      if (value === 'normal-trap') {
        classificationText = '[Trap Card <span class="trap-icon-symbol"></span>]';
        readoutType.textContent = 'Normal Trap';
      } else if (value === 'continuous-trap') {
        classificationText = '[Trap Card <span class="trap-icon-symbol"></span> ♾️]';
        readoutType.textContent = 'Continuous Trap';
      } else if (value === 'counter-trap') {
        classificationText = '[Trap Card <span class="trap-icon-symbol"></span> ⚡]';
        readoutType.textContent = 'Counter Trap';
      }
    } else if (value.includes('spell')) {
      border.classList.add('spell-card');
      if (value === 'normal-spell') {
        classificationText = '[Spell Card <span class="spell-icon-symbol"></span>]';
        readoutType.textContent = 'Normal Spell';
      } else if (value === 'quick-play-spell') {
        classificationText = '[Spell Card <span class="spell-icon-symbol"></span> ⚡]';
        readoutType.textContent = 'Quick-Play Spell';
      }
    }
    
    displayCardType.innerHTML = classificationText;
    playDrawSound();
  });

  // Input: Attribute
  inputAttribute.addEventListener('change', (e) => {
    const attr = e.target.value;
    const border = document.querySelector('.card-border');
    
    let color = '#C5186D'; // Default Trap Pink
    let text = '罠';
    
    if (attr === 'TRAP') {
      color = '#C5186D';
      text = '罠';
    } else if (attr === 'SPELL') {
      color = '#1C7C74';
      text = '魔';
    } else if (attr === 'DARK') {
      color = '#1E1B4B';
      text = '闇';
      border.classList.remove('trap-card', 'spell-card');
      border.classList.add('dark-card');
    }
    
    displayAttributeSvg.innerHTML = `
      <circle cx="50" cy="50" r="45" fill="${color}" stroke="#000" stroke-width="3"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke="#fff" stroke-dasharray="2,2" stroke-width="1.5"/>
      <text x="50" y="58" font-family="'Cinzel', serif" font-weight="900" font-size="28" fill="#fff" text-anchor="middle" letter-spacing="-1">${text}</text>
    `;
    playDrawSound();
  });

  // Input: Serial Code
  inputSerial.addEventListener('input', (e) => {
    displayCardSerial.textContent = e.target.value || "PKR-EN000";
  });

  // Input: Effect text
  inputEffect.addEventListener('input', (e) => {
    displayCardEffect.innerHTML = e.target.value.replace(/\n/g, '<br>');
  });

  // Art Color Shifting
  colorArtPrimary.addEventListener('input', (e) => {
    state.customColors.primary = e.target.value;
    updateProceduralColors();
  });
  
  colorArtSecondary.addEventListener('input', (e) => {
    state.customColors.secondary = e.target.value;
    updateProceduralColors();
  });

  colorArtBackground.addEventListener('input', (e) => {
    state.customColors.background = e.target.value;
    updateProceduralColors();
  });

  // Reset Customizer
  btnResetCustomizer.addEventListener('click', () => {
    inputName.value = "The Phantom Knights' Rank-Up Magic Revenge";
    inputType.value = "counter-trap";
    inputAttribute.value = "TRAP";
    inputSerial.value = "PKR-EN099";
    inputEffect.value = state.defaultEffect;
    
    colorArtPrimary.value = "#22d3ee";
    colorArtSecondary.value = "#c084fc";
    colorArtBackground.value = "#38bdf8";
    
    state.customColors.primary = "#22d3ee";
    state.customColors.secondary = "#c084fc";
    state.customColors.background = "#38bdf8";
    
    // Dispatch events to update DOM
    inputName.dispatchEvent(new Event('input'));
    inputType.dispatchEvent(new Event('change'));
    inputAttribute.dispatchEvent(new Event('change'));
    inputSerial.dispatchEvent(new Event('input'));
    inputEffect.dispatchEvent(new Event('input'));
    updateProceduralColors();
    
    playDrawSound();
  });
}

function updateProceduralColors() {
  const p = state.customColors.primary;
  const s = state.customColors.secondary;
  const b = state.customColors.background;
  
  // Select SVG elements and update fill/strokes
  const crest = document.querySelector('.rankup-crest polygon');
  const ring1 = document.querySelector('.rotating-ring circle:nth-child(2)');
  const ring2 = document.querySelector('.rotating-ring circle:nth-child(3)');
  const ring3 = document.querySelector('.rotating-ring circle:nth-child(4)');
  const core = document.querySelector('.glowing-core');
  
  const fParticles = document.querySelectorAll('.flame-bubble');
  
  if (crest) crest.setAttribute('stroke', p);
  if (ring1) ring1.setAttribute('stroke', p);
  if (ring2) ring2.setAttribute('stroke', s);
  if (ring3) ring3.setAttribute('stroke', b);
  if (core) core.setAttribute('fill', s);
  
  fParticles.forEach((particle, idx) => {
    if (idx % 3 === 0) particle.setAttribute('fill', b);
    else if (idx % 3 === 1) particle.setAttribute('fill', s);
    else particle.setAttribute('fill', p);
  });
}

// ----------------------------------------------------
// FULLSCREEN CARD ACTIVATION CUTSCENE
// ----------------------------------------------------
let activationParticles = [];
let animFrameId = null;

function triggerActivationSequence() {
  initAudio();
  playActivationSound();
  
  // Clone current state of card face to focus overlay
  activationCardTarget.innerHTML = '';
  const cardClone = cardInner.cloneNode(true);
  
  // Reset clone flip classes so it always shows front during activation
  cardClone.style.transform = 'rotateY(0deg)';
  activationCardTarget.appendChild(cardClone);
  
  // Match title in overlay
  activeCardNameText.textContent = inputName.value.toUpperCase();
  
  // Reset typing text box
  activeCardEffectTyping.innerHTML = '';
  
  // Open full-screen overlay
  activationOverlay.classList.add('active');
  
  // Setup canvas drawing resolution
  resizeActivationCanvas();
  
  // Start particle simulation
  setupParticles();
  runParticleAnimation();
  
  // Start typing out effect text with a delayed trigger
  setTimeout(() => {
    typeOutEffect(inputEffect.value);
  }, 1200);
}

function closeActivationSequence() {
  activationOverlay.classList.remove('active');
  cancelAnimationFrame(animFrameId);
  activationParticles = [];
  if (typingTimeoutId) clearTimeout(typingTimeoutId);
  playDrawSound();
}

function resizeActivationCanvas() {
  const dpr = window.devicePixelRatio || 1;
  activationCanvas.width = window.innerWidth * dpr;
  activationCanvas.height = window.innerHeight * dpr;
  
  const ctx = activationCanvas.getContext('2d');
  ctx.scale(dpr, dpr);
}

// Canvas particles config
function setupParticles() {
  activationParticles = [];
  
  // Create circular orbital particles
  const count = 180;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  for (let i = 0; i < count; i++) {
    activationParticles.push({
      x: centerX + (Math.random() - 0.5) * 100,
      y: centerY + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      radius: Math.random() * 3.5 + 0.5,
      color: Math.random() > 0.5 ? state.customColors.primary : state.customColors.secondary,
      alpha: Math.random() * 0.8 + 0.2,
      life: Math.random() * 120 + 60,
      maxLife: 180,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 1.5 + 0.5,
      orbitRadius: Math.random() * 200 + 50,
      orbitSpeed: (Math.random() - 0.5) * 0.02
    });
  }
}

function runParticleAnimation() {
  const ctx = activationCanvas.getContext('2d');
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  ctx.clearRect(0, 0, w, h);
  
  const centerX = w / 2;
  const centerY = h / 2;
  
  // Drawing particles
  activationParticles.forEach((p, idx) => {
    p.life--;
    
    // Orbital rotation pattern
    p.angle += p.orbitSpeed;
    p.orbitRadius += p.speed * 0.8;
    
    p.x = centerX + Math.cos(p.angle) * p.orbitRadius;
    p.y = centerY + Math.sin(p.angle) * p.orbitRadius;
    
    // Fade out as it dies
    const currentAlpha = p.alpha * (p.life / p.maxLife);
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, currentAlpha);
    ctx.shadowBlur = p.radius * 3;
    ctx.shadowColor = p.color;
    ctx.fill();
    
    // Recycle dead particles
    if (p.life <= 0) {
      activationParticles[idx] = {
        x: centerX + (Math.random() - 0.5) * 50,
        y: centerY + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 3.5 + 0.5,
        color: Math.random() > 0.5 ? state.customColors.primary : state.customColors.secondary,
        alpha: Math.random() * 0.8 + 0.2,
        life: 180,
        maxLife: 180,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.5 + 0.5,
        orbitRadius: Math.random() * 50 + 20,
        orbitSpeed: (Math.random() - 0.5) * 0.03
      };
    }
  });
  
  // Draw random electric arcs across portal
  if (Math.random() > 0.65) {
    ctx.beginPath();
    ctx.strokeStyle = state.customColors.primary;
    ctx.globalAlpha = Math.random() * 0.5 + 0.2;
    ctx.lineWidth = Math.random() * 2 + 0.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = state.customColors.primary;
    
    // Arc originating from circle boundary
    const arcAngle = Math.random() * Math.PI * 2;
    const innerRad = 150;
    const outerRad = 280;
    
    const startX = centerX + Math.cos(arcAngle) * innerRad;
    const startY = centerY + Math.sin(arcAngle) * innerRad;
    const endX = centerX + Math.cos(arcAngle + (Math.random() - 0.5) * 0.5) * outerRad;
    const endY = centerY + Math.sin(arcAngle + (Math.random() - 0.5) * 0.5) * outerRad;
    
    ctx.moveTo(startX, startY);
    // Draw jagged path
    const joints = 5;
    for (let i = 1; i < joints; i++) {
      const t = i / joints;
      const lx = startX + (endX - startX) * t + (Math.random() - 0.5) * 15;
      const ly = startY + (endY - startY) * t + (Math.random() - 0.5) * 15;
      ctx.lineTo(lx, ly);
    }
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  
  animFrameId = requestAnimationFrame(runParticleAnimation);
}

// TYPING ENGINE
let typingTimeoutId = null;

function typeOutEffect(text) {
  if (typingTimeoutId) clearTimeout(typingTimeoutId);
  activeCardEffectTyping.innerHTML = '';
  
  let i = 0;
  const formattedText = text.replace(/\n/g, '<br>');
  
  function step() {
    if (i < formattedText.length) {
      // If we encounter a tag like <br>, append it complete
      if (formattedText.substr(i, 4) === '<br>') {
        activeCardEffectTyping.innerHTML += '<br>';
        i += 4;
      } else {
        activeCardEffectTyping.innerHTML += formattedText.charAt(i);
        i++;
      }
      
      // Delay speed
      typingTimeoutId = setTimeout(step, 18);
    }
  }
  
  step();
}

btnActivateCard.addEventListener('click', triggerActivationSequence);
btnCloseActivation.addEventListener('click', closeActivationSequence);
window.addEventListener('resize', () => {
  if (activationOverlay.classList.contains('active')) {
    resizeActivationCanvas();
  }
});

// ----------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // Pre-load default values and setup binds
  updateFoilRarity('ultra');
  bindCustomizer();
  updateProceduralColors();
});
