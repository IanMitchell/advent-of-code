const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

rl.on('line', parseLine);

// Initialize Keypad
const values = new Map();
for (let i = 0; i < 5; i++) {
  values.set(i , new Map());
}

values.get(0).set(2, 5);

values.get(1).set(1, 2);
values.get(1).set(2, 6);
values.get(1).set(3, 'A');

values.get(2).set(0, 1);
values.get(2).set(1, 3);
values.get(2).set(2, 7);
values.get(2).set(3, 'B');
values.get(2).set(4, 'D');

values.get(3).set(1, 4);
values.get(3).set(2, 8);
values.get(3).set(3, 'C');

values.get(4).set(2, 9);


const previousPoint = {
  x: 0,
  y: 2,
};

function parseLine(line) {
  // Overly cautious, but needs to be sequential
  rl.pause();

  Array.from(line).forEach(char => {
    switch (char) {
      case 'U':
        if (values.get(previousPoint.x).has(previousPoint.y - 1)) {
          previousPoint.y -= 1;
        }
        break;
      case 'D':
        if (values.get(previousPoint.x).has(previousPoint.y + 1)) {
          previousPoint.y += 1;
        }
        break;
      case 'L':
        if (values.has(previousPoint.x - 1) && values.get(previousPoint.x - 1).has(previousPoint.y)) {
          previousPoint.x -= 1;
        }
        break;
      case 'R':
        if (values.has(previousPoint.x + 1) && values.get(previousPoint.x + 1).has(previousPoint.y)) {
          previousPoint.x += 1;
        }
        break;
    }
  });

  console.log(values.get(previousPoint.x).get(previousPoint.y));
  
  // Next line
  rl.resume();
}


