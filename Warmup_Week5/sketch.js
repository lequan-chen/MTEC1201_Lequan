let a = 50;
let b = 50;
let c = 50;
let d = 50;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(a, b, c, d);
}


function mousePressed() {
  if(mouseIsPressed)
    a = random(0, 400);
    b = random(0, 400);
    c = random(0, 400);
    d = random(0, 400);
}



