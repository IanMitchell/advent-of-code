const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);

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
    outputRoomName(input[1], parseInt(input[2], 10));
  }
}

function sorter(a, b) {
  if (a[1] > b[1] ||
      (a[1] === b[1] && a[0] < b[0])) {
    return -1;
  }
    
  return 1;
}

function outputRoomName(str, offset) {
  const realOffset = offset % 26;

  const sentence = Array.from(str).map(char => {
    if (char === '-') {
      return ' ';
    }

    let ascii = char.charCodeAt(0) + realOffset;

    if (ascii > 'z'.charCodeAt(0)) {
      ascii = 'a'.charCodeAt(0) + (ascii - 'z'.charCodeAt(0) - 1);
    }

    return String.fromCharCode(ascii);
  });

  if (sentence.join('').trim() === 'northpole object storage') {
    console.log(offset);
  }
}