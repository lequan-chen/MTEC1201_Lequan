//Lequan Chen
//Mtec-1201
//Midterm project

let img;
let img2;
let img3;
let x = 250;
let y = 200;
let speed = 3;
let gravity = 5;
let restart;
let gameState = "start";
let startButton;
let startTime;
let survivalTime = 0;
let timerRunning = false;
let fireballs = [];



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
  if (gameState === "start") {
    textSize(32);
    fill(0);
    text("Fireball Dodge", 180, 100);
    textSize(16);
    text("V0.0005 Early Access", 200, 130);
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
  image(img2, x, y);

  for (let i = 0; i < fireballs.length; i++) {

    fireballs[i].show();
  }

  fill(0);
  textSize(16);
  text("Points:" + survivalTime, 10, 20);

if (!hit) {

  for (let i = 0; i < fireballs.length; i++) {

    fireballs[i].y += gravity;

  }
}

  for (let i = 0; i < fireballs.length; i++) {
    if (fireballs[i].y >= 220) {
      fireballs[i].y = -40;
      fireballs[i].x = random(0, width); 
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
    survivalTime = millis() - startTime;
  }
}

function startGame() { 
  gameState = "play";
  startButton.hide();

  startTime = millis();
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
   }
   if (keyIsDown (65)) {
     x = x - speed;
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
    let playerW = 30;
    let playerH = 30;
    let fireW = 20;
    let fireH = 20;

    let hit =
      x < this.x + fireW &&
      x + playerW > this.x &&  
      y < this.y + fireH &&
      y + playerH > this.y;

    return hit;

  }
}