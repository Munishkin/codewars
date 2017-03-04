# use Haverine formula
# https://en.wikipedia.org/wiki/Haversine_formula

#Ahoi!
#We are on a big sailing boat off the coast of Croatia. The captain, by the name of Haversine, wants you to help him out: "Arrr, we need to know the distance between these two points on the map, so I know how long we need to wait before we get to our beloved treasure!". As this is the fourth of such requests by your captain, you decide to write a function to calculate the distance between two coordinates.

#Complete the function so it returns the distance between two given coordinates. Examples of given coordinates are:

#48° 12′ 30″ N, 16° 22′ 23″ E
#23° 33′ 0″ S, 46° 38′ 0″ W
#58° 18′ 0″ N, 134° 25′ 0″ W
#33° 51′ 35″ S, 151° 12′ 40″ E

#You can expect the delivered coordinates to be valid.
#The characters for minutes (′) and seconds (″) are not standard quotation marks. If you experience any encoding/escaping issues, you can get them as follows:

#unescape("%B0"); // °
#unescape("%u2032"); // ′
#unescape("%u2033"); // ″

# complete the function to calculate the distance between two coordinates.
# Input: the two coordinates
# Output: return the distance in kilometers

#Haversine formula:
#a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
#c = 2 ⋅ atan2( √a, √(1−a) )
#d = R ⋅ c
#where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
#note that angles need to be in radians to pass to trig functions!

distance = (coord1, coord2) ->
  console.log coord1, coord2
  # return the close 10 in km
  0

console.log ('hello world')

# Test cases
ans = distance("48° 12′ 30″ N, 16° 22′ 23″ E", "23° 33′ 0″ S, 46° 38′ 0″ W");
#Returns 10130
console.log ans is 10130

ans = distance("48° 12′ 30″ N, 16° 22′ 23″ E", "58° 18′ 0″ N, 134° 25′ 0″ W");
# Returns 7870
console.log ans is 7870

ans = distance("48° 12′ 30″ N, 16° 22′ 23″ E", "48° 12′ 30″ N, 16° 22′ 23″ E");
#Returns 0
console.log ans is 0
