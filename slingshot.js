let myObject 
this.interval = setInterval(updateCanvas, 10);
var self = this;
function startSim() {
    myObject = new component(30, 30, "blue", 550, 200);
    myCanvas.start();
}

let myCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 750;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function component(width, height, colour, x, y, type) {
    this.type = type;
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0;
    this.gravitySpeed = 0.9;
    this.bounce = 0.9;
    this.width = 40;
    this.height = 40;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myCanvas.context;
        ctx.fillStyle = colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.x < 0 || this.x > 1160) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > 710) {
            this.speedY *= -1;
        }
    }

    this.updatedPosition = function() {
        this.speedY += this.gravitySpeed;
        this.x += this.speedX;
        this.y += this.speedY
        this.floorHit();
    }
    this.floorHit = function() {
       var floor = myCanvas.canvas.height - this.height;
       if (this.y > floor) {
         this.y = floor;
         this.speedY *= -this.bounce;
         }
    }
}

const init = () => {
    var elem = document.getElementById('number');
    var wind = document.getElementById('windValue');
    var elem1 = document.getElementById('number1');
    var gravity = document.getElementById('gravityValue');
    var elem2 = document.getElementById('number2');
    var density = document.getElementById('densityValue');
    var rangeValue = function (elem, wind, elem1, gravity, elem2, density) {
    return function(evt){
        wind.innerHTML = elem.value;
        gravity.innerHTML = elem1.value;
        density.innerHTML = elem2.value;
        // The following stuff is what dosen't work
        // its used to link the slider value to the variable value
        // if u can get it working then pog
        self.speedX = document.getElementById("number").wind;
        self.gravity = document.getElementById("number1").gravity;
        self.speedY = document.getElementById("number2").density;
    }
    }
    elem.addEventListener('input', rangeValue(elem, wind));
    elem1.addEventListener('input', rangeValue(elem1, gravity));
    elem2.addEventListener('input', rangeValue(elem2, density));
}

function updateCanvas() {
    myCanvas.clear();
    myObject.updatedPosition();
    myObject.update();
}




