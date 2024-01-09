// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let depth = 0;

let theColors = ["black", "blue", "red", "purple", "pink", "violet", "red", "white", "orange"];

let initialTri = [
  {x:400, y:50},
  {x:50, y:550},
  {x:740, y:550}
];


function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  sierpinski(initialTri, depth);
}

function mousePressed() {
  depth++;
}


function sierpinski(points, degree) {
  fill(theColors[degree]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if(degree > 0) {
    sierpinski([points[0], getMid(points[0], points[1]), getMid(points[0], points[2])],
      degree - 1);

    sierpinski([points[1], getMid(points[0], points[1]), getMid(points[1], points[2])],
      degree - 1);

    sierpinski([points[2], getMid(points[0], points[2]), getMid(points[1], points[2])],
      degree - 1);
  }
}

function getMid(point1, point2) {
  let newX = (point1.x + point2.x) /2;
  let newY = (point1.y + point2.y) /2;
  return {x: newX, y: newY};
}