// complete the function so that it returns the fastest route 
function navigate(numberOfIntersections, roads, start, finish) {
  var arrDrivingTimes = [];
  var arrRoutes = []
  
  // initialize driving time and route in matrixes
  for (var i = 0; i < numberOfIntersections; i++) {
      arrDrivingTimes.push([]);
      arrRoutes.push([]);
      for (var j = 0; j < numberOfIntersections; j++) {
        if (i === j) {
          arrDrivingTimes[i][j] = 0;
          arrRoutes[i][j] = [[j]];            
        } else {
          arrDrivingTimes[i][j] = Number.MAX_VALUE;
          arrRoutes[i][j] = null;  
        }
      }          
  }
  for (var i = 0; i < roads.length; i++) {
    var road = roads[i];
    arrDrivingTimes[road.from][road.to] = road.drivingTime;
    arrRoutes[road.from][road.to] = [[road.from, road.to]];
  }
  
  // sort the roads by driving time in ascending order
  roads = roads.sort( (a, b) => {
    return a.drivingTime - b.drivingTime;
  });
    
  // construct routes 
  for (var i = 0; i < numberOfIntersections; i++) {
    for (var j = 0; j < numberOfIntersections; j++) {
      if (typeof arrRoutes[i][j] !== 'undefined' && arrRoutes[i][j] != null) {
        for (var k in roads) {
          var road = roads[k];
          var path1 = arrRoutes[i][road.from];
          if (typeof path1 !== 'undefined' && path1 != null) {
            var bestDrivingTime = arrDrivingTimes[i][road.from] + road.drivingTime;
            var drivingTime = arrDrivingTimes[i][road.to];        
            if (drivingTime > bestDrivingTime) { // a shorter path is found
              arrDrivingTimes[i][road.to] = bestDrivingTime;              
              var cloneRoute = JSON.parse(JSON.stringify(arrRoutes[i][road.from]));
              cloneRoute.push([road.from, road.to]);
              arrRoutes[i][road.to] = cloneRoute;              
             }
          }
        }
      }
    }
  }
  
  var route = arrRoutes[start][finish];
  //console.log(route);
  if (typeof route !== 'undefined' && route != null) {
      var flattenRoute = route.reduce(function(a,b) {
        if (b.length === 1) {
          a.push(b[0]);
        } else {
          a.push(b[1]);
        }
        return a;
      }, []);   
      if (route[0].length === 2) {
        flattenRoute.splice(0, 0, route[0][0])
      }
      return flattenRoute;
  }
  return null;
}