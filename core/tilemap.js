define(['PIXI', 'core/game', 'core/layer', 'core/tile'], function(PIXI, Game, Layer, Tile) {

    var Tilemap = Layer.extend({
        init: function (scene, name, settings) {
            this._super(scene, name, settings);

            this.image = Game.assets[this.tileset].texture;
            this.imgCols = this.image.width / this.tileW;
            this.imgRows = this.image.height / this.tileH;

            // For tile sprite creation.
            this.frameRect = new PIXI.Rectangle(0, 0, this.tileW, this.tileH);
            
            var mapW = this.mapW;
            this.tiles = [];
            for(var i = 0; i < mapW; i++) {
                this.tiles[i] = [];
            }
            var data = this.data;
            for (var j=0, len=data.length; j < len; j++) {
                if (data[j] !== 0) {
                    this.setTile(data[j], j % mapW, Math.floor(j / mapW));
                }
            }
        },
        update: function() {
            this.updatePosition();
        },
        setTile: function (gid, x, y) {
            if (gid < 1 || gid > this.imgCols * this.imgRows)
                return;
            if (x < 0 || x >= this.mapW)
                return;
            if (y < 0 || y >= this.mapH)
                return;
            if (this.tiles[x] && this.tiles[x][y] === gid)
                return;
            
            this.removeTile(x, y);
            this.tiles[x][y] = new Tile(this, gid, x, y);
        },
        removeTile: function (x, y) {
            if (this.tiles[x] && this.tiles[x][y]) {
                this.removeChild(this.tiles[x][y]);
                this.tiles[x][y].destroy();
                this.tiles[x][y] = undefined;
            }
        },
        // UTILS
        getTile: function (x, y) {
            return this.tiles[x] && this.tiles[x][y];
        },
        getTileAt: function (x, y) {
            return this.getTile(this.getMapX(x), this.getMapY(y));
        },
        getSceneX: function (x) {
            return (x * this.tileW);
        },
        getSceneY: function (y) {
            return (y * this.tileH);
        },
        getMapX: function (x) {
            return Math.floor(x / this.tileW);
        },
        getMapY: function (y) {
            return Math.floor(y / this.tileH);
        }
    });
    
    return Tilemap;
});
