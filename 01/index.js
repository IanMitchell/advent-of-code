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

const totalDistance = Math.abs(moveMap.get(0) - moveMap.get(180)) + 
                      Math.abs(moveMap.get(90) - moveMap.get(270));

console.log(`You are ${totalDistance} blocks away`);



// Part Two oh man.
// Brute Force: Track every point ever visited, and search. Ewwwwwwww
// Optimization: Track end points, compare all perpendicular lines within boundaries you cross. Doesn't help though does it
// Alcohol got to me ok I'm overthinking this, the answer is always a hashmap

const visitorLog = new Map(); // can't use array cuz negative locations
visitorLog.set(0, new Map()); // initialize
let doubleVisit = { x: 0, y: 0 };
const currentLocation = { x: 0, y: 0 };
currentDirection = 0; // reset

inputStr.split(', ').some((cmd, idx) => {
  const command = cmd.match(/([RL])([0-9]+)/i);
  const moveDir = command[1];
  const moveDist = parseInt(command[2], 10);
  let moveOffset = 1;

  // I hate this but I'm reusing it
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

  // We goin backwards?
  if (currentDirection >= 180) {
    moveOffset *= -1;
  }

  // N/S then E/W
  if (currentDirection === 0 || currentDirection === 180) {
    for (let i = 1; i <= moveDist; i++) {
      const target = {
        x: currentLocation.x,
        y: currentLocation.y + (i * moveOffset),
      };

      if (visitorLog.get(target.x).get(target.y) === true) {
        doubleVisit = target;
        return true;
      } else {
        visitorLog.get(target.x).set(target.y, true);
      }
    }
  } else {
    for (let i = 1; i <= moveDist; i++) {
      const target = {
        x: currentLocation.x + (i * moveOffset),
        y: currentLocation.y,
      };

      if (!visitorLog.has(target.x)) {
        visitorLog.set(target.x, new Map());
      }

      if (visitorLog.get(target.x).get(target.y) === true) {
        doubleVisit = target;
        return true;
      } else {
        visitorLog.get(target.x).set(target.y, true);
      }
    }
  }

  switch (currentDirection) {
    case 0:
      currentLocation.y += moveDist;
      break;
    case 90:
      currentLocation.x += moveDist;
      break;
    case 180:
      currentLocation.y -= moveDist;
      break;
    case 270:
      currentLocation.x -= moveDist;
      break;
  }
});

// that code is so nasty pls never look at it again
console.log(`The first repeated stop is ${Math.abs(doubleVisit.x) + Math.abs(doubleVisit.y)} blocks away.`);