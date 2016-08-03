define(['SAT', 'core/system', 'core/entity', 'component/animator', 'component/platformer', 'core/constants'],
       function (SAT, sys, Entity, Animator,  Platformer, constants) {
           
           var Simpleton = window.Simpletons.Simpleton = Entity.extend({
               init: function(layer, x, y, settings) {
                   this._super(layer, x, y, settings);
                   player = this;
                   
                   var anchor = {x: 0.45, y: 1};
                   this.animator = new Animator(this, {
                       spritesheet: 'simpleton',
                       animations: {
                           'Idle': {speed: 0.5, loop: true, anchor: anchor},
                           'Walk': {speed: 0.5, loop: true, anchor: anchor},
                           'Jump': {speed: 0.5, loop: false, anchor: anchor},
                           'Fall': {speed: 0.5, loop: false, anchor: anchor}
                       }          
                   });

                   var w = 52, h = 124;
                   var polygon = (new SAT.Box(new SAT.Vector(), w, h)).toPolygon();
                   polygon.setOffset(new SAT.Vector(w * -0.5, -h - 4));
                   var kin = this.collider = new Platformer(this, {polygon: polygon});
                   kin.group = constants.CollisionGroup.PLAYER;
                   kin.target = constants.CollisionGroup.OTHER;
                   kin.addGraphics();
                   kin.updateGraphics();
               },
               update: function(dt) {
                   var kin = this.collider;
                   kin.updateGraphics();
                   
                   // Input
                   var input = sys.input;
                   if (input.down['left']) {
                       kin.facing = kin.move = -1;
                   } else if (input.down['right']) {
                       kin.facing = kin.move = 1;
                   } else {
                       kin.move = 0;
                   }
                   
                   if (input.down['fire']) {
                       if (kin.state === 'standing') {
                           kin.vel.copy(kin.grav).normalize().scale(-kin.jumpForce);
                       }
                   }
                   
                   // Flip
                   if (Math.sign(this.scale.x) !== Math.sign(kin.facing)) {
                       this.scale.x *= -1;
                   }
                   
                   // Animation
                   var animator = this.animator;
                   if (kin.state === 'standing') {
                       if (kin.moving) {
                           animator.animation = 'Walk';
                       }
                       else {
                           animator.animation = 'Idle';
                       }
                   }
                   else if (kin.state === 'jumping') {
                       animator.animation = 'Jump';
                   }
                   else if (kin.state === 'falling') {
                       animator.animation = 'Fall';
                   }

                   kin.update(dt);
                   this._super(dt);
               }
           });
           
           return Simpleton;
       });
