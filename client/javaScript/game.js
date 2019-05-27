/*
let socket = io();

let canvas, context, playerName = "", playerImages = loadCharacterImages(), spriteIndex;
let tick = 0;
let jump = false;

document.addEventListener('keydown', (key) => {
    if(key.keyCode === 32) jump = true;
});
document.addEventListener('keyup', (key) => {
    if(key.keyCode === 32) jump = false;
});

let form = document.getElementById('playerForm');
form.addEventListener('submit', (e) => {
    playerName = document.getElementById('inputText').value;
    socket.emit('new player', (playerName));
    e.preventDefault();
});

setInterval(() => socket.emit('movement', jump), 1000 / 60);



createGameBoardArea();
tick++;

socket.on('players state', (players) => {
    // console.log(players);
    if(tick % 0.5 === 0)
        spriteIndex = (spriteIndex + 1) % 45;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'orange';
    for(let id in players) {
        let player = players[id];
        // const bgImage = new Image();
        // bgImage.src = 'images/characters/dragonite/tile000.png';
        context.beginPath();
        context.drawImage(playerImages[spriteIndex], player.x, player.y);
        context.fill();
    }
});



/!*--------functions--------*!/

function createGameBoardArea() {
    initCanvas();
    context = canvas.getContext('2d');


    /!*--background--*!/

    //let environment = new Environment(context, canvas, bgImage);
}


function initCanvas() {
    canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 500;
    canvas.style.border = "8px solid #ff8911";

}

function loadCharacterImages() {
    let characterSprites = [];
    for(let i = 0; i < 45; i ++)
        characterSprites[i] = new Image();
    for(let i = 0; i < 45; i ++){
        /!*if(i < 10)
            characterSprites[i].src = "images/characters/hoppip/tile00" + i +".png";
        else
            characterSprites[i].src = "images/characters/hoppip/tile0" + i +".png";*!/
        if(i < 10)
            characterSprites[i].src = "images/characters/dragonite/tile00" + i +".png";
        else
            characterSprites[i].src = "images/characters/dragonite/tile0" + i +".png";
        /!*if(i < 10)
            characterSprites[i].src = "images/characters/bat/tile00" + (i + 5) +".png";
        else
            characterSprites[i].src = "images/characters/bat/tile0" + i +".png";*!/
        /!*if(i < 10)
            characterSprites[i].src = "images/characters/bird/tile00" + i +".png";
        else
            characterSprites[i].src = "images/characters/bird/tile0" + i +".png";*!/
    }
    return characterSprites;
}*/
