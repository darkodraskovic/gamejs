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

// App namespace
window.Simpletons = {};

// App entry point
requirejs(['core/application', 'scenes/scene1'], function(Application, Scene) {
    var app = new Application();
    var scene = new Scene();
});

