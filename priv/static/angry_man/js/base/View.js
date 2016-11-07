define(
    ['backbone'],

function(Backbone) {
    var View = Backbone.View.extend({
        close: function() {
            if (this.beforeClose) {
                this.beforeClose();
            }
            this.remove();
            this.unbind();
        }
    });

    return View;
});
