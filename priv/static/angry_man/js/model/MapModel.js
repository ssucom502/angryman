define(['underscore', 'base/Model'],

function (_, Model) {
    var MapModel = Model.extend({
        defaults: {
            cols: 12,
            rows: 12,
            tsize: 64,
            layers: [[
                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
                3, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 3,
                3, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 3,
                3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
                3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
                3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
            ], [
                4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
                4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
                4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
            ]]
        },
        getTile: function (layer, col, row) {
            return this.get('layers')[layer][row * this.get('cols') + col];
        },
        isSolidTileAtXY: function (x, y) {
            var col = Math.floor(x / this.get('tsize'));
            var row = Math.floor(y / this.get('tsize'));

            // tiles 3 and 5 are solid -- the rest are walkable
            // loop through all layers and return TRUE if any tile is solid
            return this.get('layers').reduce(function (res, layer, index) {
                var tile = this.getTile(index, col, row);
                var isSolid = tile === 3 || tile === 5;
                return res || isSolid;
            }.bind(this), false);
        },
        getCol: function (x) {
            return Math.floor(x / this.get('tsize'));
        },
        getRow: function (y) {
            return Math.floor(y / this.get('tsize'));
        },
        getX: function (col) {
            return col * this.get('tsize');
        },
        getY: function (row) {
            return row * this.get('tsize');
        }
    });

    return MapModel;
});

