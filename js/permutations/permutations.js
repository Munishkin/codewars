function permutations(string) {
  if (string.length <= 1) {
    return [string];
  }
  
  let finalPermutations = permutations(string.substring(1))
    .reduce((acc, p) => {
      let charList = p.split('');
      for (let i = 0; i <= charList.length; i++) {
        let newPermutation = charList.slice(0, i)
                              .concat([string[0]])
                              .concat(charList.slice(i))
                              .join('');
        if (!acc.includes(newPermutation)) {
          acc.push(newPermutation);
        } 
      }
      return acc;      
  },[]);
  return finalPermutations;
}

console.log(permutations('abc'));
console.log(permutations('a'));
console.log(permutations('ab'));
console.log(permutations('aabb'));
