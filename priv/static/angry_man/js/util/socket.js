define([],

function() {
    var socket = function(url) {
        var ws = this._webSocket = new WebSocket(url);
        ws.onopen = this._onOpen;
        ws.onclose = this._onClose;
        ws.onmessage = this._onMessage;
        ws.onerror = this._onError;
        this.command = [];
    };

    socket.prototype.resultCode = {
        SUCCESS: '200'
    };

    socket.prototype.send = function(data) {
        if(this._isOpen) {
            this._webSocket.send(data);
        }
    };

    socket.prototype.destroy = function() {
        this._webSocket.close();
    };

    socket.prototype.registerCommand = function(commandId, callback) {
        this.command[commandId] = callback;
    };

    socket.prototype._onOpen = function(evt) {

    };

    socket.prototype._onClose = function(evt) {

    };

    socket.prototype._onMessage = function(evt) {
        var jsonResponse = JSON.parse(evt.data);
        if (jsonResponse.result == this.resultCode.SUCCESS) {
            this.command[jsonResponse.commandId](jsonResponse);
        } else {
            console.log(evt.data);
        }
    };

    socket.prototype._onError = function(evt) {

    };

    socket.prototype._isOpen = function() {
        return this._webSocket.readyState == WebSocket.OPEN;
    };

    return socket;
});
