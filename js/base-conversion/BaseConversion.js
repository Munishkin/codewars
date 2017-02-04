function convert(input, source, target) {
  if (source === target) {
    return input;
  }

  // Compute the value of the input in source base
  // then convert it to value in target base
  let sourceValue = input.split('').reverse().reduce( (acc, val, digitPos) => {
    return acc + Math.pow(source.length, digitPos) * source.indexOf(val);
  }, 0);

  if (sourceValue === 0) {
    return target[0];
  }

  // convert source value to value in target base
  let targetValue = '';
  while (sourceValue > 0) {
    targetValue += target[sourceValue % target.length];
    sourceValue = Math.floor(sourceValue / target.length);
  }
  return targetValue.split('').reverse().join('');
}