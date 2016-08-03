define(['PIXI', 'core/game', 'core/input', 'core/tiledManager', 'config'],
       function(PIXI, Game, Input, TiledManager, config) {
    
    var Application = Game.Class.extend({
        init: function (screenSize, rendererOptions) {
            Game.app = this;
            
            screenSize = screenSize || config.screen;
            rendererOptions = rendererOptions || config.renderer;
            Game.renderer = this.renderer = PIXI.autoDetectRenderer(
                screenSize.width , screenSize.height,
                rendererOptions
            );
            document.body.appendChild(this.renderer.view);
            
            Game.loader = this.loader = PIXI.loader;
            Game.assets = this.assets = this.loader.resources;
            Game.input = this.input = new Input();
            Game.tiledManager = this.tiledManager = new TiledManager();
        },
        update: function () {
            requestAnimationFrame(this.update.bind(this));

            // tick
            var now = new Date().getTime();
            var dt = now - this.time;
            this.time = now;
            this.dt = dt / 1000;
            Game.dt = this.dt;

            var scene = this.scene;
            if (scene) {
                scene.update(this.dt);
                this.renderer.render(scene);   
            }

            // update input
            this.input.update();
        },
        start: function (scene) {
            this.scene = scene;
            this.dt = this.time = new Date().getTime();
            this.update();
        },
        destroyScene: function() {
            if (this.scene) {
                this.scene.visible = false;
                this.scene.destroy();
                this.scene = null;
            }
        },
        removeScene: function() {
            var scene = this.scene;
            if (scene) {
                scene.visible = false;
                this.scene = null;
                return scene;
            }
            else {
                return null;
            }
        }
    });

    return Application;
});
