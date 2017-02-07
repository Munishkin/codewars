function pickPeaks(arr){
  
  const INCREASE = '+';
  const DECREASE = '-';
  const SAME = '0';
    
  // initialize sign array
  // for each i, i+1, compare arr[i] and arr[i+1]
  // if arr[i+1] > a[i], push + to sign array
  // if arr[i+1] < a[i], push - to sign array
  // push 0 because arr[i+1] = arr[i]
  let sign = [''];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i+1]) {
      sign.push(INCREASE);
    } else if (arr[i] > arr[i+1]) {
      sign.push(DECREASE);
    } else {
      sign.push(SAME);
    }
  }

  let result = { pos:[], peaks:[]};
  // check plateau case
  let plateauStack = [];
  for (let i = 0; i < sign.length; i++) {
      if (sign[i] !== '-') {
        plateauStack.push(sign[i]);
      } else {
        // pop until a + is seen;
        let j = i-1;
        let token;
        while (plateauStack.length > 0 && (token = plateauStack.pop()) !== '+') {
          j -= 1;
        }
        if (token === '+') {
          result.pos.push(j);
          result.peaks.push(arr[j]);
          plateauStack = [];
        }
      }
  }  
  return result;
}




console.log(pickPeaks([0,1,2,5,1,0])) // {pos: [3], peaks: [5]}
console.log(pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]))  //returns {pos:[3,7],peaks:[6,3]}
console.log(pickPeaks([1,2,2,2,1]))  // returns {pos: [1], peaks:[2]}
console.log(pickPeaks([1,2,2,2,3]))  // returns {pos: [], peaks:[]}
