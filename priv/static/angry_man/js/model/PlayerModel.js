define(['underscore', 'base/Model'],

function (_, Model) {
    var PlayerModel = Model.extend({
        defualts: {
            positionX: 0,
            positionY: 0,
            directionX: 0,
            directionY: 0,
            command: null
        },

        initialize: function() {
            console.log(this.toJSON());
        },

        move: function(directionX, directionY) {
            this.get('command').reqMove(directionX, directionY, this.get('positionX'), this.get('positionY'));
        },

        movings: function(player) {
            return {
                left: function(){player.move(-1, 0)},
                right: function(){player.move(1,0)},
                up: function(){player.move(0,-1)},
                down: function(){player.move(0,1)},
                stop: function(){player.move(0,0)}
            }
        }

    });

    return PlayerModel;
});

