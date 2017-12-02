function damagedOrSunk (board, attacks){
  //the battle starts here!
  const hitShipParts = attacks.reduce((acc, attack) => {
    const [x,y] = attack;
    const shipPart = board[board.length - y][x - 1];
    if (shipPart > 0) {
      acc[shipPart] = !acc[shipPart] ? 1 : acc[shipPart] + 1;
    }
    return acc;
  }, {});

  const allShipLength = board.reduce((acc, row) => {
    row.reduce((acc1, c) => {
      if (c !== 0) {
        acc1[c] = !acc1[c] ? 1 : acc1[c] + 1;
      }
      return acc1;
    }, acc);
    return acc;
  }, {});

  const result = Object.keys(allShipLength).reduce((acc, k) => {
    const numHits = hitShipParts[k] ? hitShipParts[k] : 0;
    if (numHits === 0) {
      acc.notTouched++;
      acc.points--;
    } else if (numHits === allShipLength[k]) {
      acc.sunk++;
      acc.points++;
    } else {
      acc.damaged++;
      acc.points += 0.5;
    }
    return acc;
  }, { sunk: 0, damaged: 0, notTouched: 0, points: 0 });
  return result;
}


var board = [ [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0] ];

var attacks = [[3, 1], [3, 2], [3, 3]];
var result = damagedOrSunk(board, attacks);

console.log(result);
console.log(result.sunk == 1, "There should be 1 ship sunk");
console.log(result.damaged == 0, "There should be 0 ship damaged");
console.log(result.notTouched == 0, "There should be 0 ship notTouched");
console.log(result.points == 1, "there should be a 1 point score");

// Game 2
board = [ [3, 0, 1],
              [3, 0, 1],
              [0, 2, 1],
              [0, 2, 0] ];

attacks = [[2, 1], [2, 2], [ 3, 2], [3, 3]]
result = damagedOrSunk(board, attacks)

console.log(result.sunk == 1, "There should be 1 ship sunk");
console.log(result.damaged == 1, "There should be 1 ship damaged");
console.log(result.notTouched == 1, "There should be 1 ship notTouched");
console.log(result.points == 0.5, "there should be a 0.5 point score");
