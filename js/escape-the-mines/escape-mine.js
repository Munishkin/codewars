function solve(mineMap, miner, exit) {
  // TODO
  const UP = 'up';
  const DOWN =  'down';
  const RIGHT = 'right';
  const LEFT = 'left';

  // find the dimensions of the map
  const NUM_ROW = mineMap.length;
  const NUM_COL = mineMap[0].length;

  console.log(`num rows: ${NUM_ROW}, num cols: ${NUM_COL}`);

  let initial = {
    pos: { x: miner.x, y: miner.y },
    path: []
  }
  let routeQueue = [initial];
  // find the position of up, down, right, down
  // discard the path if the next move is not valid
  // discard the path if the next move hits a wall
  // if the next move is exit, push the next move in path and return it
  // if the next move is not exit but next move is open, push it to path
  // push to queue

  // if route queue is eventually empty, return null
  let newX;
  let newY;

  let isValidMove = (x, y, mineMap) => {
    console.log (`newX: ${newX}, newY: ${newY}`);
    return  (newX >= 0 && newX < NUM_COL &&
        newY >= 0 && numY < NUM_ROW &&
        mineMap[newX][newY] === true);
  };

  while (routeQueue.length > 0) {
    let { pos, path } = routeQueue.shift()
    console.log(pos);
    console.log(path);
    if (pos.x === exit.x && pos.y === exit.y) {
      return path;
    }

    let clonedPath = JSON.parse(JSON.stringify(path));

    // derive up position
    newX = { x: pos.x, y: pos.y - 1 };
    newY = pos.y - 1;
    if (isValidMove(newX, newY, mineMap)) {
      let newPos = {}
    }

    // derive down position
    newX = pos.x;
    newY = pos.y + 1;

    // derive left position
    newX = pos.x - 1;
    newY = pos.y;

    // derive right position
    newX = pos.x + 1;
    newY = pos.y;

  }


  return [];
}


var map = [[true]];

// return [];
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
