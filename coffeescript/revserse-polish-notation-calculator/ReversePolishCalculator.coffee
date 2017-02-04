calc = (expr) ->
  # Your awesome code here
  if expr is "" then return 0
  stack = []
  tokens = expr.split(' ')
  for token in tokens
    if token in ['+','-', '*', '/']
      # pop the last two values, calculate the total and push the result back
      operands = stack.splice(stack.length - 2, 2)
      result = 0
      if token is '+' then result = operands[0] + operands[1]
      if token is '-' then result = operands[0] - operands[1]
      if token is '*' then result = operands[0] * operands[1]
      if token is '/' then result = operands[0] / operands[1]
      stack.push result
    else
      # push the value in stack
      stack.push (Number(token))
  # return the last value in stack
  stack[stack.length - 1]
