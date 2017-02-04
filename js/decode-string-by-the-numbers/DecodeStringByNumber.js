function decode(str) {
  var result = [];
  let idx = 0;
  let charCount = 0;
  let strCharCount = '';
  while (idx < str.length) {
    if (str[idx] === '\\') {
      // parse digits
      strCharCount = '';
      idx += 1;
      while (idx < str.length && (str[idx] >= '0' && str[idx] <= '9')) {
        strCharCount += str[idx++];
      }
      charCount = parseInt(strCharCount);
      let endIdx = idx + charCount;
      let strGroup = (endIdx <= str.length) ? str.substring(idx, endIdx) : str.substring(idx);
      result.push(strGroup);
      idx = endIdx;
    } else {
        result.push(str[idx++]);
    }
  }
  return result;
}