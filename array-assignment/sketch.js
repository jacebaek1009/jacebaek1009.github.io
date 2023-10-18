// Tag
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let score = 0;
let life = "alive";
let recSide1 = 25;
let recSide2 = 25;
let x;
let y;
let vx = 5;
let vy = 5;
let grav = 0.2;
let timer = 0;
let player;
let bot;
let lastSwitchTime = 0;
let waitTime = 2000;
let botArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  obstacle1();
  x = windowWidth/2;
  y = windowHeight/2;
  bot = spawnEnemy();
}

function draw() {
  background(255);
  textSize(20);
  textAlign(RIGHT, TOP);
  text(timer,1450, 30);
  text("Score", 1400, 30);
  timer += 1;
  
  spawnMore();
  movePlayer();
  displayBot();
  moveEnemy();
}


function spawnEnemy(){
  let bot = {
    x: random(width),
    y: random(height),
    sideLength1: recSide1,
    sideLength2: recSide2,
    r: 255,
    g: 0,
    b: 0,
    dx: 5,
    dy: 5,
  };
  return bot;
}

function movePlayer(){
  if(keyIsDown(87)){
    y = y - vy; 
  }
  if(keyIsDown(83)){
    y = y + vy; 
  }
  if(keyIsDown(68)){
    x = x + vx; 
  }
  if(keyIsDown(65)){
    x = x - vx;
  }
}


function obstacle1(){
  x = windowWidth/2;
  fill(200);
  rect(x, 700, 200, 50);
}

function displayEnemy(){
  
  fill(255, 0 , 0);
  rect(x, y, recSide1, recSide2);
}

function moveEnemy(){
  for (let i = 0; i < botArray.length; i ++){
    let bot = botArray[i];
  }

  bot.x += bot.dx;
  bot.y += bot.dy;

  if (bot.x + bot.sideLength1 >= windowWidth || bot.x <= 0) {
    bot.dx = -1 * bot.dx;
  }
  if (bot.y + bot.sideLength2 >= windowHeight || bot.y <= 0) {
    bot.dy = -1 * bot.dy;
  }

}

function displayBot(){
  for(let i = 0; i < botArray.length; i++){
    let bot = botArray[i];
    fill(bot.r, bot.g, bot.b);
    rect(bot.x, bot.y, bot.sideLength1, bot.sideLength2);
  }
}

function spawnMore(){
  if(millis()>lastSwitchTime + waitTime){
    lastSwitchTime = millis();
    let bot = spawnEnemy();
    botArray.push(bot);
  }
  
}