define(['underscore', 'backbone', 'storage', 'models/ShowModel'], 
function(_, Backbone, Store, ShowModel){
	var WatchlistCollection = Backbone.Collection.extend({
        model : ShowModel,

        localStorage: new Store("show")

    });

    return WatchlistCollection;
});