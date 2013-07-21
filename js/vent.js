define(['backbone',],function(Backbone){

	//event aggregator
	var vent = {};
    _.extend(vent, Backbone.Events);

    return vent;
})