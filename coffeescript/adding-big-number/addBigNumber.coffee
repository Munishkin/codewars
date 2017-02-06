add = (a, b) ->  
  strA = "#{a}"
  strB = "#{b}"
  lenA = strA.length
  lenB = strB.length
  # if length is different, prepend the shorter one with 0
  if lenA < lenB
    strA = '0' + strA for i in [0...(lenB - lenA)]
  else   
    strB = '0' + strB for i in [0...(lenA - lenB)]
      
  strResult = ''
  carryDigit = 0
  for i in [(lenA - 1)..0] by -1
    sumDigit = Number(strA[i]) + Number(strB[i]) + carryDigit
    carryDigit = (if sumDigit >= 10 then 1 else 0)
    if carryDigit is 1 then sumDigit -= 10
    strResult = "#{sumDigit}" + strResult
  if carryDigit isnt 0 then strResult = "#{carryDigit}" + strResult 
  strResult