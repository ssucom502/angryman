define([],

function () {
    return {
        CODE: {
            STATUS: 0,
            LEFT: 37,
            RIGHT: 39,
            UP: 38,
            DOWN: 40
        },
        _keys: {},
        listenForEvents: function(keys) {
            window.addEventListener('keydown', this._onKeyDown.bind(this));
            window.addEventListener('keyup', this._onKeyUp.bind(this));

            keys.forEach(function (key) {
                this._keys[key] = false;
            }.bind(this));
        },
        _onKeyDown: function(event) {
            var keyCode = event.keyCode;
            if (keyCode in this._keys) {
                event.preventDefault();
                this._keys[keyCode] = true;

                if (this.CODE.STATUS !== keyCode) {
                    switch (keyCode) {
                        case this.CODE.LEFT :
                            this.movings.left();
                            break;
                        case this.CODE.RIGHT :
                            this.movings.right();
                            break;
                        case this.CODE.UP :
                            this.movings.up();
                            break;
                        case this.CODE.DOWN :
                            this.movings.down();
                            break;
                    }

                    this.CODE.STATUS = keyCode;
                }
            }
        },
        _onKeyUp: function(event) {
            var keyCode = event.keyCode;
            if (keyCode in this._keys) {
                event.preventDefault();
                this._keys[keyCode] = false;

                this.movings.stop();
                this.CODE.STATUS = 0;
            }
        },
        isDown: function(keyCode) {
            if (!keyCode in this._keys) {
                throw new Error('Keycode ' + keyCode + ' is not being listened to');
            }
            return this._keys[keyCode];
        },
        // Should be overridden
        movings: {
            left: function(){console.log('move left');},
            right: function(){console.log('move right');},
            up: function(){console.log('move up');},
            down: function(){console.log('move down');},
            stop: function(){console.log('move stop');}
        }

    }
});
