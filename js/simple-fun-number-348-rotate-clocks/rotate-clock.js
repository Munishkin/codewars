const parseClocks = (clocks) => {
  const lines = clocks.split('\n');
  let rowIdx = 0;
  let handPos = [];
  while (rowIdx < 17) {
    let colIdx = 0;
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
  let noHands = [
'+-------+    +-------+    +-------+',
'|       |    |       |    |       |',
'|   O   |    |   O   |    |   O   |',
'|       |    |       |    |       |',
'+-------+    +-------+    +-------+'
];

  const drawHand = (clocks, h, colIdx) => {
    if (h === 0) {
      clocks[1] = `${clocks[1].substring(0, colIdx + 4)}|${clocks[1].substring(colIdx + 5)}`;
    } else if (h === 9) {
      clocks[2] = `${clocks[2].substring(0, colIdx + 1)}---${clocks[2].substring(colIdx + 4)}`;
    } else if (h === 3) {
      clocks[2] = `${clocks[2].substring(0, colIdx + 5)}---${clocks[2].substring(colIdx + 8)}`;
    } else if (h === 6) {
      clocks[3] = `${clocks[3].substring(0, colIdx + 4)}|${clocks[3].substring(colIdx + 5)}`;
    }
    return clocks;
  };

  let results = [];
  nestedHandPos.forEach(([a,b,c], i) => {
    let newHands = JSON.parse(JSON.stringify(noHands));
    drawHand(newHands, a, 0);
    drawHand(newHands, b, 13);
    drawHand(newHands, c, 26);
    if (i < nestedHandPos.length - 1) {
      newHands.push('                                   ');
    }
    results = results.concat(newHands);
  })

  return results.join('\n');
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
