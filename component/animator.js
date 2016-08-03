define(['PIXI', 'core/game', 'core/component'], function(PIXI, Game, Component) {
    
    var Animator = Component.extend({
        init: function (owner, settings) {
            this._super(owner, settings);
            if (settings && settings.animations) {
                for (var a in settings.animations) {
                    this.addAnimation(a, settings.animations[a]);
                }
            }
        }, 
        addAnimation: function (name, settings) {
            // extract frames
            var frames = [];
            var textures = Game.assets[this.spritesheet].textures;
            for (var t in textures) {
                if (t.indexOf(name) > -1)
                    frames.push(t);
            }
            frames.sort();
            for (var i = 0; i < frames.length; i++) {
                frames[i] = textures[frames[i]];
            }
            
            var animation = new PIXI.extras.MovieClip(frames);
            this.owner.addChild(animation);

            // set animation properties
            animation.visible = false;
            animation.loop = settings && settings.loop;
            animation.animationSpeed = (settings && settings.speed) || 0.1;
            animation.name = name;
            if (settings.anchor) {
                animation.anchor.x = settings.anchor.x;
                animation.anchor.y = settings.anchor.y;
            }
            
            return animation;
        }
    });

    Object.defineProperties(Animator.prototype, {
        'animation': {
            get: function () {
                return this._animation;
            },
            set: function (animation) {
                if (typeof animation === 'string') {
                    var animations = this.owner.children;
                    for (var i = 0, len = animations.length; i < len; i++) {
                        if (animations[i].name === animation) {
                            animation = animations[i];
                            break;
                        }
                    }
                }
                if (this.animation) {
                    this.animation.stop();
                    this.animation.visible = false;
                }
                animation.visible = true;
                animation.play();
                this._animation = animation;
            }
        }
    });

    return Animator;
});
