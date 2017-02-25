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

// http://stackoverflow.com/questions/7501344/how-to-validate-battleship-field

function validateBattlefield(field) {

  // validate ship does not in contact by edge

  // Now, you need to verify that you have exactly the correct number of each
  // type of ship, and that ships do not touch. You can do this through
  // connected component analysis. The simple two-pass algorithm will do here
  // (there's pseudo-code and examples for you in the link).
  // This will give you the size, location and shape of each "blob" in your field.
  // https://en.wikipedia.org/wiki/Connected-component_labeling

  // one componet at a time
  let label = 0;
  let component = [];
  let queue = [];
  let components = null;

  const SIZE = 10;

  let visited = [];
  for (let i = 0; i < SIZE; i++) {
    visited.push([]);
    for (let j = 0; j < SIZE; j++) {
      visited[i].push(false);
    }
  }

  let hasOverlapOrContact = (components) => {
    // is vertical or horizontal
    return !(components.every((p) => { return p.r === components[0].r })
      || components.every((p) => { return p.c === components[0].c }));
  };

  let generateNeighbors = (r, c) => {
    let offsets = [ [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1] ];
    return offsets.reduce((acc, offset) => {
      let neighbor_r = r + offset[0];
      let neighbor_c = c + offset[1];
      if (neighbor_r >= 0 && neighbor_r < SIZE && neighbor_c >= 0 && neighbor_c < SIZE) {
        acc.push ({r: neighbor_r, c: neighbor_c });
      }
      return acc;
    }, []);
  };

  let hasCorrectNumShip = (components, size, expectedNumShip) => {
      return components.filter((c) => { return c.length === size })
        .length === expectedNumShip;
  };

  // key is label, value is an array of 2d points
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      queue.push({r: i, c: j});
      components = [];
      while (queue.length > 0) {
        let {r, c} = queue.shift();
        if (field[r][c] === 1 && !visited[r][c]) {
          visited[r][c] = true;
          components.push({r, c});
          // find neighbors and push to queue to explore
          queue = queue.concat(generateNeighbors(r, c));
        }
      }
      if (components.length > 0) { component.push(components); }
    }
  }

  let wrongShape = component.some((c) => { return hasOverlapOrContact(c); });
  if (!wrongShape) {
    // Finally, check that you have the correct number of each ship type.
    // If you don't, then the field is invalid. If you do, the field is valid,
    // and you're done.

    // check if single battleship (size of 4 cells)
    // check for 2 cruisers (size of 3 cells)
    // check for 3 destroyers (size of 2 cells)
    // check for 4 submarines (size of 1 cell)
    return hasCorrectNumShip(component, 4, 1) &&
            hasCorrectNumShip(component, 3, 2) &&
            hasCorrectNumShip(component, 2, 3) &&
            hasCorrectNumShip(component, 1, 4);
  }
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
