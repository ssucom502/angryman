define(['underscore', 'base/Collection', 'model/CreditModel'],

function(_, Collection, Credit) {
    var Credits = Collection.extend({
        model: Credit
    });

    return Credits;
});

