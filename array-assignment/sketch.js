// Tag
// Jace Baek
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
let waitTime = 1500;
let botArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  bot = spawnEnemy();
  player = spawnPlayer();
  slider = createSlider(0, 255, 255);
  slider.position(windowWidth/3, 100);
  slider.style('width', '500px');
}

function draw() {
  let val = slider.value();
  background(val);
  textSize(20);
  textAlign(CENTER);
  text("Use this to change the brightness", windowWidth/2, 50)

    if (life === "alive") {
      textSize(20);
      textAlign(RIGHT, TOP);
      text(timer, 1450, 30);
      text("Score", 1400, 30);
      movePlayer();
      collision();
      timer += 1;
      spawnMore();
      displayBot();
      displayPlayer();
      moveEnemy();
    }
    if (life === "dead"){
      textSize(200);
      textAlign(CENTER, CENTER);
      text("Game Over!", windowWidth/2, windowHeight/2);
      text(timer, windowWidth/2, windowHeight/1.5);
      textSize(100);
      textAlign(CENTER, windowHeight - 100);
      text("Press Spacebar to restart", windowWidth/2, windowHeight - 100);
    }

}


function spawnEnemy() {
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
    chasePlayer: function () {
      let dx = player.x - bot.x;
      let dy = player.y - bot.y;
      let angle = atan2(dy, dx);//Returns the angle of dy and dx in radians
      bot.x += cos(angle) * bot.dx;//returns the cosine value as cosine = x
      bot.y += sin(angle) * bot.dy;//retunrs the sin value as sin = y
    }
  };
  return bot;
}

function movePlayer() {
  if (keyIsDown(87)) {
    player.y = player.y - player.dy;
  }
  if (keyIsDown(83)) {
    player.y = player.y + player.dy;
  }
  if (keyIsDown(68)) {
    player.x = player.x + player.dx;
  }
  if (keyIsDown(65)) {
    player.x = player.x - player.dx;
  }
}

function moveEnemy() {
  for (let i = 0; i < botArray.length; i++) {
    let bot = botArray[i];
    bot.chasePlayer();

    if (bot.x + bot.sideLength1 >= windowWidth || bot.x <= 0) {
      bot.dx = -1 * bot.dx;
    }
    if (bot.y + bot.sideLength2 >= windowHeight || bot.y <= 0) {
      bot.dy = -1 * bot.dy;
    }
  }
}

function displayBot() {
  for (let i = 0; i < botArray.length; i++) {
    let bot = botArray[i];
    fill(bot.r, bot.g, bot.b);
    rect(bot.x, bot.y, bot.sideLength1, bot.sideLength2);
  }
}

function spawnMore() {
  if (millis() > lastSwitchTime + waitTime) {
    lastSwitchTime = millis();
    let bot = spawnEnemy();
    botArray.push(bot);
  }
}

function spawnPlayer() {
  let player = {
    x: windowWidth / 2,
    y: windowHeight / 2,
    r: 0,
    g: 0,
    b: 0,
    dx: 5,
    dy: 5,
  };
  return player;
}

function displayPlayer() {
    fill(player.r, player.g, player.b);
    rect(player.x, player.y, recSide1, recSide2);
}

function collision() {
  for (let i = botArray.length - 1; i >= 0; i--) {
    let bot = botArray[i];
    let playerCenterX = player.x + recSide1 / 2;
    let playerCenterY = player.y + recSide2 / 2;
    let enemyCenterX = bot.x + bot.sideLength1 / 2;
    let enemyCenterY = bot.y + bot.sideLength2 / 2;
    let d = dist(playerCenterX, playerCenterY, enemyCenterX, enemyCenterY);
    let minD = (recSide1 + bot.sideLength1) / 2;
    if (d <= minD) {
      botArray.splice(i, 3);
      life = "dead";
    }
  }
}

function keyTyped(){
  if(key === " " && life === "dead"){
    life = "alive";
    timer = 0;
  }
}