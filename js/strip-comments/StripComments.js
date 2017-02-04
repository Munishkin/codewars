function solution(input, markers){
  var comments = input.split('\n');
  for (var i in markers) {
    for (var j in comments) {
      var line = null;
      var idx = comments[j].indexOf(markers[i]);
      if (idx >= 0) {
        comments[j] = comments[j].substring(0, idx).trim();
      } 
    }
  }
  return comments.join('\n');
}