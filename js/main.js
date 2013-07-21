require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        jqueryUI: 'libs/jquery/jquery-ui-1.10.2.custom',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone',
        storage: 'libs/backbone/backbone.localStorage',
        text: 'libs/require/text'
    },

    shim: {
        jqueryUI : {
                deps: ['jquery']
        },

        underscore: {
            deps: ['jquery'],
                exports: '_'
        },

        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        }
    }

});

require(['jquery','jqueryUI','backbone', 'vent','storage'], 
function($, jUI, Backbone, vent, Store){

    
    $( "#watchlist" ).sortable({
        revert: true
    });

    $( "#draggable" ).draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid"
    });

        //$( "ul, li" ).disableSelection();


    //Watchlist Module

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

    var ShowView = Backbone.View.extend({

        events : {
            'click .delete' : 'clear'
        },

        initialize : function() {
            // The TodoView listens for changes to its model, re-rendering. Since there's
            // a one-to-one correspondence between a **Todo** and a **TodoView** in this
            // app, we set a direct reference on the model for convenience.
            this.listenTo(this.model, 'change', this.render);
            // in case the model is destroyed via a collection method
            // and not by a user interaction from the DOM, the view
            // should remove itself
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render : function() {
            this.$el.html("<div class='ui-state-default'><img src='"+ (this.model.get('thumbnail')) + "'>"+
                    "<h2>"+(this.model.get('title'))+
                    "</h2><button class = 'delete'>X</button></div>");
            
            return this;
        },

        remove: function() {
            this.stopListening();
            this.undelegateEvents();
            this.$el.remove();
        },

        saveShow: function(){
            this.model.saveItem();
        },
        // Remove the item, destroy the model.
        clear: function() {
            this.model.clear();
        }
    });

    //watchlist collection
    var WatchlistCollection = Backbone.Collection.extend({
        model : ShowModel,

        localStorage: new Store("show")


    });

    //watchlist collection view
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

    //an instance of watchlist collection
    var myWatchlistCollection = new WatchlistCollection();

    //an instance of the Watchlist Collection view
    var myWatchlistView = new WatchlistView({
        collection : myWatchlistCollection
    });


    //Search Module ----------------------------------------------------------
    // individual search result 
    var Result = Backbone.Model.extend({});

    // view of individual search result
    var ResultView = Backbone.View.extend({

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

    var ResultsView = Backbone.View.extend({
        el: $('#search'),

        events: {
            'keyup #new-search' : 'getURL'//,
            //'click #begin-search' : 'getURL',
            //'change #new-search': 'render'
        },

        initialize: function(){
            this.listenTo(this.collection, 'all', this.render);
            //this.listenTo(this.collection, 'add', this.addOne);
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

    var myResults = new Results();
    var myResultsView = new ResultsView({ collection : myResults });

});