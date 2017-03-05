function NetworkClient (sendFunction, callback) {
    this.sendFunction = sendFunction;
    this.callback = callback;
    this.msgIdAccumulator = [];
    this.msgId = 0;
}

NetworkClient.prototype.send = function (data) {
    // Could wrap data with extra information to send
    let jsonData = JSON.stringify({data: data, msgId: this.msgId });
    this.sendFunction(jsonData);
    this.msgId += 1;
};

NetworkClient.prototype.recv = function (data) {
    // Could unpack data and validate
    let jsonData = JSON.parse(data);
    let {data: origData, msgId} = jsonData;
    if (this.msgIdAccumulator.indexOf(msgId) < 0) {
       this.msgIdAccumulator.push(msgId);
       this.callback(origData);
    }
};
