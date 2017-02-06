function pickPeaks(arr){
  
  let pos = [];
  let peaks = [];
  let sign = [''];
  
  const INCREASE = '+';
  const DECREASE = '-';
  const SAME = '0';
  
  
  // initialize sign array
  // for each i, i+1, compare arr[i] and arr[i+1]
  // if arr[i+1] > a[i], push + to sign array
  // if arr[i+1] < a[i], push - to sign array
  // push 0 because arr[i+1] = arr[i]
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i+1]) {
      sign.push(INCREASE);
    } else if (arr[i] > arr[i+1]) {
      sign.push(DECREASE);
    } else {
      sign.push(SAME);
    }
  }
  console.log(sign);
  
  
  // detect change from non-decreasing slope to non-increasing slope
  // insert postion = pos arraylist
  // insert value to peaks arraylist
  let result = sign.reduce((acc, e, i, arr1) => {
    //console.log(`${e}, ${i}`);
    //console.log(arr)
    if (i > 0 && i < arr1.length - 1 && arr1[i] === '+' && arr1[i+1] === '-') {
      acc.pos.push(i);
      acc.peaks.push(arr[i]);
    }
    return acc;
  },{ pos:[], peaks:[]});
  
  // check plateau case
  
  
  return result;
}




console.log(pickPeaks([0,1,2,5,1,0])) // {pos: [3], peaks: [5]}
console.log(pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]))  //returns {pos:[3,7],peaks:[6,3]}
console.log(pickPeaks([1,2,2,2,1]))  // returns {pos: [1], peaks:[2]}
console.log(pickPeaks([1,2,2,2,3]))  // returns {pos: [], peaks:[]}
