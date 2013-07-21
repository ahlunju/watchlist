define(['jquery','underscore', 'backbone'],
function($, _, Backbone) {
    var ShowView = Backbone.View.extend({
        className: 'saved-item',
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
            this.$el.html("<div class='ui-state-default'><img src='"+ 
                        (this.model.get('thumbnail')) + "'>"+
                        "<div class='info'><h2>"+(this.model.get('title'))+"</h2></div>"+
                        "</div><span class='delete'></span>");
            
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
    
    return ShowView;
});