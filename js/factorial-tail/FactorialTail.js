// http:// stackoverflow.com/questions/23202489/how-does-this-code-find-the-number-of-trailing-zeros-from-any-base-number-factor
// https://comeoncodeon.wordpress.com/2010/02/17/number-of-zeores-and-digits-in-n-factorial-in-base-b/
function zeroes (base, number) {
  
  var noz = Number.MAX_VALUE;
  // Now we can break the Base B as a product of primes :
  // B = a^p1 * b^p2 * c^p3 * …
  //Then the number of trailing zeroes in N factorial in Base B is given by the formulae
  // min{1/p1(n/a + n/(a*a) + ….), 1/p2(n/b + n/(b*b) + ..), ….}.
  var j = base;
  for (var i = 2; i <= base; i++) {
    if (j % i === 0) {
      var p = 0;
      while (j % i === 0) {
         j = j / i;     
         p++;
      }
      var c = 0;
      var z = Math.floor(number / i);
      while (z > 0) {
        c += z;
        z = Math.floor(z / i);
      }
      noz = Math.min(noz, Math.floor(c / p))
    }
  }
  return noz;
}