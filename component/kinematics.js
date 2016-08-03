define(['PIXI', 'SAT', 'component/collider'], function(PIXI, SAT, Collider) {

    var Kinematics = Collider.extend({
        init: function (owner, settings) {
            this._super(owner, settings);
            this.type = 2;

            this.vel = new SAT.Vector(0, 0);
            this.maxVel = new SAT.Vector(300, 300);
            this.accel = new SAT.Vector(0, 0);
            this.grav = new SAT.Vector(0, 0);
            this.frict = new SAT.Vector(100, 100);
            this.elast = 0.5;
            this.mass = 1;

            this._vector = new SAT.Vector(0, 0);
        },
        update: function (dt) {
            var vel = this.vel;

            // accel + gravity
            vel.x += this.accel.x * dt;
            vel.y += this.accel.y * dt;

            vel.x += this.grav.x * dt;
            vel.y += this.grav.y * dt;

            // friction
            if (Math.abs(vel.x) > this.frict.x * dt)
                vel.x -= Math.sign(vel.x) * this.frict.x * dt;
            else
                vel.x = 0;
            if (Math.abs(vel.y) > this.frict.y * dt)
                vel.y -= Math.sign(vel.y) * this.frict.y * dt;
            else
                vel.y = 0;

            // speed limit
            var maxVel = this.maxVel;
            vel.x = vel.x.clamp(-maxVel.x, maxVel.x);
            vel.y = vel.y.clamp(-maxVel.y, maxVel.y);
            
            // update pos
            this.owner.x += vel.x * dt;
            this.owner.y += vel.y * dt;

            this.syncPolygon();
        },
        respond: function (other, response) {
            if (this._super(other, response))
                return;

            var typeB = other.type;
            if (this.type < 2 || typeB < 1) {
                return;
            }
            
            // IMPULSE
            var V,N,dot,I;
            if (typeB === 1) {
                V = this.vel;
                if (V.dot(response.overlapN) >= 0) {
                    N = this._vector.copy(response.overlapN);

                    // I = (1+e)* N * (Vr • N)
                    dot = V.dot(N);
                    I = N.scale(1 + this.elast).scale(dot);
                    V.sub(I);
                }
            }
            else if (typeB === 2) {
                var Va = this.vel;
                var Vb = other.vel;
                N = this._vector.copy(response.overlapN);
                V = other._vector.copy(Va).sub(Vb);
                dot = V.dot(N);
                if (dot > 0) {
                    // I = (1+e)* N * (Vr • N) / (1/Ma + 1/Mb)
                    I = N.scale(dot).scale(1 / (this._massInverse + other._massInverse));

                    //  Va –= I * 1/Ma
                    var Ia = other._vector.copy(I).scale(1 + this.elast).scale(this._massInverse);
                    Va.sub(Ia);

                    // Vb + = I * 1/Mb
                    var Ib = other._vector.copy(I).scale(1 + other.elast).scale(other._massInverse);
                    Vb.add(Ib);
                }
            }
        }
    });

    Object.defineProperties(Kinematics.prototype, {
        mass: {
            get: function () {
                return this._mass;
            },
            set: function (n) {
                this._massInverse = 1 / n;
                this._mass = n;
            }
        }
    });

    return Kinematics;
});
