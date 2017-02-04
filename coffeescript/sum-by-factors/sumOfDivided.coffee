# I cheat again. http://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/
sumOfDivided = (lst) ->
  factorToNumMap = {}
  for n in lst
    if n < 0 then num = -n else num = n
    if num % 2 is 0  
      if !factorToNumMap[2]? then factorToNumMap[2] = [n]
      else factorToNumMap[2].push n

    while num % 2 is 0 then num /= 2
  
    d = 3
    factorBound = Math.floor(Math.sqrt(num))
    track = {}
    while d <= factorBound
      while num % d is 0 
        if !factorToNumMap[d]? 
          factorToNumMap[d] = [n]
          track[d] = true
        else           
          factorToNumMap[d].push n if !track[d]?
          track[d] = true
        num /= d
      d += 2
  
    if num > 2
      if !factorToNumMap[num]? then factorToNumMap[num] = [n]
      else factorToNumMap[num].push n
    
  sumFactorArray = []
  for k,v of factorToNumMap
    sum = 0
    for v1 in v then sum += v1
    sumFactorArray.push [Number(k), sum]  
  sumFactorArray