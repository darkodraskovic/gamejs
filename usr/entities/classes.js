// NAMESPACE
Simpletons = {};

Simpletons.StaticArea = Game.Entity.extend({
    init: function(layer, x, y, settings) {
        this._super(layer, x, y, settings);

        this.collider = new Game.components.Collider(this, {
            polygon: this.polygon,
            type: 1,
            group: Game.CollisionGroup.OTHER,
            target: Game.CollisionGroup.NONE
        });
        
        this.children[0].renderable = true;
    }
});

Simpletons.Platform = Game.Entity.extend({
    init: function(layer, x, y, settings) {
        this._super(layer, x, y, settings);
        
        var child = this.addChild(new PIXI.Sprite.fromFrame(
            this.material + '_' + this.type + '_' + this.frame + '.png'));
        if (this.type === 'slope')
            child.anchor.set(0, 1);
    }
});

Simpletons.Simpleton = Game.Entity.extend({
    init: function(layer, x, y, settings) {
        this._super(layer, x, y, settings);
        player = this;
        
        var anchor = {x: 0.45, y: 1};
        this.animator = new Game.components.Animator(this, {
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
        var kin = this.collider = new Game.components.Platformer(this, {polygon: polygon});
        kin.group = Game.CollisionGroup.PLAYER;
        kin.target = Game.CollisionGroup.OTHER;
        kin.addGraphics();
        kin.updateGraphics();
    },
    update: function(dt) {
        var kin = this.collider;
        kin.updateGraphics();
        
        // Input
        var input = Game.sys.input;
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
