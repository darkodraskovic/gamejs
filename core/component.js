define(['core/game'], function(Game) {
    var Component = Game.Class.extend({
        init: function (owner, settings) {
            for (var prop in settings) {
                this[prop] = settings[prop];
            }
            this.owner = owner;
        }
    });

    return Component;
});
