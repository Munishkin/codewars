
# dataArray = [ '##################################',
#   'Location: DEU',
#   '##################################',
#   ' Ammonia: 023 particles',
#   ' Nitrogen Oxide: 919 particles',
#   ' Carbon Monoxide: 027 particles',
#   '##################################',
#   '##################################',
#   'Location: USA',
#   '##################################',
#   ' Ammonia: 422 particles',
#   ' Nitrogen Oxide: 220 particles',
#   ' Carbon Monoxide: 130 particles',
#   '##################################',
#   '##################################',
#   'Location: AUS',
#   '##################################',
#   ' Ammonia: 122 particles',
#   ' Nitrogen Oxide: 102 particles',
#   ' Carbon Monoxide: 399 particles',
#   '##################################',
#   '##################################',
#   'Location: BHS',
#   '##################################',
#   ' Ammonia: 323 particles',
#   ' Nitrogen Oxide: 363 particles',
#   ' Carbon Monoxide: 399 particles',
#   '##################################',
#   '##################################',
#   'Location: BRB',
#   '##################################',
#   ' Ammonia: 344 particles',
#   ' Nitrogen Oxide: 324 particles',
#   ' Carbon Monoxide: 314 particles',
#   '##################################',
#   '##################################',
#   'Location: CHN',
#   '##################################',
#   ' Ammonia: 422 particles',
#   ' Nitrogen Oxide: 477 particles',
#   ' Carbon Monoxide: 398 particles',
#   '##################################',
#   '##################################',
#   'Location: COG',
#   '##################################',
#   ' Ammonia: 044 particles',
#   ' Nitrogen Oxide: 144 particles',
#   ' Carbon Monoxide: 244 particles',
#   '##################################',
#   '##################################',
#   'Location: CRI',
#   '##################################',
#   ' Ammonia: 092 particles',
#   ' Nitrogen Oxide: 099 particles',
#   ' Carbon Monoxide: 399 particles',
#   '##################################',
#   '##################################',
#   'Location: ISL',
#   '##################################',
#   ' Ammonia: 021 particles',
#   ' Nitrogen Oxide: 009 particles',
#   ' Carbon Monoxide: 077 particles',
#   '##################################',
#   '##################################',
#   'Location: VEN',
#   '##################################',
#   ' Ammonia: 102 particles',
#   ' Nitrogen Oxide: 103 particles',
#   ' Carbon Monoxide: 022 particles',
#   '##################################',
#   '' ]

parseData = () ->
  # Remember, your data is in a global variable dataFile
  dataArray = dataFile.split('\n')
  highest =
    'Ammonia' : 0
    'Nitrogen Oxide' : 0
    'Carbon Monoxide' : 0
  countries =
    'Ammonia' : []
    'Nitrogen Oxide' : []
    'Carbon Monoxide' : []

  for row in dataArray
    trow = row.trim()
    if trow.indexOf('Location:') >= 0
      location = trow.substring(trow.length - 3)
    else if trow.indexOf('#') < 0 && trow > '' # one of the three pollutant
        idx = trow.indexOf(':')
        idxParticle = trow.indexOf('particles')
        pollutant = trow.substring(0, idx) #pollutant name excluding colon
        particleCount = parseInt(trow.substring(idx + 2, idxParticle))
        #console.log { location: location, pollutant: pollutant, particleCount: particleCount }
        maxLevel = highest[pollutant]
        if particleCount > maxLevel
          highest[pollutant] = particleCount
          countries[pollutant] = [location]
        else if particleCount is maxLevel
          countries[pollutant].push(location)

  ammonCountries = countries['Ammonia'].join(', ')
  no2Countries = countries['Nitrogen Oxide'].join(', ')
  coCountries = countries['Carbon Monoxide'].join(', ')

  "Ammonia levels in #{ammonCountries} are too high. Nitrogen Oxide levels in #{no2Countries} are too high. Carbon Monoxide levels in #{coCountries} are too high."

console.log(parseData())
