define(['PIXI', 'core/Class', 'core/system', 'core/Input', 'core/TiledManager', 'config'],
       function(PIXI, Class, system, Input, TiledManager, config) {
    
    var Application = Class.extend({
        init: function (screenSize, rendererOptions) {
            system.app = this;
            
            screenSize = screenSize || config.screen;
            rendererOptions = rendererOptions || config.renderer;
            system.renderer = this.renderer = PIXI.autoDetectRenderer(
                screenSize.width , screenSize.height,
                rendererOptions
            );
            document.body.appendChild(this.renderer.view);
            
            system.loader = this.loader = PIXI.loader;
            system.assets = this.assets = this.loader.resources;
            system.input = this.input = new Input();
            system.tiledManager = this.tiledManager = new TiledManager();
        },
        update: function () {
            requestAnimationFrame(this.update.bind(this));

            // tick
            var now = new Date().getTime();
            var dt = now - this.time;
            this.time = now;
            this.dt = dt / 1000;
            system.dt = this.dt;

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
