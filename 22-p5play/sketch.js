// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let dominoes, balls, gap, maxY;

function setup() {
  new Canvas();
  world.gravity.y = 10;

  noStroke();
  textSize(50);

  balls = new Group();
  balls.d = 20;

  dominoes = new Group();
  dominoes.w = 5;
  dominoes.h = 19;
  dominoes.mass = 0.01;
	
  gap = 10;
  maxY = 700;

  let floorY = tower(canvas.hw, 200, true);
  new Sprite(
    [
      [0, floorY],
      [canvas.w, floorY]
    ],
    'static'
  );
}

// this function uses recursion!
function tower(x, y, isLast) {
  new dominoes.Sprite(x, y - 13).rotation = 90;
  new dominoes.Sprite(x - gap, y);
  if (isLast) new dominoes.Sprite(x + gap, y);

  y += dominoes.w + dominoes.h + 2;
  if (y > maxY) return y - dominoes.h + 2;

  tower(x - gap, y, false);
  if (isLast) return tower(x + gap, y, isLast);
}

function draw() {
  if (!mouse.pressing()) {
    background(0, 0, 0, 50);
  } else {
    background(0);
  }

  //renderStats();

  if (kb.presses(' ')) {
    balls.removeAll();
    dominoes.removeAll();
    tower(canvas.hw, 200, true);
  }

  if (mouse.presses()) {
    new balls.Sprite(mouse.x, mouse.y);
  } else if (mouse.pressing() && balls.length > 0) {
    balls.at(-1).moveTowards(mouse);
  } else {
    world.step(1 / 240); // slow motion!
  }
}