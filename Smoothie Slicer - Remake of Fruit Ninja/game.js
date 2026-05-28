/**
 * Smoothie Slicer - Core Game Engine
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startMenu = document.getElementById('start-menu');
const gameOverScreen = document.getElementById('game-over');
const hud = document.getElementById('hud');
const recipeCard = document.getElementById('recipe-card');
const ingredientListUI = document.getElementById('ingredient-list');
const scoreUI = document.getElementById('score');
const livesUI = document.getElementById('lives-container');

// Configuration
const CONFIG = {
    GRAVITY: 0.15,
    SPAWN_RATE: 1500, // ms
    MAX_LIVES: 3,
    SLICE_THRESHOLD: 10,
    TRAIL_LENGTH: 15,
};

// Ingredient Data
const INGREDIENTS = [
    { name: 'Strawberry', emoji: '🍓', color: '#ff4757', type: 'fruit' },
    { name: 'Watermelon', emoji: '🍉', color: '#ff6b81', type: 'fruit' },
    { name: 'Mango', emoji: '🥭', color: '#ffa502', type: 'fruit' },
    { name: 'Banana', emoji: '🍌', color: '#eccc68', type: 'fruit' },
    { name: 'Blueberry', emoji: '🫐', color: '#5352ed', type: 'fruit' },
    { name: 'Kiwi', emoji: '🥝', color: '#2ed573', type: 'fruit' },
    { name: 'Pineapple', emoji: '🍍', color: '#f1c40f', type: 'fruit' },
    { name: 'Peach', emoji: '🍑', color: '#ff7f50', type: 'fruit' },
    { name: 'Orange', emoji: '🍊', color: '#ff9f43', type: 'fruit' },
    { name: 'Spinach', emoji: '🥬', color: '#20bf6b', type: 'veg' },
    { name: 'Carrot', emoji: '🥕', color: '#e67e22', type: 'veg' },
    { name: 'Beetroot', emoji: '🫀', color: '#b33939', type: 'veg' },
    { name: 'Cucumber', emoji: '🥒', color: '#26de81', type: 'veg' },
    { name: 'Avocado', emoji: '🥑', color: '#27ae60', type: 'veg' },
    { name: 'Tomato', emoji: '🍅', color: '#eb4d4b', type: 'veg' },
];

const RECIPES = [
    { name: 'Tropical Blast', ingredients: ['Mango', 'Pineapple', 'Banana'] },
    { name: 'Green Machine', ingredients: ['Spinach', 'Cucumber', 'Kiwi'] },
    { name: 'Berry Boost', ingredients: ['Strawberry', 'Blueberry', 'Banana'] },
    { name: 'Sunrise Detox', ingredients: ['Carrot', 'Orange', 'Beetroot'] }
];

// Game State
let state = {
    mode: 'menu', // 'smoothie', 'free', 'menu'
    score: 0,
    lives: CONFIG.MAX_LIVES,
    activeIngredients: [],
    particles: [],
    splats: [],
    trail: [],
    currentRecipe: null,
    recipeProgress: {},
    lastSpawn: 0,
    isMouseDown: false,
    mouseX: 0,
    mouseY: 0,
    prevMouseX: 0,
    prevMouseY: 0,
};

// Resize Canvas
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

/**
 * Classes
 */

