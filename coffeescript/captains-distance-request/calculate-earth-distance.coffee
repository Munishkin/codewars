# use Haverine formula
# https://en.wikipedia.org/wiki/Haversine_formula

#Ahoi!
#We are on a big sailing boat off the coast of Croatia. The captain, by the name
#of Haversine, wants you to help him out: "Arrr, we need to know the distance
#between these two points on the map, so I know how long we need to wait before
#we get to our beloved treasure!". As this is the fourth of such requests by
#your captain, you decide to write a function to calculate the distance
#between two coordinates.

#Complete the function so it returns the distance between two given coordinates.
#Examples of given coordinates are:

#48° 12′ 30″ N, 16° 22′ 23″ E
#23° 33′ 0″ S, 46° 38′ 0″ W
#58° 18′ 0″ N, 134° 25′ 0″ W
#33° 51′ 35″ S, 151° 12′ 40″ E

#You can expect the delivered coordinates to be valid.
#The characters for minutes (′) and seconds (″) are not standard quotation marks.
#If you experience any encoding/escaping issues, you can get them as follows:

#unescape("%B0"); // °
#unescape("%u2032"); // ′
#unescape("%u2033"); // ″

# complete the function to calculate the distance between two coordinates.
# Input: the two coordinates
# Output: return the distance in kilometers

#Haversine formula:
#a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
#c = 2 ⋅ atan2( sqrt(a), sqrt(1−a) )
#d = R ⋅ c
#where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
#note that angles need to be in radians to pass to trig functions!

#To calculate decimal degrees, we use the DMS to decimal degree formula below:
#Decimal Degrees = degrees + (minutes/60) + (seconds/3600)
#DD = d + (min/60) + (sec/3600)

convertCoord = (coord) ->
  [lat, lon] = coord.split(',').map (e) -> e.trim()
  # strip unit symbol and convert to integer before the final conversion
  # oh no, need to convert sign if direction is S or W
  # Reference: http://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
  #f = (e) -> if typeof e is 'number' then parseInt(e[0...e.length - 1]) else e
  parseCoord = (e, idx) -> if idx isnt 3 then parseInt(e[0...e.length - 1]) else e
  [latDeg, latMin, latSec, latDir] = lat.split(' ').map parseCoord
  [lonDeg, lonMin, lonSec, lonDir] = lon.split(' ').map parseCoord

  degLat = latDeg + latMin/60 + latSec/3600;
  degLon = lonDeg + lonMin/60 + lonSec/3600;
  if latDir is 'S' then degLat = degLat * -1
  if lonDir is 'W' then degLon = degLon * -1
  return { lat: degLat, lon: degLon }

converToRad = (decimalDeg) -> decimalDeg * Math.PI / 180;

distance = (coord1, coord2) ->
  #console.log coord1, coord2
  # return the close 10 in km
  # split by , to get lat and lon
  # split coord by ' ' into degrees, minutes and seconds
  # split degrees/minutes/seconds into three parts
  # convert degree/minute/secconds into decimal degree
  # convert decimal degree to radian.  360 degree =  2pi, 1 deg = pi / 180
  # apply formula to decimal degree to calculate distance in hm
  # round answer to nearest 10

  radiusEarthKm = 6371
  degCoord1 = convertCoord(coord1)
  degCoord2 = convertCoord(coord2)

  #Haversine formula:
  #a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  #d = 2 * R * asin( sqrt(a))
  #where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
  #note that angles need to be in radians to pass to trig functions!

  radLat1 = converToRad degCoord1.lat
  radLat2 = converToRad degCoord2.lat
  radLon1 = converToRad degCoord1.lon
  radLon2 = converToRad degCoord2.lon
  deltaLat = converToRad (degCoord2.lat - degCoord1.lat)
  deltaLng = converToRad (degCoord2.lon - degCoord1.lon)

  a1 = Math.pow(Math.sin( deltaLat / 2), 2)
  a2 = Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)
  d = 2 * radiusEarthKm * Math.asin(Math.sqrt(a1 + a2))
  roundedDistance = Math.floor(d / 10) * 10
  roundedDistance

# Test cases
ans = distance("48° 12′ 30″ N, 16° 22′ 23″ E", "23° 33′ 0″ S, 46° 38′ 0″ W");
#Returns 10130
#console.log ans
console.log ans is 10130

ans = distance("48° 12′ 30″ N, 16° 22′ 23″ E", "58° 18′ 0″ N, 134° 25′ 0″ W");
# Returns 7870
#console.log ans
console.log ans is 7870

ans = distance("48° 12′ 30″ N, 16° 22′ 23″ E", "48° 12′ 30″ N, 16° 22′ 23″ E");
#Returns 0
console.log ans is 0
