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
  // divide the string into blocks of size 4
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
  // if last block does not have length 4, append '00000000' to make it 32 bits long
  // then repeat the same step to do the ascii85 conversion
  // return result
  const encodeAscii = (binBlock) => {
    const base10 = parseInt(binBlock, 2);
    return ASCII85_POW.reduce((acc, pow) => {
      return acc + String.fromCharCode(Math.floor(base10 / pow) % ASCII85 + ASCII85_OFFSET);
    }, '');
  }

  // endIdx is exclusive
  // convert from ascii to binary
  const conversion = (val, beginIdx, endIdx) => {
    return Array(endIdx - beginIdx).fill(beginIdx)
        .map((a, i) => { return a + i; })
        .reduce((acc, i) => {
          let binary = val.charCodeAt(i).toString(2);
          return acc + ((binary.length < BYTE_SIZE) ?
              "0".repeat(BYTE_SIZE - binary.length) : '') + binary;
        }, '');
  }

  const val = this.valueOf();
  let result = Array(Math.floor(val.length / BINARY_BLOCK_SIZE))
      .fill().map((_, i) => { return i * BINARY_BLOCK_SIZE; })
      .reduce((acc, i) => {
        let encodeBlock = encodeAscii(conversion(val, i, i+BINARY_BLOCK_SIZE));
        return acc +  (encodeBlock === '!!!!!' ? 'z' : encodeBlock);
      }, '');

  // pad incomplete last block if exists
  let numPadChar = (BINARY_BLOCK_SIZE - (val.length % BINARY_BLOCK_SIZE)) % BINARY_BLOCK_SIZE;
  if (numPadChar !== 0) {
    let binBlock = conversion(val, val.length - BINARY_BLOCK_SIZE + numPadChar, val.length)
                    + "00000000".repeat(numPadChar);
    result += encodeAscii(binBlock);
    result = result.substring(0, result.length - numPadChar);
  }
  return `<~${result}~>`;
}

String.prototype.fromAscii85 = function() {

  // decode this string from ASCII85
  // strip <~ at the beginning and ~> at the end
  // if ascii85 character is z then, append \u0000\u0000\u0000\u0000 to result string
  // Otherwise, retrieve the next 5 characters to form an ascii85 block
  // calculate the base 10 value of the ascii85 block
  //   ascii85 byte 0 = (value0 - 33) * 85^4)
  //   ascii85 byte 1 = (value1 - 33) * 85^3)
  //   ascii85 byte 2 = (value2 - 33) * 85^2)
  //   ascii85 byte 3 = (value3 - 33) * 85)
  //   ascii85 byte 4 = (value4 - 33)
  // convert the base 10 value to 32-bit binary
  // Convert each byte to ascii character and append it to result string
  // if last block does not have length 5, append 'u' to make it 5 characters long
  // then repeat the same step to do the ascii85 conversion
  // return result
  const encodeBinary = (val, charIdx) => {
    // make 32-bit binary string
    const binary = ASCII85_POW.reduce((acc, p, j) => {
      return acc + ((val.charCodeAt(charIdx+j) - ASCII85_OFFSET) * p);
    }, 0).toString(2);
    const numZeroFilled = BINARY_BLOCK_SIZE * BYTE_SIZE - binary.length;
    return (numZeroFilled > 0 ? "0".repeat(numZeroFilled) : '') + binary;
  }

  // reutrn 32-bit binary to 4 ascii characters
  const conversion = (binBlock) => {
    return Array(BINARY_BLOCK_SIZE).fill()
        .map((_, i) => { return i * BYTE_SIZE; })  // return 0, 8, 16, 24
        .reduce((acc, i) => {
          let binary = parseInt(binBlock.substring(i, i + BYTE_SIZE), 2);
          return acc + String.fromCharCode(binary);
        }, '');
  }

  const data = this.valueOf().substring(2, this.valueOf().length - 2).split('');
  const val = data.reduce((acc, c) => {
    let asciiValue = c.charCodeAt(0);
    if (asciiValue >= 33 && asciiValue <= 117 || c === 'z') {
        return acc + c;
    }
    return acc;
  }, '');    
  
  let result = '', i;
  for (i = 0; i < val.length; ) {
    if (val[i] === 'z') {
      result += '\u0000\u0000\u0000\u0000';
      i += 1;
    } else {
      // stop if it does not have 5 ascii characters
      if ((i + ASCII85_BLOCK_SIZE - 1) >= val.length) { break; }
      result += conversion(encodeBinary(val, i));
      i += ASCII85_BLOCK_SIZE;
    }
  }

  // last block
  let numPadChar = (ASCII85_BLOCK_SIZE - (val.length - i)) % ASCII85_BLOCK_SIZE;
  if (numPadChar !== 0) {
    let lastAscii85 = val.substring(i) + "u".repeat(numPadChar);    
    result += conversion(encodeBinary(lastAscii85, 0));    
    result = result.substring(0, result.length - numPadChar);
  }
  return result;
}

