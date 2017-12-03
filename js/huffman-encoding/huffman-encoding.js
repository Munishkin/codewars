// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
function frequencies(s) {
  if (s.length <= 1) {
    return null;
  } else {
    const freqTable = s.split('').reduce((acc, e) => {
          acc[e] = !acc[e] ? 1 : acc[e] + 1;
          return acc;
      }, {});

    return s.split('').reduce((acc, l) => {
          if (freqTable[l]) {
            acc.push([l, freqTable[l]]);
            delete freqTable[l];
          }
          return acc;
      }, []);
  }
}

function buildTree(freqs) {
  if (freqs == null || typeof freqs === 'undefined' || freqs.length <= 1) {
    return null;
  }

  let queue = JSON.parse(JSON.stringify(freqs))
                .sort((a,b) => b[1] - a[1]);
  while (queue.length !== 1) {
    const [right, left] = queue.splice(-2);
    const internalNode = [ `${left[0]}${right[0]}`, left[1] + right[1], left, right];
    queue.push(internalNode);
    queue = queue.sort((a,b) => {
              return b[1] - a[1];
            });
  }
  return queue[0];
}

// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs,s) {
  function findBit(bitTree, symbol) {
    // root node
    if (bitTree && bitTree.length === 3) {
      const [treeSymbol,, bit] = [...bitTree];
      return (treeSymbol === symbol) ? bit : null;
    } else {
      // internal node, has left and right nodes
      const [,,,left, right] = [...bitTree];
      const leftBitString = findBit(left, symbol);
      const rightBitString = findBit(right, symbol);
      return leftBitString ? leftBitString : rightBitString;
    }
  }

  function encodeTree(tree, bit = '') {
    // root node
    if (tree && tree.length === 2) {
      return [...tree, bit];
    } else {
      // internal node, has left and right nodes
      const [rootSymbol, freq, left, right] = [...tree];
      return [rootSymbol, freq, bit, encodeTree(left, `${bit}0`), encodeTree(right, `${bit}1`)];
    }
  }

  if (freqs == null || typeof freqs === 'undefined' || freqs.length <= 1) {
    return null;
  }
  const tree = buildTree(freqs);
  // encode the symbol in the tree
  const bitTree = encodeTree(tree);
  // find encoded value
  return s.split('')
    .reduce((acc, symbol) => {
        return acc + findBit(bitTree, symbol);
    }, '');
}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs,bits) {
  if (freqs == null || typeof freqs === 'undefined' || freqs.length <= 1) {
    return null;
  }
  return "";
}

const s = "aaaabcc";
const fs = frequencies(s);
//console.log(fs);
//console.log([...fs].sort());

console.log(encode(fs, 'aaaabcc'));
console.log(encode([ [ 'x', 2 ],
  [ '7', 1 ],
  [ '1', 1 ],
  [ 'n', 1 ],
  [ '8', 1 ],
  [ 't', 1 ],
  [ 'z', 2 ],
  [ 'p', 1 ],
  [ '6', 1 ],
  [ '9', 3 ],
  [ '2', 1 ],
  [ 'o', 1 ],
  [ 's', 1 ],
  [ 'k', 1 ] ] , 'x71n8tzp692ozxs9k9'))

// describe("example tests", ()=>{
//   const s = "aaaabcc";
//   const fs = frequencies(s);
//   Test.assertDeepEquals( [...fs].sort(), [ ["a",4], ["b",1], ["c",2] ] );
//   Test.assertEquals( encode( fs, s ).length, 10 );
//   Test.assertEquals( encode( fs, "" ), "" );
//   Test.assertEquals( decode( fs, "" ), "" );
// });
//
// describe("error handling", ()=>{
//   Test.assertEquals( encode( [], "" ), null );
//   Test.assertEquals( decode( [], "" ), null );
//   Test.assertEquals( encode( [ ["a",1] ], "" ), null );
//   Test.assertEquals( decode( [ ["a",1] ], "" ), null );
// });
