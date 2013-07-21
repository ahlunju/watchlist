require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        jqueryUI: 'libs/jquery/jquery-ui',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone',
        storage: 'libs/backbone/backbone.localStorage',
        text: 'libs/require/text'
    },

    shim: {
            "jquery-ui" : {
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

//require(['jquery', 'views/SearchView', 'collections/SearchCollection'],
//function($, SearchView, AppCollection, SearchCollection){
    // var search_view = new SearchView({
    //     collection: SearchCollection
    // });
//});

require(['jquery','backbone','text!templates/results.html','storage'], 
function($, Backbone, resultsTemplate, Store){

    var vent = {};
    _.extend(vent, Backbone.Events);

    // individual search result 
    var Result = Backbone.Model.extend({});

    // view of individual search result
    var ResultView = Backbone.View.extend({

        render : function() {
            
            $(this.el).html("<div><img src='"+ this.model.get('images').thumbnail + "'>"+
                    "<h2>"+this.model.get("title")+"</h2><button class = 'add-fav'>add to watchlist</button></div>");
            return this;
        }
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
            //this.render();
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

        getURL : function(){
            console.log('getURL');
            this.collection.value = this.$("#new-search").val();
            this.collection.fetch({reset : true});
        },
    });

    var myResults = new Results();
    var myResultsView = new ResultsView({ collection : myResults });

    // var SearchModel = Backbone.Model.extend({

    //     defaults: {
    //         'score'         : '',
    //         'title'         : '',
    //         'type'          : '',
    //         'object_key'    : '',
    //         'image_url'     : '',
    //         'id'            : '',
    //         'image_wide_url': '',
    //         'images'        : {
    //                             'wide'      : '',
    //                             'thumbnail' : ''
    //                         } 
    //     },

    //     clear: function(){
    //         this.destroy();
    //     }


    // });

    // var SearchCollection = Backbone.Collection.extend({
    //     model: SearchModel,
    //     value: null,
    //     url: function() { return 'http://search.guide.getglue.com/objects?q='+this.value; },
    //     parse: function(response){
    //         console.log(response);
    //         return response;
    //     }

        // parse: function(response){
        //     var result = {}
        //     console.log('parsing');
        //     console.log(response.length);
        //     for (var i = 0; i < response.length; i++) {
        //         console.log(response[i]);
        //         result = response[i]; 
           
        //     };

        //     return this.models;
        // }
    // });

    // var SearchView = Backbone.View.extend({
    //     el: $('#search'),

    //     events: {
    //         'keyup #new-search' : 'getURL'//,
    //         //'click #begin-search' : 'getURL',
    //         //'change #new-search': 'render'
    //     },

    //     initialize: function(){
    //         this.listenTo(this.collection, 'all', this.render);
    //         this.render();
    //     },

    //     getURL : function(){
    //         console.log('getURL');
    //         this.collection.value = this.$("#new-search").val();
    //         this.collection.fetch({reset : true});
    //         //console.log (this.collection.toJSON());
    //         //this.render();
    //     },


    //     render: function(){
            
    //         this.$('#search-list').empty();

    //         for (var i = 0; i < this.collection.length; i++){
    //             this.$('#search-list').append("<div><img src='"+ this.collection.at([i]).get('images').thumbnail + "'>"+
    //                 "<span><h2>"+this.collection.at([i]).get('title')+"</h2></span><button class = 'add-fav'>add to watchlist</button></div>");
    //         }

    //         return this;
    //         //this.resetCollection();
    //     },


    //     // Remove this view from the DOM.
    //     // Remove event listeners from: DOM, this.model
    //     remove: function() {
    //         this.stopListening();
    //         this.undelegateEvents();
    //         this.$el.remove();
    //     },

    //     // Remove the item, destroy the model.
    //     clear: function() {
    //         this.model.clear();
    //     }

    // });
    // window.searchModel = new SearchModel();
    // window.searchCollection = new SearchCollection({
        
    // });

    // window.searchView = new SearchView({
    //     collection :searchCollection
    // });
    


    // var WatchlistModel = Backbone.Model.extend({

    // });
















    // var WatchlistCollection = Backbone.Collection.extend({
    //     model: WatchlistModel,

    //     localStorage: new Store(),

    // });

    
    // var WatchlistView = Backbone.View.extend({
    //     el: $('#watchlist'),

    //     initialize: function(){
    //         this.listenTo(this.collection, 'add', this.add);
    //     },

    //     render: function(){

    //     },

    //     add: function(todo) {
    //         // console.log("added new todo item");
    //         var view = new TodoView({model: todo});
    //         // this.$("#todo-list").append(view.render().el);
    //         console.log(view.render().el);
    //         //add to the sticky note div
    //         $("#stickies ul").append(view.render().el);
    //     },
    //     addAll: function() {
    //         this.collection.each(this.add);
    //     },
    // });

    // window.watchCollection = new WatchlistCollection();

    // window.watchlistView = new WatchlistView({
    //     collection: watchCollection
    // });
});