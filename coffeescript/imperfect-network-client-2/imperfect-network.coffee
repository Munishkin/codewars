class NetworkClient
  constructor: (@sendFunction, @callback) ->
    @msgIdAccumulator = []
    @msgBuffer = []
    @msgId = 0
    @processMsgId = 0

  send: (data) ->
    # could wrap data with extra information to send
    packedData = JSON.stringify { data: data, msgId: @msgId }
    @sendFunction packedData
    @msgId += 1

  recv: (data) ->
    # could unpack data and validate
    packedData = JSON.parse data
    { msgId } = packedData;

    # check duplicate
    if @msgIdAccumulator.indexOf(msgId) < 0
       @msgIdAccumulator.push msgId;
       @msgBuffer.push packedData;
       findNextMsg = (a) => a.msgId is @processMsgId
       idx = @msgBuffer.findIndex findNextMsg
       while idx >= 0
         { data: origData } = @msgBuffer.splice(idx, 1)[0]
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

#### test cases
class OOODuplicatingNetwork
  constructor: (@callbackA, @callbackB) ->
    network = this
    @pending = {}
    @pattern = [0]
    @time = 0
    network.clientA = new NetworkClient(((data) ->
      network.sendTo(network.clientB,data)
      return
      ),  @callbackA)
    network.clientB = new NetworkClient(((data) ->
      network.sendTo(network.clientA,data)
      return
    ), @callbackB)

  addData: (dt,client,data) ->
    fireAt = @time + dt
    if not @pending[fireAt]? then @pending[fireAt] = []
    @pending[fireAt].push(() -> client.recv(data))

  sendPending: () ->
    if @pending.hasOwnProperty(@time)
        now = @time
        @pending[@time].forEach((fn) -> fn())
        delete @pending[@time]

  finish: () ->
    while Object.keys(@pending).length > 0
        @sendPending()
        @time += 1


  sendTo: (client,data) ->
    newTime = @time
    if typeof(data) is 'string'
        network = this;
        @pattern.forEach((dt) -> network.addData(dt,client,data))
        newTime += 1

    @sendPending()
    @time = newTime

class oooDuplicationTest
  @someTest: (actions) ->
    gotA = []
    gotB = []

    network = new OOODuplicatingNetwork(
        (data) -> gotA.push(data),
        (data) -> gotB.push(data)
    )

    client = network.clientA;
    actions.forEach (a) ->
      if typeof(a) is 'string'
        client.send a
      else if !a?
        client = if client is network.clientA then network.clientB else network.clientA
      else
        network.pattern = a

    network.finish()

    return { 'a': gotA, 'b': gotB }

allASCII = "";
for i in [0..255]
  allASCII += String.fromCharCode(i)

console.log(oooDuplicationTest.someTest(['a1',null,'b1',null,'a2']))
console.log(oooDuplicationTest.someTest([[0,0],'a1',null,[0],'b1',null,[0,0],'a2']))
console.log(oooDuplicationTest.someTest([[3],'a1',null,[0],'b1',null,'a2']))
console.log(oooDuplicationTest.someTest([[3],'a1',null,[0],'b1',null,[0,2],'a2']))
console.log(oooDuplicationTest.someTest([[1],allASCII,'a2']))
