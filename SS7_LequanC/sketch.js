let info = { x: 30, y:20, size:100}
let round1;
let round2;


function setup() {
  createCanvas(1000, 1000);

  round1 = new round (500, 500, 80);
  round2 = new round (500, 500, 80);
}

function draw() {
  background(220);
  square(info.x, info.y, info.size);

  round1.appear();
  round2.appear();
  round1.change();
  round2.change();
}


function mousePressed() {
  if(mouseIsPressed){
    info.x = random(0, 1000);
    info.y = random(0, 1000);
  }
}

function keyPressed() {
  if(keyIsPressed) {
    info.size = random(0, 200);
  }

}

class round {
  constructor (x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
 
  appear() {
    circle (this.x, this.y, this.size);
  }

  change() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }
}