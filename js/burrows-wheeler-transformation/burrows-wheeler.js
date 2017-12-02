//
// Input: b a n a n a b a r
//
// b a n a n a b a r
// r b a n a n a b a
// a r b a n a n a b
// b a r b a n a n a
// a b a r b a n a n
// n a b a r b a n a
// a n a b a r b a n
// n a n a b a r b a
// a n a n a b a r b
//
//                '-'
// a b a r b a n a n
// a n a b a r b a n
// a n a n a b a r b
// a r b a n a n a b
// b a n a n a b a r <- 4
// b a r b a n a n a
// n a b a r b a n a
// n a n a b a r b a
// r b a n a n a b a
//                '-'
//
// Output: ("nnbbraaaa", 4)
//

function encode(s) {
  if (s == null || typeof s === 'undefined' || s === '') {
    return ['', -1];
  }
  const matrices = [s];
  for (let i = 0; i < s.length - 1; i++) {
    const nextTrans = `${matrices[0].slice(-1)}${matrices[0].slice(0, - 1)}`;
    matrices.unshift(nextTrans);
  }
  const sortedMatrices = matrices.sort();
  const encodedValue = sortedMatrices.map(t => t.slice(-1)).join('');
  const index = sortedMatrices.findIndex(t => t === s);
  return [encodedValue, index];
}

function decode(s,i) {
  if (s == null || typeof s === 'undefined' || s === '') {
    return '';
  }
  let invertList = s.split('').sort();
  for (let i = 0; i < s.length - 1; i++) {
    invertList = invertList.map((e, i) => {
        return `${s[i]}${e}`;
      }).sort();
  }
  return invertList[i];
}

let [str, i] = encode( "bananabar" );
console.log(str === 'nnbbraaaa');
console.log(i === 4);

const [str2, i2] = encode( "Humble Bundle" );
console.log(str2 === 'e emnllbduuHB');
console.log(i2 === 2);

const [str3, i3] = encode( "Mellow Yellow" );
console.log(str3 === 'ww MYeelllloo');
console.log(i3 === 1);

console.log(decode( "nnbbraaaa", 4 ) === 'bananabar');
console.log(decode( "e emnllbduuHB", 2 ) === 'Humble Bundle');
console.log(decode( "ww MYeelllloo", 1 ) === 'Mellow Yellow');
