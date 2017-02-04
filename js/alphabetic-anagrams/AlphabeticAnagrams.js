// http://stackoverflow.com/questions/5131497/find-the-index-of-a-given-permutation-in-the-sorted-list-of-the-permutations-of
// http://stackoverflow.com/questions/18644470/anagram-index-calculation/18646156#18646156
var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
} 

function calNumAnagram(word, proposedWord, frequencies, alphabet) {
  var denom = 1;
  var factRemainAlphabet = factorial(word.length - proposedWord.length);            
  for (var k1 in frequencies) {
    if (k1 !== alphabet) {
      denom = denom * factorial(frequencies[k1]);
    } else {
      denom = denom * factorial(frequencies[k1] - 1);
    }
  }
  return Math.floor(factRemainAlphabet / denom); 
}

function listPosition(word) {
  // Return the anagram list position of the word
  // sort the distinct alphabet in ascending order
  // count the frequency of each alphabet  
  var frequencies =  {};
  var alphabetArray = [];
  for (var i = 0; i < word.length; i++) {
    if (alphabetArray.indexOf(word[i]) < 0) {
      alphabetArray.push(word[i]);
    }
    if (frequencies[word[i]]) {
      frequencies[word[i]] += 1;
    } else {
      frequencies[word[i]] = 1;
    }
  }
  alphabetArray.sort();
  var matchedWord = '';
  var totalAnagram = 0;
  
  while (matchedWord !== word) {
    for (var z = 0; z < alphabetArray.length; z++) {
      var alphabet = alphabetArray[z];      
      if (frequencies[alphabet] > 0) {
        var proposedWord = matchedWord + alphabet;
        var idx = word.indexOf(proposedWord);
        if (idx === 0) {
          // matched, reduce count and update matched word
          frequencies[alphabet] -= 1; 
          matchedWord += alphabet;
          break;
        } else {
          // calculate number of words that need to form
          totalAnagram += calNumAnagram(word, proposedWord, frequencies, alphabet);        
        }
      }
    }
  }
  return totalAnagram + 1;
}