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

require(['jquery',
        'jqueryUI',
        'views/WatchlistView',
        'collections/WatchlistCollection',
        'views/ResultsView',
        'collections/ResultsCollection'], 
function($, jUI, WatchlistView, WatchlistCollection,ResultsView, Results){

    $(function() {
        $( "#watchlist" ).sortable({
            revert: true
        });
    });

    //watchlist module
    var myWatchlistCollection = new WatchlistCollection();

    //an instance of the Watchlist Collection view
    var myWatchlistView = new WatchlistView({
        collection : myWatchlistCollection
    });

    //search module
    var myResults = new Results();
    var myResultsView = new ResultsView({ 
        collection : myResults 
    });

});