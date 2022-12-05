var cols, rows;
const scl = 50;
const w = 7000;
const h = 5000;

var terrHeight = 150;

var terrain;
var xFlying = 0;
var yFlying = 0;

var keys = [false, false, false, false, false, false, false];

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  
  cols = w / scl;
  rows = h / scl;
  
  terrain = new Array(cols);
  for (var i = 0; i < terrain.length; i++) {
    terrain[i] = new Array(rows);
  }
}

function draw() {
  if(keys[0]) yFlying -= 0.01;
  if(keys[1]) yFlying += 0.01;
  if(keys[2]) xFlying -= 0.01;
  if(keys[3]) xFlying += 0.01;
  if(keys[4]) terrHeight += 5;
  if(keys[5]) terrHeight -= 5;
  terrHeight = Math.min(Math.max(400, terrHeight), 800);
  
  
  var yoff = yFlying;
  for(var j = 0; j < rows; j++) {
    var xoff = xFlying;
    for(var i = 0; i < cols; i++) {
      terrain[i][j] = map(noise(xoff,yoff), 0, 1, -150, terrHeight);
      xoff += 0.05;
    }
    yoff += 0.05;
  }
  
  background(120, 200, 236);
  
  if(keys[6]) {
    stroke(255);
    noFill();
  }
  
  translate(width/2, height/2);
  rotateX(PI/3);
  
  translate(-w/2, -h/2);
  
  for(var a = 0; a < rows - 1; a++) {
    beginShape(TRIANGLE_STRIP);
    for(var b = 0; b < cols; b++) {
      if(!keys[6]) {
        fill(b, 150, a);
        stroke(230);
      }
      vertex(b * scl, a * scl, terrain[b][a]);
      vertex(b * scl, (a + 1) * scl, terrain[b][a + 1]);
    }
    endShape();
  }
}

function keyPressed() {
    if(key == 'W' || key == 'w') keys[0] = true;
    if(key == 'S' || key == 's') keys[1] = true;
    if(key == 'A' || key == 'a') keys[2] = true;
    if(key == 'D' || key == 'd') keys[3] = true;
    if(key == 'Q' || key == 'q') keys[4] = true;
    if(key == 'E' || key == 'e') keys[5] = true;
    if(key == 'F' || key == 'f') keys[6] = !keys[6];
}

function keyReleased() {
  if(key == 'W' || key == 'w') keys[0] = false;
    if(key == 'S' || key == 's') keys[1] = false;
    if(key == 'A' || key == 'a') keys[2] = false;
    if(key == 'D' || key == 'd') keys[3] = false;
    if(key == 'Q' || key == 'q') keys[4] = false;
    if(key == 'E' || key == 'e') keys[5] = false;
}