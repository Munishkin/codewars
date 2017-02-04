var maxSequence = function(arr){
  
  let isAllNegative = arr.every((e) => e < 0);
  if (arr.length === 0 || isAllNegative) {
    return 0;
  }
  let isAllPositive = arr.every((e) => e > 0);
  if (isAllPositive) {
    return arr.reduce((a,b) => { return a + b }, 0);
  }
  
  // solve it with dynamic programming
  // [i,j] = sub array sum from positive i to j
  subSumArray = [];
  arr.forEach(() => {
    // push array of 0 to 2-d array
    subSumArray.push(arr.map(() => { return 0;}));
  });

  let maxSum = Number.MIN_VALUE;
  for (let i = 0; i < arr.length; i++) {
    subSumArray[i][i] = arr[i];
    for (let j = i+1; j < arr.length; j++) {
        subSumArray[i][j] = subSumArray[i][j-1] + arr[j];
     }
     maxSum = Math.max(maxSum, Math.max.apply(null, subSumArray[i]));
  }
  return maxSum;
}