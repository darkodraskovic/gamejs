requirejs(
    ['core/game', 'core/application', 'core/scene', 'core/layer'],
    function(Game, Application, Scene, Layer) {
        
        var app = new Application();
        var scene = new Scene();
        var layer = new Layer(scene, 'layer');
        app.start(scene);
        
    });
