function NetworkClient (sendFunction, callback) {
    this.sendFunction = sendFunction;
    this.callback = callback;
    this.msgIdAccumulator = [];  
    this.msgId = 0;
}

NetworkClient.prototype.send = function (data) {
    // Could wrap data with extra information to send
    this.msgId += 1;
    this.sendFunction(data + this.msgId);
};

NetworkClient.prototype.recv = function (data) {
    // Could unpack data and validate
    var msgId = data.substring(data.length - 1);
    var data = data.substring(0, data.length -1);
    if (this.msgIdAccumulator.indexOf(msgId) < 0) {
       this.msgIdAccumulator.push(msgId);
       this.callback(data);
    }
};