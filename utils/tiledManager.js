define(['PIXI', 'core/game'], function(PIXI, Game) {

    var TiledManager = Game.Class.extend();

    TiledManager.prototype.makeTiledMap = function(scene, mapJson) {
        mapJson = PIXI.loader.resources[mapJson];
        if (!mapJson) return;
        
        var mapData = mapJson.data;

        var layers = mapData.layers;
        layers.forEach(function(layer) {
            var properties = layer.properties;
            for (var p in properties) {
                properties[p] = eval(properties[p]);
            }
            
            if (layer.type === 'tilelayer') {
                this.makeTiledTileLayer(scene, layer, mapData);
            }
            else if (layer.type === 'objectgroup') {
                this.makeTiledObjectGroup(scene, layer);
            }
            else if (layer.type == 'imagelayer') {
                this.makeImageLayer(scene, mapData, layer);
            }
        }, this);
    };

    TiledManager.prototype.makeTiledTileLayer = function(scene, layer, mapData) {
        var settings = {};
        for (var p in layer.properties) {
            settings[p] = eval(layer.properties[p]);
        }
        settings.mapW = layer.width;
        settings.mapH = layer.height;
        settings.tileW = mapData.tilewidth;
        settings.tileH = mapData.tileheight;
        settings.data = layer.data;
        
        var firstgid = 1;
        // asset name === Tiled tileset name === layer.properties.tileset
        mapData.tilesets.forEach(function(tileset) {
            if (tileset.name === settings.name)
                firstgid = tileset.firstgid;
        });
        if (firstgid>1) {
            firstgid--;
            settings.data.forEach(function(gid, i, data) {
                data[i] -= firstgid;
            });
        }
        
        var tilemap = new Game.Tilemap(scene, layer.name, settings);
        
        if (tilemap.prerender) {
            tilemap = this.prerenderTiledTileLayer(scene, tilemap, layer);
        }

        return tilemap;
    };

    TiledManager.prototype.makeImageLayer = function(scene, mapData, layer) {
        var l = new Game.Layer(scene, layer.name, layer.properties);
        var img = new PIXI.extras.TilingSprite(
            Game.assets[layer.properties.image].texture,
            mapData.width * mapData.tilewidth,
            mapData.height * mapData.tileheight
        );
        l.addChild(img);
    };

    TiledManager.prototype.makeTiledObjectGroup = function(scene, layer) {
        var l = new Game.Layer(scene, layer.name, layer.properties);
        layer.objects.forEach(function(obj) {
            var poly;
            if (obj.polygon) {
                var satPoints = [];
                obj.polygon.forEach(function(p) {
                    satPoints.push(new SAT.Vector(p.x, p.y));
                });

                poly = new SAT.Polygon(new SAT.Vector(0, 0), satPoints);
            } else {
                poly = new SAT.Box(new SAT.Vector(0, 0), obj.width, obj.height).toPolygon();
            }
            obj.properties = obj.properties || {};
            for (var p in obj.properties) {
                obj.properties[p] = eval(obj.properties[p]);
            }
            obj.properties.polygon = poly;
            var o = new(eval(obj.type))(l, obj.x, obj.y, obj.properties);
        });
        return l;
    };

    TiledManager.prototype.prerenderTiledTileLayer = function(scene, tilemap, layer) {
        var texture = tilemap.generateTexture(
            Game.renderer, Game.config.renderer.resolution, PIXI.SCALE_MODES.DEFAULT);
        var renderedSprite = new PIXI.Sprite(texture);
        tilemap.removeChildren();
        tilemap.addChild(renderedSprite);
        
        var data = layer.data;
        for (var i=0, len=data.length; i<len; i++) {
            if (data[i] > 0) {
                break;
            }
        }
        if (i>0 && i<len) {
            var x = tilemap.getSceneX(i % tilemap.mapW);
            var y = tilemap.getSceneY(Math.floor(i / tilemap.mapW));
            renderedSprite.position.set(x, y);
        }
    };

    return TiledManager;
});
