//Write a function that determines whether a string is a valid guess in a Boggle
//board, as per the rules of Boggle. A Boggle board is a 2D array of individual
//characters, e.g.:
/*
[ ["I","L","A","W"],
  ["B","N","G","E"],
  ["I","U","A","O"],
  ["A","S","R","L"] ]
*/

// Valid guesses are strings which can be formed by connecting adjacent cells
// (horizontally, vertically, or diagonally) without re-using any previously
// used cells.

function checkWord( board, word ) {
  // ...
  return false;
}

var testBoard = [
  ["E","A","R","A"],
  ["N","L","E","C"],
  ["I","A","I","S"],
  ["B","Y","O","R"]
];

console.log(checkWord( testBoard, "C" ) == true )
console.log( checkWord( testBoard, "EAR" ) == true );
console.log( checkWord( testBoard, "EARS" ) == false );
console.log( checkWord( testBoard, "BAILER" ) == true );
console.log( checkWord( testBoard, "RSCAREIOYBAILNEA" ) == true);
console.log( checkWord( testBoard, "CEREAL" ) == false );
console.log( checkWord( testBoard, "ROBES" ) == false);
console.log( checkWord( testBoard, "BAKER" ) == false );
console.log( checkWord( testBoard, "CARS" ) == false );
