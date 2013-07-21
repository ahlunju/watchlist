define(['underscore', 'backbone'], function(_, Backbone) {

	//individual item of watchlist collection
    var ShowModel = Backbone.Model.extend({
        defaults: {
            title : '',
            thumbnail : ''
        },

        initialize: function() {
            if (!this.get("title")) {
                this.set({"title" : this.defaults.content});
            }
        },
        saveItem: function(){
            this.save();
        },
        //remove this model from localStorage
        clear: function(){
            this.destroy();
        }
    });

    return ShowModel;
});
