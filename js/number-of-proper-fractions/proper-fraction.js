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
const reduceGCD = (s, n) => {
      return s.split('').reduce((acc, x) => {
          const m = 10 * acc + parseInt(x);
          return m % n;
      }, 0);
}

/* Binary GCD */
const gcd = (u, v) => {
    if (u === v || v === 0) { return u }
    if (u === 0) { return v; }
    if (u % 2 === 0 && v % 2 === 0) { return 2 * gcd(u / 2, v /2); }
    else if (u % 2 === 0 && v % 2 === 1) { return gcd(u / 2, v); }
    else if (u % 2 === 1 && v % 2 === 0) { return gcd(u, v / 2); }
    else if (u % 2 === 1 && v % 2 === 1 && u >= v) { return gcd((u - v) / 2, v); }
    else if (u % 2 === 1 && v % 2 === 1 && u < v) { return gcd((v - u) / 2, u); }
    return 0;
}

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
  results.sort((a,b) => {
    return a - b;
  });
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

const properFractions = (n) => {
  const start = new Date().getTime();
  console.log(n);
  if (n === 1) { return 0; }
  if (isPrime(n)) { return n - 1; }
  let count = 1;   // 1 / n is always reduced fraction
  //const divisors = findDivisors(n);
  //console.log(divisors);
  //const isOdd = n % 2 === 1;
  const strN = `${n}`;
  for (let i = 2; i < n; i++) {
    if (i % 2 === 0 && n % 2 === 0) { continue; }
    // both even numbers are divisble by 2, not reduced fraction
    const result = gcd(reduceGCD(strN, i), i);
    if (result === 1) {
      count++;
    }
  }
  const end = new Date().getTime();
  console.log(end - start);
  return count;
}

// try division method


//const x = reduceGCD('9999999999', 9999999997);
//console.log(x);
//console.log(gcd(x, 9999999997));

/*console.log(properFractions(3)==2);
console.log(properFractions(1)==0);
console.log(properFractions(2)==1);
console.log(properFractions(5)==4);
console.log(properFractions(15)==8);
console.log(properFractions(25)==20);
console.log(properFractions(500000003) === 500000002);
console.log(properFractions(21) == 12 );
console.log(properFractions(20) == 8 );
console.log(properFractions(9999999));*/
//console.log(properFractions(9999999999));

//console.log(gcd(9999999999, 9999999997));
console.log(9999999999 % 9999999997);
console.log(9999999997 % 2);
console.log(2 % 1);
