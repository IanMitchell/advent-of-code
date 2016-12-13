const ndarray = require('ndarray');
const createPlanner = require('l1-path-finder');

const INPUT = 1352;

function dec2bin(dec){
  return (dec >>> 0).toString(2);
}

function isWall(x, y) {
  const val = x * x + 3 * x + 2 * x * y + y + y * y;
  const bin = dec2bin(val + INPUT);

  return (bin.match(/1/g) || []).length % 2;
}

const walls = [];

for (let x = 0; x < 50; x++) {
  for (let y = 0; y < 50; y++) {
    if (isWall(x, y)) {
      walls.push(1);
    } else {
      walls.push(0);
    }
  }
}

//Create path planner
const planner = createPlanner(ndarray(walls, [50, 50]))

//Find path
const dist = planner.search(1, 1, 31, 39, [])
console.log(dist);
