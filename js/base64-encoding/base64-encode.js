//Extend the String object with toBase64() and fromBase64() functions
//https://en.wikipedia.org/wiki/Base64


// 3 ascii is converted to 4 base64 encoded bytes
//When the number of bytes to encode is not divisible by three (that is, if
//there are only one or two bytes of input for the last 24-bit block), then the
//following action is performed:

//Add extra bytes with value zero so there are three bytes, and perform the
//conversion to base64.

//If there is only one significant input byte (e.g., 'M'), all 8 bits will be
//captured in the first two base64 digits (12 bits).

// base64 index table
const INDEX_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BYTES_LEN = 24;
const BYTE_LEN = 8;
const ENCODE_64_LEN = 6;

String.prototype.toBase64 = function() {

  // loop the string
  // a) find the ascii value of each character, convert to binary number and
  //    concatenate together
  // b) if number of bits = 24, divide it into 4 6-bit numbers.
  // c) Convert each number into decimal number and pass the decimal to index table
  //    return the character
  // d) if number of bits < 24
  //      d1) number of bits = 8, append 4 zero bits and split into 2 6-bit numbers
  //          and perform encoding to return 2 characters
  //      d2) number of bits = 16, append 2 zero buts and split into 3 6-bit numbers
  //          and perform encoding to return 3 characters
  // e) pad the encoded string with = if required
  // f) return final result

  let bitString = String(this).split('').reduce((acc, c) => {
    // find the ascii value of the character and convert it to binart representation
    let binaryNum = parseInt(c.charCodeAt(0)).toString(2);
    if (binaryNum.length !== BYTE_LEN) {
      binaryNum = "0".repeat(BYTE_LEN - binaryNum.length) + binaryNum;
    }
    acc += binaryNum;
    return acc;
  }, '');
  let numSigBytesAtTheEnd = (bitString.length % BYTES_LEN) / BYTE_LEN;
  // add padding zero-bit if number of bytes is not divisible by 3
  // 1 byte requires 4 padding zeroes. 2 bytes require 2 padding zeroes
  bitString += (numSigBytesAtTheEnd === 1 ? '0000' : numSigBytesAtTheEnd === 2 ? '00' : '');

  let result = '';
  for (let i = 0; i < bitString.length; i+=ENCODE_64_LEN) {
    // convert 6-bit number to base 10 value and look up the character in index table
    let base10 = parseInt(bitString.substring(i,i+ENCODE_64_LEN), 2);
    result += INDEX_TABLE[base10];
  }

  // pad character if  needed
  result += (numSigBytesAtTheEnd === 1 ? '==' : numSigBytesAtTheEnd === 2 ? '=' : '');
  return result;
}

// decode
String.prototype.fromBase64 = function() {

  // check for pad character =
  // if number of pad characters = 2, the last 24 bits is converted to 1 byte
  // if number of pad characters = 1, the last 24 bits is converted to 2 bytes
  // loop the string
  // a) Find the index of each character in index table
  // b) convert the index to binary number
  //    b1) if number of bits >= 6, take the righmost 6 bits
  //    b2) else prepad the binary number with 0 up to length 6
  // c) concatenate the string
  // d) if number of pad character2 = 2, truncate the last 2 zero bits
  //    if number of pad characters = 1, truncate the last 4 zero bits
  // e) for each byte, convert binary number to decimal and convert the value from
  //    ascii to character
  // f) append the character
  // g) return result

  let str = String(this);
  let idxPadChar = str.indexOf('=');
  let numPadChar = idxPadChar < 0 ? 0 : str.length - idxPadChar;

  str = numPadChar > 0 ? str.slice(0, str.length - numPadChar) : str;
  let bitString = str.split('').reduce((acc, c) => {
    let binNum = INDEX_TABLE.indexOf(c).toString(2);
    if (binNum.length < ENCODE_64_LEN) {
      binNum = "0".repeat(ENCODE_64_LEN - binNum.length) + binNum;
    }
    acc += binNum
    return acc;
  }, '');

  bitString = bitString.slice(0, bitString.length - numPadChar * 2);

  let result = '';
  for (let i = 0; i < bitString.length; i+=BYTE_LEN) {
    // convert 6-bit number to base 10 value and look up the character in index table
    let base10 = parseInt(bitString.substring(i,i+BYTE_LEN), 2);
    result += String.fromCharCode(base10);
  }
  return result;
}

console.log('this is a string!!'.toBase64() === 'dGhpcyBpcyBhIHN0cmluZyEh');
console.log('any carnal pleasure.'.toBase64() === 'YW55IGNhcm5hbCBwbGVhc3VyZS4=');
console.log('any carnal pleasure'.toBase64() === 'YW55IGNhcm5hbCBwbGVhc3VyZQ==');
console.log('any carnal pleasur'.toBase64() === 'YW55IGNhcm5hbCBwbGVhc3Vy');

console.log('this is a string!!' === 'dGhpcyBpcyBhIHN0cmluZyEh'.fromBase64());
console.log('any carnal pleasure.' === 'YW55IGNhcm5hbCBwbGVhc3VyZS4='.fromBase64());
console.log('any carnal pleasure' === 'YW55IGNhcm5hbCBwbGVhc3VyZQ=='.fromBase64());
console.log('any carnal pleasur' === 'YW55IGNhcm5hbCBwbGVhc3Vy'.fromBase64());
