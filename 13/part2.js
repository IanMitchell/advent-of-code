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

for (let x = 0; x < 60; x++) {
  for (let y = 0; y < 60; y++) {
    if (isWall(x, y)) {
      walls.push(1);
    } else {
      walls.push(0);
    }
  }
}

const maze = ndarray(walls, [60, 60]);
let counter = 0;

for (let x = 0; x < 60; x++) {
  for (let y = 0; y < 60; y++) {
    const dist = createPlanner(maze).search(1, 1, x, y, []);

    if (dist <= 50) {
      counter++;
    }
  }
}

console.log(`Final: ${counter}`);
