define(['PIXI', 'SAT', 'core/system', 'core/component'], function(PIXI, SAT, sys, Component) {
    
    sys.CollisionType = {
        SENSOR: 0,
        STATIC: 1,
        DYNAMIC: 2
    };

    sys.CollisionGroup = {
        NONE: 0,
        PLAYER: 1,
        FRIEND: 2,
        ENEMY: 4,
        OTHER: 8
    };

    var Collider = Component.extend({
        collidesOffscreen: false,
        type: 0,
        group: 0,
        target: 0,
        init: function (owner, settings) {
            this._super(owner, settings);

            this.polygon = this.polygon || this.owner.polygon;
            if (!this.polygon) {
                var b = new SAT.Box(new SAT.Vector(0, 0),
                                    owner.width, owner.height);
                this.polygon = b.toPolygon();
            }

            this.offset = this.offset || new SAT.Vector(0, 0);

            if (owner.width === 0 || owner.height === 0) {
                // add transform to owner, ie. bound. rect to poly
                this.addInvisiPoly();
            }

            this.bounds = new PIXI.Rectangle();
            this.bounds.collider = this;

            this.syncPolygon();
        },
        syncPolygon: function () {        
            // position
            var poly = this.polygon;
            var owner = this.owner;
            poly.pos.x = owner.x;
            poly.pos.y = owner.y;
            poly.pos.add(this.offset);

            // angle
            if (Math.abs(poly.angle - owner.rotation) > 0.01)
                poly.setAngle(owner.rotation);
        },
        respond: function (other, response) {
            if (this.owner.onCollision) {
                if (this.owner.onCollision(other, response))
                    return true;
            }

            if (this.type === 2) {
                if (other.type === 1) {
                    this.owner.x -= response.overlapV.x;
                    this.owner.y -= response.overlapV.y;
                }
                if (other.type === 2) {
                    var dx = response.overlapV.x / 2;
                    var dy = response.overlapV.y / 2;
                    this.owner.x -= dx;
                    this.owner.y -= dy;
                    other.owner.x += dx;
                    other.owner.y += dy;
                    other.syncPolygon();
                }
                this.syncPolygon();
            }
            return false;
        }
    });

    // =======================================
    Collider.prototype.addInvisiPoly = function () {
        this.calcPoints();
        var graphics = new PIXI.Graphics();
        this.owner.addChild(graphics); 
        this.drawPolygon(graphics);
        graphics.renderable = false;
    };

    // ========================================
    // GRAPHICS
    Collider.prototype.addGraphics = function () {
        this.calcPoints();
        var graphics = new PIXI.Graphics();
        this.owner.parent.addChild(graphics);
        this.graphics = graphics;
        return graphics;
    };

    Collider.prototype.removeGraphics = function () {
        var graphics = this.graphics;
        if (!graphics)
            return;
        graphics.parent.removeChild(graphics);
        this.graphics = null;
        graphics.destroy();
    };

    Collider.prototype.calcPoints = function () {
        // gfx
        this.points = [];
        this.polygon.points.forEach(function (point, index) {
            var i = index * 2;
            this.points[i] = point.x;
            this.points[i + 1] = point.y;
        }, this);
    };

    Collider.prototype.drawPolygon = function (gfx) {
        gfx = gfx || this.graphics;
        gfx.clear();
        gfx.lineStyle(2, 0xFF00FF, 1);
        gfx.drawPolygon(this.points);
    };

    Collider.prototype.updateGraphics = function () {
        if (!this.graphics)
            return;

        this.drawPolygon();

        var poly = this.polygon;

        // position
        this.graphics.position.set(poly.pos.x, poly.pos.y);
        this.graphics.rotation = poly.angle;

        // offset
        this.graphics.pivot.set(-poly.offset.x, -poly.offset.y);
    };

    return Collider;
});
