function isTriangleNumber(number) {
  if (typeof number !== 'number' || Math.floor(number) !== number) {
    return false;
  }
  
  if (number == 0 || number == 1) {
    return true;
  }
  
  n = 2;
  while (n) {
      let equTri = n * (n + 1) / 2;
      if (equTri === number) {
        return true;
      } else if (equTri > number) {
        return false;
      }
      n += 1;
  }    
  return false;
}

console.log(isTriangleNumber(6.15));
console.log(isTriangleNumber(5));
console.log(isTriangleNumber('hello'));
console.log(isTriangleNumber(6));
console.log(isTriangleNumber(3));
console.log(isTriangleNumber(15));
