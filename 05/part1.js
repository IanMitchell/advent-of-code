const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);
rl.on('close', outputAnswer);

let password = '';

function parseLine(text) {
  let totalCharacters = 8;
  let targetIndex = 5; // grab 6th char in hash

  let index = 0;
  while (password.length < totalCharacters) {
    const md5 = crypto.createHash('md5');  
    md5.update(text + index);  
    const hash = md5.digest('hex');

    if (hash.match(/^0{5}/i)) {
      console.log(`Char found: ${hash[targetIndex]}`);
      password += hash[targetIndex];
    }

    index++;
  }
}

function outputAnswer() {
  console.log(`The password is ${password}`);
}