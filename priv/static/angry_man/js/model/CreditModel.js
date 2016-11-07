
define(['underscore', 'base/Model'],

function (_, Model) {
    var CreditModel = Model.extend({
        defualts: {
            link: '',
            name: ''
        }
    });

    return CreditModel;
});
