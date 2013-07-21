define(['underscore', 'backbone', 'storage', 'models/Result'], 
function(_, Backbone, Store, Result){

	var Results = Backbone.Collection.extend({
        model : Result,
        value : null,
        initialize : function(models, options) {
            //this.query = options.query;
        },
        url : function() {
            return 'http://search.guide.getglue.com/objects?q='+this.value; ;
        },
        parse : function(data) {
            return data;
        }
    });

    return Results;
});