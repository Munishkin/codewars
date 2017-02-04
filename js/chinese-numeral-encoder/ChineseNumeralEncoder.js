function toChineseNumeral(num){
  var numerals = {
    "-":"负",
    ".":"点",
    0:"零",
    1:"一",
    2:"二",
    3:"三",
    4:"四",
    5:"五",
    6:"六",
    7:"七",
    8:"八",
    9:"九",
    10:"十",
    100:"百",
    1000:"千",
    10000:"万"
  };
  
  var result = '';
  var strNum = '' + num;
  var strFraction = '';
  var idx = strNum.indexOf('.');
  if (idx >= 0) {
     strFraction = strNum.substring(idx);
     strNum = strNum.substring(0, idx);
  }
  
  if (num < 0) {
    result += numerals['-'];
    strNum = strNum.substring(1);
  }
  
  var intNum = parseInt(strNum);
  if (intNum < 1) {
    result += numerals['0'];
  } else if (intNum >= 10 && intNum <= 19) {
    result += numerals['10'] + (intNum % 10 === 0 ? '' : numerals[intNum  % 10]);
  } else {
    var num10000 = Math.floor(intNum / 10000);
    intNum = intNum - num10000 * 10000; 
    var num1000 = Math.floor(intNum / 1000);
    intNum = intNum - num1000 * 1000;
    var num100 = Math.floor(intNum / 100);
    intNum = intNum - num100 * 100;
    var num10 = Math.floor(intNum / 10);
    intNum = intNum - num10 * 10;
    var numDigit = intNum;
    
    var encodeValues = [];   
    encodeValues.push({ val: num10000, multiplier: numerals['10000'] });
    encodeValues.push({ val: num1000, multiplier: numerals['1000'] });
    encodeValues.push({ val: num100, multiplier: numerals['100'] });
    encodeValues.push({ val: num10, multiplier: numerals['10'] });
    encodeValues.push({ val: numDigit, multiplier: '' });
  
    var groupZeroFound = false;
    var strSignificant = '';
    
    result += encodeValues.reduce((a, b) => {
      console.log(b);
      if (b.val > 0) {
        if (groupZeroFound) {
          a += numerals['0'];
          groupZeroFound = false;
        }
        a += numerals[b.val] + b.multiplier;
        strSignificant += b.val;
      } else {
        if (parseInt(strSignificant) > 0) {
          groupZeroFound = true;
        }
      }
      return a;
    }, '');
  }
  for (var i in strFraction) {
    result += numerals[strFraction[i]];
  }
  return result;
}