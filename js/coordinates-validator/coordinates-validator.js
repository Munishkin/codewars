function isValidCoordinates(coordinates){
  
  var coordinatesReg = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/g
  if (!coordinatesReg.test(coordinates)) {
    return false;
  }
  
  var arrCoordinates = coordinates.split(',');
  try {
    var strLat = arrCoordinates[0].trim();    
    var lat = parseFloat(strLat);
    if (lat < -90 || lat > 90) { return false; }
  } catch (e) {
    console.log(e);
    return false;
  }
  
  try {
    var strLng = arrCoordinates[1].trim();    
    var lng = parseFloat(strLng);
    if (lng < -180 || lng > 180) { return false; }
  } catch (e) {
    return false;
  }
  
  return true; // do your thing!
}