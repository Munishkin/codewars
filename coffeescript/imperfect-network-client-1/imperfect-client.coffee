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

# Test cases
# Example of a duplicating network...
class DuplicatingNetwork
  constructor: (@callbackA, @callbackB) ->
    network = this;
    @duplicates = 0;
    network.clientA = new NetworkClient(((data) ->
      network.sendTo(network.clientB,data))
      , @callbackA)
    network.clientB = new NetworkClient(((data) ->
      network.sendTo(network.clientA,data))
      , @callbackB)

  sendTo: (client,data) ->
    if typeof(data) is 'string'
      for i in [0..@duplicates]
        client.recv data
    else
      throw "Data must be a string."

class DuplicationTest
  @myTest: (actions) ->
    accum = ''

    network = new DuplicatingNetwork(((data) ->
      accum += ':A:' + data),
      ((data) -> accum += ':B:' + data)
    )

    client = network.clientA
    actions.forEach ((a) ->
      if typeof(a) is 'string'
        client.send a
      else if typeof(a) is 'number'
        network.duplicates = a
      else
        client = if client is network.clientA then network.clientB else network.clientA
    )

    return accum

allASCII = "";
for i in [0..255]
  allASCII += String.fromCharCode(i);

console.log(DuplicationTest.myTest([0,'abc',null,'xyz',null,'def']) is ':B:abc:A:xyz:B:def')
console.log(DuplicationTest.myTest([0,'abc','abc',null,'xyz',null,'abc']) is ':B:abc:B:abc:A:xyz:B:abc')
console.log(DuplicationTest.myTest([1,'abc',null,0,'xyz',null,1,'def']) is ':B:abc:A:xyz:B:def')
console.log(DuplicationTest.myTest([0,'abc',null,2,'xyz',null,0,'def']) is ':B:abc:A:xyz:B:def')
console.log(DuplicationTest.myTest([1,',#?!<>[]{}',2,'1234567890ABab']) is ':B:,#?!<>[]{}:B:1234567890ABab')
console.log(DuplicationTest.myTest([1,allASCII]) is ':B:' + allASCII)

# Test.expect(duplicationTest([0,'abc',null,'xyz',null,'def']) ==
#                             ':B:abc:A:xyz:B:def',
#             "No duplications at all.");
# Test.expect(duplicationTest([0,'abc','abc',null,'xyz',null,'abc']) ==
#                             ':B:abc:B:abc:A:xyz:B:abc',
#             "Same message, but not duplicated.");
# Test.expect(duplicationTest([1,'abc',null,0,'xyz',null,1,'def']) ==
#                             ':B:abc:A:xyz:B:def',
#             "A duplicates each send to B.");
# Test.expect(duplicationTest([0,'abc',null,2,'xyz',null,0,'def']) ==
#                             ':B:abc:A:xyz:B:def',
#             "B sends three duplicates to A.");
# Test.expect(duplicationTest([1,',#?!<>[]{}',2,'1234567890ABab']) ==
#                             ':B:,#?!<>[]{}:B:1234567890ABab',
#             "Duplicates with punctuation in messages.");
# Test.expect(duplicationTest([1,allASCII]) ==
#                             ':B:' + allASCII,
#             "Duplicates with all ASCII characters in the message.");
