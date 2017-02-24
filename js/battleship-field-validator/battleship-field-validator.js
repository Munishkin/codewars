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
  let visited = [];
  let component = {};
  let queue = [];

  for (let i = 0; i < 10; i++) {
    visited.push([]);
    for (let j = 0; j < 10; j++) {
      visited[i].push(false);
    }
  }
  //console.log(visited);

  // key is label, value is an array of 2d points
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let p = {r: i, c: j};
      queue.push(p);
      let components = [];
      while (queue.length > 0) {
        let comp = queue.shift();
        let {r, c} = comp;
        if (r >= 0 && r < 10 && c >= 0 && c < 10) {
          if (field[r][c] === 0) { visited[r][c] = true; }
          else {
            if (!visited[r][c]) {
              visited[r][c] = true;
              components.push(comp);
              // find neighbors and push to queue to explore
              let neighbors = [
                {r: r - 1, c: c}, {r: r + 1, c: c},
                {r: r, c: c - 1}, {r: r, c: c + 1},
                {r: r - 1, c: c - 1}, {r: r - 1, c: c + 1},
                {r: r + 1, c: c - 1}, {r: r + 1, c: c + 1}
              ];
              queue = queue.concat(neighbors);
            }
          }
        }
      }
      if (components.length > 0) {
        component[label++] = components;
      }
    }
  }
  console.log(component);

  //From there, you just need to iterate over each blob and check that it's
  // either a vertical or horizontal line.
  let isVerticalOrHorizontal = (components) => {
    // is vertical, same c and different r
    let row = components[0].r;
    let col = components[0].c;

    components.every((c) = > { })

    // is horizontal, same r and different c

    return true;
  };

  // Finally, check that you have the correct number of each ship type.
  // If you don't, then the field is invalid. If you do, the field is valid,
  // and you're done.

  // check if single battleship (size of 4 cells)

  // check for 2 cruisers (size of 3 cells)

  // check for 3 destroyers (size of 2 cells)

  // check for 4 submarines (size of 1 cell)
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
