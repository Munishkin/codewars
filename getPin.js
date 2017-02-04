function getPINsHelper(observed) {
  
  let adjacentPins = {
    '1': ['1','2','4'],
    '2': ['1','2','3','5'],
    '3': ['2','3','6'],
    '4': ['1','4','5','7'],
    '5': ['2','4','5','6','8'],
    '6': ['3','5','6','9'],
    '7': ['4','7','8'],
    '8': ['5','7','8','9','0'],
    '9': ['6','8','9'],
    '0': ['0', '8']
  };
  
  if (observed.length === 1) {
    return adjacentPins[observed];
  } 
  
  let allPins = [];
  let subPins = getPINsHelper(observed.substring(1));
  adjacentPins[observed[0]].forEach((p) => {
    allPins = allPins.concat(subPins.reduce((acc, sp) => {
        acc.push(p + sp);
        return acc;
    }, []));
  });
  return allPins;  
}

function getPINs(observed) {
//  return [observed].concat(getPINsHelper(observed));
//  return getPINsHelper(observed);
  let adjacentPins = {
    '1': ['1','2','4'],
    '2': ['1','2','3','5'],
    '3': ['2','3','6'],
    '4': ['1','4','5','7'],
    '5': ['2','4','5','6','8'],
    '6': ['3','5','6','9'],
    '7': ['4','7','8'],
    '8': ['5','7','8','9','0'],
    '9': ['6','8','9'],
    '0': ['0', '8']
  };
  
  if (observed.length === 1) {
    return adjacentPins[observed];
  } 
  
  let allPins = [];
  let subPins = getPINs(observed.substring(1));
  adjacentPins[observed[0]].forEach((p) => {
    allPins = allPins.concat(subPins.reduce((acc, sp) => {
        acc.push(p + sp);
        return acc;
    }, []));
  });
  return allPins;  
}

console.log(getPINs('8'));
console.log(getPINs('11'));
console.log(getPINs('57'));   // 57. 24, 44, 64, 84, 28, 48, 68, 88
console.log(getPINs('369'));

[ '236',  '238',  '239',  '256',  '258','259',  '266','268','269',
  '296','298','299','336','338','339',
  '356','358','359','366','368', '369',
  '396',  '398','399','636','638','639',
  '656','658','659','666','668',
  '669','696','698','699' ]
