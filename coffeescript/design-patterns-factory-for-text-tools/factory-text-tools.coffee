# Definition of the factory
class ToolFactory
  makeTool: (tool) ->
    if tool is 'reverse' then new Reverse()
    else if tool is 'upper' then new Upper()
    else if tool is 'lower' then new Lower()
    
# Definition of the text-tools
class Reverse
  constructor: ->
    @name = 'Reverse'
    
  use: (text) ->
    text.split('').reverse().join('')
    
class Upper
  constructor: ->
    @name = 'Upper'
    
  use: (text) ->
    text.toUpperCase()

class Lower
  constructor:() ->
    @name = 'Lower'
    
  use: (text) ->
    text.toLowerCase()
    

factory = new ToolFactory
myTool = factory.makeTool "reverse"
console.log myTool.use('abc') is 'cba'
console.log myTool.name is 'Reverse'

myTool = factory.makeTool "upper"
console.log myTool.use('aBc') is 'ABC'
console.log myTool.name is 'Upper'

myTool = factory.makeTool "lower"
console.log myTool.use('AbC') is 'abc'
console.log myTool.name is 'Lower'
