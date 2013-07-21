define(['jquery','underscore', 'backbone','vent'], function($, _, Backbone, vent) {
    // view of individual search result
    var ResultView = Backbone.View.extend({
        className: 'searched-item',
        
        events : {
            'click .add-fav' : 'addFav'
        },

        render : function() {
            
            this.$el.html("<div><img src='"+ (this.model.get('images').thumbnail) + "'>"+
                    "<h2>"+this.model.get('title')+"</h2>"+
                    "<button class='add-fav'>add to watchlist</button>"+
                    "</div>");
            return this;
        },

        addFav: function(){
                vent.trigger('addToWatchlist', this.model);
                console.log(this.model.get('title'));
                console.log(this.model.get('images').thumbnail);
        },

    });

    return ResultView;
});