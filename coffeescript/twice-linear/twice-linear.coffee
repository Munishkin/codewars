# Consider a sequence u where u is defined as follows:
#The number u(0) = 1 is the first one in u.
#For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
#There are no other numbers in u.

# 1 3 4 7 9 10 13 15 19 21 22 27 28 31 40 46
# 1 -> 3   4
# 3 -> 7   10
# 4 -> 9   13
# 7 -> 15  21
# 9 -> 19  28
# 10 -> 21 31
# 13 -> 27 40
# 15 -> 31 46

#u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]

insertNum = (queue, v) ->
  if queue.includes(v) then return
  i = queue.length - 1
  while i >= 0
    if queue[i] < v then break
    i -= 1
  if i >= 0 then queue.splice i+1, 0, v else queue.push v

dblLinear = (n) ->
  
  # if number of elements in u is at least (n+1), return n+1 element and done
  # pop the first integer x  in queue, append it to u
  # calculate 2x + 1 and 3x + 1, append to queue
  # inserted the new values in queue such that queue remains sorted

  queue = [1]
  u = []
  while u.length < (n+1)
    x = queue.shift()
    u.push x
    y = 2 * x + 1
    z = 3 * x + 1
    insertNum queue, y
    insertNum queue, z
  
  #console.log u
  #console.log queue
  # choose the (n+1)th number
  u[n]
  

#console.log dblLinear(0)
console.log dblLinear(0) is 1
console.log dblLinear(10) is 22
console.log dblLinear(20) is 57
console.log dblLinear(30) is 91
console.log dblLinear(50) is 175
console.log dblLinear(6000) is 80914
console.log dblLinear(2000) is 19773
console.log dblLinear(1000) is 3355
