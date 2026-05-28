const canvas = document.getElementById('tetris-board');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('next-piece');
const nextCtx = nextCanvas.getContext('2d');

const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const linesElement = document.getElementById('lines');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

// キャンバスのスケール設定
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
nextCtx.scale(BLOCK_SIZE, BLOCK_SIZE);

// テトリミノの色
const COLORS = [
    null,
    '#00ffff', // I - Cyan
    '#0000ff', // J - Blue
    '#ff7f00', // L - Orange
    '#ffff00', // O - Yellow
    '#00ff00', // S - Green
    '#800080', // T - Purple
    '#ff0000'  // Z - Red
];

// テトリミノの形状
const SHAPES = [
    [],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]], // J
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]], // L
    [[4, 4], [4, 4]], // O
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]], // S
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]], // T
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]  // Z
];

let board = [];
let piece = null;
let nextPiece = null;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let score = 0;
let level = 1;
let lines = 0;
let gameRunning = false;
let animationId = null;

// ボードの初期化
function createBoard() {
    board = [];
    for (let r = 0; r < ROWS; r++) {
        board.push(new Array(COLS).fill(0));
    }
}

// ピースの生成
function createPiece() {
    const typeId = Math.floor(Math.random() * 7) + 1;
    return {
        matrix: SHAPES[typeId],
        pos: { x: Math.floor(COLS / 2) - Math.floor(SHAPES[typeId][0].length / 2), y: 0 },
        type: typeId
    };
}

// ボードとピースの描画
function draw() {
    // 背景のクリア
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // グリッドの描画
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 0.05;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            ctx.strokeRect(c, r, 1, 1);
        }
    }

    drawMatrix(board, { x: 0, y: 0 }, ctx);
    if (piece) {
        drawMatrix(piece.matrix, piece.pos, ctx);
    }
}

// 次のピースの描画
function drawNextPiece() {
    nextCtx.fillStyle = 'rgba(0,0,0,0)';
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    if (nextPiece) {
        const offset = {
            x: 2 - nextPiece.matrix[0].length / 2,
            y: 2 - nextPiece.matrix.length / 2
        };
        drawMatrix(nextPiece.matrix, offset, nextCtx);
    }
}

// マトリックスの描画
function drawMatrix(matrix, offset, context) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
                
                // ブロックの立体感
                context.fillStyle = 'rgba(255, 255, 255, 0.3)';
                context.fillRect(x + offset.x, y + offset.y, 1, 0.1);
                context.fillRect(x + offset.x, y + offset.y, 0.1, 1);
                
                context.fillStyle = 'rgba(0, 0, 0, 0.3)';
                context.fillRect(x + offset.x, y + offset.y + 0.9, 1, 0.1);
                context.fillRect(x + offset.x + 0.9, y + offset.y, 0.1, 1);
            }
        });
    });
}

// 衝突判定
function collide(board, piece) {
    const m = piece.matrix;
    const o = piece.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (board[y + o.y] && board[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

// 盤面にピースを固定
function merge(board, piece) {
    piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + piece.pos.y][x + piece.pos.x] = value;
            }
        });
    });
}

// ライン消去判定とスコア計算
function arenaSweep() {
    let rowCount = 0;
    outer: for (let y = ROWS - 1; y >= 0; --y) {
        for (let x = 0; x < COLS; ++x) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }

        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;
        rowCount++;
    }

    if (rowCount > 0) {
        const lineScores = [0, 40, 100, 300, 1200];
        score += lineScores[rowCount] * level;
        lines += rowCount;
        level = Math.floor(lines / 10) + 1;
        dropInterval = 1000 - (level - 1) * 50;
        if (dropInterval < 100) dropInterval = 100;
        
        updateScore();
    }
}

// ピースを下に移動
function pieceDrop() {
    piece.pos.y++;
    if (collide(board, piece)) {
        piece.pos.y--;
        merge(board, piece);
        arenaSweep();
        piece = nextPiece;
        nextPiece = createPiece();
        drawNextPiece();
        
        // ゲームオーバー判定
        if (collide(board, piece)) {
            gameOver();
        }
    }
    dropCounter = 0;
}

// ピースを一気に下に移動（ハードドロップ）
function pieceHardDrop() {
    while (!collide(board, piece)) {
        piece.pos.y++;
    }
    piece.pos.y--;
    merge(board, piece);
    arenaSweep();
    piece = nextPiece;
    nextPiece = createPiece();
    drawNextPiece();
    if (collide(board, piece)) {
        gameOver();
    }
    dropCounter = 0;
}

// ピースを左右に移動
function pieceMove(offset) {
    piece.pos.x += offset;
    if (collide(board, piece)) {
        piece.pos.x -= offset;
    }
}

// 行列の回転
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

// ピースの回転
function pieceRotate(dir) {
    const pos = piece.pos.x;
    let offset = 1;
    rotate(piece.matrix, dir);
    while (collide(board, piece)) {
        piece.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > piece.matrix[0].length) {
            rotate(piece.matrix, -dir);
            piece.pos.x = pos;
            return;
        }
    }
}

// スコア表示の更新
function updateScore() {
    scoreElement.innerText = score;
    levelElement.innerText = level;
    linesElement.innerText = lines;
}

// ゲームオーバー処理
function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove('hidden');
}

// ゲーム開始
function startGame() {
    createBoard();
    score = 0;
    level = 1;
    lines = 0;
    dropInterval = 1000;
    updateScore();
    
    piece = createPiece();
    nextPiece = createPiece();
    drawNextPiece();
    
    gameRunning = true;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    lastTime = 0;
    update();
}

// ゲームループ
function update(time = 0) {
    if (!gameRunning) return;
    
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        pieceDrop();
    }

    draw();
    animationId = requestAnimationFrame(update);
}

// キーボード入力の処理
document.addEventListener('keydown', event => {
    if (!gameRunning) return;
    
    switch(event.keyCode) {
        case 37: // Left
            pieceMove(-1);
            break;
        case 39: // Right
            pieceMove(1);
            break;
        case 40: // Down
            pieceDrop();
            break;
        case 38: // Up (Rotate)
            pieceRotate(1);
            break;
        case 32: // Space (Hard Drop)
            pieceHardDrop();
            break;
    }
});

// ボタンイベント
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// 初回描画
createBoard();
draw();
