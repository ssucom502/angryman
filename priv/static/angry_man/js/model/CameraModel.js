define(['underscore', 'base/Model'],

function (_, Model) {
    var CameraModel = Model.extend({
        defaults: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            maxX: 0,
            maxY: 0,
            mapCols: 0,
            mapRows: 0,
            mapTsize: 0
        },
        initialize: function() {
            this.set('maxX', this.get('mapCols') * this.get('mapTsize') - this.get('width'));
            this.set('maxY', this.get('mapRows') * this.get('mapTsize') - this.get('height'));

            console.log(this.toJSON());
        },
        follow: function(sprite) {
            this.following = sprite;
            sprite.set('screenX', 0);
            sprite.set('screenY', 0);

            return this;
        },
        update: function() {
            // assume followed sprite should be placed at the center of the screen
            // whenever possible
            this.following.set('screenX', this.get('width') / 2);
            this.following.set('screenY', this.get('height') / 2);

            // make the camera follow the sprite
            this.set('x', this.following.get('x') - this.get('width') / 2);
            this.set('y', this.following.get('y') - this.get('height') / 2);
            // clamp values
            this.set('x', Math.max(0, Math.min(this.get('x'), this.get('maxX'))));
            this.set('y', Math.max(0, Math.min(this.get('y'), this.get('maxY'))));

            // in map corners, the sprite cannot be placed in the center of the screen
            // and we have to change its screen coordinates

            // left and right sides
            if (this.following.get('x') < this.get('width') / 2 ||
                this.following.get('x') > this.get('maxX') + this.get('width') / 2) {
                this.following.set('screenX', this.following.get('x') - this.get('x'));
            }
            // top and bottom sides
            if (this.following.get('y') < this.get('height') / 2 ||
                this.following.get('y') > this.get('maxY') + this.get('height') / 2) {
                this.following.set('screenY', this.following.get('y') - this.get('y'));
            }

            return this;
        }
    });

    return CameraModel;
});

