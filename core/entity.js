define(['PIXI', 'core/system', 'core/container'], function(PIXI, system, Container) {
    
    var Entity = Container.extend({
        autoCull: true,
        init: function(parent, x, y, settings) {
            this._super(settings);

            parent.addChild(this);
            this.position.set(x,y);
        },
        reset: function(parent, x, y) {
            parent.addChild(this);
            this.position.set(x,y);
            this.onReset && this.onReset();
        },
        update: function(dt) {
            if (this.autoCull) {
                if (this.offscreen)
                    this.renderable = false;
                else
                    this.renderable = true;            
            }
        },
        getPinPosition: function (x, y) {
            var cos = Math.cos(this.rotation);
            var sin = Math.sin(this.rotation);
            return {
                x: this.x + x * cos - y * sin,
                y: this.y + x * sin + y * cos
            };
        },
        getScreenPosition: function (x, y) {
            return this.getGlobalPosition();
        },
        getScene: function (x, y) {
            var parent = this.parent;
            if (parent) {
                while (parent.parent) {
                    parent = parent.parent;
                }        
            }
            return parent;
        },
        kill: function() {
            var wastebin = this.getScene().wastebin;
            if (wastebin.indexOf(this) < 0) {
                wastebin.push(this);
            }
        }
    });

    Object.defineProperties(Entity.prototype, {
        'offscreen': {
            enumerable: true,
            get: function () {
                var bounds = this.getBounds();
                return bounds.x + bounds.width < 0 || bounds.x > system.renderer.width ||
                    bounds.y + bounds.height < 0 || bounds.y > system.renderer.height;
            }
        }
    });

    return Entity;
});
