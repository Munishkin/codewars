decodeMorse = function(morseCode){
  var decodeString = '';
  var morseCodeWords = morseCode.split('   ');
  for (var i in morseCodeWords) {
    var morseCodeArray = morseCodeWords[i].split(' ');
    for (var j in morseCodeArray) {
      if (MORSE_CODE[morseCodeArray[j]] !== undefined) {
        decodeString += MORSE_CODE[morseCodeArray[j]];
      }
    }
    decodeString += ' ';
  }
  decodeString = decodeString.trim();  
  return decodeString;
}