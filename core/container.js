define(['PIXI'], function(PIXI) {
    var Container = PIXI.Container.extend({
        init: function(settings) {
            PIXI.Container.call(this);

            for (var s in settings) {
                this[s] = settings[s];
            }
        }
    });

    return Container;
});
