//Lequan Chen
//Mtec-1201
//Midterm project

let img;
let img2;
let img3;
let x = 250;
let y = 200;
let speed = 3;
let gravity = 8;
let fireX;
let fireY;
let restart;
let gameState = "start";
let startButton;
let startTime;
let survivalTime = 0;
let timerRunning = false;



function preload() { //loads the image
  img = loadImage( 'Image/background.jpg');
  img2 = loadImage( 'Image/character1.png');
  img3 = loadImage( 'Image/fireball.png');
}

function setup() {
  createCanvas(590, 290);


  startButton = createButton("Game Start"); // creates the start button
  startButton.position(240, 140);
  startButton.mousePressed(startGame);


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
  if (gameState === "start") {
    textSize(32);
    fill(0);
    text("Fireball Dodge", 180, 100);
    textSize(16);
    text("V0.00001 Early Acess", 200, 130);
    return;    // stop the game from running when start button is not pressed
  }



  let hit = collision()
  background(220);
  image(img, 0, 0);
  image(img2, x, y);
  image(img3, fireX, fireY);

  fill(0);
  textSize(16);
  text("Points:" + survivalTime, 10, 20);

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
    timerRunning = false;
    restart.show(); // show button
    
  } 
  
  else {
    restart.hide(); // hide when playing
  }

  if (timerRunning && !hit) {
    survivalTime = millis() - startTime;
  }
}

function startGame() { // gives actual function to the button
  gameState = "play";
  startButton.hide();

  startTime = millis();
  timerRunning = true;
}



function move() {
  let hit = collision(); 
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
  let hit = collision();
  if (!hit) {
    if (key === "f") {
      x = random(0, 290);
    }
  }
}


function collision() { //checks for the size of character and fireball
  let playerW = 30;
  let playerH = 30;
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
  x = 250;
  y = 200;
  fireY = 0;
  fireX = random(0, width);

  survivalTime = 0;
  startTime = 0;
  timerRunning = false;

  gameState = "start";
  startButton.show();
  restart.hide();
}