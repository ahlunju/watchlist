define(['jquery','underscore', 'backbone','views/ShowView','vent'], 
function($, _, Backbone, ShowView, vent) {
	var WatchlistView = Backbone.View.extend({
        el: $('#watchlist'),

        initialize: function(){
            _.bindAll(this, 'addOne');
            this.listenTo(vent, 'addToWatchlist', this.createItem);
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);
            this.listenTo(this.collection, 'all', this.render);

            this.collection.fetch();
        },

        render : function(){
            console.log(this.collection.length);
            console.log(this.collection.toJSON());
            //this.$('#watchlist').html(this.collection);
            return this;
        },

        addOne: function(fav){
            console.log('added one to your watchlist');
            console.log(fav);
            var favShow = new ShowView({ model : fav} );
            this.$el.append(favShow.render().el);
        },

        addAll: function() {
            this.collection.each(this.addOne);
        },

        createItem: function(item){
            console.log(item);
            this.collection.create({
                title : item.get('title'),
                thumbnail : item.get('images').thumbnail
            })
        }

    });

	return WatchlistView;
});
