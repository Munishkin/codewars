function handleAcromyn(accumulator, path, isLast) {
  var excluded = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"];
  var acromynList = path.split('-');
  var shortener = '';
  for (var k in acromynList) {
    var term = acromynList[k];        
    if (excluded.indexOf(term) < 0) {
      shortener += term[0];
    }
  }
  if (isLast) {
    return '<span class="active">' + shortener.toUpperCase() + '</span>' ;
  }
  return '<a href="' + accumulator + '">' + shortener.toUpperCase() + '</a>' ;
}

function generateBC(url, separator) {
  //your code here
  var cleanupUrl = url;
  // replace protocol
  cleanupUrl = cleanupUrl.replace(/^http.*:\/\//, '');
  // remove trailing /
  cleanupUrl = cleanupUrl.replace(/.*\/+$/, '');
  cleanupUrl = cleanupUrl.replace(/\?.+$/, '');
  cleanupUrl = cleanupUrl.replace(/#.+$/, '');
  cleanupUrl = cleanupUrl.replace(/\/index\..+$/, '');
  
  var pathArray = cleanupUrl.split('/');
  var result = '';  
  if (pathArray.length > 1) {
    result = '<a href="/">HOME</a>' + separator;  
    var accumulator = '/';
    for (var i = 1; i < pathArray.length - 1; i++) {
      if (pathArray[i].length > 30) {
        accumulator += pathArray[i] + '/';
        var shortener = handleAcromyn(accumulator, pathArray[i], false);
        result += shortener;
      } else {
        accumulator += pathArray[i] + '/';
        var displayValue = pathArray[i].replace(/-/g, ' ').toUpperCase()
        result += '<a href="' + accumulator + '">' + displayValue + '</a>';
      }
      result += separator;
    }
    var resource = pathArray[pathArray.length - 1].replace(/\..+$/, '');
    if (resource.length > 30) {
      var shortener = handleAcromyn(pathArray[i], pathArray[i], true);
      result += shortener;
    } else {
      resource = resource.replace(/-/g, ' ').toUpperCase();
      result += '<span class="active">' + resource + '</span>';
    }
  } else {
    result = '<span class="active">HOME</span>';
  }
  return result;
}
