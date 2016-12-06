const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);
rl.on('close', outputAnswer);

let idSum = 0;

function parseLine(text) {
  const charMap = new Map();
  const input = text.match(/([a-z-]+)([0-9]+)\[([a-z]{5})\]/i);

  Array.from(input[1]).forEach(char => {
    if (char !== '-') {
      if (charMap.has(char)) {
        charMap.set(char, charMap.get(char) + 1);
      } else {
        charMap.set(char, 1);
      }
    }
  });

  let valid = Array.from(charMap)
                   .sort(sorter)
                   .slice(0, 5)
                   .every((val, idx) => val[0] === input[3][idx]);

  if (valid) {
    idSum += parseInt(input[2], 10);
  }
}

function sorter(a, b) {
  if (a[1] > b[1] ||
      (a[1] === b[1] && a[0] < b[0])) {
    return -1;
  }
    
  return 1;
}

function outputAnswer() {
  console.log(`The sum of Sector IDs is ${idSum}.`);
}