console.log("\u0000".toAscii85() === '<~!!~>');
console.log("\u0000\u0000".toAscii85() === '<~!!!~>');
console.log("\u0000\u0000\u0000".toAscii85() === '<~!!!!~>');
console.log("\u0000\u0000\u0000\u0000".toAscii85() === '<~z~>');
console.log('co'.toAscii85() === '<~@rD~>');
console.log('easy'.toAscii85() === '<~ARTY*~>');
console.log('moderate'.toAscii85() ===  '<~D/WrrEaa\'$~>');
console.log('somewhat difficult'.toAscii85() === '<~F)Po,GA(E,+Co1uAnbatCif~>');
let longString = 'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.';
let longResult = '<~9jqo^BlbD-BleB1DJ+*+F(f,q/0JhKF<GL>Cj@.4Gp$d7F!,L7@<6@)/0JDEF<G%<+EV:2F!,O<DJ+*.@<*K0@<6L(Df-\\0Ec5e;DffZ(EZee.Bl.9pF"AGXBPCsi+DGm>@3BB/F*&OCAfu2/AKYi(DIb:@FD,*)+C]U=@3BN#EcYf8ATD3s@q?d$AftVqCh[NqF<G:8+EV:.+Cf>-FD5W8ARlolDIal(DId<j@<?3r@:F%a+D58\'ATD4$Bl@l3De:,-DJs`8ARoFb/0JMK@qB4^F!,R<AKZ&-DfTqBG%G>uD.RTpAKYo\'+CT/5+Cei#DII?(E,9)oF*2M7/c~>'
console.log(longString.toAscii85() === longResult);

console.log("<~!!~>".fromAscii85() === "\u0000");
console.log("<~!!!~>".fromAscii85() === "\u0000\u0000");
console.log("<~!!!!~>".fromAscii85() === "\u0000\u0000\u0000");
console.log("<~z~>".fromAscii85() === "\u0000\u0000\u0000\u0000");
console.log('<~@rD~>'.fromAscii85() === 'co');
console.log('<~ARTY*~>'.fromAscii85() === 'easy');
console.log('<~D/WrrEaa\'$~>'.fromAscii85() === 'moderate');
console.log('<~F)Po,GA(E,+Co1uAnbatCif~>'.fromAscii85() === 'somewhat difficult');
console.log(longResult.fromAscii85() === longString);
console.log('<~GA(]4ATMg !@q?d)ATMq~>'.fromAscii85() === 'whitespace test'); 
console.log('<~GA(]4A\nTMg!@q\n?d)ATM\nr91&~>'.fromAscii85() === 'whitespace test 2' ); 
console.log('<~GA(]4ATMg!@\tq?d)ATMr91B~>'.fromAscii85() === 'whitespace test 3'); 
