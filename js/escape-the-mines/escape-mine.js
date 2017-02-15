function solve(mineMap, miner, exit) {
  const UP = 'up';
  const DOWN =  'down';
  const RIGHT = 'right';
  const LEFT = 'left';

  // find the dimensions of the map
  const NUM_ROW = mineMap.length;
  const NUM_COL = mineMap[0].length;

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

  let isValidMove = (move) => {
    return  (move.x >= 0 && move.x < NUM_ROW &&
        move.y >= 0 && move.y < NUM_COL &&
        mineMap[move.x][move.y] === true);
  };

  let makeNextStop = (move, path, direction) => {
    let clonedPath = JSON.parse(JSON.stringify(path));
    if (isValidMove(move)) {
      clonedPath.push(direction);
      return { pos: move, path: clonedPath };
    }
    return null;
  }

  while (routeQueue.length > 0) {
    let { pos, path } = routeQueue.shift()
    if (pos.x === exit.x && pos.y === exit.y) {
      return path;
    }

    // derive left position
    let move = { x: pos.x, y: pos.y - 1 };
    let nextStop = makeNextStop(move, path, UP);
    if (nextStop) {
      routeQueue.push(nextStop);
    }

    // right
    move = { x: pos.x, y: pos.y + 1 };
    nextStop = makeNextStop(move, path, DOWN);
    if (nextStop) {
      routeQueue.push(nextStop);
    }

    // up
    move = { x: pos.x - 1, y: pos.y };
    nextStop = makeNextStop(move, path, LEFT);
    if (nextStop) {
      routeQueue.push(nextStop);
    }

    // down
    move = { x: pos.x + 1, y: pos.y };
    nextStop = makeNextStop(move, path, RIGHT);
    if (nextStop) {
      routeQueue.push(nextStop);
    }
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
