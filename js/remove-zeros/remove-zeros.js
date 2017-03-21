function removeZeros(array) {
  // Sort "array" so that all elements with the value of zero are moved to the
  // end of the array, while the other elements maintain order.
  // [0, 1, 2, 0, 3] --> [1, 2, 3, 0, 0]
  // Zero elements also maintain order in which they occurred.
  // [0, "0", 1, 2, 3] --> [1, 2, 3, 0, "0"]
  
  // Do not use any temporary arrays or objects. Additionally, you're not able
  // to use any Array or Object prototype methods such as .shift(), .push(), etc
  
  // the correctly sorted array should be returned.
  
  // set last zero position to array.length
  // count number of zeros in the array list
  // search from end of array to front
  // if array[i] is non-zero, do nothing
  // if array[i] is zero,  
  //	copy array[i] to temporary variable
  //	shift array[i+1] to array[last zero position - 1] to 1 position left
  //	assign temporary variable to the unoccupied slot
  //	update last zero position
  //	decrement number of zeros to move by 1
  //	if array[i] is not zero, repeat the process for the array[i-1]. 
  //	Repeat the process for array[i] again
  // terminates when i < 0 or number of zeros to move is 0
  
  let lastZeroPos = array.length;
  let zeroCount = 0;  
  for (let j = 0; j < array.length; j++) {
    if (array[j] === '0' || array[j] === 0) {
      zeroCount += 1;
    }
  }
  for (let i = array.length - 1; i >= 0 && zeroCount > 0; i--) {    
    if (array[i] === 0 || array[i] === '0') {
      const temp = array[i];  
      let hasSwap = false;  
      for (let j = i+1; j < lastZeroPos; j++) {
          hasSwap = true;
          array[j-1] = array[j];
      }
      array[lastZeroPos - 1] = temp;  
      lastZeroPos--;
      zeroCount--;
      
      // find the next zero
      if (hasSwap && (array[i] === 0 || array[i] === '0')) { i++; }
    }
  }
  return array;
}

var input = [7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14],
    solution = [7, 2, 3, 4, 6, 13, 78, 19, 14, 0, 0, 0, 0, 0, 0];

console.log (JSON.stringify(removeZeros(input)) === JSON.stringify(solution));
console.log (JSON.stringify(removeZeros( [0, "0", 1, 2, 3])) === JSON.stringify([1, 2, 3, 0, "0"]));
console.log (JSON.stringify(removeZeros([ 1, null, '5', '2', 8, 6, null, 0, '0', false ])) === JSON.stringify([1,null,"5","2",8,6,null,false,0,'0']));
console.log (JSON.stringify(removeZeros([ 1, '0', '0', 0, '0' ])) === JSON.stringify([1,"0","0",0,'0']));
console.log (JSON.stringify(removeZeros([ 1, 2, 52, 7, '3', 1, '0', 0, 0, '0' ])) === JSON.stringify([1,2,52,7,"3",1,"0",0,0,'0']));
console.log (JSON.stringify(removeZeros([ 1, 0, 2, 0, 3, 0 ])) === JSON.stringify([1,2,3,0,0,0]))
console.log (JSON.stringify(removeZeros( [ 0, 9, 0, 0, 0, 0, 0, 0, 9, 0 ])) === JSON.stringify( [ 9, 9, 0, 0, 0, 0, 0, 0, 0, 0 ]))
