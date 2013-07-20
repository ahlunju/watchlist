define(['underscore', 'backbone', 'storage', 'models/SearchModel'], 
function(_, Backbone, Store, SearchModel){

	var WatchlistCollection = Backbone.Collection.extend({

    model: SearchModel,
    url: 'http://search.guide.getglue.com/objects?q=True%20Blood',

    localStorage: new Store("SearchCollection"),

    

  });

});