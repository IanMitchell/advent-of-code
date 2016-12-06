const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);
rl.on('close', outputAnswer);

function parseLine(text) {

}

function outputAnswer() {
  console.log(`Hi`);
}