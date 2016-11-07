require.config({
    deps: ['app/main'],

    baseUrl: '../static/angry_man/js',

    paths: {
        //library
        'jquery': '../../lib/js/jquery-3.1.1.min',
        'underscore': '../../lib/js/underscore-min',
        'backbone': '../../lib/js/backbone-min',
        'bootstrap': '../../lib/js/bootstrap.min'
    },

    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
