define(['jquery','underscore', 'backbone','views/ResultView','vent'],
function($, _, Backbone, ResultView, vent) {
	var ResultsView = Backbone.View.extend({
        el: $('#search'),

        events: {
            'keyup #new-search' : 'getURL'
        },

        initialize: function(){
            this.listenTo(this.collection, 'all', this.render);
        },

        render : function() {
            this.$('#search-list').empty();
            // for each result, create a view and append it to the list.
            this.collection.each(function(result) {
                var resultView = new ResultView({ model : result });
                this.$('#search-list').append(resultView.render().el);
            }, this);

            return this;
        },

        addFav: function(){
            this.$('.add-fav').click(function(){
                vent.trigger('addToWatchlist');
            });
        },
        getURL : function(){
            var that = this;
            console.log('getURL');
            this.collection.value = this.$("#new-search").val();
            this.collection.fetch({
                reset : true
            });
            console.log(this.collection.toJSON());
        },
    });

    return ResultsView;
});
