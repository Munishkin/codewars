class Vector
  constructor: (@components) ->
  add: (vector) ->
    if @components.length isnt vector.components.length
      throw new Error('different length')
    else
      result = []
      for i in [0...@components.length]
        result.push (@components[i] + vector.components[i])
      return new Vector(result)
      
  subtract: (vector) ->
    if @components.length isnt vector.components.length
      throw new Error('different length')
    else
      result = []
      for i in [0...@components.length]
        result.push (@components[i] - vector.components[i])
      return new Vector(result)
      
  dot: (vector) ->
    if @components.length isnt vector.components.length
      throw new Error('different length')
    else
      result = 0
      for i in [0...@components.length]
        result += (@components[i] * vector.components[i])
      return result
      
  norm: () ->
    result = 0
    for e in @components
      result += e * e
    return Math.sqrt(result)
  
  toString: () ->
    str = ''
    for e in @components
      if str isnt '' then str += ','
      str += e
    '(' + str + ')'
  
  equals: (vector) ->
    if !@components? then return false
    if !vector? then return false
    if !vector.components? then return false
    if @components.length isnt vector.components.length then return false
    for i in [0...@components.length]
      if @components[i] isnt vector.components[i] then return false
    return true
    