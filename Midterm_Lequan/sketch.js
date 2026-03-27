//Lequan Chen
//Mtec-1201
//Midterm project

let img;
let img2;
let img3;
let x = 0;
let y = 200;
let speed = 3;
let gravity = 8;
let fireX;
let fireY;
let restart;



function preload() { //loads the image
  img = loadImage( 'Image/background.jpg');
  img2 = loadImage( 'Image/character1.png');
  img3 = loadImage( 'Image/fireball.png');
}

function setup() {
  createCanvas(590, 290);
  restart = createButton("Restart"); // creates the restart button and set the position
  restart.position(250, 180);
  restart.mousePressed(restartGame);
  restart.hide(); 
  
  
  img2.resize(50, 50);
  img3.resize(30, 30);
  fireY = 0;
  fireX = random(0, width);
}

function draw() {
  move();
  let hit = collision()
  background(220);
  image(img, 0, 0);
  image(img2, x, y);
  image(img3, fireX, fireY);

  
  
  if (!hit) {
      fireY += gravity
    }
  if (fireY >= 220) {
    fireY = -40;
    fireX = random(0, width);
  }

  if (hit) {
  textSize(32);
  fill(100, 0, 0);
  text("TRY AGAIN!", 190, 150);
  restart.show(); // show button
  } else {
  restart.hide(); // hide when playing
  }
}

function move() {
  
  let hit = collision(); 

  if (!hit) {
   if (keyIsPressed && key == 'd') {
      x = x + speed;
   }
   if (keyIsPressed && key == 'a') {
     x = x - speed;
   }
  }
  
}

function keyPressed() {
  if (key === 'f') {
    x = random(0, 290);
  }
}

function collision() { //checks for the size of character and fireball
  let playerW = 40;
  let playerH = 40;
  let fireW = 20;
  let fireH = 20;

  let hit = //checks for collision of fireball and character
    x < fireX + fireW &&
    x + playerW > fireX &&  
    y < fireY + fireH &&
    y + playerH > fireY;

  return hit;
}

function restartGame() { //reset the game when restart is hit
  x = 0;
  y = 200;
  fireY = 0;
  fireX = random(0, width);
}