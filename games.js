// Tic Tac Toe
let board = Array(3).fill(Array(3).fill(null));
let currentPlayer = 'X';

document.getElementById('board').addEventListener('click', function(event) {
    if (event.target.tagName === 'TD' && !event.target.textContent) {
        event.target.textContent = currentPlayer;
        board[event.target.parentNode.rowIndex][event.target.cellIndex] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWinner();
    }
});

document.getElementById('reset').addEventListener('click', function() {
    location.reload();
});

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) ||
            (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i])
        ) {
            alert(currentPlayer + ' wins!');
            return;
        }
    }

    if (!board.includes(null)) {
        alert('It\'s a tie!');
        return;
    }
}

// Flappy Bird
const flappyCanvas = document.getElementById('flappyCanvas');
const flappyContext = flappyCanvas.getContext('2d');
const flappyGravity = 0.9;
const flappyJump = -12;
const flappyWidth = 50;
const flappyHeight = 50;
let flappyX = 10;
let flappyY = 10;
let flappyVelocity = 0;
let flappyScore = 0;
const flappyFlap = new Audio('flap.wav');
const flappyPipes = [];
const flappyGaps = 100;

function drawFlappy() {
    flappyContext.fillStyle = 'blue';
    flappyContext.fillRect(flappyX, flappyY, flappyWidth, flappyHeight);
}

function createFlappyPipes() {
    const flappyPipe = {
        x: 500,
        top: Math.floor(Math.random() * (flappyCanvas.height - 100 - flappyGaps)) + 100,
        bottom: Math.floor(Math.random() * (flappyCanvas.height - 100)) + 100,
    };
    flappyPipes.push(flappyPipe);
}

function drawFlappyPipes() {
    flappyPipes.forEach(function(flappyPipe) {
        flappyContext.fillStyle = 'green';
        flappyContext.fillRect(flappyPipe.x, 0, 50, flappyPipe.top);
        flappyContext.fillRect(flappyPipe.x, flappyPipe.bottom, 50, flappyCanvas.height);
    });
}

function updateFlappy() {
    if (flappyScore === 1000) {
        alert('Congratulations, you got a high score!');
        location.reload();
    }
    flappyY += flappyVelocity;
    flappyVelocity += flappyGravity;
    if (
        flappyX + flappyWidth >= flappyPipes[0].x &&
        flappyX <= flappyPipes[0].x + 50 &&
        (flappyY + flappyHeight >= flappyPipes[0].top || flappyY <= flappyPipes[0].bottom + 10)
    ) {
        flappyVelocity = 0;
        flappyScore++;
        createFlappyPipes();
    }
    if (flappyY + flappyHeight >= flappyCanvas.height - 50) {
        flappyX = 10;
        flappyY = 10;
        flappyVelocity = 0;
        flappyScore = 0;
        flappyPipes.length = 0;
    }
    document.getElementById('flappyScore').textContent = flappyScore;
    document.getElementById('flappyMessage').textContent = ' Flappy Bird';
}

document.getElementById('flappyCanvas').addEventListener('click', function() {
    if (flappyVelocity === 0) {
        flappyVelocity = flappyJump;
        flappyFlap.play();
    }
});

setInterval(updateFlappy, 10);
createFlappyPipes();

// Jumping Dinosaur
const dinosaurCanvas = document.getElementById('dinosaurCanvas');
const dinosaurContext = dinosaurCanvas.getContext('2d');
const dinosaurWidth = 50;
const dinosaurHeight = 50;
const dinosaurGravity = 0.5;
const dinosaurJump = -10;
let dinosaurX = 20;
let dinosaurY = 200;
let dinosaurVelocity = 0;
let dinosaurTimer = 500;
let dinosaurObstacles = [];

function drawDinosaur() {
    dinosaurContext.fillStyle = 'green';
    dinosaurContext.fillRect(dinosaurX, dinosaurY, dinosaurWidth, dinosaurHeight);
}

function createDinosaurObstacle() {
    const dinosaurObstacle = {
        x: 500,
        y: Math.floor(Math.random() * 100) + 100,
        width: 50,
        height: 100,
    };

    dinosaurObstacles.push(dinosaurObstacle);
}

function drawDinosaurObstacles() {
    dinosaurObstacles.forEach(function(dinosaurObstacle) {
        dinosaurContext.fillStyle = 'red';
        dinosaurContext.fillRect(dinosaurObstacle.x, dinosaurObstacle.y, dinosaurObstacle.width, dinosaurObstacle.height);
    });
}

function updateDinosaur() {
    dinosaurY += dinosaurVelocity;
    dinosaurVelocity += dinosaurGravity;
    if (
        dinosaurX + dinosaurWidth >= dinosaurObstacles[0].x &&
        dinosaurX <= dinosaurObstacles[0].x + dinosaurObstacles[0].width &&
        (dinosaurY + dinosaurHeight >= dinosaurObstacles[0].y || dinosaurY <= dinosaurObstacles[0].y - 10)
    ) {
        alert('Game Over');
        location.reload();
    }
    if (dinosaurY + dinosaurHeight >= dinosaurCanvas.height - 50) {
        dinosaurX = 20;
        dinosaurY = 200;
        dinosaurVelocity = 0;
        dinosaurObstacles.length = 0;
    }
    if (dinosaurTimer === 0) {
        createDinosaurObstacle();
        dinosaurTimer = 1000;
    }
    dinosaurTimer--;
    requestAnimationFrame(updateDinosaur);
    dinosaurContext.clearRect(0, 0, dinosaurCanvas.width, dinosaurCanvas.height);
    dinosaurObstacles.forEach(function(dinosaurObstacle) {
        dinosaurObstacle.x--;
    });
    drawDinosaur();
    drawDinosaurObstacles();
}

document.addEventListener('keypress', function(event) {
    if (event.keyCode === 32) {
        if (dinosaurVelocity === 0) {
            dinosaurVelocity = dinosaurJump;
        }
    }
});

requestAnimationFrame(updateDinosaur);

// Social Media
document.getElementById('instagram').addEventListener('click', function() {
    window.open('https://www.instagram.com/', '_blank');
});