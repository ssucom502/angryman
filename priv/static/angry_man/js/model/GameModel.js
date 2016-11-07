define(['underscore', 'base/Model'],

function (_, Model) {
    var GameModel = Model.extend({
        defaults: {
            previousElapsed: 0,
            map: null,
            hero: null,
            camera: null,
            keyboard: null,
            tileAtlas: null
        },

        update: function (delta) {
            var dirx = 0;
            var diry = 0;
            var keyboard = this.get('keyboard');

            if (keyboard.isDown(keyboard.CODE.LEFT)) {
                dirx = -1;
            } else if (keyboard.isDown(keyboard.CODE.RIGHT)) {
                dirx = 1;
            } else if (keyboard.isDown(keyboard.CODE.UP)) {
                diry = -1;
            } else if (keyboard.isDown(keyboard.CODE.DOWN)) {
                diry = 1;
            }

            this.get('hero').move(delta, dirx, diry);
            this.get('camera').update();
        },

        getDrawConfig: function () {
            var camera = this.get('camera');
            var map = this.get('map');

            var tsize =  map.get('tsize'),
                startCol =  Math.floor(camera.get('x') / tsize),
                endCol =  startCol + (camera.get('width') / tsize),
                startRow =  Math.floor(camera.get('y') / tsize),
                endRow =  startRow + (camera.get('height') / tsize),
                offsetX =  -camera.get('x') + startCol * tsize,
                offsetY =  -camera.get('y') + startRow * tsize,
                tileAtlas =  this.get('tileAtlas'),
                getTile =  map.getTile;

            return {
                tsize: tsize,
                startCol: startCol,
                endCol: endCol,
                startRow: startRow,
                endRow: endRow,
                offsetX: offsetX,
                offsetY: offsetY,
                tileAtlas: tileAtlas,
                getTile: getTile.bind(map)
            };
        }
    });

    return GameModel;
});
