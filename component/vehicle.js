define(['component/projectile'], function(Projectile) {
    
    var Vehicle = Projectile.extend({
        init: function (owner, settings) {
            this._super(owner, settings);

            this.angVel = Math.PI;
            this.projFrict = 100;
            this.force = 300;
            this.maxSpeed = this.force;
            this.projSpeed = 0;
            this.drift = 0.5;

            // 0: standing, 1: forward, -1: backward
            this.dir = 0;
            // 0: standing, 1: right, -1: left
            this.turn = 0;
        },
        update: function (dt) {
            var rot = this.owner.rotation;
            var cos = Math.cos(rot);
            var sin = Math.sin(rot);

            // accel
            var dir = this.dir;
            if (dir > 0) {
                this.projAccel = this.force / this.mass;
            }
            else if (dir < 0) {
                this.projAccel = -this.force / this.mass;
            }
            else {
                this.projAccel = 0;
            }

            // turn
            if (this.turn) {
                this.rotation += this.angVel * this.turn * dt;
            }

            this._super(dt);
        }
    });
    
    return Vehicle;
    
});
