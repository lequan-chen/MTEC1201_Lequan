//Lequan Chen
//Mtec-1201
//final v2 project

let img;
let img2;
let img3;
let x = 250;
let y = 200;
let speed = 3;
let gravity;
let restart;
let gameState = "start";
let startButton;
let startTime;
let survivalTime = 0;
let timerRunning = false;
let fireballs = [];
let facingRight = true;



function preload() { 
  img = loadImage( 'Image/background.jpg');
  img2 = loadImage( 'Image/character1.png');
  img3 = loadImage( 'Image/fireball.png');
}

function setup() {
  createCanvas(590, 290);


  startButton = createButton("Game Start"); 
  startButton.position(240, 140);
  startButton.mousePressed(startGame);


  restart = createButton("Restart"); 
  restart.position(250, 180);
  restart.mousePressed(restartGame);
  restart.hide(); 
  
  
  img2.resize(50, 50);
  img3.resize(30, 30);
  
  for (let i = 0; i < 5; i++) {

    let fireX = random (0, width);
    let fireY = random (-500, 0);

    fireballs.push (
      new fire (img3, fireX, fireY)
    );
  }

}

function draw() {
  move();

  increaseDifficulty();

  if (gameState === "start") {
    background(220);
    textSize(32);
    fill(0);
    text("Fireball Dodge", 180, 100);
    textSize(16);
    text("V0.09 Early Access", 200, 130);
    return;
  }



  let hit = false;

  for (let i = 0; i < fireballs.length; i++) {
    
    if (fireballs[i].collision()) {
      hit = true;
    }
  }
  
  
  background(220);
  image(img, 0, 0);
  
  push();
  translate(x + 25, y);
  if (!facingRight) {
    scale(-1, 1);
  }
  image(img2, -25, 0);
  pop();

  for (let i = 0; i < fireballs.length; i++) {

    fireballs[i].show();
    
  }

  fill(0);
  textSize(16);
  text("Score: " + round (survivalTime), 10, 20);

  if (!hit) {

  for (let i = 0; i < fireballs.length; i++) {

    fireballs[i].y += gravity;
    if (fireballs[i].y >= 220) {
      fireballs[i].y = -40;
      fireballs[i].x = random(0, width); 
    }

  }
}

  if (hit) {
    textSize(32);
    fill(100, 0, 0);
    text("TRY AGAIN!", 190, 150);
    timerRunning = false;
    restart.show(); 
    
  } 
  
  else {
    restart.hide(); 
  }

  if (timerRunning && !hit) {
    survivalTime = millis() / 1000 - startTime
  }
}

function startGame() { 
  gameState = "play";
  startButton.hide();

  startTime = millis() / 1000;
  timerRunning = true;
}



function move() {
  let hit = false;

  for (let i = 0; i < fireballs.length; i++) {

    if (fireballs[i].collision()) {
      hit = true;
    }
  }


  if (!hit) {
   if (keyIsDown (68)) {
      x = x + speed;
      facingRight = true;
   }
   if (keyIsDown (65)) {
     x = x - speed;
     facingRight = false;
   }
  }
  
}

function keyPressed() {
  let hit = false;

  for (let i = 0; i < fireballs.length; i++) {

    if (fireballs[i].collision()) {
      hit = true;
    }

  }
 
  if (!hit) {
    if (key === "f") {
      x = random(0, 290);
    }
  }
}


function restartGame() { 
  x = 250;
  y = 200;
  for (let i = 0; i < fireballs.length; i++) {

    fireballs[i].y = random(-500, 0);
    fireballs[i].x = random(0, width);

  }

  survivalTime = 0;
  startTime = 0;
  timerRunning = false;

  gameState = "start";
  startButton.show();
  restart.hide();
}



class fire {
  
  constructor (img3, fireX, fireY) {
    this.img3 = img3;
    this.x = fireX;
    this.y = fireY;
  }

  show () {
    image(this.img3, this.x, this.y);
  }

  collision () {
    let playerW = 25;
    let playerH = 25;
    let fireW = 15;
    let fireH = 15;

    let hit =
      x < this.x + fireW &&
      x + playerW > this.x &&  
      y < this.y + fireH &&
      y + playerH > this.y;

    return hit;

  }
}


function increaseDifficulty() {

   if (survivalTime > 80) {
    gravity = 8;
  }

  else if (survivalTime > 75) {
    gravity = 7;
  }

  else if (survivalTime > 60) {
    gravity = 6;
  }

  else if (survivalTime > 45) {
    gravity = 5;
  }

  else if (survivalTime > 30) {
    gravity = 4;
  }

  else if (survivalTime > 15) {
    gravity = 3;
  }

  else {
    gravity = 2;
  }

}