define(['core/system'], function(system) {

    var Pool = system.Class.extend({
        init: function() {
            this.pools = {};
        },
        get: function(Class, parent, x, y, settings) {
            var classId = Class.id;
		    var pool = this.pools[classId];
            
		    if (pool && pool.length) {
                var instance = pool.pop();
		        instance.reset(parent, x, y);
		        return instance;
            }
            else {
                return new Class(parent, x, y, settings);
            }
	    },
        put: function(instance) {
		    if(!this.pools[instance.classId]) {
			    this.pools[instance.classId] = [instance];
		    }
		    else {
			    this.pools[instance.classId].push(instance);
		    }
	    },
        deletePool: function(classId) {
		    delete this.pools[classId];
	    },
	    deleteAllPools: function() {
		    this.pools = {};
	    }
    });

    return Pool;
});
