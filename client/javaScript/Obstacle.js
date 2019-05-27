const Obstacle = function (x, y, height, speed, ctx, position) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = 50;
    this.ctx = ctx;
    this.speed = speed;
    this.sprits = loadObstacleImages(position);
    this.spriteIndex = 1;
    this.tick = 0;
};

Obstacle.prototype.update = function () {
    this.tick++;
    if(this.tick % 2 === 0)
        this.spriteIndex = (this.spriteIndex + 1) % 45;
    this.x -= this.speed;
};

Obstacle.prototype.render = function () {
    this.ctx.drawImage(this.sprits[this.spriteIndex], this.x, this.y, this.width, this.height);
};

function loadObstacleImages(position) {
    let fireSprites = [];
    for(let i = 0; i < 45; i ++)
        fireSprites[i] = new Image();
    for(let i = 0; i < 45; i ++){
        if(i < 10)
            fireSprites[i].src = "images/fire_sheet/" + position + "/tile00" + i +".png";
        else
            fireSprites[i].src = "images/fire_sheet/" + position + "/tile0" + i +".png";
    }
    return fireSprites;
}