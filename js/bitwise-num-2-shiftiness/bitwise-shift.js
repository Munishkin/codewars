
// A) For positive numbers and 0, the value tells how "far" from 0 the number
//is... i.e. 10 in binary (2 in decimal) means "2 above 0"...so for a 3-bit
//number in Two's Complement, the number 2 (decimal) would be represented
//as: "010". B) For negative numbers, how far above the smallest possible
//value that can be represented with the number of bits available...e.g. with
//three bits, the smallest possible number we can represent is -4...so "101"
//(binary) is like saying "01 more than -4"...or -3.

// So in the example above, when we "flipped" the bits of the number 5,
// there was the extra "sign bit" on the front that got flipped as well..
// so what we thought was "101" was actually "0101" and when we flipped the
// bits, we got "1010" - i.e. "Two more than the smallest number possible in
// this many bits" == "Two more than -8" == "-6".

/*Now the problem; Extend the Number prototype with a function called "twos" that
accepts one parameter (n), and when called, returns the two's-complement
representation of the number in "n" bits in a string.

e.g.

(-2).twos(3) == "110";
(8).twos(5) == "01000";
(-8).twos(5) == "11000";
(-16).twos(5) == "10000";
*/

Number.prototype.twos = function(n) {

  //let value = Number(this);
  //let value = this;
  let decToBin = (num, digits) => {

      //console.log(num.toString(2));
      let binStr = num.toString(2);
      /*while (num > 1) {
        binStr += (num % 2);
        num = Math.floor(num / 2);
      }*/
      //binStr += num;
      //console.log(binStr);
      if (binStr.length < digits) {
        binStr = '0'.repeat(digits - binStr.length) + binStr;
      }
      console.log(binStr);
      return binStr;
  }

  // if number < 0, first bit is 0.
  // calculate the difference d between current value and 0
  // compute the d in (n - 1) bits
  // prepend the result with 0 and return

  // if number < 0, first bit is 1.  Find the smallest possible number
  // calculate the difference d between current value and smallest positive value
  // compute the d in (n - 1) bits
  // prepend the result with 1 and return
  //let smallestValue = -1 * Math.pow(2, n-1);
  return this >= 0 ? '0' + decToBin(this, n - 1) : '1' + decToBin(this + Math.pow(2, n-1), n - 1);
}

let n = 12;

console.log(n.twos(5) === '01100');
console.log((-12).twos(5) === '10100');
console.log((-2).twos(3) === '110');
console.log((8).twos(5) === "01000");
console.log((-8).twos(5) === "11000");
console.log((-16).twos(5) === "10000");
