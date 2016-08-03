define(['PIXI', 'core/game', 'core/container', 'core/pool', 'core/collider', 'core/camera'],
       function(PIXI, Game, Container, Pool, Collider, Camera) {
           
           var Scene = Container.extend({
               init: function(name, settings) {
                   this._super(settings);
                   this.name = name;

                   // viewport
                   this.viewport = new PIXI.Point();
                   this.updatePosition = this.DrawMode.ROUNDED;

                   // pool
                   this.pool = new Pool(); // for entity recycling
                   this.wastebin = []; // for entity disposal

                   // collider
                   this.collider = new Collider(this);

                   // keys
                   var bindings = this.bindings;
                   if (bindings) {
                       for (var i = 0; i < bindings.length; i += 2) {
                           Game.input.bind(bindings[i], Game.Key[bindings[i+1]]);
                       }
                   }

                   // camera
                   this.camera = new Camera(this, null, this.cam);

                   // assets
                   var assets = this.assets;
                   if (assets) {
                       var loader = Game.loader;
                       for (i = 0; i < assets.length; i += 2) {
                           loader.add(assets[i], assets[i+1]);
                       }
                       loader.once('complete',function() {
                           Game.tiledManager.makeTiledMap(this, this.map);
                           this.onAssetsLoaded();
                           Game.app.start(this);
                       }.bind(this));
                       loader.load();            
                   }
               },
               onAssetsLoaded: function() {},    
               update: function(dt) {
                   this.children.forEach(function(layer) {
                       layer.update(dt);
                   });

                   this.collider.update(this);
                   
                   this.manageEntities();
                   
                   this.updatePosition();

                   this.camera && this.camera.update(dt);
               },
               manageEntities: function() {
                   var wastebin = this.wastebin;
                   for (var i = wastebin.length - 1; i >= 0; i--) {
                       var ent = wastebin.pop();
                       ent.parent.removeChild(ent);
                       if (ent.onReset) {
                           this.pool.put(ent);
                       }
                       else {
                           ent.destroy();
                       }
                   }
               },
               createEntity: function(Class, parent, x, y, settings) {
                   if (Class.prototype.onReset) {
                       return this.pool.get(Class, parent, x, y, settings);
                   }
                   else return new Class(parent, x, y, settings);
               },
               DrawMode: {
                   SUBPIXEL: function() {
                       this.x = -this.viewport.x;
                       this.y = -this.viewport.y;            
                   },
                   ROUNDED: function() {
                       this.x = Math.round(-this.viewport.x);
                       this.y = Math.round(-this.viewport.y);
                   }
               }
           });

           return Scene;
       });
