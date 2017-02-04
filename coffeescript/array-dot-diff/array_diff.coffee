array_diff = (a, b) ->
  diff_array = []
  for e in a
    if e not in b then diff_array.push e  
  diff_array