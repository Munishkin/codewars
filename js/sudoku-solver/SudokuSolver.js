// https://codemyroad.wordpress.com/2014/05/01/solving-sudoku-by-backtracking/
/*
  On the other hand, the backtracking algorithm fills up a blank cell with a 
  valid number (i.e. no two same numbers in any row, column or big box),
  moves on to the next cell, and then does the same thing. If all the possible 
  numbers from 1 to 9 are invalid for any cell that the algorithm is currently “at”, 
  the algorithm moves back to the previous cell and changes that cell’s value to another valid number. Afterwards, it moves back to the next cell and the whole process repeats.
*/
// https://en.wikipedia.org/wiki/Sudoku_solving_algorithms
// use backtracking algorithm
function legal(solution, i, j, val) {
  for (var c = 0; c < 9; c++) {
    if (solution[i][c] === val) {
      return false;
    }
  }
  
  for (var r = 0; r < 9; r++) {
    if (solution[r][j] === val) {
      return false;
    }
  }

  var r = Math.floor(i / 3) * 3;
  var c = Math.floor(j / 3) * 3;  
  // sub 3 x 3 contains 1 - 9
  for (var k = r; k < r + 3;  k++) {
    for (var l = c; l < c + 3; l++) {
      if (val === solution[k][l]) {
        return false;
      }
    }
  }  
  return true;
}

function sudokuSolver(solution, i, j) {
  console.log('i:' + i + ',j:' + j);
  if (i === 9) {
    i = 0;
    j = j + 1;
    if (j === 9) {
      return true;  // we are done
    }
  }
    
  if (solution[i][j] > 0) {
    // fill the value down the row
    return sudokuSolver(solution, i+1, j);
  }

  // sudoku value 
  for (var val = 1; val <= 9; val++) {    
    // guess non-filled value
    if (legal(solution, i, j, val)) {
      solution[i][j] = val;
      if (sudokuSolver(solution, i+1, j)) {
        return true;
      } 
    }  
  }
  // no valid value
  solution[i][j] = 0;
  return false;
}

function sudoku(puzzle) {
  //return the solved puzzle as a 2d array of 9 x 9 
  var solution = JSON.parse(JSON.stringify(puzzle));
  if (sudokuSolver(solution, 0, 0)) {
    return solution;
  }
  return null;
}