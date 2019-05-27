
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const app = express();
const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

let numberOfPlayers = 0, player, numberOfDead = 0;


let players = [], winners = [];

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketIO(server);
const port = 5000;

io.on('connection', onConnection);

server.on('error', (err) =>{
    console.log('Server error: ', err);
});

server.listen(port, () =>{
    console.log('Flappy bird server started on ' + port);
});

function onConnection(sock) {
    sock.emit('message', 'Hi new player, please enter your name');
    sock.on('message', (text) => {
        io.emit('message', 'Welcome ' + text);
        sock.emit('number of players', numberOfPlayers);
    });

    sock.on('new player ready', (data) => {
        player = new Player(data.name, data.id, data.x, data.y, data.ctx, data.environment, 0);
        players.push(player);
        console.log(data.name + " " + data.id + " " + data.x + " " + data.y);

        numberOfPlayers++;
        console.log("number of players: " + numberOfPlayers);
        let missingPlayers = 3 - numberOfPlayers;
        if(missingPlayers > 0)
            io.emit('message', 'Waiting for ' + missingPlayers + ' more players...');
        else {
            io.emit('message', 'Lets start');
        }
        if(numberOfPlayers === 3) {
            io.emit('start game');
        }
    });

    sock.on('update player', (data) => {
        for (let i = 0; i < players.length; i++) {
            if(players[i] === data.id) {
                player = players[i];
            }
        }
        player = data;
        //console.log("update: " + data.name + " " + data.id + "  x = " + data.x + ", y = " + data.y)
    });

    sock.on('player dead', (data) => {
        let tempWinnerScore = "me", winnerId = 0;
        let w = new Winner(data.id, data.name, data.score);
        winners.push(w);
        console.log(winners);
        numberOfDead++;
        io.emit('message', data.name + ' is dead.');
        sock.emit('message', 'wait until game will over');
        if(numberOfPlayers === numberOfDead) {
            io.emit('message', 'All players are dead.');
            io.emit('game over');

            for(let i = 0; i < numberOfPlayers; i++) {
                if(winners[i].score > tempWinnerScore) {
                    tempWinnerScore = winners[i].score;
                    winnerId = i;
                }
            }
           io.emit('winner', 'The winner is ' + winners[winnerId].name + ' with ' + winners[winnerId].score);
        }
    })
}

function Player (name, id, x, y, ctx, environment, score) {
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.environment = environment;
    this.score = score;
}
function Winner (id, name, score) {
    this.id = id;
    this.name = name;
    this.score = score;
}
