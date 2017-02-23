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

  const numRows = board.length;
  const numCols = board[0].length;

  // scan the 2d array to find the occurrence of the first letter
  // push the { position, index } into queue
  // while the queue is not empty, pop the first object out
  // look for all directions. if the letter in the cell matches the letter in word
  // and cell is not resused, update {position, index} and append to queue
  // otherwise, discard the object
  // stop when match is found or all no match

  let queue = board.reduce((acc, row, i) => {
    row.forEach((x, j) => {
      if (x === word[0]) {
        acc.push ( { pos: {r: i, c: j} , nextIndex: 1, path: [numCols*i + j ] } );
      }
    });
    return acc;
  }, []);


  let exploreWord = (obj, queue) => {

    let allMoves = [ {r: obj.pos.r - 1, c: obj.pos.c },
      {r: obj.pos.r + 1, c: obj.pos.c },
      {r: obj.pos.r, c: obj.pos.c - 1 },
      {r: obj.pos.r, c: obj.pos.c + 1 },
      {r: obj.pos.r - 1, c: obj.pos.c - 1 },
      {r: obj.pos.r - 1, c: obj.pos.c + 1 },
      {r: obj.pos.r + 1, c: obj.pos.c - 1 },
      {r: obj.pos.r + 1, c: obj.pos.c + 1 }
     ];

    allMoves.forEach((o) => {
      let index = numCols * o.r + o.c;
      if (o.r >= 0 && o.r < numRows && o.c >= 0 && o.c < numCols) {
        if (board[o.r][o.c] === word[obj.nextIndex] && !obj.path.includes(index)) {
            let cloneObj = JSON.parse(JSON.stringify(obj));
            cloneObj.pos = { r: o.r, c: o.c };
            cloneObj.nextIndex += 1;
            cloneObj.path.push(index);
            queue.push(cloneObj);
        }
      }
    });
  };

  while (queue.length > 0) {
    let obj = queue.shift();
    if (obj.nextIndex === word.length) {
      return true;
    }
    exploreWord(obj, queue);
  }
  return false;
}

var testBoard = [
  [ 'T', 'T', 'M', 'D', 'A' ],
  [ 'G', 'Y', 'I', 'N', 'N' ],
  [ 'P', 'A', 'L', 'C', 'E' ],
  [ 'I', 'A', 'U', 'L', 'G' ],
  [ 'A', 'M', 'I', 'N', 'A' ] ]

console.log(checkWord( testBoard, "YTG" ) == true )

testBoard = [
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
