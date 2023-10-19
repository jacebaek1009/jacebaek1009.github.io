// Jace Baek
// Mr.Schellenberg
//Period 3
// October 19th 2023
//Purpose; To create an interactive scene using object notation and arrays. Some of the features in this game are, score, background change, end screen, restart button, enemy chase, player control.
//Requirements completed; Array; done, object notation; done; 
//Extra for experts attempted. Two of the main things I have implemented in my code that goes above and beyond what was used in class was 1.More complicated math functions like atan2, cos, and sin, These math functions were not taught in class and I as able to use these functions to first, find the angle in radians of where the player is, second I used cos function of the find the new dx value for the enmy and sine to find the y value for the enemy. The second thing I used was the slider function> from this function I was able to change the background brightness by setting the minimum value and maximum value. 

// Variables
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
let slider;

//In the setup function I declared my "array variables", and created my sliders for the brightness
function setup() {
  createCanvas(windowWidth, windowHeight);
  bot = spawnEnemy();
  player = spawnPlayer();
  slider = createSlider(0, 255, 255);
  slider.position(windowWidth/3, 100);
  slider.style("width", "500px");
}

// In the draw function, I set up the slider, all the text and calling all of my functions as well as starting the timer/score 
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
    textSize(100);
    text("Game Over!", windowWidth/2, windowHeight/2);
    text(timer, windowWidth/2, windowHeight/1.5);
    textSize(100);
    textAlign(CENTER, windowHeight - 100);
    text("Press Spacebar to restart", windowWidth/2, windowHeight - 100);
  }

}

//Funcion to spawn the enemy bot using function notation also set up the chaseplayer function
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

//Function to move the player using WASD
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

//Function to move the enemy and making it bounce if it touches the walls
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

//function to display the bot
function displayBot() {
  for (let i = 0; i < botArray.length; i++) {
    let bot = botArray[i];
    fill(bot.r, bot.g, bot.b);
    rect(bot.x, bot.y, bot.sideLength1, bot.sideLength2);
  }
}

//function to spawn more bot every whatever miliseconds I put at the top
function spawnMore() {
  if (millis() > lastSwitchTime + waitTime) {
    lastSwitchTime = millis();
    let bot = spawnEnemy();
    botArray.push(bot);
  }
}

//function to spawn a normal square shape for the player
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

//displaying th player
function displayPlayer() {
  fill(player.r, player.g, player.b);
  rect(player.x, player.y, recSide1, recSide2);
}

//the function for the collision where if the player touches the bot it dies.
function collision() {
  for (let i = botArray.length - 1; i >= 0; i--) {
    let bot = botArray[i];
    let playerCenterX = player.x + recSide1 / 2;
    let playerCenterY = player.y + recSide2 / 2;
    let enemyCenterX = bot.x + bot.sideLength1 / 2;
    let enemyCenterY = bot.y + bot.sideLength2 / 2;
    let d = dist(playerCenterX, playerCenterY, enemyCenterX, enemyCenterY);
    let minD = (recSide1 + bot.sideLength1) / 2;
    if (d <= minD) {//this makes it so that when the player is less then equals to the minimum distance it can be from the bot it deletes the bot and switchs life to dead
      botArray.splice(i, 3);
      life = "dead";
    }
  }
}

//function to where the player can hit the space bar when they are dead to restart the game
function keyTyped(){
  if(key === " " && life === "dead"){
    life = "alive";
    timer = 0;
  }
}