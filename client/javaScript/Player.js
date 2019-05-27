const Player = function(name, id, x, y, ctx, environment, character) {
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.yVelocity = 0;
    if(character === 'bat') {
        this.width = 90;
        this.height = 55;
    } else if (character === 'hoppip') {
        this.width = 91;
        this.height = 62;
    } else {
        this.width = 91;
        this.height = 109;
    }

    this.spriteIndex = 0;
    this.tick = 0;
    this.dead = false;
    this.score = 0;
    this.environment = environment;
    this.character = character;
    this.sprites = loadCharacterImages(this.character);

    document.addEventListener('keydown', moveUp => {
        if(moveUp.keyCode === 32 && !this.dead)
            this.yVelocity = -3;
    });
};

Player.prototype.update = function (obstacles) {
    this.tick++;
    if(this.tick % 5 === 0)
        this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
    this.y += this.yVelocity;
    this.yVelocity += 0.10;
    this.detectCollision(obstacles);
    if(!this.dead){
        this.score = this.tick;
        this.environment.setScore(this.score);
    }
};


Player.prototype.render = function () {
    let renderX = this.x - this.width / 2;
    let renderY = this.y - this.height / 2;
    this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY);
    this.drawMyName();
};

function loadCharacterImages(character) {
    let characterSprites = [], length;
    switch(character) {
        case 'dragonite':
            length = 45;
            break;
        case 'hoppip':
            length = 8;
            break;
        case 'bat':
            length = 3;
            break;
    }

    for(let i = 0; i < length; i ++)
        characterSprites[i] = new Image();
    for(let i = 0; i < length; i ++){
        if(i < 10)
            characterSprites[i].src = "images/characters/" + character + "/tile00" + i +".png";
        else
            characterSprites[i].src = "images/characters/" + character + "/tile0" + i +".png";
    }
    return characterSprites;
}

Player.prototype.detectCollision = function(obstacles) {
    for(let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        let topObstacle = obstacle.y <= 0;
        let xObstacleStartPosition = obstacle.x;
        let xObstacleEndPosition = obstacle.x + obstacle.width;

        let xPlayerStartPosition = this.x;
        let xPlayerEndPosition = this.x + this.width / 2;
        let yPlayerStartPosition = this.y;
        let yPlayerEndPosition = this.y + (this.height / 2);
        let yTopObstaclePosition = obstacle.height;
        let yBottomObstaclePosition = obstacle.y;

        if(topObstacle) {
            if(xPlayerEndPosition < xObstacleEndPosition && xPlayerStartPosition > xObstacleStartPosition &&
                yPlayerStartPosition < yTopObstaclePosition) {
                this.dead = true;
            }
        }
        else {
            if(xPlayerEndPosition < xObstacleEndPosition && xPlayerStartPosition > xObstacleStartPosition &&
                yPlayerEndPosition > yBottomObstaclePosition) {
                this.dead = true;
            }
        }
    }
};

Player.prototype.drawMyName = function () {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.textAlign = 'center';
    this.ctx.font = "12px Comic Sans MS";
    this.ctx.fillText(this.name, this.x, this.y + this.height / 2);
};

