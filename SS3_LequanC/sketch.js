let x1 = 30;
let y1 = 20;
let x2 = 10;
let y2 = 40;
let size = 100;
let size2 = 50;


function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(220);
  square(x1, y1, size);
}

function mousePressed() {
  if(mouseIsPressed)
    x1 = random(0, 1000);
    y1 = random(0, 1000);
    x2 = random(0, 1000);
    y2 = random(0, 1000);
}

function keyPressed() {
  if(keyIsPressed)
    size = random(0, 200);
    size2 = random(0, 100);
}