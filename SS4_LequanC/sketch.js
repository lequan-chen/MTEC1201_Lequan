let img;
let x = 0;
let message = "Move the mouse over the image!";

function preload() {
  img = loadImage("Image/character.jpeg");
}

function setup() {
  createCanvas(600, 400);
  textSize(24);
}

function draw() {
  background(200);

  if (millis() > 5000) {
    background(100, 150, 255);
  }

  image(img, x, 120, 150, 150);

  x += 2;

  if (x > width) {
    x = -150;
  }

  if (
    mouseX > x &&
    mouseX < x + 150 &&
    mouseY > 120 &&
    mouseY < 270
  ) {
    fill(255, 0, 0);
    text("Mouse is touching the image!", 120, 50);
  } else {
    fill(0);
    text(message, 120, 50);
  }

  fill(0);
  text("Time: " + floor(millis() / 1000) + " seconds", 180, 350);
}