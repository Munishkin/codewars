function OOODuplicatingNetwork(callbackA, callbackB) {
    var network = this;
    this.pending = {};
    this.pattern = [0];
    this.time = 0;
    this.clientA = new NetworkClient(
        function (data) { network.sendTo(network.clientB,data); }, callbackA);
    this.clientB = new NetworkClient(
        function (data) { network.sendTo(network.clientA,data); }, callbackB);
};

OOODuplicatingNetwork.prototype.addData = function (dt,client,data) {
    var fireAt = this.time + dt;
    if (this.pending[fireAt] == undefined) {
        this.pending[fireAt] = [];
    }
    this.pending[fireAt].push(function () {
        client.recv(data);
    });
};

OOODuplicatingNetwork.prototype.sendPending = function () {
    if (this.pending.hasOwnProperty(this.time)) {
        var now = this.time;
        this.pending[this.time].forEach( function (fn) {
            fn();
        });
        delete this.pending[this.time];
    }
};

OOODuplicatingNetwork.prototype.finish = function () {
    while (Object.keys(this.pending).length > 0) {
        this.sendPending();
        ++this.time;
    }
};

OOODuplicatingNetwork.prototype.sendTo = function (client,data) {
    var newTime = this.time;
    if (typeof(data) == 'string') {
        var network = this;
        this.pattern.forEach(function (dt) {
            network.addData(dt,client,data);
        });
        ++newTime;
    }
    this.sendPending();
    this.time = newTime;
};

function oooDuplicationTest(actions) {
    var gotA = [];
    var gotB = [];

    var network = new OOODuplicatingNetwork(
        function (data) { gotA.push(data); },
        function (data) { gotB.push(data); }
    );

    var client = network.clientA;
    actions.forEach(function (a) {
        if (typeof(a) == 'string') {
            client.send(a);
        } else if (a === null) {
            client = (client == network.clientA)
                ? network.clientB : network.clientA;
        } else {
            network.pattern = a;
        }
    });

    network.finish();

    return { 'a': gotA, 'b': gotB };
};

var allASCII = "";
for (var i = 0; i < 256; ++i) {
  allASCII += String.fromCharCode(i);
}

Test.assertSimilar(
  oooDuplicationTest(['a1',null,'b1',null,'a2']),
  { 'a': [ 'b1' ], 'b': [ 'a1', 'a2' ] },
  "Sends [A1,B1,A2], Recvs [A1,B1,A2]");
Test.assertSimilar(
  oooDuplicationTest([[0,0],'a1',null,[0],'b1',null,[0,0],'a2']),
  { 'a': [ 'b1' ], 'b': [ 'a1', 'a2' ] },
  "Sends: [A1,B1,A2], Recvs [A1,A1,B1,A2,A2]");
Test.assertSimilar(
  oooDuplicationTest([[3],'a1',null,[0],'b1',null,'a2']),
  { 'a': [ 'b1' ], 'b': [ 'a1', 'a2' ] },
  "Sends: [A1,B1,A2], Recvs [B1,A2,A1]");
Test.assertSimilar(
  oooDuplicationTest([[3],'a1',null,[0],'b1',null,[0,2],'a2']),
  { 'a': [ 'b1' ], 'b': [ 'a1', 'a2' ] },
  "Sends: [A1,B1,A2], Recvs [B1,A2,A1,A2]");
Test.assertSimilar(
  oooDuplicationTest([[1],allASCII,'a2']),
  { 'a': [], 'b': [ allASCII, 'a2' ] },
  "Sends: all ascii characters then 'a2', Recvs each message twice.");
