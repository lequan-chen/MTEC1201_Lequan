let img;
let img2;
let x = 0;
let y = 200;
let speed = 2;

function preload() {
  img = loadImage( 'Image/background.jpg');
  img2 = loadImage( 'Image/character.jpeg');
}

function setup() {
  createCanvas(590, 290);
  img2.resize(50,50);
}

function draw() {
  keyPressed();

  background(220);
  image(img, 0, 0);
  image(img2, x, y);
}

function keyPressed() {
  if (key === 'f') {
    x = random(0, 290);
  }
  if (key === 'd' && keyIsPressed) {
    x = x + speed;
  }
  if (key === 'a' && keyIsPressed) {
    x = x - speed;
  }
}
