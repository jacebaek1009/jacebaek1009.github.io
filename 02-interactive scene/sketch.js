//Jace Baek
//Mr.Schellenberg
//Period 3
//October 2nd 2023
//Purpose; To create an interactive scene, Made snake, some of the features are, score, background change, end screen. One bug is that you have to click the mouse after you are dead to see the end screen
//Requirments = mouse;done:Click mouse to change Background color, keyboard;done:Use the UP DOWN LEFT RIGHT keys to move the snake, loops and nested loops;done
//Extra for experts Attempted. I have implemented alot of things that werent taught in class such as, Adding text and various ways to play around with them, Another one was framerate; frame rate is definitely an essential to creating snake to give it that retro style, Lastly was arrays. It was hard to understand at first on how to implement arrays but found out it was nessesary for a game like this as it had to track the last known location of the snake to build more tails. I also used Constrain which helped set min and max values

// variables
let s;
let gridScale = 20;
let food;
let recX;
let recY;
let recSide1 = 300;
let recSide2 = 300;
let score = 0;
let status = "alive";
let mouse = true;

// in the setup function I set the play area, spawing of the fruits an the frame rate
function setup() {
  createCanvas(400, 400);
  recX = width / 8;
  recY = height / 6;
  frameRate(10);
  pickSpawn();
  s = new Snake();
}

//Mostly setting texts
function draw() {
  if (status === "alive") {
    if (mouse) {
      background(225);
    } else {
      background(0);
    }
    textSize(50);
    textAlign(CENTER, TOP);
    text("SNAKE!", width / 2, 20);

    textSize(20);
    textAlign(RIGHT, TOP);
    text(score, 370, 30);
    text("Score", 350, 30);

    gameArea();
    if (s.eatFood(food)) {
      pickSpawn();
    }
    s.show();
    s.death();
    s.updateCor();

    fill(255, 0, 0);
    rect(food.x, food.y, gridScale, gridScale);
  } else {
    textSize(50);
    textAlign(CENTER, TOP);
    text("Game Over", width / 2, 30);
    textSize(100);
    textAlign(CENTER, CENTER);
    text(score, width / 2, height / 2);
  }
}

//this function makes the fruits spawn in random locations in the play area
function pickSpawn() {
  let minX = recX;
  let maxX = recX + recSide1 - gridScale;
  let minY = recY;
  let maxY = recY + recSide2 - gridScale;

  let xOptions = [];
  let yOptions = [];

  for (let x = minX; x <= maxX; x += gridScale) {
    xOptions.push(x);
  }

  for (let y = minY; y <= maxY; y += gridScale) {
    yOptions.push(y);
  }

  let randomX = random(xOptions);
  let randomY = random(yOptions);

  food = createVector(randomX, randomY); //Vector was also a new thing I have implemnted into my code this lets me set parameters
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === 87) {
    s.directions(0, -1);
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    s.directions(0, 1);
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    s.directions(1, 0);
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    s.directions(-1, 0);
  }
}

function Snake() {
  this.x = width / 8;
  this.y = height / 6;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eatFood = function (pos) {
    let d = dist(this.x, this.y, pos.x, pos.y); //This shows if the snake has touched the food
    if (d < 1) {
      score = score + 1;
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.directions = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };
  // this function sees if the head of the snake touches the tail
  this.death = function () {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        status = "dead";
      }
    }
  };

  this.updateCor = function () {
    if (this.tail.length === this.total) {
      // since tail length is equal to the tail total we can see that it has not eaten any fruits
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);
    this.x += this.xspeed * gridScale;
    this.y += this.yspeed * gridScale;
    this.x = constrain(this.x, recX, width - recX - gridScale);
    this.y = constrain(this.y, recY, recY + recSide1 - gridScale); // this is for constraning the snake in the play area
  };

  this.show = function () {
    //This is where the snake draws its new tail
    fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, gridScale, gridScale);
    }

    fill(255);
    rect(this.x, this.y, gridScale, gridScale);
  };
}

function gameArea() {
  fill("white");
  rect(recX, recY, recSide1, recSide2);
}

//changes the background if mouse is clicked
function mousePressed() {
  if (mouse) {
    background(0);
  } else {
    background(225);
  }
  mouse = !mouse;
}
