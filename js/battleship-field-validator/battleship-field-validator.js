// Argument is guaranteed to be 10*10 two-dimension array. Elements in the
// array are numbers, 0 if the cell is free and 1 if occupied by ship.
//
// Before the game begins, players set up the board and place the ships
// accordingly to the following rules:
//
// There must be single battleship (size of 4 cells), 2 cruisers (size 3),
// 3 destroyers (size 2) and 4 submarines (size 1). Any additional ships are
// not allowed, as well as missing ships.
//
// Each ship must be a straight line, except for submarines, which are just
// single cell.
//
// The ship cannot overlap or be in contact with any other ship, neither
// by edge nor by corner.

function validateBattlefield(field) {
  // write your magic here
  return false;
}


console.log(validateBattlefield(
                [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                 [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
                 [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
                 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                 [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]) === true);
