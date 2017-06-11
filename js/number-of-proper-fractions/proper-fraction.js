/*const gcd = (u, v) => {
    if (u === v || v === 0) { return u }
    if (u === 0) { return v; }

    if (u % 2 === 0 && v % 2 === 0) { return gcd(u / 2, v /2); }
    else if (u % 2 === 0 && v % 2 === 1) { return gcd(u / 2, v); }
    else if (u % 2 === 1 && v % 2 === 0) { return gcd(u, v / 2); }
    else if (u % 2 === 1 && v % 2 === 1 && u > v) { return gcd((u - v) / 2, v); }
    else if (u % 2 === 1 && v % 2 === 1 && u < v) { return gcd((v - u) / 2, u); }
    return 0;
}*/

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
  console.log(n);
  if (n === 1) { return 0; }
  if (isPrime(n)) { return n - 1; }
  let count = 1;   // 1 / n is always reduced fraction
  const divisors = findDivisors(n);
  const isOdd = n % 2 === 1;
  for (let i = 2; i < n; i++) {
    // both even numbers are divisble by 2, not reduced fraction
    if (i % 2 === 1 || isOdd) {
      let gcd = null;
      for (let j = divisors.length - 1; j >= 0; j--) {
        if (i % divisors[j] === 0) {
          gcd = divisors[j];
          break;
        }
      }

      if (!gcd || gcd === 1) {  // gcd is 1, reduced fraction
        count += 1;
      }
    }
  }
  return count;
}

// console.log(properFractions(3)==2);
// console.log(properFractions(1)==0);
// console.log(properFractions(2)==1);
// console.log(properFractions(5)==4);
// console.log(properFractions(15)==8);
// console.log(properFractions(25)==20);
// console.log(properFractions(500000003) === 500000002);
// console.log(properFractions(21) == 12 );
// console.log(properFractions(20) == 8 );

console.log(properFractions(9999999));

//console.log(properFractions(9999999999));


//console.log(findDivisors(9999999));
