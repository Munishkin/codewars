
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

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

  const base10 = s.split('').reduce((total, c, i) => {
    const charPos = CHARS.indexOf(c);
    return total + charPos * Math.pow(b, k - i - 1)
  }, 0);

  if (Math.floor(base10 / k) !== (base10 / k)) {
  	return false;
  }

  const nextSmallerNumber = s.slice(0, k - 1);
  return isPolydivisible(nextSmallerNumber, b);
}

const getPolydivisible = (n, b) => {
  //your code here
  return 0;
}


console.log(isPolydivisible("1232", 10) ===  true)
console.log(isPolydivisible("123220", 10) ===  false)
console.log(isPolydivisible("123220", 6) === true)
console.log(isPolydivisible("Js", 62) ===  true)

// console.log(getPolydivisible(22, 10) === "32")
// console.log(getPolydivisible(42, 16) === "42")
