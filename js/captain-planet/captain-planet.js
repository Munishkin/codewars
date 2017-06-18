const parseData = () => {
  // Remember, your data is in a global variable dataFile
  dataArray = dataFile.split('\n')
  highest = {
    'Ammonia' : 0,
    'Nitrogen Oxide' : 0,
    'Carbon Monoxide' : 0
  };
  countries = {
    'Ammonia' : [],
    'Nitrogen Oxide' : [],
    'Carbon Monoxide' : []
  };

  for (let i = 0; i < dataArray.length; i++) {
    const trow = dataArray[i].trim();
    if (trow.indexOf('Location:') >= 0) {
      location = trow.substring(trow.length - 3)
    } else if (trow.indexOf('#') < 0 && trow > '') { // one of the three pollutant
        idx = trow.indexOf(':');
        idxParticle = trow.indexOf('particles');
        pollutant = trow.substring(0, idx); // pollutant name excluding colon
        particleCount = parseInt(trow.substring(idx + 2, idxParticle));
        if (particleCount > highest[pollutant]) {
          highest[pollutant] = particleCount;
          countries[pollutant] = [location];
        } else if (particleCount === highest[pollutant]) {
          countries[pollutant].push(location);
        }
    }
  }
  ammonCountries = countries['Ammonia'].join(', ');
  no2Countries = countries['Nitrogen Oxide'].join(', ');
  coCountries = countries['Carbon Monoxide'].join(', ');

  return `Ammonia levels in ${ammonCountries} are too high. Nitrogen Oxide levels in ${no2Countries} are too high. Carbon Monoxide levels in ${coCountries} are too high.`;
}
