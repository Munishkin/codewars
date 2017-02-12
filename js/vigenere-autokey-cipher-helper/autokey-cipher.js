function VigenèreAutokeyCipher(key, abc) {
  
    this.encode = function (str) {
      if (str == null || typeof str === 'undefined') {
        return '';
      }
      
      let autokey = '';
      let i = 0, j = 0;  
      while (i < key.length && j < str.length) {
        if (abc.indexOf(str[j++]) >= 0) {
          autokey += key[i++];
        }        
      }
          
      if (i === key.length) {
        i = 0;
        while (j < str.length) {
          if (abc.indexOf(str[j++]) >= 0) {
            while (abc.indexOf(str[i]) < 0) { i += 1; }
            autokey += str[i++];                      
          } 
        }
      }
      
      let encodeStr = '';
      j = 0;
      for (let i = 0; i < str.length; i++) {
        encodeStr += (abc.indexOf(str[i]) < 0) ? str[i] :
                abc[(abc.indexOf(autokey[j++]) + abc.indexOf(str[i])) % abc.length]    
      }
      return encodeStr;  
  };
  
  this.decode = function (str) {
    //...
    if (str == null || typeof str === 'undefined') {
      return '';
    }
    
    let result = '';
    
    return result;
  };
}


let key = 'PASSWORD';
let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var c = new VigenèreAutokeyCipher(key, abc);
console.log(c.encode('AAAAAAAAPASSWORDAAAAAAAA') === 'PASSWORDPASSWORDPASSWORD');
//console.log(c.decode('PASSWORDPASSWORDPASSWORD') === 'AAAAAAAAPASSWORDAAAAAAAA');

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var key1 = 'password';

// creates a cipher helper with each letter substituted
// by the corresponding character in the key
var d = new VigenèreAutokeyCipher(key1, alphabet);

//d.encode ('my secret code i want to secure');
//key:     pa ssword myse c retc od eiwant)

console.log(d.encode('codewars') === 'rovwsoiv'); // returns 'rovwsoiv'
//d.decode('laxxhsj'); // returns 'waffles'

// returns 'pmsrebxoy rev lvynmylatcwu dkvzyxi bjbswwaib'
console.log(d.encode('amazingly few discotheques provide jukeboxes') === 'pmsrebxoy rev lvynmylatcwu dkvzyxi bjbswwaib');

// returns 'amazingly few discotheques provide jukeboxes'
//d.decode('pmsrebxoy rev lvynmylatcwu dkvzyxi bjbswwaib')
