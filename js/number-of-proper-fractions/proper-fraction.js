//https://souvikpal.wordpress.com/2013/02/09/gcd-of-a-very-large-number/
// find gcd of a very large number
/*
So, to find the modulus, lets first store the number in a string/character
array. Let the big number be stored in string S and normal integer be stored
in integer n.

Repeat until all characters of S are processed.

Take left most character from S, convert it to corresponding integer, m.
Take the modulus d = m % n.
Add 10*d to the next digit i.e. the next character from left converted to int and store result in m.
Repeat steps 2,3 and 4.

The final value of d is the required modulus of S % n. This is actually the
way a child learns to divide two numbers. The algorithm is simple, elegant and never fails.
*/
// The decimal fraction of every proper fraction* is either terminating or else it is recurring.
const findDivisors = (n) => {
  const boundary = Math.floor(Math.sqrt(n));
  const results = [];
  for (let i = 2; i <= boundary; i++) {
    if (n % i === 0) {
      results.push(i);
      if (i !== n/i) {
        results.push(n/i);
      }
    }
  }
  return results;
}

const isPrime = (n) => {
  if (n <= 1) { return false; }
  else if (n <= 3) { return true; }
  else if (n % 2 === 0 || n % 3 === 0) { return false; }
  let i = 5;
  while ((i * i) <= n) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
    i += 6;
  }
  return true
}

const primeDivisors = (n) => {
    return findDivisors(n).filter((d) => {
      return isPrime(d);
    });
}

// https://en.wikipedia.org/wiki/Euler's_totient_function
const properFractions = (n) => {
  if (n === 1) { return 0; }
  if (isPrime(n)) { return n - 1; }
  // the result may be an integer, so need to find its floor
  // formula is n * (1 - 1/p) where n is divisible by p and p is a prime number
  return Math.floor(primeDivisors(n)
                  .reduce((acc, d) => {
                      return acc * (1 - 1 / d);
                  }, n));

}
console.log(properFractions(3)===2);
console.log(properFractions(1)===0);
console.log(properFractions(2)===1);
console.log(properFractions(5)===4);
console.log(properFractions(15)===8);
console.log(properFractions(25)===20);
console.log(properFractions(500000003) === 500000002);
console.log(properFractions(21) === 12 );
console.log(properFractions(20) === 8 );
console.log(properFractions(9999999) === 6637344);
console.log(properFractions(10) === 4);
console.log(properFractions(1234567890 ) === 329040288);
console.log(properFractions(9999999999 ) === 5890320000);
