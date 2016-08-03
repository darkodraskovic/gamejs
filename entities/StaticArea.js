define(['core/Entity', 'components/Collider', 'core/constants'], function (Entity, Collider, constants) {
    var StaticArea = window.Simpletons.StaticArea = Entity.extend({
        init: function(layer, x, y, settings) {
            this._super(layer, x, y, settings);

            this.collider = new Collider(this, {
                polygon: this.polygon,
                type: 1,
                group: constants.CollisionGroup.OTHER,
                target: constants.CollisionGroup.NONE
            });
            
            this.children[0].renderable = true;
        }
    });

    return StaticArea;
});
