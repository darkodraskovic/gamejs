define(['PIXI'], function(PIXI) {
    
    var Tile = PIXI.Sprite.extend({
        init: function (tilemap, gid, x, y) {        
            this.gid = gid;

            // Image
            var frame = tilemap.frameRect;
            frame.x = ((gid - 1) % tilemap.imgCols) * tilemap.tileW;
            frame.y = Math.floor((gid - 1) / tilemap.imgCols) * tilemap.tileH;
            PIXI.Sprite.call(this, new PIXI.Texture(tilemap.image, frame));
            tilemap.addChild(this);
            
            // Position
            this.position.x = tilemap.getSceneX(x);
            this.position.y = tilemap.getSceneY(y);
        }
    });

    return Tile;
});
