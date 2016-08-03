define(['core/system'], function(sys) {
    var Component = sys.Class.extend({
        init: function (owner, settings) {
            for (var prop in settings) {
                this[prop] = settings[prop];
            }
            this.owner = owner;
        }
    });

    return Component;
});
