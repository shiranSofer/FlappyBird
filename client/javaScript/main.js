const sock = io();
let environment, ctx, canvas, playerName, player, numberOfPlayers, character = '', fireSound, deadSound;


writeEvent('Hi I\'m new');
sock.on('message', writeEvent);

let form = document.getElementById('playerForm');
form.addEventListener('submit', (e) => {
    playerName = document.getElementById('inputText');
    let value = playerName.value;
    sock.emit('message', value);
    playerName.style.display = 'none';
    e.preventDefault();
});


sock.on('number of players', (num) => numberOfPlayers = num);
const characterDiv = document.getElementById('characterDiv');
const ready = document.getElementById('ready');
ready.addEventListener('click', function () {
    console.log("ready");
    ready.style.display = 'none';
    characterDiv.style.display = 'none';

    createGameBoard();

    let playerData = {
        name: player.name,
        id: player.id,
        x: player.x,
        y: player.y,
        ctx: player.ctx,
        environment: player.environment
    };
    sock.emit('new player ready', playerData);
});

sock.on('start game', startGame);
sock.on('winner', writeWinner);

function createGameBoard() {
    canvas = initCanvas();
    ctx = canvas.getContext('2d');

    /*--background--*/
    const bgImage = new Image();
    bgImage.src = 'images/caveBG.jpg';
    environment = new Environment(ctx, canvas, bgImage);
    fireSound = new sound('Fire_Burning.mp3');
    deadSound = new sound('winner.mp3');
    player = new Player(playerName.value, numberOfPlayers, 100, canvas.height / 2, ctx, environment, character);
}

function startGame() {
    const obstacles = [];
    /*--Obstacle's Creation--*/
    setInterval(function () {
        const safeZone = 200;
        let bottomObstacleHeight = Math.floor(Math.random() * 250) + 100;
        let bottomObstacle = new Obstacle(canvas.width, canvas.height - bottomObstacleHeight, bottomObstacleHeight, 2, ctx, "bottom");
        let topObstacle = new Obstacle(canvas.width, 0, canvas.height - bottomObstacleHeight - safeZone, 2, ctx, "top");

        obstacles.push(bottomObstacle, topObstacle);
    }, 2000);

    gameLoop();

    function gameLoop() {
        player.update(obstacles);
        fireSound.play();

        let playerData = {
            name: player.name,
            id: player.id,
            x: player.x,
            y: player.y,
            ctx: player.ctx,
            environment: player.environment
        };
        sock.emit('update player', playerData);

        if (player.dead) {
            fireSound.stop();
            sock.emit('player dead', player);
            drawGameOver();
            return;
        } else {
            environment.update();
            obstacles.forEach(function (obstacle) {
                obstacle.update();
            });
            environment.render();
            obstacles.forEach(function (obstacle) {
                obstacle.render();
            });

            player.render();
        }
        window.requestAnimationFrame(gameLoop);
    }
} /*--End startGame--*/

sock.on('game over', () => console.log('all dead'));


function initCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 500;
    canvas.style.border = "8px solid #ff8911";
    return canvas;
}

function drawGameOver() {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "50px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2 - 50 / 2, 230);
}

function writeEvent(text) {
    const eventsList = document.getElementById('events');
    let event = document.createElement('li');
    event.innerHTML = text;
    eventsList.appendChild(event);
}

function writeWinner(text) {
    const eventsList = document.getElementById('events');
    let event = document.createElement('h2');
    event.innerHTML = text;
    eventsList.appendChild(event);
    deadSound.play();
}

function dragonite() {
    character = 'dragonite';
    console.log('dragonite!')
}
function hoppip() {
    character = 'hoppip';
}
function bat() {
    character = 'bat';
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
    };

    this.stop = function(){
        this.sound.pause();
    }
}
