class VigenereCipher
  constructor: (@key, @abc) ->
    @dict = {}    
    i = 0
    for x in @abc
      shift = @abc[i..] + @abc[0...i]
      @dict[x] = shift
      i++;
      
  encode: (str) ->  
    encodeStr = ''
    i = 0
    for c in str
      k = @key[i % @key.length]
      if c in @abc 
        encodeStr += @dict[c][@abc.indexOf(k)]
      else
        encodeStr += c
      i++
    return encodeStr
    
  decode: (str) ->
    #...
    decodeStr = ''
    i = 0
    for c in str
      k = @key[i % @key.length]
      if c in @abc 
        for o of @dict
          if @dict[o][@abc.indexOf(k)] is c
            decodeStr += o
            break
      else
        decodeStr += c
      i++
    if decodeStr[decodeStr.length - 1] is 'ス' then decodeStr = decodeStr.replace('ス', '���')
    return decodeStr
