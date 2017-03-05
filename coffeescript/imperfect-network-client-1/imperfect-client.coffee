class NetworkClient
  constructor: (@sendFunction, @callback) ->
    @msgIdAccumulator = []
    @msgId = 0

  send: (data) ->
    #Could wrap data with extra information to send
    jsonData = JSON.stringify {data: data, msgId: this.msgId }
    @sendFunction jsonData
    @msgId += 1

  recv: (data) ->
    # Could unpack data and validate
    jsonData = JSON.parse(data)
    {data: origData, msgId} = jsonData
    if @msgIdAccumulator.indexOf(msgId) < 0
      @msgIdAccumulator.push msgId
      @callback origData

class PerfectNetwork
  constructor: (@callbackA, @callbackB) ->
    network = this;
    network.clientA = new NetworkClient(((data) ->
      network.clientB.recv data)
      , @callbackA);
    network.clientB = new NetworkClient(((data) ->
      network.clientA.recv data)
      , @callbackB);

perfect = new PerfectNetwork(
  ((data) -> console.log "CLIENT-A Got: " + data)
  ,((data) -> console.log "CLIENT-B Got: " + data)
);

perfect.clientA.send "abcd"
perfect.clientA.send "wxyz"
perfect.clientB.send "1234"
perfect.clientA.send "EOF"
