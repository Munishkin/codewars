solution = (str) ->
  newStr = str
  if str.length % 2 is 1 then newStr += '_'
  result = []
  for i in [0...newStr.length] by 2
    result.push (newStr[i..i+1])
  result