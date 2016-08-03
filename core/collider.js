define(['PIXI', 'SAT', 'Quadtree','core/system'], function(PIXI, SAT, Quadtree, sys) {
    
    var Collider = sys.Class.extend({
        init: function(scene) {
            this.colliders = [];
            this.response = new SAT.Response();
            this.quadTree = new Quadtree(
                (new PIXI.Rectangle()).copy(scene.getBounds()),
                scene.qtMaxobjects, scene.qtMaxlevels
            );
            this.resolve = this.ResolutionMethod.QUAD_TREE;
        },
        getCollidersFrom: function(layer) {
            var entities = layer.children;
            var colliders = this.colliders;
            for (var i=0, len=entities.length; i<len; i++) {
                var e = entities[i];
                var c = e.collider;
                if (c) {
                    if (e.offscreen && !c.collidesOffscreen)
                        continue;
                    colliders.push(c);
                }
            }
        },
        update: function(scene) {
            scene.children.forEach(function(layer) {
                layer.collision && this.getCollidersFrom(layer);
            }, this);
            this.resolve(scene);
        },
        ResolutionMethod: {
            NAIVE: function() {
                var colliders = this.colliders;

                for (var i=0, len = colliders.length; i < len; i++) {
                    var colA = colliders[i];
                    for (var j=0; j < len; j++) {
                        var colB = colliders[j];
                        if (i !== j && colA.target & colB.group) {
                            this.collide(colA, colB, this.response);
                        }
                    }
                }
                this.colliders.length = 0;
            },
            QUAD_TREE: function(scene) {
                var quadTree = this.quadTree;
                quadTree.clear();
                quadTree.bounds.copy(scene.getBounds());

                this.colliders.forEach(function(collider) {
                    quadTree.insert(collider.bounds.copy(collider.owner.getBounds()));
                });

                this.colliders.forEach(function(colA) {
                    var others = quadTree.retrieve(colA.bounds);
                    others.forEach(function(other) {
                        var colB = other.collider;
                        if (colA.target & colB.group) {
                            this.collide(colA, colB, this.response);
                        }
                    }, this);
                }, this);
                this.colliders.length = 0;
            }
        },
        collide: function(colA, colB, response) {
            response.clear();
            var collided = SAT.testPolygonPolygon(colA.polygon, colB.polygon, response);
            if (collided) {
                colA.respond(colB, response);
            }        
        }
    });

    return Collider;
});
