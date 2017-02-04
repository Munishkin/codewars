solution = (list) ->
  # TODO: complete solution
  console.log (list)
  result = ""
  
  # make list of intervals
  intervals = [[list[0]]]
  for i in [1...list.length]
    lastInterval = intervals[intervals.length - 1]
    if list[i] is lastInterval[lastInterval.length - 1] + 1 then lastInterval.push list[i]
    else intervals.push [list[i]]
    
  for interval in intervals
    if result isnt '' then result += ','
    if interval.length is 1 then result += interval[0]
    else if interval.length is 2 then result += interval[0] + "," + interval[1]
    else result += interval[0] + "-" + interval[interval.length - 1]
    
  result