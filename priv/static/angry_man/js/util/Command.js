define([],

function() {
    var commandId = {
        LOGIN_C2S : '100000',
        LOGIN_S2C : '100001',
        MOVE_C2S : '100010',
        MOVE_S2C : '100011',

        HEARTBEAT_C2S : '500000',
        HEARTBEAT_S2C : '500001'
    };

    var Command = function(socket) {
        this.ws = socket;
        this.ws.registerCommand(commandId.HEARTBEAT_S2C, this.resHeartBeat);
        this.ws.registerCommand(commandId.LOGIN_S2C, this.resLogin);
        this.ws.registerCommand(commandId.MOVE_S2C, this.resMove);
    };

    Command.prototype.resHeartBeat = function(data) { };

    Command.prototype.reqLogin = function(nickname, character) {

        var command = {
            commandId: commandId.LOGIN_C2S,
            character: character,
            nickname: nickname == '' ? Math.random().toString(36).substring(5) : nickname
        };

        this.post(command);
    };

    Command.prototype.resLogin = function(data) {
        console.log("response login " + data);

        $("#login").hide();
        $("#play").show();
    };

    Command.prototype.reqMove = function(directionX, directionY, positionX, positionY) {

        var command = {
            commandId: commandId.MOVE_C2S,
            directionX: directionX,
            directionY: directionY,
            positionX: positionX,
            positionY: positionY
        };

        this.post(command);
    };

    Command.prototype.resMove = function(data) {
        console.log("response move " + data);

    };

    Command.prototype.post = function(command) {
        this.ws.send(JSON.stringify(command));
    };

    return Command;

});
