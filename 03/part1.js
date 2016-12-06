const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);
rl.on('close', outputAnswer);

let validCount = 0;

function parseLine(text) {
  const vals = text.split(' ')
                   .filter(Number)
                   .map(x => parseInt(x, 10));

  if (vals[0] + vals[1] > vals[2] &&
      vals[0] + vals[2] > vals[1] &&
      vals[1] + vals[2] > vals[0]) {
        validCount++;
  }
}

function outputAnswer() {
  console.log(`There are ${validCount} valid triangles.`);
}
