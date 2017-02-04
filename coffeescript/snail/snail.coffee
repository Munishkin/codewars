snail = (array) ->
  # enjoy
  traversal = []
  if array.length is 1 and array[0].length is 0 then return []

  row = 0
  col = 0
  turn = 0
  direction = 'E'
  while traversal.length < (array.length * array.length)
    traversal.push (array[row][col])
    # consider next square to visit
    if direction is 'E'
      col += 1
      # need to change direction?
      if col is (array.length - 1) - turn then direction = 'S'
    else if direction is 'S'
      row += 1
      if row is (array.length - 1) - turn then direction = 'W'
    else if direction is 'W'
      col -= 1
      if col is turn then direction = 'N'
    else if direction is 'N'
      row -= 1
      if row is (turn + 1)
        direction = 'E'
        turn += 1
  traversal
