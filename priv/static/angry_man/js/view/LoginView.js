define(['underscore', 'base/View'],

function (_, View) {
    var LoginView = View.extend({
        el: '#login',

        events: {
            'click .player' : 'changePlayer',
            'click #loginBtn' : 'login'
        },
        changePlayer: function(event) {
            this.$('.player').removeClass('select');
            $(event.target).closest('.player').addClass('select');
        },
        login: function() {
            var nickName = $("#nicknameText").val();
            var character = this.$(".player.select" ).attr('id');
            app.navigate('#game/'+nickName+'/'+character, {trigger:true});
            this.close();
        }

    });

    return LoginView;
});