let colors = ["red", "blue", "green", "yellow"];
let sizes = [50, 80, 110, 140];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);

  textSize(22);
  fill(0);
  text("Click the mouse to change the shapes!", 120, 40);

  fill(colors[0]);
  circle(100, 200, sizes[0]);

  
  fill(colors[1]);
  rect(180, 160, sizes[1], sizes[1]);

  fill(colors[2]);
  ellipse(350, 200, sizes[2], 70);

  fill(colors[3]);
  triangle(500, 250, 450, 150, 550, 150);
}

function mousePressed() {

  colors[0] = color(random(255), random(255), random(255));
  colors[1] = color(random(255), random(255), random(255));
  colors[2] = color(random(255), random(255), random(255));
  colors[3] = color(random(255), random(255), random(255));

  sizes[0] = random(30, 100);
  sizes[1] = random(40, 120);
  sizes[2] = random(50, 140);
  sizes[3] = random(60, 160);
}