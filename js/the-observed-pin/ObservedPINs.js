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
