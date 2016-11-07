define(['underscore', 'base/Model'],

function (_, Model) {
    var HeroModel = Model.extend({
        defaults: {
            map: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            image: null
        },
        initialize: function() {
            var tsize = this.get('map').get('tsize');
            this.set('width', tsize);
            this.set('height', tsize);

            this.SPEED = 256;   // pixels per second
        },

        move: function(delta, dirx, diry) {
            // move hero
            this.set('x', this.get('x') + dirx * this.SPEED * delta);
            this.set('y', this.get('y') + diry * this.SPEED * delta);

            // check if we walked into a non-walkable tile
            this._collide(dirx, diry);

            // clamp values
            var maxX = this.get('map').get('cols') * this.get('map').get('tsize');
            var maxY = this.get('map').get('rows')* this.get('map').get('tsize');
            this.set('x', Math.max(0, Math.min(this.get('x'), maxX)));
            this.set('y', Math.max(0, Math.min(this.get('y'), maxY)));
        },
        _collide: function(dirx, diry) {
            var row, col;
            // -1 in right and bottom is because image ranges from 0..63
            // and not up to 64
            var left = this.get('x') - this.get('width') / 2;
            var right = this.get('x') + this.get('width') / 2 - 1;
            var top = this.get('y') - this.get('height') / 2;
            var bottom = this.get('y') + this.get('height') / 2 - 1;

            // check for collisions on sprite sides
            var collision =
                this.get('map').isSolidTileAtXY(left, top) ||
                this.get('map').isSolidTileAtXY(right, top) ||
                this.get('map').isSolidTileAtXY(right, bottom) ||
                this.get('map').isSolidTileAtXY(left, bottom);
            if (!collision) {
                return;
            }

            if (diry > 0) {
                row = this.get('map').getRow(bottom);
                this.set('y', -this.get('height') / 2 + this.get('map').getY(row));
            } else if (diry < 0) {
                row = this.get('map').getRow(top);
                this.set('y', this.get('height') / 2 + this.get('map').getY(row + 1));
            } else if (dirx > 0) {
                col = this.get('map').getCol(right);
                this.set('x', -this.get('width') / 2 + this.get('map').getX(col));
            } else if (dirx < 0) {
                col = this.get('map').getCol(left);
                this.set('x', this.get('width') / 2 + this.get('map').getX(col + 1));
            }
        }
    });

    return HeroModel;
});

