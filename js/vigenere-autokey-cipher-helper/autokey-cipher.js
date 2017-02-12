// http://www.dcode.fr/autoclave-cipher
function VigenèreAutokeyCipher(key, abc) {
  
  this.encode = function (str) {
      if (str == null || typeof str === 'undefined') {
        return '';
      }
      
      let encodeStr = '';      
      let i = 0, j = 0;  
      while (i < key.length && j < str.length) {
        if (abc.indexOf(str[j]) < 0) {
          encodeStr += str[j];
        } else {
          encodeStr += abc[(abc.indexOf(key[i++]) + abc.indexOf(str[j])) % abc.length]    
        } 
        j += 1;       
      }
                
      if (i === key.length) {
        i = 0;
        while (j < str.length) {
          if (abc.indexOf(str[j]) < 0) {
            encodeStr += str[j];
          } else {
            while (abc.indexOf(str[i]) < 0) { i += 1; }
            encodeStr += abc[(abc.indexOf(str[i++]) + abc.indexOf(str[j])) % abc.length]    
          } 
          j += 1;
        }
      }
      return encodeStr;  
  };
    
  this.decode = function (str) {
    if (str == null || typeof str === 'undefined') {
      return '';
    }
    
    let i = 0, j = 0, decodeStr = '';
    
    // use key to decipher to plain text
    // if string is longer than key, use plain text as key to decipher remaining
    // decrypted text 
    while (j < key.length && i < str.length) {
      decodeStr += (abc.indexOf(str[i]) < 0) ? str[i] :
              abc[(abc.indexOf(str[i]) + abc.length - abc.indexOf(key[j++])) % abc.length]          
      i += 1;
    }
    
    // resume decrpytion from str[i] to the last character
    if (j === key.length) {
      j = 0;
      for (let k = i; k < str.length; k++) {
        if (abc.indexOf(str[k]) < 0) {
          decodeStr += str[k];
        } else {
          // find the plain text character that is in the alphabet
          while (abc.indexOf(decodeStr[j]) < 0) { j+=1; }
          decodeStr += abc[(abc.indexOf(str[k]) + abc.length - 
                abc.indexOf(decodeStr[j++])) % abc.length];
        }
      }      
    }
    return decodeStr;
  };
}



let abc0 = 'abcdefghijklmnopqrstuvwxyz';
let key0 = 'password';
let c1 = new VigenèreAutokeyCipher(key0, abc0);
console.log(c1.encode("it's a shift cipher!") === "xt'k s ovzib vapzlz!");

let key = 'PASSWORD';
let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let c = new VigenèreAutokeyCipher(key, abc);
console.log(c.encode('AAAAAAAAPASSWORDAAAAAAAA') === 'PASSWORDPASSWORDPASSWORD');
console.log(c.decode('PASSWORDPASSWORDPASSWORD') === 'AAAAAAAAPASSWORDAAAAAAAA');

let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let key1 = 'password';

// creates a cipher helper with each letter substituted
// by the corresponding character in the key
let d = new VigenèreAutokeyCipher(key1, alphabet);

console.log(d.encode('codewars') === 'rovwsoiv'); // returns 'rovwsoiv'
console.log(d.decode('laxxhsj') === 'waffles'); // returns 'waffles'

// returns 'pmsrebxoy rev lvynmylatcwu dkvzyxi bjbswwaib'
console.log(d.encode('amazingly few discotheques provide jukeboxes') === 'pmsrebxoy rev lvynmylatcwu dkvzyxi bjbswwaib');

// returns 'amazingly few discotheques provide jukeboxes'
console.log(d.decode('pmsrebxoy rev lvynmylatcwu dkvzyxi bjbswwaib') === 'amazingly few discotheques provide jukeboxes');
