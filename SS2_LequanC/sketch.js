//Lequan.C
//Title: Spike Jump
//Jumping minigame
//Press mouse to jump over the spike


const g = 1;
const jump = 17;
const ground = 20;
const size = 40;
speed = 5
let x, y, ab;

function setup() {
  createCanvas(600, 600);
  x = width / 2;
  y = height - ground - size / 2;
  ab = 0;
  x1 = 520;
  y1 = 530;
  x2 = 500;
  y2 = 580;
  x3 = 550;
  y3 = 580;
}
function draw() {

  background(220);
  let cd = height - ground;
  line(0, cd, width, cd);

  triangle(x1, y1, x2, y2, x3, y3)
  x1 = x1 - speed
  x2 = x2 - speed
  x3 = x3 - speed

  

  if(x1 < -100) {
    x1 = 700
  }
  if(x2 < -100){
    x2 = 700
  }
  if(x3 < -100){
    x3 = 700
  }


  circle(100, y, size, size);
  y += ab

  if(y < height - ground - size / 2){
    ab += g
  }
else{
  ab = 0;
  y = height - ground - size / 2;
}
}
function mousePressed(){
  if( y >= height - ground - size / 2){
    ab = -jump;
  }
}   

  
