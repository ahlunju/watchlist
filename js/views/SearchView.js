define(['jquery','underscore', 'backbone','views/SearchView','text!templates/stats.html'], 
function($, _, Backbone, SearchView, statsTemplate){
    
    var SearchView = Backbone.View.extend({
        
        //el: $("#todoapp"),

        //statsTemplate: _.template(statsTemplate),

        events: {
        
        },

        initialize: function() {
            // this.input  = this.$("#new-todo");

            // this.listenTo(this.collection, 'add', this.addOne);
            // this.listenTo(this.collection, 'reset', this.addAll);
            // this.listenTo(this.collection, 'all', this.render);

            // this.collection.fetch();
        },

        render: function() {
            
        },


    });
    return SearchView;
});
