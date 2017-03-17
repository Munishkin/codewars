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


String.prototype.toAscii85 = function() {
  // encode this string as ASCII85
  return '';
}

String.prototype.fromAscii85 = function() {
  // decode this string from ASCII85
  return '';
}

console.log('co'.toAscii85() === '<~@rD~>');
console.log('easy'.toAscii85() === '<~ARTY*~>');
console.log('moderate'.toAscii85() ===  '<~D/WrrEaa\'$~>');
console.log('somewhat difficult'.toAscii85() === '<~F)Po,GA(E,+Co1uAnbatCif~>');

console.log('<~@rD~>'.fromAscii85() === 'co');
console.log('<~ARTY*~>'.fromAscii85() === 'easy');
console.log('<~D/WrrEaa\'$~>'.fromAscii85() === 'moderate');
console.log('<~F)Po,GA(E,+Co1uAnbatCif~>'.fromAscii85() === 'somewhat difficult');
