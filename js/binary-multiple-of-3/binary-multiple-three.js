// In this kata, your task is to create a regular expression capable of
// evaluating binary strings (strings with only 1s and 0s) and determining
// whether the given string represents a number divisible by 3.

// Take into account that:

// An empty string might be evaluated to true (it's not going to be tested,
// so you don't need to worry about it - unless you want)
// The input should consist only of binary digits - no spaces, other digits,
// alphanumeric characters, etc. There might be leading 0s.

// Reference: http://math.stackexchange.com/questions/140283/why-does-this-fsm-accept-binary-numbers-divisible-by-three

var multipleOf3Regex = /^((((0+)?1)(10*1)*0)(0(10*1)*0|1)*(0(10*1)*(1(0+)?))|(((0+)?1)(10*1)*(1(0+)?)|(0(0+)?)))$/;

console.log(multipleOf3Regex.test(" 0") ===  false);
console.log(multipleOf3Regex.test("abc") === false);
console.log(multipleOf3Regex.test("000") === true);

console.log(multipleOf3Regex.test("110") === true);
console.log(multipleOf3Regex.test("111") === false);
console.log(multipleOf3Regex.test((12345678).toString(2)) === true);

console.log((12345678).toString(2))
