function solve(map, miner, exit) {
  // TODO
  return [];
}


var map = [[true]];

console.log(solve(map, {x:0,y:0}, {x:0,y:0}));

map = [[true, false],
    [true, true]];

// ['right']
console.log(solve(map, {x:0,y:0}, {x:1,y:0}));

// ['right', 'down']
console.log(solve(map, {x:0,y:0}, {x:1,y:1}));

map = [[true], [true], [true], [true]];

// ['right', 'right', 'right']
console.log(solve(map, {x:0,y:0}, {x:3,y:0}));

// ['left', 'left', 'left']
console.log(solve(map, {x:3,y:0}, {x:0,y:0}));

map = [[true, true, true],
  [false, false, true],
  [true, true, true]];

// ['down', 'down', 'right', 'right', 'up', 'up']
console.log(solve(map, {x:0,y:0}, {x:2,y:0}));

   map = [[true, true, false, false, false],
    [false, true, true, false, false],
    [false, false, true, true, false],
    [false, false, false, true, true],
    [false, false, false, false, true]];

  //         ['down', 'right', 'down', 'right', 'down', 'right', 'down', 'right']
  console.log(solve(map, {x:0,y:0}, {x:4,y:4}));

  map = [[true, true, true, false, true],
    [false, false, true, false, true],
    [true, true, true, true, true],
    [true, false, true, false, false],
    [false, true, true, true, true]];

  // ['down', 'down', 'right', 'right', 'right', 'right', 'down', 'down']
  console.log(solve(map, {x:0,y:0}, {x:4,y:4}));
