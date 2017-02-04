// http://www.geeksforgeeks.org/find-last-digit-of-ab-for-large-numbers/
//http://qa.geeksforgeeks.org/1061/given-big-number-form-string-how-do-take-mod-of-that-big-number

var asciiZero = "0".charCodeAt(0);
var findModulo = function(base, exponent) {
  var mod = 0;
  for (var i in exponent) {
    //mod = (mod*10 + b[i] - '0')%a;
    mod = (mod * 10 + exponent.charCodeAt(i) - asciiZero) % base;
  }
  return mod;
}

var lastDigit = function(str1, str2){

  if (str1.length === 1 && str2.length === 1 && str1 === "0" && str2 === "0") {
    return 0;
  }
  
  if (str2.length === 1 && str2 === "0") {
    return 1;
  }
  
  if (str1.length === 1 && str1 === "0") {
    return 0;
  }

  var e = findModulo(4, str2);
  if (e === 0) {
    e = 4;
  }

  var res = Math.pow(str1[str1.length - 1].charCodeAt(0) - asciiZero, e);
  
  // Return last digit of result
  return res % 10;
}