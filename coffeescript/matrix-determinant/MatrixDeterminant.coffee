determinant = (m) ->
  if m.length is 1 then return m[0][0] 
  if m.length is 2 then return m[0][0] * m[1][1] - m[1][0] * m[0][1]
  det = 0
  for i in [0...m.length]
    value = m[0][i]
    # build the submatrix
    submatrix = []
    for j in [1...m.length]
      row = []
      for k in [0...m.length]
        if k isnt i then row.push m[j][k]
      submatrix.push row
    if i % 2 is 0 then det += value * determinant(submatrix)
    else det -= value * determinant(submatrix)
  det