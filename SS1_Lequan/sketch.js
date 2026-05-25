function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  fill(255, 0, 0);
  stroke(0);
  strokeWeight(2);
  rect(50, 50, 120, 80);


  fill(0, 0, 255);
  stroke(255);
  strokeWeight(6);
  circle(250, 100, 100);

  fill(0, 255, 0);
  stroke(255, 0, 255);
  strokeWeight(4);
  triangle(350, 250, 450, 250, 400, 150);
}