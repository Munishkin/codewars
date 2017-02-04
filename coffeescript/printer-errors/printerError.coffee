printerError = (s) ->
  goodAlphabet = "abcdefghijklm"
  errorCount = 0
  for x in s
    if x not in goodAlphabet then errorCount += 1
  "#{errorCount}/#{s.length}"