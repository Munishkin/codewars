class UriBuilder
  
  constructor: (@url) ->
    @params = {}
    idx = @url.indexOf('?')
    if idx >= 0
      lstParams = @url.substring(idx + 1)
      @url = @url.substring(0, idx)

      paramPairs = lstParams.split('&')
      for paramPair in paramPairs
        param = paramPair.split('=')
        @params[param[0]] = param[1]
    
  build: () ->
    strParams = ''
    for k, v of @params
      strParams += '&' if strParams isnt ''
      strParams += k + '=' + encodeURIComponent(v)
    
    @url + ('?' + strParams if strParams isnt '')