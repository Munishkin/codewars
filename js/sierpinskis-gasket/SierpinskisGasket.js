function sierpinski(n) {
  if (n === 0) {
    return 'L';
  }
  let tri = sierpinski(n - 1);

  let triRows = tri.split('\n');
  let gap = 2 * triRows.length - 1;
  let arr = triRows.reduce((arr, r) => {
    arr.push(r + ' '.repeat(gap) + r);
    gap -= 2;
    return arr;
  }, []);

  return tri + '\n' + arr.join('\n')
}