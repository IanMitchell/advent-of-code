const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);

const values = [
  [1, 2, 3],
  [4 ,5, 6],
  [7, 8, 9],
];

const previousPoint = {
  x: 1,
  y: 1
};

function parseLine(line) {
  // Overly cautious, but needs to be sequential
  rl.pause();

  Array.from(line).forEach(char => {
    switch (char) {
      case 'U':
        previousPoint.y = Math.max(previousPoint.y - 1, 0);
        break;
      case 'D':
        previousPoint.y = Math.min(previousPoint.y + 1, values.length - 1);
        break;
      case 'L':
        previousPoint.x = Math.max(previousPoint.x - 1, 0);
        break;
      case 'R':
        previousPoint.x = Math.min(previousPoint.x + 1, values[previousPoint.y].length - 1);
        break;
    }
  });

  console.log(values[previousPoint.y][previousPoint.x]);
  
  // Next line
  rl.resume();
}

