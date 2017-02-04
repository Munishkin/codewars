initialize = (size) ->
  spirals = []
  for i in [0...size]
    row = []
    for j in [0...size]
      row.push 0
    spirals.push row
  spirals
  
inRange = (row, col, size) ->
  return row >= 0 and row <= (size - 1) and col >= 0 and col <= (size - 1)

isOccupied = (neighbors, size, spirals) ->
  for n in neighbors
    if inRange(n[0], n[1], size) is true and spirals[n[0]][n[1]] is 1
      return true

spiralize = (size) ->
  
  if size < 5 then return []
  spirals = initialize size

  row = 0
  col = 0
  turn = 0
  direction = 'E'
  last = size - 1

  while true
    
    # consider next square to visit
    if direction is 'E'
      spirals[row][col] = 1
      col += 1
      
      # make sure up, down and right neighbors are not occupied
      if isOccupied([[row-1, col], [row+1,col], [row,col+1]], size, spirals) is true then return spirals

      # need to change direction?
      if col is (last - turn) then direction = 'S'
            
    else if direction is 'S'
      spirals[row][col] = 1
      row += 1

      # make sure left, right and down neighbors are not occupied
      if isOccupied([[row, col-1], [row,col+1], [row+1,col]], size, spirals) is true then return spirals

      if row is (last - turn) then direction = 'W'
       
    else if direction is 'W'
      spirals[row][col] = 1
      col -= 1

      # make sure left, up and down neighbors are not occupied
      if isOccupied([[row+1, col], [row-1,col], [row,col-1]], size, spirals) is true then return spirals

      if col is turn then direction = 'N'

    else if direction is 'N'
      spirals[row][col] = 1
      row -= 1

      # make sure left, right and up neighbors are not occupied
      if isOccupied([[row, col-1], [row,col+1], [row-1,col]], size, spirals) is true then return spirals

      if row is (turn + 2)
        spirals[row][col] = 1
        direction = 'E'
        turn += 2

  spirals
