define(['core/system'], function(system) {
    var Component = system.Class.extend({
        init: function (owner, settings) {
            for (var prop in settings) {
                this[prop] = settings[prop];
            }
            this.owner = owner;
        }
    });

    return Component;
});
