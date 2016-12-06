const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);
rl.on('close', outputAnswer);

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

let password = '--------';

function parseLine(text) {
  let totalCharacters = 8;
  let index = 0;

  while (totalCharacters > 0) {
    const md5 = crypto.createHash('md5');  
    md5.update(text + index);  
    const hash = md5.digest('hex');

    if (hash.match(/^0{5}/i) && hash[5] < password.length) {
      const targetIndex = parseInt(hash[5], 10);

      if (password[targetIndex] === '-') {
        console.log(`Char found: ${hash[6]} in position ${targetIndex} (idx: ${index})`);
        password = password.replaceAt(targetIndex, hash[6]);
        totalCharacters--;
      }
    }

    index++;

    // Fun, but doesn't finish:
    // process.stdout.write(`${randomString(hash)}\r`);
  }
}

function randomString(hash) {
  let text = hash.substr(hash.length - password.length - 1, password.length);

  for (let i = 0; i < password.length; i++) {
    if (password[i] !== '-') {
      text = text.replaceAt(i, password.charAt(i));
    }
  }

  return text;
}

function outputAnswer() {
  console.log(`The password is ${password}`);
}