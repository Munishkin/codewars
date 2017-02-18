#u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]

# Consider a sequence u where u is defined as follows:
#The number u(0) = 1 is the first one in u.
#For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
#There are no other numbers in u.

# 1 3 4 7 9 10 13 15 19 21 22 27 28 31 40 46
# 1 -> 3 4
# 3 -> 7 10
# 4 -> 9 13

dblLinear = (n) ->
  # your code
  0
  
console.log dblLinear(10) is 22
console.log dblLinear(20) is 57
console.log dblLinear(30) is 91
console.log dblLinear(50) is 175
