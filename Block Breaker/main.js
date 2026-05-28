/**
 * CHAIN BREAKER - Main Game Logic
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const scoreDisplay = document.getElementById('scoreDisplay');
const levelDisplay = document.getElementById('levelDisplay');
const livesDisplay = document.getElementById('livesDisplay');
const finalScore = document.getElementById('finalScore');
const winScore = document.getElementById('winScore');

// Overlays
const startOverlay = document.getElementById('overlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const winOverlay = document.getElementById('winOverlay');

// Buttons
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');

// Game Constants
const PADDLE_WIDTH = 120;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 8;
const BLOCK_ROWS = 6;
const BLOCK_COLS = 10;
const BLOCK_PADDING = 10;
const BLOCK_OFFSET_TOP = 80;
const BLOCK_OFFSET_LEFT = 35;
const BLOCK_HEIGHT = 25;

// Block Types & Colors
const TYPES = {
    NORMAL: 'normal',
    HARD: 'hard',
    BOMB: 'bomb',
    LASER: 'laser',
    MULTIBALL: 'multiball',
    MUTATION: 'mutation'
};

const COLORS = {
    [TYPES.NORMAL]: '#FFFFFF',
    [TYPES.HARD]: '#8E8E8E',
    [TYPES.BOMB]: '#FF3E3E',
    [TYPES.LASER]: '#FBFF00',
    [TYPES.MULTIBALL]: '#3EFF81',
    [TYPES.MUTATION]: '#FF3EFB',
    PADDLE: '#00F2FF',
    BALL: '#FFFFFF'
};

// Game State
let state = {
    score: 0,
    level: 1,
    lives: 3,
    running: false,
    paused: false,
    balls: [],
    paddle: null,
    blocks: [],
    particles: [],
    keys: {},
    mouseX: 0
};

// --- CLASSES ---

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.02;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
    }

    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

class Ball {
    constructor(x, y, vx, vy, isMini = false) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = isMini ? BALL_RADIUS * 0.7 : BALL_RADIUS;
        this.isMini = isMini;
        this.trail = [];
    }

    update() {
        // Trail
        this.trail.unshift({x: this.x, y: this.y});
        if (this.trail.length > 10) this.trail.pop();

        this.x += this.vx;
        this.y += this.vy;

        // Wall collisions
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx;
            createExplosion(this.x, this.y, COLORS.BALL, 5);
        }
        if (this.y - this.radius < 0) {
            this.vy = -this.vy;
            createExplosion(this.x, this.y, COLORS.BALL, 5);
        }
    }

    draw() {
        // Draw trail
        this.trail.forEach((p, i) => {
            ctx.globalAlpha = (1 - i / this.trail.length) * 0.3;
            ctx.fillStyle = COLORS.BALL;
            ctx.beginPath();
            ctx.arc(p.x, p.y, this.radius * (1 - i/10), 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1.0;

        // Draw ball
        ctx.fillStyle = COLORS.BALL;
        ctx.shadowBlur = 10;
        ctx.shadowColor = COLORS.BALL;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Paddle {
    constructor() {
        this.width = PADDLE_WIDTH;
        this.height = PADDLE_HEIGHT;
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 8;
    }

    update() {
        // Keyboard control
        if (state.keys['ArrowLeft']) this.x -= this.speed;
        if (state.keys['ArrowRight']) this.x += this.speed;

        // Mouse control (if mouse moved recently)
        if (state.mouseX > 0) {
            const targetX = state.mouseX - this.width / 2;
            this.x += (targetX - this.x) * 0.2;
        }

        // Bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    }

    draw() {
        ctx.fillStyle = COLORS.PADDLE;
        ctx.shadowBlur = 15;
        ctx.shadowColor = COLORS.PADDLE;
        
        // Glassy paddle look
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        ctx.fill();
        
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(this.x + 5, this.y + 2, this.width - 10, 3);

        ctx.shadowBlur = 0;
    }
}

class Block {
    constructor(x, y, type, row, col) {
        this.x = x;
        this.y = y;
        this.width = (canvas.width - BLOCK_OFFSET_LEFT * 2 - (BLOCK_COLS - 1) * BLOCK_PADDING) / BLOCK_COLS;
        this.height = BLOCK_HEIGHT;
        this.type = type;
        this.row = row;
        this.col = col;
        this.hits = type === TYPES.HARD ? 2 : 1;
        this.alive = true;
    }

    draw() {
        if (!this.alive) return;

        ctx.fillStyle = COLORS[this.type];
        ctx.shadowBlur = this.type !== TYPES.NORMAL ? 10 : 0;
        ctx.shadowColor = COLORS[this.type];

        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 4);
        ctx.fill();

        // Bevel / Inner glow
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (this.type === TYPES.HARD && this.hits === 2) {
             ctx.fillStyle = 'rgba(0,0,0,0.3)';
             ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
        }

        ctx.shadowBlur = 0;
    }

    hit() {
        this.hits--;
        createExplosion(this.x + this.width / 2, this.y + this.height / 2, COLORS[this.type], 10);
        
        if (this.hits <= 0) {
            this.alive = false;
            state.score += 10;
            triggerChainReaction(this);
            return true;
        }
        return false;
    }
}

// --- CORE FUNCTIONS ---

function init() {
    resize();
    resetGame();
    requestAnimationFrame(gameLoop);
}

function resize() {
    canvas.width = 800;
    canvas.height = 600;
}

function resetGame() {
    state.score = 0;
    state.level = 1;
    state.lives = 3;
    state.particles = [];
    setupLevel();
    updateHUD();
}

function setupLevel() {
    state.balls = [new Ball(canvas.width / 2, canvas.height - 50, 4, -4)];
    state.paddle = new Paddle();
    state.blocks = [];

    const blockWidth = (canvas.width - BLOCK_OFFSET_LEFT * 2 - (BLOCK_COLS - 1) * BLOCK_PADDING) / BLOCK_COLS;

    for (let r = 0; r < BLOCK_ROWS; r++) {
        for (let c = 0; c < BLOCK_COLS; c++) {
            let type = TYPES.NORMAL;
            const rand = Math.random();

            if (rand > 0.92) type = TYPES.BOMB;
            else if (rand > 0.85) type = TYPES.LASER;
            else if (rand > 0.78) type = TYPES.MULTIBALL;
            else if (rand > 0.71) type = TYPES.MUTATION;
            else if (rand > 0.60) type = TYPES.HARD;

            const x = c * (blockWidth + BLOCK_PADDING) + BLOCK_OFFSET_LEFT;
            const y = r * (BLOCK_HEIGHT + BLOCK_PADDING) + BLOCK_OFFSET_TOP;
            state.blocks.push(new Block(x, y, type, r, c));
        }
    }
}

function createExplosion(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        state.particles.push(new Particle(x, y, color));
    }
}

function triggerChainReaction(block) {
    const { row, col, type } = block;

    switch (type) {
        case TYPES.BOMB:
            // Explode neighbors
            getNeighbors(row, col).forEach(b => {
                if (b.alive) b.hit();
            });
            break;

        case TYPES.LASER:
            // Clear row or column (random)
            if (Math.random() > 0.5) {
                // Row
                state.blocks.filter(b => b.row === row && b.alive).forEach(b => b.hit());
            } else {
                // Col
                state.blocks.filter(b => b.col === col && b.alive).forEach(b => b.hit());
            }
            break;

        case TYPES.MULTIBALL:
            // Spawn 2 extra balls
            for (let i = 0; i < 2; i++) {
                state.balls.push(new Ball(
                    block.x + block.width / 2, 
                    block.y + block.height / 2, 
                    (Math.random() - 0.5) * 8, 
                    -4, 
                    true
                ));
            }
            break;

        case TYPES.MUTATION:
            // Change neighbors to random special types
            getNeighbors(row, col).forEach(b => {
                if (b.alive && b.type === TYPES.NORMAL) {
                    const specials = [TYPES.BOMB, TYPES.LASER, TYPES.MULTIBALL];
                    b.type = specials[Math.floor(Math.random() * specials.length)];
                }
            });
            break;
    }
}

function getNeighbors(r, c) {
    return state.blocks.filter(b => 
        Math.abs(b.row - r) <= 1 && Math.abs(b.col - c) <= 1 && !(b.row === r && b.col === c)
    );
}

function updateHUD() {
    scoreDisplay.innerText = state.score;
    levelDisplay.innerText = state.level;
    livesDisplay.innerText = '♥ '.repeat(state.lives);
}

function gameLoop() {
    if (state.running && !state.paused) {
        update();
    }
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    state.paddle.update();

    // Update Particles
    state.particles.forEach((p, i) => {
        p.update();
        if (p.life <= 0) state.particles.splice(i, 1);
    });

    // Update Balls
    state.balls.forEach((ball, bIdx) => {
        ball.update();

        // Paddle collision
        if (ball.y + ball.radius > state.paddle.y && 
            ball.y - ball.radius < state.paddle.y + state.paddle.height &&
            ball.x > state.paddle.x && ball.x < state.paddle.x + state.paddle.width) {
            
            ball.vy = -Math.abs(ball.vy);
            // Dynamic bounce angle
            const deltaX = ball.x - (state.paddle.x + state.paddle.width / 2);
            ball.vx = deltaX * 0.15;
            
            createExplosion(ball.x, ball.y, COLORS.PADDLE, 8);
        }

        // Block collision
        state.blocks.forEach(block => {
            if (!block.alive) return;

            if (ball.x + ball.radius > block.x && 
                ball.x - ball.radius < block.x + block.width &&
                ball.y + ball.radius > block.y && 
                ball.y - ball.radius < block.y + block.height) {
                
                // Determine collision side
                const overlapLeft = (ball.x + ball.radius) - block.x;
                const overlapRight = (block.x + block.width) - (ball.x - ball.radius);
                const overlapTop = (ball.y + ball.radius) - block.y;
                const overlapBottom = (block.y + block.height) - (ball.y - ball.radius);

                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

                if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                    ball.vx = -ball.vx;
                } else {
                    ball.vy = -ball.vy;
                }

                block.hit();
                updateHUD();
            }
        });

        // Ball out of bounds
        if (ball.y > canvas.height) {
            state.balls.splice(bIdx, 1);
            if (state.balls.length === 0) {
                state.lives--;
                updateHUD();
                if (state.lives <= 0) {
                    gameOver();
                } else {
                    state.balls.push(new Ball(canvas.width / 2, canvas.height - 50, 4, -4));
                }
            }
        }
    });

    // Win condition
    if (state.blocks.every(b => !b.alive)) {
        win();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for(let i=0; i<canvas.height; i+=50) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    state.blocks.forEach(b => b.draw());
    state.paddle.draw();
    state.balls.forEach(b => b.draw());
    state.particles.forEach(p => p.draw());
}

// --- UI HANDLERS ---

function startGame() {
    state.running = true;
    startOverlay.classList.remove('active');
    resetGame();
}

function gameOver() {
    state.running = false;
    finalScore.innerText = state.score;
    gameOverOverlay.classList.add('active');
}

function win() {
    state.running = false;
    winScore.innerText = state.score;
    winOverlay.classList.add('active');
}

function nextLevel() {
    state.level++;
    winOverlay.classList.remove('active');
    setupLevel();
    state.running = true;
}

// --- EVENT LISTENERS ---

window.addEventListener('keydown', e => state.keys[e.key] = true);
window.addEventListener('keyup', e => state.keys[e.key] = false);

window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    state.mouseX = e.clientX - rect.left;
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', () => {
    gameOverOverlay.classList.remove('active');
    startGame();
});
nextLevelBtn.addEventListener('click', nextLevel);

// Initialize
init();
