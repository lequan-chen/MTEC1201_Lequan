//Lequan Chen
//Mtec-1201
//final v2 project

let img;
let img2;
let img3;
let img4;
let x = 250;
let y = 200;
let speed = 3;
let gravity = 2;
let restart;
let gameState = "start";
let startButton;
let startTime;
let survivalTime = 0;
let timerRunning = false;
let fireballs = [];
let coins = [];
let facingRight = true;
let gold = 0



function preload() { 
  img = loadImage( 'Image/background.jpg');
  img2 = loadImage( 'Image/character1.png');
  img3 = loadImage( 'Image/fireball.png');
  img4 = loadImage( 'Image/Coin.png');
  img5 = loadImage('Image/firebackground.jpg')
}

function setup() {
  createCanvas(590, 290);


  startButton = createButton("Game Start"); 
  startButton.position(240, 170);
  startButton.style ("border-radius", "12px")
  startButton.mousePressed(startGame);



  restart = createButton("Restart"); 
  restart.position(250, 180);
  restart.style ("border-radus", "12px");
  restart.mousePressed(restartGame);
  restart.hide(); 
  
  
  img2.resize(50, 50);
  img3.resize(30, 30);
  img4.resize(40, 40);
  img5.resize(590, 290);
  
  for (let i = 0; i < 5; i++) {

    let fireX = random (0, width);
    let fireY = random (-500, 0);

    fireballs.push (
      new Fire (img3, fireX, fireY)
    );
  }

  for (let i = 0; i < 3; i++) {
    let coinX = random (0, width);
    let coinY = 215;

    coins.push (
      new Coin (img4, coinX, coinY)
    );
  }

}

function draw() {

  if (gameState === "start") {
    background(220);
    image(img5, 0, 0)
    textSize(32);
    fill(250, 0, 0);
    text("Fireball Dodge", 180, 130);
    textSize(16);
    text("V1 Early Access", 220, 160);
    return;
    
  }
 move();

 increaseDifficulty();



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

  for (let i = 0; i < coins.length; i++) {

    coins[i].show();

    if (coins[i].visible && coins[i].collect()) {
      
      gold++;

      coins[i].visible = false;
      coins[i].spawnTime = millis() + 2000;
    }
    
    if (!coins[i].visible && millis() > coins[i].spawnTime) {

      coins[i].x = random (0, width);
      coins[i].y = 215;
      coins[i].visible = true
    }

  }


  
  fill(0);
  textSize(16);
  text("Time: " + round (survivalTime), 10, 20);
  text("Coins: " + gold, width - 100, 20);


  if (!hit) {

  for (let i = 0; i < fireballs.length; i++) {

    fireballs[i].y += gravity;
    if (fireballs[i].y >= 220) {
      fireballs[i].y = random (-200, -40);
      fireballs[i].x = random(0, width - 15); 
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
   if (keyIsDown (68) && x < 550) {
      x = x + speed;
      facingRight = true;
   }
   if (keyIsDown (65) && x > 0) {
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
      x = random(0, width - 50);
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

  for (let i = 0; i < coins.length; i++) {
    
    coins[i].y = 215;
    coins[i].x = random (0, width - 40);

    coins[i].visible = true;
    coins[i].spawnTime = 0;
  }

  gold = 0
  facingRight = true;
  survivalTime = 0;
  startTime = 0;
  timerRunning = false;

  gameState = "start";
  startButton.show();
  restart.hide();
}



class Fire {
  
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

class Coin {
  constructor (img4, coinX, coinY) {
    this.img4 = img4;
    this.x = coinX;
    this.y = coinY;
    this.visible = true;
    this.spawnTime = 0
  }

  show () {
    
    if (this.visible) {
      image(this.img4, this.x, this.y);
    }
  }

  collect () {
    let playerW = 25;
    let playerH = 25;
    let coinW = 15;
    let coinH = 15;

    let collecting =
      x < this.x + coinW &&
      x + playerW > this.x &&
      y < this.y + coinH &&
      y + playerH > this.y;
    
    return collecting;
  
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