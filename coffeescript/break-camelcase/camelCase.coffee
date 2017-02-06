solution = (string) ->
  # Complete me!
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  
  strCamelCase = ''
  for s in string
    if s not in alphabet then strCamelCase += s
    else strCamelCase += ' ' + s
  strCamelCase