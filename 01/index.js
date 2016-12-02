// I did this after 3 Zillow happy hours in one day please don't judge me

const inputStr = "R4, R4, L1, R3, L5, R2, R5, R1, L4, R3, L5, R2, L3, L4, L3, R1, R5, R1, L3, L1, R3, L1, R2, R2, L2, R5, L3, L4, R4, R4, R2, L4, L1, R5, L1, L4, R4, L1, R1, L2, R5, L2, L3, R2, R1, L194, R2, L4, R49, R1, R3, L5, L4, L1, R4, R2, R1, L5, R3, L5, L4, R4, R4, L2, L3, R78, L5, R4, R191, R4, R3, R1, L2, R1, R3, L1, R3, R4, R2, L2, R1, R4, L5, R2, L2, L4, L2, R1, R2, L3, R5, R2, L3, L3, R3, L1, L1, R5, L4, L4, L2, R5, R1, R4, L3, L5, L4, R5, L4, R5, R4, L3, L2, L5, R4, R3, L3, R1, L5, R5, R1, L3, R2, L5, R5, L3, R1, R4, L5, R4, R2, R3, L4, L5, R3, R4, L5, L5, R4, L4, L4, R1, R5, R3, L1, L4, L3, L4, R1, L5, L1, R2, R2, R4, R4, L5, R4, R1, L1, L1, L3, L5, L2, R4, L3, L5, L4, L1, R3";

let currentDirection = 0;

const moveMap = new Map();
moveMap.set(0, 0);
moveMap.set(90, 0);
moveMap.set(180, 0);
moveMap.set(270, 0);

inputStr.split(', ').forEach(cmd => {
  const command = cmd.match(/([RL])([0-9]+)/i);
  const moveDir = command[1];
  const moveDist = parseInt(command[2], 10);

  if (moveDir === 'L') {
    currentDirection -= 90;
    
    if (currentDirection < 0) {
      currentDirection = 270;
    }
  } else {
    currentDirection += 90;

    if (currentDirection > 270) {
      currentDirection = 0;
    }
  }

  moveMap.set(currentDirection,
              moveMap.get(currentDirection) + moveDist);
});

console.log(moveMap);
console.log(`N/S: ${moveMap.get(0) - moveMap.get(180)}`);
console.log(`E/W: ${moveMap.get(90) - moveMap.get(270)}`);
const totalDistance = Math.abs(moveMap.get(0) - moveMap.get(180)) + 
                      Math.abs(moveMap.get(90) - moveMap.get(270));

console.log(`You are ${totalDistance} blocks away`);