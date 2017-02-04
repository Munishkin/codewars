LCS = (x, y) ->
  lcsArray = []
  lcsSeqArray = []
  longestSeq = ''
  longestLength = -1
  for i in [0..x.length]
    t = []
    s = []
    for j in [0..y.length]
      t.push(0)
      s.push('')
    lcsArray.push(t)
    lcsSeqArray.push(s)

  for i in [0...x.length]
    for j in [0...y.length]
      if x[i] is y[j]
        lcsArray[i+1][j+1] = 1 + lcsArray[i][j]
        lcsSeqArray[i+1][j+1] = lcsSeqArray[i][j] + x[i]
      else
        if lcsArray[i][j+1] > lcsArray[i+1][j]
          lcsArray[i+1][j+1] = lcsArray[i][j+1]
          lcsSeqArray[i+1][j+1] = lcsSeqArray[i][j+1]
        else
          lcsArray[i+1][j+1] = lcsArray[i+1][j]
          lcsSeqArray[i+1][j+1] = lcsSeqArray[i+1][j]
          
      if longestLength < lcsArray[i+1][j+1]
        longestSeq = lcsSeqArray[i+1][j+1]
        longestLength = lcsArray[i+1][j+1]
  longestSeq
