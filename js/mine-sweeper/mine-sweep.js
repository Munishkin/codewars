// https://luckytoilet.wordpress.com/2012/12/23/2125/
// http://quantum-p.livejournal.com/19616.html

let open = function _open(x, y) {
  return Math.floor(Math.random() * 3) + 1;
}

function solveMine(mineMap,n){

  // find the dimentions of the mineMap
  // scan the map where (x,y) is 0, then call open function on
  // (x-1, y), (x+1, y), (x-1, y-1), (x, y- 1), (x+1, y-1),
  // (x-1, y+1), (x, y+1), (x+1, y+1) if they are inside the map
  // mark the corresponding cell with number of bombs surrounding it
  // mark the corresponding cell as opened. Mark open property of cell[x,y]
  // to true
  //
  // Information based on the website
  // We can quickly identify some of the mines. When the number 1 has exactly
  // one empty square around it, then we know there’s a mine there.
  // Mark the cell on the board with x and set cell[x,y].mine to true\
  //
  // Now the next strategy: if a 1 has a mine around it, then we know that all
  // the other squares around the 1 cannot be mines.
  // So open on the squares that we know are not mines:
  //
  // if number of empty cells around A = the value of cell (A) - number of marked bombs around (A)
  //  - mark all the empty cells as bombs
  //
  // if the value on cell (A) - number of marked bombs around (A) = 0
  //  - the cells around A cannot be bomb and they are safe to open
  //
  // - If monkey reasoning is not performed in any cell, do matrix algebra
  // Do algebra
  //
  // if number of bombs found is the same as n, return result
  // if location of bomb cannot be determined, also returns the result.

  const rows = mineMap.split('\n');
  const cols = rows[0].split(' ');

  let mineMapArray = mineMap.split('\n')
                      .map((row) => { return row.split(' '); });
  console.log(mineMapArray);

  console.log(`${rows.length}, ${cols.length}`);

  // each character in a row joined by ' '
  // each row joined by \n and return the string back
  let solvedMineMap = mineMapArray.map((row) => {
    return row.join(' ');
  }).join('\n');

  console.log(solvedMineMap);

  return solvedMineMap;
}




let a = `? ? ? ? ? ?
? ? ? ? ? ?
? ? ? 0 ? ?
? ? ? ? ? ?
? ? ? ? ? ?
0 0 0 ? ? ?`

solveMine(a, 6)

/*

describe("Basic Tests", function(){
  it("It should works for basic tests", function(){
var map=
`? ? ? ? ? ?
? ? ? ? ? ?
? ? ? 0 ? ?
? ? ? ? ? ?
? ? ? ? ? ?
0 0 0 ? ? ?`,
result=
`1 x 1 1 x 1
2 2 2 1 2 2
2 x 2 0 1 x
2 x 2 1 2 2
1 1 1 1 x 1
0 0 0 1 1 1`

game.read(result)
Test.assertSimilar(solveMine(map,6),result)

var map=
`0 ? ?
0 ? ?`,
result=
`0 1 x
0 1 1`
game.read(result)
Test.assertSimilar(solveMine(map,1),"?")

var map=
`0 ? ?
0 ? ?`,
result=
`0 2 x
0 2 x`
game.read(result)
Test.assertSimilar(solveMine(map,2),result)

var map=
`? ? ? ? 0 0 0
? ? ? ? 0 ? ?
? ? ? 0 0 ? ?
? ? ? 0 0 ? ?
0 ? ? ? 0 0 0
0 ? ? ? 0 0 0
0 ? ? ? 0 ? ?
0 0 0 0 0 ? ?
0 0 0 0 0 ? ?`,
result=
`1 x x 1 0 0 0
2 3 3 1 0 1 1
1 x 1 0 0 1 x
1 1 1 0 0 1 1
0 1 1 1 0 0 0
0 1 x 1 0 0 0
0 1 1 1 0 1 1
0 0 0 0 0 1 x
0 0 0 0 0 1 1`
game.read(result)
Test.assertSimilar(solveMine(map,6),result)
})})

*/
