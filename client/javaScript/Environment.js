const Environment = function (ctx, canvas, bgImage) {
    this.bgPosition = 0;
    //this.fgPosition = 0;
    this.bgSpeed = 2;
    this.bgImage = bgImage;
    this.bgWidth = 960;
    this.bgHeight = 576;
    this.canvas = canvas;
    this.ctx = ctx;
    this.score = 0;
};

Environment.prototype.update = function () {
    this.bgPosition -= this.bgSpeed;
    if(this.bgPosition < -this.bgWidth)
        this.bgPosition = 0;
};

Environment.prototype.render = function () {
    for(let i = 0; i <= (this.canvas.width / this.bgWidth + 1); i++)
    {
        this.ctx.drawImage(this.bgImage, this.bgPosition + i * this.bgWidth, 0);
        this.scoreBoard(this.score);
    }
};

Environment.prototype.scoreBoard = function(score) {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "30px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Score: " + score, this.canvas.width - 90, 35);
};

Environment.prototype.setScore = function (score) {
    this.score = score;
};

