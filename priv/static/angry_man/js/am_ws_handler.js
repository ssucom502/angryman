

var ws = ws || {};

(function (ws) {
    var resultCode = {
        SUCCESS : '200'
    };

    var webSocket = undefined;
    var command = [];

    var init = function () {
        webSocket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/am");
        webSocket.onopen = function (evt) {
            onOpen(evt);
        };
        webSocket.onclose = function (evt) {
            onClose(evt);
        };
        webSocket.onmessage = function (evt) {
            onMessage(evt);
        };
        webSocket.onerror = function (evt) {
            onError(evt);
        };
    };

    var destroy = function() {
        webSocket.close();
    };

    var onOpen = function(evt) {
    };

    var onClose = function(evt) {
    };

    var onMessage = function(evt) {
        var jsonResponse = JSON.parse(evt.data);
        if (jsonResponse.result == resultCode.SUCCESS) {
            command[jsonResponse.commandId](jsonResponse);
        } else {
            console.log(evt.data);
        }
    };

    var onError = function(evt) {
    };

    var send = function(data) {
        if(webSocket.readyState == webSocket.OPEN) {
            webSocket.send(data);
        }
    };

    var registerCommand = function(commandId, callback) {
        command[commandId] = callback;
    };

    ws.init = init;
    ws.destroy = destroy;
    ws.send = send;
    ws.registerCommand = registerCommand;

})(ws);
