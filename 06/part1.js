const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);
rl.on('close', outputAnswer);

const mapList = []

function parseLine(text) {
  while (mapList.length < text.length) {
    mapList.push(new Map());
  }

  Array.from(text).forEach((char, index) => {
    if (mapList[index].has(char)) {
      mapList[index].set(char, mapList[index].get(char) + 1);
    } else {
      mapList[index].set(char, 1);
    }
  });
}

function outputAnswer() {
  let answer = '';
  
  for (let i = 0; i < mapList.length; i++) {
    answer += Array.from(mapList[i]).sort((a, b) => b[1] - a[1])[0][0];
  }

  console.log(`The word is ${answer}.`);
}