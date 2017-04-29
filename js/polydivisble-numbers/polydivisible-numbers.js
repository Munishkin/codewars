
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const convertToBase10 = (s, b) =>  {
  return s.split('').reduce((total, c, i) => {
    const charPos = CHARS.indexOf(c);
    return total + charPos * Math.pow(b, s.length - i - 1)
  }, 0);
}

const convertFromBase10 = (s, b) => {
    return 0;
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
    if (n === 0) {
      return accuPolyDivNum;
    }

    // convert this from base b to 10
    // plus 1
    // convert from base 10 to base b
    const nextPolyDivNum = "" + convertFromBase10(convertToBase10(accuPolyDivNum, b) + 1, b);
    return getPolydivislbleHelper(
      isPolydivisible(nextPolyDivNum, b) ? n - 1 : n, b, nextPolyDivNum);
  }

  if (n === 0) {
    return 0;
  }

  return getPolydivislbleHelper(n, b, "0");
}


// console.log(isPolydivisible("1232", 10) ===  true)
// console.log(isPolydivisible("123220", 10) ===  false)
// console.log(isPolydivisible("123220", 6) === true)
// console.log(isPolydivisible("Js", 62) ===  true)

console.log(getPolydivisible(22, 10) === "32")
console.log(getPolydivisible(42, 16) === "42")
