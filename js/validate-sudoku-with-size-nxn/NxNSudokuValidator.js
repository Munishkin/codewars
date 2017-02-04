var Sudoku = function(data) 
{
  //   Private methods
  // -------------------------
  var N = data.length;
  var rootN = Math.floor(Math.sqrt(N));
  
  var isValidSubSudoku = function(leftX, leftY, size) {
    var sudokuTracker = {};
    for (var j = leftX; j < leftX+size; j++) {
      for (var k = leftY; k < leftY+size; k++) {
        if (typeof data[j][k] === 'number' && data[j][k] >= 1 && data[j][k] <= N) { 
          sudokuTracker[data[j][k]] = true;
        } else {
          return false;
        }
      }
    }
    return Object.keys(sudokuTracker).length === N;          
  }
  

  //   Public methods
  // -------------------------
  return {
    isValid: function() {
      if (rootN !== Math.sqrt(N)) { return false; }
      for (var r = 0; r < N; r+= rootN) {
        for (var c = 0; c < N; c+= rootN) {
          var isValid =  isValidSubSudoku(r, c, rootN);
          if (isValid === false) return false;
        }      
      }
      return true;
    }
  };
};