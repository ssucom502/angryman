define(['underscore', 'base/View'],

function (_, View) {
    var GameView = View.extend({
        el: '#demo',

        initialize: function() {
            this.context = this.el.getContext('2d');
            this._previousElapsed = 0;

            this.model.bind('change', this.render, this);

            window.requestAnimationFrame(this.tick.bind(this));
        },

        tick: function(elapsed) {
            window.requestAnimationFrame(this.tick.bind(this));

            // clear previous frame
            this.context.clearRect(0, 0, 512, 512);

            // compute delta time in seconds -- also cap it
            var delta = (elapsed - this._previousElapsed) / 1000.0;
            delta = Math.min(delta, 0.25); // maximum delta of 250 ms
            this._previousElapsed = elapsed;

            this.model.update(delta);
            this.render();
        },

        render: function() {
            var hero = this.model.get('hero');
            // draw map background layer
            this._drawLayer(0);

            // draw main character
            this.context.drawImage(
                hero.get('image'),
                hero.get('screenX') - hero.get('width') / 2,
                hero.get('screenY') - hero.get('height') / 2
            );

            // draw map top layer
            this._drawLayer(1);

            //this._drawGrid();

            return this;
        },

        _drawLayer: function(layer) {
            var config = this.model.getDrawConfig();
            for (var c = config.startCol; c <= config.endCol; c++) {
                for (var r = config.startRow; r <= config.endRow; r++) {
                    var tile = config.getTile(layer, c, r);
                    var x = (c - config.startCol) * config.tsize + config.offsetX;
                    var y = (r - config.startRow) * config.tsize + config.offsetY;
                    if (tile !== 0) { // 0 => empty tile
                        this.context.drawImage(
                            config.tileAtlas, // image
                            (tile - 1) * config.tsize, // source x
                            0, // source y
                            config.tsize, // source width
                            config.tsize, // source height
                            Math.round(x),  // target x
                            Math.round(y), // target y
                            config.tsize, // target width
                            config.tsize // target height
                        );
                    }
                }
            }
        },

        _drawGrid: function() {
            var map = this.model.get('map'),
                camera = this.model.get('camera'),
                width = map.cols * map.tsize,
                height = map.rows * map.tsize,
                x,
                y;

            for (var r = 0; r < map.rows; r++) {
                x = -this.camera.x;
                y = r * map.tsize - this.camera.y;
                this.context.beginPath();
                this.context.moveTo(x, y);
                this.context.lineTo(width, y);
                this.context.stroke();
            }
            for (var c = 0; c < map.cols; c++) {
                x = c * map.tsize - this.camera.x;
                y = -this.camera.y;
                this.context.beginPath();
                this.context.moveTo(x, y);
                this.context.lineTo(x, height);
                this.context.stroke();
            }
        }



    });

    return GameView;
});
