define(['component/kinematics'], function(Kinematics) {
    
    var Projectile = Kinematics.extend({
        init: function (owner, settings) {
            this._super(owner, settings);

            this._cos = Math.cos(this.owner.rotation);
            this._sin = Math.sin(this.owner.rotation);
            
            this.drift = 0;
            this.projSpeed = 700;
            this.maxSpeed = 700;
            this.projAccel = 0;
            this.projFrict = 0;
        },
        update: function(dt) {
            this.projSpeed = this.projSpeed.clamp(-this._maxSpeed, this._maxSpeed);
            
            this._super(dt);
        }
    });
    Object.defineProperties(Projectile.prototype, {
        'projSpeed': {
            get: function () {
                return this.vel.len() * this._velDir;
            },
            set: function (n) {
                var vel = this.vel;
                var drift = this.drift;
                vel.x = vel.x * drift + this._cos * n * (1-drift);
                vel.y = vel.y * drift + this._sin * n * (1-drift);
            }
        },
        'projAccel': {
            get: function() {
                return this.accel.len() * this._accelDir;
            },
            set: function(n) {
                this.accel.x = this._cos * n;
                this.accel.y = this._sin * n;
            }
        },
        'projFrict': {
            get: function() {
                return this.frict.len();
            },
            set: function(n) {
                this.frict.x = Math.abs(n * this._cos);
                this.frict.y = Math.abs(n * this._sin);
            }
        },
        'rotation': {
            get: function() {
                return this.owner.rotation;
            },
            set: function(n) {
                this.owner.rotation = n;
                this.owner.rotation %= Math.PI * 2;
                
                var spd = this.projSpeed;
                var acc = this.projAccel;
                this._cos = Math.cos(this.owner.rotation);
                this._sin = Math.sin(this.owner.rotation);

                this.projSpeed = spd;
                this.projAccel = acc;
                
                this.projFrict = this.projFrict;
            }
        },
        'maxSpeed': {
            get: function() {
                return this._maxSpeed;
            },
            set:function(n) {
                this.maxVel.x = this.maxVel.y = n;
                this._maxSpeed = n;
            }
        },
        '_velDir': {
            get: function() {
                this._vector.x = this._cos;
                this._vector.y = this._sin;
                return Math.sign(this.vel.dot(this._vector));
            }
        },
        '_accelDir': {
            get: function() {
                this._vector.x = this._cos;
                this._vector.y = this._sin;
                return Math.sign(this.accel.dot(this._vector));
            }
        }
    });

    return Projectile;
});
