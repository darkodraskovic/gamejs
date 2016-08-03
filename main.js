requirejs(
    ['core/application', 'core/scene', 'core/layer', 'core/entity', 'component/vehicle'],
    function(Application, Scene, Layer, Entity, Component) {
        
        var app = new Application();
        var scene = new Scene();
        var layer = new Layer(scene, 'layer');
        var entity = new Entity(layer, 0, 0, {'name': 'entity1'});
        entity.collider = new Component(entity);
        app.start(scene);
        
    });
