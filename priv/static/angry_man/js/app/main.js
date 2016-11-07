require(['jquery', 'underscore', 'backbone',
    'util/socket', 'util/Command', 'util/Loader', 'util/Keyboard',
    'view/LoginView', 'view/CreditsView', 'model/CreditCollection',
    'model/MapModel', 'model/HeroModel', 'model/CameraModel', 'model/PlayerModel', 'model/GameModel',
    'view/GameView'],

function($, _, Backbone, Socket, Command, Loader, Keyboard, LoginView, CreditsView, Credits, Map, Hero, Camera, Player, Game, GameView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'game/:nickName/:character': 'gameApp'
        },

        home: function() {
            this.loginView = new LoginView();
            this.credits = new Credits([
                {name: 'pigBrain', link: 'https://github.com/pigbrain'},
                {name: 'dogfoot', link: 'https://github.com/dogfoot'},
                {name: 'dreamguid', link: 'https://github.com/dreamguide'},
                {name: 'angjoong', link: 'https://github.com/angjoong'}
            ]);

            this.creditsView = new CreditsView({model: this.credits});
            $('#credit').html(this.creditsView.el);
        },
        gameApp: function(nickName, character) {
            var promise = this.loadImage();

            Promise.all(promise).then(function() {
                this.loadGame(nickName, character);
            }.bind(this));

        },
        loadImage: function() {
            return [
                Loader.loadImage('tiles', 'http://10.77.32.44:6060/static/angry_man/img/tiles.png'),
                Loader.loadImage('hero', 'http://10.77.32.44:6060/static/angry_man/img/character.png')
            ];
        },
        loadGame: function(nickName, character) {
            this.socket = new Socket('ws://10.77.32.44:6060/am');
            this.command = new Command(this.socket);
            this.command.reqLogin(nickName, character);

            this.map = new Map();
            this.hero = new Hero({map: this.map, image: Loader.getImage('hero')});
            this.camera = new Camera({
                width: 512,
                height:512,
                mapTsize: this.map.get('tsize'),
                mapCols: this.map.get('cols'),
                mapRows: this.map.get('rows')
            }).follow(this.hero);

            this.player = new Player({command: this.command});

            Keyboard.listenForEvents([Keyboard.CODE.LEFT, Keyboard.CODE.RIGHT, Keyboard.CODE.UP, Keyboard.CODE.DOWN]);
            Keyboard.movings = this.player.movings(this.player); //moving override

            this.game = new Game({
                map: this.map,
                hero: this.hero,
                camera: this.camera,
                keyboard: Keyboard,
                tileAtlas: Loader.getImage('tiles')
            });

            this.gameView = new GameView({model: this.game});
        }

    });

    window.app = new AppRouter();
    Backbone.history.start();
});