define(['SAT', 'core/system', 'component/kinematics'], function(SAT, sys, Kinematics) {
    var Platformer = Kinematics.extend({
        init: function (owner, settings) {
            this._super(owner, settings);

            this.slopeN = new SAT.Vector();
            this._vector2 = new SAT.Vector();
            this.facing = 1;
            this.move = 0;
            this.force = 400;
            this.jumpForce = 500;
            this.frict.x = 200;
            this.frict.y = 0;
            this.grav.y = 700;
            this.gravLen = this.grav.len();
            this.gravAng = Math.atan2(this.grav.y, this.grav.x);
            this.maxVel.x = 400;
            this.maxVel.y = 700;
            this.elast = 0;
            this.state = 'falling';
            this.slopeStanding = 1/3 * Math.PI;
            this.slopeStanding = 1/4 * Math.PI;

        },
        update: function(dt) {
            // State
            var dot = this.vel.dot(this.grav);
            // if (dot > 0 && this.state !== 'standing') {
            if (dot > 0) {
                this.state = 'falling';
            }
            else if (dot < 0) {
                this.state = 'jumping';
            }

            // Movement
            this.vel.x = this.force * this.move;
            if (this.vel.x) {
                this.moving = true;
            } else {
                this.moving = false;
            }        
            
            this._super(dt);
        },
        respond: function (other, response) {
            if (this._super(other, response))
                return;

            var N = response.overlapN;
            this.slopeN.copy(N);
            var grav = this.grav;
            var vel = this.vel;
            // angle between normal and gravity
            var theta = Math.acos(N.dot(grav) / (N.len()*this.gravLen));
            var absTheta = Math.abs(theta);
            
            if (Math.abs(theta) < this.slopeStanding) {
                this.state = 'standing';
            }
            
            // if on slope
            if (absTheta && absTheta < Math.PI/2) {
                // cross prods N x grav and N x vel
                var crossNG = N.x*grav.y - N.y*grav.x;
                var crossNV = N.x*vel.y - N.y*vel.x;
                var ascending = Math.sign(crossNG) !== Math.sign(crossNV);

                // if on climbable slope
                if (this.state === 'standing') {
                    // negate slope sliding
                    var overlapV = this._vector.copy(response.overlapV);
                    var gravPN = this._vector2.copy(grav).perp().normalize();
                    overlapV.projectN(gravPN);
                    this.x += overlapV.x;
                    this.y += overlapV.y;

                    // damp entity-slope impact
                    if (ascending) {
                        vel.project(N);
                    }
                    else {
                    }
                }
                // if on steep slope
                else {
                    // make entity slide
                    var lerp = absTheta.lerp(0, Math.PI/2, 0, 1);
                    grav = this._vector.copy(grav).projectN(N).perp().scale(-Math.sign(crossNG));
                    this.x += grav.x * sys.dt * lerp;
                    this.y += grav.y * sys.dt * lerp;
                    if (ascending) {
                        vel.project(N).perp().scale(-Math.sign(crossNG));
                    }
                }
            }
            
        }    
    });

    return Platformer;
});
