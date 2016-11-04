require.config({
    deps: ['app/main'],

    baseUrl: 'js',

    path: {
        //library
        'jquery': '../lib/js/jquery-3.1.1.min.js',
        'underscore': '../lib/js/underscore-min.js',
        'backbone': '../lib/js/backbone-min.js',
        'bootstrap': '../lib/js/bootstrap.min.js'
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