class Projectile {
    constructor(data) {
        this.data = data;
        this.x = Math.random() * (canvas.width - 100) + 50;
        this.y = canvas.height + 50;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = -(Math.random() * 5 + 12);
        this.radius = 40;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
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
        return this.y < canvas.height + 200;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.radius * 2}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.data.emoji, 0, 0);
        ctx.restore();
    }

    onMiss() {
        if (state.mode === 'smoothie') {
            const isNeeded = state.currentRecipe.ingredients.includes(this.data.name);
            const isCompleted = state.recipeProgress[this.data.name];
            if (isNeeded && !isCompleted) {
                updateLives(-1);
            }
        }
    }

    slice() {
        this.isSliced = true;
        createSplat(this.x, this.y, this.data.color);
        createParticles(this.x, this.y, this.data.color);
        
        if (state.mode === 'smoothie') {
            const isNeeded = state.currentRecipe.ingredients.includes(this.data.name);
            if (isNeeded) {
                state.recipeProgress[this.data.name] = true;
                state.score += 100;
                updateRecipeUI();
                checkWin();
            } else {
                state.score -= 50;
                updateLives(-1);
            }
        } else {
            state.score += 50;
        }
        
        updateScoreUI();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.radius = Math.random() * 4 + 2;
        this.color = color;
        this.life = 1.0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2;
        this.life -= 0.02;
        return this.life > 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Splat {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.life = 1.0;
        this.radius = Math.random() * 30 + 40;
    }

    update() {
        this.life -= 0.005;
        return this.life > 0;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.3;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

/**
 * Game Logic
 */

function initGame(mode) {
    state.mode = mode;
    state.score = 0;
    state.lives = CONFIG.MAX_LIVES;
    state.activeIngredients = [];
    state.particles = [];
    state.splats = [];
    state.trail = [];
    
    startMenu.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    hud.classList.remove('hidden');

    if (mode === 'smoothie') {
        state.currentRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
        state.recipeProgress = {};
        state.currentRecipe.ingredients.forEach(ing => state.recipeProgress[ing] = false);
        recipeCard.classList.remove('hidden');
        updateRecipeUI();
    } else {
        recipeCard.classList.add('hidden');
    }

    updateScoreUI();
    updateLivesUI();
    
    requestAnimationFrame(gameLoop);
}

function updateScoreUI() {
    scoreUI.textContent = state.score;
}

function updateLivesUI() {
    livesUI.textContent = '❤️'.repeat(Math.max(0, state.lives));
}

function updateLives(delta) {
    state.lives += delta;
    updateLivesUI();
    if (state.lives <= 0) {
        endGame('Game Over', 'You ran out of lives!');
    }
}

function updateRecipeUI() {
    document.getElementById('recipe-name').textContent = state.currentRecipe.name;
    ingredientListUI.innerHTML = '';
    state.currentRecipe.ingredients.forEach(ingName => {
        const ingData = INGREDIENTS.find(i => i.name === ingName);
        const li = document.createElement('li');
        li.className = `ingredient-item ${state.recipeProgress[ingName] ? 'checked' : ''}`;
        li.innerHTML = `<span>${ingData.emoji}</span> <span>${ingName}</span>`;
        ingredientListUI.appendChild(li);
    });
}

function checkWin() {
    const allCollected = Object.values(state.recipeProgress).every(v => v === true);
    if (allCollected) {
        setTimeout(() => {
            endGame('Perfect Blend!', `You've mastered the ${state.currentRecipe.name}.`);
        }, 500);
    }
}

function endGame(title, desc) {
    state.mode = 'menu';
    gameOverScreen.classList.remove('hidden');
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-desc').textContent = desc;
    document.getElementById('final-score').textContent = state.score;
}

function createParticles(x, y, color) {
    for (let i = 0; i < 15; i++) {
        state.particles.push(new Particle(x, y, color));
    }
}

function createSplat(x, y, color) {
    state.splats.push(new Splat(x, y, color));
}

function spawnIngredient() {
    const now = Date.now();
    if (now - state.lastSpawn > CONFIG.SPAWN_RATE) {
        const randIng = INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)];
        state.activeIngredients.push(new Projectile(randIng));
        state.lastSpawn = now;
        
        // Increase difficulty slightly over time
        CONFIG.SPAWN_RATE = Math.max(800, CONFIG.SPAWN_RATE * 0.995);
    }
}

/**
 * Main Loop
 */

function gameLoop() {
    if (state.mode === 'menu') return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & Draw Splats (Background)
    state.splats = state.splats.filter(splat => {
        const alive = splat.update();
        splat.draw();
        return alive;
    });

    // Update & Draw Particles
    state.particles = state.particles.filter(p => {
        const alive = p.update();
        p.draw();
        return alive;
    });

    // Spawn New Ingredients
    spawnIngredient();

    // Update & Draw Ingredients
    state.activeIngredients = state.activeIngredients.filter(ing => {
        const alive = ing.update();
        if (alive) {
            // Collision Detection
            if (state.isMouseDown && !ing.isSliced) {
                const dist = Math.hypot(state.mouseX - ing.x, state.mouseY - ing.y);
                if (dist < ing.radius) {
                    ing.slice();
                }
            }
            ing.draw();
        }
        return alive && !ing.isSliced;
    });

    // Draw Trail
    drawTrail();

    requestAnimationFrame(gameLoop);
}

function drawTrail() {
    if (state.trail.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'white';

    ctx.moveTo(state.trail[0].x, state.trail[0].y);
    for (let i = 1; i < state.trail.length; i++) {
        ctx.lineTo(state.trail[i].x, state.trail[i].y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
}

/**
 * Event Listeners
 */

canvas.addEventListener('mousedown', (e) => {
    state.isMouseDown = true;
    updateMousePos(e);
});

window.addEventListener('mouseup', () => {
    state.isMouseDown = false;
    state.trail = [];
});

canvas.addEventListener('mousemove', (e) => {
    updateMousePos(e);
    if (state.isMouseDown) {
        state.trail.push({ x: state.mouseX, y: state.mouseY });
        if (state.trail.length > CONFIG.TRAIL_LENGTH) {
            state.trail.shift();
        }
    }
});

function updateMousePos(e) {
    state.prevMouseX = state.mouseX;
    state.prevMouseY = state.mouseY;
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
}

document.getElementById('start-smoothie').addEventListener('click', () => initGame('smoothie'));
document.getElementById('start-free').addEventListener('click', () => initGame('free'));
document.getElementById('restart-btn').addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    startMenu.classList.remove('hidden');
    hud.classList.add('hidden');
});

// Initial Menu setup
startMenu.classList.remove('hidden');
