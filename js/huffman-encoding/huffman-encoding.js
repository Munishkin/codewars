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
    queue = queue.sort((a,b) => b[1] - a[1]);
  }
  return queue[0];
}

// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs,s) {
  function findBit(bitTree, symbol) {
    const [treeSymbol,, bit, left = null, right = null] = [...bitTree];
    if (left == null && right == null) {
      return (treeSymbol === symbol) ? bit : null;
    }
    const leftBitString = findBit(left, symbol);
    const rightBitString = findBit(right, symbol);
    return leftBitString ? leftBitString : rightBitString;
  }

  function encodeTree(tree, bit = '') {
    const [rootSymbol, freq, left = null, right = null] = [...tree];
    return  (left == null && right == null) ? [rootSymbol, freq, bit] :
      [rootSymbol, freq, bit, encodeTree(left, `${bit}0`), encodeTree(right, `${bit}1`)];
  }

  if (freqs == null || typeof freqs === 'undefined' || freqs.length <= 1) {
    return null;
  }
  // encode the symbol in the tree
  const bitTree = encodeTree(buildTree(freqs));
  // find encoded value
  return s.split('')
    .reduce((acc, symbol) => acc + findBit(bitTree, symbol), '');
}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs,bits) {
  if (freqs == null || typeof freqs === 'undefined' || freqs.length <= 1) {
    return null;
  }
  // The tree look liks this ['rootSymbol', 'root freq', left node (bit 0), right node (bit 1)]
  const tree = buildTree(freqs);
  let i = 0;
  let decodedValue = '';
  let tempRoot = tree;
  while (i <= bits.length) {
    const [symbol,, left = null, right = null] = tempRoot;
    if (left == null && right == null) {
      decodedValue += symbol;
      tempRoot = tree;
    } else {
      if (bits[i] == 0) {
        tempRoot = left;
      } else {
        tempRoot = right;
      }
      i++;
    }
  }
  return decodedValue;
}

const s = "aaaabcc";
const fs = frequencies(s);
console.log(fs);
console.log([...fs].sort());

console.log(encode(fs, 'aaaabcc'));
console.log(decode(fs, '1111000101'));
