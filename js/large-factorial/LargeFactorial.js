// Sorry, I cheated. 
// Idea comes from http://www.geeksforgeeks.org/factorial-large-number/
function factorial(n){
  // Add some code
  if (n < 0) { return null; }
  
  var factArray = [1];
  var factSize = 1;
  var carry;
  var prod;
  var digit;
  for (var x = 2; x <= n; x++) {
    // multiply each digit
    carry = 0;
    for (var i = 0; i < factArray.length; i++) {
      prod = factArray[i] * x + carry;
      digit = prod % 10;
      carry = Math.floor(prod / 10);
      factArray[i] = digit;
      if (i === factArray.length - 1) {
        while (carry > 0) {
          digit = carry % 10;
          carry = Math.floor(carry / 10);
          factArray.push(digit);
        }
        break;
      } 
    }
  }  
  var strFactorial = '';
  for (var i = factArray.length - 1; i >= 0; i--) {
    strFactorial += ('' + factArray[i]);
  }
  return strFactorial;
}