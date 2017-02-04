# I cheat. https://www.nayuki.io/page/next-lexicographical-permutation-algorithm
nextBigger = (n) ->
  strNumber = "#{n}"
  
  # find the largest index i such that a[i - 1] < a[i]
  largestIndex = -1
  for i in [strNumber.length - 1...0]  
    if strNumber[i - 1] < strNumber[i]
      largestIndex = i
      break
  if largestIndex < 0 then return -1
  
  # find the largest index j >= largest index such that a[j] > a[largest index - 1]
  for j in [strNumber.length - 1..largestIndex]
    if strNumber[j] > strNumber[largestIndex - 1]
      
      strNumberArray = strNumber.split('')
      temp = strNumberArray[j]
      strNumberArray[j] = strNumberArray[largestIndex - 1]
      strNumberArray[largestIndex - 1] = temp
      break
  
  # reverse the suffix  
  nextBiggestNum = strNumberArray[0...largestIndex].join('') + 
    strNumberArray[largestIndex...strNumberArray.length].reverse().join('')
  console.log (nextBiggestNum)
  Number(nextBiggestNum)