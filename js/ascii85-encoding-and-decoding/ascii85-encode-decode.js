// http://tenminutetutor.com/data_formats/binary_encoding/ascii85_encoding

//ASCII85 is a binary-to-ASCII encoding scheme that's used within PDF and
//Postscript, and which provides data-size savings over base 64. Your task is
//to extend the String object with two new methods, toAscii85 (to_ascii85 in
//ruby) and fromAscii85 (from_ascii85 in ruby), which handle encoding and
//decoding ASCII85 strings.

// In general, four binary bytes are encoded into five ASCII85 characters.
// The character set that ASCII85 encodes into is the 85 characters between
// ASCII 33 (!) and ASCII 117 (u), as well as ASCII 122 (z), which is used for
// data compression (see below).
// In order to encode, four binary bytes are taken together as a single 32-bit
// number (you can envision concatenating their binary representations,
// which creates a 32-bit binary number). You then serially perform division
// by 85, and add 33 to the remainder of each division to get the ASCII character
// value for the encoded value; the first division and addition of 33 is the
// rightmost character in the encoded five-character block, etc. (This is all
// represented well is the visualization in the Wikipedia page's example.)
// If the last block to be encoded contains less than four bytes, it's padded
// with nulls to a total length of four bytes, and then after encoding, the
// same number of characters are removed as were added in the padding step.

// If a block to be encoded contains all nulls, then that block is encoded as
// a simple z (ASCII 122) rather than the fully-encoded value of !!!!!.

// The final encoded value is surrounded by <~ at the start and ~> at the end.
// In the wild, whitespace can be inserted as needed (e.g., line breaks for
// mail transport agents); in this kata, whitespace shouldn't be added to the
// final encoded value for the sake of checking the fidelity of the encoding.

// Decoding applies the above in reverse; each block of five encoded characters
// is taken as its ASCII character codes, multiplied by powers of 85 according
// to the position in the block of five characters (again, see the Wikipedia
// example visualization), and then broken into four separate bytes to
// determine the corresponding binary values.
// If a block to be decoded contains less than five characters, it is padded
// with u characters (ASCII 117), decoded appropriately, and then the same
// number of characters are removed from the end of the decoded block as us
// were added.
// All whitespace in encoded values is ignored (as in, it's removed from
// the encoded data before the data is broken up into the five-character
// blocks to be decoded).

const ASCII85 = 85;
const ASCII85_OFFSET = 33;
const ASCII85_BLOCK_SIZE = 5;
const BINARY_BLOCK_SIZE = 4;
const BYTE_SIZE = 8;
const ASCII85_POW = [52200625, 614125, 7225, 85, 1];

String.prototype.toAscii85 = function() {
  // encode this string as ASCII85
  // check if length is divisble by 4. if not pad by zero bytes
  // divide the string by block of 4
  // convert the ascii value of each character to binary and concatenate together
  // calculate the binary value
  // encode the binary into ascii85 values of size 5
  //   ascii85 byte 0 = (value / 85^4) mod 85 + 33
  //   ascii85 byte 1 = (value / 85^3) mod 85 + 33
  //   ascii85 byte 2 = (value / 85^2) mod 85 + 33
  //   ascii85 byte 3 = (value / 85^1) mod 85 + 33
  //   ascii85 byte 4 = (value / 85^0) mod 85 + 33
  // convert each ascii value to character
  // if encoded value is '!!!!!', replace it with z
  // return result
  //let val = JSON.parse(JSON.stringify(this.valueOf()));
  let encodeAscii = (binBlock) => {
    let base10 = parseInt(binBlock, 2);
    let encodeValues = [];
    for (k = 0; k < ASCII85_BLOCK_SIZE; k++) {
      let ascii85Value = Math.floor(base10 / ASCII85_POW[k]) % ASCII85 + ASCII85_OFFSET;
      encodeValues.push(ascii85Value);
    }
    let encodeBlock = String.fromCharCode(...encodeValues);
    return encodeBlock === '!!!!!' ? 'z' : encodeBlock;
  }

  let conversion = (val, beginIdx, endIdx) => {
    let binBlock = '';
    for (let j = beginIdx; j < endIdx; j++) {
      // prepend with 0 if length is less than 8
      let binary = val.charCodeAt(j).toString(2);
      binBlock += (binary.length < BYTE_SIZE) ?
          "0".repeat(BYTE_SIZE - binary.length) + binary : binary;
    }
    return binBlock;
  }

  let val = this.valueOf();
  let result = '';
  for (let i = 0; i <= val.length - BINARY_BLOCK_SIZE; i+=BINARY_BLOCK_SIZE) {
    result += encodeAscii(conversion(val, i, i + BINARY_BLOCK_SIZE));
  }

  // pad incomplete last block if exists
  let numPadChar = (BINARY_BLOCK_SIZE - (val.length % BINARY_BLOCK_SIZE)) % BINARY_BLOCK_SIZE;
  if (numPadChar !== 0) {
    let offset =  BINARY_BLOCK_SIZE - numPadChar;
    let binBlock = conversion(val, val.length - offset, val.length) + "00000000".repeat(numPadChar);
    result += encodeAscii(binBlock);
    result = result.substring(0, result.length - numPadChar);
  }
  return `<~${result}~>`;
}

String.prototype.fromAscii85 = function() {
  // decode this string from ASCII85
  return '';
}

console.log('co'.toAscii85() === '<~@rD~>');
console.log('easy'.toAscii85() === '<~ARTY*~>');
console.log('moderate'.toAscii85() ===  '<~D/WrrEaa\'$~>');
console.log('somewhat difficult'.toAscii85() === '<~F)Po,GA(E,+Co1uAnbatCif~>');
let longString = 'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.';
let longResult = '<~9jqo^BlbD-BleB1DJ+*+F(f,q/0JhKF<GL>Cj@.4Gp$d7F!,L7@<6@)/0JDEF<G%<+EV:2F!,O<DJ+*.@<*K0@<6L(Df-\\0Ec5e;DffZ(EZee.Bl.9pF"AGXBPCsi+DGm>@3BB/F*&OCAfu2/AKYi(DIb:@FD,*)+C]U=@3BN#EcYf8ATD3s@q?d$AftVqCh[NqF<G:8+EV:.+Cf>-FD5W8ARlolDIal(DId<j@<?3r@:F%a+D58\'ATD4$Bl@l3De:,-DJs`8ARoFb/0JMK@qB4^F!,R<AKZ&-DfTqBG%G>uD.RTpAKYo\'+CT/5+Cei#DII?(E,9)oF*2M7/c~>'
console.log(longString.toAscii85() === longResult);

// console.log('<~@rD~>'.fromAscii85() === 'co');
// console.log('<~ARTY*~>'.fromAscii85() === 'easy');
// console.log('<~D/WrrEaa\'$~>'.fromAscii85() === 'moderate');
// console.log('<~F)Po,GA(E,+Co1uAnbatCif~>'.fromAscii85() === 'somewhat difficult');
