define(['underscore', 'base/Model'],

function (_, Model) {
    var GameModel = Model.extend({
        initialize: function () {

        },
        defaults: {
            previousElapsed: 0,
            imgSrc: {
                'tiles': '/static/angry_man/img/tiles.png',
                'hero': '/static/angry_man/img/character.png'
            },
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
            var mapTsize = map.get('tsize');

            return {
                tsize: mapTsize,
                startCol: Math.floor(camera.get('x') / mapTsize),
                endCol: this.startCol + (camera.get('width') / mapTsize),
                startRow: Math.floor(camera.get('y') / mapTsize),
                endRow: this.startRow + (camera.get('height') / mapTsize),
                offsetX: -camera.get('x') + this.startCol * mapTsize,
                offsetY: -camera.get('y') + this.startRow * mapTsize,
                tileAtlas: this.get('tileAtlas'),
                getTile: map.getTile
            };
        }
    });

    return GameModel;
});
