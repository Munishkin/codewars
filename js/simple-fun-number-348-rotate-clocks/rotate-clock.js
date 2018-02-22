const parseClocks = (clocks) => {
  const lines = clocks.split('\n');
  let rowIdx = 0;
  let handPos = [];
  while (rowIdx < 17) {
    let colIdx = 0;
    //const handPosRow = [];
    while (colIdx < 39) {
      if (lines[rowIdx+1][colIdx+4] === '|') {
        handPos.push(0);
      } else if (lines[rowIdx+2][colIdx+1] === '-') {
        handPos.push(9);
      } else if (lines[rowIdx+2][colIdx+5] === '-') {
        handPos.push(3);
      } else if (lines[rowIdx+3][colIdx+4] === '|') {
        handPos.push(6);
      }
      colIdx += 13;
    }
    rowIdx += 6;
  }
  return handPos;
}

const rotateClocks = (clocks,turns) => {
  const handPos = parseClocks(clocks);
  const methodCalls = {
    1: [0, 1, 2],
    2: [6, 7, 8],
    3: [0, 3, 6],
    4: [2, 5, 8],
    5: [0, 1, 3, 4],
    6: [1, 2, 4, 5],
    7: [3, 4, 6, 7],
    8: [4, 5, 7, 8],
    9: [1, 3, 4, 5, 7]
  };

  turns.forEach(t => {
      methodCalls[t].forEach(i => handPos[i] = (handPos[i] + 3) % 12);
  });

  const nestedHandPos = [ handPos.slice(0, 3), handPos.slice(3, 6), handPos.slice(6, 9)];
  let newHands = [
'+-------+    +-------+    +-------+',
'|       |    |       |    |       |',
'|   O   |    |   O   |    |   O   |',
'|       |    |       |    |       |',
'+-------+    +-------+    +-------+',
'                                   ',
'+-------+    +-------+    +-------+',
'|       |    |       |    |       |',
'|   O   |    |   O   |    |   O   |',
'|       |    |       |    |       |',
'+-------+    +-------+    +-------+',
'                                   ',
'+-------+    +-------+    +-------+',
'|       |    |       |    |       |',
'|   O   |    |   O   |    |   O   |',
'|       |    |       |    |       |',
'+-------+    +-------+    +-------+'
];

  const drawHand = (initClock, h, rowIdx, colIdx) => {
    let row = null;
    if (h === 0) {
      row = initClock[rowIdx+1];
      initClock[rowIdx+1] = `${row.substring(0, colIdx + 4)}|${row.substring(colIdx + 5)}`;
    } else if (h === 9) {
      row = initClock[rowIdx+2];
      initClock[rowIdx+2] = `${row.substring(0, colIdx + 1)}---${row.substring(colIdx + 4)}`;
    } else if (h === 3) {
      row = initClock[rowIdx+2];
      initClock[rowIdx+2] = `${row.substring(0, colIdx + 5)}---${row.substring(colIdx + 8)}`;
    } else if (h === 6) {
      row = initClock[rowIdx+3];
      initClock[rowIdx+3] = `${row.substring(0, colIdx + 4)}|${row.substring(colIdx + 5)}`;
    }
  };

  nestedHandPos.forEach(([a,b,c], i) => {
    console.log(i);
    drawHand(newHands, a, 6 * i, 0);
    drawHand(newHands, b, 6 * i, 13);
    drawHand(newHands, c, 6 * i, 26);
  })

  return newHands.join('\n');
}

const clocks1 =
`+-------+    +-------+    +-------+
|       |    |       |    |   |   |
|---O   |    |---O   |    |   O   |
|       |    |       |    |       |
+-------+    +-------+    +-------+

+-------+    +-------+    +-------+
|       |    |       |    |       |
|   O   |    |   O   |    |   O   |
|   |   |    |   |   |    |   |   |
+-------+    +-------+    +-------+

+-------+    +-------+    +-------+
|       |    |       |    |       |
|   O   |    |   O---|    |   O   |
|   |   |    |       |    |   |   |
+-------+    +-------+    +-------+`;

const clocks2 =
`+-------+    +-------+    +-------+
|       |    |       |    |   |   |
|---O   |    |---O   |    |   O   |
|       |    |       |    |       |
+-------+    +-------+    +-------+

+-------+    +-------+    +-------+
|       |    |       |    |       |
|   O   |    |   O   |    |   O   |
|   |   |    |   |   |    |   |   |
+-------+    +-------+    +-------+

+-------+    +-------+    +-------+
|       |    |       |    |       |
|   O   |    |   O---|    |   O   |
|   |   |    |       |    |   |   |
+-------+    +-------+    +-------+`;


console.log(rotateClocks(clocks1, [3,9,2,8]));
console.log(rotateClocks(clocks2, [1,1,1,1]));
