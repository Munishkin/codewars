# i cheat
# Based on http://stackoverflow.com/questions/4600048/nth-ugly-number
hamming = (n) ->
  if n is 1 then return 1
  
  result = [1]
  
  # for jth ugly number, find a ugly number u_a, u_b, u_c such that
  # with u_a * 2, u_b * 3 and u_c x 5
  # is greater than (j-1)th ugly number
  # jth ugly number = min (u_a x 2, u_b x 3, u_c x 5)
  last2 = 0
  last3 = 0
  last5 = 0
  for i in [1...n]
    
    while (result[last2] * 2) <= result[i-1]
      last2 += 1

    while (result[last3] * 3) <= result[i-1]
      last3 += 1
    
    while (result[last5] * 5) <= result[i-1]
      last5 += 1

    ugly2 = result[last2] * 2
    ugly3 = result[last3] * 3
    ugly5 = result[last5] * 5
    
    ugly = Math.min(ugly2, ugly3, ugly5)
    
    result[i] = ugly
    
  result[n - 1]
