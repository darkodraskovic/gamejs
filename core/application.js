define(['PIXI', 'core/system', 'core/input', 'core/tiledManager', 'config'],
       function(PIXI, sys, Input, TiledManager, config) {
    
    var Application = sys.Class.extend({
        init: function (screenSize, rendererOptions) {
            sys.app = this;
            
            screenSize = screenSize || config.screen;
            rendererOptions = rendererOptions || config.renderer;
            sys.renderer = this.renderer = PIXI.autoDetectRenderer(
                screenSize.width , screenSize.height,
                rendererOptions
            );
            document.body.appendChild(this.renderer.view);
            
            sys.loader = this.loader = PIXI.loader;
            sys.assets = this.assets = this.loader.resources;
            sys.input = this.input = new Input();
            sys.tiledManager = this.tiledManager = new TiledManager();
        },
        update: function () {
            requestAnimationFrame(this.update.bind(this));

            // tick
            var now = new Date().getTime();
            var dt = now - this.time;
            this.time = now;
            this.dt = dt / 1000;
            sys.dt = this.dt;

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
