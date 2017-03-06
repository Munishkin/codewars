class List
  constructor: () ->

class EmptyList extends List
  constructor: () -> Object.freeze @
  toString: () -> # implement this
    return '()'
  isEmpty: () -> # implement this
    return true
  length: () -> # implement this
    return 0
  push: (x) -> # implement this
    return new ListNode(x, this)
  remove: (x) -> # implement this
    return this
  append: (xs) -> # implement this
    return xs

class ListNode extends List
  constructor: (@value, @next) -> Object.freeze @
  isEmpty: () -> # implement this
    return false
  toString: () -> # implement this
    strTail = @next.toString()
    if strTail.substr(1) isnt ')'
      '(' + @value + ' ' + strTail.substring(1)
    else
      '(' + @value + strTail.substring(1)

  head: () -> # implement this
    @value
  tail: () -> # implement this
    @next

  length: () -> # implement this
    return 1 + @next.length()

  push: (x) -> # implement this
    return new ListNode(x, this)

  remove: (x) -> # implement this
    newTail = @next.remove(x)
    if @value is x
      return newTail
    else
      if newTail is @next then return this
      else return new ListNode(@value, newTail)

  appendHelper: (firstList, secondList) ->
    if firstList instanceof EmptyList
      return secondList
    else
      h = firstList.head()
      rest = firstList.tail()
      newList = this.appendHelper(rest, secondList)
      return new ListNode(h, newList)

  append: (xs) -> # implement this
    return this.appendHelper(this, xs)
  
