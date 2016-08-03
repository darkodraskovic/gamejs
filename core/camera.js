define(['core/system', 'config'], function(sys, config) {

    var Camera = sys.Class.extend({
        init: function(scene, entity, settings) {
            this.settings = settings || config.cam;
            
            for (var prop in this.settings) {
                this[prop] = this.settings[prop];
            }
            this.scene = scene;
            
            // position & offset
            this.position = {x:0, y:0};
            this.offset = this.offset || {x: 0, y: 0};

            // boundaries
            this.max = this.max || {x: 0, y: 0};

            this.damping = this.damping || 0;

            // deadzone
            this.deadzone = this.deadzone ||  {
                position: {x: 0, y: 0},
                size: {x: 0, y: 0}
            };
            
            // look ahead
            this.lookAhead = this.lookAhead || {x: 0, y: 0};
            this.currentLookAhead = {x: 0, y: 0};

            this.entity = entity;
        },
        update: function(dt) {
            var entity = this.entity;
            
            if (entity) {
                this.x = this.follow(dt, 'x', entity.x, entity.width);
                this.y = this.follow(dt, 'y', entity.y, entity.height);
            }
            if (this.scene) {
                this.scene.viewport.x = this.x;
                this.scene.viewport.y = this.y;
            }
        },
        follow: function (dt, axis, sprPos, size) {
            if (sprPos < this.deadzone.position[axis]) {
                this.deadzone.position[axis] = sprPos;
                this.currentLookAhead[axis] = this.lookAhead[axis];
            }
            else if (sprPos + size > this.deadzone.position[axis] + this.deadzone.size[axis]) {
                this.deadzone.position[axis] = sprPos + size - this.deadzone.size[axis];
                this.currentLookAhead[axis] = -this.lookAhead[axis];
            }

            var camPos = this.deadzone.position[axis] - this.offset[axis] -
                    this.currentLookAhead[axis];
            if (this.damping) {
                camPos = this.position[axis] + (camPos - this.position[axis]) * dt * this.damping;
            }
            return camPos.clamp(0, this.max[axis]);
        }
    });

    Object.defineProperties(Camera.prototype, {
        x: {
            get: function () {
                return this.position.x;
            },
            set: function (n) {
                this.position.x = n;
            }
        },
        y: {
            get: function () {
                return this.position.y;
            },
            set: function (n) {
                this.position.y = n;
            }
        },
        entity: {
            get: function() {
                return this._entity;
            },
            set: function(entity) {
                this._entity = entity;

                if (entity) {
                    this.x = entity.x - this.offset.x;
                    this.y = entity.y - this.offset.y;

                    this.deadzone.position.x = entity.x - this.deadzone.size.x / 2;
                    this.deadzone.position.y = entity.y - this.deadzone.size.y / 2;
                }
            }
        }
    });

    return Camera;

});
