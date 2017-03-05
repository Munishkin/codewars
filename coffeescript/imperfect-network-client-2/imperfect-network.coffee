class NetworkClient
  constructor: (@sendFunction, @callback) ->
    @msgIdAccumulator = [];
    @msgBuffer = [];
    @msgId = 0;
    @processMsgId = 0;

  send: (data) ->
    # could wrap data with extra information to send
    packedData = JSON.stringify { data: data, msgId: this.msgId }
    @sendFunction packedData
    @msgId += 1

  recv: (data) ->
    # could unpack data and validate
    packedData = JSON.parse data
    { msgId } = packedData;
    # check duplicate
    if this.msgIdAccumulator.indexOf(msgId) < 0
       @msgIdAccumulator.push msgId;
       @msgBuffer.push packedData;
       findNextMsg = (a) -> a.msgId is @processMsgId
       idx = @msgBuffer.findIndex findNextMsg
       while idx >= 0
         { origData } = @msgBuffer.splice(idx, 1)[0]
         @callback origData;
         @processMsgId += 1;
         idx = @msgBuffer.findIndex findNextMsg


PerfectNetwork = (callbackA, callbackB) ->
  network = this
  @clientA = new NetworkClient((data) ->
    network.clientB.recv data
  , callbackA)
  @clientB = new NetworkClient((data) ->
    network.clientA.recv data
  , callbackB)
  return

network = new PerfectNetwork((data) ->
  console.log 'CLIENT-A Got: ' + data
, (data) ->
  console.log 'CLIENT-B Got: ' + data
)

network.clientA.send "abcd"
network.clientA.send "wxyz"
network.clientB.send "1234"
network.clientA.send "EOF"
