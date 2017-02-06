# sorry i cheat. Copy the idea from http://www.geeksforgeeks.org/merging-intervals/
sumIntervals = (intervals) ->
  # sort intervals by starting time in ascending order
  sortedIntervals = intervals.sort((a, b) ->
                         return a[0] - b[0]
                    )
  stack = [sortedIntervals[0]]
  for i in [1...sortedIntervals.length]
    stackTop = stack[stack.length - 1]
    if sortedIntervals[i][0] > stackTop[1] then stack.push sortedIntervals[i]
    else 
      # intersection is detected
      if sortedIntervals[i][1] > stackTop[1] then stackTop[1] = sortedIntervals[i][1]

  sum = 0
  for interval in stack
    sum += interval[1] - interval[0]
  sum