# Consider a sequence u where u is defined as follows:
#The number u(0) = 1 is the first one in u.
#For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
#There are no other numbers in u.

# 1 3 4 7 9 10 13 15 19 21 22 27 28 31 40 46

insertNum = (queue, v) ->
  if queue.includes(v) then return
  queue.push v

findNextSmallest = (queue) ->
  i = 1
  min_idx = 0
  while i < queue.length
    if queue[i] < queue[min_idx] then min_idx = i
    i += 1
  smallest = queue.splice min_idx, 1
  smallest[0]

dblLinear = (n) ->
  
  # if number of elements in u is at least (n+1), return n+1 element and done
  # pop the first integer x  in queue, append it to u
  # calculate 2x + 1 and 3x + 1, append to queue
  # inserted the new values in queue such that queue remains sorted

  queue = [1]
  count = 0
  x = -1
  while count < (n+1)
    x = findNextSmallest queue
    y = 2 * x + 1
    z = 3 * x + 1
    insertNum queue, y
    insertNum queue, z
    count += 1
  x
  

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
#console.log dblLinear(2000)
#console.log dblLinear(1000)
