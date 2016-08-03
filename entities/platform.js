define(['PIXI', 'core/entity'], function (PIXI, Entity) {
    var Platform = window.Simpletons.Platform = Entity.extend({
        init: function(layer, x, y, settings) {
            this._super(layer, x, y, settings);
            
            var child = this.addChild(new PIXI.Sprite.fromFrame(
                this.material + '_' + this.type + '_' + this.frame + '.png'));
            if (this.type === 'slope')
                child.anchor.set(0, 1);
        }
    });
    return Platform;
});
