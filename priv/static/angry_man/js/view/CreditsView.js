define(['underscore', 'base/View'],

function (_, View) {
    var CreditsView = View.extend({
        tagName: 'ul',
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.append('<ol></ol>');

            _.each(this.model.models, function(credit) {
                this.$('ol').append(new CreditView({model: credit}).render().el);
            }, this);

            this.creditCount = this.model.models.length;
            this.creditHeight = 20;

            this.step(1);

            return this;
        },
        step: function(index) {
            var _this = this;
            this.$('ol').delay(300).animate({
                top: -_this.creditHeight * index
            }, 500, function() {
                _this.step((index + 1) % _this.creditCount);
            });
        }
    });

    var CreditView = View.extend({
        tagName: 'li',

        initialize: function() {
            this.template = _.template('<a href="<%=link%>"><%=name%></a>');
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return CreditsView;
});