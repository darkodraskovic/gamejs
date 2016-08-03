require.config({
    baseUrl: "./",
    
    paths: {
        "PIXI": "lib/pixi",
        "SAT": "lib/SAT",
        "Quadtree": "lib/quadtree"
    },

    shim: {
        "SAT": {
            exports: 'SAT'
        },
        "Quadtree": {
            exports: 'Quadtree'
        }
    }
});

requirejs(['core/application', 'scenes/scene1', 'core/system',
           'entities/namespace', 'entities/platform', 'entities/simpleton', 'entities/staticArea'],
          function(Application, Scene, sys) {

              var app = new Application();
              var scene = new Scene();
});

