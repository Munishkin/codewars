// http://www.cs.virginia.edu/kim/courses/cs3330/notes/ConvertingFP.pdf
// https://en.wikipedia.org/wiki/Single-precision_floating-point_format

var dec2Bin = function (wholeInt) {

  let binaryInt = '';
  while (wholeInt > 1) {
    let remainder = wholeInt % 2;
    binaryInt += remainder;
    wholeInt = Math.floor(wholeInt / 2);
  }  
  binaryInt += wholeInt;
  let origLength = binaryInt.length;
  if (binaryInt.length < 8) {
    for (var i = 0; i < 8 - origLength; i++) {
      binaryInt += '0';
    }
  }
  binaryInt = binaryInt.split('').reverse().join('');
  return binaryInt;  
}

var doubleStrFraction = function(strFraction) {
  let strDoubleFraction = '';
  let carryBit = 0;
  for (let i = strFraction.length - 1; i >= 0; i--) {
      if (strFraction[i] !== '.') {
        let digit = parseInt(strFraction[i]);
        digit = digit * 2 + carryBit;
        if (digit >= 10) {
          carryBit = 1;
          digit = digit - 10;
        } else {
          carryBit = 0;
        }
        strDoubleFraction += digit;
      } else {
        strDoubleFraction += strFraction[i];
      }
  }
  let result = strDoubleFraction.split('').reverse().join('');
  let binaryBit = result[0];
  let multipledFraction = '0' + result.substring(1);
  return [binaryBit, multipledFraction];
}

var findNonZeroDigit = function(strFraction) {
    return strFraction.split('').find(d => { return d !== '0' && d !== '.' });
}

var float2bin = function(input) {
  
  const fullLength = 32;
  const mantissa = 23;
  
  // This is not enough...
  let strInput = (typeof input == 'string') ? input : '' + input;
  let signBit = '0';
  if (strInput[0] === '-') {
    signBit = '1';
    strInput = strInput.substring(1);
  }
  
  // find decimal place
  let idx = strInput.indexOf('.');
 
 // derive whole integer part
 let strWholeInt = idx > 0 ? strInput.substring(0, idx) : (idx === 0 ? "0" : strInput);
 let wholeInt = parseInt(strWholeInt); 
 let binaryInt = dec2Bin(wholeInt);
 
 let maxIterations = -1;
 let isNonZeroInteger = findNonZeroDigit(binaryInt) != null;
 let canDecrementIteration = false;
 if (isNonZeroInteger) {
   maxIterations = mantissa;
   canDecrementIteration = true;
 } 
 
  // derive fractional part
  let strFraction = idx >= 0 ? '0' + strInput.substring(idx) : '';
  let binaryFraction = '';
  let binaryBit;
  let nonZeroDigit = findNonZeroDigit(strFraction);
  
  // multiply each digit by 2 and store carry digit. 
  // forward the carry digit to the next digit
  //let c = 0;
  if (strFraction !== '' && nonZeroDigit != null) {
    [binaryBit, strFraction] = doubleStrFraction(strFraction);
    binaryFraction += binaryBit;
    if (!isNonZeroInteger && binaryBit === '1') {
      maxIterations = mantissa;
      canDecrementIteration = true;
    }
    
    nonZeroDigit = findNonZeroDigit(strFraction);
    while (nonZeroDigit != null && maxIterations !== 0) {
      [binaryBit, strFraction] = doubleStrFraction(strFraction);
      binaryFraction += binaryBit;
      
      if (canDecrementIteration) {
        maxIterations -= 1;
      }      
      if (binaryBit === '1' && !canDecrementIteration) {
        maxIterations = mantissa;
        canDecrementIteration = true;
      }
      nonZeroDigit = findNonZeroDigit(strFraction);    
    }
  } 
    
  let floatInBin = binaryInt + (binaryFraction === '' ? '' : '.' + binaryFraction);  
  // find number of bit to shift such that the floating point number is in 1.xxxxx format
  idx = floatInBin.indexOf('.');
  if (idx < 0) {
    floatInBin += '.'
  }
  idx = floatInBin.indexOf('.');
  strWholeInt = floatInBin.substring(0, idx);
  
  let isZeroInteger = findNonZeroDigit(strWholeInt) == null;
  let lookupString = isZeroInteger? binaryFraction : strWholeInt;  
  let idxOfFirstOne = -1;
  for (var i = 0; i < lookupString.length; i++) {
    if (lookupString[i] === '1') {
      idxOfFirstOne = i;
      break;
    }
  }
  idxOfFirstOne += 1;
  let base = -idxOfFirstOne;
      
  let normalizedBin = '';
  if (!isZeroInteger) {
    base +=  idx;
    normalizedBin = strWholeInt.substring(idxOfFirstOne) + binaryFraction;
  } else {
    normalizedBin = binaryFraction.substring(idxOfFirstOne);
  }
   
  let biasedForm = 127 + base;
  let biasedBin = dec2Bin(biasedForm);
  let result = signBit + biasedBin + normalizedBin;
  
  // pad 0 if length of result is less than 32
  while (result.length < fullLength) {
    result += '0';
  } 
  
  if (result.length > fullLength) {
    result = result.substring(0, fullLength);
  } 
  return result;
} 
 