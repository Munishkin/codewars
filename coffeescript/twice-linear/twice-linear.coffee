# Consider a sequence u where u is defined as follows:
#The number u(0) = 1 is the first one in u.
#For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
#There are no other numbers in u.

# 1 3 4 7 9 10 13 15 19 21 22 27 28 31 40 46

# https://github.com/Vargentum/codewars-katas/blob/master/src/js/5/08.twice_linear.js
# uses two-pointer algorithm

genX = (x) ->
  2 * x + 1
  
genY = (x) ->
  3 * x + 1

dblLinear = (n) ->
  u = [1]
  count = 0
  p1 = 0
  p2 = 0
  while count < (n+1)
    y = genX u[p1]
    z = genY u[p2]
    if y isnt z
      u.push Math.min(y, z)
      if y < z then p1 +=1 else p2 += 1
      count += 1
    else
      p1 += 1
  u[n]
  
console.log dblLinear(0) is 1
console.log dblLinear(10) is 22
console.log dblLinear(20) is 57
console.log dblLinear(30) is 91
console.log dblLinear(50) is 175
console.log dblLinear(6000) is 80914
console.log dblLinear(2000) is 19773
console.log dblLinear(1000) is 8488
console.log dblLinear(500) is 3355
console.log dblLinear(60000)
