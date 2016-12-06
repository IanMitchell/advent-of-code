const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);
rl.on('close', outputAnswer);

let validCount = 0;
const savedValues = [[], [], []];

function parseLine(text) {
  // Check for completed set
  checkCompleted();

  // Parse current line
  const vals = text.split(' ')
                   .filter(Number)
                   .map(x => parseInt(x, 10));

  for (let i = 0; i < vals.length; i++) {
    savedValues[i].push(vals[i]);
  }
}

function checkCompleted() {
  // Check for completed set
  if (savedValues[0].length === 3) {
    for (let i = 0; i < savedValues.length; i++) {
      if (isValid(savedValues[i])) {
        validCount++;
      }

      savedValues[i] = [];
    }
  }
}

function isValid(vals) {
  return (vals[0] + vals[1] > vals[2] &&
          vals[0] + vals[2] > vals[1] &&
          vals[1] + vals[2] > vals[0]);
}

function outputAnswer() {
  checkCompleted();
  console.log(`There are ${validCount} valid triangles.`);
}
