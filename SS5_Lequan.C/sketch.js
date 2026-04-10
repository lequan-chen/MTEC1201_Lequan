//Lequan Chen
//Short study 5
//Click mouse to form grid
//Click anykey to form circle

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let x = 0
  while (x < 1000) {
    line (x, 0, x, 400);
    x += 40;
  }

  if (mouseIsPressed === true) {
    for (let y = 0; y < 1000; y += 40) {
      line (0, y, 400, y)
    }
  }
  
  if (keyIsPressed === true) {
    for (let d = 200; d > 0; d -= 10) {
      circle(200, 200, d);
    }
  }


}
