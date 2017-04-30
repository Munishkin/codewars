
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const convertToBase10 = (s, b) =>  {
  return s.split('').reduce((total, c, i) => {
    const charPos = CHARS.indexOf(c);
    return total + charPos * Math.pow(b, s.length - i - 1)
  }, 0);
}

/* Conver  number (integer) to base 10 to base B  */
const convertFromBase10 = (number, b) => {

    // mod b, concatenate the string
    // after done, rever the string to get the result
    let str = '';
    let result = number;
    while (result >= b) {
      const remainder = result % b;
      result = Math.floor(result / b);
      str = `${CHARS[remainder]}${str}`;
    }

    if (result > 0) {
      str = `${CHARS[result]}${str}`;
    }
    return str;
}

const isPolydivisible = (s, b) => {
  //your code here
  //console.log(CHARS);
  // for k from length of s downto 1
  //    convert s[1..k]from base b to base 10
  //	determine whether s[1..k] is disivible by k
  // 	if not then return false
  // return true
  const k = s.length;
  if (k === 0) { return true; }

  const base10 = convertToBase10(s, b);
  return (Math.floor(base10 / k) !== (base10 / k)) ? false :
    isPolydivisible(s.slice(0, k - 1), b)
}

// The second get_polydivisible(n, b) will return the nth polydivisible number
// using base b, the first polydivisible number is of course always 0.
const getPolydivisible = (n, b) => {
  //your code here
  const getPolydivislbleHelper = (n, b, accuPolyDivNum) => {
    if (n === 1) { return accuPolyDivNum; }

    // convert the number  from base b to 10 and increment by 1
    // convert the incremented number from base 10 to base b
    // if the incremented number is a polydivisible number, we found the (n - 1)th
    // find the nth polydivisible number
    const nextPolyDivNum = convertFromBase10(convertToBase10(accuPolyDivNum, b) + 1, b);
    return getPolydivislbleHelper(
      isPolydivisible(nextPolyDivNum, b) ? n - 1 : n, b, nextPolyDivNum);
  }
  if (n <= 0) return '';
  return (n === 1) ? '0' : getPolydivislbleHelper(n, b, "0");
}

console.log(isPolydivisible("1232", 10) ===  true)
console.log(isPolydivisible("123220", 10) ===  false)
console.log(isPolydivisible("123220", 6) === true)
console.log(isPolydivisible("Js", 62) ===  true)

console.log(convertFromBase10(10, 62) === 'A');
console.log(convertFromBase10(64, 62) === '12');
console.log(convertFromBase10(1232, 62) === 'Js');
console.log(convertFromBase10(9990, 62) === '2b8');

console.log(getPolydivisible(22, 10))
console.log(getPolydivisible(42, 16))

console.log(getPolydivisible(22, 10) === "32")
console.log(getPolydivisible(42, 16) === "42")
console.log(getPolydivisible(1, 10) === "0")
