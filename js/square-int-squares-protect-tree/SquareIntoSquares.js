function decomposeHelper(sumSqr, lastRemovedNum) {
    
  var root = Math.sqrt(sumSqr);
  var rootFloor = Math.floor(root);
  if (rootFloor === root) {
    return [ root ];
  }
  
  // find the solution
  for (var i = rootFloor; i >= 1; i--) {
    var subSqrSolution = decomposeHelper(sumSqr - i * i, i);
    if (subSqrSolution != null && subSqrSolution.length != 0 && typeof subSqrSolution !== 'undefined') {
      if (subSqrSolution[subSqrSolution.length - 1] < i) {
        subSqrSolution.push(i);  
        return subSqrSolution;
      }
    }
  }
  return null;
}

function decompose(n) {
  // your code
  var sqrN = n * n;
  for (var i = n - 1; i >= 1; i--) {
    var solution = decomposeHelper(sqrN  - i * i,  i); 
    if (solution != null && typeof solution !== 'undefined') {
      solution.push(n - 1);
      return solution;
    }
  }
  return null;
}