define(['PIXI', 'core/container'], function(PIXI, Container) {
    var Layer = Container.extend({
        init: function(scene, name, settings) {
            this._super(settings);
            this.name = name;

            scene.addChild(this);
            this.parallax = this.parallax || 0;
        },
        update: function(dt) {
            this.updateChildren(dt);
            this.updatePosition();
        },
        updateChildren: function(dt) {
            this.children.forEach(function(child) {
                child.update && child.update(dt);
            });
        },
        updatePosition: function() {
            this.x = Math.round(-this.parallax * this.parent.position.x);
            this.y = Math.round(-this.parallax * this.parent.position.y);
        }
    });

    return Layer;
});
