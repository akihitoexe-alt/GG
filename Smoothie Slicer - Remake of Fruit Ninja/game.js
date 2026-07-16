/**
 * Smoothie Slicer - Core Game Engine
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ui = {
    introScreen: document.getElementById('intro-screen'),
    startMenu: document.getElementById('start-menu'),
    gameOverScreen: document.getElementById('game-over'),
    howToPanel: document.getElementById('how-to-panel'),
    settingsPanel: document.getElementById('settings-panel'),
    hud: document.getElementById('hud'),
    recipeCard: document.getElementById('recipe-card'),
    ingredientList: document.getElementById('ingredient-list'),
    score: document.getElementById('score'),
    lives: document.getElementById('lives-container'),
    recipeName: document.getElementById('recipe-name'),
    resultTitle: document.getElementById('result-title'),
    resultDesc: document.getElementById('result-desc'),
    finalScore: document.getElementById('final-score'),
    settingsToggle: document.getElementById('settings-toggle'),
    settingsClose: document.getElementById('settings-close'),
    howToClose: document.getElementById('how-to-close'),
    sfxSlider: document.getElementById('sfx-volume'),
    bgmSlider: document.getElementById('bgm-volume'),
    noiseSlider: document.getElementById('noise-volume'),
    sfxOutput: document.getElementById('sfx-output'),
    bgmOutput: document.getElementById('bgm-output'),
    noiseOutput: document.getElementById('noise-output'),
};

const CONFIG = {
    GRAVITY: 0.15,
    BASE_SPAWN_RATE: 1450,
    MIN_SPAWN_RATE: 720,
    MAX_LIVES: 3,
    TRAIL_LENGTH: 18,
};

const TEXT = {
    en: {
        documentTitle: 'Smoothie Slicer | The Ultimate Blend',
        title: 'Smoothie Slicer',
        titleTop: 'Smoothie',
        titleBottom: 'Slicer',
        tagline: 'Slice. Combo. Blend.',
        subtitle: '60 seconds. One recipe. The perfect smoothie.',
        ultimate: 'Can you become the ultimate smoothie master?',
        smoothieMode: 'Smoothie Mode',
        freeMode: 'Free-for-All',
        howToTitle: 'How to Play',
        howToBody: 'Slice the flying ingredients. In Smoothie Mode, only cut the recipe items before they fall. Wrong cuts and missed recipe items cost lives.',
        options: 'Options',
        settingsTitle: 'Options',
        language: 'Language',
        languageHelp: 'Change all menu, HUD, recipe, and instruction text.',
        soundEffects: 'Sound Effects',
        bgm: 'BGM',
        juiceNoise: 'Juice Noise',
        score: 'Score',
        lives: 'Lives',
        recipe: 'Recipe',
        resultPerfect: 'Perfect Blend!',
        resultGameOver: 'Game Over',
        resultWinTemplate: "You've mastered the {recipe}.",
        resultLives: 'You ran out of lives!',
        tryAgain: 'Try Again',
        menu: 'Menu',
        close: 'Close',
        ingredients: {
            strawberry: 'Strawberry',
            watermelon: 'Watermelon',
            mango: 'Mango',
            banana: 'Banana',
            blueberry: 'Blueberry',
            kiwi: 'Kiwi',
            pineapple: 'Pineapple',
            peach: 'Peach',
            orange: 'Orange',
            spinach: 'Spinach',
            carrot: 'Carrot',
            beetroot: 'Beetroot',
            cucumber: 'Cucumber',
            avocado: 'Avocado',
            tomato: 'Tomato',
        },
        recipes: {
            tropicalBlast: 'Tropical Blast',
            greenMachine: 'Green Machine',
            berryBoost: 'Berry Boost',
            sunriseDetox: 'Sunrise Detox',
        },
    },
    ja: {
        documentTitle: 'スムージー・スライサー | 究極のブレンド',
        title: 'スムージー・スライサー',
        titleTop: 'スムージー',
        titleBottom: 'スライサー',
        tagline: '切って、つないで、ブレンド！',
        subtitle: '60秒。ひとつのレシピ。最高のスムージーを作ろう。',
        ultimate: '究極のスムージーマスターになれるかな？',
        smoothieMode: 'スムージーモード',
        freeMode: 'フリープレイ',
        howToTitle: '遊び方',
        howToBody: '飛んでくる材料を切りましょう。スムージーモードでは、レシピに必要な材料だけを落ちる前に切ってください。間違った材料を切ったり、必要な材料を逃すとライフが減ります。',
        options: 'オプション',
        settingsTitle: 'オプション',
        language: '言語',
        languageHelp: 'メニュー、HUD、レシピ、説明文を切り替えます。',
        soundEffects: '効果音',
        bgm: 'BGM',
        juiceNoise: 'ジューシー音',
        score: 'スコア',
        lives: 'ライフ',
        recipe: 'レシピ',
        resultPerfect: 'パーフェクトブレンド！',
        resultGameOver: 'ゲームオーバー',
        resultWinTemplate: '「{recipe}」をマスターしました。',
        resultLives: 'ライフがなくなりました！',
        tryAgain: 'もう一度',
        menu: 'メニュー',
        close: '閉じる',
        ingredients: {
            strawberry: 'いちご',
            watermelon: 'すいか',
            mango: 'マンゴー',
            banana: 'バナナ',
            blueberry: 'ブルーベリー',
            kiwi: 'キウイ',
            pineapple: 'パイナップル',
            peach: '桃',
            orange: 'オレンジ',
            spinach: 'ほうれん草',
            carrot: 'にんじん',
            beetroot: 'ビーツ',
            cucumber: 'きゅうり',
            avocado: 'アボカド',
            tomato: 'トマト',
        },
        recipes: {
            tropicalBlast: 'トロピカルブラスト',
            greenMachine: 'グリーンマシン',
            berryBoost: 'ベリーブースト',
            sunriseDetox: 'サンライズデトックス',
        },
    },
};

const INGREDIENTS = [
    { id: 'strawberry', icon: String.fromCodePoint(0x1F353), color: '#ff305f', type: 'fruit' },
    { id: 'watermelon', icon: String.fromCodePoint(0x1F349), color: '#ff5b74', type: 'fruit' },
    { id: 'mango', icon: String.fromCodePoint(0x1F96D), color: '#ffac1c', type: 'fruit' },
    { id: 'banana', icon: String.fromCodePoint(0x1F34C), color: '#ffe436', type: 'fruit' },
    { id: 'blueberry', icon: String.fromCodePoint(0x1FAD0), color: '#4267ff', type: 'fruit' },
    { id: 'kiwi', icon: String.fromCodePoint(0x1F95D), color: '#63df56', type: 'fruit' },
    { id: 'pineapple', icon: String.fromCodePoint(0x1F34D), color: '#ffd43d', type: 'fruit' },
    { id: 'peach', icon: String.fromCodePoint(0x1F351), color: '#ff8c69', type: 'fruit' },
    { id: 'orange', icon: String.fromCodePoint(0x1F34A), color: '#ff971d', type: 'fruit' },
    { id: 'spinach', icon: String.fromCodePoint(0x1F96C), color: '#22c55e', type: 'veg' },
    { id: 'carrot', icon: String.fromCodePoint(0x1F955), color: '#f97316', type: 'veg' },
    { id: 'beetroot', icon: String.fromCodePoint(0x1F7E3), color: '#b5179e', type: 'veg' },
    { id: 'cucumber', icon: String.fromCodePoint(0x1F952), color: '#34d399', type: 'veg' },
    { id: 'avocado', icon: String.fromCodePoint(0x1F951), color: '#65a30d', type: 'veg' },
    { id: 'tomato', icon: String.fromCodePoint(0x1F345), color: '#ef233c', type: 'veg' },
];

const RECIPES = [
    { id: 'tropicalBlast', ingredients: ['mango', 'pineapple', 'banana'] },
    { id: 'greenMachine', ingredients: ['spinach', 'cucumber', 'kiwi'] },
    { id: 'berryBoost', ingredients: ['strawberry', 'blueberry', 'banana'] },
    { id: 'sunriseDetox', ingredients: ['carrot', 'orange', 'beetroot'] },
];

const DEFAULT_SETTINGS = {
    language: 'en',
    sfxVolume: 0.8,
    bgmVolume: 0.35,
    noiseVolume: 0.25,
};

const settings = loadSettings();

const state = {
    mode: 'menu',
    lastMode: 'smoothie',
    score: 0,
    lives: CONFIG.MAX_LIVES,
    activeIngredients: [],
    particles: [],
    splats: [],
    trail: [],
    currentRecipe: null,
    recipeProgress: {},
    lastSpawn: 0,
    spawnRate: CONFIG.BASE_SPAWN_RATE,
    isPointerDown: false,
    pointerX: 0,
    pointerY: 0,
    isPaused: false,
    settingsWasPaused: false,
    result: null,
};

const audio = {
    ctx: null,
    sfxGain: null,
    bgmGain: null,
    noiseGain: null,
    bgmTimer: null,
    bgmStep: 0,
    notes: [261.63, 329.63, 392, 523.25, 392, 329.63, 293.66, 392],

    ensure() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        if (!this.ctx) {
            this.ctx = new AudioContext();
            this.sfxGain = this.ctx.createGain();
            this.bgmGain = this.ctx.createGain();
            this.noiseGain = this.ctx.createGain();
            this.sfxGain.connect(this.ctx.destination);
            this.bgmGain.connect(this.ctx.destination);
            this.noiseGain.connect(this.ctx.destination);
            this.createNoiseLoop();
            this.startBgm();
            this.applySettings();
        }

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    applySettings() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        this.sfxGain.gain.setTargetAtTime(settings.sfxVolume, now, 0.02);
        this.bgmGain.gain.setTargetAtTime(settings.bgmVolume * 0.42, now, 0.08);
        this.noiseGain.gain.setTargetAtTime(settings.noiseVolume * 0.32, now, 0.08);
    },

    createNoiseLoop() {
        const seconds = 2;
        const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * seconds, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i += 1) {
            data[i] = (Math.random() * 2 - 1) * 0.26;
        }

        const source = this.ctx.createBufferSource();
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 720;
        filter.Q.value = 0.7;
        source.buffer = buffer;
        source.loop = true;
        source.connect(filter).connect(this.noiseGain);
        source.start();
    },

    startBgm() {
        if (this.bgmTimer) return;
        this.bgmTimer = window.setInterval(() => {
            if (!this.ctx || this.ctx.state !== 'running' || document.hidden) return;
            const note = this.notes[this.bgmStep % this.notes.length];
            const harmony = this.notes[(this.bgmStep + 2) % this.notes.length] / 2;
            this.playTone(note, 0.18, this.bgmGain, 'triangle', 0.05);
            if (this.bgmStep % 2 === 0) {
                this.playTone(harmony, 0.22, this.bgmGain, 'sine', 0.034);
            }
            this.bgmStep += 1;
        }, 300);
    },

    playTone(frequency, duration, target, type, peak) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(Math.max(peak, 0.001), now + 0.018);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain).connect(target);
        osc.start(now);
        osc.stop(now + duration + 0.04);
    },

    playNoiseBurst(duration, peak) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * duration, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i += 1) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        }
        const source = this.ctx.createBufferSource();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        filter.type = 'highpass';
        filter.frequency.value = 1200;
        gain.gain.setValueAtTime(peak, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        source.buffer = buffer;
        source.connect(filter).connect(gain).connect(this.sfxGain);
        source.start(now);
    },

    playButton() {
        this.ensure();
        this.playTone(520, 0.08, this.sfxGain, 'square', 0.045);
        this.playTone(780, 0.1, this.sfxGain, 'triangle', 0.035);
    },

    playSlice() {
        this.ensure();
        this.playNoiseBurst(0.12, 0.12);
        this.playTone(880, 0.08, this.sfxGain, 'sine', 0.1);
        this.playTone(1320, 0.06, this.sfxGain, 'triangle', 0.06);
    },

    playMiss() {
        this.ensure();
        this.playTone(164.81, 0.18, this.sfxGain, 'sawtooth', 0.07);
    },

    playWin() {
        this.ensure();
        [523.25, 659.25, 783.99, 1046.5].forEach((note, index) => {
            window.setTimeout(() => this.playTone(note, 0.18, this.sfxGain, 'triangle', 0.09), index * 70);
        });
    },
};

class Projectile {
    constructor(data) {
        this.data = data;
        this.x = Math.random() * (canvas.width - 140) + 70;
        this.y = canvas.height + 60;
        this.vx = (Math.random() - 0.5) * 8.5;
        this.vy = -(Math.random() * 5 + 12.4);
        this.radius = 38 + Math.random() * 7;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.12;
        this.isSliced = false;
        this.opacity = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += CONFIG.GRAVITY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 100 && !this.isSliced) {
            this.onMiss();
            return false;
        }

        return this.y < canvas.height + 180;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.radius * 2}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.data.color;
        ctx.fillText(this.data.icon, 0, 0);
        ctx.restore();
    }

    onMiss() {
        if (state.mode !== 'smoothie') return;

        const isNeeded = state.currentRecipe.ingredients.includes(this.data.id);
        const isCompleted = state.recipeProgress[this.data.id];
        if (isNeeded && !isCompleted) {
            updateLives(-1);
            audio.playMiss();
        }
    }

    slice() {
        if (this.isSliced) return;
        this.isSliced = true;

        createSplat(this.x, this.y, this.data.color);
        createParticles(this.x, this.y, this.data.color, this.data.icon);
        audio.playSlice();

        if (state.mode === 'smoothie') {
            const isNeeded = state.currentRecipe.ingredients.includes(this.data.id);
            if (isNeeded) {
                state.recipeProgress[this.data.id] = true;
                state.score += 100;
                updateRecipeUI();
                checkWin();
            } else {
                state.score = Math.max(0, state.score - 50);
                updateLives(-1);
            }
        } else {
            state.score += 50;
        }

        updateScoreUI();
    }
}

class Particle {
    constructor(x, y, color, icon) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = (Math.random() - 0.5) * 12 - 1.5;
        this.radius = Math.random() * 4 + 2;
        this.color = color;
        this.icon = icon;
        this.life = 1;
        this.isChunk = Math.random() > 0.7;
        this.rotation = Math.random() * Math.PI;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.22;
        this.rotation += 0.08;
        this.life -= 0.025;
        return this.life > 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(this.life, 0);
        if (this.isChunk) {
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.font = '22px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.icon, 0, 0);
        } else {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

class Splat {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.life = 1;
        this.radius = Math.random() * 30 + 42;
        this.rotation = Math.random() * Math.PI;
    }

    update() {
        this.life -= 0.006;
        return this.life > 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.34;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for (let i = 0; i < 10; i += 1) {
            const angle = (Math.PI * 2 * i) / 10;
            const radius = this.radius * (i % 2 === 0 ? 1 : 0.46);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

function loadSettings() {
    try {
        const saved = JSON.parse(localStorage.getItem('smoothieSlicerSettings') || '{}');
        return {
            ...DEFAULT_SETTINGS,
            ...saved,
            language: saved.language === 'ja' ? 'ja' : 'en',
        };
    } catch (error) {
        return { ...DEFAULT_SETTINGS };
    }
}

function saveSettings() {
    try {
        localStorage.setItem('smoothieSlicerSettings', JSON.stringify(settings));
    } catch (error) {
        // Local storage can fail in private browser contexts; the game still runs.
    }
}

function t(key, vars = {}) {
    const pack = TEXT[settings.language] || TEXT.en;
    const template = pack[key] || TEXT.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

function ingredientName(id) {
    const pack = TEXT[settings.language] || TEXT.en;
    return pack.ingredients[id] || TEXT.en.ingredients[id] || id;
}

function recipeName(recipe) {
    const pack = TEXT[settings.language] || TEXT.en;
    return pack.recipes[recipe.id] || TEXT.en.recipes[recipe.id] || recipe.id;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function applyTranslations() {
    document.documentElement.lang = settings.language === 'ja' ? 'ja' : 'en';
    document.title = t('documentTitle');

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
        element.setAttribute('aria-label', t(element.dataset.i18nAria));
    });

    ui.settingsToggle.title = t('settingsTitle');
    ui.settingsToggle.setAttribute('aria-label', t('settingsTitle'));
    ui.settingsClose.title = t('close');
    ui.settingsClose.setAttribute('aria-label', t('close'));
    ui.howToClose.title = t('close');
    ui.howToClose.setAttribute('aria-label', t('close'));
    ui.lives.setAttribute('aria-label', t('lives'));

    updateLanguageButtons();
    updateRecipeUI();
    updateResultUI();
}

function updateLanguageButtons() {
    document.querySelectorAll('.language-choice').forEach((button) => {
        button.classList.toggle('active', button.dataset.lang === settings.language);
    });
}

function updateSettingsUI() {
    ui.sfxSlider.value = Math.round(settings.sfxVolume * 100);
    ui.bgmSlider.value = Math.round(settings.bgmVolume * 100);
    ui.noiseSlider.value = Math.round(settings.noiseVolume * 100);
    ui.sfxOutput.textContent = `${ui.sfxSlider.value}%`;
    ui.bgmOutput.textContent = `${ui.bgmSlider.value}%`;
    ui.noiseOutput.textContent = `${ui.noiseSlider.value}%`;
    updateLanguageButtons();
}

function initGame(mode) {
    audio.ensure();
    state.mode = mode;
    state.lastMode = mode;
    state.score = 0;
    state.lives = CONFIG.MAX_LIVES;
    state.activeIngredients = [];
    state.particles = [];
    state.splats = [];
    state.trail = [];
    state.lastSpawn = 0;
    state.spawnRate = CONFIG.BASE_SPAWN_RATE;
    state.isPointerDown = false;
    state.isPaused = false;
    state.result = null;

    ui.startMenu.classList.add('hidden');
    ui.gameOverScreen.classList.add('hidden');
    ui.hud.classList.remove('hidden');

    if (mode === 'smoothie') {
        state.currentRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
        state.recipeProgress = {};
        state.currentRecipe.ingredients.forEach((ingredient) => {
            state.recipeProgress[ingredient] = false;
        });
        ui.recipeCard.classList.remove('hidden');
        updateRecipeUI();
    } else {
        state.currentRecipe = null;
        state.recipeProgress = {};
        ui.recipeCard.classList.add('hidden');
    }

    updateScoreUI();
    updateLivesUI();
    window.requestAnimationFrame(gameLoop);
}

function showMainMenu() {
    state.mode = 'menu';
    state.isPaused = false;
    state.activeIngredients = [];
    state.trail = [];
    ui.gameOverScreen.classList.add('hidden');
    ui.hud.classList.add('hidden');
    ui.startMenu.classList.remove('hidden');
}

function updateScoreUI() {
    ui.score.textContent = state.score;
}

function updateLivesUI() {
    ui.lives.textContent = String.fromCodePoint(0x2665).repeat(Math.max(0, state.lives));
}

function updateLives(delta) {
    if (state.mode === 'menu') return;
    state.lives += delta;
    updateLivesUI();
    if (state.lives <= 0) {
        endGame('loss');
    }
}

function updateRecipeUI() {
    if (!state.currentRecipe || !ui.recipeName) return;

    ui.recipeName.textContent = recipeName(state.currentRecipe);
    ui.ingredientList.innerHTML = '';
    state.currentRecipe.ingredients.forEach((ingredientId) => {
        const ingredient = INGREDIENTS.find((item) => item.id === ingredientId);
        const item = document.createElement('li');
        item.className = `ingredient-item ${state.recipeProgress[ingredientId] ? 'checked' : ''}`;

        const icon = document.createElement('span');
        icon.className = 'ingredient-icon';
        icon.textContent = ingredient.icon;

        const name = document.createElement('span');
        name.textContent = ingredientName(ingredientId);

        item.append(icon, name);
        ui.ingredientList.appendChild(item);
    });
}

function checkWin() {
    const allCollected = Object.values(state.recipeProgress).every(Boolean);
    if (!allCollected) return;

    window.setTimeout(() => {
        if (state.mode === 'smoothie') {
            endGame('win');
        }
    }, 420);
}

function endGame(type) {
    if (state.mode === 'menu') return;

    if (type === 'win') {
        audio.playWin();
    }

    state.mode = 'menu';
    state.isPaused = false;
    state.isPointerDown = false;
    state.result = {
        type,
        recipe: state.currentRecipe,
        score: state.score,
    };

    ui.hud.classList.add('hidden');
    ui.gameOverScreen.classList.remove('hidden');
    updateResultUI();
}

function updateResultUI() {
    if (!state.result) return;

    const isWin = state.result.type === 'win';
    const titleKey = isWin ? 'resultPerfect' : 'resultGameOver';
    const descKey = isWin ? 'resultWinTemplate' : 'resultLives';
    const recipe = state.result.recipe ? recipeName(state.result.recipe) : '';

    ui.resultTitle.textContent = t(titleKey);
    ui.resultDesc.textContent = t(descKey, { recipe });
    ui.finalScore.textContent = state.result.score;
}

function createParticles(x, y, color, icon) {
    for (let i = 0; i < 18; i += 1) {
        state.particles.push(new Particle(x, y, color, icon));
    }
}

function createSplat(x, y, color) {
    state.splats.push(new Splat(x, y, color));
}

function chooseIngredient() {
    if (state.mode === 'smoothie' && state.currentRecipe && Math.random() < 0.56) {
        const incomplete = state.currentRecipe.ingredients.filter((id) => !state.recipeProgress[id]);
        const pool = incomplete.length ? incomplete : state.currentRecipe.ingredients;
        const recipeIngredient = pool[Math.floor(Math.random() * pool.length)];
        return INGREDIENTS.find((ingredient) => ingredient.id === recipeIngredient);
    }

    return INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)];
}

function spawnIngredient() {
    const now = Date.now();
    if (now - state.lastSpawn <= state.spawnRate) return;

    state.activeIngredients.push(new Projectile(chooseIngredient()));
    state.lastSpawn = now;
    state.spawnRate = Math.max(CONFIG.MIN_SPAWN_RATE, state.spawnRate * 0.996);
}

function drawGameBackdrop() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#08184e');
    gradient.addColorStop(0.42, '#5f1ed7');
    gradient.addColorStop(0.72, '#ff1778');
    gradient.addColorStop(1, '#ff8d13');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = '#fff8df';
    ctx.lineWidth = 2;
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.82;
    for (let i = 0; i < 26; i += 1) {
        const angle = (-Math.PI * 0.88) + (i / 25) * Math.PI * 1.76;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX + Math.cos(angle) * canvas.width, originY + Math.sin(angle) * canvas.height);
        ctx.stroke();
    }
    ctx.restore();
}

function gameLoop() {
    if (state.mode === 'menu') return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGameBackdrop();

    state.splats = state.splats.filter((splat) => {
        const alive = state.isPaused ? true : splat.update();
        splat.draw();
        return alive;
    });

    state.particles = state.particles.filter((particle) => {
        const alive = state.isPaused ? true : particle.update();
        particle.draw();
        return alive;
    });

    if (!state.isPaused) {
        spawnIngredient();
    }

    state.activeIngredients = state.activeIngredients.filter((ingredient) => {
        const alive = state.isPaused ? true : ingredient.update();
        if (!alive) return false;

        if (!state.isPaused && state.isPointerDown && !ingredient.isSliced) {
            const distance = Math.hypot(state.pointerX - ingredient.x, state.pointerY - ingredient.y);
            if (distance < ingredient.radius) {
                ingredient.slice();
            }
        }

        ingredient.draw();
        return !ingredient.isSliced;
    });

    drawTrail();
    window.requestAnimationFrame(gameLoop);
}

function drawTrail() {
    if (state.trail.length < 2) return;

    const head = state.trail[state.trail.length - 1];
    const tail = state.trail[0];
    const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
    gradient.addColorStop(0, 'rgba(0, 201, 255, 0.05)');
    gradient.addColorStop(0.42, '#ffffff');
    gradient.addColorStop(1, '#ffe436');

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 18;
    ctx.shadowColor = '#ffffff';
    ctx.moveTo(tail.x, tail.y);
    for (let i = 1; i < state.trail.length; i += 1) {
        ctx.lineTo(state.trail[i].x, state.trail[i].y);
    }
    ctx.stroke();
    ctx.restore();
}

function updatePointerPos(event) {
    const rect = canvas.getBoundingClientRect();
    state.pointerX = event.clientX - rect.left;
    state.pointerY = event.clientY - rect.top;
}

function openSettings() {
    audio.ensure();
    state.settingsWasPaused = state.isPaused;
    if (state.mode !== 'menu') {
        state.isPaused = true;
        state.isPointerDown = false;
        state.trail = [];
    }
    updateSettingsUI();
    ui.settingsPanel.classList.remove('hidden');
}

function closeSettings() {
    ui.settingsPanel.classList.add('hidden');
    if (state.mode !== 'menu') {
        state.isPaused = state.settingsWasPaused;
    }
}

function openHowTo() {
    ui.howToPanel.classList.remove('hidden');
}

function closeHowTo() {
    ui.howToPanel.classList.add('hidden');
}

function wireEvents() {
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', () => audio.ensure(), { once: true });

    canvas.addEventListener('pointerdown', (event) => {
        if (state.mode === 'menu' || state.isPaused) return;
        state.isPointerDown = true;
        updatePointerPos(event);
        state.trail = [{ x: state.pointerX, y: state.pointerY }];
        canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener('pointermove', (event) => {
        if (!state.isPointerDown || state.mode === 'menu' || state.isPaused) return;
        updatePointerPos(event);
        state.trail.push({ x: state.pointerX, y: state.pointerY });
        if (state.trail.length > CONFIG.TRAIL_LENGTH) {
            state.trail.shift();
        }
    });

    ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => {
        canvas.addEventListener(eventName, () => {
            state.isPointerDown = false;
            state.trail = [];
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target.closest('button')) {
            audio.playButton();
        }
    });

    document.getElementById('start-smoothie').addEventListener('click', () => initGame('smoothie'));
    document.getElementById('start-free').addEventListener('click', () => initGame('free'));
    document.getElementById('how-to-btn').addEventListener('click', openHowTo);
    document.getElementById('menu-options-btn').addEventListener('click', openSettings);
    document.getElementById('retry-btn').addEventListener('click', () => initGame(state.lastMode));
    document.getElementById('menu-btn').addEventListener('click', showMainMenu);
    ui.settingsToggle.addEventListener('click', openSettings);
    ui.settingsClose.addEventListener('click', closeSettings);
    ui.howToClose.addEventListener('click', closeHowTo);

    ui.settingsPanel.addEventListener('click', (event) => {
        if (event.target === ui.settingsPanel) closeSettings();
    });

    ui.howToPanel.addEventListener('click', (event) => {
        if (event.target === ui.howToPanel) closeHowTo();
    });

    document.querySelectorAll('.language-choice').forEach((button) => {
        button.addEventListener('click', () => {
            settings.language = button.dataset.lang === 'ja' ? 'ja' : 'en';
            saveSettings();
            applyTranslations();
        });
    });

    [
        [ui.sfxSlider, ui.sfxOutput, 'sfxVolume'],
        [ui.bgmSlider, ui.bgmOutput, 'bgmVolume'],
        [ui.noiseSlider, ui.noiseOutput, 'noiseVolume'],
    ].forEach(([slider, output, key]) => {
        slider.addEventListener('input', () => {
            settings[key] = Number(slider.value) / 100;
            output.textContent = `${slider.value}%`;
            saveSettings();
            audio.ensure();
            audio.applySettings();
        });
    });

    window.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (!ui.settingsPanel.classList.contains('hidden')) closeSettings();
        if (!ui.howToPanel.classList.contains('hidden')) closeHowTo();
    });
}

resize();
wireEvents();
applyTranslations();
updateSettingsUI();
ui.startMenu.classList.remove('hidden');
window.setTimeout(() => ui.introScreen.classList.add('hidden'), 4200);
