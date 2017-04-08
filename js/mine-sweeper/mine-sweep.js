// https://luckytoilet.wordpress.com/2012/12/23/2125/

let open = function _open(x, y) {
  return Math.floor(Math.random() * 3) + 1;
}

function solveMine(mineMap,n){

  // find the dimentions of the mineMap
  // scan the map where (x,y) is 0, then call open function on
  // (x-1, y), (x+1, y), (x-1, y-1), (x, y- 1), (x+1, y-1),
  // (x-1, y+1), (x, y+1), (x+1, y+1) if they are inside the map
  // mark the corresponding cell with number of bombs surrounding it
  // mark the corresponding cell as opened
  //
  // Information based on the website


  // locate the non-open cell, and decide if it is all the
  // if this is a bomb, mark the cell x
  // if number of bombs found is the same as n, return result
  // if location of bomb cannot be determined, also returns the result.


//  for (let x = 0; x < )
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