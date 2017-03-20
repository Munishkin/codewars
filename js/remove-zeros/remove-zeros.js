function removeZeros(array) {
  // Sort "array" so that all elements with the value of zero are moved to the
  // end of the array, while the other elements maintain order.
  // [0, 1, 2, 0, 3] --> [1, 2, 3, 0, 0]
  // Zero elements also maintain order in which they occurred.
  // [0, "0", 1, 2, 3] --> [1, 2, 3, 0, "0"]
  
  // Do not use any temporary arrays or objects. Additionally, you're not able
  // to use any Array or Object prototype methods such as .shift(), .push(), etc
  
  // the correctly sorted array should be returned.
  
  // for each element, 
  //  if it is not zero, ignore and go to the next elements
  //  if it is zero, visit subsequent until a non-zero eleement is found
  //  swap both element and record the new position of the zero element
  //  repeat the process with the next element until the end of array is reached
  
  let i = 0;
  while (i < array.length) {
    if (array[i] == 0) {
      let zeroPos = i;
      let j = zeroPos + 1;
      while (j < array.length) {
        if (array[j] != 0) {
          let temp = array[j];
          array[j] = array[zeroPos];
          array[zeroPos] = temp;
          zeroPos = j;
        }
        j += 1;
      }
      console.log(array);
    }
    i++;
  }
  console.log(array);
  return array;
}


var input = [7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14],
    solution = [7, 2, 3, 4, 6, 13, 78, 19, 14, 0, 0, 0, 0, 0, 0];

console.log (JSON.stringify(removeZeros(input)) === JSON.stringify(solution));
console.log (JSON.stringify(removeZeros( [0, "0", 1, 2, 3])) === JSON.stringify([1, 2, 3, 0, "0"]));
