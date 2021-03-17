let myObject 

function startGame() {
    myObject = new component(30, 30, "blue", 500, 200);
    myCanvas.start();
}

let myCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 750;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateCanvas, 10);
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = 0; 
    this.speedY = 0;    
    this.gravity = 0.5;
    this.gravitySpeed = 0.9;
    this.bounce = 0.9;
    this.update = function() {
        ctx = myCanvas.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.x < 0 || this.x > canvas.width - this.width) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.speedY = -this.speedY;
        }
    }
    this.updatedPosition = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.floorHit();
    }
    this.floorHit = function() {
       var floor = myCanvas.canvas.height - this.height;
       if (this.y > floor) {
         this.y = floor;
         this.gravitySpeed = -(this.gravitySpeed * this.bounce);

        }
    }
}

function updateCanvas() {
    myCanvas.clear();
    myObject.updatedPosition();
    myObject.update();
}


